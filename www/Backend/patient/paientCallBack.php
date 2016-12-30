<?php

		require 'headers.php';

		header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");

	if (isset($postdata))
	{

		$phone = json_decode($postdata);
			$sql = "INSERT INTO patientCallbackReq (patientPhone,dateTime) VALUES ('$phone', now())";
			$retval = mysql_query( $sql, $dbhandle );
			// echo $retval;
	    	if(!$retval )
        {
					die('Could not enter data: ' . mysql_error());
					 echo "ERROR";

      	}
				else
				{
					echo "Query Submitted";
				}

	}
  mysql_close($dbhandle);

?>
