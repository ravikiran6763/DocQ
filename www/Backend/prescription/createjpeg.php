<?php

	require "headers.php";


	$doctor_full_name = "Veeresh Sadanand Kolkur";
  $doctor_name = "Veeresh Kolkur";
  $degrees = "MBBS.MD (PG DIPLOMA)";
  $address = "H.No:2-209/47/87 OM Nagar Sedam Road,Gulbarga";
  $city_pin = "Gulbarga,585105";

  $date ="2016-07-04";
  $patient_information = "hi i am veeresh Sadanand kolkur staying in banashankari 3rd stage bangalore.working in hsr 6th sector greet technologies pvt ltd.<br/>hi hi hi hi hi hi hi";
  $diagnosis = "hi i am veeresh Sadanand kolkur staying in banashankari 3rd stage bangalore.working in hsr 6th sector greet technologies pvt ltd.<br/>hi hi hi hi hi hi hi";
  $tests = "hi i am veeresh Sadanand kolkur staying in banashankari 3rd stage bangalore.working in hsr 6th sector greet technologies pvt ltd.<br/>hi hi hi hi hi hi hi";
  $medication = "hi i am veeresh Sadanand kolkur staying in banashankari 3rd stage bangalore.working in hsr 6th sector greet technologies pvt ltd.<br/>hi hi hi hi hi hi hi";
//echo str_word_count($patient_information);
  $dq_logo = imagecreatefrompng('/Users/amittantia/Desktop/test.png');

  $font = 'CALIBRI.TTF';
    $my_img = imagecreate(1024,1024);
    $background = imagecolorallocate( $my_img, 255, 255, 255 );
    $text_colour = imagecolorallocate( $my_img, 0, 0, 0 );
    $text_colour_for_lined = imagecolorallocate( $my_img, 255, 255, 255 );
    $red   = imagecolorallocate($my_img, 0,   255,   0);
  $black = imagecolorallocate($my_img, 0, 0, 0);
  imagefilledrectangle($my_img, 0, 200, 1024, 250, $black);
    imagefilledrectangle($my_img, 0, 400, 1024, 450, $black);
    imagefilledrectangle($my_img, 0, 600, 1024, 650, $black);
    imagefilledrectangle($my_img, 0, 800, 1024, 850, $black);
    //$line_colour = imagecolorallocate( $my_img, 128, 255, 0 );
imagestring( $my_img, 4, 800, 25, "Dr.$doctor_name", $text_colour );
imagestring( $my_img, 4, 800, 60, "$degrees", $text_colour );
imagestring( $my_img, 4, 600, 90, "$address", $text_colour );
imagestring( $my_img, 4, 800, 120, "$city_pin", $text_colour );
imagestring( $my_img, 4, 800, 155, "$date", $text_colour );
//imagearc($my_img, 50, 50, 50, 50,  0, 360, $red);
imagestring( $my_img, 4, 400, 215, "Patient Details", $text_colour_for_lined );
  imagestring( $my_img, 4, 0, 255, "$patient_information", $text_colour);
//imageline($my_img, 0,200, 1024, 200, $black);
//imageline($my_img, 0,250, 1024, 250, $black);
imagestring( $my_img, 4, 400, 415, "Diagnosis", $text_colour_for_lined );
imagestring( $my_img, 4, 0, 455, "$diagnosis", $text_colour);
//
// imageline($my_img, 0,400, 1024, 400, $black);
// imageline($my_img, 0,450, 1024, 450, $black);
imagestring( $my_img, 4, 350, 615, "Tests Recommended and Other Remarks", $text_colour_for_lined );
// imageline($my_img, 0,600, 1024, 600, $black);
// imageline($my_img, 0,650, 1024, 650, $black);
imagestring( $my_img, 4, 0, 655, "$diagnosis", $text_colour);
imagestring( $my_img, 4, 400, 815, "Medication", $text_colour_for_lined );
// imageline($my_img, 0,800, 1024, 800, $black);
// imageline($my_img, 0,850, 1024, 850, $black);
imagestring( $my_img, 4, 0, 855, "$diagnosis", $text_colour);
imagestring( $my_img, 4, 50, 950, "-sd-", $text_colour );
imagestring( $my_img, 4, 50, 970, "$doctor_full_name", $text_colour );
$marge_right = 10;
$marge_bottom = 10;
$sx = imagesx($my_img);
$sy = imagesy($my_img);

  header( "Content-type: image/jpeg" );


//imagecopyresampled($dq_logo, $my_img, 10, 10,50, 50, imagesx($dq_logo), imagesy($dq_logo), $sx, $sy);

//imagecopymerge($dq_logo, $my_img,  $sx - imagesx($dq_logo), $sy - imagesy($dq_logo),$sx,$sy,imagesx($my_img), imagesy($my_img),50);




//imageline( $my_img, 30, 45, 165, 45, $line_colour );


imagejpeg( $my_img,"hello.jpeg");
//imagecolordeallocate( $line_color );
//imagecolordeallocate( $text_color );
//imagecolordeallocate( $background );
imagedestroy( $my_img );




?>
