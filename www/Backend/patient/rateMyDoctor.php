<?php

		require 'headers.php';
		header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");

	if (isset($postdata))
	{

		$ratingDetails = json_decode($postdata);
		$rates = $ratingDetails->rates;
		$ratedBy= $ratingDetails->ratedBy;
		$ratedTo = $ratingDetails->ratedTo;
		$ratingComments= $ratingDetails->ratingComments;

			$sql = "INSERT INTO doctorRatings (rating,ratedBy, ratingTo,ratingComments,ratedDate) VALUES ('$rates', '$ratedBy', '$ratedTo','$ratingComments',now())";
			$retval = mysql_query( $sql, $dbhandle );
			// echo $retval;
	    	if(!$retval )
        {
					die('Could not enter data: ' . mysql_error());
					 echo "ERROR";

      	}
				else
				{
          echo "ratings inserted Successfully";
				}

	}
  mysql_close($dbhandle);

?>
