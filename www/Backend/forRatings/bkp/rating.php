<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
// echo $_GET['number'];
if (isset($postdata))
{

    $loginphno = json_decode($postdata);
    $docNum=$loginphno->number;
    $doctorDetails = array();
    $sql = "select docImage2,onoff,doctorFname,doctorMname,doctorLname,doctorEmail,doctorPhone,doctorPwd,doctorDegrees,practicingSince,doctorAge,doctorSex,doctorCountry,doctorCity,doctorAddress1,doctorAddress2,doctorPincode,doctorLanguage1,doctorLanguage2,doctorBankName,doctorAccountNum,doctorBankIfsc,doctorFee,doctorSpecialityId,doctorMedFlag,doctorMedNum,ratings,ratingCount,playerId from doctorDetails,doctorImages,doctor_onoff where doctorPhone='$docNum' and doctorImages.docPhone=doctorDetails.doctorPhone and  doctorDetails.doctorPhone=doctor_onoff.doctor_phno";
    $retval = mysql_query( $sql, $dbhandle );
    while($row = mysql_fetch_array($retval))
    {
     $doctorDetails[] = $row;

    }

    if(! $retval )
    {
      die('Could not get data: ' . mysql_error());
    }
     echo json_encode($doctorDetails);
}
mysql_close($dbhandle);



?>
