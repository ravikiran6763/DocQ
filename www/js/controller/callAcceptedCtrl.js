DoctorQuickApp.controller('callAcceptedCtrl', function($scope,$rootScope,$ionicConfig, $http, $timeout,$ionicPopup,$ionicPlatform,$ionicHistory, $stateParams,$interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices,callacceptedbydoctor,callAcceptedService,doctorServices,HardwareBackButtonManager) {

	$rootScope.headerTxt="Doctor";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.sandwich=true;

	HardwareBackButtonManager.disable();

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
				$state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc});

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


var checkPatientActivity={
	callId:$rootScope.callId,
	doctor:$stateParams.accptdDoc
}
console.log(checkPatientActivity);
 function checkAcceptedReq(){
	//  doctorServices.patientActivity($rootScope.callId).then(function(response){
	 doctorServices.patientActivity(checkPatientActivity).then(function(response){
	 $scope.consultStatus=response;
	//  console.log($scope.consultStatus);
	 if($scope.consultStatus[0][0] == 4 && $scope.isFirstTime == false){

		 $scope.isFirstTime=true;

		 setTimeout(function () {
			 console.log('delay 3 sec');
		 }, 3000);

     var alertPopup = $ionicPopup.alert({
       title: 'Declined!',
			 template: "<div>Doctor has declined for a consultation</div>",
			 cssClass: 'requestPopup',
			 scope: $scope,
     });
     alertPopup.then(function(res) {
			 $state.go("app.patient_home");
			 $ionicHistory.clearHistory();
       console.log('Thank you for not eating my delicious ice cream cone');
     });

	 }
	 else{

	 }
		//  $state.go($state.current, {}, {reload: true});
	 }).catch(function(error){
	//  console.log('failure data', error);
	 });
 }

 $scope.declineCall=function(){
		 var calldecline={
		 patient:$localStorage.user,
		 doctor:$rootScope.doctorPhone,
		 callId:$rootScope.callId

		 }
		 console.log(calldecline);
		 $interval.cancel(checkAcceptedReq);
		 $localStorage.ViewDoc=0;
		 callAcceptedService.callDeclined(calldecline).then(function(response){
			 $scope.declineStatus=response;
			 console.log($scope.declineStatus);
		 }).catch(function(error){
		 console.log('failure data', error);
		 });
			 $state.go('app.patient_home')
			 console.log('decline clicked');
 }

});
