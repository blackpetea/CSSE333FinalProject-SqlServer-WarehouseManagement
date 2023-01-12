//from connection lab
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conn {


	private final String SampleURL = "jdbc:sqlserver://${dbServer};databaseName=${dbName};user=${user};password={${pass}}";

	private Connection connection = null;

	private String databaseName;
	private String serverName;

	public Conn(String serverName, String databaseName) {

		this.serverName = serverName;
		this.databaseName = databaseName;
	}

	public boolean connect(String user, String pass) {

		String superUrl = SampleURL.replace("${dbServer}", serverName)
							  .replace("${dbName}", databaseName)
							  .replace("${user}", user)
							  .replace("${pass}", pass);
		
		try {
			connection = DriverManager.getConnection(superUrl);
			System.out.println("Connetion Succeed");
			return true;
			
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	

	public Connection getConnection() {
		return this.connection;
	}
	
	public void closeConnection() {
		try {
			connection.close();
			System.out.println("Connection closed!");
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}

}
