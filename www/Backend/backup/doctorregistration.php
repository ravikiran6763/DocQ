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


		header('Content-type: text/html; charset=utf-8');
	 header('Access-Control-Allow-Origin: *');


	  $postdata = file_get_contents("php://input");

	if (isset($postdata))
	{

		$request = json_decode($postdata);

		$D_Fname = $request->DocFname;
		$D_Mname = $request->DocMname;
		$D_Lname = $request->DocLname;
		$D_Email = $request->DocEmail;
		$D_Phno = $request->DocPhnum;

		// if($D_Fname || $D_Mname || $D_Lname)
		// {
		//genereates a random password
		$letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		$specialChar="!@#$%&*()_+=?";
		$numbers = rand(10000, 99999);
		$prefix = "DQ";
		$sufix = $letters[rand(0, 51)];
		$middle=$specialChar[rand(0,12)];
		$docPass= $prefix. $middle . $numbers . $sufix ;

			$docPass = base64_encode($docPass);

			$sql = "INSERT INTO doctor_details (doctorfname, doctormname, doctorlname,doctoremail,dpno,dpass) VALUES ('$D_Fname', '$D_Mname', '$D_Lname','$D_Email','$D_Phno','$docPass')";
			$retval = mysql_query( $sql, $dbhandle );

            if(! $retval )
            {
			   			die('Could not enter data: ' . mysql_error());
            }
						else
						{
							echo "Data Submitted Sucessfully";
						}

		// }


	}

  mysql_close($dbhandle);



?>
