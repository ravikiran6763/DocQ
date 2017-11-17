<?php

require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{
		// echo "hello";
				$loginphno = json_decode($postdata);
	 				$subPatients = array();
					 $sql = "select id,newPatientFname,newPatientLname,newPatientDOB,newPatientSex,addedBy from addNewPatient where addedBy='$loginphno' order by newPatientFname";
					$retval = mysql_query( $sql, $dbhandle );

					while($row = mysql_fetch_array($retval))
					{
						$subPatients[] = $row;

					}

					if(! $retval )
					{
						die('Could not get data: ' . mysql_error());
					}
					 echo json_encode($subPatients);
		}
	 mysql_close($dbhandle);

?>
