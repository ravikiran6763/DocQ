<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");

if (isset($postdata))
{
// echo "hello";
		$r = json_decode($postdata);
		$loginphno = $r->userNum;
		$loginpw= $r->password;
		$loginpw = base64_encode($loginpw);//converts password string to encoded format

       $sql1 = "select count(*) as patient,loginFlag as loggedState from patientDetails where patientPhone='$loginphno' and patientPwd='$loginpw'";
      $retval1 = mysql_query( $sql1, $dbhandle );
      while($row1 = mysql_fetch_array($retval1))
      {
        $count1=$row1['patient'];
        $states=$row1['loggedState'];

      }

      if($count1 ==1 && $states == 1)
      {
        echo "patient";

            $loginUpdate = "update patientDetails set loginFlag=2 where patientPhone='$loginphno'";
            $retLogin = mysql_query( $loginUpdate, $dbhandle );
            while($row = mysql_fetch_array($retLogin))
            {
            }
      }
      else if($count1 ==1 && $states == 2){
        echo "alreadyLoggedIn";
      }

      else
      {
        $dsql = "select count(*) as doctor,loginFlag as loggedState from doctorDetails where doctorPhone='$loginphno'  and doctorPwd='$loginpw' ";
        $dretval = mysql_query( $dsql, $dbhandle );

        while($row = mysql_fetch_array($dretval))
        {

        $dcount=$row['doctor'];
        $dState=$row['loggedState'];


        }

        if($dcount>0)
        {

         echo "doctor";
       }
      if(! $retval1 && !$dretval )
      {
        die('Could not get data: ' . mysql_error());
      }

    }
}
  mysql_close($dbhandle);
?>
