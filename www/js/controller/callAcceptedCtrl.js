DoctorQuickApp.controller('callAcceptedCtrl', function($scope,$rootScope,$ionicConfig, $http, $timeout, $interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices) {

	$rootScope.headerTxt="Doctor";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

 // $interval(callAtInterval, 5000);


 // $interval(callAtInterval, 5000);
 //
 //
 // function callAtInterval() {
 //
 // 	console.log('callAtInterval');
 // }


$scope.checkWalletBalance = function()
{

	var uname = "greet+"+$localStorage.user;
	 var pw = "DQ_patient";

	 var persontocall = "greet+" + $localStorage.docPhone;
	 console.log(uname);
	 console.log(persontocall);

	 var success = function(message)
		{
				alert(message);
		}
		var failure = function()
		{
			alert("Error calling Hello Plugin");
		}


		hello.greet(uname,pw,persontocall,success, failure);


}





})
