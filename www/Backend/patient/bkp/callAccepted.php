<?php
		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		 $postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

      $callDetails = array();

      $sql = "select acceptedpatients.id as callId,onoff,doctorPhone,doctorFname,doctorMname,doctorLname,doctorDegrees,practicingSince,doctorFee,cal_flag from doctor_onoff,doctorDetails,acceptedpatients where doctor_onoff.doctor_phno=doctorDetails.doctorPhone and doctorDetails.doctorPhone=acceptedpatients.doctorphno and acceptedpatients.patientphno='$postdata' and cal_flag=4";

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
