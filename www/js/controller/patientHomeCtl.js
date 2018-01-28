DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope,$interval, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, HardwareBackButtonManager,doctoronoffdetails,doctorServices,pingService) {

			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;
			$rootScope.hideSideMenu = true;

			$localStorage.selectedSubPatient=0;
			HardwareBackButtonManager.disable();
			$ionicConfig.views.swipeBackEnabled(false);

			$scope.currentState=$ionicHistory.currentStateName();

			$ionicConfig.views.swipeBackEnabled(false);

			console.log($scope.currentState);
			$rootScope.goToConsultation = function ()
	    {
	      $state.go("app.my_consultations");
	    }
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
	        console.log($localStorage.showConnecting);
	        if($localStorage.showConnecting == true){
						$timeout( function(){
						$rootScope.connectingMessage = 'Internet connection appears very slow'
					}, 60000 );
						$rootScope.connectingMessage = 'Connecting to DoctorQuick'
	          $ionicLoading.show({
	            template: '<ion-spinner></ion-spinner><br><br>{{connectingMessage}}',
							// duration:3000,
							noBackdrop: true
	          });
							$timeout(function(){
							$ionicLoading.hide();
								alert('no network');
							},0);


							$interval(availableInVsee,2000,1);


	        }


	    }, 0 );

			function availableInVsee() {
							var uname1 = "greet+"+$localStorage.user;
							var pw1 = "DQ_patient";
							var success = function(message)
							{
							// alert(message);

							$interval(checkNewMessages,2000);


							$ionicLoading.hide().then(function(){
							console.log("The loading indicator is now hidden");
							// alert('loggedin');
							$localStorage.showConnecting = false;
							$ionicHistory.nextViewOptions({
									disableBack: true,
									disableAnimate: true,
									historyRoot: true
							});
							$ionicHistory.clearCache();
							$ionicHistory.clearHistory();
							$interval.cancel(availableInVsee);
							$state.go($state.current, {}, {location: "replace",reload: false});
							});
							// alert(message);
							}
							var failure = function()
							{
								alert("Error calling Hello Plugin");
							}

							hello.login(uname1,pw1,success, failure);
			}

			function checkNewMessages()
			{
				var uname1 = "greet+"+$localStorage.user;
				var pw1 = "DQ_patient";

				var success = function(message)
				{
					$rootScope.unreadchatforpatient = message;
					// console.log($scope.unreadchatforpatient);
				}

				var failure = function()
				{
					console.log("Error calling Hello Plugin");
					//console.log(‘error’);

				}
					hello.unreadchatfromusers(uname1,pw1,success, failure);
			}
				$rootScope.unreadchatforpatient = 0;

				function startPinging()
				{
					// console.log('start piniging');
					pingService.pingToServer().then(function(response){
							// console.log( response);
					 }).catch(function(error){
							 console.log('failure data', error);
					 });
				}

				$rootScope.unreadchatforpatient = 0;

				$scope.statename = $ionicHistory.currentStateName();
				$scope.iphone=$localStorage.iosLogin;

				$scope.deviceAndroid = ionic.Platform.isAndroid();
				// console.log();
				if($scope.deviceAndroid === false){
					$localStorage.iphoneLogin=0;
				}



});
