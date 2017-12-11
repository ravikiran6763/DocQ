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
	 $sql="select count(donoff.onoff) as noofonlinedoctors,spec.id,spec.special,spec.content,spec.description from doctorDetails as dd RIGHT JOIN speciality as spec ON dd.doctorSpecialityId=spec.special LEFT JOIN doctor_onoff as donoff ON donoff.doctor_phno=dd.doctorPhone  where spec.special like '%$sp%' and donoff.onoff=1 ";

	  // $sql="select (CASE WHEN onoff = 1 THEN onoff ELSE 2 END) as noofonlinedoctors,spec.id,spec.special,spec.content,spec.description from doctorDetails as dd RIGHT JOIN speciality as spec ON dd.doctorSpecialityId=spec.special LEFT JOIN doctor_onoff as donoff ON donoff.doctor_phno=dd.doctorPhone  where spec.special like '%$sp%'";
	  // echo $sql = "select count(donoff.onoff) as noofonlinedoctors,spec.id,spec.special,spec.content,spec.description from doctorDetails as dd,doctor_onoff donoff,speciality as spec where spec.special like '%$sp%' and dd.doctorPhone=donoff.doctor_phno and donoff.onoff=1 and dd.doctorSpecialityId like '%$sp%'";
		$retval = mysql_query( $sql, $dbhandle );
      if(! $retval )
      {
       die('Could not get data: ' . mysql_error());
      }

			$data = array();
	    while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
      {
				$docCount = $row['noofonlinedoctors'];
				// echo $docCount;
				if($docCount === "0"){
					// echo "nodoctors";
					$sql1="select spec.id,spec.special,spec.content,spec.description from doctorDetails as dd RIGHT JOIN speciality as spec ON dd.doctorSpecialityId=spec.special LEFT JOIN doctor_onoff as donoff ON donoff.doctor_phno=dd.doctorPhone  where spec.special like '%$sp%' ";
					$retval1 = mysql_query( $sql1, $dbhandle );
						if(! $retval1 )
						{
						 die('Could not get data: ' . mysql_error());
						}
						while($row1 = mysql_fetch_array($retval1, MYSQL_ASSOC))
			      {
							$data[] = $row1;
							array_push($data[0]['noofonlinedoctors'],0);

						}
				}
				else{
					$data[] = $row;

				}
				// $data[] = $row;
				// echo $data;
      }
			echo json_encode($data);


	}


mysql_close($dbhandle);



?>
