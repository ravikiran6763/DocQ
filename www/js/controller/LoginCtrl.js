DoctorQuickApp.controller('LoginCtrl', function($scope, $state,$stateParams, $cordovaNetwork,$interval, $q, $rootScope, $ionicPopover, $ionicPopup, $timeout, $remember,$ionicLoading, $ionicHistory, $localStorage, $sessionStorage, $cookies, $window, LoginService,doctorServices,medicalSpecialityService,patientProfileDetailsService,searchDoctorServices,myConsultationService)
{
		var loggedIn=false;

		console.log($stateParams.userPhone);
		console.log($stateParams.userPassword);

		$scope.user = {};
		$scope.user.rememberMe = false;
		$scope.loginData = {};

		$scope.loginData.phone=$stateParams.userPhone;
		$scope.loginData.pin=$stateParams.userPassword;


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

			// $(document).ready(function() {
			//     $(".input-group > input").focus(function(e){
			//         $(this).parent().addClass("input-group-focus");
			//     }).blur(function(e){
			//         // $(this).parent().removeClass("input-group-focus");
			//     });
			// });
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

				 $scope.getPassword = function(num)
				 {
					 // $ionicLoading.show({
						//  template:'Getting your password',
						//  duration:3000
					 // });
				      console.log("get password",num);
				 };

	$scope.doLogIn = function()
	{
		console.log($rootScope.loginDatasubmitted);
				$rootScope.loginDatasubmitted=true;
				$localStorage.showConnecting=false;

				$localStorage.showConnecting = false;


			if($scope.loginData.phone && $scope.loginData.pin)
			{
				window.localStorage.user = $scope.loginData.phone;
				window.localStorage.pass = $scope.loginData.pin;
				$rootScope.user = $scope.loginData.phone;
				console.log('user:',window.localStorage.user);
				console.log('user:',window.localStorage.pass);

				$rootScope.logginMessage="Logging into DoctorQuick";
				$ionicLoading.show({
			        template: '<ion-spinner></ion-spinner><br><br>{{logginMessage}}'
			      });


				var userDetails={
					userNum : $scope.loginData.phone,
					password : $scope.loginData.pin,
					deviceID : $localStorage.deviceID,
					serial:$localStorage.serial
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

						// myConsultationService.myConsultedDoctors($scope.loginData.phone).then(function(response){
						// 	console.log(response);
            //
						// window.localStorage['ConsultedDoctor'] = angular.toJson(response);
						// }).catch(function(error){
						// // console.log('failure data', error);
						// });

            //

            //
						// ///////////get all specialities///////////
						doctorServices.myDoctorsFetched($scope.loginData.phone).then(function(response){
							// alert('list');
					    $scope.myConsultedDoctors=response;
							window.localStorage['myDoctors'] = angular.toJson(response);

					  }).catch(function(error){
					  console.log('failure data', error);
					  });
            //
            //


						var uname1 = "greet+"+$scope.loginData.phone;
						var pw1 = "DQ_patient";


						$scope.deviceAndroid = ionic.Platform.isAndroid();
						console.log($scope.deviceAndroid);
						if($scope.deviceAndroid === true){
							// $ionicLoading.show({
						  //       template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
						  //     });
							var success = function(message)
							{

									console.log('vsee plugin called');

								loggedIn=true;
									$ionicLoading.hide().then(function(){
										console.log("The loading indicator is now hidden");
										            $ionicHistory.nextViewOptions({
										                disableBack: true,
										                disableAnimate: true,
										                historyRoot: true
										            });
										            $ionicHistory.clearCache();
										            $ionicHistory.clearHistory();
																$state.go('app.patient_home',{}, {location: "replace", reload: true});

										$ionicHistory.nextViewOptions({
											disableAnimate: true,
											// disableBack: true,
											historyRoot:true
										});

									});
									$timeout( function(){
									console.log('interval started');
									$interval(checkNewMessages,2000);
									}, 5000 );


							}
							var failure = function()
							{

								alert("Error calling Hello Plugin");

							}
							// $state.go('app.patient_home');//for browser login
							hello.login(uname1,pw1,success, failure);


							var username = "greet+"+$localStorage.user;
	            var password = "DQ_patient";
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
						}
						else{
							$ionicLoading.show({
						        template: '<ion-spinner></ion-spinner><br><br>Logging to DoctorQuick'
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
						window.plugins.OneSignal.getIds(function(ids){
							$scope.playerId=JSON.stringify(ids['userId']);

							console.log('OneSignal for doctor');
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
												// $ionicLoading.show({
												// 			template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
												// 		});
														console.log(uname1);
													var success = function(message)
													{
														$rootScope.logginMessage="Connecting to DoctorQuick";
														console.log(message);

														$ionicLoading.hide().then(function(){
															console.log("The loading indicator is now hidden");

															$ionicHistory.nextViewOptions({
																	disableBack: true,
																	disableAnimate: true,
																	historyRoot: true
															});
															$ionicHistory.clearCache();
															$ionicHistory.clearHistory();
															$state.go('templates.doctor_home', {}, {location: "replace", reload: true});

														});
														$timeout( function(){
														console.log('interval started');
														$interval(checkNewMessages,2000);
														}, 5000 );
													}

													var failure = function()
													{

														alert("Error Occurred While Loggin in to DoctoQuick");

													}
												// $state.go('templates.doctor_home');//for logging in from browser
												hello.login(uname1,pw1,success, failure);




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
												// $localStorage.onOff=1;

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
												disableBack: true,
												disableAnimate: true,
												historyRoot: true
										});
										$ionicHistory.clearCache();
										$ionicHistory.clearHistory();
										$state.go('templates.doctor_home', {}, {location: "replace", reload: true});

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
							cssClass: 'videoPopup',
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
								template: '<div class="errorContent"><p>The Username or Password is incorrect.<br>Tap on <a ui-sref="auth.getPassword" ng-click=closethis()>Forgot Password</a> to receive the same instantly</p></div>',
								cssClass: 'requestPopup',
								scope: $scope,
								buttons: [
								{
								text: 'OK',
								type: 'button-royal',
								onTap:function(){
									$ionicHistory.clearCache();
									$ionicHistory.clearHistory();
									$window.localStorage.clear();
								}
								},
								]


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

		// $scope.$on('$destroy', function(){
		// 		$interval.cancel(checkNewMessages);
		// });


})
