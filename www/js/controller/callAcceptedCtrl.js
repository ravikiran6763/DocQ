DoctorQuickApp.controller('callAcceptedCtrl', function($scope,$rootScope,$ionicConfig, $http, $cordovaNetwork,$timeout,$ionicPopup,$ionicPlatform,$ionicHistory, $stateParams,$interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices,callacceptedbydoctor,callAcceptedService,doctorServices,HardwareBackButtonManager,patientProfileDetailsService) {

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
 $rootScope.rates=$stateParams.rates;
 $rootScope.totalRates=$stateParams.totalRates;

 $scope.ratings = [{
 			 current: $rootScope.rates,
 			 max: 5,
 			 total:$rootScope.totalRates
 	 }, ];

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

 document.addEventListener("deviceready", function (){
     var type = $cordovaNetwork.getNetwork()
     var isOnline = $cordovaNetwork.isOnline()
     var isOffline = $cordovaNetwork.isOffline()
 		console.log(type);

 		if(  type != '4g'){
 			console.log('wifi');
 		}
     // listen for Online event
     $rootScope.$on('networkOffline', function(event, networkState){
       var onlineState = networkState;
 			console.log(onlineState);
     })

     // listen for Offline event
     $rootScope.$on('networkOffline', function(event, networkState){
       var offlineState = networkState;
 			console.log(offlineState);
     })

   }, false);


$scope.checkWalletBalance = function()
{
	var videocallflag = 2;
	$scope.startdate = new Date();
	$scope.callid = $rootScope.callId;
	// $localStorage.ViewDoc=1;

	console.log($localStorage.networkType);
	var uname = "greet+"+$localStorage.user;
	var pw = "DQ_patient";

		 var persontocall = "greet+" + $rootScope.accptdDoc;
		 console.log(uname);
		 console.log(persontocall);
		 console.log($scope.callid);

	if($localStorage.networkType == 'None')
	{
		var confirmPopup = $ionicPopup.confirm({
						title: 'DoctorQuick',
						template: 'You are Offline ',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
							{
								text: 'Ok',
								type: 'button-royal',
								onTap: function(e) {
								console.log('offline');
								}
							},
						]
					});
	}
	else if($localStorage.networkType == 'Unknown' || $localStorage.networkType == 'Ethernet' || $localStorage.networkType == '2G' || $localStorage.networkType == '3G')
	{
		var confirmPopup = $ionicPopup.confirm({
						title: 'DoctorQuick',
						template: 'We detected slow nwtwork on your device ',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
							{
								text: 'Ok',
								type: 'button-positive',
								onTap: function(e) {
								console.log('ok');
								}
							},
						]
					});
	}
	else if($localStorage.networkType == '4G' || $localStorage.networkType == 'WiFi')
	{
		var success = function(message)
		{
				alert(message);
				$scope.enddate = new Date();
				console.log($localStorage.user);
				console.log($rootScope.accptdDoc);
				// console.log($localStorage.Doctocall);
				callacceptedbydoctor.accpeteddoctor($localStorage.user,$rootScope.accptdDoc,videocallflag,$scope.startdate,$scope.enddate,$scope.callid);
				$state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc},{reload: true});

				console.log($rootScope.reqId);

				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

			 $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc}, {location: "replace", reload: true});

		}
		var failure = function()
		{
			alert("Error calling Hello Plugin");
		}
			hello.greet(uname,pw,persontocall,success, failure);
	}
	else{

		//Do nNothing

	}
				// $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc});
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
		 setTimeout(function (){
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
		 console.log('noData');
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
		//  $localStorage.ViewDoc=0;
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
