DoctorQuickApp.controller('patientrequestCtrl', function($scope,$rootScope,$state,$localStorage,$stateParams,$interval, $ionicHistory,$timeout,$ionicPopup,$ionicConfig,$ionicLoading,patientrequesttodoctor,doctorServices) {
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
				 $localStorage.reqPat=$rootScope.pphno;
				 console.log($localStorage.reqPat);
				 $rootScope.dateAndTime = $stateParams.dateAndTime;

			 	$scope.CurrentDate = new Date();
				$rootScope.dateDiff=$rootScope.dateAndTime-$scope.CurrentDate;

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
				mytimeout = $timeout($scope.onTimeout,1000);
				if($scope.counter == 0){
				console.log('one minute over');
				$scope.counter=120;
				$rootScope.buttonText='Send Request';
				$timeout.cancel(mytimeout);
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
			 var mytimeout = $timeout($scope.onTimeout,1000);

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
	             console.log($localStorage.user);
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
					 $timeout(function() {
	           console.log('cancelCall here');

	            $scope.callReqPopUp.close(); //close the popup after 3 seconds for some reason


							console.log($rootScope.currentView);

	         }, 120000);

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
$scope.isFirstTime = false;
$interval(checkAcceptedReq,2000);
 function checkAcceptedReq(){
	 doctorServices.patientActivity($rootScope.reqId).then(function(response){
	 $scope.consultStatus=response;

	 if($scope.consultStatus[0][0] == 3 && $scope.isFirstTime == false){
		 $scope.callReqPopUp.close();
		 $scope.isFirstTime=true;

		 $scope.declinedByPatient = $ionicPopup.show({
		 			template: "<div>Patient has declined for a consultation</div>",
		 			cssClass: 'requestPopup',
		 			scope: $scope,
		 			buttons: [
		 			{
		 			text: 'Ok',
		 			type: 'button-positive',
		 			onTap:function(){
		 				$state.go("templates.doctor_home");
						$ionicHistory.clearHistory();
		 			}
		 			},
		 		]
		 		});
	 }
		//  $state.go($state.current, {}, {reload: true});
	 }).catch(function(error){
	 console.log('failure data', error);
	 });
 }
////


})

//
// $scope.noResponsePopup = $ionicPopup.show({
// 			template: "<div ng-app='refresh_div' ><p>Patient did not respond .</p></div>",
// 			cssClass: 'requestPopup',
// 			scope: $scope,
// 			buttons: [
// 			{
// 			text: 'OK',
// 			type: 'button-positive',
// 			onTap:function(){
// 				$state.go("templates.doctor_home");
// 			}
// 			},
//
// 		]
// 		});
