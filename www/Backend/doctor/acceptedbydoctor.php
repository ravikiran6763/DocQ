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

			 $sql = "select accptedDoctor as doctor,flag as f from  reqForConsultation where id='$reqId' and flag=1;";
      $dretval = mysql_query( $sql, $dbhandle );
      while($row = mysql_fetch_assoc($dretval)) {
      //  echo "special :{$row['special']}  ";
       $sp=$row['doctor'];
      //  echo $sp;
			  // echo $accpteddoctor;

			}

			if($sp == $doctorphno ){

				 $accpteddoctor = "update reqForConsultation set flag=2,accptedDatetime=now() where patientNum='$patientphno' and id='$reqId' and accptedDoctor='$doctorphno'";
			}

			else{
				$sql12 = "select count(*) as count,flag as f from  reqForConsultation where id='$reqId'";
				$dretval12 = mysql_query( $sql12, $dbhandle );
				while($row12 = mysql_fetch_assoc($dretval12))
				 {

						$flag=$row12['f'];
						$count=$row12['count'];


				 }
				if($count == 0)
 			 {
 					echo "idDoesNotExist";
 			 }
			 else{
						if($flag == 2)
						{
							echo "alreadyupdated";
						}
						else{
							$accpteddoctor = "update reqForConsultation set flag=2,accptedDoctor='$doctorphno',accptedDatetime=now() where patientNum='$patientphno' and id='$reqId' and accptedDoctor is NULL";
						}
			 }


			}
			$retval = mysql_query($accpteddoctor,$dbhandle);
			 if (mysql_affected_rows() > 0)
			 {

				echo "updated";



			 }

// update reqForConsultation set flag=2,accptedDoctor='9738162020',accptedDatetime=now() where patientNum='9844992181' and id='3514' and accptedDoctor is NULL



	}





?>
