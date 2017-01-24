<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");

  if (isset($postdata))
  {
    $loginphno = json_decode($postdata);
    $loginUpdate = "update patientDetails set loginFlag=1 where patientPhone='$loginphno'";
    $retLogin = mysql_query( $loginUpdate, $dbhandle );
    while($row = mysql_fetch_array($retLogin))
    {
    }
    if(! $retLogin )
    {
      die('Could not get data: ' . mysql_error());
    }
    else{
      echo "loggedOut";
    }
  }
  mysql_close($dbhandle);

?>
