DoctorQuickApp.controller('patientrequestCtrl', function($scope,$rootScope,$state,$localStorage,$stateParams,$ionicConfig,patientrequesttodoctor) {
			  $scope.toggle = true;
				$rootScope.headerTxt="Request";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;

				$rootScope.callRequest=true;
				$rootScope.readyForCall=false;
				$rootScope.timer=false;



				$scope.toggleText = "Accept";

				$rootScope.pfname = $stateParams.pfname;
				$rootScope.plname = $stateParams.plname;
				 $scope.pfname = $stateParams.pfname;
				 $scope.plname = $stateParams.plname;

				 $rootScope.page = $stateParams.page;
				 $rootScope.psex = $stateParams.psex;

				 $rootScope.pphno = $stateParams.pphno;
				 $rootScope.image = $stateParams.image;
				 $rootScope.dateAndTime = $stateParams.dateAndTime;

				 console.log($rootScope.dateAndTime);

			 	$scope.CurrentDate = new Date();

				// $scope.CurrentDate.setHours($scope.CurrentDate.getMinutes() - 6);
				$rootScope.dateDiff=$rootScope.dateAndTime-$scope.CurrentDate;

					////// calculate datedifference////
					var timestamp = new Date($rootScope.dateAndTime).getTime();
					var currentTimestamp = new Date($scope.CurrentDate).getTime();

					var timeDifference = (currentTimestamp - timestamp);
					var daysDiffrence = Math.round(timeDifference / 86400000); // days
					var hoursDiffrence = Math.round((timeDifference % 86400000) / 3600000); // hours
					var minutesDiffrence = Math.round(((timeDifference % 86400000) % 3600000) / 60000); // minutes

					$rootScope.requestedDUration= daysDiffrence + " days, " + hoursDiffrence + " Hours, " + minutesDiffrence+ " Minutes"+" ago";
					// $rootScope.requestedDUration= daysDiffrence + " day " + "ago";
					var diff = currentTimestamp-timestamp;
					console.log(timeDifference);

					//////



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
			var docpatphno = {
			accpetcode : "1",
			doctorphno : $localStorage.user,
			patientphno : $stateParams.pphno
			}
			console.log(docpatphno);
			patientrequesttodoctor.accpetedbydoctor(docpatphno);
			$rootScope.chekDiag=false;
			$rootScope.chekTests=false;
			$rootScope.chekMedi=false;

			$rootScope.callRequest=false;
			$rootScope.readyForCall=true;
			$rootScope.timer=true;

			// $state.go('templates.notesForPatient');

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
				patientphno : $stateParams.pphno
				}
				patientrequesttodoctor.declinedbydoctor(docpatphno);
			}

			// $state.go('templates.doctor_home');

		}
		else{
		//do nothing
		}

	};
				//  $scope.acceptclicked = function()
				//  {
				 //
				// 	 	var docpatphno = {
				// 			accpetcode : "1",
				// 			doctorphno : $localStorage.user,
				// 			patientphno : $stateParams.pphno
				// 		}
				 //
				 //
				// 		 patientrequesttodoctor.accpetedbydoctor(docpatphno);
				// 		  $state.go('templates.notesForPatient');
				 //
				//  }
				//  $scope.decline = function()
				//  {
				// 			 var docpatphno = {
				// 			 accpetcode : "2",
				// 			 doctorphno : $localStorage.user,
				// 			 patientphno : $stateParams.pphno
				// 		 }
				// 			patientrequesttodoctor.declinedbydoctor(docpatphno);
				//  }

})
