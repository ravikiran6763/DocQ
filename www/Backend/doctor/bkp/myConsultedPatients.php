<?php

		require 'headers.php';
		header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

				$loginphno = json_decode($postdata);
        $doctorDetails = array();
				// echo "string";

				  //$sql = "select image,patientFname,patientMname,patientLname,patientAge,patientSex,patientEmail,patientDetails.patientPhone,consultDate,message,date(dateAndTime) as date,unreadCount from patientDetails,myConsultations,patientImages,chatHistory where patientDetails.patientPhone = patientImages.patientphone and patientDetails.patientPhone = myConsultations.patientPhone and chatHistory.chatFrom=myConsultations.doctorPhone and myConsultations.doctorPhone='$loginphno' and dateAndTime=(select max(dateAndTime) from chatHistory where  chatTo=myConsultations.patientPhone and chatFrom=myConsultations.doctorPhone) group by patientDetails.patientPhone order by myConsultations.consultationId DESC";


	   $sql = "select image,patientFname,patientMname,patientLname,patientAge,patientSex,patientEmail,patientDetails.patientPhone,consultDate,message,date(dateAndTime) as date,unreadCount from patientDetails,myConsultations,patientImages,ChatHistoryforDoctor where patientDetails.patientPhone = patientImages.patientphone and patientDetails.patientPhone = myConsultations.patientPhone and ChatHistoryforDoctor.chatFrom=myConsultations.patientPhone and myConsultations.doctorPhone='$loginphno' and dateAndTime=(select max(dateAndTime) from ChatHistoryforDoctor where  ChatHistoryforDoctor.chatFrom=myConsultations.patientPhone and chatTo=myConsultations.doctorPhone) group by patientDetails.patientPhone order by myConsultations.consultationId DESC";


	$retval = mysql_query( $sql, $dbhandle );
        while($row = mysql_fetch_array($retval))
        {
          $doctorDetails[] = $row;
					 //$doctorDetails['patientPhone'];
        }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }
         echo json_encode($doctorDetails);
		}
	 mysql_close($dbhandle);

?>
