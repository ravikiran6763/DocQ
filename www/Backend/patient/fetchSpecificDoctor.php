<?php
		require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");
		if (isset($postdata))
		{

				$loginphno = json_decode($postdata);
        $doctorDetails = array();

 				//$sql = "select doctorfname,doctorMname,doctorLname,doctorPhone,doctorDegrees,practicingSince,doctorSex,doctorCountry,doctorCity,doctorFee,doctorSpecialityId,onoff,(select avg(rating) from doctorRatings where doctorRatings.ratingTo=doctorDetails.doctorPhone) as ratings, (select count(*) from doctorRatings where doctorRatings.ratingTo=doctorDetails.doctorPhone) as totalRates from doctorRatings,doctorDetails,doctor_onoff where doctor_onoff.doctor_phno=doctorDetails.doctorPhone and doctorPhone='$loginphno' group by doctorDetails.doctorPhone";


		 $sql = "select docImage2,doctorFname,doctorMname,doctorLname,doctorDegrees,practicingSince,doctorFee,ratings,ratingCount,donoff.onoff from doctorDetails,doctor_onoff as donoff,favDoctors as fav,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and donoff.doctor_phno=doctorDetails.doctorPhone and doctorDetails.doctorPhone='$loginphno' group by docPhone";
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
