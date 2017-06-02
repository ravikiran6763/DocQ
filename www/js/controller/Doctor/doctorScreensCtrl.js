DoctorQuickApp.controller('doctorScreensCtrl', function($scope,$ionicHistory,$timeout,$window,$location,$rootScope,$localStorage,$interval,$ionicConfig, $state, $ionicSideMenuDelegate,$ionicLoading, $interval, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails,doctorServices,HardwareBackButtonManager) {

  	$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;

    $scope.docAvailable=true;
    $scope.docNotAvailable=false;

    $rootScope.homePage=$ionicHistory.currentStateName();
    HardwareBackButtonManager.disable();
    // $route.reload();
$interval(checkConsultations,2000,false);

function checkConsultations(){
    doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
    $scope.pendingRequests = response;
    console.log('pending:',$scope.pendingRequests);
    $scope.requests=$scope.pendingRequests.length;
  });
    // .catch(function(error){
    // console.log('failure data', error);
    // })
// $interval(checkNewMsgs,2000);
    doctoronoffdetails.fetchOne2OneReq($localStorage.user).then(function(response){
    $scope.one2oneRequests = response;
    console.log('one2onePending:',$scope.one2oneRequests);
    $scope.one2oneRequests=$scope.one2oneRequests.length;
    })

}
<<<<<<< HEAD

//
// $scope.deviceAndroid = ionic.Platform.isAndroid();
//
//
// $interval(checkNewMessagesForPatient,2000);
// var username = "greet+"+$localStorage.user;
// var password = "DQ_doctor";
//
//
// function checkNewMessagesForPatient()
// {
//
//  var success = function(message)
//  {
//
//    console.log(message);
//      if($scope.deviceAndroid)
//      {
//
//          $scope.chatlist1 = message;
//
//          var forandroidchatlist = {};
//          forandroidchatlist = $scope.chatlist1;
//
//          var dataofandroid = JSON.parse(forandroidchatlist);
//          dataofandroid.chatTo=$localStorage.user;
//          console.log('UpdateChat',dataofandroid);
//          doctorServices.createChatHistory(dataofandroid).then(function(response){
//          $scope.chatHistory=response;//store the response array in doctor details
//          // console.log('dataSent :',$scope.chatHistory);
//          }).catch(function(error){
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
//                        console.log($scope.nameforandroid);
//
//                    }
//                    else if(keyandroid == "dateformat")
//                    {
//                        $scope.datestringforandroid = dataofandroid[keyandroid];
//                    }
//                    else
//                    {
//                      console.log('no response from vsee');
//                    }
//                  }
//                }
//
//      }
//      else
//      {
//        console.log('this is called');
//          var forioschatlist = {};
//            forioschatlist = $scope.chatlist;
//            console.log('iosChatHIstory:',forioschatlist);
//
//            var dataForIos = JSON.parse(forioschatlist);
//            console.log('ChatData:',data);
//
//            dataForIos.chatTo=$localStorage.user;
//            console.log('UpdateChat',dataForIos);
//            doctorServices.createChatHistory(dataForIos).then(function(response){
//            $scope.chatHistory=response;//store the response array in doctor details
//            // console.log('dataSent :',$scope.chatHistory);
//            }).catch(function(error){
//             console.log('failure data', error);
//             });
//
//           for (var key in data) {
//             if (data.hasOwnProperty(key)) {
//               console.log(key + " = " + data[key]);
//
//
//               if(key == "unread")
//               {
//                 $scope.unreadchatcountfromvsee = data[key];
//               }
//               else if(key == "message")
//               {
//                 $scope.msg = data[key];
//               }
//               else if(key == "name")
//               {
//                 $scope.name = data[key];
//
//                 $scope.name = $scope.name.substring(6);
//
//                 console.log('ChatNAme:',$scope.name);
//
//
//
//               }
//               else if(key == "dateformat")
//               {
//                 $scope.datestring = data[key];
//               }
//               else {
//                 console.log('no response from vsee');
//                 // noresponse of chat from vsee
//               }
//             }
//           }
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
//

