#!/usr/bin/perl

require "database.pl";
&database;
require "request.pl";
&request;



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

print "Content-type:text/html;\n\n";
print <<HTMLEND;

<html><head>
<body onload="fedt.submit();">
<!--<form id=fedt method=post action='$file?random=$qpairs{random}&user=$user&access=$access' target="_top">-->

<form id=fedt method=post action='$file?random=$qpairs{random}&user=$user' target="_top">
<input type=hidden name='file' id='file' value='$file'>
<input type=hidden name=user value='$user'>
<input type=hidden name=access value='$access'>
<input type=hidden name=random value='$random'>
</form>

</body>

</html>

HTMLEND
   1;