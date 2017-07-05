DoctorQuickApp.controller('LoginCtrl', function($scope, $state, $cordovaNetwork, $q, $rootScope, $ionicPopover, $ionicPopup, $timeout, $remember,$ionicLoading, $ionicHistory, $localStorage, $sessionStorage, $cookies, $window, LoginService,doctorServices,medicalSpecialityService,patientProfileDetailsService,searchDoctorServices)
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
	       $scope.submitted = true
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


				$rootScope.submitted=true;
        $localStorage.user = $scope.loginData.phone;
				$localStorage.pass = $scope.loginData.pin;
				$rootScope.u = $scope.loginData.phone;



			if($scope.loginData.phone && $scope.loginData.pin)
			{
				$rootScope.logginMessage="Logging into DoctorQuick...";
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

						sessionStorage.setItem('loggedin_phone', $scope.loginData.phone);
						sessionStorage.setItem('User', 'Patient');

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


						$localStorage.doctororpatient = response;

						var uname1 = "greet+"+$scope.loginData.phone;
						var pw1 = "DQ_patient";


						var success = function(message)
						{
							loggedIn=true;
								// $ionicLoading.hide();
								// $state.go('app.patient_home');
								$rootScope.logginMessage="Connecting to Server";
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

						$rootScope.logOb={};

						// window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
						// console.log("got main dir",dir);
						// dir.getFile("log.txt", {create:true}, function(file) {
						// console.log("got the file", file);
						// logOb = file;
						// writeLog("App started");
						// });
						// });

						// function writeLog(str) {
						// 			if(!logOb) return;
						// 			var log = str + " [" + (new Date()) + "]\n";
						// 			console.log("going to log "+log);
						// 			logOb.createWriter(function(fileWriter) {
						//
						// 			fileWriter.seek(fileWriter.length);
						//
						// 			var blob = new Blob([log], {type:'text/plain'});
						// 			fileWriter.write(blob);
						// 			console.log("ok, in theory i worked");
						// 			}, fail);
						// 			}

					}
					else if(response === "doctor")
					{

						console.log('doctor screen should entered');

						sessionStorage.setItem('loggedin_phone', $scope.loginData.phone);
						sessionStorage.setItem('User', 'Doctor');
						$localStorage.doctororpatient = response;
						doctorServices.doctorDetails($scope.loginData.phone).then(function(response,data){
					    $rootScope.doctor_details=response;//store the response array in doctor details
					    console.log($rootScope.doctor_details);
					    window.localStorage['doctorDetails'] = angular.toJson(response);

					  }).catch(function(error){
					    console.log('failure data', error);
					  });
					var uname1 = "greet+"+$scope.loginData.phone;
					var pw1 = "DQ_doctor";

					console.log(uname1);

						var success = function(message)
						{

							$rootScope.logginMessage="Connecting to Server";
							console.log(message);
							$ionicLoading.hide();
							$ionicHistory.nextViewOptions({
								disableAnimate: true,
								disableBack: true
							});
							$state.go('templates.doctor_home', {}, {location: "replace", reload: false});
							// $state.go('templates.doctor_home');

						}

						var failure = function()
						{

							alert("Error Occurred While Loggin in to DoctoQuick");

						}


					// $state.go('templates.doctor_home');//for logging in from browser
					hello.login(uname1,pw1,success, failure);
					$localStorage.onOff=1;


					}
					else if(response === "alreadyLoggedIn"){
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
				// window.plugins.toast.showShortCenter(
				// "Valid phone number and password must be entered",function(a){},function(b){}
				// );
			}
		// 	$timeout(function () {
		// 	 $ionicLoading.hide();
		//  }, 5000);

		}


})
