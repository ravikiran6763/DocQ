DoctorQuickApp.controller('callAcceptedCtrl', function($scope,$rootScope,$ionicConfig, $http, $timeout, $interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices) {

	$rootScope.headerTxt="Doctor";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

 // $interval(callAtInterval, 5000);
 //
 //
 // function callAtInterval() {
 //
 // 	console.log('callAtInterval');
 // }

})
