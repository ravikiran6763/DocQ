DoctorQuickApp.controller('doctorScreensCtrl', function($scope,$ionicHistory,$timeout,$rootScope,$localStorage,$interval,$ionicConfig, $state, $ionicSideMenuDelegate,$ionicLoading, $interval, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails,doctorServices) {

  	$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;

    $scope.docAvailable=true;
    $scope.docNotAvailable=false;

    $rootScope.homePage=$ionicHistory.currentStateName();

$interval(checkNewMsgs,2000);
function checkNewMsgs(){
  if( $rootScope.homePage =='templates.doctor_home')
  {
    // console.log($rootScope.homePage);

        $scope.unreadchatforpatient = {};
          var username = "greet+"+$localStorage.user;
          var password = "DQ_doctor";

            var success = function(message)
            {
                $scope.unreadchatforpatient = message;
            }

            var failure = function()
            {
             alert("Error calling Hello Plugin");
             //console.log('error');

            }

 // hello.unreadchatfromusers(username,password,success, failure);
  }
}

    $ionicSideMenuDelegate.canDragContent(false); //preventes sidemenu sliding
    console.log($ionicHistory.currentStateName());
      $ionicLoading.show();

    $scope.emailNotification = 'Subscribed';
    console.log($scope.emailNotification);

    $scope.Online = function (message) {
            // $ionicLoading.show({
            // content: 'Loading',
            // animation: 'fade-in',
            // showBackdrop: true,
            // maxWidth: 200,
            // showDelay: 20
            // });

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
          $scope.docAvailable=false;
          $scope.docNotAvailable=true;

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
									alert(message);
								}

								var failure = function()
								{
									alert("Error calling Hello Plugin");
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

		$scope.docStatus = [
	    {name: 'one', hidden: true},

	  	];

			console.log('check box changed', $scope.checkedValue);
		// $rootScope.showDocStatus=true;

	}

  $scope.res = {};
    doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
    $scope.res = response;
    $ionicLoading.hide();
    // console.log($scope.res);
    }).catch(function(error){
    console.log('failure data', error);
    })


    $interval(callAtInterval, 1000);
    //$interval(lookForPrescription, 1000);
 $scope.pending=$localStorage.requests;
 console.log($scope.pending);


$scope.hello = 5;


  $localStorage.totalReq = 0;
$scope.$watch('pending', function() { console.log('watch!'); });
   	function callAtInterval() {
      doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
      $scope.res = response;
      $scope.requests=$scope.res.length;
      // console.log($localStorage.totalReq);
      // console.log($scope.requests);


      }).catch(function(error){
      console.log('failure data', error);
      })
   		// console.log('callAtInterval');
   	}

    $scope.$watch('requests', function (newValue, oldValue, scope) {
        console.log('changed');
        console.log(newValue);
        console.log(oldValue);
        if(newValue > oldValue){
          // alert('ting');
          ion.sound.play('bell_ring');
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
