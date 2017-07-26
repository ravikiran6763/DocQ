<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	 $postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
	 date_default_timezone_set("Asia/Calcutta");
	//
	if(isset($postdata))
	{
    $chatHistory = json_decode($postdata);
		$pat = $chatHistory->pat;
		$doc = $chatHistory->doc;

		$chatdata= array();


		 $sql = "select chatFrom,chatTo,message,dateAndTime,unreadCount from chatHistory where chatFrom='$pat' and chatTo='$doc' and dateAndTime=(select max(dateAndTime) from chatHistory where chatFrom='$pat' and chatTo='$doc')";
		 $retval = mysql_query( $sql, $dbhandle );
		while($row = mysql_fetch_array($retval))
		{
			 $chatdata[] = $row;
		}
		echo json_encode($chatdata);
	}

	mysql_close($dbhandle);

	// $d=date("Y/m/d");
	// $a= date("h:i:s");



?>
