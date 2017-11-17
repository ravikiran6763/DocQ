<?
$ch = curl_init('https://www.txtguru.in/imobile/api.php?');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "username=doctorquick&password=41587026&source=TALLYS&dmobile=919844992181&message=test+message+dq");
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
$data = curl_exec($ch);
?>
