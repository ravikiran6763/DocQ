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
		echo	$reqId = $requesteddata->reqId;


			if($acceptcode ==1)
			{
					//UPDATE FOR THIS PATIENT AR_FLAG IN DATABASE AS 3 AND TIME AS NOW
					$accpteddoctor = "update patientrequesteddoctor set ar_flag=3,ar_time=now() where patientphno='$patientphno'";
					echo $accpteddoctor;
					$retval = mysql_query($accpteddoctor,$dbhandle);
					if(! $retval )
					{
						die('Could not update data: ' . mysql_error());
					}
					//INSERT INTO DOCTORACCEPTED TABLE
				echo	$accpetedtable = "INSERT INTO acceptedpatients(id,patientphno,doctorphno,acceptedtime) VALUES ('$reqId','$patientphno','$doctorphno',now())";
					$retval1 = mysql_query( $accpetedtable, $dbhandle );
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
			else
			{
				//UPDATE FOR THIS PATIENT AR_FLAG IN DATABASE AS 3 AND TIME AS NOW FOR THIS DOCTOR
				$declinedoctor = "update patientrequesteddoctor set ar_flag=3,ar_time=now() where patientphno='$patientphno' and doctorphnos='$doctorphno'";
				echo $declinedoctor;
				$retvaldecline = mysql_query($declinedoctor,$dbhandle);
				if(! $retvaldecline )
				{
				  die('Could not update data: ' . mysql_error());
				}
			}
	}





?>
