<?php

require 'headers.php';
header('Content-type: text/html; charset=utf-8');
$postdata = file_get_contents("php://input");

if (isset($postdata))
{
echo $postdata;
  $details1=json_decode($postdata);
  $fname = $details1->fname;
  $lname = $details1->lname;
  $rates = $details1->rates;
  // $startdate = $details1->startdate;

  $ratings = "INSERT INTO ratingsToDoctor(firstName,lastName,doctorNum) VALUES ('$fname','$lname','$rates')";
  $retvalRatings = mysql_query( $ratings, $dbhandle );
  if(!$retvalRatings)
  {
  // die('Could not enter data: ' . mysql_error());
  echo "ERROR";
  }
}
mysql_close($dbhandle);

echo "string";


?>
