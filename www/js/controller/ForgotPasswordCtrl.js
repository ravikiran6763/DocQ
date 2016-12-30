DoctorQuickApp.controller('ForgotPasswordCtrl', function($scope, $state, $ionicLoading, ForgotPassword) {
$scope.user = {};

  console.log('forgotPasseword');
	$scope.recoverPassword = function(){
    console.log($scope.user.phone);
		console.log('recoverclicked');

    ForgotPassword.forgotPassword($scope.user.phone).then(function(response){
        $scope.$PasswordDetails=response;//store the response array in doctor details
        console.log($scope.$PasswordDetails);
    }).catch(function(error){
      console.log('failure data', error);
    });
		$state.go('auth.loginNew');
	};


})
