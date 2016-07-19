<?php
require 'headers.php';
header('Content-type: text/html; charset=utf-8');
 $postdata = file_get_contents("php://input");
if (isset($postdata))
{
  // echo "string";
  $docAccDetails = array();
     $docAccDetails =  json_decode($postdata);

    echo $fromDate = $docAccDetails->fromDate;
    echo $toDate= $docAccDetails->toDate;
    // echo $fromDate;
}

?>
