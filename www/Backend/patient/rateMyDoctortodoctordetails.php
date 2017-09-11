<?php

	require 'headers.php';
	header('Content-type: text/html; charset=utf-8');
	 $postdata = file_get_contents("php://input");



	if (isset($postdata))
	{
		//echo "POSTADATA";
		// echo $postdata;
		$ratedbypatient = json_decode($postdata);
		$ratedcounts = $ratedbypatient->rates;
		$todoctor = $ratedbypatient->ratedTo;
		$comment = $ratedbypatient->ratingComments;

		//VARIABLES TO INCREMENTS DOCTOR RATINGS EVERY TIME
		$incrementrating =0;
		$incrementratingcount = 0;

		//SELECT INITAL RATINGS AND RATING COUNTS OF DOCTOR

		$sqltoselectratings = "select ratings,ratingCount from doctorDetails where doctorPhone='$todoctor'";
		$retvaltoselectratings = mysql_query( $sqltoselectratings, $dbhandle );
		while($rowselectratings = mysql_fetch_array($retvaltoselectratings))
		{

			$incrementrating = $rowselectratings['ratings'] + $ratedcounts;
			$sqlupdatetodoctor = "update doctorDetails set ratings='$incrementrating',ratingCount=ratingCount+1  where  doctorPhone='$todoctor'";
			$retvalupdate = mysql_query( $sqlupdatetodoctor, $dbhandle );
			while($rowupdate = mysql_fetch_array($retvalupdate))
			{

			echo $rowupdate;

			}
		}
		if($ratedcounts <= 3){
			$sqlRates = "INSERT INTO doctorRatings(rating,ratingTo,ratingComments,ratedDate) VALUES ('$ratedcounts','$todoctor','$comment',now())";
			$retvalRates = mysql_query( $sqlRates, $dbhandle );
			if(!$retvalRates)
			{
			// die('Could not enter data: ' . mysql_error());
			echo "ERROR";
			}
			else
			{
			echo "Query Submitted";
			}
		}


	}

//UPDATE RATE VALUE ENTERED BY PATIENT TO DOCTORDETAILS TABLE

?>
