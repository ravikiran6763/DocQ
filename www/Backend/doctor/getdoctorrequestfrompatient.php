<?php


	//THE BELOW HEADER FILE INCLUDE DATABASE CONNECTION AND ACCESS CONTROL ALLOWED REGION CASES
	require "headers.php";
	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
	if (isset($postdata))
	{
			$doctorphno = $postdata; // GET THE DOCTOR PHONE NO.
			$requestedpatientlist = array();// TO STORE THE REQUESTED PATIENTS

			//QUERY TO GET THE REQUESTED PATIENTS FOR PARTICULAR DOCTORS
			$requestpatientquery = "select img.image,pr.id,pr.patientphno,pr.requesteddatetime,pd.patientFname,pd.patientMname,pd.patientLname,pd.patientLname,pd.patientAge,pd.patientSex from patientDetails as pd,patientrequesteddoctor as pr,patientImages as img where pr.patientphno=pd.patientPhone and img.patientphone=pd.patientPhone  and pr.doctorphnos='$doctorphno' and pr.ar_flag=0";
			$retvaltodoctor = mysql_query( $requestpatientquery, $dbhandle );
			while($resultofrequestedpatient = mysql_fetch_array($retvaltodoctor))
			{
				$requestedpatientlist[] = $resultofrequestedpatient;//STORE THE RESULT TO ARRAY
			}
			if(!$retvaltodoctor)
			{
				die('Could not get data: ' . mysql_error());
			}

				echo json_encode($requestedpatientlist);//SEND THE ENCODED DATA TO APP

	}
	mysql_close($dbhandle);//CLOSE THE DATABASE CONNECTION.
?>
