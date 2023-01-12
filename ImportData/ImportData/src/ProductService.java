

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

public class ProductService {

	private Conn dbService = null;
	
	public ProductService(Conn dbService) {
		this.dbService = dbService;
	}
	
	public boolean addProduct(String Name, Float SellPrice, String Description, int StockQuantity) {
		try {
			CallableStatement stmt = dbService.getConnection().prepareCall("{? = call Import_AddProduct(?, ?, ?, ?)}");
			stmt.registerOutParameter(1, Types.INTEGER);
			stmt.setString(2, Name);
			stmt.setFloat(3, SellPrice);
			stmt.setString(4, Description);
			stmt.setInt(5, StockQuantity);
			stmt.execute();
			
			int error = stmt.getInt(1);
			
			return true;

		}catch(SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "add Product goes wrong");
			return false;
		}

	}
	
	public void insert() {
		
		String path = "C:\\Users\\DarkLord\\Desktop\\ImportData\\ImportData\\src\\Product.csv";
		String line = "";
		Set<String> NameRepo = new HashSet<String> (); 
		
		 try {
			 BufferedReader br = new BufferedReader(new FileReader(path));
			 br.readLine();
			 while((line = br.readLine()) != null) {
				 
				 String[] values = line.split(",", -1);
				if(!NameRepo.contains(values[0])) {// if this product name hasn't been added yet
					 addProduct(values[0], Float.parseFloat(values[3]), values[8], Integer.parseInt(values[7]));
					 NameRepo.add(values[0]);
				}
				
				 
			 }
		 }catch(FileNotFoundException e) {
			 e.printStackTrace();
		 }catch(IOException e) {
			 e.printStackTrace();
		 }

		 

	}
		
}
	
	
	

