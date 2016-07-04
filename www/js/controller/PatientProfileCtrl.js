DoctorQuickApp.controller('patientProfileCtrl', function($scope,$rootScope,$ionicConfig,$localStorage,$http,LoginService,patientProfileDetailsService,$cordovaCamera) {

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


})
