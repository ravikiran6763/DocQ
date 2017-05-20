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
$ionicLoading.show();
console.log('consultations');
myConsultationService.myConsultedPatients($localStorage.user).then(function(response){
	$scope.myPatients=response;//store the response array in doctor details
	console.log($scope.myPatients);
 	data = $scope.myPatients;
	for(var i=0; i<data.length; i++){
			$scope.patientFname=data[i].patientFname;
			$scope.patientLname=data[i].patientLname;
			$scope.patientPhone=data[i].patientPhone;
			$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
			$scope.listofnames.push($scope.fullname);
			$scope.listofphones.push(data[i].patientPhone);
			//console.log($localStorage.user);

	}
	$ionicLoading.hide();
}).catch(function(error){
console.log('failure data', error);
});


$scope.pagedecision=$ionicHistory.currentStateName();
var username = "greet+"+$localStorage.user;

if($scope.pagedecision === 'templates.consulted_patient')
		{
				var password = "DQ_doctor";
				console.log(password);
		}
		else {
			var password = "DQ_patient";
		}

$scope.deviceAndroid = ionic.Platform.isAndroid();


//  $interval(checkNewMessages,2000);
//
//  function checkNewMessages()
//  {
//
// 	var success = function(message)
// 	{
//
//
// 			if($scope.deviceAndroid)
// 			{
//
// 					$scope.chatlist1 = message;
//
// 					var forandroidchatlist = {};
//
// 					forandroidchatlist = $scope.chatlist1;
//
// 					var dataofandroid = JSON.parse(forandroidchatlist);
//
//
// 								for (var keyandroid in dataofandroid)
// 								{
// 										if (dataofandroid.hasOwnProperty(keyandroid))
// 										{
//
// 												console.log(keyandroid + " = " + dataofandroid[keyandroid]);
//
//
// 										if(keyandroid == "unread")
// 										{
//
// 												$scope.unreadcountforandroid = dataofandroid[keyandroid];
//
// 										}
//
// 							 			if(keyandroid == "message")
// 										{
//
// 											$scope.msgforandroid = dataofandroid[keyandroid];
//
// 										}
// 										else if(keyandroid == "name")
// 										{
// 												$scope.nameforandroid = dataofandroid[keyandroid];
//
// 												console.log($scope.nameforandroid);
//
// 										}
// 										else if(keyandroid == "dateformat")
// 										{
//
// 												$scope.datestringforandroid = dataofandroid[keyandroid];
//
// 										}
// 										else
// 										{
//
// 											console.log('no response from vsee');
//
// 										}
//
// 									}
// 								}
//
// 			}
// 			else
// 			{
// 				console.log('this is called');
//
// 					var forioschatlist = {};
//
// 						forioschatlist = $scope.chatlist;
//
//
// 				console.log(forioschatlist);
//
//
// 						var data = JSON.parse(forioschatlist);
// 						console.log(data);
//
// 						for (var key in data) {
//     if (data.hasOwnProperty(key)) {
//     console.log(key + " = " + data[key]);
//
//
// 					if(key == "unread")
// 					{
// 							$scope.unreadchatcountfromvsee = data[key];
// 					}
// 					else if(key == "message")
// 					{
// 						$scope.msg = data[key];
// 					}
// 					else if(key == "name")
// 					{
// 							$scope.name = data[key];
//
// 							$scope.name = $scope.name.substring(6);
//
// 							console.log($scope.name);
//
//
//
// 					}
// 					else if(key == "dateformat")
// 					{
// 							$scope.datestring = data[key];
// 					}
// 					else {
// 						console.log('no response from vsee');
// 						// noresponse of chat from vsee
// 					}
//     }
// }
// }
//
//
//
//
// }
//
// 		var failure = function()
// 		{
// 			alert("Error calling Hello Plugin");
// 		}
//
// hello.chatcounts(username,password,success, failure);
//
// }

myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
		$rootScope.ConsultedDoctor=response;//store the response array in doctor details
		console.log($rootScope.ConsultedDoctor);

		data = $scope.ConsultedDoctor;
		for(var i=0; i<data.length; i++){
				$rootScope.doctorFname=data[i].doctorFname;
				$rootScope.doctorLname=data[i].doctorLname;
				$rootScope.doctorMname=data[i].doctorMname;
				$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
				console.log($rootScope.fullname);
				// $scope.listofnames.push($scope.fullname);
				// $scope.listofphones.push(data[i].patientPhone);
				//console.log($localStorage.user);

		}



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
