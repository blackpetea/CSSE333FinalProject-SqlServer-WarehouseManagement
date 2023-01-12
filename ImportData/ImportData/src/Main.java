 import java.io.BufferedReader;
import java.io.File;
 import java.io.FileInputStream;
 import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;

public class Main {

	public static void main(String[] args) throws ParseException {
		
		int AddIndex = 1;

		Conn mainConn = new Conn("titan.csse.rose-hulman.edu", "MaterialStore");
		mainConn.connect("materialstore123", "materialstore321");
		
		System.out.println("Importation Starts!");
	
		AddressService addSer = new AddressService(mainConn);
		addSer.insertEmpAddr();
		addSer.insertCompAddr();
		addSer.insertOrdAddr();
		
		EmployeeService empSer = new EmployeeService(mainConn);
		AddIndex = empSer.insert(AddIndex);

		CompanyService compSer = new CompanyService(mainConn);
		AddIndex = compSer.insert(AddIndex);
		
		ProductService proSer = new ProductService(mainConn);
		proSer.insert();
		
		MadeService madSer = new MadeService(mainConn);
		madSer.insert();
		
		ManageService manSer = new ManageService(mainConn);
		manSer.insert();
		
		OrderService OrdSer = new OrderService(mainConn);
		OrdSer.insert(AddIndex);
		
		ContactWithService CWSer = new ContactWithService(mainConn);
		CWSer.insert();
		
		System.out.println("Importation Succeeds!");
	}

}
