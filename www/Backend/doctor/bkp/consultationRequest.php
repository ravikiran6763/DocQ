<?php


	//THE BELOW HEADER FILE INCLUDE DATABASE CONNECTION AND ACCESS CONTROL ALLOWED REGION CASES
	require "headers.php";
	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
	if (isset($postdata))
	{
			$doctorphno = $postdata; // GET THE DOCTOR PHONE NO.
			$requestedpatientlist = array();// TO STORE THE REQUESTED PATIENTS

      $sql = "select speciality.id as special from  doctorDetails,speciality where doctorPhone='$doctorphno' and speciality.special=doctorDetails.doctorSpecialityId ;";
      $dretval = mysql_query( $sql, $dbhandle );
      while($row = mysql_fetch_assoc($dretval)) {
      //  echo "special :{$row['special']}  ";
       $sp=$row['special'];
      //  echo $sp;


       $requestpatientquery = "select img.image,pr.id,pr.subPatientId,pr.patientNum,pr.requestedTime,ADDTIME(pr.requestedTime,'05:30:00') as awstime,pd.patientFname,pd.patientMname,pd.patientLname,FLOOR(DATEDIFF(now(),pd.patientAge)/365) as patientAge,pd.patientSex from patientDetails as pd,reqForConsultation as pr,patientImages as img where pr.patientNum=pd.patientPhone and img.patientphone=pd.patientPhone  and pr.speciality ='$sp' and pr.flag=1 and pr.id not in(select reqId from declinedRequests where declinedDoctor='$doctorphno')";
			$retvaltodoctor = mysql_query( $requestpatientquery, $dbhandle );
			while($resultofrequestedpatient = mysql_fetch_array($retvaltodoctor))
			{

			//	$toconvertdateandtime = $resultofrequestedpatient['awstime'];

			//	$converttimetoist = "select convert_tz('$toconvertdateandtime','+00:00','+05:30') as isttime";
			//	 $isttime = mysql_query( $converttimetoist, $dbhandle );
			//	whileesultoftime =  mysql_fetch_array($isttime))
				//{}

					//$awstime = $resultofrequestedpatient['awstime'];
					//$ist = date('Y-m-d H:i:s',strtotime($awstime)+19800);

					//echo $awstime;





				$requestedpatientlist[] = $resultofrequestedpatient;//STORE THE RESULT TO ARRAY
			}
			if(!$retvaltodoctor)
			{
				die('Could not get data: ' . mysql_error());
			}

      }


			//QUERY TO GET THE REQUESTED PATIENTS FOR PARTICULAR DOCTORS


				echo json_encode($requestedpatientlist);//SEND THE ENCODED DATA TO APP

	}
	mysql_close($dbhandle);//CLOSE THE DATABASE CONNECTION.
?>
