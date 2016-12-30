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
	 //header('Access-Control-Allow-Origin: *');


	  $postdata = file_get_contents("php://input");

	


	if (isset($postdata))
	{

		$request = json_decode($postdata);

		$P_fname = $request->pfname;
		$P_Mname = $request->pmname;
		$P_Lname = $request->plname;
		$P_age = $request->page;
		$P_Phno = $request->pphno;
		$P_Email = $request->pemail;
		$ppw = $request->ppw;



			$sql = "INSERT INTO patient_registration (fname, mname,lname,age,ph_no,sex,email,password) VALUES ('$P_Fname', '$P_Mname', '$P_Lname','$P_age','$P_Phno','P_Email','$ppw')";

			$retval = mysql_query( $sql, $dbhandle );

            if(! $retval )
            {

			   die('Could not enter data: ' . mysql_error());

            }
			else
			{

				echo "Data Submitted Sucessfully";


			}

		}


	}

  mysql_close($dbhandle);



?>
