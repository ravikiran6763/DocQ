<?php

		require 'headers.php';

		header('Content-type: text/html; charset=utf-8');

		  $postdata = file_get_contents("php://input");
		if (isset($postdata))
		{

         $ratedTo=json_decode($postdata);
        // $ratedBy = $myDocratedValues->ratedBy;
        //  $ratedTo = $myDocratedValues->ratedTo;
          $DocRatings = array();
					$count = array();

         $sql = "select count(*) as rated from doctorRatings where  ratingTo='$ratedTo' ";

        $retval = mysql_query( $sql, $dbhandle );

        while($row = mysql_fetch_array($retval))
        {
            $count=$row['rated'];
          // echo $count;
           $sql = "select sum(rating) as totalRtings from doctorRatings where  ratingTo='$ratedTo' ";

          $retval = mysql_query( $sql, $dbhandle );

          while($row = mysql_fetch_array($retval))
          {
                $total=$row['totalRtings'];
               $DocRatings=($total/$count);
							 array_push($DocRatings,$count);
          }

        }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }
        // echo json_encode($doctorDetails);
echo json_encode($DocRatings);
// echo json_encode($count);




		}
	 mysql_close($dbhandle);

?>
