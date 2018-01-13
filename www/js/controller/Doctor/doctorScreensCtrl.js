DoctorQuickApp.controller('doctorScreensCtrl', function($scope,$ionicHistory,$timeout,$window,$location,$rootScope,$localStorage,$interval,$ionicConfig, $state, $ionicSideMenuDelegate,$ionicLoading, $interval, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails,doctorServices,HardwareBackButtonManager,LoginService,invitereviews) {

  	$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;
    $scope.docAvailable=true;
    $scope.docNotAvailable=false;
    $rootScope.homePage=$ionicHistory.currentStateName();
    $ionicSideMenuDelegate.canDragContent(false); //preventes sidemenu sliding

    HardwareBackButtonManager.disable();
    $ionicConfig.views.swipeBackEnabled(false);//disables swipe back in iphone
    // alert($rootScope.previousState.name);
    // alert($rootScope.homePage);
    $rootScope.goToConsultation = function ()
    {
      $state.go("templates.consulted_patient")
    }
    $timeout( function(){
        console.log('interval started');
        console.log($localStorage.showConnecting);
        if($localStorage.showConnecting == true){
          $ionicLoading.show({
            template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
          });

        }
        $interval(availableInVsee,2000,1);
        $interval(checkNewMessages,2000);


    }, 0 );

    doctorServices.doctorDetails($localStorage.user).then(function(response,data){
      $rootScope.doctor_details=response;//store the response array in doctor details
      console.log($rootScope.doctor_details);
      window.localStorage['doctorDetails'] = angular.toJson(response);

    }).catch(function(error){
      console.log('failure data', error);
    });


    $scope.docStatus = $localStorage.onOff;


    function availableInVsee() {
            var uname1 = "greet+"+$localStorage.user;
            var pw1 = "DQ_doctor";
            var success = function(message)
            {
            // alert(message);

            $ionicLoading.hide().then(function(){
            console.log("The loading indicator is now hidden");
            // alert('loggedin');
            $localStorage.showConnecting = false;
            $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
            });
            $interval.cancel(availableInVsee);
            doctorServices.doctorStatus($localStorage.user).then(function(response){
            console.log(response);
            $localStorage.onOff=response;
            if(response == 1){
            $scope.docAvailable=true;
            $scope.docNotAvailable=false;

            }
            else{
            $scope.docAvailable=false;
            $scope.docNotAvailable=true;
            }
            }).catch(function(error){
            console.log('failure data', error);
            });
            $state.go($state.current, {}, {reload: false});
            });
            }
            var failure = function()
            {
            alert("Error calling Hello Plugin");
            }

            hello.login(uname1,pw1,success, failure);
    }



    function checkNewMessages()
    {
          var username = "greet+"+$localStorage.user;
          var password = "DQ_doctor";
          var success = function(message)
          {
          $rootScope.unreadchatforpatient = message;
          // console.log($scope.unreadchatforpatient);
          }

          var failure = function()
          {
          console.log("Error calling Hello Plugin");
          //console.log(‘error’);

          }
          hello.unreadchatfromusers(username,password,success, failure);
    }

    invitereviews.generateTinyUrl($localStorage.user).then(function(response){
      $rootScope.docTinyUrl=response;
      $localStorage.docTinyUrl=$rootScope.docTinyUrl;
    }).catch(function(error){
    console.log('failure data', error);
    });

  if($rootScope.previousState.name === '' && $rootScope.homePage === 'templates.doctor_home'){
    $scope.docAvailable=false;
    $scope.docNotAvailable=true;
    // $localStorage.onOff=2;


  }
    console.log($ionicHistory.viewHistory());
    $interval(checkConsultations,2000,false);
    console.log($localStorage.onOff);
    $scope.docStatus=$localStorage.onOff;
    $scope.$watch('docStatus', function (newValue, oldValue, scope){
       console.log('changed');

       if(newValue > oldValue){
           $interval.cancel(checkConsultations);
       }

    },true);


function checkConsultations(){
    doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
    $scope.pendingRequests = response;
    // console.log('pending:',$scope.pendingRequests);
    $scope.requests=$scope.pendingRequests.length;
  });
  // .catch(function(error){
  //   console.log('failure data', error);
  // })
    //$interval(checkNewMsgs,2000);
    // doctoronoffdetails.fetchOne2OneReq($localStorage.user).then(function(response){
    // $scope.one2oneRequests = response;
    // // console.log('one2onePending:',$scope.one2oneRequests);
    // $scope.one2oneRequests=$scope.one2oneRequests.length;
    // })

}

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

        // var unametologout = "greet+"+$localStorage.user;
        // var pwtologout = "DQ_doctor";
        //
        // // alert(unametologout);
        // var success = function(message)
        // {
        // console.log(message);
        // }
        // var failure = function()
        // {
        // console.log("An Error occured kindly check your Interner Connection");
        // }
        // hello.logout(unametologout,pwtologout,success, failure);


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

  // YoutubeVideoPlayer.openVideo('https://www.youtube.com/embed/x49Vi9iKE_o', function(result) { console.log('YoutubeVideoPlayer result = ' + result); });
$scope.videoPlayerPopup = $ionicPopup.show({
  // title: 'DoctorQuick',
  template: '<div ><p style="color:#fcfff4; margin: -21px 0 0 15px; "></div><div style="position: absolute; margin-top: 0px; margin-bottom: 0; top: 23px;left: 95%; border-radius: 22px; font-size: 4vw; color: teal; text-align: center; padding: 0px; background-color: white; width: 5%;font-weight: bolder;color: #777;" ng-controller="doctorScreensCtrl" ng-Click="closethis();">X</div>'+
      '<iframe style="width: 100%; height: 59%; border: 4px solid green; margin-top: 7%;" src="https://www.youtube-nocookie.com/embed/Nt364t3Vp6I?rel=0&amp;showinfo=0" frameborder="0"  autoplay></iframe>',
  // template:'test',
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


//invite Reviews
  $scope.contacts='';
$scope.inviteForReview=function(){

  $scope.contacts = invitereviews.getinvitecontacts();
	console.log($scope.contacts.length);


  if($scope.contacts.length === 0)
  {


    window.plugins.toast.showWithOptions({
    message: "Please select your contacts",
    duration: "short", // 2000 ms
    position: "bottom",
    styling: {
    opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
    backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
    textColor: '#ffffff', // Ditto. Default #FFFFFF
    textSize: 13, // Default is approx. 13.
    cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
    horizontalPadding: 16, // iOS default 16, Android default 50
    verticalPadding: 12 // iOS default 12, Android default 30
    }
    });


  }
  else {


    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner><br><center>Sending invite</center>'
    })

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







}


});
