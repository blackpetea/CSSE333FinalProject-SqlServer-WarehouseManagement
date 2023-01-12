

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

public class AddressService {

	private Conn dbService = null;
	
	public AddressService(Conn dbService) {
		this.dbService = dbService;
	}
	
	public boolean addAddress(String ZipCode, String Province, String City, String Street, String District) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddAddress(?, ?, ?, ?, ?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, ZipCode);
			stmt.setString(3, Province);
			stmt.setString(4, City);
			stmt.setString(5, Street);
			stmt.setString(6, District);
			
			stmt.execute();
			
			int error = stmt.getInt(1);
			

			return true;

		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "Add Restaurant not implemented.");
			return false;
		}

	}
	
	public void insertEmpAddr() {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Employee.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {
				 


				 String[] values = line.split(",", -1);	
				 if(values[7] == null || values[7].isEmpty()) {
					 break;// if can't read the next company name, then just exit
				 }
				 
				 if(values[7].charAt(0) == '\"') {

					 int len = values[7].length();
					 values[7] = values[7].substring(0, len);
					
				 }
				 
				 int len2 = values[11].length();
				 if(values[11].charAt(len2-1) == '\"') {
					 values[11] = values[11].substring(0, len2-1);
				 }
				 
				 
				 
				 addAddress(values[11], values[7].substring(1), values[8], values[10], values[9]);
			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }
		 
	}
	
	public void insertCompAddr() {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Company.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 
			 while((line = br.readLine()) != null) {
				 String[] values = line.split(",", -1);
				 
				 if(values[4] == null || values[4].isEmpty()) {
					 break;// if can't read the next province, then just exit
				 }
				 
				 addAddress("", values[4], values[5], "", values[6]);
			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }
		 
	}
	
	public void insertOrdAddr() {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Order.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {
				 


				 String[] values = line.split(",", -1);	
				 if(values[1] == null || values[1].isEmpty()) {
					 break;// if can't read the next Province , then just exit
				 }
				 
				 
				 if(values[1].charAt(0) == '\"') {
					 int len = values[1].length();
					 values[1] = values[1].substring(1, len);
					
				 }
				 
				 int len2 = values[5].length();
				 if(values[5].charAt(len2-1) == '\"') {
					 values[5] = values[5].substring(0, len2-1);
				 }

				 
				 
				 addAddress(values[5], values[1], values[2], values[4], values[3]);
			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }
		 
	}
	
	
	


	
}
