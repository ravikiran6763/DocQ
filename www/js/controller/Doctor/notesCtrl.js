
DoctorQuickApp.controller('notesCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$ionicLoading,$stateParams,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,patientProfileDetailsService) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  $rootScope.prescription={};

$localStorage.reqPat = $stateParams.reqPat;

console.log($localStorage.reqPat);
  //this is used to set notesflag in the database top 2

  patientProfileDetailsService.fetchPatient($localStorage.reqPat).then(function(response){
    $scope.patient_details=response;
    $ionicLoading.hide();
    console.log($scope.patient_details);
  }).catch(function(error){
    console.log('failure data', error);
  })

  $ionicLoading.show();
		$scope.patientfname = $stateParams.calPtFname;
		$scope.patientlname = $stateParams.calPtLname;
    $scope.patientImage = $stateParams.calPtImage;

    // $scope.prequestedtime = $rootScope.requesteddatetime;
    $scope.paphno = $stateParams.clPtPh;
		// console.log($scope.paphno);



})
