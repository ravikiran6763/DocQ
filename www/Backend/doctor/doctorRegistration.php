<?php

	require 'headers.php';


	header('Content-type: text/html; charset=utf-8');
	 $postdata = file_get_contents("php://input");



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

			$sql = "select count(*) as exist from doctorDetails where doctorPhone='$doctorPhone'";
			//$sql = "select count(*) as patient from patient_registration where ph_no='9844992181' and password='cmtpcmFu'";
			$retval = mysql_query( $sql, $dbhandle );
			while($row = mysql_fetch_array($retval))
			{
				$count=$row['exist'];
				if($count ==1){
						echo "Exist";
				}
				else{
					$sql = "INSERT INTO docRegisteredByApp (mobileNum, fname,mname,lname,email,regDate) VALUES ('$doctorPhone', '$doctorFname', '$doctorMname','$doctorLname','$doctorEmail',now())";
					$retval = mysql_query( $sql, $dbhandle );
					if(mysql_error())
					// if(!$retval)
					{
						// die('Could not enter data: ' . mysql_error());
						 echo "ERROR";
					}
					else
					{
						echo "Query Submitted";
						// //PASSWORD FOR DOCTOR TO LOGIN INTO VSEE
						// $password = "DQ_doctor";
						// //CREATE USERS IN VSEE FROM THE BELOW URL
						// $USER_CREATE_URL = "https://api.vsee.com/user/create?apikey=" . $apikey;
						// //SEND JSON DATA OF USERS TO VSEE API
						// $USER_JSON = '{"secretkey":'.$secretkey.',
						// "username":'.$pateientPhone.',
						// "password":'.$password.',
						// "fn": '.$pateientFname.',
						// "ln": '.$pateientLname.'}';
						// curl_setopt($ch, CURLOPT_URL, $USER_CREATE_URL);
						// curl_setopt($ch, CURLOPT_POSTFIELDS, $USER_JSON);
						// $result = curl_exec($ch);
						// echo $result;
						// $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
						// echo $http_status;

					}
				}
			}


			// echo $retval;

	}
	mysql_close($dbhandle);

?>
