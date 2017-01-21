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
			$reqId = $requesteddata->reqId;


			if($acceptcode ==1)
			{
					//UPDATE FOR THIS PATIENT AR_FLAG IN DATABASE AS 3 AND TIME AS NOW
					echo $accpteddoctor = "update patientrequesteddoctor set ar_flag=3,ar_time=now() where patientphno='$patientphno' and id='$reqId'";
					// echo $accpteddoctor;
					$retval = mysql_query($accpteddoctor,$dbhandle);
					if(! $retval )
					{
						die('Could not update data: ' . mysql_error());
					}
					//INSERT INTO DOCTORACCEPTED TABLE
					$accpetedtable = "INSERT INTO acceptedpatients(id,patientphno,doctorphno,acceptedtime) VALUES ('$reqId','$patientphno','$doctorphno',now())";
					$retval1 = mysql_query( $accpetedtable, $dbhandle );
					if(!$retval1 )
					{
						die('Could not enter data: ' . mysql_error());
						echo "ERROR";
					}
					else
					{
						$patientDetails = array();
						$sql = "select req.id,pt.patientFname,pt.patientMname,pt.patientLname,pt.patientAge,pt.patientSex,pt.patientPhone,pt.patientEmail,pt.patientPwd,im.image from patientDetails as pt,patientImages as im, patientrequesteddoctor as req where pt.patientPhone=im.patientphone and pt.patientPhone='$patientphno' and  req.id='$reqId'";
						$retval = mysql_query( $sql, $dbhandle );

						while($row = mysql_fetch_array($retval))
						{
							$patientDetails[] = $row;

						}

						if(! $retval )
						{
							die('Could not get data: ' . mysql_error());
						}
						 echo json_encode($patientDetails);
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
