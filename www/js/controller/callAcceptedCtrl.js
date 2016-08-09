DoctorQuickApp.controller('callAcceptedCtrl', function($scope,$rootScope,$ionicConfig, $http, $timeout, $interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices,callacceptedbydoctor) {

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


	var videocallflag = 2;

	$scope.startdate = new Date();

	$scope.callid = $rootScope.callId;


			var uname = "greet+"+$localStorage.user;
			 var pw = "DQ_patient";

			 var persontocall = "greet+" + $localStorage.Doctocall;
			 console.log(uname);
			 console.log(persontocall);

			 	 var success = function(message)
				{

						alert(message);

						$scope.enddate = new Date();


							console.log($localStorage.user);
							console.log($localStorage.Doctocall);

							callacceptedbydoctor.accpeteddoctor($localStorage.user,$localStorage.Doctocall,videocallflag,$scope.startdate,$scope.enddate,$scope.callid);




						$state.go('app.patient_summary');


				}
				var failure = function()
				{
					alert("Error calling Hello Plugin");
				}

				hello.greet(uname,pw,persontocall,success, failure);



}





})
