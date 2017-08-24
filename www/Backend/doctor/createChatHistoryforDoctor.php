<?php


 require 'headers.php';
        header('Content-type: text/html; charset=utf-8');
         $postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
         date_default_timezone_set("Asia/Calcutta");

//	echo "FILE CALLED";

        //echo $postdata;

        if(isset($postdata))
        {

		$chatHistory = json_decode($postdata);

        $jj = $postdata;

        //echo $postdata->chatTo;




         $dateformat = $chatHistory->dateformat;

        //echo $chatHistory->dateformat;


        $chatTo = $chatHistory->chatTo;
                // echo "DateTime:".$dateformat;
                $jsDateTS = strtotime($dateformat);
                if ($jsDateTS !== false) {
                $chatDate=date('Y-m-d H:i:s', $jsDateTS );
                }

    $message = $chatHistory->message;

     $pname = $chatHistory->pname;
                 $pname=explode("+", $pname);


                 $unread = $chatHistory->unread;

               //echo $message;
               //echo $name[1];

	$sqltocount = "select unreadcount from ChatHistoryforDoctor where message='$message'";
$dretvalcount = mysql_query( $sqltocount, $dbhandle );
while($rowcount = mysql_fetch_assoc($dretvalcount)) {



if($rowcount['unreadcount'] == $unread)
{


        //echo "donothinh";

}
else
{

        $accpteddoctor = "update ChatHistoryforDoctor set unreadcount='$unread' where message='$message'";
// echo $accpteddoctor;
$retval = mysql_query($accpteddoctor,$dbhandle);


}


}





                // $tt=  "SELECT CONVERT_TZ('$dateformat','GMT','MET')";
    $sqlmyconsultation = "INSERT INTO ChatHistoryforDoctor(dateAndTime,chatFrom,message,unreadCount,chatTo) VALUES ('$chatDate','$pname[1]','$message','$unread','$chatTo')";
              $retvalmyconsulation = mysql_query( $sqlmyconsultation, $dbhandle );
              if($retvalmyconsulation)
              {
              echo "chatStored";
              }
      }
mysql_close($dbhandle);

	
	
	



?>
