DoctorQuickApp.controller('callAcceptedCtrl', function($scope,$rootScope,$ionicConfig, $http, $location,$cordovaNetwork,$timeout,$ionicPopup,$ionicPlatform,$ionicHistory, $stateParams,$interval, $state, $localStorage, $ionicLoading, doctorServices,$ionicSideMenuDelegate,rateDoctorServices,callacceptedbydoctor,callAcceptedService,doctorServices,HardwareBackButtonManager,patientProfileDetailsService) {

	$rootScope.headerTxt="DoctorQuick";
	$rootScope.showBackBtn=false;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.sandwich=false;
	$rootScope.hideSideMenu = false;

	HardwareBackButtonManager.disable();
	$ionicSideMenuDelegate.canDragContent(false)

	var currentConsultation={
		consultId:$stateParams.callId,
		doctor:$stateParams.accptdDoc
	}
	console.log(currentConsultation);

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
 console.log($scope.calledDetails);
 }).catch(function(error){
 console.log('failure data', error);
 });

// console.log($ionicHistory);

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
	else if($localStorage.networkType == 'Ethernet' || $localStorage.networkType == '2G' || $localStorage.networkType == '3G')
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
	else if($localStorage.networkType == '4G' || $localStorage.networkType == 'WiFi' || $localStorage.networkType == 'Unknown')
	{
		var success = function(message)
		{

				console.log(message);
				$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
			 });

			 $scope.deviceAndroid = ionic.Platform.isAndroid();
			 console.log($scope.deviceAndroid);
			 //$state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc,consultId:$scope.callId}, {location: "replace", reload: false});
			 if($scope.deviceAndroid === false){
				 $ionicLoading.show({
         template: '<ion-spinner></ion-spinner><br><br>Loading'
         });
				 $timeout( function(){
           $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
           // alert('loggedin');
           $ionicHistory.nextViewOptions({
           disableAnimate: true,
           disableBack: true
           });
					 $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc,consultId:$scope.callId},{location: "replace", reload: false});

           });

         }, 10000 );
			 }
			 else{
				 $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc,consultId:$scope.callId},{location: "replace", reload: false});
			 }

			 	console.log('callEnded');
				//
				$scope.enddate = new Date();
				console.log($localStorage.user);
				console.log($rootScope.accptdDoc);
				// console.log($localStorage.Doctocall);
				callacceptedbydoctor.accpeteddoctor($localStorage.user,$rootScope.accptdDoc,videocallflag,$scope.startdate,$scope.enddate,$scope.callId);

				console.log($rootScope.reqId);



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

						console.log(message);
						$scope.enddate = new Date();
							console.log($localStorage.user);
							console.log($localStorage.Doctocall);
							callacceptedbydoctor.accpeteddoctor($localStorage.user,$localStorage.Doctocall,audiocallflag,$scope.startdate,$scope.enddate,$scope.callid);
							$ionicHistory.nextViewOptions({
 						 	disableAnimate: true,
 						 	disableBack: true
 						 });
 						 $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc}, {location: "replace", reload: false});

				}
				var failure = function()
				{
					alert("Error calling Hello Plugin");
				}

				hello.audiocallvsee(unametoaudiocall,pwtoaudiocall,persontocallforaudio,success, failure);

}

$scope.isFirstTime = true;
$interval(checkAcceptedReqDocStatus,2000);
var checkPatientActivity={
	callId:$rootScope.callId,
	doctor:$stateParams.accptdDoc
}
console.log(checkPatientActivity);
 function checkAcceptedReqDocStatus(){
	//  doctorServices.patientActivity($rootScope.callId).then(function(response){
	 doctorServices.patientActivity(checkPatientActivity).then(function(response){
	 $scope.consultStatus=response;
	 console.log($scope.consultStatus);
	 $localStorage.declinedByDoc = $scope.consultStatus[0][0];
	 $scope.docDeclined=$localStorage.declinedByDoc;
	//  console.log($scope.consultStatus);
	 }).catch(function(error){
	//  console.log('failure data', error);
	 });
 }
 $scope.$watch('docDeclined', function (newValue, oldValue, scope){
 		console.log('changed');

 		if(newValue > oldValue){
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
		     });
 		}

 },true);

 $scope.declineCall=function(){
		 var calldecline={
		 patient:$localStorage.user,
		 doctor:$rootScope.doctorPhone,
		 callId:$rootScope.callId
		 }
		 console.log(calldecline);
		 $interval.cancel(checkAcceptedReqDocStatus);
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
