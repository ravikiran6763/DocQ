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



			$scope.fullname = $scope.patientFname+" "+$scope.patientLname;

			$scope.listofnames.push($scope.fullname);

			$scope.listofphones.push(data[i].patientPhone);



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


 $interval(checkNewMessages,2000);

 function checkNewMessages()
 {

	var success = function(message)
	{


			if($scope.deviceAndroid)
			{

				$scope.chatlist1 = message;



		var forandroidchatlist = {};

		forandroidchatlist = $scope.chatlist1;


								var dataofandroid = JSON.parse(forandroidchatlist);


								for (var keyandroid in dataofandroid) {
				if (dataofandroid.hasOwnProperty(keyandroid)) {
				console.log(keyandroid + " = " + dataofandroid[keyandroid]);


						if(keyandroid == "unread")
						{
								$scope.unreadchatcountfromvseeforandroid = dataofandroid[keyandroid];
						}
						else if(keyandroid == "message")
						{
							$scope.msgforandroid = dataofandroid[keyandroid];
						}
						else if(keyandroid == "name")
						{
								$scope.nameforandroid = dataofandroid[keyandroid];

								console.log($scope.nameforandroid);

						}
						else if(keyandroid == "dateformat")
						{
								$scope.datestringforandroid = dataofandroid[keyandroid];
						}
						else {
							console.log('no response from vsee');
							// noresponse of chat from vsee
						}


}
}

				//$scope.name = $scope.chatlist.split('{');




					// 	for(var i=0; i<lengthofnames.length; i++){
					//
					// 		if(lengthofnames[i] == $scope.fromusername)
					// 		{
					//
					// 			msg = $scope.name[2];
					// 			msg = msg.substring(0,msg.length-1);
					// 			$scope.msg = msg;
					// 			msgdate = $scope.name[3];
					// 			msgdate = msgdate.substring(0,msgdate.length-3)
					// 			msgdate = msgdate.split('=');
					// 			lists = msgdate;
					//
					//
					//
					// 			dateformation = lists[1].split(' ');
					// 			datestring = dateformation[1].concat(dateformation[2]);
					// 			datestring = datestring.concat(dateformation[5]);
					// 			$scope.datestring = datestring;
					//
					//
					// 		}
					//
					// 		else {
					//
					//
					// 				// $scope.otheruser = lengthofnames[i];
					//
					//
					// 			// 	console.log(lengthofnames[i]);
					// 			//
					// 		 $scope.datestring1 = "";
					//
					//
					// 		}
					//
					//
					//
					// }





			}
			else
			{

					$scope.datestring1 = "";


				console.log('my consultation controller called');


						console.log(message);

								$scope.chatlist = message;


					var forioschatlist = {};

						forioschatlist = $scope.chatlist;


				console.log(forioschatlist);


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

							$scope.name = $scope.name.substring(6);

							console.log($scope.name);



					}
					else if(key == "dateformat")
					{
							$scope.datestring = data[key];
					}
					else {
						console.log('no response from vsee');
						// noresponse of chat from vsee
					}
    }
}
}




}

		var failure = function()
		{
			alert("Error calling Hello Plugin");
		}

hello.chatcounts(username,password,success, failure);

}

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
 console.log(persontocall);


 console.log(consultedDoc);

		var success = function(message)
		{
			alert(message);
		}
		var failure = function()
		{
			alert("Error calling Hello Plugin");
		}

 hello.chat(username,password,persontocall,success, failure);

	// console.log(consultedDoc);
	//
	// $rootScope.consultedDoc=consultedDoc;
	// $localStorage.consultedDoctor=$scope.consultedDoc;
	// 	$ionicLoading.hide();
	// $state.go('app.patient_summary');

}


$scope.clicktochat = function(pateientPhone)
{
		//console.log(pateientPhone);
		$scope.patientToChat=pateientPhone;

//console.log('clicked');


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
	 //console.log(persontocall);

	 //console.log($scope.patientToChat);


		//cordova.exec(null, null, "ExampleApplicationforchat", "chattoanotherperson", [username,password,persontocall]);

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
