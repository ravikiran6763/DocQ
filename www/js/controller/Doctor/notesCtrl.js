
DoctorQuickApp.controller('notesCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$ionicLoading,$stateParams,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,patientProfileDetailsService) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  $rootScope.prescription={};

$rootScope.reqPat = $stateParams.reqPat;
  patientProfileDetailsService.updatenotesflag($rootScope.reqId).then(function(response){
      //console.log($localStorage.reqPat);
      console.log('success');

    }).catch(function(error){
      console.log('failure data', error);
    })

console.log($rootScope.reqId);

  //this is used to set notesflag in the database top 2

console.log($localStorage.reqPat);
  patientProfileDetailsService.fetchPatient($rootScope.reqPat).then(function(response){
    console.log($localStorage.reqPat);
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

    console.log($scope.patientfname);
		// console.log($scope.paphno);



})
