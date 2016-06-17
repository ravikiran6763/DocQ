<?php

require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{
		// echo "hello";
				$loginphno = json_decode($postdata);
	 				$patientDetails = array();
					$sql = "select patientFname,patientMname,patientLname,patientAge,patientSex,patientPhone,patientEmail,patientPwd from patientDetails where patientPhone='$loginphno' ";
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
