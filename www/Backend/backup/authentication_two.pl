#!/usr/bin/perl


#====================================================
# Owner            : Greet Technologies Pvt Ltd.    =
# Filename         : authentication_two.pl          =
# Created On       : June 18, 2007                  =
# Last Modified On : Feb 10,2016                  	=
# Modified By      : RAvikiran           			=
#Modified Content  : Prevented SQL Injection        =
#====================================================

require "database.pl";
&database;
require "request.pl";
&request;
require "variable_index.pl";

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
       
$nowtime = time;
my($todaysecond, $todayminute, $todayhour, $todaydayofmonth, $todaymonth, $todayyear, $todayweekday, $todaydayofyear, $todayisdst)=localtime($nowtime);
$todaymonth++;
if($todaydayofmonth < 10){
$currDay .= '0'.$todaydayofmonth;
}else{
$currDay=$todaydayofmonth;
}if($todaymonth < 10){
$currMonth = '0'.$todaymonth;
}else{
$currMonth=$todaymonth;
}   
$currYear = $todayyear+1900;
$currTime = $currYear."-".$currMonth."-".$currDay." ".$todayhour.":".$todayminute.":".$todaysecond;

$user=$pairs{username};

#sql injection prevention
$query = "select count(*) from login where user_name='$user'";
$usr = $db->prepare($query);
$usr->execute();
$usr->bind_columns(\$user_count);
while($usr->fetchrow_array){

}  
 
 if($user_count == 1){
 
$query = "select level_access1,randomnumber,user_name from login where user_name='$pairs{username}' and user_password =encode('$pairs{userpwd}','$login_key')";
$usr = $db->prepare($query);
$usr->execute();
$usr->bind_columns(\$level_access1,\$randomnumber,\$user_name);
while($usr->fetchrow_array){
}   
$row=$usr->rows;
$file="index.pl";
$rd = $level_access1;
if($row >= 1){
$random = $nowtime;
$cookie = "Set-Cookie:TEMPRANDOM=$file;";
$cookie1 = "Set-Cookie:CLICKSEVA=$rd;";

print <<HTMLEND;
Content-type: text/html
$cookie
$cookie1


<HTML><HEAD><META HTTP-EQUIV="Refresh" CONTENT="0;URL=redir_greettech_two.pl?file=$file&random=$random&user=$user&access=$rd"></HTML>TML>

HTMLEND

}
  
else {
$dest = "login.pl?invalid=1";
print "Status: 302 Found\n" . "Location: $dest\n\n";
} 
 }
 
 else{
 $dest = "login.pl?invalid=1";
print "Status: 302 Found\n" . "Location: $dest\n\n";
} 
