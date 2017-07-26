<?php

require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");


		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{
		// echo "hello";
				$loginphno = json_decode($postdata);
	 				$patientProfileImage = array();
					 $sql = "select image from patientImages where patientphone ='$loginphno'";
					$retval = mysql_query( $sql, $dbhandle );
					while($row = mysql_fetch_array($retval))
					{
						$patientProfileImage[] = $row;

					}

					if(! $retval )
					{
						die('Could not get data: ' . mysql_error());
					}
					 echo json_encode($patientProfileImage);
		}
	 mysql_close($dbhandle);

?>
