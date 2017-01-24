DoctorQuickApp.controller('LoginCtrl', function($scope, $state, $cordovaNetwork, $q, $rootScope, $ionicPopover, $ionicPopup, $timeout, $remember,$ionicLoading, $ionicHistory, $localStorage, $sessionStorage, $cookies, $window, LoginService, patientProfileDetailsService)
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
				//  console.log($scope.submitted);
	  };

		var special = {};

			$scope.loginData.phone = $cookies.get('Phone');
			$scope.loginData.pin = $cookies.get('password');


	$scope.doLogIn = function()
	{

			$rootScope.submitted=true;
        $localStorage.user = $scope.loginData.phone;
				$localStorage.pass = $scope.loginData.pin;
				$rootScope.u = $scope.loginData.phone;
			if($scope.loginData.phone && $scope.loginData.pin)
			{
				$ionicLoading.show();
				var userDetails={
					userNum : $scope.loginData.phone,
					password : $scope.loginData.pin
				};
				// console.log(userDetails);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!experiment!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

				// LoginService.loginprocess(userDetails)
				// .then(function(response) {
				// 	console.log(response);
				// 		$rootScope.$broadcast('authorized');
				// 		$state.go('app.patient_home');
				// });
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				LoginService.loginprocess(userDetails).then(function(response){
					// console.log(navigator.connection.type);
				 console.log(response);
					if(response === "patient")
					{

								var uname1 = "greet+"+$scope.loginData.phone;
								var pw1 = "DQ_patient";

							var success = function(message)
								{
									alert(message);
								}
								var failure = function()
								{
									alert("Error calling Hello Plugin");
								}
								$state.go('app.patient_home');
								 hello.login(uname1,pw1,success, failure);
						}
						else if(response === "doctor")
						{
							var uname1 = "greet+"+$scope.loginData.phone;
							var pw1 = "DQ_doctor";
							var success = function(message)
								{
									console.log(message);
								}
								var failure = function()
								{
									alert("Error Occurred While Loggin in to DoctoQuick");
								}
						$state.go('templates.doctor_home');
					 	hello.login(uname1,pw1,success, failure);
						// hello.login(uname1,pw1,success, failure);
						$localStorage.onOff=1;
						}
						else{

							$scope.myPopup = $ionicPopup.show({
								// title: 'Invalid Credentials',

								template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Invalid Credentials</p></div><div class="errorContent"><p>The Username or Password is incorrect Tap on <br>"Forgot Password" to receive the same instantly</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
								cssClass: 'loginPopup',
								scope: $scope,
							});
							$scope.closethis = function()
							{
							$scope.myPopup.close();
							};

						}

				}).catch(function(error){
					console.log('failure data', error);
				});
			}
			else{
				// window.plugins.toast.showShortCenter(
				// "Valid phone number and password must be entered",function(a){},function(b){}
				// );
			}
			$timeout(function () {
			 $ionicLoading.hide();
		 }, 1000);

		}


})
