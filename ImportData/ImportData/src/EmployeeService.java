

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;

import javax.swing.JOptionPane;

public class EmployeeService {

	private Conn dbService = null;
	
	public EmployeeService(Conn dbService) {
		this.dbService = dbService;
	}
	
	public boolean addEmployee(String SSN, String Name, int AddressID, String Position, int EmployedYear, int EmployedMonth, int BirthYear, int BirthMonth, String PhoneNumber, int Salary, String CreditCardNumber) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, SSN);
			stmt.setString(3, Name);
			stmt.setInt(4, AddressID);
			stmt.setString(5, Position);
			stmt.setInt(6, EmployedYear);
			stmt.setInt(7, EmployedMonth);
			stmt.setInt(8, BirthYear);
			stmt.setInt(9, BirthMonth);
			stmt.setString(10, PhoneNumber);
			stmt.setInt(11, Salary);
			stmt.setString(12, CreditCardNumber);
			
			
			stmt.execute();
			
			int error = stmt.getInt(1);
			

			return true;

		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add employee goes wrong");
			return false;
		}

	}
	
	public boolean addDriver(String SSN) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddDriver(?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, SSN);
			
			stmt.execute();
			
			int error = stmt.getInt(1);

			return true;
		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add Driver goes wrong");
			return false;
		}

	}
	
	public boolean addContacter(String SSN) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddContacter(?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, SSN);
			
			stmt.execute();
			
			int error = stmt.getInt(1);

			return true;
		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add Contacter goes wrong");
			return false;
		}

	}
	
	
	public int insert(int AddIndex) {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Employee.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {
				 String[] values = line.split(",", -1);
				 
				 if(values[0] == null || values[0].isEmpty()) {
					 break;// if can't read the next company name, then just exit
				 }
				 
				 
				 String[] empT = values[3].split("\\.");//split employed year and month
				 String[] BirT = values[2].split("\\.");		 
				 
				 addEmployee(values[4], values[0], AddIndex++ ,values[6], Integer.parseInt(empT[0]), Integer.parseInt(empT[1]), Integer.parseInt(BirT[0]), Integer.parseInt(BirT[1]), values[5], Integer.parseInt(values[12]), values[13]);
				 if(values[6].equals("Driver"))addDriver(values[4]);// if position is driver, then add the row to the driver table
				 if(values[6].equals("Contacter"))addContacter(values[4]);

			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }
		 return AddIndex;
		 

	}
		
}
	
	
	

