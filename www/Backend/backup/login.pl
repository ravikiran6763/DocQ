#!/usr/bin/perl
#====================================================
# Owner            : Greet Technologies Pvt Ltd.    =
# Filename         : login.pl                       =
# Created On       : June 18, 2007                  =
# Last Modified On : March 30,2013                  =
# Modified By      : Subbu                          =
#====================================================

require "database.pl";
&database;
require "request.pl";
&request;
require "variable_index.pl";



$invalid=0;
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
$invalid=$qpairs{invalid};
if($invalid == 1){
$invalid="<font color=cc0000 size=2 face=arial><b>Invalid Login!!</b></font>";
}

print "Content-type: text/html;\n\n";
print <<HTMLEND;
<STYLE type="text/css">
 <!--
 BODY { background-image:url(bg1.gif);
               background-repeat:no-repeat;
               background-position:bottom right;
               background-attachment:fixed }
 -->
</STYLE>
<html><head>
<script type="text/javascript">
var seltd="";

function unique(){

   if(document.getElementById('username').value == ""){
   alert("Username Cannot Be Null");
   document.getElementById('username').focus();
   return false;
   }
   if(document.getElementById('userpwd').value == ""){
   alert("Password Cannot Be Null");
   document.getElementById('userpwd').focus();
   return false;
   }
   
   return true;
}

</script>

<head>
<META http-equiv=Content-Type content="text/html; charset=utf-8">

<STYLE type=text/css>

TABLE {
	FONT-SIZE: 12px; COLOR: #000000; FONT-FAMILY: Arial, Helvetica, sans-serif
}
BODY {
	MARGIN-TOP: 0px; SCROLLBAR-FACE-COLOR: #ffdfa0; BACKGROUND-IMAGE: url($imagefolder/bg1.gif); MARGIN-LEFT: 0px; SCROLLBAR-ARROW-COLOR: #cc0000
}
.style6 {
	BORDER-RIGHT: #ffcc00 1px outset; BORDER-TOP: #ffcc00 1px outset; FONT-WEIGHT: bold; FONT-SIZE: 10px; BORDER-LEFT: #ffcc00 1px outset; COLOR: #cc0000; BORDER-BOTTOM: #ffcc00 1px outset; FONT-FAMILY: verdana, Helvetica, sans-serif; BACKGROUND-COLOR: #ffdfa0
}
.style7 {
	color: #FFFFFF;
	font-weight: bold;
}
.style8 {
	color: #FF0000;
	font-weight: bold;
	font-family: Arial, Helvetica, sans-serif;
}
</STYLE>


<META content="MSHTML 6.00.2900.2180" name=GENERATOR></HEAD>
</head>


<SCRIPT>
     
 
message     = "Greet Technologies Pvt Ltd.^" +
              "Outsourcing Unlimited................^"+
              "Leading Provider of Value-Added Customer Support/Call Center Services.^"

 
scrollSpeed = 50
lineDelay   = 1500
 
txt         = ""
 
function scrollText(pos) {
if (message.charAt(pos) != '^') {
txt    = txt + message.charAt(pos)
status = txt
pauze  = scrollSpeed
}
else {
pauze = lineDelay
txt   = ""
if (pos == message.length-1) pos = -1
}
pos++
setTimeout("scrollText('"+pos+"')",pauze)
}
 
scrollText(0)
</SCRIPT>




<body onload="document.getElementById('username').focus();">
<form id='fedt' name='fedt' action='authentication_two.pl' method='POST' onsubmit="window.event.returnValue=unique();">

<CENTER>
 <table width=100% height="100%" valign="center" border="0">
 <tr height=25><td></td></tr>

     <tr>
     <td align=center valign="middle">
     <table width="64%"  border="1" cellpadding="0" cellspacing="0" bordercolor="#990000">
     <tr><td height="25" bgcolor="#990000"><div align="center" class="style7">User Login </div></td></tr>
     <tr><td><div align="center"><p class="style8"><br> $invalid </p><p>&nbsp;</p>

     <table width="56%"  border="0" cellspacing="8" cellpadding="0">
     <tr>
     <td width="30%">&nbsp;<B>User&nbsp;Name</B></td>
     <td width="70%"><div align="center">
     <INPUT id=username name=username size=30>
     </div></td>
     </tr>
     <tr>
     <td>&nbsp;<B>Password</B></td>
     <td><div align="center">
     <INPUT id=userpwd type=password name=userpwd size=30>
     </div></td>
     </tr>
     </table>

 <BR><INPUT class=style6 type=submit value=ENTER name=submit>
 </p>
 <p>&nbsp;</p>
 </div></td>
 </tr>
 </table>
 </td></tr>
 </table>
 </CENTER>

</FORM>
</body>
</html>


HTMLEND
;