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

 header('Access-Control-Allow-Origin: *');

	//select a database to work with
	$selected = mysql_select_db("DoctorQuick",$dbhandle)
	  or die("Could not select examples");

		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

				$loginphno = json_decode($postdata);
        $doctorDetails = array();
        $sql = "select doctorfname,doctormname,doctorlname,doctoremail,dpno,dpass,doc_degrees,practice_since,age,gender,country,city,adress_line1,adress_line2,pincode,language1,language2,bank_name,acc_num,ifsc,fee,speciality_id,medi_flag,medi_num from doctor_details where dpno='$loginphno' ";

        $retval = mysql_query( $sql, $dbhandle );

        while($row = mysql_fetch_array($retval))
        {
          $doctorDetails[] = $row;

        }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }
         echo json_encode($doctorDetails);
		}
	 mysql_close($dbhandle);

?>
