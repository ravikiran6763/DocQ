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



var msg;

var msgdate;

var indivisualusercounts;

var lists =[];

var dateformation =[];


var datestring;

$scope.deviceAndroid = ionic.Platform.isAndroid();


	var success = function(message)
	{



			$scope.chatlist = message;


			if($scope.deviceAndroid)
			{

				$scope.name = $scope.chatlist.split('{');

				msg = $scope.name[2];

				msg = msg.substring(0,msg.length-1);

				$scope.msg = msg;

				msgdate = $scope.name[3];

				msgdate = msgdate.substring(0,msgdate.length-3)

				msgdate = msgdate.split('=');

					lists = msgdate;


					console.log(lists[1]);

				dateformation = lists[1].split(' ');

			datestring = dateformation[1].concat(dateformation[2]);

			datestring = datestring.concat(dateformation[5]);


				$scope.datestring = datestring;


				console.log(datestring);


		}
		else
		{

				//console.log($scope.chatlist);
				//
				// var data = JSON.parse(message);
				//
				// console.log(data);

				// var result = {};
				//
				//
				// for(i=0;i<data.names.length;i++)
				// {
				//
				// 		result[data.names[i].name] = data.names[i];
				//
				//
				//
				// }
				//
				// console.log(result);


		}



		}

			// lists = lists.split(' ');
			//
			//
			// dateformation = lists[1]." ".lists[2]." ".lists[5];


			//console.log(lists);

			//console.log(dateformation);


			//console.log(msg);



			//console.log($scope.name[2]);
		//console.log($scope.name[3]);


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
