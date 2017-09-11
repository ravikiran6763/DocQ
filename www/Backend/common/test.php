<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
echo "string";
// if (isset($postdata))
// {
//     echo "hello";
// 		$r = json_decode($postdata);
// 		$loginphno = $r->userNum;
// 		$loginpw= $r->password;
//
// }
  mysql_close($dbhandle);
?>
