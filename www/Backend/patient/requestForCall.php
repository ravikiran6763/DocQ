<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	 $postdata = file_get_contents("php://input");



	if (isset($postdata))
	{
		$reqDetails=array();

		 $callData = json_decode($postdata);

     $patient = $callData->patient;
     $doctor = $callData->doctor;
		 $subPatient = $callData->subPatient;

		 $sql = "select speciality.id as  special from  doctorDetails,speciality where speciality.special=doctorDetails.doctorSpecialityId and doctorPhone='$doctor';";
		 $dretval = mysql_query( $sql, $dbhandle );
		 while($row = mysql_fetch_assoc($dretval)) {
		 //  echo "special :{$row['special']}  ";
		  $sp=$row['special'];
			// echo $sp;
			$insertionvalues = "INSERT INTO reqForConsultation(patientNum,speciality,accptedDoctor,requestedTime,subPatientId) VALUES ('$patient','$sp','$doctor',now(),'$subPatient')";

		 //  $insertionvalues = "INSERT INTO consultRequest(patientphno,doctorphno,reqTime) VALUES ('$patient','$doctor',now())";
		 $retvalmyconsulation = mysql_query( $insertionvalues, $dbhandle );
		 if(!$retvalmyconsulation)
		 {
		 // die('Could not enter data: ' . mysql_error());
			 echo "ERROR";
		 }
		 else
		 {
		 // echo "Query Submitted";
			//  $fiveMins="SELECT id as reqId,flag as callStatus FROM reqForConsultation order by id DESC limit 1";
			//  $fiveMinsRet = mysql_query( $fiveMins, $dbhandle );
			//  while($row = mysql_fetch_array($fiveMinsRet))
			//  {
			// 	 $reqDetails=$row;
			//  }

			 $fiveMins="SELECT id as reqId,requestedTime as reqTime,flag as callStatus  FROM reqForConsultation order by id DESC limit 1";
			 $fiveMinsRet = mysql_query( $fiveMins, $dbhandle );
			 while($row = mysql_fetch_array($fiveMinsRet))
			 {
			 	$reqId=$row['reqId'];
			 	$reqTime=$row['reqTime'];
				$callStatus=$row['callStatus'];
				$reqDetails=$row;
			 }

		 $sqlSp1 = "select patientFname,patientLname from patientDetails where patientPhone='$patient'";
		 $retvalSp1 = mysql_query( $sqlSp1, $dbhandle );
		 while($rowSp1 = mysql_fetch_array($retvalSp1))
		 {
					$patientFname = $rowSp1['patientFname'];
					$patientLname = $rowSp1['patientLname'];

					 $patientFullName= $patientFname." ".$patientLname;
		 }


		 }

		}

    echo json_encode($reqDetails);

//Sending push notification to individual DOCTORS

 $sendPush="select playerId from doctorDetails where doctorPhone='$doctor'";
 $result = mysql_query($sendPush);
 while ($row = mysql_fetch_assoc($result, MYSQL_ASSOC)){
	  $myArray[]= $row['playerId'];
		//  $docPushId= $row['playerId'];

		 function sendMessage(){
 		 $Ids =array();
 			$Ids = $GLOBALS['myArray'];
 			$reqId = $GLOBALS['reqId'];
 			$reqTime = $GLOBALS['reqTime'];
 			$reqPatImg = $GLOBALS['reqPatImg'];
 			$reqPat = $GLOBALS['patient'];
			$patientFullName = $GLOBALS['patientFullName'];



			 				 $content = array(
								 "en" => 'would like a consultation with you. Tap to accept'
			 					 );
								 $headers = array(
 								"en" => $patientFullName'
 								);

			 				 $fields = array(
			 					 'app_id' => "6873c259-9a11-4a2a-a3b5-53aea7d59429",
			 					 'include_player_ids' => $Ids,
			 					 'data' => array("reqId" => $reqId,"reqPat" => $reqPat,"reqTime" => $reqTime,"reqPatImg" => $reqPatImg,"targetUrl" => "patientRequestfromPush.html"),
								 'headings' => $headers,
								 'contents' => $content,
			 					 'android_sound' => 'dqandroidtone',
			 					 'ios_sound' => 'iphone.wav',
			 				 );

			 				 $fields = json_encode($fields);
								 //  print("\nJSON sent:\n");
								 //  print($fields);

			 				 $rk = curl_init();
			 				 curl_setopt($rk, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
			 				 curl_setopt($rk, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
			 																'Authorization: Basic MjAxYmFhNTItZTNiOS00ZDY3LTgzOTgtOGIxNDJmMjI1OGZj'));
			 				 curl_setopt($rk, CURLOPT_RETURNTRANSFER, TRUE);
			 				 curl_setopt($rk, CURLOPT_HEADER, FALSE);
			 				 curl_setopt($rk, CURLOPT_POST, TRUE);
			 				 curl_setopt($rk, CURLOPT_POSTFIELDS, $fields);
			 				 curl_setopt($rk, CURLOPT_SSL_VERIFYPEER, FALSE);

			 				 $response = curl_exec($rk);
			 				 curl_close($rk);

			 				 return $response;

 	}

	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	//  print("\n\nJSON received:\n");
	//  print($return);
	//  print("\n");



 }



	}


mysql_close($dbhandle);

?>
