<?php
require 'headers.php';
header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
if (isset($postdata))
{
  // echo "string";

      $accptdReq =  json_decode($postdata);
       $consultID = $accptdReq->consultId;
			$patient = $accptdReq->patientphno;
       $doctor = $accptdReq->doctorphno;
      $accpetcode = $accptdReq->accpetcode;


     $consultStatus = array();

     $sql = "select flag from reqForConsultation where id='$consultID' and accptedDoctor='$doctor'";
     $retval = mysql_query( $sql, $dbhandle );
     while($row = mysql_fetch_array($retval))
     {
       $consultStatus[] = $row;
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
