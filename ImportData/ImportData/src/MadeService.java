

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

public class MadeService {

	private Conn dbService = null;
	
	public MadeService(Conn dbService) {
		this.dbService = dbService;
	}
	
	public boolean addMade(String ProductName, String CompanyName,Float Cost) {

		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddMade(?, ?, ?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, CompanyName);
			stmt.setString(3, ProductName);
			stmt.setFloat(4, Cost);
			stmt.execute();
			
			int error = stmt.getInt(1);
			
			return true;

		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add Made goes wrong");
			return false;
		}

	}
	
	public void insert() {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Product.csv";
		String line = "";
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {

				String[] values = line.split(",", -1);
				 
				if(values[2] != null && !values[2].isEmpty()) {
					addMade(values[0], values[9],  Float.parseFloat(values[2]));
				}else {
					addMade(values[0], values[9], 0.0f);
				}
				
			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }

		 

	}
		
}
	
	
	

