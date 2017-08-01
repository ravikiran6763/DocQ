// APP
DoctorQuickApp.controller('diagnosisCtrl', function($scope,$state,$rootScope,$stateParams,$ionicConfig,$localStorage,testresultbydoctor) {

		$scope.toggle = true;
		$rootScope.headerTxt="Diagnosis";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.hideSideMenu = false;
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
		$rootScope.hideSideMenu = false;

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

})

DoctorQuickApp.controller('medicationCtrl', function($scope,$rootScope, $stateParams,$state,$ionicConfig,testresultbydoctor) {

		$scope.toggle = true;
		$rootScope.headerTxt="Medication";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$rootScope.hideSideMenu = false;
		$scope.medication={};

		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;
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

DoctorQuickApp.controller('splashCtrl',function($rootScope,$timeout,$ionicLoading,$localStorage,$interval,$window,$scope,$state,$ionicHistory,LoginService){

  $timeout(function(){
		// console.log($localStorage.doctororpatient);
		$ionicLoading.show({
		template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
		});
		if($localStorage.doctororpatient === 'patient'){

			//$ionicLoading.hide();
			//$state.go('app.patient_home',{}, {location: "replace", reload: false})

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
			$scope.deviceAndroid = ionic.Platform.isAndroid();
			console.log($scope.deviceAndroid);
			var uname1 = "greet+"+$localStorage.user;
			var pw1 = "DQ_patient";
			if($scope.deviceAndroid === true){

				var success = function(message)
				{
					$ionicLoading.hide();
					console.log(message);
					// alert(message);
					$ionicHistory.nextViewOptions({
					  disableAnimate: true,
					  disableBack: true
					});
					$state.go('app.patient_home',{}, {location: "replace", reload: false})
				}
				var failure = function()
				{
					alert("Error calling Hello Plugin");
				}
		 hello.login(uname1,pw1,success, failure);

			}
			else{

				$ionicLoading.show({
							template: '<ion-spinner></ion-spinner><br><br>connecting to DoctorQuick'
						});
				var success = function(message)
				{
					console.log(message);
					$scope.iosLoggin=message;

				}
				var failure = function()
				{

					alert("Error calling Hello Plugin");

				}

			// $state.go('app.patient_home');//for browser login
				// $state.go('app.patient_home');//for browser login
				hello.login(uname1,pw1,success, failure);

				$timeout( function(){
						console.log('interval started');
									$interval($rootScope.loginInterval,2000,1);
							 }, 10000 );

					 $rootScope.loginInterval = function() {
						 var success = function(message)
						{
							// alert(message);
							$ionicLoading.hide().then(function(){
								console.log("The loading indicator is now hidden");
								// alert('loggedin');
								$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
								});
								$interval.cancel($rootScope.loginInterval);
								$state.go('app.patient_home', {}, {location: "replace", reload: false});
							});

						}

						var failure = function()
						{
							alert("Error Occurred While Loggin in to DoctoQuick");
						}
						hello.loginstatus(success,failure);
						}

			}

		}
		else if($localStorage.doctororpatient === 'doctor'){
			window.plugins.OneSignal.getIds(function(ids) {
				$scope.playerId=JSON.stringify(ids['userId']);
				// console.log($scope.playerId);
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
			$scope.deviceAndroid = ionic.Platform.isAndroid();
			console.log($scope.deviceAndroid);
			var uname1 = "greet+"+$localStorage.user;
			var pw1 = "DQ_doctor";
			if($scope.deviceAndroid === true){

				var success = function(message)
				{
					$ionicLoading.hide();
					console.log(message);
					$ionicHistory.nextViewOptions({
					  disableAnimate: true,
					  disableBack: true
					});
					$state.go('templates.doctor_home',{}, {location: "replace", reload: false});
					// alert(message);
				}
				var failure = function()
				{
					alert("Error calling Hello Plugin");
				}

				hello.login(uname1,pw1,success, failure);

			}
			else{

				$ionicLoading.show({
							template: '<ion-spinner></ion-spinner><br><br>connecting to DoctorQuick'
						});
				var success = function(message)
				{
							// alert(message);
					$scope.iosLoggin=message;
					$localStorage.iosLogin=$scope.iosLoggin;

				}
				var failure = function()
				{

					alert("Error calling Hello Plugin");

				}

			// $state.go('app.patient_home');//for browser login
				// $state.go('app.patient_home');//for browser login
				hello.login(uname1,pw1,success, failure);

				$timeout( function(){
						console.log('interval started');
									$interval(loginStatus,2000,1);
							 }, 10000 );

					 function loginStatus() {
						 var success = function(message)
						{
							// alert(message);
							$ionicLoading.hide().then(function(){
								console.log("The loading indicator is now hidden");
								// alert('loggedin');
								$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
								});
								$interval.cancel(loginStatus);

								$state.go('templates.doctor_home', {}, {location: "replace", reload: false});
							});

						}

						var failure = function()
						{
							alert("Error Occurred While Loggin in to DoctoQuick");
						}
						hello.loginstatus(success,failure);
						}

			}

		}
		else{
			$ionicLoading.hide();
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
