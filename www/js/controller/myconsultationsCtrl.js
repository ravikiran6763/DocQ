DoctorQuickApp.controller('myconsultationsCtrl', function($scope, $rootScope, $localStorage, $ionicConfig, $http, patientCareService, doctorServices) {
	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	doctorServices.myConsultedPatients($localStorage.user).then(function(response){
		$scope.myPatients=response;//store the response array in doctor details
		console.log($scope.myPatients);

}).catch(function(error){
	console.log('failure data', error);
});
})
