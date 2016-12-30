
DoctorQuickApp.controller('notesCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,$cordovaFile) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  $rootScope.prescription={};

	// $rootScope.notes = {
	// 		chekMedi : false,
	// 		chekDiag : false,
	// 		chekTests : false
	// 	};
    console.log($rootScope.pphno);
		$scope.patientfname = $rootScope.pfname;
		$scope.patientlname = $rootScope.plname;
    $scope.prequestedtime = $rootScope.requesteddatetime;
    $scope.paphno = $rootScope.pphno;

    console.log($scope.patientfname);
		// console.log($scope.paphno);



})
