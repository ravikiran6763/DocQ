<?php
require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");


		if (isset($postdata))
		{
		// echo "hello";
				$loginphno = json_decode($postdata);
	 				$myConsultation = array();
					$sql = "select doctorFname,doctorMname,doctorLname,doctorDetails.doctorPhone,doctorDegrees,practicingSince from doctorDetails where doctorPhone='$loginphno'";

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
