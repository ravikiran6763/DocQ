<?php

	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }



$dbhost = "dq-new.cn214rm1segx.us-west-2.rds.amazonaws.com";
$dbport = "3306";
$dbname = "tayokuki";

$dsn = "mysql:host={$dbhost};port={$dbport};dbname={$dbname}";
$username = "Ishikaikku2016";
$password = "aishiteimasu";

$dbh = new PDO($dsn, $username, $password);

   if($dbh)
   {

	$sql = 'SELECT name from test';

	$q = $dbh->prepare($sql);

	$q->execute(['%son']);

	$q->setFetchMode(PDO::FETCH_ASSOC);


	while ($r = $q->fetch())
	{
	 	   echo sprintf('%s <br/>', $r['name']);
	}



   }
   else
   {

     echo "Error in Connecting to Database";

   }

?>
