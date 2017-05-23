
DoctorQuickApp.controller('notesCtrl', function($scope,$state,$window,$rootScope,$localStorage,$ionicConfig,$ionicLoading,$stateParams,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,patientProfileDetailsService) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  $rootScope.prescription={};

  $scope.currentPatient={};
  $state.reload();
  // $window.location.reload();
  $scope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
  // console.log($scope.currentPatient);

  $rootScope.patientFname=$scope.currentPatient.patientFname;
  $rootScope.patientLname=$scope.currentPatient.patientLname;
  $rootScope.patientAge=$scope.currentPatient.patientAge;
  $rootScope.patientSex=$scope.currentPatient.patientSex;
  $rootScope.patientImage=$scope.currentPatient.image;
  $rootScope.dateAndTime=$scope.currentPatient.requestedTime;
  $rootScope.reqId=$scope.currentPatient.id;
  $rootScope.patientNum=$scope.currentPatient.patientNum;

$localStorage.reqPat = $stateParams.reqPat;
// console.log($rootScope.reqId);

setTimeout(function (){
  patientProfileDetailsService.updatenotesflag($rootScope.reqId).then(function(response){
    console.log(response);
   console.log('success');
  }).catch(function(error){
   console.log('failure data', error);
  })
}, 5000);



  //this is used to set notesflag in the database top 2
// console.log($rootScope.patientNum);
  patientProfileDetailsService.fetchPatient($rootScope.patientNum).then(function(response){
    $scope.patient_details=response;
    $ionicLoading.hide();
    console.log($scope.patient_details);
  }).catch(function(error){
    console.log('failure data', error);
  })

  $ionicLoading.show();
		// console.log($scope.paphno);



})
