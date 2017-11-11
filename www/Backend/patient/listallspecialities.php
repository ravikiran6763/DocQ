<?php

require 'headers.php';

	 $sql = "SELECT id,special,content,description FROM speciality where id not in (1,4,5,7,10) order by special";
		$retval = mysql_query( $sql, $dbhandle );



	   if(! $retval )
	   {
		  die('Could not get data: ' . mysql_error());
	   }

		 $data = array();


	   while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
	   {
		  $data[] = $row;

	   }


	   	 echo json_encode($data);


		mysql_close($dbhandle);




?>
