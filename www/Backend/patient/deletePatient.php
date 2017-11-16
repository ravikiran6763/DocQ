<?php

require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{
		// echo "hello";
				echo $postdata;
        // echo $postdata;
        $patient = json_decode($postdata);
        $newPatientFname = $patient->newPatientFname;
        $newPatientLname = $patient->newPatientLname;
        $newPatientSex = $patient->newPatientSex;
        $newPatientDOB = $patient->newPatientDOB;
        $addedBy = $patient->addedBy;
        $id = $patient->id;



        $callDetails = array();

          $sql = "delete from  addNewPatient where addedBy='$addedBy' and id = '$id'" ;
          $retval = mysql_query( $sql, $dbhandle );
          while($row = mysql_fetch_array($retval))
          {
            echo $row;
          }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }
         echo json_encode($callDetails);

		}
	 mysql_close($dbhandle);

?>
