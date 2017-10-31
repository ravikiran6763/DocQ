<?php 
	
	require "headers.php";

	 header('Content-type: text/html; charset=utf-8');

   $postdata = file_get_contents("php://input"); // TO RECIEVE POST REQUEST FROM ANGULAR JS


        if(isset($postdata))
        {		

		//$listofcontacts = array();
		
	

                $request=json_decode($postdata);
		$listofcontacts = $request->phnos;
		$query = $request->query;
		
		foreach($listofcontacts as $x => $y)
		{
			
		       $ch = curl_init('https://www.txtguru.in/imobile/api.php?');
            	       curl_setopt($ch, CURLOPT_POST, 1);
		       curl_setopt($ch, CURLOPT_POSTFIELDS, "username=tallysolutions&password=49332602&source=TALLYS&dmobile=91".$y."&message=$query");
           	       curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
                 	$data = curl_exec($ch);


            		 echo $data;



		}



	

        }





?>
