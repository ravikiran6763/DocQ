<?php
  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");


  if (isset($postdata))
  {
    //echo "hello";
    $loginphno = json_decode($postdata);
    $myConsultation = array();

    $sql =  "select docImage2,doctorFname,doctorMname,doctorLname,doctorDetails.doctorPhone,consultationId,consultDate,message,date(dateAndTime) as date,unreadCount from myConsultations,doctorDetails,chatHistory,doctorImages where patientPhone='$loginphno' and doctorImages.docPhone=doctorDetails.doctorPhone and myConsultations.doctorPhone=doctorDetails.doctorPhone and chatHistory.chatTo=myConsultations.patientPhone  and dateAndTime=(select max(dateAndTime) from chatHistory where  chatHistory.chatTo=myConsultations.patientPhone and chatFrom=myConsultations.doctorPhone) and consultDate >= DATE_SUB(NOW(), interval 7 day) and consultDate<=now() group by myConsultations.doctorPhone order by chatHistory.dateAndTime DESC";

    $retval = mysql_query( $sql, $dbhandle );
    while($row = mysql_fetch_array($retval))
    {
      $myConsultation[] = $row;

    }

    if(! $retval )
    {
      die('Could not get data: ' . mysql_error());
    }
    echo json_encode($myConsultation);
  }
  mysql_close($dbhandle);

?>
