<?php

	require "headers.php";
	require "mergejpegimage.php";
	header('Content-type: text/html; charset=UTF-8');
  $postdata = file_get_contents("php://input"); // TO RECIEVE POST REQUEST FROM ANGULAR JS
	// ini_set('display_errors', 'On');

if(isset($postdata))
{

	      $request = json_decode($postdata);
	      $doctorphoneno = $request->docphno; //DOCTOR PHONE NO
	      $patientphoneno = $request->patientphno;//PATIENT PHONE NO
	      $diagnosis = $request->diagnosis;//DIAGNOSIS BY DOCTOR
	      $tests = $request->tests;//TESTSBY DOCTOR
	      $medication = $request->medication;//MEDICATION BY DOCTOR

				$subPatient = $request->subPatient;//MEDICATION BY DOCTOR




	      // $doctorphoneno = '9844992181'; //DOCTOR PHONE NO
	      // $patientphoneno = '8792618138';//PATIENT PHONE NO
	      // $diagnosis = 'Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum';//DIAGNOSIS BY DOCTOR
	      // $tests = 'Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum';//TESTSBY DOCTOR
	      // $medication = 'Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum';//MEDICATION BY DOCTOR


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
				$subPatient = (int)$subPatient;
				if($subPatient == 0)
				{

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

				}
				else{
					 $sql = "select id,newPatientFname,newPatientLname,newPatientDOB,newPatientSex,addedBy from addNewPatient where addedBy='$patientphoneno' and id='$subPatient' ";
					$retval = mysql_query( $sql, $dbhandle );

					while($row1 = mysql_fetch_array($retval))
					{
						$patient_fname = $row1['newPatientFname'];
						$patient_lname = $row1['newPatientLname'];
						$patient_age = $row1['newPatientDOB'];
						$patient_sex = $row1['newPatientSex'];
						$patient_fullname = $patient_fname."  ".$patient_lname;

					}

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
           print "ERROR";
      }
      else
      {
			    //CREATE JPEG FOR THE PATIENT PRESCRIPTIOM MENTIONED BY THE DOCTOR

					$preCount = "select max(id) as preCount from prescriptionbydoctor;";
 					$prscrption = mysql_query( $preCount, $dbhandle );
		       while($row = mysql_fetch_array($prscrption))
		       {
		         $preCount=$row['preCount'];

		       }


				 $my_img = imagecreate(920,1080) or die('Cannot create image');
    		 $background = imagecolorallocate( $my_img, 255, 255, 255 );
  			 $text_colour = imagecolorallocate( $my_img, 0, 0, 0 );
   			 $text_colour_for_lined = imagecolorallocate( $my_img, 255, 255, 255 );
				 $line_colour = imagecolorallocate( $my_img, 106, 145, 54 );
   			 $red   = imagecolorallocate($my_img, 0,   255,   0);
  	     $black = imagecolorallocate($my_img, 0, 0, 0);

				 $line_colour1 = imagecolorallocate( $my_img, 106, 145, 54 );

				 $font = 'Ubuntu-B.ttf';
				imagestring( $my_img, 20, 20, 20, "Dr.$doctor_fullname",$text_colour );
				// imagestring( $my_img, 4, 800, 25, "Dr.$doctor_fullname", $text_colour );

				//DOCTOR INFORMATION LIKE NAME,ADDRESS,CITY,PIN AND DATE

				imagestring( $my_img, 40, 20, 40, "$doctor_degrees", $text_colour );
				imagestring( $my_img, 60, 20, 60, "MCI No:123456", $text_colour );
				imagestring( $my_img, 80, 20, 80, "$doctor_fulladdress", $text_colour );
				imagestring( $my_img, 100, 20, 100, "$doctor_citypin", $text_colour );

				imagerectangle($my_img, 0, 0, 920, 1080, $line_colour1);
				// $thickness = 18;
				// imageline( $my_img, 0, 115, 920, 115, $line_colour );



				$thickness = 18;
				imageline( $my_img, 0, 165, 920, 165, $line_colour );
				//PATIENT INFORMATION LIKE NAME,AGE AND SEX
				imagerectangle($my_img, 0, 0, 920, 1080, $line_colour1);
				imagestring( $my_img, 185, 20, 185, "Patient Name: $patient_fullname",  $text_colour );
				imagestring( $my_img, 205, 20, 205, "Age: $patient_age ",  $text_colour );
				imagestring( $my_img, 205, 250, 205, "Gender:$patient_sex", $text_colour );
				$date= date("d/m/Y") ;
				imagestring( $my_img, 185, 750, 185, "Date:$date", $text_colour );


				//DIAGNOSIS SPECIFIED BY DOCTOR
				imagestring( $my_img, 90, 20, 260, "Diagnosis", $text_colour );
				imageline( $my_img, 20, 280, 110, 280,  $line_colour );

				$diagnosis="$mentioneddiagnosis";
				$diagnosisText=explode("\n",wordwrap($diagnosis,90,"\n"));
				$x=285;
				foreach($diagnosisText as $arr)
				{
				  $white=imagecolorallocate($my_img,0,0,0); //sets text color
				  imagestring($my_img,10,50,$x,trim($arr),$white); //create the text string for image,added trim() to remove unwanted chars
				  $x=$x+18;

				}

				imagestring( $my_img, 50, 20, 475, "Tests Recomended", $text_colour );
				imageline( $my_img, 20, 500, 170, 500, $line_colour );

				$tests="$mentionedtests";
				$testsText=explode("\n",wordwrap($tests,90,"\n"));
				$y=520;
				foreach($testsText as $arr)
				{
				  $white=imagecolorallocate($my_img,0,0,0); //sets text color
				  imagestring($my_img,10,50,$y,trim($arr),$white); //create the text string for image,added trim() to remove unwanted chars
				  $y=$y+18;

				}
				imagestring( $my_img, 60, 20, 700, "Medications",  $text_colour );
				imageline( $my_img, 20, 720, 120, 720, $line_colour );

				$medication="$mentionedmedication";
				$medicationText=explode("\n",wordwrap($medication,90,"\n"));
				$z=750;
				foreach($medicationText as $arr)
				{
				  $white=imagecolorallocate($my_img,0,0,0); //sets text color
				  imagestring($my_img,10,50,$z,trim($arr),$white); //create the text string for image,added trim() to remove unwanted chars
				  $z=$z+18;

				}

				imagestring( $my_img, 100, 60, 990, "-SD-",$text_colour );
				imagestring( $my_img, 1020, 60, 1020, "Dr.$doctor_fullname",$text_colour );
				imagestring( $my_img, 1050, 60, 1050, "$doctor_degrees", $text_colour );



 				 header( "Content-type: image/jpeg" );
				//GENERATE JPEG FORMAT IMAGE BASED ON CONSULTATION ID BY THE PATIENT

				imagejpeg( $my_img,"DocQuik$preCount.jpeg");
				imagedestroy($my_img);

				$png = imagecreatefrompng('dq_loginlogo.png');
				$jpeg = imagecreatefromjpeg("DocQuik$preCount.jpeg");

				list($width, $height) = getimagesize("DocQuik$preCount.jpeg");
				list($newwidth, $newheight) = getimagesize('dq_loginlogo.png');


				$out = @imagecreatetruecolor($width, $height)
      		or die('Cannot Initialize new GD image stream');
				// $out = imagecreatetruecolor($width, $height) or die('Cannot Initialize new GD image stream');

				// print "<img src='data:image/jpeg;base64," . base64_encode( $out )."'>"; //saviour line!
				imagecopyresampled($out, $jpeg, 0, 0, 0, 0, $width, $height, $width, $height);
				imagecopyresampled($out, $png, 680, 20, 0, 0, $newwidth, $newheight, $newwidth, $newheight);
				imagejpeg($out, "DocQuik$preCount.jpeg");
				$base64 = base64_encode($out);
				imagedestroy( $out );

			}
			print "DocQuik$preCount";

		}
		else
		{
		   print "DiagnosisError";
		}
}

	mysql_close($dbhandle);
?>
