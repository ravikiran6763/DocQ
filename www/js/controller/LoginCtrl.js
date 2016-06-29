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
			// 	 template: '<div>'+' <ion-spinner class="rippel"></ion-spinner><br><div class="backdrop visible backdrop-loading active wm-proper-times" style="height: 260px;   margin-top: 245px; left: 8;"></div>'+
			// 			'<span>Logging in...</span></div>'+
			// 			'</div>',
			// 	 animation: 'fade-in',
			// 	 showBackdrop: true,
			// 	 maxWidth: 100,
			// 	 showDelay: 0
			//  }
		 );
			 // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
				//  var sample= $cookies.remove('usernum');
        $localStorage.user = $scope.loginData.phone;
				$rootScope.u = $scope.loginData.phone;
				/*
					if(!$scope.loginData.phone && !$scope.loginData.pin)
					{
							$ionicPopup.alert({
							title: 'Enter your Login Details',
							template:'Please Enter your Login credentials'
							})
							return true;
					}

					if(!$scope.loginData.phone )
					{
							$ionicPopup.alert({
							title: 'Invalid Mobile Number or Password',
							template:'Please try again if the problem persist call us directly'
							})
							return true;
					}
					if(!$scope.loginData.pin)
					{
						 $ionicPopup.alert({
						title: 'Invalid Password',
						template:'Please Enter Correct Password'
						})
						return true;
					}

					*/

				// 	else{
				// 	$ionicLoading.show({ template: 'Loading...' });
				//
				// }$ionicLoading.hide();

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
						$state.go('app.patient_home');
						}

						else if(response === "doctor")
						{
						$state.go('templates.doctor_home');
						}
						else {
							$ionicPopup.alert({
						 title: 'Invalid Credentials',
						 template:'Please Enter Correct Details'
						 })
						}

				}).catch(function(error){
					console.log('failure data', error);
				});
			}
			$timeout(function () {
			 $ionicLoading.hide();
		 }, 1000);
			//to pass patient phone number to profile detail service
			// patientProfileDetailsService.getPatientDetails(userDetails)
			// 		.then(function(response){
			// 		console.log(response);
			// }).catch(function(error){
			// 	console.log('failure data', error);
			// });
		}

  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Video Player</h1> </ion-header-bar> <ion-content> Hello dere! </ion-content></ion-popover-view>';
//var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Video Player</h1> </ion-header-bar> <ion-content> <div class="player">	<div class="mediaplayer item item-image"> <video poster="http://corrupt-system.de/assets/media/sintel/sintel-trailer.jpg" controls preload="none"><source src="http://corrupt-system.de/assets/media/sintel/sintel-trailer.m4v" type="video/mp4" /><source src="http://corrupt-system.de/assets/media/sintel/sintel-trailer.webm" type="video/webm" /></video></div></div></ion-content></ion-popover-view>';
  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  // $ionicPopover.fromTemplateUrl('video.html', {
  //   scope: $scope
  // }).then(function(popover) {
  //   $scope.popover = popover;
  // });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });


})
