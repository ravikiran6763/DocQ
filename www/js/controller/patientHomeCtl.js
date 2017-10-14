DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope,$interval, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, HardwareBackButtonManager,doctoronoffdetails,doctorServices,pingService) {

			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;
			$rootScope.hideSideMenu = true;

			HardwareBackButtonManager.disable();
			$ionicConfig.views.swipeBackEnabled(false);

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
				$interval(startPinging,2000);
			}, 2000 );



				var username = "greet+"+$localStorage.user;
				var password = "DQ_patient";
				$rootScope.unreadchatforpatient = 0;


				function startPinging()
				{
					console.log('start piniging');
					pingService.pingToServer().then(function(response){
							console.log( response);
					 }).catch(function(error){
							 console.log('failure data', error);
					 });
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
