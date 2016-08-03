<?php
	
	require 'headers.php';

                header('Content-type: text/html; charset=utf-8');

          $postdata = file_get_contents("php://input");



        if(isset($postdata))
        {

		$request_from_patient = json_decode($postdata);
		$patient_phno = $request_from_patient->patientphno;
		$sendrequesttodoctor = $request_from_patient->specialityId;
		

	$sendrequesttodoctor= "select dd.doctorPhone from doctorDetails as dd,doctor_onoff as donoff where dd.doctorPhone=donoff.doctor_phno and donoff.onoff=1 and dd.doctorSpecialityId='$sendrequesttodoctor'"; 	

	

$retval = mysql_query( $sendrequesttodoctor, $dbhandle );



      if(! $retval )
      {
       die('Could not get data: ' . mysql_error());

      }



      while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
      {

	       	
	$phnos = $row['doctorPhone'];

	if($phnos)
	{


	  	$insertionvalues = "INSERT INTO patientrequesteddoctor(patientphno,doctorphnos,requesteddatetime) VALUES ('$patient_phno','$phnos',now())";
		

		$retval1 = mysql_query( $insertionvalues, $dbhandle );
                        if(!$retval1 )
                        {
                                die('Could not enter data: ' . mysql_error());
                                 echo "ERROR";
                        }
                        else
                        {
                                echo "Query Submitted";
                        }
	
 
			sleep(5);
	

	}



      }

    


        }


	
	mysql_close($dbhandle);



?>
