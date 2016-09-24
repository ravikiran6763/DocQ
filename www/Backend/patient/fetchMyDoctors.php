<?php

require "headers.php";

		header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");





		if (isset($postdata))
		{
				$loginphno = json_decode($postdata);

        $doctorDetails = array();

				$sql = "select doctorPhone from myConsultations where patientPhone =$loginphno order by consultationId desc limit 1";
				$retval = mysql_query( $sql, $dbhandle );
        while($row = mysql_fetch_array($retval))
        {

  				$sql1="select sum(rating) as totalRating,count(*) as totalCount,onoff,ratingTo,dd.doctorFname,dd.doctorMname,dd.doctorLname,dd.doctorDegrees,dd.practicingSince from doctor_onoff,doctorRatings,doctorDetails as dd where dd.doctorPhone=doctorRatings.ratingTo or doctor_onoff.doctor_phno=doctorRatings.ratingTo or dd.doctorPhone=$row[doctorPhone]";
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
