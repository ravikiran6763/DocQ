<?php
	
     require 'headers.php';


            header('Content-type: text/html; charset=utf-8');


                $postdata = file_get_contents("php://input"); //GET THE POST REQUESTED DATA
	
		if(isset($postdata))
		{


		   	 $requesteddata = json_decode($postdata);
		   	 $acceptcode = $requesteddata->accpetcode;
		  	 $doctorphno = $requesteddata->doctorphno;
		         $patientphno = $requesteddata->patientphno;
		  	
			if($acceptcode ==1)
			{

				
			    //UPDATE FOR THIS PATIENT AR_FLAG IN DATABASE AS 3 AND TIME AS NOW
			   
  			       $accpteddoctor = "update patientrequesteddoctor set ar_flag=3,ar_time=now() where patientphno='$patientphno'";
           
           			echo $accpteddoctor;
	        	
		
				$retval = mysql_query($accpteddoctor,$dbhandle);
            
           			 if(! $retval ) 
				 {	
             				
				      die('Could not update data: ' . mysql_error());
           			
				 }
        	   		
				//INSERT INTO DOCTORACCEPTED TABLE
					
				$accpetedtable = "INSERT INTO acceptedpatients(patientphno,doctorphno,acceptedtime) VALUES ('$patientphno','$doctorphno',now())";
			
             		        $retval1 = mysql_query( $accpetedtable, $dbhandle );
                       
				 if(!$retval1 )
                       		 {
                                	die('Could not enter data: ' . mysql_error());
                                	 echo "ERROR";
                       		 }
                       		 else
                      		 {
                               		
					 echo "Query Submitted";

					//CHECK WHETHER THE PATIENT REQUESTS VOICE,VIDEO OR DECLINE THE DOCTOR


	/*

					 $patientresult = "select count(*) as patientresult from acceptedpatients where patientphno='$patientphno' and doctorphno='$doctorphno' and cal_flag IN (1,2)";
        $resultpatientresult = mysql_query( $patientresult, $dbhandle );

        while($rowpatientresult = mysql_fetch_array($patientresult))
        {
         	 echo $rowpatientresult;

        }

        if(! $resultpatientresult )
        {
          die('Could not get data: ' . mysql_error());
        }
			
										
*/



                        	
				}

	
		
		
			}
			else
			{


				 //UPDATE FOR THIS PATIENT AR_FLAG IN DATABASE AS 3 AND TIME AS NOW FOR THIS DOCTOR

                               $declinedoctor = "update patientrequesteddoctor set ar_flag=3,ar_time=now() where patientphno='$patientphno' and doctorphnos='$doctorphno'";

                                echo $declinedoctor;


                                $retvaldecline = mysql_query($declinedoctor,$dbhandle);

                                 if(! $retvaldecline )
                                 {

                                      die('Could not update data: ' . mysql_error());

                                 }


		

			}






		}
	


            
	
?>
