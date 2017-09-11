<?php
require 'headers.php';
header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
if (isset($postdata))
{
  // echo "string";

      $consultID =  json_decode($postdata);



      $sql = " select count(*) as id from reqForConsultation where id='$consultID' and accptedDoctor is NULL";
     $retval = mysql_query( $sql, $dbhandle );
     while($row = mysql_fetch_array($retval))
     {
       $consultStatus = $row['id'];
       if($consultStatus == 0){
         $consultStatus ="expired";
       }
     }

     if(! $retval )
     {
       die('Could not get data: ' . mysql_error());
     }
      echo json_encode($consultStatus);
    // echo $fromDate;
}
mysql_close($dbhandle);

?>
