<?php

	require "headers.php";
	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input"); // TO RECIEVE POST REQUEST FROM ANGULAR JS

	if(isset($postdata))
	{
		$request_phno=json_decode($postdata);
		// $request_phno = '8073941036';
		function generatePIN($digits = 4)
		{
			$i = 0; //counter
			$rand = ""; //our default pin is blank.
			while($i < $digits)
			{
			//generate a random number between 0 and 9.
			$rand .= mt_rand(1, 9);
			$i++;
			}
			return $rand;
		}

		//If I want a 4-digit PIN code.
		$rand = generatePIN();


		$ch = curl_init('http://www.txtguru.in/imobile/api.php?');
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "username=tallysolutions&password=49332602&source=TALLYS&dmobile=91".$request_phno."&message=Your+OTP+for+DoctorQuick+is+:+$rand");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		$data = curl_exec($ch);

		echo $rand;


	}


?>
