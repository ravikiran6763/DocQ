DoctorQuickApp.controller('doctorScreensCtrl', function($scope,$ionicHistory,$timeout,$window,$location,$rootScope,$localStorage,$interval,$ionicConfig, $state, $ionicSideMenuDelegate,$ionicLoading, $interval, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails,doctorServices,HardwareBackButtonManager,LoginService,invitereviews) {

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
    $rootScope.goToConsultation = function ()
    {
      $state.go("templates.consulted_patient")
    }
    $rootScope.showAlert = function ()
    {
      alert('tiny');
      var Url = 'http://ec2-35-154-118-177.ap-south-1.compute.amazonaws.com/rateAdoctor.html';
      var request = gapi.client.urlshortener.url.insert({
      'resource': {
      'longUrl': Url
      }
      });
      request.execute(function(response) {

      if (response.id != null) {
      str = "<b>Long URL:</b>" + Url + "<br>";
      str += "<b>Test Short URL:</b> <a href='" + response.id + "'>" + response.id + "</a><br>";
      document.getElementById("result").innerHTML = str;
      }
      else {
      alert("Error: creating short url \n" + response.error);
      }
      });
    }


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

      console.log($localStorage.user);
      doctorServices.notifyPatient($localStorage.user).then(function(response){
        console.log(response);
      })
          console.log(message);
          $scope.docAvailable=true;
          $scope.docNotAvailable=false;
          $localStorage.onOff=1
          var whichdoctoronoff = {
            doctorphno : $localStorage.user,
            onoff : $localStorage.onOff
          }
          doctoronoffdetails.doctoronoff(whichdoctoronoff).then(function(response){
  				console.log(response);
  				}).catch(function(error){
  				console.log('failure data', error);
  				});

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

              //Unregister from onesignal notifications
              $scope.accptNotifications=false;
    					$scope.rejectNotifications=true;
    					window.plugins.OneSignal.getIds(function(ids){
                //document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
                //document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
                console.log(JSON.stringify(ids['userId']));
                $scope.playerId=JSON.stringify(ids['userId']);
    						// alert('oneSignal')
                console.log($scope.playerId);
    						if($localStorage.doctororpatient === 'patient'){
    							var updatePlayer ={
    								palyerId:$scope.playerId,
    								userNum:$localStorage.user,
    								user:'patient'
    							}
    						}
    						else{
    							var updatePlayer ={
    								palyerId:$scope.playerId,
    								userNum:$localStorage.user,
    								user:'doctor'
    							}


    						}

                LoginService.updatePlayer(updatePlayer).then(function(response){
                  console.log(response);
                })




              });

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
        console.log(whichdoctoronoff);
        doctoronoffdetails.doctoronoff(whichdoctoronoff).then(function(response){
				console.log(response);
				}).catch(function(error){
				console.log('failure data', error);
				});

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


        $scope.accptNotifications=true;
        $scope.rejectNotifications=false;
        if($localStorage.doctororpatient === 'patient'){
          var updatePlayer ={
            palyerId:'',
            userNum:$localStorage.user,
            user:'patient'
          }

          $scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
          var playerId = JSON.parse($window.localStorage.getItem("patientDetails"));
          playerId[0][8] = "";
          console.log(playerId);
          console.log($scope.patient_details[0][8]);
          localStorage.setItem("patientDetails",JSON.stringify(playerId));
          console.log(angular.fromJson($window.localStorage['patientDetails']));

          LoginService.updatePlayer(updatePlayer).then(function(response){
            console.log(response);
          })
        }
        else{
          var updatePlayer ={
            palyerId:'',
            userNum:$localStorage.user,
            user:'doctor'
          }

          LoginService.updatePlayer(updatePlayer).then(function(response){
            console.log(response);
          })
        }





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

  YoutubeVideoPlayer.openVideo('https://www.youtube.com/embed/x49Vi9iKE_o', function(result) { console.log('YoutubeVideoPlayer result = ' + result); });

// $scope.videoPlayerPopup = $ionicPopup.show({
//   // title: 'DoctorQuick',
//   template: '<div ><p style="color:#fcfff4; margin: -21px 0 0 15px; "></div><div style="position: absolute; margin-top: 0px; margin-bottom: 0; top: 0px;left: 0;  border-radius: 22px; font-size: 8vw; color: teal; text-align: end; padding: 7px;" ng-controller="patientProfileCtrl" ng-Click="closethis();">X</div>'+
//       '<iframe width="100%" height="90%" src="https://www.youtube.com/embed/x49Vi9iKE_o" frameborder="0" allowfullscreen autoplay></iframe>',
//   // template:'test',
//   cssClass: 'videoPlayerPopup',
//   scope: $scope,
//
// });
$ionicLoading.hide();
$scope.closethis = function()
{
$scope.videoPlayerPopup.close();
};
// $scope.showModal('templates/video-popover.html');
}

// $rootScope.testnum = "greet+9844992181";
//
// var presPatient = $rootScope.testnum.split('+');
// $rootScope.test1num=presPatient['1'];
// console.log($rootScope.test1num);


//invite Reviews
  $scope.contacts='';
$scope.inviteForReview=function(){
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner><br><center>Sending invite</center>'
  })
  $scope.contacts = invitereviews.getinvitecontacts();
	console.log($scope.contacts.length);
  $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";
  invitereviews.sendsmstoinvitereviews($scope.contacts,$scope.query,$localStorage.user).then(function(response){
    if(response){
      $ionicLoading.hide();
      $scope.contacts='';
      $state.go("templates.doctor_home")
    }
  }).catch(function(error){
  console.log('failure data', error);
  })
}
});
