app.controller('otpsend',function($scope,$http)
{
	//This will work is user enters RESEND Button in a page.
	$scope.resendotp = function() 
	{
			
			var resend = "Resend";
			 var ph_no = $scope.ph_no;
			 
			var req = 
			{
				method: 'get',
				url: "http://greetbss.greettech.com/cgi-bin/greettech/otp.pl",
				params: { 
							p_no: ph_no,
							resen:resend
						
						}
			};
			 
			 
			 
			 $http(req).success(function(params)
			{
					$scope.ph_no="";
					
					location.href="#";
					
					alert(params);
					
				
			})
			
			.error(function()
			{
				
				alert ('Phone Number Not Sent');
			});
			
	}
	
	$scope.confirmotp = function() 
	{
			
			var confir = "confirm";
			 var ph_no = $scope.ph_no;
			 
			var req = 
			{
				method: 'get',
				url: "http://greetbss.greettech.com/cgi-bin/greettech/otp.pl",
				params: { 
							p_no: ph_no,
							confirm:confir
						
						}
			};
			 
			 
			 
			 $http(req).success(function(params)
			{
					$scope.ph_no="";
					
					location.href="#";
					
					alert(params);
					
				
			})
			
			.error(function()
			{
				
				alert ('Phone Number Not Sent');
			});
			
	}
	
});

