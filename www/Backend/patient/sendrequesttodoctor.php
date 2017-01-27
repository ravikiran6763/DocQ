<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	echo $postdata = file_get_contents("php://input");

if(isset($postdata))
{

	$request_from_patient = json_decode($postdata);
	$patient_phno = $request_from_patient->patientphno;
	$speciality = $request_from_patient->speciality;

	$fiveMins="SELECT count(id) as count  FROM reqForConsultation WHERE requestedTime > DATE_SUB(NOW(), INTERVAL 3 MINUTE) and patientNum='$patient_phno' and flag = 1 ";
	$fiveMinsRet = mysql_query( $fiveMins, $dbhandle );
	while($row = mysql_fetch_array($fiveMinsRet))
	{
	echo $count=$row['count'];
		if($count === '0'){
			$insertionvalues = "INSERT INTO reqForConsultation(patientNum,speciality,requestedTime) VALUES ('$patient_phno','$speciality',now())";
		 	$retval1 = mysql_query( $insertionvalues, $dbhandle );
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
		else{
			echo "wait";
		}
	}





}
mysql_close($dbhandle);

?>
