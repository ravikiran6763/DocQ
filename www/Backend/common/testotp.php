<?php


$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,'https://www.txtguru.in/imobile/api.php?');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS,'username=doctorquick&password=49332602&source=TALLYS&dmobile=919880801520&message=helllllo');

// in real life you should use something like:
// curl_setopt($ch, CURLOPT_POSTFIELDS,
//          http_build_query(array('postvar1' => 'value1')));

// receive server response ...
echo curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);





// $ch = curl_init('https://www.txtguru.in/imobile/api.php?');
// curl_setopt($ch, CURLOPT_POST, 1);
// curl_setopt($ch, CURLOPT_POSTFIELDS, "username=tallysolutions&password=49332602&source=TALLYS&dmobile=918073941036&message=helllllo");
// curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
// $data = curl_exec($ch);


?>
