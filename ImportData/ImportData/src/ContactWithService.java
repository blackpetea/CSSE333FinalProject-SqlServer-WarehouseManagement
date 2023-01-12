

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

public class ContactWithService {

	private Conn dbService = null;
	
	public ContactWithService(Conn dbService) {
		this.dbService = dbService;
	}
	
	public boolean addContactWith(String ContacterName, String CompanyName) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddContactWith(?, ?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, ContacterName);
			stmt.setString(3, CompanyName);

			stmt.execute();
			
			int error = stmt.getInt(1);
			
			return true;

		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add ContactWith goes wrong");
			return false;
		}

	}
	
	public void insert() {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\ContactWith.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {
				 
				 String[] values = line.split(",", -1);
			if(values[0] == null || values[0].isEmpty()) {
				 break;// if can't read the next Contacter name, then just exit
			 }
					 addContactWith(values[0], values[1]);
			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }

		

	}
		
}
	
	
	

