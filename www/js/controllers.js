// APP
DoctorQuickApp.controller('diagnosisCtrl', function($scope,$state,$rootScope,$stateParams,$ionicConfig,$localStorage,testresultbydoctor) {


		$scope.toggle = true;
		$rootScope.headerTxt="Diagnosis";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.hideSideMenu = true;
		$rootScope.showBadge=false;


		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;



		// $rootScope.prescription={};

		$scope.clear=function()
		{
				$rootScope.prescription.diagnosisforpatient="";
				$rootScope.chekDiag=false;
				$rootScope.val= "";
		}





})

DoctorQuickApp.controller('patientTestsCtrl', function($scope,$state,$rootScope,$stateParams,$ionicConfig,testresultbydoctor) {

		$rootScope.user={};
		$scope.notes = {};
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$scope.toggle = true;
		$rootScope.headerTxt="Tests";
		$rootScope.showBackBtn=true;

		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;

		// $rootScope.prescription={};

		$scope.clear=function()
		{
				$rootScope.prescription.checkedTests="";
				$rootScope.chekTests=false;
				$rootScope.testVal= "";


		}

		// $scope.done=function()
		// {
		// 		if($scope.notes.checkedTests || $rootScope.testVal)
		// 		{
		// 				testresultbydoctor.testrecommended($scope.notes.checkedTests);
		// 				$rootScope.chekTests=true;
		// 				$rootScope.testVal=$scope.notes.checkedTests;
		// 				$state.go("templates.prescription");
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

DoctorQuickApp.controller('medicationCtrl', function($scope,$rootScope, $stateParams,$state,$ionicConfig,testresultbydoctor) {

		$scope.toggle = true;
		$rootScope.headerTxt="Medication";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$scope.medication={};

		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;

		// $scope.done=function()
		// {
		// 		if($scope.medication.medicationforpatient || $rootScope.testVal)
		// 		{
		// 				testresultbydoctor.medicationdone($scope.medication.medicationforpatient);
		// 				$rootScope.chekMedi=true;
		// 				$rootScope.mediVal=$scope.medication.medicationforpatient;
		// 				$state.go("templates.prescription");
		// 		}
		// 		else if ($scope.diagnosis.diagnosisforpatient === '') {
		// 			alert('kindly Modify the Test');
		// 		}
		// 		else
		// 		{
		// 					alert('Please Enter Something')
		// 		}
		// }


		// $rootScope.prescription={};

		$scope.clear=function()
		{

			$rootScope.prescription.medicationforpatient="";
			$rootScope.chekMedi=false;
			$rootScope.mediVal = "";


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

DoctorQuickApp.controller('splashCtrl',function($timeout,$localStorage,$window,$scope,$state,$ionicHistory,LoginService){
  $timeout(function(){
		// console.log($localStorage.doctororpatient);
		if($localStorage.doctororpatient === 'patient'){
			window.plugins.OneSignal.getIds(function(ids){
				//document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
				//document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
				console.log(JSON.stringify(ids['userId']));
				$scope.playerId=JSON.stringify(ids['userId']);

				console.log($scope.playerId);
				var updatePlayer ={
					palyerId:$scope.playerId,
					userNum:$localStorage.user,
					user:'patient'
				}
				console.log(updatePlayer);
				LoginService.updatePlayer(updatePlayer).then(function(response){
					console.log(response);
				})
			});

			var uname1 = "greet+"+$localStorage.user;
			var pw1 = "DQ_patient";
			var success = function(message)
			{
				console.log(message);
				// alert(message);

			}
			var failure = function()
			{
				alert("Error calling Hello Plugin");
			}
			hello.login(uname1,pw1,success, failure);

			$ionicHistory.nextViewOptions({
			  disableAnimate: true,
			  disableBack: true
			});
			$state.go('app.patient_home',{}, {location: "replace", reload: false})
		}
		else if($localStorage.doctororpatient === 'doctor'){
			window.plugins.OneSignal.getIds(function(ids) {
				$scope.playerId=JSON.stringify(ids['userId']);
				console.log($scope.playerId);

				var updatePlayer ={
					palyerId:$scope.playerId,
					userNum:$localStorage.user,
					user:'doctor'
				}
				console.log(updatePlayer);
				LoginService.updatePlayer(updatePlayer).then(function(response){
					console.log(response);
				})
			});

			var uname1 = "greet+"+$localStorage.user;
			var pw1 = "DQ_doctor";
			var success = function(message)
			{
				console.log(message);
				// alert(message);
			}
			var failure = function()
			{
				alert("Error calling Hello Plugin");
			}

			hello.login(uname1,pw1,success, failure);

			$ionicHistory.nextViewOptions({
			  disableAnimate: true,
			  disableBack: true
			});
			$state.go('templates.doctor_home',{}, {location: "replace", reload: false})
		}
		else{
			$ionicHistory.nextViewOptions({
			  disableAnimate: true,
			  disableBack: true
			});
			$state.go('auth.loginNew',{}, {location: "replace", reload: false})
		}
  },10000);
  $ionicHistory.clearHistory();
})

DoctorQuickApp.controller('callAccptCtrl', function($scope,$rootScope, $stateParams,$ionicConfig,$localStorage,$ionicLoading,patientrequesttodoctor) {
   	$scope.toggle = true;
	 	$rootScope.headerTxt="Call";
		$rootScope.showBackBtn=true;
		$rootScope.checkedValue = false;
		$rootScope.showNotification=false;

		var docpatphno = {
		accpetcode : "1",
		doctorphno : $localStorage.user,
		patientphno : $localStorage.reqPat,
		reqId:$localStorage.reqId
		}
		console.log(docpatphno);
		patientrequesttodoctor.accpetedbydoctor(docpatphno).then(function(response){
			$scope.reqAccpted=response;
			$ionicLoading.hide();
			console.log($scope.reqAccpted);

		}).catch(function(error){
			console.log('failure data', error);
		});
})
;
