<?php
require 'headers.php';

		header('Content-type: text/html; charset=utf-8');

		$postdata = file_get_contents("php://input");

    $sql = "SELECT id,special,content,description FROM speciality where id='$postdata' order by special";
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
