

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
import java.util.HashSet;
import java.util.Set;

import javax.swing.JOptionPane;

import java.text.ParseException;
import java.text.SimpleDateFormat;  
import java.util.Date;  

public class OrderService {

	private Conn dbService = null;
	
	public OrderService(Conn dbService) {
		this.dbService = dbService;
	}
	
	public boolean addOrder(int AddressID, String CompanyRepName, String ProductName, int Quantity, Float OrderUnitPrice, String DriverName, Date DateOfOrder, Date ArriveDeadline, Date DateArrived) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddOrder(?, ?, ?, ?, ?, ?, ?, ?, ?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setInt(2, AddressID);
			stmt.setString(3, CompanyRepName);
			stmt.setString(4, ProductName);
			stmt.setInt(5, Quantity);
			stmt.setFloat(6, OrderUnitPrice);
			stmt.setString(7, DriverName);
			stmt.setDate(8, (java.sql.Date) DateOfOrder);
			stmt.setDate(9, (java.sql.Date) ArriveDeadline);
			stmt.setDate(10, (java.sql.Date) DateArrived);
			stmt.execute();
			
			int error = stmt.getInt(1);
			
			return true;

		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add Order goes wrong");
			return false;
		}

	}
	
	public int insert(int AddIndex) throws NumberFormatException, ParseException {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Order.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {
				 
				 String[] values = line.split(",", -1);
			if(values[0] == null || values[0].isEmpty()) {
				 break;// if can't read the next company name, then just exit
			 }

					 addOrder(AddIndex++, values[0], values[9], Integer.parseInt(values[7]), Float.parseFloat(values[6]), values[14], Dconvert(values[17]), Dconvert(values[15]),Dconvert(values[16]));

				
				 
			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }

		 return AddIndex;

	}
	
	
	public java.sql.Date Dconvert(String input) throws ParseException{
		 final String OLD_FORMAT = "MM/dd/yyyy";
		 final String NEW_FORMAT = "yyyy-MM-dd";
		
		 String oldDateString = input;
		 String newDateString;

		 SimpleDateFormat sdf = new SimpleDateFormat(OLD_FORMAT);
		 Date d = sdf.parse(oldDateString);
		 sdf.applyPattern(NEW_FORMAT);
		 newDateString = sdf.format(d);
		 java.sql.Date Date2 = java.sql.Date.valueOf(newDateString);
		 
		 return Date2;
	}
		
}
	
	
	

