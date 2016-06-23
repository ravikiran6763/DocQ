// APP

DoctorQuickApp.controller('docSidemenuCtrl', function($scope,$rootScope, $ionicConfig) {
	//console.log('sidemenu');
	$rootScope.docAvailable = false;

})


DoctorQuickApp.controller('doctorScreensCtrl', function($scope, $rootScope, $ionicConfig, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails) {

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
		$rootScope.showDocStatus=true;

	}



})


DoctorQuickApp.controller('patientrequestCtrl', function($scope,$rootScope, $ionicConfig) {
//alert('hello');
  $scope.toggle = true;
	$rootScope.headerTxt="Request";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

	 $scope.$watch('toggle', function(){
			 $scope.toggleText = $scope.toggle ? 'Accept!' : 'Accepted';
	 });

})


DoctorQuickApp.controller('notesCtrl', function($scope,$rootScope, $ionicConfig) {

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


})

DoctorQuickApp.controller('patientTestsCtrl', function($scope,$rootScope, $ionicConfig) {

		$rootScope.user={};
		$scope.notes = {};
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;

		$scope.done=function(){
		//alert($scope.user.testforpatient);
		console.log(	$scope.notes.checkedTests);
		//$scope.notes.checkedTests=true;
		}
		$scope.clear=function(){
			$scope.user.testforpatient="";
		}
			  $scope.toggle = true;
				$rootScope.headerTxt="Tests";
				$rootScope.showBackBtn=true;

})
DoctorQuickApp.controller('diagnosisCtrl', function($scope,$rootScope, $ionicConfig) {

		$scope.diagnosis={};
		$scope.done=function(){
		alert($scope.diagnosis.diagnosisforpatient);
		console.log('done dana done');
		}
		$scope.clear=function(){
			$scope.diagnosis.diagnosisforpatient="";
		}
			  $scope.toggle = true;
				$rootScope.headerTxt="Diagnosis";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;

})

DoctorQuickApp.controller('medicationCtrl', function($scope,$rootScope, $ionicConfig) {

		$scope.medication={};
		$scope.done=function(){
		alert($scope.medication.medicationforpatient);
		console.log('done dana done');
		}
		$scope.clear=function(){
			$scope.medication.medicationforpatient="";
		}
			  $scope.toggle = true;
				$rootScope.headerTxt="Medication";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;

})



DoctorQuickApp.controller('doc_customercareCtrl', function($scope,$rootScope, $ionicConfig) {
  $scope.toggle = true;
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

})

DoctorQuickApp.controller('chatWithPatientCtrl', function($scope, $rootScope, $localStorage, $ionicConfig, $ionicActionSheet) {
	$rootScope.headerTxt="Messeges";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

	$scope.showActionsheet = function() {

	 $ionicActionSheet.show({

		 buttons: [

			 { text: ' Send Photo ' },
			 { text: ' Send Prescription' },

			 ],
		//  destructiveText: 'Delete',
		 cancelText: 'Cancel',
		 cancel: function() {
			 console.log('CANCELLED');
			 $localStorage.$reset;
		 },
		 buttonClicked: function(index) {
			 console.log('BUTTON CLICKED', index);
			 if(index == 0){
				//  alert('sendphoto');
				console.log('Send photo');

			 }
			 if(index == 1){
				console.log('sendprescription');
			}
			 return true;
		 },

	 });
 };
	// $http.get('patient_home.json').success(function(response) {
	// 	$scope.feeds_categories = response;
	// });patientProfileCtrl
})



DoctorQuickApp.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};
	$scope.doSignUp = function(){
		$state.go('app.patient_home');
	};
})

DoctorQuickApp.controller('ForgotPasswordCtrl', function($scope, $state) {
	$scope.recoverPassword = function(){
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
	// $rootScope.headerTxt="Customer Care";
	// $rootScope.showBackBtn=true;

})
;