=======
>>>>>>> 33c1de17d009bd73f001a1b3e5b74ef3ec18d759

      // hello.chatcounts(username,password,success, failure);

    $ionicSideMenuDelegate.canDragContent(false); //preventes sidemenu sliding
    // console.log($ionicHistory.currentStateName());
    $scope.emailNotification = 'Subscribed';
    // console.log($scope.emailNotification);
    $scope.Online = function (message) {
          console.log(message);
          $scope.docAvailable=true;
          $scope.docNotAvailable=false;
          $localStorage.onOff=1
          var whichdoctoronoff = {
            doctorphno : $localStorage.user,
            onoff : $localStorage.onOff
          }
          doctoronoffdetails.doctoronoff(whichdoctoronoff);

            var uname1 = "greet+"+$localStorage.user;
            var pw1 = "DQ_doctor";

              console.log(uname1);
              console.log(pw1);
              var success = function(message)
              {
                console.log(message);

              }
              var failure = function()
              {
                console.log("An Error occured kindly check your Interner Connection");
              }
              hello.login(uname1,pw1,success, failure);
              $ionicLoading.hide();


        };
        $scope.Offline = function (message) {
          console.log(message);
          // $window.location.reload();

          $scope.docAvailable=false;
          $scope.docNotAvailable=true;
          // if (angular.isDefined($scope.Timer)) {
          //     $interval.cancel($scope.Timer);
          // }
          $localStorage.onOff=2
          var whichdoctoronoff = {
              doctorphno : $localStorage.user,
              onoff : $localStorage.onOff
        }
        doctoronoffdetails.doctoronoff(whichdoctoronoff);

        var unametologout = "greet+"+$localStorage.user;
        var pwtologout = "DQ_doctor";

          // alert(unametologout);
          var success = function(message)
          {
            console.log(message);
          }
          var failure = function()
          {
            console.log("An Error occured kindly check your Interner Connection");
          }
        hello.logout(unametologout,pwtologout,success, failure);

        };

///////////////////////////////////////////////
    $rootScope.changeNotification = function (e)
    {
      if(e)
      {
          $scope.notificationValue = true;
        }
        else{
          $scope.notificationValue = false;
        }
        console.log('check box changed', $scope.notificationValue);
    }

    if($localStorage.onOff == 1){
    $scope.checkedValue=true;
    }

	$rootScope.changeStatus = function (e)
	{
    console.log(e);
		$scope.checkedValue = true;
				if(e)
				{
						$scope.checkedValue = true;
            $localStorage.onOff=1
						var whichdoctoronoff = {
							doctorphno : $localStorage.user,
							onoff : $localStorage.onOff
						}
						doctoronoffdetails.doctoronoff(whichdoctoronoff);

							var uname1 = "greet+"+$localStorage.user;
							var pw1 = "DQ_doctor";
								console.log(uname1);
								console.log(pw1);

								var success = function(message)
								{
									console.log(message);
								}

								var failure = function()
								{
									console.log("Error calling Hello Plugin");
								}

								hello.login(uname1,pw1,success, failure);

				}
				else
				{
						$scope.checkedValue = false;
            $localStorage.onOff=2
						var whichdoctoronoff = {
								doctorphno : $localStorage.user,
								onoff : $localStorage.onOff
					}
					doctoronoffdetails.doctoronoff(whichdoctoronoff);
					var unametologout = "greet+"+$localStorage.user;
					var pwtologout = "DQ_doctor";

					alert(unametologout);
					var success = function(message)
					{
						alert(message);
					}
					var failure = function()
					{
						alert("Error calling Hello Plugin");
					}
					hello.logout(unametologout,pwtologout,success, failure);

				}


	}


    // $interval(pendingConsultations, 1000);
    //$interval(lookForPrescription, 1000);
 $scope.pending=$localStorage.requests;
 // console.log($scope.pending);


  $scope.hello = 5;
  $localStorage.totalReq = 0;
//////////////////////////////
// console.log($location.path());
//////////////////////////////
// $scope.$watch('pending', function() { console.log('watch!'); });


    $scope.$watch('requests', function (newValue, oldValue, scope) {
        // console.log('changed');
        // console.log(newValue);
        // console.log(oldValue);
        if(newValue > oldValue){
          // alert('ting');
          // ion.sound.play('bell_ring');
        }

    },true);
    function lookForPrescription() {
      // $state.go('templates.prescription');
      doctorServices.lookForPrescription($localStorage.user).then(function(response){
      $scope.res = response;
      // console.log($scope.res);
      }).catch(function(error){
      console.log('failure data', error);
      })
   		console.log('lookForPrescription');
   	}

$scope.viewRequest=function(patient){
  $rootScope.currentPatient = patient;
  window.localStorage['currentPatient'] = angular.toJson($rootScope.currentPatient);

  console.log($rootScope.currentPatient);
  console.log($rootScope.currentPatient.requestedTime);
  $state.go('templates.patientRequest',{'reqId':$rootScope.currentPatient.id,'reqPat':$rootScope.currentPatient.patientNum,'reqTime':$rootScope.currentPatient.requestedTime})
}

})

  // $scope.Timer = $interval(function () {
  //   doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
  //   $scope.pendingRequests = response;
  //   console.log('pending:',$scope.pendingRequests);
  //   $scope.requests=$scope.pendingRequests.length;
  //   }).catch(function(error){
  //   console.log('failure data', error);
  //   })
  // }, 1000);


// $scope.pushNotificationChange = function() {
//     console.log('docStatus Change', $scope.docStatus.checked);
//     if($scope.docStatus.checked == 'online'){
//       $scope.docAvailable=true;
//       $scope.docNotAvailable=true;
//     }
//     if($scope.docStatus.checked == 'offline'){
//       $scope.docAvailable=false;
//       $scope.docNotAvailable=true;
//     }
//   };
