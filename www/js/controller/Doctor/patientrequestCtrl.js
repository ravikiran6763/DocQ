DoctorQuickApp.controller('patientrequestCtrl', function($scope,$window,$rootScope,$state,$localStorage,$stateParams,$interval,$location,$ionicPlatform,$ionicHistory,$timeout,$ionicPopup,$ionicConfig,$ionicLoading,patientrequesttodoctor,doctorServices,patientProfileDetailsService,medicalSpecialityService) {
			  $scope.toggle = true;
				$rootScope.headerTxt="Request";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;

				$scope.toggleText = "Accept";

					$rootScope.pushReqId=$stateParams.reqId;
					$rootScope.pushReqPat=$stateParams.reqPat;
					$rootScope.dateAndTime=$stateParams.reqTime;

					// alert($rootScope.dateAndTime);
					 console.log('reqId',$rootScope.pushReqId)
					 console.log('reqPat',$rootScope.pushReqPat)
					 var consltDetails ={
						 reqId:$stateParams.reqId,
						 reqPat:$stateParams.reqPat
					 }
					 console.log('consutation:',consltDetails);
					 doctorServices.fetchReqPatientDetails(consltDetails).then(function(response){
						 console.log('Response::',response);
					 $rootScope.reqPatDetails=response;
					 var data=$rootScope.reqPatDetails//take all json data into this variable
					 		for(var i=0; i<data.length; i++){

			 						$rootScope.reqId=data[i].id,
			 						$rootScope.reqPat=data[i].patientPhone,
									// $rootScope.dateAndTime=data[i].requestedTime

					 		console.log($rootScope.reqId);
					 		console.log($rootScope.reqPat);

					 		}

					 $ionicLoading.hide();
					  //  $state.go($state.current, {}, {reload: true});
					 }).catch(function(error){
					 console.log('failure data', error);
					 });


					 ion.sound({
					     sounds: [
					         {
					             name: "androidtone",
					 						volume: 0.2
					         },
									 {
									 		name: "iphone",
									 	 volume: 0.2,
										  preload: true
									 },
					         {
					             name: "bell_ring",
					             volume: 0.1,
					             preload: false
					         }
					     ],
					     volume: 0.5,
					     path: "sounds/",
					     preload: true
					 });

					 $scope.deviceAndroid = ionic.Platform.isAndroid();

					 if($scope.deviceAndroid === true){

						 ion.sound.play("androidtone");

					 }
					 else{
						//  alert($scope.deviceAndroid);
						 ion.sound.play("iphone");
					 }
					 // play sound
					 //ion.sound.stop("androidtone");

					 $scope.currentPatient={};
					 $scope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);

			     console.log($scope.currentPatient);
					//  $rootScope.reqId=$scope.currentPatient.id;

					//  $rootScope.patientFname=$scope.currentPatient.patientFname;
					//  $rootScope.patientLname=$scope.currentPatient.patientLname;
					//  $rootScope.patientAge=$scope.currentPatient.patientAge;
					//  $rootScope.patientSex=$scope.currentPatient.patientSex;
					//  $rootScope.patientImage=$scope.currentPatient.image;
					//  $rootScope.dateAndTime=$scope.currentPatient.requestedTime;
					//  $rootScope.patientNum=$scope.currentPatient.patientNum;

			 	$scope.CurrentDate = new Date();
				$rootScope.dateDiff=$rootScope.dateAndTime-$scope.CurrentDate;

				// alert('DateDiff',$scope.CurrentDate);
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
			if($scope.deviceAndroid === true){

				ion.sound.stop("androidtone");

			}
			else{
				ion.sound.stop("iphone");
			}

			$rootScope.chekDiag=false;
			$rootScope.chekTests=false;
			$rootScope.chekMedi=false;

			$rootScope.callReq=true;
			$rootScope.callAcc=false;
			$rootScope.timer=false;

			var accptdReq = {
			accpetcode : "2",
			doctorphno : $localStorage.user,
			patientphno : $rootScope.reqPat,
			consultId:$rootScope.reqId
			}
			console.log(accptdReq);
			patientrequesttodoctor.accpetedbydoctor(accptdReq).then(function(response){
				$scope.reqStatus=response;
				console.log('updatedResponse:',response);
									if($scope.reqStatus == 'alreadyUpdated'){
												$rootScope.callReqPopUp = $ionicPopup.show({
												title:"Sorry!!!",
												template: "<div >This Request has been served already</b></div>",
												cssClass: 'requestPopup',
												scope: $scope,
												buttons: [
												{
												text: 'Ok',
												type: 'button-positive',
												onTap:function(){
												console.log('cancel');
												$ionicHistory.nextViewOptions({
													disableAnimate: true,
													disableBack: true
												});
													$state.go('templates.doctor_home',{}, {location: "replace", reload: true})
												}
												},
												]
												});


									}
									else{
									 $rootScope.callReqPopUp = $ionicPopup.show({
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
							}
			});


			$scope.counter = 120;
			$scope.onTimeout = function(){
				$scope.counter--;
				console.log($scope.counter);
				docTimeout = $timeout($scope.onTimeout,1000);
				if($scope.counter == 0){
				console.log('one minute over');
				$rootScope.buttonText='Send Request';
				$timeout.cancel(docTimeout);
				$rootScope.callReqPopUp.close();

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
					$localStorage.accpt = 0;

			// patientrequesttodoctor.acceptedbydoctor(accptdReq);
			// $state.go('templates.requestAccepted');
		}
		else if($scope.type === 'Accepted'){
			$scope.isDisabled = true;
		}
		else if($scope.type === 'Decline'){
			if($scope.deviceAndroid === true){
				ion.sound.stop("androidtone");
			}
			else{
				ion.sound.stop("iphone");
			}
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
	if($scope.routeTo == true ){
		console.log($scope.routeTo);
		$rootScope.callReqPopUp.close();

	}
}
$localStorage.showPopUp = 1;

$interval(checkAcceptedReq,1000);

var checkPatientActivity={
	callId:$rootScope.reqId,
	patient:$rootScope.patientNum
}
console.log(checkPatientActivity);
var patAct = {
accpetcode : "2",
doctorphno : $localStorage.user,
patientphno : $rootScope.pushReqPat,
consultId:$rootScope.pushReqId
}

$scope.popupShown = true;
 function checkAcceptedReq(){
	//  console.log($location.path());
	 $rootScope.path=$location.path();
	 var values = $rootScope.path.split("/");

		//Doctor has accpted but then the patient has declined for a call

		 doctorServices.doctorActivity(patAct).then(function(response){
  		 $scope.consultStatus=response;
			 $localStorage.patientDeclined=$scope.consultStatus[0][0];
			 $scope.patDeclined=$localStorage.patientDeclined;
  		 console.log($scope.consultStatus);


  		//  $state.go($state.current, {}, {reload: true});
  	 }).catch(function(error){
  	//  console.log('failure data', error);
  	 });

 }

 $scope.$watch('patDeclined', function (newValue, oldValue, scope){
		 console.log('changed');

		 if(newValue == 3){
		 setTimeout(function (){
					console.log('delay 3 sec');
				}, 3000);

				var alertPopup = $ionicPopup.alert({
					title: 'Declined!',
					template: "<div>Patient has declined for a consultation</div>",
					cssClass: 'requestPopup',
					scope: $scope,
				});
				alertPopup.then(function(res) {
					$rootScope.callReqPopUp.close();
					$state.go("templates.doctor_home",{reload:true});
					var patAct={};
					$scope.routeTo =false;
					$ionicHistory.clearHistory();
					$scope.$on('$destroy', function(){
					 $timeout.cancel(docTimeout);
					 console.log('destroyed');
					 });
				});
		 }

 },true);

 $interval(videoOrAudio,1000);
 function videoOrAudio(){
	 console.log($rootScope.reqId);
	 doctorServices.callStatus($rootScope.reqId).then(function(response){
	 		$rootScope.callStatus=response;//store the response array in doctor details
			$localStorage.callStatus=$rootScope.callStatus[0][0];
			$scope.notes=$localStorage.callStatus;
	 		console.log($scope.callStatus);
	 }).catch(function(error){
	 	console.log('failure data', error);
	 });
 }
 $scope.$watch('notes', function (newValue, oldValue, scope){
 		console.log('changed');
 		console.log(newValue);
 		console.log(oldValue);
 		if(newValue == 2){
			//  alert('close prev popup')
			 $rootScope.callReqPopUp.close();
			 $state.go("templates.prescription")
 		}

 },true);



});
//
