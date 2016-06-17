<?php

$letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
$specialChar="!@#$%&*()_+=?";
$numbers = rand(10000, 99999);
$prefix = "DQ";
$sufix = $letters[rand(0, 51)];
$middle=$specialChar[rand(0,12)];

$string = $prefix. $middle . $numbers . $sufix ;
echo $string."<br>";
	$string = base64_encode($string);
echo "encoded"."<br>";
echo $string."<br>";
echo "decoded"."<br>";
$string = base64_decode("RFE/MzEyMDNJ");
echo $string."<br>";

$num = rand(1000,9999);

echo $num;

?>
