<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');

  //  $sendPush="SELECT playerId as playerId from doctorDetails where doctorSpecialityId like '%$speciality%'";

	$sendPush="SELECT playerId as playerId  from doctorDetails where doctorSpecialityId like '%Dentist%' order by playerId";

	$result = mysql_query($sendPush);
	while ($row = mysql_fetch_assoc($result, MYSQL_ASSOC)) {
	    $myArray[]= $row['playerId'];
	}
for ($i=0; $i < sizeof($myArray); $i++) {

	function sendMessage(){
	$Ids =array();
	 $Ids = $GLOBALS['myArray'];
			$content = array(
				"en" => 'Hey DocQuick !!!'
				);

			$fields = array(
				'app_id' => "6873c259-9a11-4a2a-a3b5-53aea7d59429",
				'include_player_ids' => $Ids,
				'data' => array("foo" => "bar"),
				'contents' => $content,
				'android_sound' => 'tring'
			);

			$fields = json_encode($fields);
	    	print("\nJSON sent:\n");
	    	print($fields);

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
													   'Authorization: Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj'));
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



mysql_close($dbhandle);

?>
