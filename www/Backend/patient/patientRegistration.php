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

	header('Access-Control-Allow-Origin: *');

$postdata = file_get_contents("php://input");
// echo $postdata;


$servername = "dq-new.cn214rm1segx.us-west-2.rds.amazonaws.com";
$username = "Ishikaikku2016";
$password = "aishiteimasu";
$dbname = "tayokuki";

		try {
				$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
				// set the PDO error mode to exception
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				if (isset($postdata))
				{
          $patientDetails = json_decode($postdata);
          $pateientFname = $patientDetails->pateientFname;
          $pateientMname= $patientDetails->pateientMname;
          $pateientLname = $patientDetails->pateientLname;
          $pateientAge= $patientDetails->pateientAge;
          $pateientPhone = $patientDetails->pateientPhone;
          $pateientEmail= $patientDetails->pateientEmail;
          $pateientSex = $patientDetails->pateientSex;
          $pateientPwd= $patientDetails->pateientPwd;
          //encodes the password string

          $pateientPwd = base64_encode($pateientPwd);




						// echo $retval;

				}
				// echo $docPwd;
			  $sql = "INSERT INTO patientDetails (patientFname, patientMname,patientLname,patientAge,patientPhone,patientSex,patientEmail,patientPwd) VALUES ('$pateientFname', '$pateientMname', '$pateientLname','$pateientAge','$pateientPhone','$pateientSex','$pateientEmail','$pateientPwd')";
				// use exec() because no results are returned
				$conn->exec($sql);
				echo "New record created successfully";
		}
		catch(PDOException $e)
		{
		echo $sql . "<br>" . $e->getMessage();
		}

$conn = null;




?>
