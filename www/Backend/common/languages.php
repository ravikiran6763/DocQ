<?php

require 'headers.php';

	 $sql = "SELECT language  FROM indianLanguages order by language";
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
