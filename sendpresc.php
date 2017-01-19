<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input");

if(isset($postdata))
{

		$request_from_patient = json_decode($postdata);
		$patient_phno = $request_from_patient->patientphno;
		$sendrequesttodoctor = $request_from_patient->specialityId;

		$sql = "select special from  speciality where id='$sendrequesttodoctor';";
		$dretval = mysql_query( $sql, $dbhandle );
		while($row = mysql_fetch_assoc($dretval)) {
		//  echo "special :{$row['special']}  ";
		 $sp=$row['special'];
		// echo $sp;

		}

	 $sendrequesttodoctor= "select dd.doctorPhone from doctorDetails as dd,doctor_onoff as donoff where dd.doctorPhone=donoff.doctor_phno and donoff.onoff=1 and dd.doctorSpecialityId like '%$sp%'";
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

			 $check_time = "select now() as now_time";
			$retval1 = mysql_query( $check_time, $dbhandle );
			while($row = mysql_fetch_assoc($retval1))
			{
			 	 $now_time=$row['now_time'];

			}
			 $check_last_time = "select requesteddatetime from patientrequesteddoctor where patientphno='$patient_phno' order by id desc limit 1";
			$retval2 = mysql_query( $check_last_time, $dbhandle );
			while($row = mysql_fetch_assoc($retval2))
			{

				$check_last_time2=$row['requesteddatetime'];
				 $check_future_time = "select ('$check_last_time2'+ interval 5 minute) ";
				$retval3 = mysql_query( $check_future_time, $dbhandle );
				while($row = mysql_fetch_assoc($retval3))
				{
					$check_future_time2=$row['$check_future_time'];
				}
			}

			if($now_time > $check_future_time2)
			{
				  	echo $insertionvalues = "INSERT INTO patientrequesteddoctor(patientphno,doctorphnos,requesteddatetime) VALUES ('$patient_phno','$phnos',now())";
						$retval1 = mysql_query($insertionvalues, $dbhandle );
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
			else {
					echo "wait";
			}
		}
  }
}
	mysql_close($dbhandle);

?>
