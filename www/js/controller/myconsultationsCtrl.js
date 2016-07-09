DoctorQuickApp.controller('myconsultationsCtrl', function($state, $scope, $rootScope, $localStorage, $ionicLoading, $ionicConfig, $http, LoginService, patientCareService, doctorServices,myConsultationService) {

	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

console.log($localStorage.user);
	myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
		$scope.myDoctor=response;//store the response array in doctor details

}).catch(function(error){
	console.log('failure data', error);
});

$scope.consultationDetails=function(consultedDoc){
	$ionicLoading.show();
	console.log(consultedDoc);
	$scope.consultedDoc=consultedDoc;
	// console.log($scope.consultedDoc);
	$localStorage.consultedDoctor=$scope.consultedDoc;
		$ionicLoading.hide();
	$state.go('app.patient_summary');
}
// for doctors consultationDetails
$ionicLoading.show();
myConsultationService.myConsultedPatients($localStorage.user).then(function(response){

	$scope.myPatients=response;//store the response array in doctor details
console.log($scope.myPatients);
$ionicLoading.hide();
}).catch(function(error){
console.log('failure data', error);
});
})
