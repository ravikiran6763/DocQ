<?php


require 'headers.php';
header('Content-type: text/html; charset=utf-8');
$postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
date_default_timezone_set("Asia/Calcutta");


//echo $postdata;

if(isset($postdata))
{
		$chathistroyios = json_decode($postdata);
		// echo "chatforDoctor";
		$pname = $chathistroyios[0]->pname;
		$chatTo = $chathistroyios[0]->chatTo;
		$chatDate = $chathistroyios[0]->dateformat;
		$unread = $chathistroyios[0]->unread;
		$message=$chathistroyios[0]->message;

		$chatTo = explode("+",$chatTo);

		$sqltocount = "select unreadcount from ChatHistoryforDoctor where message='$message'";
		$dretvalcount = mysql_query( $sqltocount, $dbhandle );
		while($rowcount = mysql_fetch_assoc($dretvalcount)) {

			if($rowcount['unreadcount'] == $unread)
			{

				//echo "donothinh";

			}
			else
			{

				$accpteddoctor = "update ChatHistoryforDoctor set unreadcount='$unread' where message='$message'";
				// echo $accpteddoctor;
				$retval = mysql_query($accpteddoctor,$dbhandle);


			}


		}

		$pname=explode("+", $chathistroyios[0]->pname);
		// echo $pname[1];
		//echo $chatTo;

		 $sqlmyconsultation = "INSERT INTO ChatHistoryforDoctor(dateAndTime,chatFrom,message,unreadCount,chatTo) VALUES ('$chatDate','$pname[1]','$message','$unread','$chatTo[1]')";
		$retvalmyconsulation = mysql_query( $sqlmyconsultation, $dbhandle );
		if($retvalmyconsulation)
		{
			echo "chatStored";
		}

		mysql_close($dbhandle);



}


?>
