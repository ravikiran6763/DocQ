<?php

include("createjpeg.php");

$png= imagecreatefrompng('dq_loginlogo.png');
$jpeg = imagecreatefromjpeg('fromionic.jpeg');

list($width, $height) = getimagesize('fromionic.jpeg');
list($newwidth, $newheight) = getimagesize('dq_loginlogo.png');

#$newwidth = $newwidth - 200;
//$newheight = $newheight -100;
$out = imagecreatetruecolor($width, $height);
imagecopyresampled($out, $jpeg, 0, 0, 0, 0, $width, $height, $width, $height);
imagecopyresampled($out, $png, 30, 20, 0, 0, $newwidth, $newheight, $newwidth, $newheight);
imagejpeg($out, 'out.jpeg');

?>
