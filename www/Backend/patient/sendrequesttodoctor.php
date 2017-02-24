<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	echo $postdata = file_get_contents("php://input");

if(isset($postdata))
{

	$request_from_patient = json_decode($postdata);
	$patient_phno = $request_from_patient->patientphno;
	$speciality = $request_from_patient->speciality;

	$fiveMins="SELECT count(id) as count  FROM reqForConsultation WHERE requestedTime > DATE_SUB(NOW(), INTERVAL 3 MINUTE) and patientNum='$patient_phno' and flag = 1 ";
	$fiveMinsRet = mysql_query( $fiveMins, $dbhandle );
	while($row = mysql_fetch_array($fiveMinsRet))
	{
	echo $count=$row['count'];
		if($count === '0'){
			$insertionvalues = "INSERT INTO reqForConsultation(patientNum,speciality,requestedTime) VALUES ('$patient_phno','$speciality',now())";
		 	$retval1 = mysql_query( $insertionvalues, $dbhandle );
			 if(!$retval1 )
			 {
							 die('Could not enter data: ' . mysql_error());
								echo "ERROR";
			 }
			 else
			 {
							 echo "Query Submitted";
			 }
		}
		else{
			echo "wait";
		}
	}

	/////SEND PUSH NOTIFICATION ALL THE AVAILABLE DOCTORS
	//  $sendPush="SELECT playerId as playerId from doctorDetails where doctorSpecialityId like '%$speciality%'";
$sendPush="SELECT playerId as playerId  from doctorDetails where doctorSpecialityId like '%$speciality%' order by playerId";
 $result = mysql_query($sendPush);
 while ($row = mysql_fetch_assoc($result, MYSQL_ASSOC)) {
		 $myArray[]= $row['playerId'];
 }
for ($i=0; $i < sizeof($myArray); $i++) {
		 function sendMessage(){
		 $Ids =array();
			$Ids = $GLOBALS['myArray'];
				 $content = array(
					 "en" => 'You have a new consultation request pending!!!'
					 );

				 $fields = array(
					 'app_id' => "6873c259-9a11-4a2a-a3b5-53aea7d59429",
					 'include_player_ids' => $Ids,
					 'data' => array("user" => "patient"),
					 'contents' => $content,
					 'android_sound' => 'android',
					 'ios_sound' => 'iphone.wav'
				 );

				 $fields = json_encode($fields);
					 print("\nJSON sent:\n");
					 print($fields);

				 $ch = curl_init();
				 curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
				 curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
																'Authorization: Basic MjAxYmFhNTItZTNiOS00ZDY3LTgzOTgtOGIxNDJmMjI1OGZj'));
				 curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
				 curl_setopt($ch, CURLOPT_HEADER, FALSE);
				 curl_setopt($ch, CURLOPT_POST, TRUE);
				 curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

				 $response = curl_exec($ch);
				 curl_close($ch);

				 return $response;
			 }

			 $response = sendMessage();
			 $return["allresponses"] = $response;
			 $return = json_encode( $return);
			 print("\n\nJSON received:\n");
			 print($return);
			 print("\n");
 }

}
mysql_close($dbhandle);

?>
