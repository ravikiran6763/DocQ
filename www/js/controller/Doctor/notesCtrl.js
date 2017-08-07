
DoctorQuickApp.controller('notesCtrl', function($scope,$state,$window,$rootScope,$localStorage,$ionicConfig,$ionicLoading,$stateParams,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,patientProfileDetailsService) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=false;
	$rootScope.showNotification=false;
  $rootScope.hideSideMenu = false;
	$rootScope.showBadge=false;

  // $rootScope.prescription={};

  $scope.currentPatient={};
  // $window.location.reload();
  $rootScope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
  // console.log($rootScope.currentPatient.patientNum);
  $localStorage.patientToDisplay=$rootScope.currentPatient.patientNum;
  var patientToDisplay =$localStorage.patientToDisplay;
  console.log(patientToDisplay);
  if(!patientToDisplay){
    patientProfileDetailsService.fetchPatient($stateParams.reqPat).then(function(response){
      $scope.patient_details=response;
      console.log($scope.patient_details);
      $ionicLoading.hide();
      console.log($scope.patient_details);
    }).catch(function(error){
      console.log('failure data', error);
    })
  }
  patientProfileDetailsService.fetchPatient($rootScope.currentPatient.patientNum).then(function(response){
    $scope.patient_details=response;
    console.log($scope.patient_details);
    $ionicLoading.hide();
    console.log($scope.patient_details);
  }).catch(function(error){
    console.log('failure data', error);
  })
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

// setTimeout(function (){
//   patientProfileDetailsService.updatenotesflag($rootScope.reqId).then(function(response){
//     console.log(response);
//    console.log('success');
//   }).catch(function(error){
//    console.log('failure data', error);
//   })
// }, 5000);



  //this is used to set notesflag in the database top 2
// console.log($rootScope.patientNum);


  $ionicLoading.show();
		// console.log($scope.paphno);



})
