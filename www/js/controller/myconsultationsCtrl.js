DoctorQuickApp.controller('myconsultationsCtrl', function($state, $scope, $rootScope, $localStorage, $ionicLoading, $ionicConfig, $http, LoginService, patientCareService, doctorServices,myConsultationService) {

	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;


var username = "greet+"+$localStorage.user;
var password = "DQ_doctor";


console.log(password);

var msg;
var msgdate;
var indivisualusercounts;
var lists =[];

var dateformation =[];




var datestring;

$scope.deviceAndroid = ionic.Platform.isAndroid();


	var success = function(message)
	{
<<<<<<< HEAD

=======
>>>>>>> f6afb9a9a23ba98c4a60cfbf642a44a8b6a86a9a
			$scope.chatlist = message;

			if($scope.deviceAndroid)
			{

					console.log('this is android device');


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

				console.log('this is called');

					var forioschatlist = {};

<<<<<<< HEAD
						forioschatlist = $scope.chatlist;
=======
				alert($scope.chatlist);

>>>>>>> f6afb9a9a23ba98c4a60cfbf642a44a8b6a86a9a

						var data = JSON.parse(forioschatlist);

						console.log(data);


						for (var key in data) {
    if (data.hasOwnProperty(key)) {
        console.log(key + " = " + data[key]);


					if(key == "unread")
					{

							$scope.unreadchatcountfromvsee = data[key];



					}
					else if(key == "message")
					{

						$scope.msg = data[key];


					}
					else if(key == "name")
					{

							$scope.name = data[key];


					}
					else if(key == "dateformat")
					{

							$scope.datestring = data[key];


					}
					else {

<<<<<<< HEAD
						console.log('no response from vsee');
						// noresponse of chat from vsee
					}


    }
}

<<<<<<< HEAD
		// console.log(message);
=======
=======
		console.log(message);
>>>>>>> 5b57af9e3651f36bab19ca7171e3c954c708e7e5
	var failure = function()
	{
		alert("Error calling Hello Plugin");
	}
>>>>>>> f6afb9a9a23ba98c4a60cfbf642a44a8b6a86a9a

<<<<<<< HEAD
// hello.chatcounts(username,password,success, failure);
=======
			}
		}


		var failure = function()
		{
			alert("Error calling Hello Plugin");
		}
>>>>>>> 5b57af9e3651f36bab19ca7171e3c954c708e7e5

		hello.chatcounts(username,password,success, failure);



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
