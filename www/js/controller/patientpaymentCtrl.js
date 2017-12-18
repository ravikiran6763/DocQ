DoctorQuickApp.controller('patientpaymentCtrl', function($scope, $ionicConfig, $rootScope, $localStorage,$ionicPopup,  $window, $ionicSideMenuDelegate, LoginService, patientWalletServices) {

console.log($localStorage.user);
  $rootScope.headerTxt="Payments";
  $rootScope.showBackBtn=true;
  $rootScope.checkedValue = false;
  $rootScope.showNotification=false;
  $rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

  patientWalletServices.myWalletBalance($localStorage.user).then(function(response){
   $rootScope.patientWalletdetails=response;
   console.log($rootScope.patientWalletdetails);
   }).catch(function(error){
     console.log('failure data', error);
   });

   patientWalletServices.claimFreeConsultation($localStorage.user).then(function(response){
    $rootScope.freeDetails=response;
    if($rootScope.freeDetails == "Claimed"){
      var confirmPopup = $ionicPopup.confirm({
        template: '<center>Free consultation for this device <br>has been already claimed with another phone number.<br>A deposit is required to continue with consultations.<br>Contact Customer Care for Help.</center>',
        cssClass: 'videoPopup',
        scope: $scope,
        buttons: [
        {
          text: 'OK',
          type: 'button-positive',
          onTap: function(e) {
          console.log('ok');
          }
        },
        ]
      });
    }
    console.log($rootScope.freeDetails);
    }).catch(function(error){
      console.log('failure data', error);
    });

   patientWalletServices.paidToDoctors($localStorage.user).then(function(response){
    $rootScope.doctorsList=response;
    console.log($rootScope.doctorsList);
    }).catch(function(error){
      console.log('failure data', error);
    });

   $scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);

})
