DoctorQuickApp.controller('addNewPatientCtrl', function($state, $scope,$stateParams, $rootScope, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage, LoginService, doctorServices) {
  $scope.toggle = true;
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.headerTxt="Add Patient";
  $rootScope.hideSideMenu = false;

})
