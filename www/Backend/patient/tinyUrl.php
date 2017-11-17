<?php
// echo file_get_contents('http://tinyurl.com/api-create.php?url='.'http://www.doctorquick.com/');
/* For example
http://tinyurl.com/api-create.php?url=http://www.fullondesign.co.uk/
Would return:
http://tinyurl.com/d4px9f
*/

require_once('Googl.class.php');

$googl = new Googl('YOUR_API_KEY');

// Shorten URL
$googl->shorten('http://www.google.com/');

// Look up long URL
$googl->expand('http://goo.gl/fbsS');

unset($googl);
?>
