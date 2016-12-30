<?php 
	
	//http://stackoverflow.com/questions/18382740/cors-not-working-php
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

	
	
	
	$username = "root";
	$password = "";
	$hostname = "localhost";

	//connection to the database
	$dbhandle = mysql_connect($hostname, $username, $password)
	 or die("Unable to connect to MySQL");
	

	//select a database to work with
	$selected = mysql_select_db("greet",$dbhandle)
	  or die("Could not select examples");
  
	
		//header('Content-type: text/html; charset=utf-8');
	 header('Access-Control-Allow-Origin: *');
	 
	 
	  $postdata = file_get_contents("php://input");
	  
	  
	  
	if (isset($postdata)) 
	{
		
		$request = json_decode($postdata);
		
		$loginphno = $request->logphno;
		$loginpw = $request->logpw;
		
		
		
		$sql = "select count(*) as patient from patient_registration where ph_no='$loginphno'";
		$retval = mysql_query( $sql, $dbhandle );
		
		
			
	   if(! $retval )
	   {
		  die('Could not get data: ' . mysql_error());
	   }
		
		$data = mysql_fetch_assoc($retval);
		
		
		if($data['patient'] > 0)
		{
			
			echo "Patient Login Screens";
			

		}
		
		
		//Doctor login infoirmtaiobn
		
			
		
		$dsql = "select count(*) as doctor from DoctorResgistration where DoctorPhno='$loginphno'";
		$dretval = mysql_query( $dsql, $dbhandle );
			
	   if(! $dretval )
	   {
		  die('Could not get data: ' . mysql_error());
	   }
		
		$datadoctor = mysql_fetch_assoc($dretval);
		
		if($datadoctor['doctor'] > 0)
		{
			
			echo "Doctor Login Screens";
			

		}
		
		

	}	

  mysql_close($dbhandle);	
		
	
	
?>