DoctorQuickApp.controller('myconsultationsCtrl', function($state,$ionicHistory,$scope, $rootScope, $ionicPlatform,$localStorage, $ionicLoading, $ionicConfig, $http,$interval, LoginService, patientCareService, doctorServices,myConsultationService) {

	$rootScope.headerTxt="My Consultaions";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	$scope.names = {};
	$scope.listofnames = [];
	$scope.fromusername = [];
	$scope.listofphones = [];
// for doctors consultationDetails
$ionicLoading.show();
console.log('consultations');

$scope.deviceAndroid = ionic.Platform.isAndroid();
var username = "greet+"+$localStorage.user;


console.log('MY CONSULTATION CALLED');


if($localStorage.doctororpatient == 'doctor'){
	var password = "DQ_doctor";

}
else{
	var password = "DQ_patient";
	// console.log('checking for pat messages');
}




$interval(checkNewMessages,2000);
function checkNewMessages()
{
 console.log('refreshing consultation list for new messages');


		var success = function(message)
		{
		$ionicLoading.hide();
		if($scope.deviceAndroid)
		{

			if($localStorage.doctororpatient == 'patient')
			{

				//var password = "DQ_doctor";

				$scope.chatlist1 = message;

				console.log(message);
				var forandroidchatlist = {};
				forandroidchatlist = $scope.chatlist1;
				var dataofandroid = JSON.parse(forandroidchatlist);
				// dataofandroid.chatTo=$localStorage.user;
				doctorServices.createChatHistory(dataofandroid).then(function(response){
				$scope.chatHistory=response;//store the response array in doctor details
			 //console.log('dataSent :',response);
				}).catch(function(error){
				console.log('failure data', error);
				});



				myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
						$rootScope.ConsultedDoctor=response;//store the response array in doctor details
							console.log($rootScope.ConsultedDoctor);
						var data = response;
							// console.log(response);
						for(var i=0; i<data.length; i++){
								$rootScope.doctorFname=data[i].doctorFname;
								$rootScope.doctorLname=data[i].doctorLname;
								$rootScope.doctorMname=data[i].doctorMname;
								$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
								// console.log($rootScope.fullname);
								// $scope.listofnames.push($scope.fullname);
								// $scope.listofphones.push(data[i].patientPhone);
								//console.log($localStorage.user);
						}
						$ionicLoading.hide();
				}).catch(function(error){
					console.log('failure data', error);
				});



			}
			else
			{

				$scope.chatlist1 = message;

				console.log(message);
				var forandroidchatlist = {};
				forandroidchatlist = $scope.chatlist1;
				var dataofandroid = JSON.parse(forandroidchatlist);
				// dataofandroid.chatTo=$localStorage.user;
				doctorServices.createChatHistoryforDoctor(dataofandroid).then(function(response){
				$scope.chatHistory=response;//store the response array in doctor details
			//  console.log('dataSent :',response);
				}).catch(function(error){
				console.log('failure data', error);
				});

				myConsultationService.myConsultedPatients($localStorage.user).then(function(response){
									$scope.myPatients=response;//store the response array in doctor details
									console.log($scope.myPatients);
									var data = $scope.myPatients;
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


			}



		}
		else
		{

			console.log('this is ios chat histroy');


			if($localStorage.doctororpatient == 'patient')
			{


				console.log('this is patient');

				$scope.ios = message;

				console.log($scope.ios);

						$scope.ios = message;

						var forioschatlist = {};
						forioschatlist = $scope.ios;
						var res = forioschatlist.slice(1,-1);
						var dataForIos = JSON.parse(forioschatlist);



						doctorServices.createChatHistoryIos(dataForIos).then(function(response){
						$scope.chatHistoryios=response;//store the response array in doctor details
						console.log('dataSent :',$scope.chatHistoryios);
						}).catch(function(error){
						console.log('failure data', error);
						});




						myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
								$rootScope.ConsultedDoctor=response;//store the response array in doctor details
									// console.log($rootScope.ConsultedDoctor);
								var data = response;
									// console.log(response);
								for(var i=0; i<data.length; i++){
										$rootScope.doctorFname=data[i].doctorFname;
										$rootScope.doctorLname=data[i].doctorLname;
										$rootScope.doctorMname=data[i].doctorMname;
										$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
										// console.log($rootScope.fullname);
										// $scope.listofnames.push($scope.fullname);
										// $scope.listofphones.push(data[i].patientPhone);
										//console.log($localStorage.user);
								}
								$ionicLoading.hide();
						}).catch(function(error){
							console.log('failure data', error);
						});





			}
			else {


				$scope.ios = message;

				var forioschatlist = {};
				forioschatlist = $scope.ios;
				var res = forioschatlist.slice(1,-1);
				var dataForIos = JSON.parse(forioschatlist);

				console.log(dataForIos);



				doctorServices.createChatHistoryIosforDoctor(dataForIos).then(function(response){
				$scope.chatHistoryios=response;//store the response array in doctor details
				console.log('dataSent :',$scope.chatHistoryios);
				}).catch(function(error){
				console.log('failure data', error);
				});

				myConsultationService.myConsultedPatients($localStorage.user).then(function(response){
									$scope.myPatients=response;//store the response array in doctor details
									console.log($scope.myPatients);
									var data = $scope.myPatients;
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




			}


		}

}
   var failure = function()
   {
     alert("Error calling Hello Plugin");
   }

hello.chatcounts(username,password,success, failure);
//
// if($localStorage.doctororpatient == 'patient'){
// 	myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
// 			$rootScope.ConsultedDoctor=response;//store the response array in doctor details
// 				// console.log($rootScope.ConsultedDoctor);
// 			var data = response;
// 				console.log(response);
// 			for(var i=0; i<data.length; i++){
// 					$rootScope.doctorFname=data[i].doctorFname;
// 					$rootScope.doctorLname=data[i].doctorLname;
// 					$rootScope.doctorMname=data[i].doctorMname;
// 					$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
// 					// console.log($rootScope.fullname);
// 					// $scope.listofnames.push($scope.fullname);
// 					// $scope.listofphones.push(data[i].patientPhone);
// 					//console.log($localStorage.user);
// 			}
// 			$ionicLoading.hide();
// 	}).catch(function(error){
// 		console.log('failure data', error);
// 	});
// }

// if($localStorage.doctororpatient == 'doctor'){
// 				myConsultationService.myConsultedPatients($localStorage.user).then(function(response){
// 					$scope.myPatients=response;//store the response array in doctor details
// 					console.log($scope.myPatients);
// 					var data = $scope.myPatients;
// 					for(var i=0; i<data.length; i++){
// 					$scope.patientFname=data[i].patientFname;
// 					$scope.patientLname=data[i].patientLname;
// 					$scope.patientPhone=data[i].patientPhone;
// 					$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
// 					$scope.listofnames.push($scope.fullname);
// 					$scope.listofphones.push(data[i].patientPhone);
// 					//console.log($localStorage.user);
// 				}
// 				$ionicLoading.hide();
// 				}).catch(function(error){
// 				console.log('failure data', error);
// 				});
// }
}

$scope.pagedecision=$ionicHistory.currentStateName();
var username = "greet+"+$localStorage.user;

if($scope.pagedecision === 'templates.consulted_patient')
		{
				var password = "DQ_doctor";
				// console.log(password);
		}
		else {
			var password = "DQ_patient";
		}

$scope.deviceAndroid = ionic.Platform.isAndroid();

$scope.consultationDetails=function(consultedDoc)
{

			var username = "greet+"+$localStorage.user;
			var password = "DQ_patient";
		 	var persontocall = "greet+" + consultedDoc;


		var success = function(message)
		{
			console.log(message);
		}
		var failure = function()
		{
			console.log("Error calling Hello Plugin");
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

console.log($state.$current.name);
console.log($rootScope.previousState.name);
});
