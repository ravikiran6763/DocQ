<?php


	require "headers.php";



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
	

	if(isset($postdata))
	{

		$request = json_decode($postdata);
	    	$doctorFname = $request->doctorFname;
		$doctorLname = $request->doctorLname;
		$doctorPhone = $request->doctorPhone;

		
		$password = "DQ_doctor";


                               //CREATE USERS IN VSEE FROM THE BELOW URL
  

                               $USER_CREATE_URL = "https://api.vsee.com/user/create?apikey=" . $apikey;


	
	
	


                $USER_JSON = '{"secretkey":'.$secretkey.', 
                  "username":'.$doctorPhone.',
                  "password":'.$password.',
                  "fn": '.$doctorFname.',
                 "ln": '.$doctorLname.'}';


        echo $USER_JSON;



  curl_setopt($ch, CURLOPT_URL, $USER_CREATE_URL);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $USER_JSON);
  $result = curl_exec($ch);

echo $result;


  $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        echo $http_status;
}

?>
