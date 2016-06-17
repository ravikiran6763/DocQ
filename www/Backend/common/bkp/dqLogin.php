<?php

require 'headers.php';


    header('Content-type: text/html; charset=utf-8');

$postdata = file_get_contents("php://input");


$servername = "dq-new.cn214rm1segx.us-west-2.rds.amazonaws.com";
$username = "Ishikaikku2016";
$password = "aishiteimasu";
$dbname = "tayokuki";

  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                                // set the PDO error mode to exception
                                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


if (isset($postdata))
{
// echo "hello";
		$r = json_decode($postdata);
		$loginphno = $r->userNum;
		$loginpw= $r->password;
		$loginpw = base64_encode($loginpw);//converts password string to encoded format
		$sql = "select count(*) as patient from patientDetails where patientPhone='$loginphno' and patientPwd='$loginpw' ";
		//$sql = "select count(*) as patient from patient_registration where ph_no='9844992181' and password='cmtpcmFu'";
		$retval = mysql_query( $sql, $dbhandle );
		while($row = mysql_fetch_array($retval))
		{
			$count=$row['patient'];
			if($count ==1){
					echo "patient";
			}
		}
		if(! $retval )
		{
			die('Could not get data: ' . mysql_error());
		}
		// $loginpw = base64_decode($loginpw);
		// echo $loginpw;
		$dsql = "select count(*) as doctor from doctorDetails where doctorPhone='$loginphno' and doctorPwd='$loginpw'";
		$dretval = mysql_query( $dsql, $dbhandle );
		while($row = mysql_fetch_array($dretval))
		{
			$dcount=$row['doctor'];
			if($dcount>0){
	
			echo "doctor";
			}
		}
		if(! $dretval )
		{
			die('Could not get data: ' . mysql_error());
		}

}

  mysql_close($dbhandle);
?>
