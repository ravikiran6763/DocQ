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
});

				$scope.getPhoto = function()
				{
						console.log("got camera button click");
						$cordovaCamera.getPicture().then(function(imageURI)
						{
								console.log(imageURI);
								$scope.lastPhoto = imageURI;
									var   ft = new FileTransfer(),
									reader = new FileReader(),
									fileName,
									options = new FileUploadOptions();
									options.fileKey="ffile";
									fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
								options.fileName=fileName;
								options.mimeType="image/jpeg";
								var params = {};
							options.fileKey = "file";
							options.chunkedMode = false;
							console.log(fileName);

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
											 $scope.lastPhoto = imageData;
										var   ft = new FileTransfer(),
										 reader = new FileReader(),
										 fileName,
										 options = new FileUploadOptions();
								 options.fileKey="ffile";
							 fileName = imageData.substr(imageData.lastIndexOf('/')+1);
								 options.fileName=fileName;
								 options.mimeType="image/jpeg";
								 var params = {};
							 options.fileKey = "file";
							 options.chunkedMode = false;

							 $http.get('http://dqimages.s3-website-us-west-2.amazonaws.com/dqimages', {params:{"fileName": fileName}}).then(
				function(resp) {

						reader.onloadend = function(e) {
							 var reader = new FileReader();
							console.log(this.result);

							 AWS.config.update({ accessKeyId: resp.data.awsKey, secretAccessKey: resp.data.secretAccessKey });
							 AWS.config.region = 'us-east-1';
							 var bucket = new AWS.S3({ params: { Bucket: resp.data.bucket } });
							 var params = { Key: fileName, ContentType: "image/jpeg", Body: this.result, ServerSideEncryption: 'AES256' };

							 bucket.putObject(params, function(err, data) {
								 if(err) {
									 // There Was An Error With Your S3 Config
									 alert(err.message);
									 return false;
								 }
								 else {
									 // Success!
									 alert('Upload Done');
								 }
							 }); //End putObject
						 } //end onloadend
				 var blob = dataURItoBlob(imageURI);
				 reader.readAsBinaryString(blob);
				 }, function(err) {
					 console.err(err);
				 }, {
					 quality: 75,
					 targetWidth: 320,
					 targetHeight: 320,
					 saveToPhotoAlbum: false,
						destinationType: 0
				 }); //End HTTP.GET
			 }); // End Get Picture
 }) //end GetPhoto
 function dataURItoBlob(dataURI) {
	 // convert base64/URLEncoded data component to raw binary data held in a string
	 var byteString;
	 if (dataURI.split(',')[0].indexOf('base64') >= 0)
			 byteString = atob(dataURI.split(',')[1]);
	 else
			 byteString = unescape(dataURI.split(',')[1]);

	 // separate out the mime component
	 var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	 // write the bytes of the string to a typed array
	 var ia = new Uint8Array(byteString.length);
	 for (var i = 0; i < byteString.length; i++) {
			 ia[i] = byteString.charCodeAt(i);
	 }

	 return new Blob([ia], {type:mimeString});



						$http.get('http://localhost:8100', {params:{"fileName": fileName}}).then(
							 function(resp) {
									reader.onloadend = function(e) {
											var reader = new FileReader();
										 console.log(this.result);

											AWS.config.update({ accessKeyId: resp.data.awsKey, secretAccessKey: resp.data.secretAccessKey });
											AWS.config.region = 'us-east-1';
											var bucket = new AWS.S3({ params: { Bucket: resp.data.bucket } });
											var params = { Key: fileName, ContentType: "image/jpeg", Body: this.result, ServerSideEncryption: 'AES256' };

											bucket.putObject(params, function(err, data) {
												if(err) {
													// There Was An Error With Your S3 Config
													alert(err.message);
													return false;
												}
												else {
													// Success!
													alert('Upload Done');
												}
											}); //End putObject
										} //end onloadend
								var blob = dataURItoBlob(imageURI);
								reader.readAsBinaryString(blob);

								}, function(err) {
									console.err(err);
								}, {
									quality: 75,
									targetWidth: 320,
									targetHeight: 320,
									saveToPhotoAlbum: false,
									 destinationType: 0
								}); //End HTTP.GET
							}; // End Get Picture

						} //end GetPhoto

						function dataURItoBlob(dataURI)
						{


									// convert base64/URLEncoded data component to raw binary data held in a string
									var byteString;

									if (dataURI.split(',')[0].indexOf('base64') >= 0)
										byteString = atob(dataURI.split(',')[1]);
									else
										byteString = unescape(dataURI.split(',')[1]);

									// separate out the mime component
									var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

									// write the bytes of the string to a typed array
									var ia = new Uint8Array(byteString.length);


									for (var i = 0; i < byteString.length; i++)
									{

										ia[i] = byteString.charCodeAt(i);

									}

										return new Blob([ia], {type:mimeString});


						}


			 })






			//  $scope.choosePicture = function()
			//  {
			//
			//
			// 	 			var options = {
			// 						quality: 75,
			// 						destinationType: Camera.DestinationType.DATA_URL,
			// 						sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			// 						allowEdit: true,
			// 						encodingType: Camera.EncodingType.JPEG,
			// 						targetWidth: 300,
			// 						targetHeight: 300,
			// 						popoverOptions: CameraPopoverOptions,
			// 						saveToPhotoAlbum: false
			// 				};
			//
			// 						$cordovaCamera.getPicture(options).then(function (imageData) {
			// 								$scope.imgURI = "data:image/jpeg;base64," + imageData;
			// 						}, function (err) {
			// 								// An error occured. Show a message to the user
			// 								console.log("An error occured while accessing the Gallery");
			// 						});
			//
			//
			// }
			//
			// $scope.getimage = function()
			// {
			//
			//
			// 		alert('called');
			//
			//
			// }
;
