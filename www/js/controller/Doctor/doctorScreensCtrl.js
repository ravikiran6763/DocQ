DoctorQuickApp.controller('doctorScreensCtrl', function($scope, $rootScope,$localStorage, $ionicConfig, $state, $ionicSideMenuDelegate,$ionicLoading, $interval, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails,doctorServices) {

  	$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;

    $scope.docAvailable=true;
    $scope.docNotAvailable=false;

      $ionicLoading.show();

    console.log($state.$current.name);
    $scope.emailNotification = 'Subscribed';
    console.log($scope.emailNotification);


    $scope.Online = function (message) {
          console.log(message);
          $scope.docAvailable=true;
          $scope.docNotAvailable=false;
          console.log($scope.docAvailable);
          console.log($scope.docNotAvailable);


        };
    $scope.Offline = function (message) {
          console.log(message);
          $scope.docAvailable=false;
          $scope.docNotAvailable=true;

        };

        $scope.clickToOnline = function (message) {
              console.log(message);
              $scope.docAvailable=true;
              $scope.docNotAvailable=false;
              console.log($scope.docAvailable);
              console.log($scope.docNotAvailable);


            };
        $scope.clickToOffline = function (message) {
              console.log(message);
              $scope.docAvailable=false;
              $scope.docNotAvailable=true;

            };
$ionicSideMenuDelegate.canDragContent(false)
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

  $rootScope.changeNotification = function (e)
  {

  }

	$rootScope.changeStatus = function (e)
	{
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
    console.log($scope.res);
    }).catch(function(error){
    console.log('failure data', error);
    })


    $interval(callAtInterval, 5000);
    //$interval(lookForPrescription, 1000);

   	function callAtInterval() {
      doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
      $scope.res = response;
      // console.log($scope.res);
      }).catch(function(error){
      console.log('failure data', error);
      })
   		// console.log('callAtInterval');
   	}

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
