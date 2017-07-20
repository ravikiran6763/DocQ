
DoctorQuickApp.controller('patientProfileCtrl', function($scope,$interval,$rootScope,$state,$window,$ionicConfig,$ionicPush,$localStorage,$timeout, $ionicLoading ,$http, $ionicPopup, LoginService,patientProfileDetailsService,$cordovaCamera,cameraService) {

// /DoctorQuickApp.controller('patientProfileCtrl', function($scope,$rootScope,$state,$ionicConfig,$localStorage,$ionicLoading, $interval,$http, $ionicPopup, LoginService,patientProfileDetailsService,$cordovaCamera,cameraService) {

	$rootScope.headerTxt="Profile";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	$scope.loginData={};
	$rootScope.patient=$localStorage.user;
	$scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
	console.log($scope.patient_details);
	$scope.patientProfileImage = angular.fromJson($window.localStorage['patientProfileImage']);


$scope.register = function() {
 console.log('Ionic Push: Registering user');

 $scope.accptNotifications=true;
 $scope.rejectNotifications=false;
 // Register with the Ionic Push service.  All parameters are optional.
 $ionicPush.register().then(function(token){
	 return $ionicPush.saveToken(token);
 }).then(function(token){
	 console.log('token',token);
 }).catch(function(err){
	 console.log(err);
 });


};
	function updatedPIc(){
		patientProfileDetailsService.fetchPatient($localStorage.user).then(function(response){
			$scope.patient_details=response;
			$ionicLoading.hide();
			console.log($scope.patient_details);

	}).catch(function(error){
	console.log('failure data', error);
	})

	}


				$scope.termsAndCond=function(){
					// console.log('clicked');
					$scope.termsPopup = $ionicPopup.show({
						title: 'Terms Of Use',
						template: '<div ><p style="color:#fff; margin: -21px 0 0 15px; ">Please try again if the problem persists call us directly.</p></div><div style="position: absolute; margin-top: 0vh; margin-bottom: 0; top: 0px;left: 0;  border-radius: 22px; font-size: 8vw; color: teal; text-align: end; padding: 7px;" ng-controller="patientProfileCtrl" ng-Click="closethis();">X</div>'+
						'<div class="terms-content">'+
						'<li>Use of the Site. DoctorQuick Private Limited. (“DoctorQuick”, “we”, “us”, or “our”) operates the website located at www.doctorquick.com and other related websites and mobile applications with links to these Terms of Use (collectively, the “Site”). We offer online telehealth services (the “Services”) enabling our members (“Members”) to report their health history and engage healthcare professionals (“Treating Providers”) to obtain medical and healthcare services (“Services”). By accessing and using the Site, you agree to be bound by these Terms of Use and all other terms and policies that appear on the Site. If you do not wish to be bound by any of these Terms of Use, you may not use the Site or the Services.</li>'+
						'<br><li>Use of the Site. DoctorQuick Private Limited. (“DoctorQuick”, “we”, “us”, or “our”) operates the website located at www.doctorquick.com and other related websites and mobile applications with links to these Terms of Use (collectively, the “Site”). We offer online telehealth services (the “Services”) enabling our members (“Members”) to report their health history and engage healthcare professionals (“Treating Providers”) to obtain medical and healthcare services (“Services”). By accessing and using the Site, you agree to be bound by these Terms of Use and all other terms and policies that appear on the Site. If you do not wish to be bound by any of these Terms of Use, you may not use the Site or the Services.</li>'+

						'</div>',
						// templateUrl: "views/app/viewdoctor_profile.html",
						cssClass: 'termsPopup',
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
					$scope.termsPopup.close();
					};

				}

				$scope.changeProfilePhoto = function() {
					console.log('change pic');

				}
				$scope.changePhoto = function() {
					// $state.go('app.capture');
				var myPopup=	$ionicPopup.show({
					title: 'Upload Profile Picture',
					template:' <center>Choose From</center>',
					cssClass: 'videoPopup',
					buttons: [
						{
						text: 'Camera',
						type: 'icon-left icon-google-drive button-assertive',
						onTap: $scope.takePhoto = function () {
															var options = {
																quality: 75,
																destinationType: Camera.DestinationType.DATA_URL,
																sourceType: Camera.PictureSourceType.CAMERA,
																allowEdit: true,
																encodingType: Camera.EncodingType.JPEG,
																targetWidth: 300,
																targetHeight: 300,
																popoverOptions: CameraPopoverOptions,
																saveToPhotoAlbum: true
														};

																$cordovaCamera.getPicture(options).then(function (imageData) {
																		$rootScope.imgURI = "data:image/jpeg;base64," + imageData;

																		var imageUploadData ={
																			image:$rootScope.imgURI,
																			patientPhone:$rootScope.patient
																		}
																		$window.localStorage['patientProfileImage'] = JSON.stringify([{
																		  image: $rootScope.imgURI,
																		}]);
																		console.log($rootScope.imgURI)
																		cameraService.uploadPicture(imageUploadData).then(function(response){
																			$scope.uploadedData=response;
																			console.log($scope.uploadedData);
																			// $ionicLoading.hide();
																			 $window.location.reload();
																		$scope.reload = function() {
																		return $state.transitionTo($state.current, $stateParams, {reload: true}).then(function() {
																		$scope.hideContent = true;
																		return $timeout(function() {
																		return $scope.hideContent = false;
																		}, 1);
																		});
																		};


																	}).catch(function(error){
																	console.log('failure data', error);
																	})

																}, function (err) {
																		// An error occured. Show a message to the user
																});

														}
						},
						{
						text: 'Gallery',
						type: 'button-assertive',
						onTap: $scope.choosePhoto = function () {
							var options = {
								quality: 75,
								destinationType: Camera.DestinationType.DATA_URL,
								sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
								allowEdit: true,
								encodingType: Camera.EncodingType.JPEG,
								targetWidth: 300,
								targetHeight: 300,
								popoverOptions: CameraPopoverOptions,
								mediaType:0,
								saveToPhotoAlbum: false
						};

								$cordovaCamera.getPicture(options).then(function (imageData) {
										$rootScope.imgURI = "data:image/jpeg;base64," + imageData;
										var imageUploadData ={
											image:$rootScope.imgURI,
											patientPhone:$rootScope.patient
										}
										$window.localStorage['patientProfileImage'] = JSON.stringify([{
										  image: $rootScope.imgURI,
										}]);
										cameraService.uploadPicture(imageUploadData).then(function(response){
											$scope.uploadedData=response;
											console.log($scope.uploadedData);
											// $ionicLoading.hide();
											$scope.reload = function() {
											return $state.transitionTo($state.current, $stateParams, {reload: true}).then(function() {
											$scope.hideContent = true;
											return $timeout(function() {
											return $scope.hideContent = false;
											}, 1);
											});
											};
									}).catch(function(error){
									console.log('failure data', error);
									})

								}, function (err) {
										// An error occured. Show a message to the user
								});

						}
						},
					]
				});
				$scope.closethis = function()
				{
				$scope.myPopup.close();
				};
			// 	$timeout(function() {
		  //     myPopup.close(); //close the popup after 3 seconds for some reason
			// 		console.log('closed');
		  //  }, 4000);
				};






})
