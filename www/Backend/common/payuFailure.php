<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
$hello="string";
  echo json_encode($hello);
  window.close();
?>
