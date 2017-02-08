<?php
		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		 $postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

      $callDetails = array();

      $sql = "select reqForConsultation.id as callId,onoff,doctorPhone,doctorFname,doctorMname,doctorLname,doctorDegrees,practicingSince,doctorFee,flag,(select avg(rating) from doctorRatings where doctorRatings.ratingTo=doctorDetails.doctorPhone) as ratings, (select count(*) from doctorRatings where doctorRatings.ratingTo=doctorDetails.doctorPhone) as totalRates  from doctor_onoff,doctorDetails,reqForConsultation where doctor_onoff.doctor_phno=doctorDetails.doctorPhone and doctorDetails.doctorPhone=reqForConsultation.accptedDoctor and reqForConsultation.patientNum='$postdata' and flag=2 and viewFlag=1";
      $retval = mysql_query( $sql, $dbhandle );
      while($row = mysql_fetch_array($retval))
      {
        $callDetails[] = $row;

      }

      if(! $retval )
      {
        die('Could not get data: ' . mysql_error());
      }
       echo json_encode($callDetails);
      // echo $fromDate;
		}
	 mysql_close($dbhandle);

?>
