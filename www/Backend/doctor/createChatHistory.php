<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	 $postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
	 date_default_timezone_set("Asia/Calcutta");


	//echo $postdata;

	if(isset($postdata))
	{


		//echo $postdata;


     $chatHistory = json_decode($postdata);

	$jj = $postdata;

	echo $postdata->chatTo;




	 $dateformat = $chatHistory->dateformat;

	//echo $chatHistory->dateformat;


	$chatTo = $chatHistory->chatTo;
		// echo "DateTime:".$dateformat;
		$jsDateTS = strtotime($dateformat);
		if ($jsDateTS !== false) {
		$chatDate=date('Y-m-d H:i:s', $jsDateTS );
		}

    $message = $chatHistory->message;

     $pname = $chatHistory->pname;
		 $pname=explode("+", $pname);


		 
	//
	//
	// $pname = explode(",",$pname);
	// $chatfrom = explode(" ",$pname[0]);
	//
	// $chatfrom=substr($chatfrom[1],1,-1);
	//
	// $chatfrom=explode("+",$chatfrom);

	//echo $chatfrom[1];






    $unread = $chatHistory->unread;

		 //echo $message;
		 //echo $name[1];

		  // $tt=  "SELECT CONVERT_TZ('$dateformat','GMT','MET')";
      $sqlmyconsultation = "INSERT INTO chatHistory(dateAndTime,chatFrom,chatTo,message,unreadCount) VALUES ('$chatDate','$pname[1]','$chatTo','$message','$unread')";
		$retvalmyconsulation = mysql_query( $sqlmyconsultation, $dbhandle );
		if($retvalmyconsulation)
		{
		echo "chatStored";
		}
	}
  mysql_close($dbhandle);
	// $d=date("Y/m/d");
	// $a= date("h:i:s");



?>
