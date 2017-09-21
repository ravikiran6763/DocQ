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


  		 $reqDecline = "INSERT INTO declinedRequests(reqId,declinedpatientNum,declinedDoctor,declinedDatetime) VALUES ('$reqId','$patientphno','$doctorphno',now())";
  		$retval1 = mysql_query( $reqDecline, $dbhandle );
  		if(!$retval1 )
  		{
  			die('Could not enter data: ' . mysql_error());
  			echo "ERROR";
  		}
      else {
        echo "declined";
			 $sql = "update reqForConsultation set flag=4,declinedTime=now() where accptedDoctor='$doctorphno' and id= '$reqId'";
			 $retval = mysql_query( $sql, $dbhandle );
			 while($row = mysql_fetch_array($retval))
			 {
				 echo $exist = $row['doctor'];
			 }
      }

 mysql_close($dbhandle);


	}





?>
