DoctorQuickApp.controller('AuthCtrl', function($scope, $state,$ionicConfig,$ionicHistory,$base64,$window,$ionicAuth, $ionicUser,$ionicPush, $cordovaToast, $timeout, $rootScope, $ionicPlatform, $localStorage, $ionicModal, $http, $ionicPopup, $ionicLoading, patientRegistrationService, doctorRegistrationService,LoginService) {

    $rootScope.showBackBtn=false;
    $rootScope.PatientDetail = {};
    $rootScope.PatientDetail2 = {};

    $rootScope.Doctor = {};
    $rootScope.PatientDetail = {};
    $scope.Doctor = {};

    $scope.submitted = false;

    $scope.deviceAndroid = ionic.Platform.isAndroid();
    // alert($scope.deviceAndroid);
    $scope.devicePlatform = ionic.Platform.isIOS();
    console.log($ionicHistory.currentStateName());

    ionic.Platform.ready(function(){
        // will execute when device is ready, or immediately if the device is already ready.
        if($scope.deviceAndroid){
          console.log('ready');
          // StatusBar.hide();
        }

      });

   if($localStorage.user && $localStorage.pass){
     console.log('user already logged in')
     $ionicLoading.show();
     // $scope.doLogIn();
     console.log('userNum' , $localStorage.user);
     console.log('password' , $localStorage.pass);
     var preLoginDetails={
       userNum : $localStorage.user,
       password : $localStorage.pass
     };
     console.log(preLoginDetails);

     var message="loading";
     $timeout(function() {
       $ionicLoading.show();
       LoginService.alreadyLoggedIn(preLoginDetails).then(function(response){
        $scope.LoginStatus=response;
        console.log($scope.LoginStatus);
        if(response === "patient")
        {
          var uname1 = "greet+"+$localStorage.user;
          var pw1 = "DQ_patient";
          var success = function(message)
          {
            console.log(message);
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
          $state.go('app.patient_home', {}, {location: "replace", reload: false});

          }
          var failure = function()
          {
            alert("Error calling Hello Plugin");
          }
          $state.go('app.patient_home', {}, {location: "replace", reload: false});

         hello.login(uname1,pw1,success, failure);

          window.plugins.OneSignal.getIds(function(ids){
            //document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
            //document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
            console.log(JSON.stringify(ids['userId']));
            $scope.playerId=JSON.stringify(ids['userId']);

            console.log($scope.playerId);
            var updatePlayer ={
              palyerId:$scope.playerId,
              userNum:$localStorage.user,
              user:'patient'
            }
            console.log(updatePlayer);
            LoginService.updatePlayer(updatePlayer).then(function(response){
              console.log(response);
            })
          });

        }

        else if(response === "doctor")
        {
            var uname1 = "greet+"+$localStorage.user;
            var pw1 = "DQ_doctor";
            var success = function(message)
            {
              console.log(message);
              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
              });
            $state.go('templates.doctor_home', {}, {location: "replace", reload: false});
            }

            var failure = function()
            {
              alert("Error calling Hello Plugin");
            }

            // hello.login(uname1,pw1,success, failure);

            window.plugins.OneSignal.getIds(function(ids) {
              //document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
              //document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
              // console.log(JSON.stringify(ids['userId']));
              $scope.playerId=JSON.stringify(ids['userId']);
              console.log($scope.playerId);

              var updatePlayer ={
                palyerId:$scope.playerId,
                userNum:$localStorage.user,
                user:'doctor'
              }
              console.log(updatePlayer);
              LoginService.updatePlayer(updatePlayer).then(function(response){
                console.log(response);
              })
            });
            $ionicPush.register().then(function(t) {
              return $ionicPush.saveToken(t);
            }).then(function(t) {
              // alert(t.token);
              console.log('Token saved:', t.token);
            });
           hello.login(uname1,pw1,success, failure);
            $localStorage.onOff=1;
        }
         $ionicLoading.hide();
       }).catch(function(error){
       console.log('failure data', error);
       });
   }, 1000);

   }

