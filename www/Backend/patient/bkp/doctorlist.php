<?php


   require "headers.php";// DATABASE AND ACCESS CONTROL ALLOWED REGION ARE LOCATED HERE

   header('Content-type: text/html; charset=utf-8');

   $data = file_get_contents("php://input"); // TO RECIEVE POST REQUEST FROM ANGULAR JS

	$searchbydiffcriteria = array();
   //IF ANY POST DATA REQUESTED
if(isset($data))
{

  $request = json_decode($data);//DECODE THE REQUESTED POST DATA
  $byspecial = $request->byspecial;// SPECIALITY VALUE IS STORED HERE
  $bygender = $request->bygender; // GENDER VALUE IS STORED HERE
  $bystatus = $request->bystatus;//ON OFFLINE STATUS IS STORED HERE
  $bylanguage = $request->bylanguage;//LANGUAGE VALUE IS STORED HERE


//IF SPECIALITY IS SELECTED ENTER INSDIE LOOP
if($byspecial)
{
//GET ID OF THE SPECALITY FROM SPECILITY TABLE
  $sql = "select id from speciality  where special like '%$byspecial%'";
  $retval = mysql_query( $sql, $dbhandle );

  while($row = mysql_fetch_array($retval))
  {
    $specid = $row['id'];
  }
  if(! $retval )
  {
    die('Could not get data: ' . mysql_error());
  }
  if($bygender && $bystatus && $bylanguage)
  {
  //SPECIALITY,GENDER,STATUS AND LANGUAGE SELECTED
  // echo "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorSpecialityId like '%$byspecial%' AND doctorSex like '%$bygender%' AND  doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff = '$bystatus' AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%') and doctorDetails.doctorPhone=doctorImages.docPhone";
   $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorDetails.doctorPhone=doctorImages.docPhone and doctorSpecialityId like '%$byspecial%' AND doctorSex like '%$bygender%' AND  doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff = '$bystatus' AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%') ";
  }
  elseif($bygender && $bystatus)
  {
  //SPECILAITY,STATUS AND GENDER SELECTED
  // echo "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff = '$bystatus' AND doctorSpecialityId like '%$byspecial%' and  doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND  doctorSex like '%$bygender%'";
    $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff = '$bystatus' AND doctorSpecialityId like '%$byspecial%' and  doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND  doctorSex like '%$bygender%'";
  }
  elseif($bygender && $bylanguage)
  {
  //SPECIALITY,GENDER AND LANGUAGE SELECTED
  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorSpecialityId like '%$byspecial%' and  doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctorSex like '%$bygender%' AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%')";
  }
  elseif($bystatus && $bylanguage)
  {
  //SPECIALITY,LANGUAGE AND STATUS SELECTED
  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorSpecialityId like '%$byspecial%' and  doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff = '$bystatus' AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%')";
  }
  elseif($bygender)
  {
  //SPECIALITY AND GENDER SELECTED
  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorSpecialityId like '%$byspecial%' and  doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctorSex like '%$bygender%'";
  }
  elseif($bystatus)
  {
  //SPECIALITY AND STATUS SELECTED
  $sqlresults = "select docImage2,docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff = '$bystatus' AND doctorSpecialityId like '%$byspecial%'";
  }
  elseif($bylanguage)
  {
  //SPECIALITY AND LANGUAGE SELECTED
  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorSpecialityId like '%$byspecial%' and  doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%')";
  }
  else
  {
  //IF SPECIALITY IS SELECTED
   $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorDetails.doctorPhone = doctor_onoff.doctor_phno and doctorSpecialityId like '%$byspecial%'";
  }
}
elseif($bygender)
{
//IF GENDER IS SELECTED ENTER LOOP
  if($bystatus && $bylanguage)
  {
  //GENDER,LANGUAGE AND STATUS SELECTED
  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorSex='$bygender' AND doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff='$bystatus' AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%')";
  }
  elseif($bylanguage)
  {
  //IF GENDER AND LANGUAGE SELECTED
  // echo "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and  doctorSex='$bygender' AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%') group by doctor_onoff.doctor_phno";

   $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and  doctorSex='$bygender' AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%')  group by doctorImages.docPhone";
  }
  elseif($bystatus)
  {
  //GENDER AND STATUS SELECTED
  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorSex='$bygender' AND doctorDetails.doctorPhone = doctor_onoff.doctor_phno and doctor_onoff.onoff='$bystatus'";
  }
  else
  {


  //ONLY IF GENDER IS SELECTED
 //  $sqlresults = "select doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,(select avg(rating) from doctorRatings where doctorRatings.ratingTo=doctorDetails.doctorPhone) as ratings, (select count(*) from doctorRatings where doctorRatings.ratingTo=doctorDetails.doctorPhone) as totalRates from doctorDetails,doctor_onoff where doctorSex='$bygender' and doctorDetails.doctorPhone = doctor_onoff.doctor_phno "

$sqlresults = "select docImage2,onoff,doctorFname,doctorMname,ratings,doctorLname,ratingCount,doctorDegrees,practicingSince,doctorPhone from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctor_onoff.doctor_phno=doctorDetails.doctorPhone and doctorDetails.doctorSex='$bygender'";



}

}
elseif($bystatus)
{
//IF STATUS IS SELECTED ENTER LOOP
  if($bylanguage)
  {
  //STATUS AND LANGUAGE IS SELECTED

  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff='$bystatus' AND (doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%')";
  }
  else
  {
  //ONLY IF STATUS IS SELECTED
  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorDetails.doctorPhone = doctor_onoff.doctor_phno AND doctor_onoff.onoff='$bystatus'";

	// echo $sqlresults;


   }
}

elseif($bylanguage)
{
//ONLY IF LANGUAGE IS SELECTED
// echo "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%'";
  $sqlresults = "select docImage2,doctorFname,doctorLname,doctorPhone,doctorDegrees,practicingSince,onoff,ratings,ratingCount from doctorDetails,doctor_onoff,doctorImages where doctorImages.docPhone=doctorDetails.doctorPhone and doctorLanguage1 like  '%$bylanguage%' OR doctorLanguage2 like '%$bylanguage%' group by doctorImages.docPhone";
}
else
{
//IF NONE OF THE SEARCH CRITERIA IS SELECTED BY USER
echo "Please select Atleast One of Search Criteria to list Doctors";
}

//FOR ALL QUERIES BELOW LINES OF CODE IS TO EXECUTE
$retvalresults = mysql_query($sqlresults,$dbhandle);
if(! $retvalresults)
{
die('could not get data: '.mysql_error());
}
while($rowresults = mysql_fetch_array($retvalresults,MYSQL_ASSOC))
{
//echo  $rowresults['doctorLname'];
$searchbydiffcriteria[] = $rowresults;
}
echo json_encode($searchbydiffcriteria);
}

	mysql_close($dbhandle);

?>
