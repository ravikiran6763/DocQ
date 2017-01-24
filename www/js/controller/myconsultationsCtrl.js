DoctorQuickApp.controller('myconsultationsCtrl', function($state, $scope, $rootScope, $localStorage, $ionicLoading, $ionicConfig, $http, LoginService, patientCareService, doctorServices,myConsultationService) {

	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	$ionicLoading.show();

console.log('called');


var username = "greet+"+$localStorage.user;
var password = "DQ_patient";


console.log(username);


	var success = function(message)
	{
<<<<<<< HEAD
=======

>>>>>>> c494285a395c6c070565faa4ac6bf3e663136c31
		alert(message);
		console.log(message);

	}

	var failure = function()
	{
		alert("Error calling Hello Plugin");
	}

hello.chatcounts(username,password,success, failure);



	$ionicLoading.show();

console.log('called');
$ionicLoading.show();
	$ionicLoading.show();
	myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
		$scope.myDoctor=response;//store the response array in doctor details

		console.log($scope.myDoctor);

		$ionicLoading.hide();
}).catch(function(error){
	console.log('failure data', error);
});
$scope.consultationDetails=function(consultedDoc)
{
	console.log(consultedDoc);

	$rootScope.consultedDoc=consultedDoc;
	$localStorage.consultedDoctor=$scope.consultedDoc;
		$ionicLoading.hide();
	$state.go('app.patient_summary');


}
// for doctors consultationDetails

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


				// myConsultationService.docSummaryDetails($localStorage.consultedDoctor).then(function(response){
				// $scope.myDoctor=response;//store the response array in doctor details
				// $ionicLoading.hide();
				// $state.go('app.patient_summary');
				// }).catch(function(error){
				// console.log('failure data', error);
				// });

//CHAT FUNCTIONALITY INVOCATION


//CHAT FUNCTIONALITY INVOCATION
// console.log($localStorage.consultedDoctor);

		var username = "greet+"+$localStorage.user;
		var password = "DQ_doctor";


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
