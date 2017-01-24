<?php
		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		 $postdata = file_get_contents("php://input");

		if (isset($postdata))
		{
      // echo $postdata;
      $patient = json_decode($postdata);
      // $callDetails = array();

        $sql = "delete from  patientrequesteddoctor where patientphno='$patient' and ar_flag = 0" ;
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
