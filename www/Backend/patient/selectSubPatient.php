<?php

require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");
		if (isset($postdata))
		{
		// echo "hello";
				$subPatient = json_decode($postdata);
        $subPatId = $subPatient->subPatId;
         $mainPatient = $subPatient->mainPatient;
	 				$subPatientDetail = array();
					 $sql = "select id,newPatientFname,newPatientLname,newPatientDOB,newPatientSex,addedBy from addNewPatient where addedBy='$mainPatient' and id='$subPatId' order by newPatientFname";
					$retval = mysql_query( $sql, $dbhandle );

					while($row = mysql_fetch_array($retval))
					{
						$subPatientDetail[] = $row;

					}

					if(! $retval )
					{
						die('Could not get data: ' . mysql_error());
					}
					 echo json_encode($subPatientDetail);
		}
	 mysql_close($dbhandle);

?>
