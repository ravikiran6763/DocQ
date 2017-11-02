<?php

		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

				$patientphno = json_decode($postdata);
        $walletDetails = array();
				$transactions = array();
				// $sql = " select transactionType as type from patientWallet where patientPhone='$patientphno'";
				// $sql = " select patientPhone,consultationId,consultDatetime,transactionId,transactionDatetime,amountCredited,creditedDatetime,amountDeducted,debitedDatetime,consultedWith from patientWallet where patientPhone='$patientphno'";
				$sql ="select docImage2,doctorFname,doctorMname,doctorLname,amountDeducted,debitedDatetime,consultationId,transactionDatetime,amountCredited,creditedDatetime from patientWallet LEFT JOIN doctorDetails ON doctorDetails.doctorPhone=patientWallet.consultedWith LEFT JOIN doctorImages ON doctorImages.docPhone=patientWallet.consultedWith where patientWallet.patientPhone='$patientphno' order by patientWallet.id;";
        $retval = mysql_query( $sql, $dbhandle );

        while($row = mysql_fetch_array($retval))
        {
					if(! $retval )
	        {
	          die('Could not get data: ' . mysql_error());
	        }
					$walletDetails[] = $row;

        }
				// $max = sizeof($walletDetails);
				$limit = count($walletDetails);
				$count=0;


         echo json_encode($walletDetails);
		}
	 mysql_close($dbhandle);

?>
