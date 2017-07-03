DoctorQuickApp.controller('patientpaymentCtrl', function($scope, $ionicConfig, $rootScope, $localStorage,  $window, $ionicSideMenuDelegate, LoginService, patientWalletServices) {

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

   $scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);

})
