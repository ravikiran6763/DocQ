DoctorQuickApp.controller('callAcceptedCtrl', function($scope,$rootScope,$ionicConfig, $http, $timeout,$ionicPopup,$ionicHistory, $stateParams,$interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices,callacceptedbydoctor,callAcceptedService,doctorServices) {

	$rootScope.headerTxt="Doctor";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

 // $interval(callAtInterval, 5000);

 // function callAtInterval() {
 //
 // 	console.log('callAtInterval');
 // }
 $rootScope.accptdDoc=$stateParams.accptdDoc;
 $rootScope.callId=$stateParams.callId;
 $rootScope.callFlag=$stateParams.callFlag;
console.log($rootScope.callFlag,$rootScope.callId);
 callAcceptedService.updateseenView($rootScope.callId).then(function(response){
 $scope.cancelledReq=response;
 }).catch(function(error){
 console.log('failure data', error);
 });


 doctorServices.doctorDetails($rootScope.accptdDoc).then(function(response){
 $scope.calledDetails=response;
 }).catch(function(error){
 console.log('failure data', error);
 });


$scope.checkWalletBalance = function()
{
	var videocallflag = 2;
	$scope.startdate = new Date();
	$scope.callid = $rootScope.callId;
	$localStorage.ViewDoc=1;

			var uname = "greet+"+$localStorage.user;
			 var pw = "DQ_patient";

			 var persontocall = "greet+" + $rootScope.accptdDoc;
			 console.log(uname);
			 console.log($scope.callid);
			 	 var success = function(message)
				{
						alert(message);
						$scope.enddate = new Date();
						console.log($localStorage.user);
						console.log($localStorage.Doctocall);
						callacceptedbydoctor.accpeteddoctor($localStorage.user,$rootScope.accptdDoc,videocallflag,$scope.startdate,$scope.enddate,$scope.callid);
						$state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc});

						patientProfileDetailsService.updatenotesflag($rootScope.reqId).then(function(response){
			 			 //console.log($localStorage.reqPat);
			 			 console.log('success');

			 		 }).catch(function(error){
			 			 console.log('failure data', error);
			 		 })
				}
				var failure = function()
				{
					alert("Error calling Hello Plugin");
				}

				hello.greet(uname,pw,persontocall,success, failure);
}



$scope.BalanceForVoiceCall = function()
{
      // alert('called');
	var audiocallflag = 1;
	$scope.startdate = new Date();
	$scope.callid = $rootScope.callId;

				var unametoaudiocall = "greet+"+$localStorage.user;
			 	var pwtoaudiocall = "DQ_patient";

			 	var persontocallforaudio = "greet+" + $localStorage.Doctocall;
			//  console.log(uname);
			//  console.log(persontocallforaudio);
				 var success = function(message)
				{

						alert(message);
						$scope.enddate = new Date();
							console.log($localStorage.user);
							console.log($localStorage.Doctocall);
							callacceptedbydoctor.accpeteddoctor($localStorage.user,$localStorage.Doctocall,audiocallflag,$scope.startdate,$scope.enddate,$scope.callid);
						$state.go('app.patient_summary');

				}
				var failure = function()
				{
					alert("Error calling Hello Plugin");
				}

				hello.audiocallvsee(unametoaudiocall,pwtoaudiocall,persontocallforaudio,success, failure);

}

$scope.isFirstTime = false;
$interval(checkAcceptedReq,2000);
 function checkAcceptedReq(){
	 doctorServices.patientActivity($rootScope.callId).then(function(response){
	 $scope.consultStatus=response;

	 if($scope.consultStatus[0][0] == 4 && $scope.isFirstTime == false){

		 $scope.isFirstTime=true;
		 $scope.declinedByPatient = $ionicPopup.show({
		 			template: "<div>Doctor has declined for a consultation</div>",
		 			cssClass: 'requestPopup',
		 			scope: $scope,
		 			buttons: [
		 			{
		 			text: 'Ok',
		 			type: 'button-positive',
		 			onTap:function(){
		 				$state.go("app.patient_home");
						$scope.declinedByPatient.close();
						$ionicHistory.clearHistory();
		 			}
		 			},
		 		]
		 		});
	 }
	 else{

	 }
		//  $state.go($state.current, {}, {reload: true});
	 }).catch(function(error){
	 console.log('failure data', error);
	 });
 }


});
