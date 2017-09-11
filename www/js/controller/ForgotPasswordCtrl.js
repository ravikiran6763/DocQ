DoctorQuickApp.controller('ForgotPasswordCtrl', function($scope,$window,$state, $ionicLoading,$cordovaToast, $ionicHistory,ForgotPassword) {
$scope.user = {};

  console.log('forgotPasseword');
	$scope.recoverPassword = function(){
    console.log($scope.user.phone);
		console.log('recoverclicked');

    ForgotPassword.forgotPassword($scope.user.phone).then(function(response){
        $scope.PasswordDetails=response;//store the response array in doctor details
        console.log($scope.PasswordDetails);
        if($scope.PasswordDetails){
          window.plugins.toast.showWithOptions({
          message: "Password has been sent to registerd mobile number",
          duration: "short", // 2000 ms
          position: "bottom",
          styling: {
          opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
          backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
          textColor: '#ffffff', // Ditto. Default #FFFFFF
          textSize: 13, // Default is approx. 13.
          cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
          horizontalPadding: 16, // iOS default 16, Android default 50
          verticalPadding: 12 // iOS default 12, Android default 30
          }
          });
        }
        else{
          window.plugins.toast.showWithOptions({
          message: "Number does not exist in our database",
          duration: "short", // 2000 ms
          position: "bottom",
          styling: {
          opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
          backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
          textColor: '#ffffff', // Ditto. Default #FFFFFF
          textSize: 13, // Default is approx. 13.
          cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
          horizontalPadding: 16, // iOS default 16, Android default 50
          verticalPadding: 12 // iOS default 12, Android default 30
          }
          });
        }


    }).catch(function(error){
      console.log('failure data', error);
    });
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
		$state.go('auth.loginNew', {}, {location: "replace", reload: false});
	};


})
