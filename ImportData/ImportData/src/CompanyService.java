

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.text.ParseException;
import java.text.SimpleDateFormat;  
import java.util.Date;  
import java.util.ArrayList;

import javax.swing.JOptionPane;

public class CompanyService {

	private Conn dbService = null;
	
	public CompanyService(Conn dbService) {
		this.dbService = dbService;
	}
	
	public boolean addCompany(String Name, String Field, String RepName, String RepNumber, int AddressID, Date RegDate, String Type, int LevelOfInterest, String Notes1, String Notes2, String Notes3) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddCompany(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, Name);
			stmt.setString(3, Field);
			stmt.setString(4, RepName);
			stmt.setString(5, RepNumber);
			stmt.setInt(6, AddressID);
			stmt.setDate(7, (java.sql.Date) RegDate);
			stmt.setString(8, Type);
			stmt.setInt(9, LevelOfInterest);
			stmt.setString(10, Notes1);
			stmt.setString(11, Notes2);
			stmt.setString(12, Notes3);
			
			
			stmt.execute();
			
			int error = stmt.getInt(1);
			

			return true;

		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add Company goes wrong");
			return false;
		}

	}
	
	public int insert(int AddIndex) throws NumberFormatException, ParseException {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Company.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {

				 String[] values = line.split(",", -1);
				 
				 if(values[0] == null || values[0].isEmpty()) {
					 break;// if can't read the next company name, then just exit
				 }
//				 int lofi;
//				 if(values[13] == null || values[13].isEmpty()) {
//					 lofi
//				 }
//				 not dealing with empty level of interest yet.
				 
				 addCompany(values[1], values[8], values[0] ,values[9], AddIndex++, Dconvert(values[2]), values[7], Integer.parseInt(values[13]), values[14],values[15], values[16]);
				 
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
	
	
	

