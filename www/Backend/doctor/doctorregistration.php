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
		$docPwd = $prefix. $middle . $numbers;

			$docPwd = base64_encode($docPwd);



			// echo $retval;



			$sql = "INSERT INTO docRegisteredByApp (fname, mname,lname,email,mobileNum) VALUES ('$doctorFname', '$doctorMname', '$doctorLname','$doctorEmail','$doctorPhone')";
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
			}
	}
	mysql_close($dbhandle);

?>
