#!/usr/bin/perl


print "Content-type:text/html\n\n";


use CGI qw(:standard);
my $query = new CGI;

$ph_no = $query->param('p_no');

my $range = int ($ph_no/10000);

  my $random_number = int(rand($range));


$ph_no = "9880801520";

			my $url = "http://www.txtguru.in/imobile/api.php?username=tallysolutions&password=49332602&source=TALLYS&dmobile=91".$ph_no."&message=OTP+is:$random_number";
			use LWP::Simple;
			my $content = get $url;

			if( $content=~m/MobileCount:1/i)
			{
				$m=1;
			}
			else
			{
				$m=0;
			}

print "OTP SENT";
