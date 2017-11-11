<?php
require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");


		if (isset($postdata))
		{
		 //echo "hello";
				 $loginphno = json_decode($postdata);
	 				$myConsultation = array();




	 // $sql = "select doctorFname,doctorMname,doctorLname,doctorDetails.doctorPhone,consultationId,consultDate,doctorDegrees,practicingSince,message,date(dateAndTime) as date,unreadCount from doctorDetails,myConsultations,chatHistory where doctorDetails.doctorPhone  = myConsultations.doctorPhone and chatHistory.chatFrom=myConsultations.patientPhone and myConsultations.patientPhone='$loginphno' and dateAndTime=(select max(dateAndTime) from chatHistory where  chatFrom=myConsultations.patientPhone and chatTo=myConsultations.doctorPhone) group by doctorDetails.doctorPhone";
$sql =  "select docImage2,doctorFname,doctorMname,doctorLname,doctorDetails.doctorPhone,consultationId,consultDate,message,date(dateAndTime) as date,unreadCount from myConsultations,doctorDetails,chatHistory,doctorImages where patientPhone='$loginphno' and doctorImages.docPhone=doctorDetails.doctorPhone and myConsultations.doctorPhone=doctorDetails.doctorPhone and chatHistory.chatTo=myConsultations.patientPhone  and dateAndTime=(select max(dateAndTime) from chatHistory where  chatHistory.chatTo=myConsultations.patientPhone and chatFrom=myConsultations.doctorPhone) group by myConsultations.doctorPhone order by chatHistory.dateAndTime ";
        //   $sql="select docImage2,doctorFname,doctorMname,doctorLname,doctorDetails.doctorPhone,consultationId,consultDate,message,date(dateAndTime) as date,unreadCount from myConsultations,doctorDetails,chatHistory,doctorImages where patientPhone='$loginphno' and doctorImages.docPhone=doctorDetails.doctorPhone and myConsultations.doctorPhone=doctorDetails.doctorPhone and chatHistory.chatFrom=myConsultations.doctorPhone  and dateAndTime=(select max(dateAndTime) from chatHistory where  chatFrom=myConsultations.doctorPhone) group by myConsultations.doctorPhone";
					// $sql = "select doctorFname,doctorMname,doctorLname,doctorDetails.doctorPhone,consultationId,consultDate,doctorDegrees,practicingSince from doctorDetails,myConsultations where doctorDetails.doctorPhone=myConsultations.doctorPhone and myConsultations.patientPhone='$loginphno' group by myConsultations.doctorPhone";

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
