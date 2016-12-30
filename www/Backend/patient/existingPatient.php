<?php

	require 'headers.php';


	header('Content-type: text/html; charset=utf-8');
	$postdata = file_get_contents("php://input");



	if (isset($postdata))
	{


		$patient = json_decode($postdata);


			$sql = "select count(*) as exist from patientDetails where patientPhone='$patient'";
			$retval = mysql_query( $sql, $dbhandle );
      while($row = mysql_fetch_array($retval))
      {
        $count=$row['exist'];
        if($count ==1){
            echo "patient";
        }
        else{
          echo "NA";
        }
      }
	}
	mysql_close($dbhandle);

?>
