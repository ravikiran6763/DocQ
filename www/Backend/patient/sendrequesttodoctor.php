<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	 $postdata = file_get_contents("php://input");
if(isset($postdata))
{

		$request_from_patient = json_decode($postdata);
	  $patient_phno = $request_from_patient->patientphno;
	  $specialityId = $request_from_patient->speciality;
		$subPatientId = $request_from_patient->subPatientId;

	// $patient_phno = '9738158587';
	// $speciality = 'Cardiologist';
	$fiveMins="SELECT count(id) as count  FROM reqForConsultation WHERE requestedTime > DATE_SUB(NOW(), INTERVAL 2 MINUTE) and patientNum='$patient_phno' and flag = 1 ";
	$fiveMinsRet = mysql_query( $fiveMins, $dbhandle );
	while($row = mysql_fetch_array($fiveMinsRet))
	{
	 	$count=$row['count'];
		if($count === '0'){
			$insertionvalues = "INSERT INTO reqForConsultation(patientNum,speciality,requestedTime,subPatientId) VALUES ('$patient_phno','$specialityId',now(),'$subPatientId')";
		 	$retval1 = mysql_query($insertionvalues,$dbhandle);
			 if(!$retval1 )
			 {
							 die('Could not enter data: ' . mysql_error());
								echo "ERROR";
			 }
			 else
			 {
							 echo "Inserted";
							$fiveMins="SELECT id as reqId,requestedTime as reqTime  FROM reqForConsultation order by id DESC limit 1";
						 	$fiveMinsRet = mysql_query( $fiveMins, $dbhandle );
						 	while($row = mysql_fetch_array($fiveMinsRet))
						 	{
								$reqId=$row['reqId'];
								$reqTime=$row['reqTime'];

							}
							 $sqlSp = "select special from speciality where id='$specialityId'";
							 $retvalSp = mysql_query( $sqlSp, $dbhandle );
							 while($rowSp = mysql_fetch_array($retvalSp))
							 {
								    $speciality = $rowSp['special'];
							 }

							 $sqlSp1 = "select patientFname,patientLname from patientDetails where patientPhone='$patient_phno'";
							$retvalSp1 = mysql_query( $sqlSp1, $dbhandle );
							while($rowSp1 = mysql_fetch_array($retvalSp1))
							{
									 $patientFname = $rowSp1['patientFname'];
									 $patientLname = $rowSp1['patientLname'];

									  $patientFullName= $patientFname." ".$patientLname;
							}
			 }
		}
		else{
			echo "Error";
		}
	}

		$playerId =array();
	 $sendPush="select playerId from doctorDetails,doctor_onoff where doctor_onoff.doctor_phno=doctorDetails.doctorPhone and onoff=1 and doctorSpecialityId like '%$speciality%' and playerId not in('')";

	 $result = mysql_query($sendPush);
	 while ($row = mysql_fetch_assoc($result, MYSQL_ASSOC)){
			 $playerId[]= $row['playerId'];
	 }
	 for ($i=0; $i < sizeof(playerId); $i++) {

	 		 function sendMessage(){
	 		 $Ids =array();
	 			$Ids = $GLOBALS['playerId'];
	 			$reqId = $GLOBALS['reqId'];
	 			$reqTime = $GLOBALS['reqTime'];
	 			$reqPatImg = $GLOBALS['reqPatImg'];
	 			 $reqPat = $GLOBALS['patient_phno'];
				 $patientFullName = $GLOBALS['patientFullName'];
				// $patientFname="Abhijeet";

								// $title = array(
								// "en" => 'DoctorQuick - Get Well Sooner'
								// // {"en": "English Message", "es": "Spanish Message"}
								// );
								$content = array(
								"en" => 'would like a consultation with you.Tap to accept.'
								// {"en": "English Message", "es": "Spanish Message"}
								);
								$headers = array(
								"en" => $patientFullName
								// {"en": "English Message", "es": "Spanish Message"}
								);
                // ONE SIGNAL Testing Credentials
								//  6873c259-9a11-4a2a-a3b5-53aea7d59429
								//  MjAxYmFhNTItZTNiOS00ZDY3LTgzOTgtOGIxNDJmMjI1OGZj //old rest api key
				 				 $fields = array(
				 					 'app_id' => "e215d4e2-486f-4f19-984b-e54e8b63f891",
				 					 'include_player_ids' => $Ids,
				 					 'data' => array("reqId" => $reqId,"reqPat" => $reqPat,"reqTime" => $reqTime,"reqPatImg" => $reqPatImg,"targetUrl" => "patientRequestfromPush.html"),
									 // 'title' => $title,
									 'headings' => $headers,
									 'contents' => $content,
									 'ledColor' => 'red',
				 					 'android_sound' => 'dqandroidtone',
				 					 'ios_sound' => 'iphone.wav',
				 				 );

				 				 $fields = json_encode($fields);
				 					//  print("\nJSON sent:\n");
				 					//  print($fields);

				 				 $rk = curl_init();
				 				 curl_setopt($rk, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
				 				 curl_setopt($rk, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
				 																'Authorization: Basic YWRhZTE3NTktMGY1Yy00NzAwLWE5NjgtNDk2YTIyMmNlYzRj'));
				 				 curl_setopt($rk, CURLOPT_RETURNTRANSFER, TRUE);
				 				 curl_setopt($rk, CURLOPT_HEADER, FALSE);
				 				 curl_setopt($rk, CURLOPT_POST, TRUE);
				 				 curl_setopt($rk, CURLOPT_POSTFIELDS, $fields);
				 				 curl_setopt($rk, CURLOPT_SSL_VERIFYPEER, FALSE);

				 				 $response = curl_exec($rk);
				 				 curl_close($rk);

				 				 return $response;




	 	}

	 }

	 $response = sendMessage();
	 $return["allresponses"] = $response;
	 $return = json_encode( $return);
	 		// 	 print("\n\nJSON received:\n");
	 		// 	 print($return);
	 		// 	 print("\n");





}


?>
