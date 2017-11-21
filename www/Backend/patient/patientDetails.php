<?php

require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");


		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{
		// echo "hello";
				$loginphno = json_decode($postdata);
	 				$patientDetails = array();
					 $sql = "select patientFname,patientMname,patientLname,FLOOR(DATEDIFF(now(),patientAge)/365) as patientAge,patientSex,patientDetails.patientPhone,patientEmail,patientPwd,playerId,image from patientDetails,patientImages where patientDetails.patientPhone='$loginphno' and patientDetails.patientPhone=patientImages.patientphone";
					$retval = mysql_query( $sql, $dbhandle );

					while($row = mysql_fetch_array($retval))
					{
						$patientDetails[] = $row;

					}

					if(! $retval )
					{
						die('Could not get data: ' . mysql_error());
					}
					 echo json_encode($patientDetails);
		}
	 mysql_close($dbhandle);

?>
