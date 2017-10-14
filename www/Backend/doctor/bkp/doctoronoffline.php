<?php

	require 'headers.php';

    	header('Content-type: text/html; charset=utf-8');

        $postdata = file_get_contents("php://input");
	
	$servername = "doctorquick.cy3fske9ly7g.us-west-2.rds.amazonaws.com:3306";
	$username = "doctorquick";
	$password = "aishiteimasu";
	$dbname = "tayokuki";

			
			try {
                               
				 $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                                // set the PDO error mode to exception
                                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                                if (isset($postdata))
                                {
				   
				  $doctoronoffdetials = json_decode($postdata);
				  $doctorphone = $doctoronoffdetials->doctorphno;
	 			  $onoffstatus = $doctoronoffdetials->onoff;
				  	

				  //Frame query
				  
				  $doc_onoff = mysql_query("SELECT count(*) as total_count from doctor_onoff where doctor_phno='$doctorphone'") or exit(mysql_error());
				  $rows_onoff = mysql_fetch_object($doc_onoff);
				  
				 //ONOFF COUNT
				  $onoffcount = $rows_onoff->total_count;
					
				  if($onoffcount == 0)
				  {

				   echo $doctorphone;	
				    //insert into table (doctor_onoff)
				      $sql = "INSERT INTO doctor_onoff(doctor_phno,onoff) VALUES ('$doctorphone',0)";
    					// use exec() because no results are returned
    					$conn->exec($sql);		
					

				  }
				  else
				  {
						
					 $sql = "UPDATE doctor_onoff SET onoff='$onoffstatus' WHERE doctor_phno='$doctorphone'";

    					// Prepare statement
    					$stmt = $conn->prepare($sql);

   					 // execute the query
    					$stmt->execute();		
				 
				  }	

				}				    

			  }
  			   catch(PDOException $e)
                	   {
               			 echo $sql . "<br>" . $e->getMessage();
               		    }

		
			$conn = null;




?>
