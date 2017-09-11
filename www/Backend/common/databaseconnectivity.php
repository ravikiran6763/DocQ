<?php
	//
	// if (isset($_SERVER['HTTP_ORIGIN'])) {
  //       header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  //       header('Access-Control-Allow-Credentials: true');
  //       header('Access-Control-Max-Age: 86400');    // cache for 1 day
  //   }
	//
  //   // Access-Control headers are received during OPTIONS requests
  //   if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	//
  //       if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
  //           header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	//
  //       if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
  //           header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	//
  //       exit(0);
  //   }
	$username = "doctorquick2017";
  $password = "aishiteimasu";
  $hostname = "doctorquickmumbai.ckxt7dkmucgz.ap-south-1.rds.amazonaws.com:3306";
  //$hostname = "dq-new.cn214rm1segx.us-west-2.rds.amazonaws.com";

  //connection to the database
  $dbhandle = mysql_connect($hostname, $username, $password)
   or die("Unable to connect to MySQL");

  //select a database to work with
  $selected = mysql_select_db("tayokuki",$dbhandle)
    or die("Could not select examples");

    header('Content-type: text/html; charset=utf-8');
		echo "Connected to database Successfully";
?>
