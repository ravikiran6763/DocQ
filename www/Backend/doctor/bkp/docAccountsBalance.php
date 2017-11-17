<?php
require 'headers.php';
header('Content-type: text/html; charset=utf-8');
$postdata = file_get_contents("php://input");

if (isset($postdata))
{

    $docPhno = json_decode($postdata);
    $doctorDetails = array();
    $sql = "select sum(consultationAmount) as totalBal, sum(withdrawlAmount) as totalWithdrawl from DoctorWallet where docPhone ='$docPhno' ";

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
