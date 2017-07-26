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

			$sql = "select accptedDoctor as doctor from  reqForConsultation where id='$reqId' and flag=1;";
      $dretval = mysql_query( $sql, $dbhandle );
      while($row = mysql_fetch_assoc($dretval)) {
      //  echo "special :{$row['special']}  ";
       $sp=$row['doctor'];
      //  echo $sp;
				if($sp == $doctorphno){
					$accpteddoctor = "update reqForConsultation set flag=2,accptedDatetime=now() where patientNum='$patientphno' and id='$reqId' and accptedDoctor='$doctorphno'";
				}
				else{
					$accpteddoctor = "update reqForConsultation set flag=2,accptedDoctor='$doctorphno',accptedDatetime=now() where patientNum='$patientphno' and id='$reqId' and accptedDoctor is NULL";
				}
			  // echo $accpteddoctor;
			 $retval = mysql_query($accpteddoctor,$dbhandle);
				if (mysql_affected_rows() > 0) {
					echo "updated!";
				}
				else {
					echo "alreadyUpdated"; // always prints not affected
				}

			}




	}





?>
