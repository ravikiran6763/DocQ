DoctorQuickApp.controller('myconsultationsCtrl', function($state, $scope, $rootScope, $localStorage, $ionicLoading, $ionicConfig, $http, LoginService, patientCareService, doctorServices,myConsultationService) {




	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
<<<<<<< HEAD

=======
>>>>>>> 1dac1ddc3e443e908a1b67a01abd23e14a95da01
	$ionicLoading.show();



console.log('called');
<<<<<<< HEAD


$ionicLoading.show();
// console.log($localStorage.user);

$ionicLoading.show();
// console.log($localStorage.user);
=======
$ionicLoading.show();
// console.log($localStorage.user);

>>>>>>> 1dac1ddc3e443e908a1b67a01abd23e14a95da01

	myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
		$scope.myDoctor=response;//store the response array in doctor details
		$ionicLoading.hide();
}).catch(function(error){
	console.log('failure data', error);
});
$scope.consultationDetails=function(consultedDoc)
{

<<<<<<< HEAD


	console.log(consultedDoc);

	console.log(consultedDoc);
=======
	console.log(consultedDoc);

>>>>>>> 1dac1ddc3e443e908a1b67a01abd23e14a95da01
	$rootScope.consultedDoc=consultedDoc;
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

$scope.clicktochat = function(pateientPhone)
{
		console.log(pateientPhone);
		$scope.patientToChat=pateientPhone;
		console.log($localStorage.user);
		console.log('chat clicked');
		var username = "greet+"+$localStorage.user;
		console.log(username);

<<<<<<< HEAD
	console.log(username);

=======
				// myConsultationService.docSummaryDetails($localStorage.consultedDoctor).then(function(response){
				// $scope.myDoctor=response;//store the response array in doctor details
				// $ionicLoading.hide();
				// $state.go('app.patient_summary');
				// }).catch(function(error){
				// console.log('failure data', error);
				// });

//CHAT FUNCTIONALITY INVOCATION
>>>>>>> 1dac1ddc3e443e908a1b67a01abd23e14a95da01


// console.log($localStorage.consultedDoctor);
console.log($localStorage.user);


		var username = "greet+"+$localStorage.user;
		var password = "DQ_doctor";

			// var persontocall = "greet+" + $localStorage.consultedDoctor;

	 var persontocall = "greet+" + $scope.patientToChat;
	 console.log(persontocall);
			var success = function(message)
			{
				alert(message);
			}

			var failure = function()
			{
				alert("Error calling Hello Plugin");
			}

			hello.chat(username,password,persontocall,success, failure);




}




})
