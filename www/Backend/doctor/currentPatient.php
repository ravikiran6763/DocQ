<?php


	//THE BELOW HEADER FILE INCLUDE DATABASE CONNECTION AND ACCESS CONTROL ALLOWED REGION CASES
	require "headers.php";
	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
	if (isset($postdata))
	{
			$requestedpatientlist = array();// TO STORE THE REQUESTED PATIENTS

      $requestpatientquery = "select img.image,pr.id,pr.patientNum,pr.requestedTime,pd.patientFname,pd.patientMname,pd.patientLname,pd.patientAge,pd.patientSex from patientDetails as pd,reqForConsultation as pr,patientImages as img where pr.patientNum=pd.patientPhone and img.patientphone=pd.patientPhone  and pr.accptedDoctor ='$postdata' and pr.flag=1 and pr.id not in(select reqId from declinedRequests where declinedDoctor='$postdata')";
			$retvaltodoctor = mysql_query( $requestpatientquery, $dbhandle );
			while($resultofrequestedpatient = mysql_fetch_array($retvaltodoctor))
			{
				$requestedpatientlist[] = $resultofrequestedpatient;//STORE THE RESULT TO ARRAY
			}
			if(!$retvaltodoctor)
			{
				die('Could not get data: ' . mysql_error());
			}



			//QUERY TO GET THE REQUESTED PATIENTS FOR PARTICULAR DOCTORS


				echo json_encode($requestedpatientlist);//SEND THE ENCODED DATA TO APP

	}
	mysql_close($dbhandle);//CLOSE THE DATABASE CONNECTION.
?>
