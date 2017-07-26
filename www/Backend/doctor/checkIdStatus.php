<?php
require 'headers.php';
header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
if (isset($postdata))
{
  // echo "string";

      $consultID =  json_decode($postdata);
      $docNum= $consultID->declinedDoc;
      $id= $consultID->id;

      $sql = "select count(*) as idCount  from reqForConsultation where id='$id'";
     $retval = mysql_query( $sql, $dbhandle );
     while($row = mysql_fetch_array($retval))
     {
       $exist = $row['idCount'];

    

     }

     if(! $retval )
     {
       die('Could not get data: ' . mysql_error());
     }
      echo $exist;
    // echo $fromDate;
}
mysql_close($dbhandle);

?>
