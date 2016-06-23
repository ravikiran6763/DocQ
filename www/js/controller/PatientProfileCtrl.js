DoctorQuickApp.controller('patientProfileCtrl', function($scope,$rootScope,$ionicConfig,$localStorage,$http,LoginService,patientProfileDetailsService,$cordovaCamera) {

	$rootScope.headerTxt="Patient Profile";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$scope.loginData={};
	console.log($localStorage.user);


//image object to send data to server
var imageobject;




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

										$scope.imgURI = "data:image/jpeg;base64," + imageData;


								}, function (err) {
										// An error occured. Show a message to the user

										console.log("An error occured while accessing the camera");

								});



			 }



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
