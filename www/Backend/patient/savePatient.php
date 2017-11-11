<?php

		require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");
	if (isset($postdata))
	{
		// echo $postdata;

// echo "string";
		$patientAdded = json_decode($postdata);
		$addedBy = $patientAdded->addedBy;
		$fname= $patientAdded->fname;
		$lname= $patientAdded->lname;
		$dob= $patientAdded->dob;
		$sex= $patientAdded->sex;

		$addingPatient = "INSERT INTO addNewPatient(newPatientFname,newPatientLname,newPatientDOB,newPatientSex,addedBy) VALUES ('$fname','$lname','$dob','$sex','$addedBy')";

		//  $insertionvalues = "INSERT INTO consultRequest(patientphno,doctorphno,reqTime) VALUES ('$patient','$doctor',now())";
		$addingPatientVal = mysql_query( $addingPatient, $dbhandle );
		if(!$addingPatientVal)
		{
		// die('Could not enter data: ' . mysql_error());
		 echo "ERROR";
		}


	}
  // mysql_close($dbhandle);

?>
