<?php

	require "headers.php";
	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input");


		if (isset($postdata))
		{
				$loginphno = json_decode($postdata);

        $doctorDetails = array();
				// $sql = "select doctor_onoff.onoff,doctorFname,doctorMname,doctorLname,doctorEmail,doctorDetails.doctorPhone,doctorPwd,doctorDegrees,practicingSince,doctorAge,doctorSex,doctorCountry,doctorCity,doctorAddress1,doctorAddress2,doctorPincode,doctorLanguage1,doctorLanguage2,doctorBankName,doctorAccountNum,doctorBankIfsc,doctorFee,doctorSpecialityId,doctorMedFlag,doctorMedNum from doctor_onoff,doctorDetails,myConsultations where doctor_onoff.doctor_phno=doctorDetails.doctorPhone and myConsultations.doctorPhone=doctorDetails.doctorPhone and myConsultations.patientPhone=$loginphno";
				//
				 $sql = "select ratingTo from doctorRatings where ratedBy =$loginphno and favorite='1'";
				// $sql = "select doctorPhone from myConsultations where patientPhone =$loginphno order by consultationId desc limit 1";

				$retval = mysql_query( $sql, $dbhandle );
        while($row = mysql_fetch_array($retval))
        {
					/*
					 $sql1="select sum(rating) as totalRating,count(*) as totalCount,onoff,ratingTo,doctorFname,doctorMname,doctorLname,doctorDegrees,practicingSince from doctor_onoff,doctorRatings,doctorDetails where doctorDetails.doctorPhone=doctorRatings.ratingTo and doctor_onoff.doctor_phno=doctorRatings.ratingTo and doctorRatings.ratingTo=$row[doctorPhone]";
					 */
					//  echo $row['ratingTo'];
  			 	 $sql1="select sum(rating) as totalRating,count(*) as totalCount,onoff,ratingTo,dd.doctorFname,dd.doctorMname,dd.doctorLname,dd.doctorDegrees,dd.practicingSince from doctor_onoff,doctorRatings,doctorDetails as dd where dd.doctorPhone=doctorRatings.ratingTo or doctor_onoff.doctor_phno=doctorRatings.ratingTo or dd.doctorPhone=$row[ratingTo]";
					 $retval1 = mysql_query( $sql1, $dbhandle );
	         while($row1 = mysql_fetch_array($retval1))
	         {
						 $doctorDetails[] = $row1;
					 }

        }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }





         echo json_encode($doctorDetails);
		}
	 mysql_close($dbhandle);

?>
