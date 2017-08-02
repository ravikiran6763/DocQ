<?php
		require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");
		if (isset($postdata))
		{

				$loginphno = json_decode($postdata);
        $doctorDetails = array();

 				//$sql = "select doctorfname,doctorMname,doctorLname,doctorPhone,doctorDegrees,practicingSince,doctorSex,doctorCountry,doctorCity,doctorFee,doctorSpecialityId,onoff,(select avg(rating) from doctorRatings where doctorRatings.ratingTo=doctorDetails.doctorPhone) as ratings, (select count(*) from doctorRatings where doctorRatings.ratingTo=doctorDetails.doctorPhone) as totalRates from doctorRatings,doctorDetails,doctor_onoff where doctor_onoff.doctor_phno=doctorDetails.doctorPhone and doctorPhone='$loginphno' group by doctorDetails.doctorPhone";


		$sql = "select doctorFname,doctorMname,doctorLname,doctorFee,doctorPhone,doctorDegrees,practicingSince,ratings,ratingCount,donoff.onoff from doctorDetails,doctor_onoff as donoff where donoff.doctor_phno=doctorDetails.doctorPhone and doctorDetails.doctorPhone='$loginphno'";
    $retval = mysql_query( $sql, $dbhandle );
        while($row = mysql_fetch_array($retval))
        {
          $doctorDetails[] = $row;
        }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }
         echo json_encode($doctorDetails);
		}
	 mysql_close($dbhandle);

?>