$scope.sendForm = function($event,form)
{
     $event.preventDefault()
     $scope.submitted = true

};

//Validate  Doctor

//patient Registration forms.

  $scope.registerPatient=function()
  {
      var patientDetails = {};
      $scope.loginDatasubmitted=false;
      $state.go('auth.patient_reg1');
  }

  $scope.goToPatientReg2 = function ()
  {
      $state.go('auth.patient_reg2');
  }
  $scope.otp = "";
  $scope.goToNextView = function ()
  {

      $scope.phoneno = $rootScope.PatientDetail.patient_mob;
        patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
        {
            $scope.otp=response;
          console.log($scope.otp);
          })
          .catch(function(error)
          {
              console.log('failure data', error);
          });

      $state.go('auth.patient_reg3');
  }


  $scope.resendOtp = function()
  {





    patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
    {
      $scope.otpentered = {};

        $scope.otp=response;
        window.plugins.toast.showWithOptions({
        message: "OTP has been sent to your mobile number",
        duration: "short", // 2000 ms
        position: "bottom",
        styling: {
        opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
        textColor: '#ffffff', // Ditto. Default #FFFFFF
        textSize: 13, // Default is approx. 13.
        cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
        horizontalPadding: 16, // iOS default 16, Android default 50
        verticalPadding: 12 // iOS default 12, Android default 30
        }
        });
      })
      .catch(function(error)
      {
          console.log('failure data', error);
      });
  }

    $scope.otpentered = {};

