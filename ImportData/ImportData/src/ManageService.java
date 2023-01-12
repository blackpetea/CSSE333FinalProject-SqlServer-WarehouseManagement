

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

public class ManageService {

	private Conn dbService = null;
	
	public ManageService(Conn dbService) {
		this.dbService = dbService;
	}
	
	public boolean addManage(String SuperiorName, String EmployeeSSN) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddManage(?, ?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, SuperiorName);
			stmt.setString(3, EmployeeSSN);
			
			stmt.execute();
			
			int error = stmt.getInt(1);

			return true;
		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add Manage goes wrong");
			return false;
		}

	}
	
	
	
	
	
	public void insert() {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Employee.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {
				 String[] values = line.split(",", -1);			 

				 if(values[14] != "" && !values[14].isEmpty())addManage( values[14], values[4]);
			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }
		 

	}
		
}
	
	
	

