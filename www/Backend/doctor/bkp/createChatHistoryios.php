<?php


	require 'headers.php';
      header('Content-type: text/html; charset=utf-8');
       $postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
       date_default_timezone_set("Asia/Calcutta");


     //echo $postdata;

      if(isset($postdata))
      {

	
	$chathistroyios = json_decode($postdata);

	//echo $chathistroyios[0]->chatTo;




	$pname = $chathistroyios[0]->pname;
	$chatTo = $chathistroyios[0]->chatTo;
	$chatDate = $chathistroyios[0]->dateformat;
	$unread = $chathistroyios[0]->unread;	
	$message=$chathistroyios[0]->message;






	$pname=explode("+", $chathistroyios[0]->pname);

	
	//echo $chatTo;



	echo $sqlmyconsultation = "INSERT INTO chatHistory(dateAndTime,chatFrom,chatTo,message,unreadCount) VALUES ('$chatDate','$pname[1]','$chatTo','$message','$unread')";
             $retvalmyconsulation = mysql_query( $sqlmyconsultation, $dbhandle );
             if($retvalmyconsulation)
             {
             	echo "chatStored";
             }
     
mysql_close($dbhandle);








      }


?>
