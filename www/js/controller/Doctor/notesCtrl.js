
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
  console.log($rootScope.currentPatient.patientNum);
  $localStorage.patientToDisplay=$rootScope.currentPatient.patientNum;
  $rootScope.patientFname=$scope.currentPatient.patientFname;
  $rootScope.patientLname=$scope.currentPatient.patientLname;
  $rootScope.patientAge=$scope.currentPatient.patientAge;
  $rootScope.patientSex=$scope.currentPatient.patientSex;
  $rootScope.patientImage=$scope.currentPatient.image;
  $rootScope.dateAndTime=$scope.currentPatient.requestedTime;
  $rootScope.reqId=$scope.currentPatient.id;
  $rootScope.patientNum=$scope.currentPatient.patientNum;

  $localStorage.reqPat = $stateParams.reqPat;

  var patientToDisplay =$localStorage.patientToDisplay;
  console.log(patientToDisplay);
  if(!patientToDisplay){
    // alert('from state params',$stateParams.reqPat);
    // $stateParams.reqPat='8792618138';

    patientProfileDetailsService.fetchPatient($stateParams.reqPat).then(function(response){
      $scope.patient_details=response;
      console.log($scope.patient_details);
      $ionicLoading.hide();
    }).catch(function(error){
      console.log('failure data', error);
    })
  }
  else{
    // alert('from localStorage',$rootScope.currentPatient.patientNum);
    patientProfileDetailsService.fetchPatient($rootScope.currentPatient.patientNum).then(function(response){
      $scope.patient_details=response;
      console.log($scope.patient_details);
      $ionicLoading.hide();
    }).catch(function(error){
      console.log('failure data', error);
    })
  }

  $ionicLoading.show();



})
