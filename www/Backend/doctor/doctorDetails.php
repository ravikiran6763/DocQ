<?php
		require 'headers.php';
    header('Content-type: text/html; charset=utf-8');
		$postdata = file_get_contents("php://input");
		
		if (isset($postdata))
		{

				$loginphno = json_decode($postdata);
        $doctorDetails = array();
        $sql = "select doctorFname,doctorMname,doctorLname,doctorEmail,doctorPhone,doctorPwd,doctorDegrees,practicingSince,doctorAge,doctorSex,doctorCountry,doctorCity,doctorAddress1,doctorAddress2,doctorPincode,doctorLanguage1,doctorLanguage2,doctorBankName,doctorAccountNum,doctorBankIfsc,doctorFee,doctorSpecialityId,doctorMedFlag,doctorMedNum from doctorDetails where doctorPhone='$loginphno' ";
        $retval = mysql_query( $sql, $dbhandle );

        while($row = mysql_fetch_array($retval))
        {
          $doctorDetails[] = $row;

        }

        if(! $retval )
        {
          die('Could not get data: ' . mysql_error());
        }
         echo json_encode($doctorDetails);
		}
	 mysql_close($dbhandle);

?>
