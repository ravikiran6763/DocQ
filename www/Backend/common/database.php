<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
			header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
			header('Access-Control-Allow-Credentials: true');
			header('Access-Control-Max-Age: 86400');    // cache for 1 day
		}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
					header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
					header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

			exit(0);
	}

  $servername = "dq-new.cn214rm1segx.us-west-2.rds.amazonaws.com";
  $username = "Ishikaikku2016";
  $password = "aishiteimasu";
  $database = "tayokuki";

  // Create connection
  $conn = mysqli_connect($servername, $username, $password,$database);

  // Check connection
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }


$sql = "select count(*) as patient from patientDetails where patientPhone='9844992181' and patientPwd='cmtpcmFu' ";
$stmt =$mysqli->prepare($sql);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();




  $conn->close();
?>
