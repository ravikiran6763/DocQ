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




			 $scope.takePicture = function()
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

										imageobject = "data:image/jpeg;base64," + imageData;


								}, function (err) {
										// An error occured. Show a message to the user

										console.log("An error occured while accessing the camera");

								});



			 }

//
// $scope.uploadimage =  function()
// {
//
//
// 	var fd = new FormData();
// 		 var imgBlob = dataURItoBlob(imageobject);
// 		 console.log(imgBlob);
// 		 fd.append('file', imgBlob);
// 		 $http.post(
// 				 'http://ec2-54-187-148-143.us-west-2.compute.amazonaws.com/uploadimage.php',
// 				 fd, {
// 					 transformRequest: angular.identity,
// 					 headers: {
// 						 'Content-Type': undefined
// 					 }
// 				 }
// 			 )
// 			 .success(function(response) {
// 				 console.log('success', response);
// 			 })
// 			 .error(function(response) {
// 				 console.log('error', response);
// 			 });
//
// }
//
//
// function dataURItoBlob(dataURI) {
//       var binary = atob(dataURI.split(',')[1]);
//       var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//       var array = [];
//       for (var i = 0; i < binary.length; i++) {
//         array.push(binary.charCodeAt(i));
//       }
//       return new Blob([new Uint8Array(array)], {
//         type: mimeString
//       });
//     }




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


});
