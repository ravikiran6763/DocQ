<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input");


//echo $postdata;

	if (isset($postdata))
	{
		$details1=json_decode($postdata);
		$patient_phno = $details1->patient_phno;
		$doctor_phno = $details1->doctor_phno;
		$decidingparameter = $details1->decide;
		$startdate = $details1->startdate;
		$enddate = $details1->enddate;
		$callId = $details1->callid;

		// $patient_phno = '8792618138';
		// $doctor_phno = '9844992181';
		// $decidingparameter = 2;
		// $startdate = '2017-09-13';
		// $enddate = '2017-09-13';
		// $callId = 1235;

		$sql = "update reqForConsultation set callType='$decidingparameter',callStartTime='$startdate',callEndTime='$enddate',notesFlag=2  where patientNum='$patient_phno' and id='$callId'";
		// $sql = "update acceptedpatients set cal_flag='$decidingparameter',startTime='$startdate',endTime='$enddate'  where patientphno='$patient_phno' and doctorphno='$doctor_phno' and id='$callId'";
		// echo $sql;
		$retval = mysql_query( $sql, $dbhandle );
		while($row = mysql_fetch_array($retval))
		{
		echo $row;
		}
		if(! $retval )
		{
		die('Could not get data: ' . mysql_error());
		}
		// INSERT INTO MYCONSULTATION TABLE

		$sqlmyconsultation = "INSERT INTO myConsultations(consultationId,doctorPhone,patientPhone,consultDate) VALUES ('$callId','$doctor_phno', '$patient_phno',now())";
		$retvalmyconsulation = mysql_query( $sqlmyconsultation, $dbhandle );
		if(!$retvalmyconsulation)
		{
		// die('Could not enter data: ' . mysql_error());
		echo "ERROR";
		}
		else
		{
		echo "Query Submitted";
		echo	$deductAmount = "INSERT INTO patientWallet(patientPhone,consultationId,amountDeducted,debitedDatetime,consultDatetime,consultedWith) VALUES ('$patient_phno','$callId','250',now(),now(),'$doctor_phno')";
			$retvaldeductAmount = mysql_query( $deductAmount, $dbhandle );
			if(!$retvaldeductAmount)
			{
			// die('Could not enter data: ' . mysql_error());
			echo "ERROR";
			}
			$addAmount = "INSERT INTO DoctorWallet(docPhone,consultationAmount,patientPhone,consultationId,consultedDate) VALUES ('$doctor_phno','250','$patient_phno','$callId',now())";
			$retvalAddAmount = mysql_query( $addAmount, $dbhandle );
			if(!$retvalAddAmount)
			{
			// die('Could not enter data: ' . mysql_error());
			echo "ERROR";
			}
		}
	}


mysql_close($dbhandle);

?>
