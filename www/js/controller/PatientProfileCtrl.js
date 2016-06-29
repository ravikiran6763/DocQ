DoctorQuickApp.controller('patientProfileCtrl', function($scope,$rootScope,$ionicConfig,$localStorage,$http,LoginService,patientProfileDetailsService,$cordovaCamera,$cordovaFileTransfer) {

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
});



						$scope.getPhoto = function()
						{


										var options = {
												quality: 75,
												destinationType: Camera.DestinationType.DATA_URL,
												sourceType: Camera.PictureSourceType.CAMERA,
												allowEdit: true,
												encodingType: Camera.EncodingType.JPEG,
												targetWidth: 300,
												targetHeight: 300,
												popoverOptions: CameraPopoverOptions,
												saveToPhotoAlbum: false
										};

											$cordovaCamera.getPicture(options).then(function (imageData) {

													//$scope.imgURI = "data:image/jpeg;base64," + imageData;

													$scope.lastPhoto = dataURItoBlob("data:image/jpeg;base64,"+imageData);


													$scope.creds = {

																					bucket: 'dqimages',
																					access_key: 'AKIAJY37ZZXEDGRYEJVA',
																					secret_key: '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'

																					}

															console.log($scope.creds.bucket);


						var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

						AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
					  AWS.config.region = 'Oregon';


						console.log(bucket);

							if($scope.lastPhoto)
							{


									var params = { Key: 'ffile', ContentType:"image/jpeg" , Body: $scope.lastPhoto, ServerSideEncryption: 'AES256' };

									bucket.putObject(params, function(err, data) {
											if(err) {
												// There Was An Error With Your S3 Config
												alert(err.message);
												return false;
												console.log('error');
											}
											else {
												// Success!
												alert('Upload Done');
												console.log('upload done');
											}
										})

									.on('httpUploadProgress',function(progress) {
												// Log Progress Information
												console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
											});
								}
								else {
									// No File Selected
									alert('No File Selected');
									console.log('no file selected');
								}


							},
			 				function (err) {
													// An error occured. Show a message to the user

													console.log("An error occured while accessing the camera");

											});


						}

						function dataURItoBlob(dataURI)
						{

									// convert base64/URLEncoded data component to raw binary data held in a string
									 var byteString = atob(dataURI.split(',')[1]);
									 var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

									 var ab = new ArrayBuffer(byteString.length);
									 var ia = new Uint8Array(ab);
									 for (var i = 0; i < byteString.length; i++)
									 {
									    ia[i] = byteString.charCodeAt(i);
									 }

									 var bb = new Blob([ab], { "type": mimeString });
									 console.log(bb);
									 return bb;


						}


});
