// APP

DoctorQuickApp.controller('docSidemenuCtrl', function($scope,$rootScope, $ionicConfig) {
	//console.log('sidemenu');
	$rootScope.docAvailable = false;

})


DoctorQuickApp.controller('doctorScreensCtrl', function($scope, $rootScope,$localStorage, $ionicConfig, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails) {
		$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;

		//$scope.checkedValue = false;

	$rootScope.changeStatus = function (e)
	{
		$scope.checkedValue = "";
				if(e)
				{
						$scope.checkedValue = true;
						var whichdoctoronoff = {

							doctorphno : $localStorage.user,
							onoff : 1
						}
						doctoronoffdetails.doctoronoff(whichdoctoronoff);
				}
				else
				{
						$scope.checkedValue = false;
						var whichdoctoronoff = {
								doctorphno : $localStorage.user,
								onoff : 0
					}
					doctoronoffdetails.doctoronoff(whichdoctoronoff);
				}

		$scope.docStatus = [
	    {name: 'one', hidden: true},

	  	];

			console.log('check box changed', $scope.checkedValue);
		// $rootScope.showDocStatus=true;

	}

	$scope.res = {};


	doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){

					$scope.res = response;

}).catch(function(error){
	console.log('failure data', error);
});


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


DoctorQuickApp.controller('notesCtrl', function($scope,$rootScope, $ionicConfig,testresultbydoctor) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

	$rootScope.notes = {
			checkedDiagnosis : false,
			checkedTests : false,
			checkedMedication : false
		};

		$scope.patientfname = $rootScope.pfname;
		$scope.patientlname = $rootScope.plname;


		$scope.sendprescription = function()
		{

					$scope.diagnosis = testresultbydoctor.getdiagnosis();
					$scope.tests = testresultbydoctor.gettests();
					$scope.medication = testresultbydoctor.getmedication();

						if($scope.notes.checkedDiagnosis && $scope.notes.checkedMedication && $scope.notes.checkedTests)
						{

								$scope.diagnosis = testresultbydoctor.getdiagnosis();
								$scope.tests = testresultbydoctor.gettests();
								$scope.medication = testresultbydoctor.getmedication();

									var allresultschecked = {

										diagnosis : $scope.diagnosis,
										tests : $scope.tests,
										medication : $scope.medication

									}

									console.log(allresultschecked);


						}
						else if($scope.notes.checkedDiagnosis && $scope.notes.checkedTests)
						{

									alert('You Missed Medication');

									$scope.diagnosis = testresultbydoctor.getdiagnosis();
									$scope.tests = testresultbydoctor.gettests();


									var diagandtests = {

										diagnosis : $scope.diagnosis,
										tests : $scope.tests


									}

									console.log(diagandtests);



						}
						else if($scope.notes.checkedDiagnosis && $scope.notes.checkedMedication)
						{

									alert('You Missed Tests');

									$scope.diagnosis = testresultbydoctor.getdiagnosis();
									$scope.medication = testresultbydoctor.getmedication();

									var diagandmedication = {

										diagnosis : $scope.diagnosis,
										medication : $scope.medication

									}

									console.log(diagandmedication);




						}
						else if($scope.notes.checkedTests && $scope.notes.checkedMedication)
						{

								alert('You Missed Diagnosis');


								$scope.tests = testresultbydoctor.gettests();
								$scope.medication = testresultbydoctor.getmedication();

								var testsandmedication = {

									tests : $scope.tests,
									medication : $scope.medication

								}

								console.log(testsandmedication);

						}
						else if($scope.notes.checkedDiagnosis)
						{

							alert('You have Missed tests and Medication');


							$scope.diagnosis = testresultbydoctor.getdiagnosis();

							var onlydiagnosis = {

								diagnosis : $scope.diagnosis

							}

							console.log(onlydiagnosis);


						}
						else if($scope.notes.checkedTests)
						{

							alert('You have Missed Diagnosis and Medication');


							$scope.tests = testresultbydoctor.gettests();

							var onlytests = {

								tests : $scope.tests

							}

							console.log(onlytests);



						}
						else if($scope.notes.checkedMedication)
						{

								alert('You have Missed Diagnosis and Tests');

							$scope.medication = testresultbydoctor.getmedication();

							var onlymedication = {

								medication : $scope.medication

							}

							console.log(onlymedication);


						}
						else
						{

								alert('Please Select Atleast One Tests')

						}


		}

})

DoctorQuickApp.controller('patientTestsCtrl', function($scope,$rootScope, $ionicConfig,testresultbydoctor) {

		$rootScope.user={};
		$scope.notes = {};
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$scope.toggle = true;
		$rootScope.headerTxt="Tests";
		$rootScope.showBackBtn=true;



		$scope.done=function()
		{

				if($scope.notes.checkedTests)
				{



						testresultbydoctor.testrecommended($scope.notes.checkedTests);



				}
				else
				{
							alert('Please Enter Something')

				}

		}


		$scope.clear=function()
		{


			$scope.notes.checkedTests="";


		}



})


DoctorQuickApp.controller('diagnosisCtrl', function($scope,$rootScope,$ionicConfig,testresultbydoctor) {

		$scope.diagnosis={};
		$scope.toggle = true;
		$rootScope.headerTxt="Diagnosis";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;


		$scope.done=function()
		{


				if($scope.diagnosis.diagnosisforpatient)
				{



						testresultbydoctor.diagnosisdone($scope.diagnosis.diagnosisforpatient);


				}
				else
				{
							alert('Please Enter Something')

				}


		}


		$scope.clear=function()
		{


				$scope.diagnosis.diagnosisforpatient="";


		}




})



DoctorQuickApp.controller('medicationCtrl', function($scope,$rootScope, $ionicConfig,testresultbydoctor) {



		$scope.toggle = true;
		$rootScope.headerTxt="Medication";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$scope.medication={};



		$scope.done=function()
		{

				if($scope.medication.medicationforpatient)
				{

						testresultbydoctor.medicationdone($scope.medication.medicationforpatient);

				}
				else
				{
							alert('Please Enter Something')

				}

		}



		$scope.clear=function()
		{

			$scope.medication.medicationforpatient="";

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

DoctorQuickApp.controller('videoCtrl', function($scope,$rootScope, $ionicConfig, $http) {

		$scope.toggle = true;
	 	$rootScope.headerTxt="Video";
		$rootScope.showBackBtn=true;
		$rootScope.checkedValue = false;
		$rootScope.showNotification=false;
	// $rootScope.headerTxt="Customer Care";
	// $rootScope.showBackBtn=true;termsCtrl


})


DoctorQuickApp.controller('myconsultationsCtrl', function($scope,$rootScope,$ionicConfig, $http) {
	$rootScope.headerTxt="My Consultations";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

})


DoctorQuickApp.controller('patientRefundCtrl', function($scope,$rootScope,$ionicConfig, $http) {
	$rootScope.headerTxt="Refund";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$scope.refundReq = function() {
	     var confirmPopup = $ionicPopup.confirm({
	      // title: '<h4>Thank You</h4>',
	       template: 'Your request for refund is processed and it will be added to your account number within 7 business days..'
	     });

	   };

})

DoctorQuickApp.controller('patientCareCtrl', function($scope,$rootScope,$ionicConfig, $http) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

})

DoctorQuickApp.controller('consultSummaryCtrl', function($scope,$rootScope,$ionicConfig, $http) {
	$rootScope.headerTxt="Summary";
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
