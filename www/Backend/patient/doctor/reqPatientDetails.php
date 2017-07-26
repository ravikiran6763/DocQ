<?php

require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		  $postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

      $reqPatient = json_decode($postdata);
       $reqId = $reqPatient->reqId;
       $pushReqPat= $reqPatient->reqPat;
      // echo "string";
	 				$patientDetails = array();
					 $sql = "select req.id,pt.patientFname,pt.patientMname,pt.patientLname,pt.patientAge,pt.patientSex,pt.patientPhone,pt.patientEmail,req.requestedTime,im.image from patientDetails as pt,patientImages as im, reqForConsultation as req where pt.patientPhone=im.patientphone and pt.patientPhone='$pushReqPat' and  req.id='$reqId'";
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
	 mysql_close($dbhandle);

?>
