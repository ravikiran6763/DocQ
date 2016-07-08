<?php

		require 'headers.php';

		header('Content-type: text/html; charset=utf-8');

		 $postdata = file_get_contents("php://input");
		if (isset($postdata))
		{

        $ratedTo=json_decode($postdata);
        $ratedBy = $myDocratedValues->ratedBy;
         $ratedTo = $myDocratedValues->ratedTo;
          $rating = array();
          $sql = "select count(*) as rated from doctorRatings where  ratingTo='$ratedTo' ";

        $retval = mysql_query( $sql, $dbhandle );

        while($row = mysql_fetch_array($retval))
        {
            $count=$row['rated'];
          if($count ==1){

						 $sql1 = "select rating from doctorRatings where ratingTo='$ratedTo' ";

            $retval1 = mysql_query( $sql1, $dbhandle );
            while($row = mysql_fetch_array($retval1))
            {
              $rating[] = $row;
            }

    			}
          else {
            echo "string";
          }

        }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }
        // echo json_encode($doctorDetails);
echo json_encode($rating);



		}
	 mysql_close($dbhandle);

?>
