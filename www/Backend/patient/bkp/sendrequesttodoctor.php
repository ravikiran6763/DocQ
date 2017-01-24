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

			$fiveMins="SELECT count(id) as count  FROM patientrequesteddoctor WHERE requesteddatetime > DATE_SUB(NOW(), INTERVAL 5 MINUTE) and patientphno='$patient_phno' and ar_flag = 0 ";
			$fiveMinsRet = mysql_query( $fiveMins, $dbhandle );
			while($row = mysql_fetch_array($fiveMinsRet))
			{
				 $count=$row['count'];
				if($count === '0'){
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
				else{
					echo "wait";
				}
			}

		}
  }
}
	mysql_close($dbhandle);

?>
