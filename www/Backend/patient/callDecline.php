<?php
		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		 $postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

			$declineDetails = json_decode($postdata);
			$patient = $declineDetails->patient;
			$doctor= $declineDetails->doctor;
			$callId= $declineDetails->callId;

      // $callDetails = array();
      $sql = "update reqForConsultation set flag=3,status=2 where patientNum='$patient' and id='$callId'";
      $retval = mysql_query( $sql, $dbhandle );
      while($row = mysql_fetch_array($retval))
      {
        echo $row;
      }

      if(! $retval )
      {
        die('Could not get data: ' . mysql_error());
      }
       echo json_encode($callDetails);
      // echo $fromDate;
		}
	 mysql_close($dbhandle);

?>
