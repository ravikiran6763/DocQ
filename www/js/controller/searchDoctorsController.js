DoctorQuickApp.controller('searchDoctorsController', function($scope, $ionicConfig, $state,$rootScope, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup, searchDoctorServices, searchbyspecialities) {

	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

	console.log('Search controller called');


})
