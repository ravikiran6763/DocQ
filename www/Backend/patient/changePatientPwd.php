<?php

		require 'headers.php';
		header('Content-type: text/html; charset=utf-8');
			$postdata = file_get_contents("php://input");

		if (isset($postdata))
		{

				$r=json_decode($postdata);
				$u=  $r->newPwd1;
				$p = $r->userPhone;

				$pwd = base64_encode($u);

				      $sql = "update patientDetails set patientPwd='$pwd' where patientPhone='$p'";
				      $retval = mysql_query( $sql, $dbhandle );
				      while($row = mysql_fetch_array($retval))
				      {
				        // echo $row;

				      }
							if($retval){
								echo "string";
							}

		}

		   mysql_close($dbhandle);

?>
