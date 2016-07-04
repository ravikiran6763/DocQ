DoctorQuickApp.controller('myconsultationsCtrl', function($state, $scope, $rootScope, $localStorage, $ionicConfig, $http, LoginService, patientCareService, doctorServices,myConsultationService) {

	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
		$scope.myDoctor=response;//store the response array in doctor details
		console.log($scope.myDoctor);

}).catch(function(error){
	console.log('failure data', error);
});

$scope.consultationDetails=function(consultedDoc){

	$scope.consultedDoc=consultedDoc;
	// console.log($scope.consultedDoc);
	$localStorage.consultedDoctor=$scope.consultedDoc;
	$state.go('app.patient_summary');
}
})
