<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
  // echo $postdata;
if (isset($postdata))
{
    $userNum = json_decode($postdata);
    $sql = "select count(*) as patient from patientDetails where patientPhone='$userNum'  ";
    //$sql = "select count(*) as patient from patient_registration where ph_no='9844992181' and password='cmtpcmFu'";
    $retval = mysql_query( $sql, $dbhandle );
    while($row = mysql_fetch_array($retval))
    {
      $count=$row['patient'];
      $PasswordDetails = array();
      if($count ==1){
          // echo "patient";

           $sql1 = "select patientPwd from patientDetails where patientPhone='$userNum'";
           $retval1 = mysql_query( $sql1, $dbhandle );
          while($row1 = mysql_fetch_array($retval1))
          {
          $PasswordDetails[] = $row1;
           $userPass= base64_decode($PasswordDetails[0][0]);
          }
      }
      else{

        $sql = "select count(*) as doctor from doctorDetails where doctorPhone='$userNum'  ";
        //$sql = "select count(*) as patient from patient_registration where ph_no='9844992181' and password='cmtpcmFu'";
        $retval = mysql_query( $sql, $dbhandle );
        while($row = mysql_fetch_array($retval))
        {
            $count=$row['doctor'];
            if($count ==1){
              $sql1 = "select doctorPwd from doctorDetails where doctorPhone='$userNum'";
              $retval1 = mysql_query( $sql1, $dbhandle );
              while($row1 = mysql_fetch_array($retval1))
              {
              $PasswordDetails[] = $row1;
              $userPass= base64_decode($PasswordDetails[0][0]);
              }
            }
        }

      }
    }

        $ch = curl_init('https://www.txtguru.in/imobile/api.php?');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "username=tallysolutions&password=49332602&source=TALLYS&dmobile=91".$userNum."&message=Your+Password+for+Logging+into+DoctorQuick+is:$userPass");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        $data = curl_exec($ch);

    echo json_encode($userPass);

}

  mysql_close($dbhandle);
?>
