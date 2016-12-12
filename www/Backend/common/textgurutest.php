<?php 

	require "headers.php";


   header('Content-type: text/html; charset=utf-8');

   $postdata = file_get_contents("php://input"); // TO RECIEVE POST REQUEST FROM ANGULAR JS

        if(isset($postdata))
        {	

		$request_phno=json_decode($postdata);

		$random_number = intval($request_phno/1000000);
		
		$rand = substr(str_shuffle($request_phno),0,4);
		
		$ch = curl_init('https://www.txtguru.in/imobile/api.php?');
               curl_setopt($ch, CURLOPT_POST, 1);
               curl_setopt($ch, CURLOPT_POSTFIELDS, "username=tallysolutions&password=49332602&source=TALLYS&dmobile=91".$request_phno."&message=Your+OTP+for+DQ+is:$rand");
               curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
               $data = curl_exec($ch);		


		echo $rand;
	
	}


?>
