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


$servername = "doctorquick.cy3fske9ly7g.us-west-2.rds.amazonaws.com:3306";
$username = "doctorquick";
$password = "aishiteimasu";
$dbname = "tayokuki";

		try {
				$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
				// set the PDO error mode to exception
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				if (isset($postdata))
				{

					$doctorDetails = json_decode($postdata);
					$doctorFname = $doctorDetails->doctorFname;
					$doctorMname= $doctorDetails->doctorMname;
					$doctorLname = $doctorDetails->doctorLname;
					$doctorEmail= $doctorDetails->doctorEmail;
					$doctorPhone = $doctorDetails->doctorPhone;

					$letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
					// $specialChar="!@#$%&*()_+=?";
					$numbers = rand(10000, 99999);
					$prefix = "DQ";
					$sufix = $letters[rand(0, 51)];
					// $middle=$specialChar[rand(0,12)];
					$docPwd = $prefix. $middle . $numbers . $sufix ;

						$docPwd = base64_encode($docPwd);
						// echo $retval;
				}

				$sql = "INSERT INTO doctorDetails (doctorFname, doctorMname,doctorLname,doctorEmail,doctorPhone,doctorPwd) VALUES ('$doctorFname', '$doctorMname', '$doctorLname','$doctorEmail','$doctorPhone','$docPwd')";
				// use exec() because no results are returned
				$conn->exec($sql);
				$doctoronoff = "INSERT INTO doctor_onoff(doctor_phno,onoff) values ('$doctorPhone',0)";
				$conn->exec($doctoronoff);
				echo "New record created successfully";
		}
		catch(PDOException $e)
		{
		echo $sql . "<br>" . $e->getMessage();
		}

$conn = null;

?>
