DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope,$interval, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, HardwareBackButtonManager,doctoronoffdetails,doctorServices) {

			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;

			HardwareBackButtonManager.disable();

			$scope.currentState=$ionicHistory.currentStateName();

			console.log($scope.currentState);
			$scope.medicalSpeciality = function(){
				$state.go('app.medical_speciality');
				$ionicLoading.hide();
			}

			// $window.location.reload();

			$scope.searchDoctors=function()
			{
					console.log('searc clkd');
					$state.go('app.searchDoctors');
			}


			$timeout( function(){
					console.log('interval started');
		            $interval(checkNewMessages,2000);
		         }, 60000 );



				var username = "greet+"+$localStorage.user;
				var password = "DQ_patient";
				$rootScope.unreadchatforpatient = 0;


				function checkNewMessages()
				{


					var success = function(message)
					{

							$rootScope.unreadchatforpatient = message;
							console.log($scope.unreadchatforpatient);

					}

						var failure = function()
						{
								alert('this is from patient home CTRL');
						}

							hello.unreadchatfromusers(username,password,success, failure);


				}



			// $scope.deviceAndroid = ionic.Platform.isAndroid();
			// $interval(checkNewMessages,2000);
			// var username = "greet+"+$localStorage.user;
			// var password = "DQ_patient";
			// console.log(username);

			// function checkNewMessages()
			// {
			// 	console.log('checking for messages');
			//  var success = function(message)
			//  {
			// 	 console.log('checkingForNEwMsgs');
			//    console.log(message);
			//      if($scope.deviceAndroid)
			//      {
			//
			//          $scope.chatlist1 = message;
			//          var forandroidchatlist = {};
			//          forandroidchatlist = $scope.chatlist1;
			//
			//          var dataofandroid = JSON.parse(forandroidchatlist);
			//          dataofandroid.chatTo=$localStorage.user;
			//          console.log('UpdateChat',dataofandroid);
			//          doctorServices.createChatHistory(dataofandroid).then(function(response){
			//          $scope.chatHistory=response;//store the response array in doctor details
			//          // console.log('dataSent :',$scope.chatHistory);
			//          }) .catch(function(error){
			//           console.log('failure data', error);
			//           });
			//
			//                for (var keyandroid in dataofandroid)
			//                {
			//                    if (dataofandroid.hasOwnProperty(keyandroid))
			//                    {
			//                        console.log(keyandroid + " = " + dataofandroid[keyandroid]);
			//
			//                    if(keyandroid == "unread")
			//                    {
			//                        $scope.unreadcountforandroid = dataofandroid[keyandroid];
			//                    }
			//
			//                    if(keyandroid == "message")
			//                    {
			//
			//                      $scope.msgforandroid = dataofandroid[keyandroid];
			//
			//                    }
			//                    else if(keyandroid == "name")
			//                    {
			//                        $scope.nameforandroid = dataofandroid[keyandroid];
			//
			//                        console.log($scope.nameforandroid);
			//
			//                    }
			//                    else if(keyandroid == "dateformat")
			//                    {
			//
			//                        $scope.datestringforandroid = dataofandroid[keyandroid];
			//
			//                    }
			//                    else
			//                    {
			//
			//                      console.log('no response from vsee');
			//
			//                    }
			//
			//                  }
			//                }
			//
			//      }
			//      else
			//      {
			//        console.log('this is called');
			//
			//          var forioschatlist = {};
			//
			//            forioschatlist = $scope.chatlist;
			//
			//
			//        console.log(forioschatlist);
			//
			//
			//            var data = JSON.parse(forioschatlist);
			//            console.log(data);
			//
			//            for (var key in data) {
			//    if (data.hasOwnProperty(key)) {
			//    console.log(key + " = " + data[key]);
			//
			//
			//          if(key == "unread")
			//          {
			//              $scope.unreadchatcountfromvsee = data[key];
			//          }
			//          else if(key == "message")
			//          {
			//            $scope.msg = data[key];
			//          }
			//          else if(key == "name")
			//          {
			//              $scope.name = data[key];
			//
			//              $scope.name = $scope.name.substring(6);
			//
			//              console.log($scope.name);
			//
			//
			//
			//          }
			//          else if(key == "dateformat")
			//          {
			//              $scope.datestring = data[key];
			//          }
			//          else {
			//            console.log('no response from vsee');
			//            // noresponse of chat from vsee
			//          }
			//    }
			// }
			// }
			//
			//
			//
			//
			// }
			//
			//    var failure = function()
			//    {
			//      alert("Error calling Hello Plugin");
			//    }
			//
			// hello.chatcounts(username,password,success, failure);
			//
			// }

});
