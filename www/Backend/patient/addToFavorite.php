<?php

		require 'headers.php';
		header('Content-type: text/html; charset=utf-8');
		 $postdata = file_get_contents("php://input");

	if (isset($postdata))
	{

		$ratingDetails = json_decode($postdata);
		 $ratedBy= $ratingDetails->ratedBy;
     $ratedTo= $ratingDetails->ratedTo;
		 $favorite = $ratingDetails->favorite;

     $sql = "update doctorRatings set favorite='$favorite' where ratingTo='$ratedTo' and ratedBy='$ratedBy' ";
     $retval = mysql_query( $sql, $dbhandle );
     while($row = mysql_fetch_array($retval))
     {
       echo $row;
     }
     if(! $retval )
     {
       die('Could not get data: ' . mysql_error());
     }
      echo json_encode($ratingDetails);

	}
  mysql_close($dbhandle);

?>
