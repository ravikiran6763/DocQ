<?php

  require 'headers.php';
  header('Content-type: text/html; charset=utf-8');
  $postdata = file_get_contents("php://input");
  
if (isset($postdata))
{
// echo "hello";
		$r = json_decode($postdata);
		$loginphno = $r->userNum;
		$loginpw= $r->password;
		$loginpw = base64_encode($loginpw);//converts password string to encoded format

	
         

          $sql1 = "select count(*) as patient from patientDetails where patientPhone='$loginphno' and patientPwd='$loginpw'"; 
	 $retval1 = mysql_query( $sql1, $dbhandle );
          while($row1 = mysql_fetch_array($retval1))
          {
          		
	    $count1=$row1['patient'];
     
         	
	  }
	
	
	
	    if($count1 ==1)
            {
                echo "patient";

            }
	
     	    else
      	    {
       	
		
		$dsql = "select count(*) as doctor from doctorDetails where doctorPhone='$loginphno'  and doctorPwd='$loginpw' ";
       		$dretval = mysql_query( $dsql, $dbhandle );

       		while($row = mysql_fetch_array($dretval))
       		{
         		
		    $dcount=$row['doctor'];
         	
		 
       		}
		
		 if($dcount>0)
                     {

                         echo "doctor";
                      }



		

      	    }

    
    
    if(! $retval1 && !$dretval )
    {
      die('Could not get data: ' . mysql_error());
    }




}

  mysql_close($dbhandle);
?>
