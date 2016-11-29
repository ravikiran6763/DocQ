<?php

	require "headers.php";
	//require "mergejpegimage.php";
	header('Content-type: text/html; charset=utf-8');
 $postdata = file_get_contents("php://input"); // TO RECIEVE POST REQUEST FROM ANGULAR JS


	if(isset($postdata))
	{

	      $request = json_decode($postdata);
	      $doctorphoneno = $request->docphno; //DOCTOR PHONE NO
	      $patientphoneno = $request->patientphno;//PATIENT PHONE NO
	      $diagnosis = $request->diagnosis;//DIAGNOSIS BY DOCTOR
	      $tests = $request->tests;//TESTSBY DOCTOR
	      $medication = $request->medication;//MEDICATION BY DOCTOR


	     //GET DOCTOR INFORMATION FROM DOCTORDETAILS TABLE
	     $doctorinformation = "select doctorFname,doctorMname,doctorLname,doctorDegrees,doctorCountry,doctorCity,doctorAddress1,doctorAddress2,doctorPincode from doctorDetails where  doctorPhone='$doctorphoneno'";
	     $retvaldoctorinformation = mysql_query( $doctorinformation, $dbhandle );
      	while($row = mysql_fetch_array($retvaldoctorinformation))
        {
        //GET DOCTOR INFORMATION FROM doctorDetails  TABLE
		     $doctor_fname = $row['doctorFname'];
		     $doctor_mname = $row['doctorMname'];
		     $doctor_lname = $row['doctorLname'];
		     $doctor_degrees = $row['doctorDegrees'];
		     $doctor_country = $row['doctorCountry'];
		     $doctor_city = $row['doctorCity'];
		     $doctor_address1 = $row['doctorAddress1'];
		     $doctor_address2 = $row['doctorAddress2'];
		     $doctor_pincode = $row['doctorPincode'];

		     $doctor_fullname = $doctor_fname." ".$doctor_mname." ".$doctor_lname;
		     $doctor_fulladdress = $doctor_address1." ".$doctor_address2;
		     $doctor_citypin = $doctor_country." ".$doctor_city." ".$doctor_pincode;
       	}

   		 if(! $retvaldoctorinformation)
    	 {
	   		die('Could not get data: ' . mysql_error());
	    	}
				//GET PATIENTINFORMATION FROM PATIENTDETAILS TABLE
             $patientinformation = "select patientFname,patientMname,patientLname,patientAge,patientSex from patientDetails where  patientPhone='$patientphoneno'";
             $retvalpatientinformation = mysql_query( $patientinformation, $dbhandle );
                while($row = mysql_fetch_array($retvalpatientinformation))
                {
	     						//GET PATIENT INFORMATION FROM patientDetails TABLE
                     $patient_fname = $row['patientFname'];
                     $patient_mname = $row['patientMname'];
                     $patient_lname = $row['patientLname'];
                     $patient_age = $row['patientAge'];
                     $patient_sex = $row['patientSex'];
                     $patient_fullname = $patient_fname." ".$patient_mname." ".$patient_lname;
                }
                 if(! $retvalpatientinformation)
                 {
                   die('Could not get data: ' . mysql_error());
                }

								//IF DIAGNOSIS IS MENTIONED BY THE DOCTOR ENTER INTO LOOP
		if($diagnosis)
		{
 			//IF TESTS AND MEDICATION SPECIFIED
			if($tests && $medication)
			{
			  $mentionedtests = $tests;
        $mentioneddiagnosis = $diagnosis;
			  $mentionedmedication = $medication;
			}
			if($tests)//ONLY TESTS SPECIFIED
			{
		   $mentionedtests = $tests;
       $mentioneddiagnosis = $diagnosis;
			}
			else
			{
				$mentioneddiagnosis = $diagnosis;
				$mentionedtests = "No Tests Recommended";
			}

			if($medication) //ONLY MEDICATION IS SPECIED
			{
			  $mentioneddiagnosis = $diagnosis;
        $mentionedmedication = $medication;
			}
			else
			{
			   //DIAGNOSIS IS MANDATORY
			   $mentioneddiagnosis = $diagnosis;
		    	$mentionedmedication = "No Medication Recommended";
			}
			if($diagnosis)
			{
		    $mentioneddiagnosis = $diagnosis;
			}

			//INSERT INTO DOCTORPRESCRIPTIONMENTIONED TABLE FOR FUTURE REFERENCES

			$prescriptionbydoctor = "INSERT INTO prescriptionbydoctor(doctorphone,patientphone,diagnosis,tests,medication,mentioneddatetime) VALUES ('$doctorphoneno', '$patientphoneno', '$mentioneddiagnosis','$mentionedtests','$mentionedmedication',now())";
      $retvalbyprescription = mysql_query( $prescriptionbydoctor, $dbhandle );
	 		if(!$retvalbyprescription )
      {
          die('Could not enter data: ' . mysql_error());
           echo "ERROR";
      }
      else
      {
			    //CREATE JPEG FOR THE PATIENT PRESCRIPTIOM MENTIONED BY THE DOCTOR

				 $my_img = imagecreate(1024,1024);
    		 $background = imagecolorallocate( $my_img, 255, 255, 255 );
  			 $text_colour = imagecolorallocate( $my_img, 0, 0, 0 );
   			 $text_colour_for_lined = imagecolorallocate( $my_img, 255, 255, 255 );
   			 $red   = imagecolorallocate($my_img, 0,   255,   0);
  	     $black = imagecolorallocate($my_img, 0, 0, 0);

				 imagefilledrectangle($my_img, 0, 200, 1024, 250, $black);
   				 imagefilledrectangle($my_img, 0, 400, 1024, 450, $black);
   				 imagefilledrectangle($my_img, 0, 600, 1024, 650, $black);
  				  imagefilledrectangle($my_img, 0, 800, 1024, 850, $black);
				imagestring( $my_img, 4, 800, 25, "Dr.$doctor_fullname", $text_colour );

				//DOCTOR INFORMATION LIKE NAME,ADDRESS,CITY,PIN AND DATE

				imagestring( $my_img, 4, 800, 60, "$doctor_degrees", $text_colour );
				imagestring( $my_img, 4, 600, 90, "$doctor_fulladdress", $text_colour );
				imagestring( $my_img, 4, 800, 120, "$doctor_citypin", $text_colour );
				imagestring( $my_img, 4, 800, 155, "2016-07-08", $text_colour );

				//PATIENT INFORMATION LIKE NAME,AGE AND SEX
				imagestring( $my_img, 4, 400, 215, "Patient Details", $text_colour_for_lined );
  				imagestring( $my_img, 4, 400, 275, "$patient_fullname", $text_colour);
				imagestring( $my_img, 4, 400, 295, "$patient_age", $text_colour);
				imagestring( $my_img, 4, 400, 315, "$patient_sex", $text_colour);

				//DIAGNOSIS SPECIFIED BY DOCTOR
				imagestring( $my_img, 4, 400, 415, "Diagnosis", $text_colour_for_lined );
				imagestring( $my_img, 4, 400, 480, "$mentioneddiagnosis", $text_colour);

				//TESTS SPECIFIED BY DOCTOR
				imagestring( $my_img, 4, 350, 615, "Tests Recommended and Other Remarks", $text_colour_for_lined );
				imagestring( $my_img, 4, 400, 680, "$mentionedtests", $text_colour);

				//MEDICATION SPECIFIED BY THE DOCTOR
				imagestring( $my_img, 4, 400, 815, "Medication", $text_colour_for_lined );
				imagestring( $my_img, 4, 400, 870, "$mentionedmedication", $text_colour);

				imagestring( $my_img, 4, 50, 950, "-sd-", $text_colour );
				imagestring( $my_img, 4, 50, 970, "$doctor_fullname", $text_colour );


 				 header( "Content-type: image/jpeg" );
				//GENERATE JPEG FORMAT IMAGE BASED ON CONSULTATION ID BY THE PATIENT
				imagejpeg( $my_img,"fromionic.jpeg");
				imagedestroy( $my_img );

			}
		}
		else
		{
		   echo "Please Mention Diagnosis as it is Mandatory";
		}
	}
mysql_close($dbhandle);

$png= imagecreatefrompng('dq_loginlogo.png');
$jpeg = imagecreatefromjpeg('fromionic.jpeg');

list($width, $height) = getimagesize('fromionic.jpeg');
list($newwidth, $newheight) = getimagesize('dq_loginlogo.png');

$out = imagecreatetruecolor($width, $height);
imagecopyresampled($out, $jpeg, 0, 0, 0, 0, $width, $height, $width, $height);
imagecopyresampled($out, $png, 30, 20, 0, 0, $newwidth, $newheight, $newwidth, $newheight);


$prescription=imagejpeg($out, 'out.jpeg');
$imagedata = file_get_contents("out.jpeg");
$base64Prescription = base64_encode($imagedata);

echo $base64Prescription;
?>
