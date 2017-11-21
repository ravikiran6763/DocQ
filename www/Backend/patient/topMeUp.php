<?php
    require 'headers.php';

    header('Content-type: text/html; charset=utf-8');

    $postdata = file_get_contents("php://input");


    if (isset($postdata))
    {
      $PaymentDetails = json_decode($postdata);
  	  $paymentId = $PaymentDetails->paymentId;
  	  $amountPaid= $PaymentDetails->amountPaid;
  	  $patientPhone = $PaymentDetails->patientPhone;

      $sql = "INSERT INTO patientWallet (transactionId,patientPhone,amountCredited,creditedDatetime) values ('$paymentId','$patientPhone','$amountPaid',now())";
			$retval = mysql_query( $sql, $dbhandle );
      if(mysql_error())
			// if(!$retval)
			{
				// die('Could not enter data: ' . mysql_error());
				 echo "ERROR";
			}
			else
			{
				echo "TransactionSuccessful";
      }
      	//  echo json_encode($patientDetails);
		}
	 mysql_close($dbhandle);

?>
