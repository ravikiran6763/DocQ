<?php

		require 'headers.php';
		header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

				$loginphno = json_decode($postdata);
        $doctorDetails = array();


				 $sql = "select image,patientFname,patientMname,patientLname,patientAge,patientSex,patientEmail,patientDetails.patientPhone,consultDate from patientDetails,myConsultations,patientImages where patientDetails.patientPhone = patientImages.patientphone and patientDetails.patientPhone = myConsultations.patientPhone and myConsultations.doctorPhone='$loginphno' group by patientDetails.patientPhone";

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