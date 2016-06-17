#!/usr/bin/perl

require "variable_index.pl";
require "database.pl";
&database;
require "request.pl";
&request;


$nowtime = time;
my($todaysecond, $todayminute, $todayhour, $todaydayofmonth, $todaymonth, $todayyear, $todayweekday, $todaydayofyear, $todayisdst)=localtime($nowtime);

$datalength=$ENV{'QUERY_STRING'};
@qpairs=split(/&/,$datalength);
for ($i=0; @qpairs[$i]; $i++) {
($name,$value) = split(/=/,@qpairs[$i]);
$value =~ tr/+/ /;
$value =~ s/%([\da-fA-F][\da-fA-F])/pack("C", hex ($1))/eg;
$name =~ tr/+/ /;
$name =~ s/%([\da-fA-F][\da-fA-F])/pack("C", hex ($1))/eg;
$qpairs{$name} = $value;
}
$user=$qpairs{user};
$access=$qpairs{access};
$random=$qpairs{random};
$file=$qpairs{file};
#require "cookie_per_page.pl";
#&pass($qpairs{random});

$max=$db->prepare("select Max(id) from login");
$max->execute();
$maxid=$max->fetchrow_array;
$max->finish();

push @emplname, split(/ /,$pairs{username});
$namelen = @emplname;
for($i=0; $i<$namelen; $i++){
  if($namelen == 3){
  $fname = $emplname[0];
  $mname = $emplname[1];
  $lname = $emplname[2];
  }

  if($namelen == 2){
  $fname = $emplname[0];
  $mname = "";
  $lname = $emplname[1];
  }
  if($namelen == 1){
  $fname = $emplname[0];
  $mname = "";
  $lname = "";
  }
}

$newemplno=$pairs{newemplno};


$ph = $db->prepare("select empl_no,fname,mname,lname,1 from employee_details where empl_no='$newemplno'");
$ph->execute();
$ph->bind_columns(\$empl_no,\$fname,\$mname,\$lname,\$dummy);
while($resgatepass=$ph->fetchrow_array)
{
	if($mname eq '')
	{
		$empl_name = $fname."".$lname;
	}
	else
	{
		$empl_name = $fname." ".$mname." ".$lname;
	}
}

$max=$db->prepare("select empl_no,1 from login where empl_no='$empl_no'");
$max->execute();
$max->bind_columns(\$login_empl_no,\$dummy);
while($resmax=$max->fetchrow_array) {
 }

if($login_empl_no == '')
{
	$q="insert into login (user_name,user_password,level_access1,id,randomnumber,empl_no) values ('$empl_name',encode($newemplno,'$login_key'),'$pairs{cmbAccess}','$maxid'+1,'$nowtime',$empl_no)";
	$ins=$db->prepare($q);
	$ins->execute;
	$rowins=$ins->rows;
	$ins->finish;

	$pass = 1;
}


   #*************Greettech(Local) database connection details**************
			#$database2="php121";
			#$hostname2="localhost";
			#$username2="root";
			#$password2="";

		#	$db2 = DBI->connect("DBI:mysql:$database2:$hostname2",$username2,$password2)
		#	or die ("can't connect to the database");

		#		$q2="insert into login (user_name,user_password,level_access1,id,randomnumber,empl_no) values ('$empl_name','$empl_no','$pairs{cmbAccess}','$maxid'+1,'$nowtime',$empl_no)";
		#		$ins2=$db2->prepare($q2);
		#		$ins2->execute;
		#		$rowins=$ins2->rows;
		#		$ins2->finish;
	#***********************************************************************
if($rowins >= 1){
$dest = "user.pl?file=$file&random=$qpairs{random}&user=$user&access=$access&pass=$pass&emplno=$empl_no";
print "Status: 302 Found\n" . "Location: $dest\n\n";
}
$err= "An error occured while insertion:This Emloyee No.is already exist in Login Table.";
&showError($err);