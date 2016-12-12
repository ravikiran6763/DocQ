
		

//genereates a random password
$letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
$specialChar="!@#$%&*()_+=?";
$numbers = rand(10000, 99999);
$prefix = "DQ";
$sufix = $letters[rand(0, 51)];
$middle=$specialChar[rand(0,12)];
$docPass= $prefix. $middle . $numbers . $sufix ;

  $docPass = base64_encode($docPass);


  $sql = "INSERT INTO doctor_details (doctorfname, doctormname, doctorlname,doctoremail,dpno,dpass) VALUES ('$doctorFname', '$doctorMname', '$doctorLname','$doctorEmail','$doctorPhone','$docPass')";

  $retval = mysql_query( $sql, $dbhandle );

        if(! $retval )
        {
          die('Could not enter data: ' . mysql_error());
        }
        else
        {
          echo "Data Submitted Sucessfully";
        }
