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



				 $scope.acceptclicked = function()
				 {

					 	var docpatphno = {
							accpetcode : "1",
							doctorphno : $localStorage.user,
							patientphno : $stateParams.pphno
						}


						 $scope.toggleText = "Accepted";
						 patientrequesttodoctor.accpetedbydoctor(docpatphno);
						 $state.go('templates.notesForPatient');

				 }
				 $scope.decline = function()
				 {
							 var docpatphno = {
							 accpetcode : "2",
							 doctorphno : $localStorage.user,
							 patientphno : $stateParams.pphno
						 }
							patientrequesttodoctor.declinedbydoctor(docpatphno);
				 }

})
