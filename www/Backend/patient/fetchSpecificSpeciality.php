<?php

		require 'headers.php';
		header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");

	if(isset($postdata))
	{

	   $medicalspecialityId = $postdata; // GET THE CLICKED MEDICAL SPLECIALITY VALUES FROM APP

						$sql = "select special from  speciality where id='$medicalspecialityId';";
						$dretval = mysql_query( $sql, $dbhandle );
						while($row = mysql_fetch_assoc($dretval)) {
						//  echo "special :{$row['special']}  ";
						$sp=$row['special'];
						// echo $sp;

						}
			// 	if(! $retval )
			// 	{
			// 	 die('Could not get data: ' . mysql_error());
			//
			// 	}

	 //GET ONLINE DOCTORS AND SPECIALITY WISE DETIAILS FROM SPECIAL,DOCTORDETAILS AND DOCTOR ONOFF TABLE
	   $sql = "select count(donoff.onoff) as noofonlinedoctors,spec.id,spec.special,spec.content,spec.description from doctorDetails as dd,doctor_onoff donoff,speciality as spec where spec.special like '%$sp%' and dd.doctorPhone=donoff.doctor_phno and donoff.onoff=1 and dd.doctorSpecialityId like '%$sp%'";
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
