<?php
// if (!extension_loaded('gd')) {
//     if (!dl('gd.so')) {
//         echo "GD cannot be loaded";
//         exit;
//     }
// }else {
// 	echo "string";
// }
$im = imagecreatetruecolor(10,10);
imagepng($im,'',9); # Warning: imagepng(): Filename cannot be empty
imagepng($im,NULL,9); # works as expected
imagedestroy($im);
?>
