<?php 
		
		
		header('Access-Control-Allow-Origin: *');

		
	$username = "root";
	$password = "";
	$hostname = "localhost";
	
	//connection to the database
	$dbhandle = mysql_connect($hostname, $username, $password)
	 or die("Unable to connect to MySQL");

//select a database to work with
	$selected = mysql_select_db("greet",$dbhandle)
	  or die("Could not select examples");
	
	 
	 $sql = "SELECT id,special,content,onoff  FROM speciality";
		$retval = mysql_query( $sql, $dbhandle );
		
		
	
	   if(! $retval )
	   {
		  die('Could not get data: ' . mysql_error());
	   }
	
		 $data = array();
		 
		 
	   while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
	   {
		  $data[] = $row;
		 		  	
	   }
	   
	   
	   	 echo json_encode($data);
		 echo "1";
		
		mysql_close($dbhandle);
	 

	
	 
?>