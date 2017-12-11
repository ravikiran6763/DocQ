<?php
		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{
			$doctoronoffdetials = json_decode($postdata);
			$doctorphone = $doctoronoffdetials->doctorphno;
			$onoffstatus = $doctoronoffdetials->onoff;

		echo	$doc_onoff = "SELECT count(*) as total_count from doctor_onoff where doctor_phno='$doctorphone'";
			$retval = mysql_query( $doc_onoff, $dbhandle );
			while($row = mysql_fetch_array($retval))
			{
				 $onoffcount[] = $row['total_count'];
				 if($onoffcount == 0)
				 {

					echo "$doctorphone";

						 $sql = "INSERT INTO doctor_onoff(doctor_phno,onoff) VALUES ('$doctorphone',0)";
						 $retval1 = mysql_query($sql,$dbhandle);
						  if(!$retval1 )
						  {
						 				 die('Could not enter data: ' . mysql_error());
						 					echo "ERROR";
						  }

				 }
				 else
				 {

					 $sql = "UPDATE doctor_onoff SET onoff='$onoffstatus' WHERE doctor_phno='$doctorphone'";
		       $retval = mysql_query( $sql, $dbhandle );
		       while($row = mysql_fetch_array($retval))
		       {
		         // echo $row;
						 echo $onoffstatus;

		       }

				 }
			}

		}
	 mysql_close($dbhandle);

?>
