// APP



DoctorQuickApp.controller('docSidemenuCtrl', function($scope,$rootScope, $ionicConfig) {
	//console.log('sidemenu');
	$rootScope.docAvailable = false;

})



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
				$rootScope.pphno = $stateParams.pphno;
				console.log($rootScope.pphno);

				 $scope.pfname = $stateParams.pfname;
				 $scope.plname = $stateParams.plname;

				 $scope.page = $stateParams.page;
				 $scope.psex = $stateParams.psex;

				 $scope.pphno = $stateParams.pphno;


				 $scope.acceptclicked = function()
				 {}


});



DoctorQuickApp.controller('patientTestsCtrl', function($scope,$state,$rootScope, $ionicConfig,testresultbydoctor) {

		$rootScope.user={};
		$scope.notes = {};
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$scope.toggle = true;
		$rootScope.headerTxt="Tests";
		$rootScope.showBackBtn=true;

		$scope.patientfname = $rootScope.pfname;
		$scope.patientlname = $rootScope.plname;


		// $scope.done=function()
		// {
		// 		if($scope.notes.checkedTests || $rootScope.testVal)
		// 		{
		// 				testresultbydoctor.testrecommended($scope.notes.checkedTests);
		// 				$rootScope.chekTests=true;
		// 				$rootScope.testVal=$scope.notes.checkedTests;
		// 				$state.go("templates.notesForPatient");
		// 		}
		// 		else if ($scope.diagnosis.diagnosisforpatient === '') {
		// 			alert('kindly Modify the diag');
		// 		}
		// 		else
		// 		{
		// 					alert('Please Enter Something')
		// 		}
		// }
		//
		// $scope.clear=function()
		// {
		// 	$scope.notes.checkedTests="";
		// 	$rootScope.chekTests=false;
		//
		// }
})


DoctorQuickApp.controller('diagnosisCtrl', function($scope,$state,$rootScope,$ionicConfig,$localStorage,testresultbydoctor) {

		$scope.diagnosis={};
		$scope.toggle = true;
		$rootScope.headerTxt="Diagnosis";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;


		$scope.patientfname = $rootScope.pfname;
		$scope.patientlname = $rootScope.plname;


	// $rootScope.val=$scope.diagnosis.diagnosisforpatient;


})

DoctorQuickApp.controller('medicationCtrl', function($scope,$rootScope, $state,$ionicConfig,testresultbydoctor) {

		$scope.toggle = true;
		$rootScope.headerTxt="Medication";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$scope.medication={};

		$scope.patientfname = $rootScope.pfname;
		$scope.patientlname = $rootScope.plname;

		// $scope.done=function()
		// {
		// 		if($scope.medication.medicationforpatient || $rootScope.testVal)
		// 		{
		// 				testresultbydoctor.medicationdone($scope.medication.medicationforpatient);
		// 				$rootScope.chekMedi=true;
		// 				$rootScope.mediVal=$scope.medication.medicationforpatient;
		// 				$state.go("templates.notesForPatient");
		// 		}
		// 		else if ($scope.diagnosis.diagnosisforpatient === '') {
		// 			alert('kindly Modify the Test');
		// 		}
		// 		else
		// 		{
		// 					alert('Please Enter Something')
		// 		}
		// }

		$scope.clear=function()
		{

			$scope.medication.medicationforpatient="";
			$rootScope.chekMedi=false;

		}
})

DoctorQuickApp.controller('doc_customercareCtrl', function($scope,$rootScope, $ionicConfig) {
  $scope.toggle = true;
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

})

DoctorQuickApp.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};
	$scope.doSignUp = function(){
		$state.go('app.patient_home');
	};
})


//newly added for DQ


DoctorQuickApp.controller('DocRegController', function($scope,$rootScope, $state,data) {
			//alert('hello');
			$scope.doc={};
			$scope.reg_doc=function(){
				data.doctor_reg($scope.doc.doc_fname,$scope.doc.doc_mname,$scope.doc.doc_lname);

			}
			$rootScope.showBackBtn=true;


})



DoctorQuickApp.controller('reviewCtrl', function($scope,$rootScope, $ionicConfig) {

		$scope.toggle = false;
	 	$rootScope.headerTxt="Invite Reviews";
		$rootScope.showBackBtn=true;
		$rootScope.checkedValue = false;
		$rootScope.showBadge=false;
		$rootScope.showDocStatus=false;


})
//
// DoctorQuickApp.controller('videoCtrl', function($scope,$rootScope, $ionicConfig, $http) {
//
// 		$scope.toggle = true;
// 	 	$rootScope.headerTxt="Video";
// 		$rootScope.showBackBtn=true;
// 		$rootScope.checkedValue = false;
// 		$rootScope.showNotification=false;
// 	// $rootScope.headerTxt="Customer Care";
// 	// $rootScope.showBackBtn=true;termsCtrl
//
//
// })
//

DoctorQuickApp.controller('myconsultationsCtrl', function($scope,$rootScope,$ionicConfig, $http) {
	$rootScope.headerTxt="My Consultations";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

})




DoctorQuickApp.controller('patientCareCtrl', function($scope,$rootScope,$ionicConfig, $http) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

})



DoctorQuickApp.controller('termsCtrl', function($scope,$rootScope, $ionicConfig) {
   	$scope.toggle = true;
	 	$rootScope.headerTxt="Terms Of Use";
		$rootScope.showBackBtn=true;
		$rootScope.checkedValue = false;
		$rootScope.showNotification=false;


})
;
