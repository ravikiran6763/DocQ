DoctorQuickApp.controller('patientrequestCtrl', function($scope,$rootScope,$state,$localStorage,$stateParams,$interval,$ionicPlatform,$ionicHistory,$timeout,$ionicPopup,$ionicConfig,$ionicLoading,patientrequesttodoctor,doctorServices,patientProfileDetailsService,medicalSpecialityService) {
			  $scope.toggle = true;
				$rootScope.headerTxt="Request";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;

				$scope.toggleText = "Accept";

				$rootScope.pfname = $stateParams.pfname;
				$rootScope.plname = $stateParams.plname;

				 $rootScope.page = $stateParams.page;
				 $rootScope.psex = $stateParams.psex;

				 $rootScope.pphno = $stateParams.pphno;
				 console.log($rootScope.pphno);
				 $rootScope.image = $stateParams.image;
				 $rootScope.reqId = $stateParams.reqId;

				 $localStorage.reqId= $rootScope.reqId;
				 console.log($localStorage.reqId);
				 $rootScope.reqPat=$rootScope.pphno;
				 $localStorage.reqPat = $rootScope.reqPat;
				 $rootScope.dateAndTime = $stateParams.dateAndTime;

			 	$scope.CurrentDate = new Date();
				$rootScope.dateDiff=$rootScope.dateAndTime-$scope.CurrentDate;

				$rootScope.closeDocPopUp=false;
				////// calculate datedifference////
					var timestamp = new Date($rootScope.dateAndTime).getTime();
					var currentTimestamp = new Date($scope.CurrentDate).getTime();

					var diffMs = (currentTimestamp - timestamp);
					var diffDays = Math.round(diffMs / 86400000); // days
					var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
					var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
					$rootScope.requestedDUration= diffDays + " days, " + diffHrs + " Hours, " + diffMins+ " Minutes"+" ago";
					// $rootScope.requestedDUration= diffDays + " day " + "ago";
					console.log($rootScope.requestedDUration);
					var diff = currentTimestamp-timestamp;
					console.log(diffMs);
				//////
					$rootScope.callReq=false;
					$rootScope.callAcc=true;
					$rootScope.timer=true;

 $scope.type = '';
 $scope.setType = function(event){
	 $scope.isDisabled = false;
		$scope.type = angular.element(event.target).text();
		console.log($scope.type);
		if($scope.type === 'Decline' && $localStorage.accpt === 1){

				console.log('cant Decline now');

		}
		else if($scope.type === 'Accept'){
			$localStorage.accpt=1;
			$scope.isDisabled = true;
			$scope.toggleText ='Accepted'

			$rootScope.chekDiag=false;
			$rootScope.chekTests=false;
			$rootScope.chekMedi=false;

			$rootScope.callReq=true;
			$rootScope.callAcc=false;
			$rootScope.timer=false;

			var accptdReq = {
			accpetcode : "2",
			doctorphno : $localStorage.user,
			patientphno : $stateParams.pphno,
			consultId:$rootScope.reqId
			}
			console.log(accptdReq);
			patientrequesttodoctor.accpetedbydoctor(accptdReq);

			$scope.counter = 120;
			$scope.onTimeout = function(){
				$scope.counter--;
				console.log($scope.counter);
				docTimeout = $timeout($scope.onTimeout,1000);
				if($scope.counter == 0){
				console.log('one minute over');
				$rootScope.buttonText='Send Request';
				$timeout.cancel(docTimeout);
				$scope.callReqPopUp.close();

				$rootScope.closeDocPopUp=true;
				console.log($rootScope.closeDocPopUp);
				$scope.noResponsePopup = $ionicPopup.show({
							template: "<div ng-app='refresh_div' ><p>Patient did not respond .</p></div>",
							cssClass: 'requestPopup',
							scope: $scope,
							buttons: [
							{
							text: 'OK',
							type: 'button-positive',
							onTap:function(){
								$state.go("templates.doctor_home");
							}
							},

						]
						});

				}
			}

			var docTimeout = $timeout($scope.onTimeout,1000);//timer interval
			$scope.$on('$destroy', function(){
			$timeout.cancel(docTimeout);
			console.log('destroyed');
			});


			 $scope.callReqPopUp = $ionicPopup.show({
	           template: "<div >Please wait for the call<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
	           cssClass: 'requestPopup',
	           scope: $scope,
	           buttons: [
	           {
	           text: 'Cancel',
	           type: 'button-royal',
	           onTap:function(){
	             console.log('cancel');
	             console.log($scope.counter);
							 console.log($localStorage.reqId);

							 $state.go("templates.doctor_home");

	             doctorServices.cancelByDoc($rootScope.reqId).then(function(response){
	             $scope.cancelledByDoc=response;
							 console.log($scope.cancelledByDoc);
	              //  $state.go($state.current, {}, {reload: true});
	             }).catch(function(error){
	             console.log('failure data', error);
	             });
	           }
	           },
	         ]
	         });

					$localStorage.accpt = 0;


			// patientrequesttodoctor.acceptedbydoctor(accptdReq);

			// $state.go('templates.requestAccepted');

		}
		else if($scope.type === 'Accepted'){
			$scope.isDisabled = true;
		}
		else if($scope.type === 'Decline'){
			console.log($scope.type);
			$localStorage.accpt='';
			console.log($localStorage.accpt);
			if($localStorage.accpt === 1){
				$scope.isDisabled = true;
				console.log('donNothing');
			}
			else{
				var docpatphno = {
				accpetcode : "2",
				doctorphno : $localStorage.user,
				patientphno : $stateParams.pphno,
				consultId:$rootScope.reqId
				}
				patientrequesttodoctor.declinedbydoctor(docpatphno);
			}
			$state.go('templates.doctor_home');

		}
		else{
		//do nothing
		}

	};
// check patient activity///
$scope.DeclinedBypatient = true
$interval(checkForrDeclined,5000);

function checkForrDeclined(){
	if($scope.isFirstTime == true ){
		console.log($scope.isFirstTime);
		$scope.callReqPopUp.close();


	}
}
$localStorage.showPopUp = 1;

$interval(checkAcceptedReq,1000);
var checkPatientActivity={
	callId:$rootScope.reqId,
	doctor:$rootScope.pphno
}
console.log(checkPatientActivity);
var patAct = {
accpetcode : "2",
doctorphno : $localStorage.user,
patientphno : $stateParams.pphno,
consultId:$rootScope.reqId
}
console.log(patAct);
$scope.popupShown = true;
 function checkAcceptedReq(){
	 doctorServices.doctorActivity(patAct).then(function(response){
		 $scope.consultStatus=response;
	//  doctorServices.patientActivity($rootScope.reqId).then(function(response){
				 if($scope.consultStatus[0][0] == 3 && $scope.popupShown == true){
					 console.log('open popup');
					 $scope.popupShown = false;
					 console.log($scope.consultStatus[0][0]);
					 $scope.callReqPopUp.close();
					 setTimeout(function () {
						console.log('delay 3 sec');
					}, 3000);

						var alertPopup = $ionicPopup.alert({
							title: 'Declined!',
							template: "<div>Patient has declined for a consultation</div>",
							cssClass: 'requestPopup',
							scope: $scope,
						});
						alertPopup.then(function(res) {
							$scope.callReqPopUp.close();
							$state.go("templates.doctor_home",{reload:true});
							var patAct={};
							$scope.isFirstTime =false;
							$ionicHistory.clearHistory();
							$scope.$on('$destroy', function(){
							 $timeout.cancel(docTimeout);
							 console.log('destroyed');
							 });
						console.log('Thank you for not eating my delicious ice cream cone');
						});


					 $localStorage.showPopUp=2;
				 }
		//  $state.go($state.current, {}, {reload: true});
	 }).catch(function(error){
	//  console.log('failure data', error);
	 });
 }
////

$scope.isFirstTime = false;
 $interval(videoOrAudio,10000);
 function videoOrAudio(){
	 doctorServices.videoOrAudio($rootScope.reqId).then(function(response){
		 console.log($rootScope.reqId);
	 $scope.videoOrAudio=response;
	 if($scope.videoOrAudio[0][0] == 2 ){
		 console.log('closethis popup');
		 
		 $scope.callReqPopUp.close();

		 setTimeout(function () {
			 console.log('delay 3 sec');
			 $state.go("templates.notesForPatient",{reqPat:$rootScope.reqPat,reqId:$rootScope.reqId}, {location: "replace", reload: true})
			 console.log($rootScope.reqPat);
			 console.log('show accpted doc profile');
		 }, 5000);

	 }
		//  $state.go($state.current, {}, {reload: true});
	 }).catch(function(error){
	 console.log('failure data', error);
	 });
 }



})
