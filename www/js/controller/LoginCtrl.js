DoctorQuickApp.controller('LoginCtrl', function($scope, $state,  $q, $rootScope, $ionicPopover, $ionicPopup, $timeout, $remember,$ionicLoading, $ionicHistory, $localStorage, $sessionStorage, $cookies, $window, LoginService, patientProfileDetailsService)
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
				LoginService.loginprocess(userDetails).then(function(response){
					 console.log(response);
						if(response === "patient")
						{
//								var uname1 = "greet+"+$scope.loginData.phone;
							var uname1 = "greet+"+$scope.loginData.phone;
<<<<<<< HEAD


								var uname1 = "greet+"+$scope.loginData.phone;

								var pw1 = "DQ_patient";




=======
							var pw1 = "DQ_patient";
>>>>>>> 1dac1ddc3e443e908a1b67a01abd23e14a95da01
								var success = function(message)
								{
									alert(message);
								}
								var failure = function()
								{
									alert("Error calling Hello Plugin");
								}
<<<<<<< HEAD

							 //hello.login(uname1,pw1,success, failure);


                                //hello.login(uname1,pw1,success, failure);


								$state.go('app.patient_home');

                                //hello.login(uname1,pw1,success, failure);
=======
                //hello.login(uname1,pw1,success, failure);
								$state.go('app.patient_home');

                //hello.login(uname1,pw1,success, failure);
>>>>>>> 1dac1ddc3e443e908a1b67a01abd23e14a95da01
								$state.go('app.patient_home');
            hello.login(uname1,pw1,success, failure);
            // hello.login(uname1,pw1,success, failure);

						//$state.go('app.patient_home');
						$state.go('app.patient_home');

						}

						else if(response === "doctor")
						{
						$state.go('templates.doctor_home');
						}
						else{

							$scope.myPopup = $ionicPopup.show({
								title: 'Invalid Credentials',

								  template: '<div ><p style="color:#fff; margin: -21px 0 0 15px; ">The Username or Password is incorrect Tap on "Forgot Password" to receive the same instantly</p></div><div style="position: absolute; margin-top: 0vh; margin-bottom: 0; top: -17px;left: 88vw; background: #6fa02d; border-radius: 22px; font-size: 8vw; color: #fff; text-align: end; padding: 7px;" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p></div>',
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
				window.plugins.toast.showShortCenter(
				"Valid phone number and password must be entered",function(a){},function(b){}
				);
			}
			$timeout(function () {
			 $ionicLoading.hide();
		 }, 1000);

		}


})
