DoctorQuickApp.controller('myconsultationsCtrl', function($state, $scope, $rootScope, $localStorage, $ionicLoading, $ionicConfig, $http, LoginService, patientCareService, doctorServices,myConsultationService) {




	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
<<<<<<< HEAD

=======
>>>>>>> 18e31f322fb88cf0c1096c713c93da7eda7d4c51
	$ionicLoading.show();



console.log('called');
<<<<<<< HEAD


$ionicLoading.show();
// console.log($localStorage.user);

=======
$ionicLoading.show();
// console.log($localStorage.user);
>>>>>>> 18e31f322fb88cf0c1096c713c93da7eda7d4c51

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

=======

	console.log(consultedDoc);
>>>>>>> 18e31f322fb88cf0c1096c713c93da7eda7d4c51
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
<<<<<<< HEAD

=======
>>>>>>> 18e31f322fb88cf0c1096c713c93da7eda7d4c51



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
