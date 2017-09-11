<?php


	require 'headers.php';
      header('Content-type: text/html; charset=utf-8');
       $postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
       date_default_timezone_set("Asia/Calcutta");


     //echo $postdata;

      if(isset($postdata))
      {


				$chathistroyios = json_decode($postdata);

	for($i=0;$i<=sizeof($chathistroyios);$i++)
	{

			$pname = $chathistroyios[$i]->pname;
		  $pname=explode("+", $pname);
			$chatTo = $chathistroyios[$i]->chatTo;
			$chatTo = explode("+",$chatTo);

			$chatDate = $chathistroyios[$i]->dateformat;
			$unread = $chathistroyios[$i]->unread;
			$message=$chathistroyios[$i]->message;

      $sqltocount = "select unreadcount from chatHistory where message='$message'";
			$dretvalcount = mysql_query( $sqltocount, $dbhandle );
			while($rowcount = mysql_fetch_assoc($dretvalcount)) {


        if($rowcount['unreadcount'] == $unread)
        {


                //echo "donothinh";

        }
        else
        {

                $accpteddoctor = "update chatHistory set unreadcount='$unread' where message='$message'";
  						 $retval = mysql_query($accpteddoctor,$dbhandle);


        }


}

 $sqlmyconsultation = "INSERT INTO chatHistory(dateAndTime,chatFrom,message,unreadCount,chatTo) VALUES ('$chatDate','$pname[1]','$message','$unread','$chatTo[1]')";
             $retvalmyconsulation = mysql_query( $sqlmyconsultation, $dbhandle );
             if($retvalmyconsulation)
             {
             	echo "chatStored";
             }

					 }

mysql_close($dbhandle);








      }


?>
