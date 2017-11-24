<?php

	require "headers.php";

	header('Content-type: text/html; charset=utf-8');

	$postdata = file_get_contents("php://input"); // TO RECIEVE POST REQUEST FROM ANGULAR JS


	if(isset($postdata))
	{

			$listofcontacts = array();
			$request=json_decode($postdata);
			$listofcontacts = $request->phnos;
			$query = $request->query;
			 $user = $request->user;
      // 
			//  $listofcontacts = '8073941036';
 			// // $query = $request->query;
 			//   $user = '9738162020';

			$query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";

			$query1="http://ec2-52-66-68-161.ap-south-1.compute.amazonaws.com/rateAdoctor.html?doc=$user";

			$Q=$query."  ".$query1;

			foreach($listofcontacts as $x => $y)
			{

				$ch = curl_init('https://www.txtguru.in/imobile/api.php?');
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, "username=doctorquick&password=41587026&source=DRQUCK&dmobile=91".$y."&message=$Q");
				curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
				$data = curl_exec($ch);
				echo $data;
			}



			// ?????????????????????????
			// $y='8073941036';
			// $query="http://ec2-52-66-68-161.ap-south-1.compute.amazonaws.com/rateAdoctor.html?doc=$y";
			// $ch = curl_init('https://www.txtguru.in/imobile/api.php?');
			// curl_setopt($ch, CURLOPT_POST, 1);
			// curl_setopt($ch, CURLOPT_POSTFIELDS, "username=tallysolutions&password=49332602&source=TALLYS&dmobile=91".$y."&message=$query");
			// curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
			// $data = curl_exec($ch);



	}

?>
