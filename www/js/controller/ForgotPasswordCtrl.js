DoctorQuickApp.controller('ForgotPasswordCtrl', function($scope,$window,$state,$ionicPopup , $ionicLoading,$cordovaToast, $ionicHistory,ForgotPassword, IonicClosePopupService) {
$scope.user = {};

  console.log('forgotPasseword');
	$scope.recoverPassword = function(){
    console.log($scope.user.phone);
		console.log('recoverclicked');
    $ionicLoading.show({

    })

    ForgotPassword.forgotPassword($scope.user.phone).then(function(response){
        $scope.PasswordDetails=response;//store the response array in doctor details
        console.log($scope.PasswordDetails);
        if($scope.PasswordDetails === "DoesNotExist"){
          $ionicLoading.hide();
          var confirmPopup = $ionicPopup.confirm({

    				template: '<center>This mobile number is not registered with us</center>',
    				cssClass: 'videoPopup',
    				scope: $scope,
    				buttons: [
    					{
    						text: 'OK',
    						type: 'button-positive',
    						onTap: function(e){
    						console.log('ok');
    						}
    					},
    				]
    			});
          IonicClosePopupService.register(confirmPopup);

        }
        else{
          $ionicLoading.hide();

          var confirmPopup = $ionicPopup.confirm({

    				template: '<center>Your password has been sent to registered mobile number</center>',
    				cssClass: 'videoPopup',
    				scope: $scope,
    				buttons: [
    					{
    						text: 'OK',
    						type: 'button-positive',
    						onTap: function(e){
    						console.log('ok');
                $ionicHistory.nextViewOptions({
                  disableAnimate: true,
                  disableBack: true
                });
                $state.go('auth.loginNew', {}, {location: "replace", reload: false});
    						}
    					},
    				]
    			});
          IonicClosePopupService.register(confirmPopup);

        }


    }).catch(function(error){
      console.log('failure data', error);
    });

	};


})
