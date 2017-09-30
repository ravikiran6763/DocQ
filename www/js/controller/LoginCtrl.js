DoctorQuickApp.controller('LoginCtrl', function($scope, $state, $cordovaNetwork,$interval, $q, $rootScope, $ionicPopover, $ionicPopup, $timeout, $remember,$ionicLoading, $ionicHistory, $localStorage, $sessionStorage, $cookies, $window, LoginService,doctorServices,medicalSpecialityService,patientProfileDetailsService,searchDoctorServices)
{
		var loggedIn=false;

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
	       $scope.loginDatasubmitted = true
				//  console.log($scope.submitted);
	  };

		var special = {};

			$scope.loginData.phone = $cookies.get('Phone');
			$scope.loginData.pin = $cookies.get('password');

			$(document).ready(function() {
			    $(".input-group > input").focus(function(e){
			        $(this).parent().addClass("input-group-focus");
			    }).blur(function(e){
			        // $(this).parent().removeClass("input-group-focus");
			    });
			});
			$scope.countries = [
					{
					name: "India",
					dial_code: "+91",
					code: "IN"
					},
					{
					name: "US",
					dial_code: "+1",
					code: "US"
					}
				 ]


	$scope.doLogIn = function()
	{
				$rootScope.loginDatasubmitted=true;
        $localStorage.user = $scope.loginData.phone;
				$localStorage.pass = $scope.loginData.pin;
				$rootScope.u = $scope.loginData.phone;

			if($scope.loginData.phone && $scope.loginData.pin)
			{
				$rootScope.logginMessage="Logging into DoctorQuick";
				$ionicLoading.show({
			        template: '<ion-spinner></ion-spinner><br><br>{{logginMessage}}'
			      });


				var userDetails={
					userNum : $scope.loginData.phone,
					password : $scope.loginData.pin
				};

				$scope.lastView = $ionicHistory.backView();
				LoginService.loginprocess(userDetails).then(function(response){
					// console.log(navigator.connection.type);
					console.log(response);

					if(response === "patient")
					{

						$localStorage.doctororpatient = response;
						window.plugins.OneSignal.getIds(function(ids) {
							$scope.playerId=JSON.stringify(ids['userId']);
							// console.log($scope.playerId);
							var updatePlayer ={
								palyerId:$scope.playerId,
								userNum:$localStorage.user,
								user:'patient'
							}
							console.log(updatePlayer);
							LoginService.updatePlayer(updatePlayer).then(function(response){
								console.log(response);
							})
						});

						patientProfileDetailsService.fetchPatient($scope.loginData.phone).then(function(response){
							window.localStorage['patientDetails'] = angular.toJson(response);
						}).catch(function(error){
						console.log('failure data', error);
						})

						patientProfileDetailsService.fetchPatientImage($scope.loginData.phone).then(function(response){
							console.log(response);
							window.localStorage['patientProfileImage'] = angular.toJson(response);
						}).catch(function(error){
						console.log('failure data', error);
						})

						searchDoctorServices.specialitySearch().then(function(response){
							window.localStorage['specialityList1'] = angular.toJson(response);
							// console.log(window.localStorage['specialityList1']);
						}).catch(function(error){
						console.log('failure data', error);
						});

						searchDoctorServices.getLanguages().then(function(response){
							window.localStorage['languages'] = angular.toJson(response);
							// console.log(window.localStorage['languages']);
						}).catch(function(error){
						console.log('failure data', error);
						});

						///////////get all specialities///////////

						 medicalSpecialityService.getMedicalSpecialist().then(function(response){
				         console.log('successfull data', response);
				         $scope.specialitiesList = response;
								 window.localStorage['specialitiesList'] = angular.toJson(response);
				      }).catch(function(error){
				          console.log('failure data', error);
				      });

						var uname1 = "greet+"+$scope.loginData.phone;
						var pw1 = "DQ_patient";


						$scope.deviceAndroid = ionic.Platform.isAndroid();
						console.log($scope.deviceAndroid);
						if($scope.deviceAndroid === true){
							var success = function(message)
							{
								loggedIn=true;
									$ionicLoading.hide().then(function(){
										console.log("The loading indicator is now hidden");

										$ionicHistory.nextViewOptions({
											disableAnimate: true,
											disableBack: true
										});
										$state.go('app.patient_home', {}, {location: "replace", reload: false});

									});


							}
							var failure = function()
							{

								alert("Error calling Hello Plugin");

							}
							// $state.go('app.patient_home');//for browser login
							hello.login(uname1,pw1,success, failure);
							$timeout( function(){
		          console.log('interval started');
		          $interval(checkNewMessages,2000);

						}, 5000 );

							var username = "greet+"+$localStorage.user;
	            var password = "DQ_patient";
	            function checkNewMessages()
	            {
	                var success = function(message)
	                {
	                  $scope.unreadchatforpatient = message;
	                  console.log($scope.unreadchatforpatient);
	                }

	                var failure = function()
	                {
	                  console.log("Error calling Hello Plugin");
	                  //console.log(‘error’);

	                }
	                  hello.unreadchatfromusers(username,password,success, failure);
	            }
						}
						else{
							$ionicLoading.show({
						        template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
						      });
							var success = function(message)
							{
										console.log(message);
								$scope.iosLoggin=message;
								$localStorage.iosLogin=$scope.iosLoggin;


							}
							var failure = function()
							{

								alert("Error calling Hello Plugin");

							}

							hello.login(uname1,pw1,success, failure);

							$timeout( function(){
									console.log('interval started');
						            $interval($rootScope.loginInterval,2000,1);
												$interval(checkNewMessages,2000);

						         }, 10000 );

										 var username = "greet+"+$localStorage.user;
										 var password = "DQ_patient";
										 function checkNewMessages()
										 {
										 		var success = function(message)
										 		{
										 			$rootScope.unreadchatforpatient = message;
										 			console.log($scope.unreadchatforpatient);
										 		}

										 		var failure = function()
										 		{
										 			console.log("Error calling Hello Plugin");
										 			//console.log(‘error’);

										 		}
										 			hello.unreadchatfromusers(username,password,success, failure);
										 }
								 $rootScope.loginInterval = function () {
									 var success = function(message)
	 								{
										console.log(message);
										$ionicLoading.hide().then(function(){
										console.log("The loading indicator is now hidden");
										$ionicHistory.nextViewOptions({
										disableAnimate: true,
										disableBack: true
										});
										$state.go('app.patient_home', {}, {location: "replace", reload: false});
											//$interval.cancel(loginStatus);
										});
	 								}

	 								var failure = function()
	 								{
	 									alert("Error Occurred While Loggin in to DoctoQuick");
	 								}
	 								hello.loginstatus(success,failure);
								  }


						}

					}
					else if(response === "doctor")
					{
						$localStorage.doctororpatient = response;
						window.plugins.OneSignal.getIds(function(ids) {
							$scope.playerId=JSON.stringify(ids['userId']);
							// console.log($scope.playerId);
							var updatePlayer ={
								palyerId:$scope.playerId,
								userNum:$localStorage.user,
								user:'doctor'
							}
							console.log(updatePlayer);
							LoginService.updatePlayer(updatePlayer).then(function(response){
								console.log(response);
							})
						});

						doctorServices.doctorDetails($scope.loginData.phone).then(function(response,data){
							$rootScope.doctor_details=response;//store the response array in doctor details
							console.log($rootScope.doctor_details);
							window.localStorage['doctorDetails'] = angular.toJson(response);

						}).catch(function(error){
							console.log('failure data', error);
						});

						var uname1 = "greet+"+$scope.loginData.phone;
						var pw1 = "DQ_doctor";

						$scope.deviceAndroid = ionic.Platform.isAndroid();
						console.log($scope.deviceAndroid);
						if($scope.deviceAndroid === true){
												$ionicLoading.show({
															template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
														});
														console.log(uname1);
													var success = function(message)
													{
														$rootScope.logginMessage="Connecting to DoctorQuick";
														console.log(message);
														$ionicLoading.hide();
														$ionicHistory.nextViewOptions({
															disableAnimate: true,
															disableBack: true
														});
														$state.go('templates.doctor_home', {}, {location: "replace", reload: false});

													}

													var failure = function()
													{

														alert("Error Occurred While Loggin in to DoctoQuick");

													}
												//$state.go('templates.doctor_home');//for logging in from browser
												hello.login(uname1,pw1,success, failure);

												$timeout( function(){
												console.log('interval started');
												$interval(checkNewMessages,2000);
												}, 5000 );

												var username = "greet+"+$localStorage.user;
						            var password = "DQ_doctor";
						            function checkNewMessages()
						            {
						                var success = function(message)
						                {
						                  $rootScope.unreadchatforpatient = message;
						                  console.log($rootScope.unreadchatforpatient);
						                }

						                var failure = function()
						                {
						                  console.log("Error calling Hello Plugin");
						                  //console.log(‘error’);

						                }
						                  hello.unreadchatfromusers(username,password,success, failure);
						            }
												$localStorage.onOff=1;

						}
						else{
							$ionicLoading.show({
						        template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
						      });

							var success = function(message)
							{
										console.log(message);
								$scope.iosLoggin=message;
								$localStorage.iosLogin=$scope.iosLoggin;
							}
							var failure = function()
							{
								alert("Error calling Hello Plugin");
							}

							hello.login(uname1,pw1,success, failure);

							$timeout( function(){
									console.log('interval started');
						            $interval($rootScope.loginInterval,2000,1);
												$interval(checkNewMessages,2000);

						         }, 10000 );
										 var username = "greet+"+$localStorage.user;
				             var password = "DQ_doctor";
				             function checkNewMessages()
				             {
				                 var success = function(message)
				                 {
				                   $rootScope.unreadchatforpatient = message;
				                   console.log($rootScope.unreadchatforpatient);
				                 }

				                 var failure = function()
				                 {
				                   console.log("Error calling Hello Plugin");
				                   //console.log(‘error’);

				                 }
				                   hello.unreadchatfromusers(username,password,success, failure);
				             }

								 $rootScope.loginInterval = function () {
									 var success = function(message)
	 								{
										console.log(message);
										$ionicLoading.hide().then(function(){
										console.log("The loading indicator is now hidden");
										console.log('hide loader');
										$ionicHistory.nextViewOptions({
										disableAnimate: true,
										disableBack: true
										});
										$state.go('templates.doctor_home', {}, {location: "replace", reload: false});
										//$interval.cancel(loginStatus);
										});
	 								}

	 								var failure = function()
	 								{
	 									alert("Error Occurred While Loggin in to DoctoQuick");
	 								}
	 								hello.loginstatus(success,failure);
								  }

						}
						console.log('doctor screen should entered');

					}
					else if(response === "alreadyLoggedIn"){
						$ionicLoading.hide();
						$scope.myPopup = $ionicPopup.show({
							// title: 'Invalid Credentials',
							template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Already Logged In</p></div><div class="errorContent"><p>The user is alreaady Logged in</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
							cssClass: 'loginPopup',
							scope: $scope,
						});
						$scope.closethis = function()
						{
						$scope.myPopup.close();
						};
					}
						else{
								$ionicLoading.hide();
								$scope.myPopup = $ionicPopup.show({
								// title: 'Invalid Credentials',
								template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Invalid Credentials</p></div><div class="errorContent"><p>The Username or Password is incorrect.<br>Tap on "Forgot Password" to receive the same instantly</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
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
				// alert('Number Doesnot exist in our database')
			}


		}


})
