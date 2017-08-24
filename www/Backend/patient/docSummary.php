<?php
require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");


		if (isset($postdata))
		{
		// echo "hello";
				$getDetails = json_decode($postdata);

        $calledDoctor = $getDetails->calledDoctor;// SPECIALITY VALUE IS STORED HERE
        $patient = $getDetails->patient; // GENDER VALUE IS STORED HERE

	 				$myConsultation = array();
					$sql = "select docImage2,doctorFname,doctorMname,doctorLname,doctorDetails.doctorPhone,doctorDegrees,practicingSince,ratings,ratingCount,count(doctorNum) as fav from doctorDetails,doctorImages,favDoctors where doctorPhone='$calledDoctor' and doctorDetails.doctorPhone=doctorImages.docPhone and doctorDetails.doctorPhone=favDoctors.doctorNum and patientNum='$patient'";
          $retval = mysql_query( $sql, $dbhandle );
					while($row = mysql_fetch_array($retval))
					{
						$myConsultation[] = $row;
					}
					if(! $retval )
					{
						die('Could not get data: ' . mysql_error());
					}
           echo json_encode($myConsultation);
		}
	 mysql_close($dbhandle);

?>
