<?php

		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

				$patientphno = json_decode($postdata);
        $walletDetails = array();

        $sql = " select sum(amountCredited) as credit,sum(amountDeducted) as debit from patientWallet where patientPhone='$patientphno' ";
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