$scope.patientRegistration = function()
{
        console.log('reg clicked');
        if($scope.otpentered.OTP1 === undefined && $scope.otpentered.OTP2 === undefined && $scope.otpentered.OTP3 === undefined && $scope.otpentered.OTP4 === undefined)
        {
          window.plugins.toast.showWithOptions({
          message: "Valid code must be entered",
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
          $timeout(function() {
             $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);
        }
        else if($scope.otpentered.OTP1 === $scope.otp[0] && $scope.otpentered.OTP2 ===  $scope.otp[1] && $scope.otpentered.OTP3 === $scope.otp[2] && $scope.otpentered.OTP4 === $scope.otp[3])
        {
              patientDetails=
                {
                  pateientFname : $rootScope.PatientDetail.patient_fname,
                  pateientMname : $rootScope.PatientDetail.patient_mname,
                  pateientLname:$rootScope.PatientDetail.patient_lname,
                  pateientAge :$rootScope.PatientDetail.patient_age,
                  pateientPhone:$rootScope.PatientDetail.patient_mob,
                  pateientEmail:$rootScope.PatientDetail.pat_email,
                  pateientSex:$rootScope.PatientDetail.gender,
                  pateientPwd:$rootScope.PatientDetail.pat_password,
                  patientImage:$rootScope.imageData
                };
                var loginData = {
                  'phone': $rootScope.PatientDetail.patient_mob,
                  'password': $rootScope.PatientDetail.pat_password
                };

                console.log(patientDetails);
          patientRegistrationService.patientRegistrationDone(patientDetails).then(function(response)
          {
            console.log(response);
            if(response){
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory();
              $window.localStorage.clear();
              $scope.otpentered={};
              $rootScope.PatientDetail={};

              $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
              });
              $scope.submitted = false;
              $scope.submitted2ndPage = false;


              $state.go('auth.loginNew', {}, {location: "replace", reload: true});
              var details = {
                'phone': $rootScope.PatientDetail.patient_mob,
                'password': $rootScope.PatientDetail.pat_password
              }

            }
            else{
              // $state.go('app.patient_home');
              // $rootScope.PatientDetail =  {};
              /*
              showShortTop(message)
              showShortCenter(message)
              showShortBottom(message)
              showLongTop(message)
              showLongCenter(message)
              showLongBottom(message)
              showWithOptions(options)
              */

            }

          })
          .catch(function(error)
          {
              console.log('failure data', error);
          });
        }
        else
        {
              // alert('Incorrect OTP');

              window.plugins.toast.showWithOptions({
              message: "Valid code must be entered",
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
        			$timeout(function() {
        		     $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
        		  }, 1000);
              // $cordovaToast.showLongBottom('Valid code must be entered tap on Resend to receive a code again.', 'short', 'center').then(function(success) {
              // // success
              // }, function (error) {
              // // error
              // });
        }

}

    $rootScope.validInput=true;
    $scope.validateUser=function(isFormValid){

      $rootScope.validInput=false;
      $scope.validForm =isFormValid;
      $scope.submitted = true;


      // console.log($rootScope.PatientDetail);
      if(isFormValid) {
        console.log(isFormValid);
        if($rootScope.PatientDetail.patient_age<18){
          $scope.submittedAge = true;
          // alert('You Should be 18+ to use this app')
              window.plugins.toast.showWithOptions({
              message: "You Should be 18+ to use this app",
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
        else{
          $state.go('auth.patient_reg2');
        }
      }

    }

    $rootScope.validInput=true;
    $scope.validateUser1=function(isForm1Valid){

    console.log('clicked');
    $rootScope.validInput=false;
    $scope.submitted2ndPage = true;
    // console.log($rootScope.PatientDetail.patient_mob);

    if(!$rootScope.PatientDetail.patient_mob){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      $scope.submittedMob = true;
      console.log($rootScope.PatientDetail.patient_mob);

      // $scope.myPopup = $ionicPopup.show({
      //   // title: 'Invalid Credentials',
      //
      //   template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Invalid Mobile Number</p></div><div class="errorContent"><center><p>Please Enter a valid mobile number</center> </p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
      //   cssClass: 'loginPopup',
      //   scope: $scope,
      // });
      // $scope.closethis = function()
      // {
      // $scope.myPopup.close();
      // };
    }
    else if(!$rootScope.PatientDetail.gender){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);

      $scope.submittedSex = true;
      // $scope.myPopup = $ionicPopup.show({
      //   // title: 'Invalid Credentials',
      //
      //   template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Invalid Mobile Number</p></div><div class="errorContent"><p>Please select gender</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
      //   cssClass: 'loginPopup',
      //   scope: $scope,
      // });
      // $scope.closethis = function()
      // {
      // $scope.myPopup.close();
      // };
    }
    else if(!$rootScope.PatientDetail.pat_email){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      $scope.submittedMail = true;
      // $cordovaToast.showLongCenter('Valid email must be entered', 'short', 'center').then(function(success){
      // // success
      // }, function (error) {
      // // error
      // });
    }
    else if(!$rootScope.PatientDetail.pat_password){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      $scope.submittedPwd = true;

      window.plugins.toast.showWithOptions({
      message: "Valid 4 digit password must be entered",
      duration: "short", // 2000 ms
      position: "bottom",
      styling: {
      opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
      textColor: '#ffffff', // Ditto. Default #FFFFFF
      textSize: 13, // Default is approx. 13.
      cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      horizontalPadding: 16, // iOS default 16, Android default 50
      verticalPadding: 12 // iOS default 12, Android default 30
      }
      });

    }
    else{
      console.log('validated');
    }

    if(isForm1Valid) {
      // console.log($rootScope.PatientDetail.pat_password.length());
      if($scope.firstNum < 7){
        console.log($scope.firstNum);
        window.plugins.toast.showWithOptions({
        message: "Enter a Valid 10 digit phone number",
        duration: "short", // 2000 ms
        position: "bottom",
        styling: {
        opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        backgroundColor: '#EA0F0F', // make sure you use #RRGGBB. Default #333333
        textColor: '#ffffff', // Ditto. Default #FFFFFF
        textSize: 13, // Default is approx. 13.
        cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
        horizontalPadding: 16, // iOS default 16, Android default 50
        verticalPadding: 12 // iOS default 12, Android default 30
        }
        });
      }
      else{
        //check for existing patient
          patientRegistrationService.existingPatient($rootScope.PatientDetail.patient_mob).then(function(response)
          {
            $scope.patientExist=response;
            console.log($scope.patientExist);
            if($scope.patientExist === 'patient'){
              $scope.myPopup=$ionicPopup.show({
                title: 'Patient Already Exist',

                template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Please try again if the problem persists call us directly.</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',

                cssClass: 'loginPopup',
                scope: $scope,
                          });
              $scope.closethis = function()
              {
              $scope.myPopup.close();
              $window.localStorage.clear();
              // $state.go('auth.loginNew');

              };
            }
              else{
                $scope.phoneno = $rootScope.PatientDetail.patient_mob;
                $rootScope.imageData=$base64.encode('https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSHkDSrh4dvgrpmNFkYQOOmumy9dIBRAuKZmuuAm4V-DNeti04O');
                // console.log($rootScope.imageData);
                patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
                {
                  $scope.otp=response;
                  console.log($scope.otp);
                }).catch(function(error)
                {
                  console.log('failure data', error);
                });
                $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
                });
                $state.go('auth.patient_reg3');
              }
          })
          .catch(function(error)
          {
            console.log('failure data', error);
          });

        }
      }

    }

    $scope.validateDoctor=function(isDocFormValid){
      console.log('isDocFormValid ', isDocFormValid)
    console.log($rootScope.Doctor);
      console.log('clicked');


      if(!$scope.Doctor.doc_fname){
        // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
        $scope.submitted = true;
        //
        // $cordovaToast.showLongCenter('Valid Name be entered', 'short', 'center').then(function(success){
        // // success
        // }, function (error) {
        // // error
        // });
      }
      else if(!$scope.Doctor.doc_lname){
        // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
        $scope.submittedLname = true;

        // $cordovaToast.showLongCenter('Valid Name be entered', 'short', 'center').then(function(success){
        // // success
        // }, function (error) {
        // // error
        // });
      }
      else{
        console.log('validated');
      }

      if(isDocFormValid) {
        console.log($scope.Doctor);
        // console.log('isDocFormValid ', isDocFormValid)
        $state.go('auth.doctorRegistration2');
      }

      // $state.go('auth.patient_reg2');
    }

  $scope.doctorRegistration = function(isDocForm1Valid)
  {
    console.log('clicked');
    console.log('isDocForm1Valid ', isDocForm1Valid)

    if(!$scope.Doctor.doc_email){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      console.log('enter mail');
      $scope.submittedMail = true;
      console.log($scope.Doctor.doc_email);
      $cordovaToast.showLongCenter('Valid email must be entered', 'short', 'center').then(function(success){
      // success
      }, function (error) {
      // error
      });
    }
    else if(!$scope.Doctor.doc_phone){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      console.log('enter mail');
      $scope.submittedMob = true;
      console.log($scope.Doctor.doc_phone);
      $cordovaToast.showLongCenter('Valid phone number must be entered', 'short', 'center').then(function(success){
      // success
      }, function (error) {
      // error
      });
    }

    else{
      console.log('2nd form validated');
    }
    var doctorDetails={
      doctorFname : $scope.Doctor.doc_fname,
      doctorMname : $scope.Doctor.doc_mname,
      doctorLname:$scope.Doctor.doc_lname,
      doctorEmail:$scope.Doctor.doc_email,
      doctorPhone:$scope.Doctor.doc_phone
    };

    doctorRegistrationService.doctorRegistrationDone(doctorDetails).then(function(response){
      console.log(response);
      if(response == 'ERROR'){
        console.log("Patient Already Exist");
        //Alert Popup goes healthcare
        $scope.myPopup=$ionicPopup.show({
          title: 'Doctor Already Exist',

          template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Please try again if the problem persists call us directly.</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',

          cssClass: 'loginPopup',
          scope: $scope,
                    });

        $scope.closethis = function()
        {
        $scope.myPopup.close();
        $window.localStorage.clear();
        $state.go('auth.loginNew');

        };

      }
      else{

        $scope.regDoc=doctorDetails;
        console.log($scope.regDoc);
        var showDoc= $ionicPopup.show({
          scope: $scope,
          template: "<style>.button{background-color:#648c39;} .popup-buttons{padding:0; min-height:0;} .popup-body { padding: 10px; overflow: scroll; text-align: center; font-family: Ubuntu,bold,sans-serif !important;	 } </style>"+
                      "<body ><p >Thank you for registering <br/> Dr. {{regDoc.doctorFname}} {{regDoc.doctorMname}} {{regDoc.doctorLname}}.<br/><br/> Someone from DoctorQuick will call you soon to help you with your Signup.<p/></body>",
          title: 'Thank You',
          cssClass: 'videoPopup',
          buttons: [
          //  { text: 'Cancel',
          // 	 //  type: 'button-positive',
          // 	},
           {
             text: '<b>Close</b>',
             type: 'button-royal',
             onTap: function() {
               console.log('Doctor Registered Successfully');
               $state.go('auth.loginNew');

             }
           }
          ]
        });
      }
      $scope.Doctor = {};
    }).catch(function(error){
      console.log('failure data', error);

    });


  }

  $scope.termsAndCond=function(){
    // console.log('clicked');
    $ionicLoading.show();
    $scope.termsPopup = $ionicPopup.show({
      title: 'Terms Of Use',
      template: '<div ><p style="color:#fff; margin: -21px 0 0 15px; ">Please try again if the problem persists call us directly.</p></div><div style="position: absolute; margin-top: 0vh; margin-bottom: 0; top: 0px;left: 0;  border-radius: 22px; font-size: 8vw; color: teal; text-align: end; padding: 7px;" ng-controller="patientProfileCtrl" ng-Click="closethis();">X</div>'+
      '<div class="terms-content">'+
      '<li>Use of the Site. DoctorQuick Private Limited. (“DoctorQuick”, “we”, “us”, or “our”) operates the website located at www.doctorquick.com and other related websites and mobile applications with links to these Terms of Use (collectively, the “Site”). We offer online telehealth services (the “Services”) enabling our members (“Members”) to report their health history and engage healthcare professionals (“Treating Providers”) to obtain medical and healthcare services (“Services”). By accessing and using the Site, you agree to be bound by these Terms of Use and all other terms and policies that appear on the Site. If you do not wish to be bound by any of these Terms of Use, you may not use the Site or the Services.</li>'+
      '<br><li>Use of the Site. DoctorQuick Private Limited. (“DoctorQuick”, “we”, “us”, or “our”) operates the website located at www.doctorquick.com and other related websites and mobile applications with links to these Terms of Use (collectively, the “Site”). We offer online telehealth services (the “Services”) enabling our members (“Members”) to report their health history and engage healthcare professionals (“Treating Providers”) to obtain medical and healthcare services (“Services”). By accessing and using the Site, you agree to be bound by these Terms of Use and all other terms and policies that appear on the Site. If you do not wish to be bound by any of these Terms of Use, you may not use the Site or the Services.</li>'+

      '</div>',
      // templateUrl: "views/app/viewdoctor_profile.html",
      cssClass: 'termsPopup',
      scope: $scope,
      // buttons: [
      // 	{ text: 'Cancel' },
      // 	{
      // 	text: '<b>Agree</b>',
      // 	type: 'button-positive',
      //
      // 	},
      // ]
    });

    $scope.closethis = function()
    {
    $scope.termsPopup.close();
    };
      $ionicLoading.hide();
  }

  //video popoverOptions

  $scope.clipSrc = 'https://www.youtube.com/watch?v=L83qMnbJ198';

  $scope.playVideo = function() {
  $ionicLoading.show();
  $scope.videoPlayerPopup = $ionicPopup.show({
    title: 'DoctorQuick',
    template: '<div ><p style="color:#fcfff4; margin: -21px 0 0 15px; "></div><div style="position: absolute; margin-top: 0px; margin-bottom: 0; top: 0px;left: 0;  border-radius: 22px; font-size: 8vw; color: teal; text-align: end; padding: 7px;" ng-controller="patientProfileCtrl" ng-Click="closethis();">X</div>'+
        '<iframe width="100%" height="90%" src="https://www.youtube.com/embed/ZnWIc3EYGrg" frameborder="0" allowfullscreen autoplay></iframe>',
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


})
