DoctorQuickApp.controller('patientrequestCtrl', function($scope,$rootScope,$state,$localStorage,$stateParams,$ionicConfig,$ionicLoading,patientrequesttodoctor,doctorServices) {
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


				//  console.log($rootScope.dateAndTime);

			 	$scope.CurrentDate = new Date();
				$rootScope.dateDiff=$rootScope.dateAndTime-$scope.CurrentDate;

				// console.log($rootScope.dateDiff);


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


			$state.go('templates.requestAccepted');

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



})
