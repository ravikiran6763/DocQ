<?php


	//TO ALLOW ACCESS CONTROL ORIGIN USING POST REQUEST
	if (isset($_SERVER['HTTP_ORIGIN']))
	{

		header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Max-Age: 86400');    // cache for 1 day
	}

	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
	{

		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

		exit(0);
	}


	header('Access-Control-Allow-Origin: *');


	//CREATE USERS (DOCTORS) VIA VSEE API

	//SETTING UP OF APIKEY AND SECRET KEY

	$apikey = "sqhqzdnbnkowgseg7bcgmy5mm5jri0zknfpmgfeojnxmi2lsf3mawqvhasga9wij";// API KEY OF VSEE
	$secretkey = "iwgcrs5qdfbeinuak7rkpvfev5u9a61eoegb2nrvny610zrobc0we9u8hfg8nlre"; //SECRET KEY OF VSEE
	$apiclientname = "greet"; //API CLIENT NAME PROVIDED BY VSEE

	//CURL REQUEST VSEE API
	$ch = curl_init();
 	 if(!$ch) die("curl error");

		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_VERBOSE, TRUE);
		curl_setopt($ch, CURLOPT_POST, 1);


	$postdata = file_get_contents("php://input");



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

				$doctoronoff = "INSERT INTO doctor_onoff(doctor_phno,onoff) values ('$doctorPhone',2)";
				$conn->exec($doctoronoff);


			//	echo "New record created successfully";
      //PASSWORD FOR DOCTOR TO LOGIN INTO VSEE
                                $password = "DQ_doctor";


				//CREATE USERS IN VSEE FROM THE BELOW URL
				$USER_CREATE_URL = "https://api.vsee.com/user/create?apikey=" . $apikey;
				//SEND JSON DATA OF USERS TO VSEE API
				$USER_JSON = '{"secretkey":'.$secretkey.',
				"username":'.$doctorPhone.',
				"password":'.$password.',
				"fn": '.$doctorFname.',
				"ln": '.$doctorLname.'}';


				curl_setopt($ch, CURLOPT_URL, $USER_CREATE_URL);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $USER_JSON);
				$result = curl_exec($ch);
				echo $result;

				$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
				echo $http_status;
		}
		catch(PDOException $e)
		{
		echo $sql . "<br>" . $e->getMessage();
		}

$conn = null;

?>
