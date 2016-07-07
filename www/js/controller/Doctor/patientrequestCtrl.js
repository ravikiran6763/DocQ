DoctorQuickApp.controller('patientrequestCtrl', function($scope,$rootScope,$localStorage,$stateParams,$ionicConfig,patientrequesttodoctor) {
			  $scope.toggle = true;
				$rootScope.headerTxt="Request";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;

				$scope.toggleText = "Accept";

	//  $scope.$watch('toggle', function(){
	// 		 $scope.toggleText = $scope.toggle ? 'Accept' : 'Accepted';
	 //
	// 		 console.log('accpet clicked');
	 //
	 //
	//  });

				$rootScope.pfname = $stateParams.pfname;
				$rootScope.plname = $stateParams.plname;
				 $scope.pfname = $stateParams.pfname;
				 $scope.plname = $stateParams.plname;

				 $scope.page = $stateParams.page;
				 $scope.psex = $stateParams.psex;

				 $scope.pphno = $stateParams.pphno;


				 $scope.acceptclicked = function()
				 {

					 	var docpatphno = {
							accpetcode : "1",
							doctorphno : $localStorage.user,
							patientphno : $stateParams.pphno
						}
						 $scope.toggleText = "Accepted";
						 patientrequesttodoctor.accpetedbydoctor(docpatphno);

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
