DoctorQuickApp.controller('LoginCtrl', function($scope, $state,  $q, $rootScope, $ionicPopover, $ionicPopup, $timeout, $remember,$ionicLoading, $localStorage, $sessionStorage, $cookies, $window, LoginService, patientProfileDetailsService)
{

		$scope.user = {};
		$scope.user.rememberMe = false;
		$scope.loginData = {};
			$scope.rememberme =  function()
			{
						if($scope.user.rememberMe)
						{
							$cookies.put('Phone', $scope.loginData.phone);
							$cookies.put('password', $scope.loginData.pin);
						}
						else
						{
								$cookies.put('Username', '');
								$cookies.put('password', '');
						}

			}

		$scope.sendForm = function($event,form)
		{
	       $event.preventDefault()
	       $scope.submitted = true

	  };

		var special = {};

			$scope.loginData.phone = $cookies.get('Phone');
			$scope.loginData.pin = $cookies.get('password');


			$scope.doLogIn = function()
			{

				$ionicLoading.show(
					//uncomment the following lines for customizing loading
			// 		{
			// 	 content: 'Logging please wait...',
			// 	 template: '',
			// 	 animation: 'fade-in',
			// 	 showBackdrop: true,
			// 	 maxWidth: 100,
			// 	 showDelay: 0
			//  }
		 );

        $localStorage.user = $scope.loginData.phone;
				$rootScope.u = $scope.loginData.phone;






			if($scope.loginData.phone && $scope.loginData.pin)
			{
				var userDetails={
					userNum : $scope.loginData.phone,
					password : $scope.loginData.pin
				};
				console.log(userDetails);

				LoginService.loginprocess(userDetails)
						.then(function(response){
					 console.log(response);
						if(response === "patient")
						{


							var uname1 = "greet+"+$scope.loginData.phone;

								var pw1 = "DQ_patient";


								console.log(uname1);
								console.log(pw1);



								var success = function(message)
								{
									alert(message);
								}

								var failure = function()
								{
									alert("Error calling Hello Plugin");
								}

								hello.login(uname1,pw1,success, failure);



						$state.go('app.patient_home');
						}

						else if(response === "doctor")
						{
						$state.go('templates.doctor_home');
						}
						else{

							$scope.myPopup = $ionicPopup.show({
								title: 'Invalid Credentials',
								template: '<div ><p style="color:#fff; margin: -21px 0 0 15px; ">Please try again if the problem persists call us directly.</p></div><div style="position: absolute; margin-top: 0vh; margin-bottom: 0; top: -17px;left: 88vw; background: #6fa02d; border-radius: 22px; font-size: 8vw; color: #fff; text-align: end; padding: 7px;" ng-controller="LoginCtrl" ng-Click="closethis();">X</div>',
								cssClass: 'loginPopup',
								scope: $scope,
								// buttons: [
								// 	{ text: 'Cancel' },
								// 	{
								// 	text: '<b>Agree</b>',
								// 	type: 'button-positive',
								//
								// 	},
								// ]
							});
							$scope.closethis = function()
							{
							$scope.myPopup.close();
							};


						// 	$ionicPopup.show({
						// //  title: 'Invalid Credentials',
						// //  templateUrl:'views/app/my_doctors.html'
						//  template:'<div><p>Invalid Credentials</p></div><div style="position: absolute; top: 0px; left: 0px" ng-controller="DriversCtrl" ng-Click="closethis();">X</div>'
						//
						//  })
						}

				}).catch(function(error){
					console.log('failure data', error);
				});
			}
			$timeout(function () {
			 $ionicLoading.hide();
		 }, 1000);

		}


})
