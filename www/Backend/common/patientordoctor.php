<?php

	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

      header('Access-Control-Allow-Origin: *');


$dbhost = "dq-new.cn214rm1segx.us-west-2.rds.amazonaws.com";
$dbport = "3306";
$dbname = "tayokuki";

$dsn = "mysql:host={$dbhost};port={$dbport};dbname={$dbname}";
$username = "Ishikaikku2016";
$password = "aishiteimasu";


$dbh = new PDO($dsn, $username, $password);

	  $postdata = file_get_contents("php://input");


if (isset($postdata))
{
// echo "hello";
		$r = json_decode($postdata);
		$loginphno = $r->userNum;
		$loginpw= $r->password;
		$loginpw = base64_encode($loginpw);//converts password string to encoded format
		$sql = "select count(*) as patient from patient_registration where ph_no='$loginphno' and password='$loginpw' ";
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
		$dsql = "select count(*) as doctor from doctor_details where dpno='$loginphno' and dpass='$loginpw'";
		//		$dsql = "select count(*) as doctor from doctorregistration where dpno='$loginphno' and dpass=''";

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
