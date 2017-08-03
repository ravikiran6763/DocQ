<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	 $postdata = file_get_contents("php://input");


// echo $postdata;

	if (isset($postdata))
	{
		$reqDetails=array();

		 $callData = json_decode($postdata);
     $patient = $callData->patient;
     $doctor = $callData->doctor;
		 $sql = "select doctorSpecialityId as special from  doctorDetails where doctorPhone='$doctor';";
		 $dretval = mysql_query( $sql, $dbhandle );
		 while($row = mysql_fetch_assoc($dretval)) {
		 //  echo "special :{$row['special']}  ";
		  $sp=$row['special'];

			$insertionvalues = "INSERT INTO reqForConsultation(patientNum,speciality,accptedDoctor,requestedTime) VALUES ('$patient','$sp','$doctor',now())";

		 //  $insertionvalues = "INSERT INTO consultRequest(patientphno,doctorphno,reqTime) VALUES ('$patient','$doctor',now())";
		 $retvalmyconsulation = mysql_query( $insertionvalues, $dbhandle );
		 if(!$retvalmyconsulation)
		 {
		 // die('Could not enter data: ' . mysql_error());
			 echo "ERROR";
		 }
		 else
		 {
		 // echo "Query Submitted";
			 $fiveMins="SELECT id as reqId,flag as callStatus FROM reqForConsultation order by id DESC limit 1";
			 $fiveMinsRet = mysql_query( $fiveMins, $dbhandle );
			 while($row = mysql_fetch_array($fiveMinsRet))
			 {
				 $reqDetails=$row;
			 }
		 }

		}


    echo json_encode($reqDetails);

	}


mysql_close($dbhandle);

?>
