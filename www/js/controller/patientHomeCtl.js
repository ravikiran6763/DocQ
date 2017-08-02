DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope,$interval, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, HardwareBackButtonManager,doctoronoffdetails,doctorServices) {

			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;
			$rootScope.hideSideMenu = true;

			HardwareBackButtonManager.disable();

			$scope.currentState=$ionicHistory.currentStateName();

			console.log($scope.currentState);
			$scope.medicalSpeciality = function(){
				$state.go('app.medical_speciality');
				$ionicLoading.hide();
			}

			// $window.location.reload();

			$scope.searchDoctors=function()
			{
					console.log('search clicked');
					$state.go('app.searchDoctors');

			}




			$timeout( function(){
					console.log('interval started');
		            $interval(checkNewMessages,2000);
		         }, 60000 );



				var username = "greet+"+$localStorage.user;
				var password = "DQ_patient";
				$rootScope.unreadchatforpatient = 0;


				function checkNewMessages()
				{
					var success = function(message)
					{

							$rootScope.unreadchatforpatient = message;
							console.log($scope.unreadchatforpatient);

					}

						var failure = function()
						{
								console.log('this is from patient home CTRL');
						}

							hello.unreadchatfromusers(username,password,success, failure);

				}
				var username = "greet+"+$localStorage.user;
				var password = "DQ_patient";
				$rootScope.unreadchatforpatient = 0;

				$scope.statename = $ionicHistory.currentStateName();
				$scope.iphone=$localStorage.iosLogin;

				$scope.deviceAndroid = ionic.Platform.isAndroid();
				// console.log();
				if($scope.deviceAndroid === false){
					$localStorage.iphoneLogin=0;
				}



});
