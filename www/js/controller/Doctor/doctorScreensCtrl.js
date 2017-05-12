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

// $interval(checkNewMsgs,2000);
// function checkNewMsgs(){
//   if( $rootScope.homePage =='templates.doctor_home')
//   {
//     // console.log($rootScope.homePage);
//         $scope.unreadchatforpatient = 0;
//           var username = "greet+"+$localStorage.user;
//           var password = "DQ_doctor";
//             var success = function(message)
//             {
//                 $scope.unreadchatforpatient = message;
//             }
//             var failure = function()
//             {
//              //alert("Error calling Hello Plugin");
//              console.log('error');
//             }
//             hello.unreadchatfromusers(username,password,success, failure);
//             // hello.unreadchatfromusers(username,password,success, failure);
//   }
// }

//$interval(checkNewMsgs,2000);
$interval(checkConsultations,1000);

function checkConsultations(){
    doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
    $scope.pendingRequests = response;
    // console.log('pending:',$scope.pendingRequests);
    $scope.requests=$scope.pendingRequests.length;
    }).catch(function(error){
    console.log('failure data', error);
    })
      $interval.cancel($scope.Timer);
$interval(checkNewMsgs,2000);
function checkNewMsgs(){
  if( $rootScope.homePage =='templates.doctor_home')
  {
    // console.log($rootScope.homePage);
        $scope.unreadchatforpatient = 0;
          var username = "greet+"+$localStorage.user;
          var password = "DQ_doctor";
            var success = function(message)
            {
                $scope.unreadchatforpatient = message;
            }
            var failure = function()
            {
             //alert("Error calling Hello Plugin");
             console.log('error');
            }
            // hello.unreadchatfromusers(username,password,success, failure);
            // hello.unreadchatfromusers(username,password,success, failure);
  }
}


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
      // $state.go('templates.notesForPatient');
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
  console.log($rootScope.currentPatient.requestedTime);
  $state.go('templates.patientRequest',{'reqId':$rootScope.currentPatient.id,'reqPat':$rootScope.currentPatient.patientNum,'reqTime':$rootScope.currentPatient.requestedTime})
}

  // $scope.Timer = $interval(function () {
  //   doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
  //   $scope.pendingRequests = response;
  //   console.log('pending:',$scope.pendingRequests);
  //   $scope.requests=$scope.pendingRequests.length;
  //   }).catch(function(error){
  //   console.log('failure data', error);
  //   })
  // }, 1000);

}
})

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
