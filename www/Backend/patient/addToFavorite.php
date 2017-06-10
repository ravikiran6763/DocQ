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

		 if($favorite == 1){
			$fav = "INSERT INTO favDoctors(patientNum,doctorNum) VALUES ('$ratedBy', '$ratedTo')";
	 		$retvalmyconsulation = mysql_query( $fav, $dbhandle );
	 		if(!$retvalmyconsulation)
	 		{
	 		// die('Could not enter data: ' . mysql_error());
	 		echo "ERROR";
	 		}
	 		else
	 		{
	 		//echo "added";
	 		}
		 }
		 else{
			 $del = "delete from favDoctors where patientNum='$ratedBy' and doctorNum='$ratedTo'";
 	 		$retval = mysql_query( $del, $dbhandle );
 	 		if(!$retval)
 	 		{
 	 		// die('Could not enter data: ' . mysql_error());
 	 		echo "ERROR";
 	 		}
 	 		else
 	 		{
 	 		echo "removed";
 	 		}
		 }
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
