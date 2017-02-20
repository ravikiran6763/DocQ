<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
    $postdata = file_get_contents("php://input");

  if (isset($postdata))
  {
     $oneSignal = json_decode($postdata);

    $palyerId = $oneSignal->palyerId;
    $userNum= $oneSignal->userNum;
     $user= $oneSignal->user;


     $palyerId=trim($palyerId,'"');
    if($user == 'patient'){
    echo $loginUpdate = "update patientDetails set playerId='$palyerId' where patientPhone='$userNum'";
      $retLogin = mysql_query( $loginUpdate, $dbhandle );
      while($row = mysql_fetch_array($retLogin))
      {
      }
      if(! $retLogin )
      {
        die('Could not get data: ' . mysql_error());
      }
      else{
        echo "updayed";
      }
    }
    else if($user == 'doctor'){
    echo  $loginUpdate = "update doctorDetails set playerId='$palyerId' where doctorPhone='$userNum'";
      $retLogin = mysql_query( $loginUpdate, $dbhandle );
      while($row = mysql_fetch_array($retLogin))
      {
      }
      if(! $retLogin )
      {
        die('Could not get data: ' . mysql_error());
      }
      else{
        echo "updayed";
      }
    }
    else{
      //Do nothing
    }

  }
  mysql_close($dbhandle);

?>
