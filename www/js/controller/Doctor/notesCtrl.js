
DoctorQuickApp.controller('notesCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$stateParams,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,$cordovaFile) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  $rootScope.prescription={};

		$scope.patientfname = $stateParams.calPtFname;
		$scope.patientlname = $stateParams.calPtLname;
    $scope.patientImage = $stateParams.calPtImage;

    // $scope.prequestedtime = $rootScope.requesteddatetime;
    $scope.paphno = $stateParams.clPtPh;

    console.log($scope.patientfname);
		// console.log($scope.paphno);



})
