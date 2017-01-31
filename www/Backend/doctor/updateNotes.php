<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	 $postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA

	if(isset($postdata))
	{
			$requesteddata = json_decode($postdata);



     $accpteddoctor = "update reqForConsultation set notesFlag=4,declinedTime=now() where id='$requesteddata'";
     // echo $accpteddoctor;
     $retval = mysql_query($accpteddoctor,$dbhandle);
     if(! $retval )
     {
       die('Could not update data: ' . mysql_error());
     }



	}





?>
