
DoctorQuickApp.controller('notesCtrl', function($scope,$state,$window,$rootScope,$localStorage,$ionicConfig,$ionicLoading,$stateParams,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,patientProfileDetailsService,doctorServices) {

  $scope.toggle = true;
	$rootScope.showBackBtn=false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;


  $rootScope.patientAdded=doctorServices.getNewPatient();
  console.log($rootScope.patientAdded);
  if($rootScope.patientAdded){
    $rootScope.shownewPatient=false;
  }
  else{
    $rootScope.shownewPatient=true;
  }
  // $rootScope.prescription={};
  $scope.deviceAndroid = ionic.Platform.isAndroid();
  if($scope.deviceAndroid === false){
    $localStorage.sendPrescTo='';
  }
console.log("inNotesCOntoller:",$state.$current.name);
if($state.$current.name === 'templates.prescription'){
    $rootScope.headerTxt="Notes";
    $rootScope.hideSideMenu = false;
    $scope.currentPatient={};
    // $window.location.reload();
    $rootScope.patientAdded=doctorServices.getNewPatient();
    console.log($rootScope.patientAdded);

    $rootScope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
    // console.log($rootScope.currentPatient.patientNum);
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
    // console.log(patientToDisplay);
    if(!patientToDisplay){
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

    $rootScope.addPatient=function(patient){
      $rootScope.defaultPatient=patient;
      console.log(patient);
      $state.go("templates.addNewPatient")
    }


}

else if($state.$current.name === 'templates.addNewPatient'){
  $scope.toggle = true;

  $rootScope.showBackBtn=true;
  $rootScope.showNotification=false;
  $rootScope.showBadge=false;
  $rootScope.headerTxt="Add Patient";
  $rootScope.hideSideMenu = false;

  $rootScope.newPatient={};
  $rootScope.saveNewPatient=function(){
  	// alert('add new patient');
    $rootScope.addedPatient=$rootScope.newPatient.fname+" "+$rootScope.newPatient.lname;
    var patientAdded={
      fname:$rootScope.newPatient.fname,
      lname:$rootScope.newPatient.lname,
      age:$rootScope.newPatient.age,
      sex:$rootScope.newPatient.sex
    }
    window.history.back();
    doctorServices.addNewPatient(patientAdded);

  }



}

else {
  $rootScope.headerTxt="Prescription";
  $rootScope.hideSideMenu = true;
  $localStorage.activePatient=$stateParams.reqPat;
  $rootScope.patientAdded=doctorServices.getNewPatient();
  console.log($rootScope.patientAdded);
  
  patientProfileDetailsService.fetchPatient($stateParams.reqPat).then(function(response){
    $scope.patient_details=response;
    console.log($scope.patient_details);
    $ionicLoading.hide();
  }).catch(function(error){
    console.log('failure data', error);
  })
}



})
