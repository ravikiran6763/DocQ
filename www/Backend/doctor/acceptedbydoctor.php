<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA

	if(isset($postdata))
	{
			$requesteddata = json_decode($postdata);
			$acceptcode = $requesteddata->accpetcode;
			$doctorphno = $requesteddata->doctorphno;
			$patientphno = $requesteddata->patientphno;
			$reqId = $requesteddata->consultId;


    $accpteddoctor = "update reqForConsultation set flag=2,accptedDoctor='$doctorphno',accptedDatetime=now() where patientNum='$patientphno' and id='$reqId'";
     // echo $accpteddoctor;
     $retval = mysql_query($accpteddoctor,$dbhandle);
     if(! $retval )
     {
       die('Could not update data: ' . mysql_error());
     }



	}





?>
