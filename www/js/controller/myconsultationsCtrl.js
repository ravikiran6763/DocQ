DoctorQuickApp.controller('myconsultationsCtrl', function($state, $scope, $rootScope, $localStorage, $ionicLoading, $ionicConfig, $http, LoginService, patientCareService, doctorServices,myConsultationService) {




	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$ionicLoading.show();



console.log('called');
$ionicLoading.show();
// console.log($localStorage.user);

	myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
		$scope.myDoctor=response;//store the response array in doctor details
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
		console.log($localStorage.user);



console.log('chat clicked');


		var username = "greet+"+$localStorage.user;

	console.log(username);



	myConsultationService.docSummaryDetails(consultedDoc).then(function(response){

		$scope.myDoctor=response;//store the response array in doctor details

		$ionicLoading.hide();

$state.go('app.patient_summary');

}).catch(function(error){

	console.log('failure data', error);

});




	// $scope.consultedDoc=consultedDoc;
	// // console.log($scope.consultedDoc);
	// $localStorage.consultedDoctor=$scope.consultedDoc;
	// 	//$ionicLoading.hide();
	//
	// 		//$state.go('app.patient_summary');
	//

}

// // for doctors consultationDetails
// $ionicLoading.show();
// myConsultationService.myConsultedPatients($localStorage.user).then(function(response){
//
// 	$scope.myPatients=response;//store the response array in doctor details
//
// 	console.log($scope.myPatients);
// 	$ionicLoading.hide();
//
// }).catch(function(error){
// console.log('failure data', error);
// });

//
// $scope.clicktochat = function(pateientPhone)
// {
//
// 		console.log(pateientPhone);
// 		console.log($localStorage.user);
//
//
//
// console.log('chat clicked');
//
//
// 		var username = "greet+"+$localStorage.user;
//
// 	console.log(username);
//
//
// 			//var username = "greet+9686684485";
// 			var password = "DQ_doctor";
//
//
// 			var persontocall = "greet+" + pateientPhone;
//
// 			console.log(persontocall);
//
// 				var success = function(message)
// 				{
// 					alert(message);
// 				}
//
// 				var failure = function()
// 				{
//
// 					alert("Error calling Hello Plugin");
//
// 				}
//
// 				hello.chat(username,password,persontocall,success, failure);
//
//
// 				//hello.chat(persontocall,success, failure);
//
//
//
//
// }


})
