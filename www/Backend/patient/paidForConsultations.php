<?php

		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

				$patientphno = json_decode($postdata);
        $walletDetails = array();


        $sql = " select docImage2,doctorFname,doctorMname,doctorLname,consultationId,amountDeducted,date(consultDatetime) as date,consultedWith from patientWallet,doctorDetails,doctorImages where patientPhone='$patientphno' and doctorDetails.doctorPhone=patientWallet.consultedWith and doctorDetails.doctorPhone=doctorImages.docPhone and consultationId is not NULL ";
        $retval = mysql_query( $sql, $dbhandle );

        while($row = mysql_fetch_array($retval))
        {
          $walletDetails[] = $row;

        }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }
         echo json_encode($walletDetails);
		}
	 mysql_close($dbhandle);

?>
