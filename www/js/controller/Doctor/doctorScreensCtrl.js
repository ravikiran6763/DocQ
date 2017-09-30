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
    $ionicConfig.views.swipeBackEnabled(false);//disables swipe back in iphone
    // alert($rootScope.previousState.name);
    // alert($rootScope.homePage);




  if($rootScope.previousState.name === '' && $rootScope.homePage === 'templates.doctor_home'){
    $scope.docAvailable=false;
    $scope.docNotAvailable=true;
    $localStorage.onOff=2;

  }
    console.log($ionicHistory.viewHistory());
    $interval(checkConsultations,2000,false);

function checkConsultations(){
    doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
    $scope.pendingRequests = response;
    // console.log('pending:',$scope.pendingRequests);
    $scope.requests=$scope.pendingRequests.length;
  });
    // .catch(function(error){
    // console.log('failure data', error);
    // })
    //$interval(checkNewMsgs,2000);
    doctoronoffdetails.fetchOne2OneReq($localStorage.user).then(function(response){
    $scope.one2oneRequests = response;
    // console.log('one2onePending:',$scope.one2oneRequests);
    $scope.one2oneRequests=$scope.one2oneRequests.length;
    })

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

					// alert(unametologout);
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


$rootScope.ExpiredAlert= false;
$scope.viewRequest=function(patient){
  $rootScope.currentPatient = patient;
  window.localStorage['currentPatient'] = angular.toJson($rootScope.currentPatient);

  console.log($rootScope.currentPatient);
  console.log($rootScope.currentPatient.requestedTime);
        $rootScope.id= $rootScope.currentPatient.id

  $state.go('templates.patientRequest',{'reqId':$rootScope.currentPatient.id,'reqPat':$rootScope.currentPatient.patientNum,'reqTime':$rootScope.currentPatient.awstime})
}


$scope.playDemoVideo = function() {
$scope.videoPlayerPopup = $ionicPopup.show({
  // title: 'DoctorQuick',
  template: '<div ><p style="color:#fcfff4; margin: -21px 0 0 15px; "></div><div style="position: absolute; margin-top: 0px; margin-bottom: 0; top: 0px;left: 0;  border-radius: 22px; font-size: 8vw; color: teal; text-align: end; padding: 7px;" ng-controller="patientProfileCtrl" ng-Click="closethis();">X</div>'+
      '<iframe width="100%" height="90%" src="https://www.youtube.com/watch?v=xowDOen2zrM" frameborder="0" allowfullscreen autoplay></iframe>',
  // templateUrl: "views/app/viewdoctor_profile.html",
  cssClass: 'videoPlayerPopup',
  scope: $scope,

});
$ionicLoading.hide();
$scope.closethis = function()
{
$scope.videoPlayerPopup.close();
};
// $scope.showModal('templates/video-popover.html');
}

$rootScope.testnum = "greet+9844992181";
//
// var presPatient = $rootScope.testnum.split('+');
// $rootScope.test1num=presPatient['1'];
// console.log($rootScope.test1num);

});
