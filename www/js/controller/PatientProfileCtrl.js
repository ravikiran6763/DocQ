DoctorQuickApp.controller('patientProfileCtrl', function($scope,$rootScope,$ionicConfig,$localStorage,$http, $ionicPopup, LoginService,patientProfileDetailsService,$cordovaCamera) {

	$rootScope.headerTxt="Patient Profile";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$scope.loginData={};
	console.log($localStorage.user);


	patientProfileDetailsService.fetchPatient($localStorage.user).then(function(response){
		$scope.patient_details=response;
		console.log($scope.patient_details);

}).catch(function(error){
console.log('failure data', error);
})

				$scope.getPhoto = function()
				{

					var options = {

													quality: 50,
													destinationType: Camera.DestinationType.FILE_URI,
													sourceType: Camera.PictureSourceType.CAMERA,
													allowEdit: false,
													encodingType: Camera.EncodingType.JPEG,
													popoverOptions: CameraPopoverOptions,
													saveToPhotoAlbum: true,
													correctOrientation:true
									};

							$cordovaCamera.getPicture(options).then(movePic,function(imageData) {
									$rootScope.imgURI=imageData;
							}, function(err) {
									console.error(err);
							});


							function movePic(imageData)
							{

									 console.log("move pic");
									 console.log(imageData);
									 window.resolveLocalFileSystemURL(imageData, resolveOnSuccess, resOnError);

							}


							function resolveOnSuccess(entry)
							{

									console.log("resolvetosuccess");

					        //new file name
					        var newFileName = "veeresh_camera" + ".jpg";
					        var myFolderApp = "Test";

					        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
					            console.log("folder create");

											//The folder is created if doesn't exist
					            fileSys.root.getDirectory( myFolderApp,
					                {create:true, exclusive: false},
					                function(directory) {
					                    console.log("move to file..");
					                    entry.moveTo(directory, newFileName,  successMove, resOnError);
					                    console.log("release");

					                },
					                resOnError);
					        },
					        resOnError);
					    }

							function successMove(entry)
							{
					        //I do my insert with "entry.fullPath" as for the path
					        console.log("success");
					        //this is file path, customize your path
					        console.log(entry);
    					}

				    function resOnError(error)
						{

								console.log("failed");

						}
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




})
