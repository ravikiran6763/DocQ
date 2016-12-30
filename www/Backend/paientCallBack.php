<?php

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
	$selected = mysql_select_db("DoctorQuick",$dbhandle)
	  or die("Could not select examples");

	 header('Access-Control-Allow-Origin: *');

	$postdata = file_get_contents("php://input");

	if (isset($postdata))
	{

		$phone = json_decode($postdata);
			$sql = "INSERT INTO patientCallback (phNo,dateTime) VALUES ('$phone', now())";
			$retval = mysql_query( $sql, $dbhandle );
			// echo $retval;
	    	if(!$retval )
        {
					die('Could not enter data: ' . mysql_error());
					 echo "ERROR";

      	}
				else
				{
					echo "Query Submitted";
				}

	}
  mysql_close($dbhandle);

?>
