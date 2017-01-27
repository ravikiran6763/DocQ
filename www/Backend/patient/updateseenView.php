<?php
		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		 $postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

      $callId = json_decode($postdata);
      // $callDetails = array();

      $sql = "update reqForConsultation set viewFlag=2 where id='$callId'";
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
