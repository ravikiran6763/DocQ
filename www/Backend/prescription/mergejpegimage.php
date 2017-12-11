<?php


$png= imagecreatefrompng('dq_loginlogo.png');

list($newwidth, $newheight) = getimagesize('dq_loginlogo.png');

$newwidth = $newwidth - 200;
$newheight = $newheight -100;
$out = imagecreatetruecolor($newwidth, $newheight);
imagecopyresampled($out, $png, 0, 0, 0, 0, $newwidth, $newheight, $newwidth, $newheight);
imagecopyresampled($out, $png, 30, 20, 0, 0, $newwidth, $newheight, $newwidth, $newheight);
imagejpeg($out,'out.jpg');

?>
