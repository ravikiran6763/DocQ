DoctorQuickApp.controller('patientrequestCtrl', function($scope,$rootScope,$state,$localStorage,$stateParams,$ionicConfig,patientrequesttodoctor) {
			  $scope.toggle = true;
				$rootScope.headerTxt="Request";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;

				$scope.toggleText = "Accept";

				$rootScope.pfname = $stateParams.pfname;
				$rootScope.plname = $stateParams.plname;
				 $scope.pfname = $stateParams.pfname;
				 $scope.plname = $stateParams.plname;

				 $rootScope.page = $stateParams.page;
				 $rootScope.psex = $stateParams.psex;

				 $rootScope.pphno = $stateParams.pphno;
				 $rootScope.image = $stateParams.image;

				


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
			$state.go('templates.notesForPatient');

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
