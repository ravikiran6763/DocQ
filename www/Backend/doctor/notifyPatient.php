<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
 	 $postdata = file_get_contents("php://input");
if(isset($postdata))
{
	$doctor = json_decode($postdata);
  // $doctor='9738162020';
	/////SEND PUSH NOTIFICATION ALL THE AVAILABLE DOCTORS
  $sendPush="select playerId,patient from patientDetails,offlineRequests where patientDetails.patientPhone=offlineRequests.patient and offlineRequests.doctor='$doctor'";
 // echo $sendPush="select playerId from patientDetails,offlineRequests where patientDetails.patientPhone=offlineRequests.patient and offlineRequests.doctor='9844992181'";
 $result = mysql_query($sendPush);
 while ($row = mysql_fetch_assoc($result, MYSQL_ASSOC)){
		  $myArray[]= $row['playerId'];
      $patient[]= $row['patient'];

 }

 $sendPush="select doctorFname,doctorLname from doctorDetails where doctorPhone ='$doctor'";
// echo $sendPush="select playerId from patientDetails,offlineRequests where patientDetails.patientPhone=offlineRequests.patient and offlineRequests.doctor='9844992181'";
$result = mysql_query($sendPush);
while ($row = mysql_fetch_assoc($result, MYSQL_ASSOC)){
    $doctorLname= $row['doctorLname'];
}

 echo sizeof($patient);
   echo $patient[2];
 for ($i=0; $i < sizeof($myArray); $i++) {


 }
 //

for ($i=0; $i < sizeof($myArray); $i++) {
  function sendMessage(){
    $Ids =array();
     $Ids = $GLOBALS['myArray'];
     $doctorLname = $GLOBALS['doctorLname'];
     $patient = $GLOBALS['patient'];

  		$content = array(
  			"en" => 'Hi Dr.'.$doctorLname.' is now available.'
  			);

  		$fields = array(
  			'app_id' => "6873c259-9a11-4a2a-a3b5-53aea7d59429",
  			'include_player_ids' => $Ids,
  			// 'data' => array("foo" => "bar"),
  			'contents' => $content
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

    for ($j=0; $j < sizeof($patient); $j++){
      echo  $sql = "delete from  offlineRequests where patient='$patient[$j]' and doctor='$doctor'" ;
        $retval = mysql_query( $sql, $dbhandle );
        while($row = mysql_fetch_array($retval))
        {
          echo $row;
        }
    }
  }




}



?>
