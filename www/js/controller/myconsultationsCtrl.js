DoctorQuickApp.controller('myconsultationsCtrl', function($state,$ionicHistory,$scope, $rootScope, $localStorage, $ionicLoading, $ionicConfig, $http,$interval, LoginService, patientCareService, doctorServices,myConsultationService) {

	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	$scope.names = {};
	$scope.listofnames = [];
	$scope.myPatients={};


	$scope.fromusername = [];

	$scope.listofphones = [];






// for doctors consultationDetails

myConsultationService.myConsultedPatients($localStorage.user).then(function(response){
	$scope.myPatients=response;//store the response array in doctor details
 	data = $scope.myPatients;
	for(var i=0; i<data.length; i++){

			$scope.patientFname=data[i].patientFname;
			$scope.patientLname=data[i].patientLname;
			$scope.patientPhone=data[i].patientPhone;
			$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
			$scope.listofnames.push($scope.fullname);
			$scope.listofphones.push(data[i].patientPhone);
			console.log($scope.patientPhone);
			//console.log($localStorage.user);

			doctorServices.fetchChatHistory($scope.patientPhone).then(function(response){
			$scope.lastChat=response;//store the response array in doctor details
			console.log('lastChat :',$scope.lastChat);
			})

	}

	$ionicLoading.hide();
}).catch(function(error){
console.log('failure data', error);
});


$scope.pagedecision=$ionicHistory.currentStateName();
myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
		$rootScope.ConsultedDoctor=response;//store the response array in doctor details
		console.log($rootScope.ConsultedDoctor);
		$ionicLoading.hide();
}).catch(function(error){
	console.log('failure data', error);
});
$scope.consultationDetails=function(consultedDoc)
{

			var username = "greet+"+$localStorage.user;
			var password = "DQ_patient";
		 	var persontocall = "greet+" + consultedDoc;


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


$scope.clicktochat = function(pateientPhone)
{
		//console.log(pateientPhone);
		$scope.patientToChat=pateientPhone;



		var username = "greet+"+$localStorage.user;
		var password = "DQ_doctor";


	 var persontocall = "greet+" + $scope.patientToChat;

			var success = function(message)
			{
				//alert(message);

				console.log(message);

			}

			var failure = function()
			{
				//alert("Error calling Hello Plugin");

					console.log('error');

			}


			//cordova.exec(null,null, "ExampleApplicationforchat", "chattoanotherperson", [username,password,persontocall]);

		hello.chat(username,password,persontocall,success, failure);

}

});
