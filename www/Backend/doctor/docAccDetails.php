<?php
require 'headers.php';
header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
if (isset($postdata))
{
  // echo "string";
  $docAccDetails = array();

     $docAccDetails =  json_decode($postdata);

     $docPhone = $docAccDetails->docPhone;
     $fromDate = $docAccDetails->fromDate;
     $toDate= $docAccDetails->toDate;

  $doctorAccDetails = array();

     $sql = "select patientFname,patientMname,patientLname,DoctorWallet.patientPhone,consultedDate,consultationAmount from DoctorWallet,patientDetails where docPhone ='$docPhone' and patientDetails.patientPhone=DoctorWallet.patientPhone";

     $retval = mysql_query( $sql, $dbhandle );

     while($row = mysql_fetch_array($retval))
     {
       $doctorAccDetails[] = $row;

     }

     if(! $retval )
     {
       die('Could not get data: ' . mysql_error());
     }
      echo json_encode($doctorAccDetails);
    // echo $fromDate;
}
mysql_close($dbhandle);

?>
