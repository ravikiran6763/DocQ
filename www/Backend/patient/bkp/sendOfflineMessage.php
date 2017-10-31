<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
  // echo $postdata;
if (isset($postdata))
{

    $message =  json_decode($postdata);
     $patient = $message->patient;
    $doctor = $message->doctor;

    $sql = "select patientFname,patientLname  from patientDetails where patientPhone='$patient'  ";
    //$sql = "select count(*) as patient from patient_registration where ph_no='9844992181' and password='cmtpcmFu'";
    $retval = mysql_query( $sql, $dbhandle );
    while($row = mysql_fetch_array($retval))
    {
      $fname=$row['patientFname'];
      $lname=$row['patientLname'];
      $name=$fname." ".$lname;

      // $docNum = $GLOBALS['name'];

    }

    $sql1 = "select doctorLname  from doctorDetails where doctorPhone='$doctor'  ";
    //$sql = "select count(*) as patient from patient_registration where ph_no='9844992181' and password='cmtpcmFu'";
    $retval1 = mysql_query( $sql1, $dbhandle );
    while($row = mysql_fetch_array($retval1))
    {
      $docName=$row['doctorLname'];


      // $docNum = $GLOBALS['name'];

    }

    $ch = curl_init('https://www.txtguru.in/imobile/api.php?');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "username=tallysolutions&password=49332602&source=TALLYS&dmobile=91".$doctor."&message=Hello+Dr.$docName,Mr.$name+wants+to+consult+you,please+go+online+in+DoctorQuick+to+accept+the+consultations.");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    $data = curl_exec($ch);
    echo json_encode($userPass);

}

  // mysql_close($dbhandle);
?>
