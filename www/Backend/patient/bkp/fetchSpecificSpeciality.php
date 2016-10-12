<?php
require 'headers.php';

		header('Content-type: text/html; charset=utf-8');

	  $postdata = file_get_contents("php://input");

	if(isset($postdata))
	{
	
	 
	   $medicalspecialityId = $postdata; // GET THE CLICKED MEDICAL SPLECIALITY VALUES FROM APP
 
	
	

	 //GET ONLINE DOCTORS AND SPECIALITY WISE DETIAILS FROM SPECIAL,DOCTORDETAILS AND DOCTOR ONOFF TABLE	

	  $sql = "select count(donoff.onoff) as noofonlinedoctors,spec.id,spec.special,spec.content,spec.description from doctorDetails as dd,doctor_onoff donoff,speciality as spec where spec.id='$medicalspecialityId' and dd.doctorPhone=donoff.doctor_phno and donoff.onoff=1 and dd.doctorSpecialityId='$medicalspecialityId'";
	


	$retval = mysql_query( $sql, $dbhandle );



      if(! $retval )
      {
       die('Could not get data: ' . mysql_error());
      
      }

	$data = array();
	

      while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
      {
      
	$data[] = $row;
	

      }	

	echo json_encode($data);


	
	}
	

mysql_close($dbhandle);



?>
