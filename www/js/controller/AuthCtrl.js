DoctorQuickApp.controller('AuthCtrl', function($scope, $state,$ionicConfig, $base64,$window, $cordovaToast, $timeout, $rootScope, $ionicPlatform, $localStorage, $ionicModal, $http, $ionicPopup, $ionicLoading, patientRegistrationService, doctorRegistrationService,LoginService) {

    $rootScope.showBackBtn=false;
    $rootScope.PatientDetail = {};
    $rootScope.PatientDetail2 = {};

    $rootScope.Doctor = {};
    $scope.PatientDetail = {};
    $scope.Doctor = {};

    $scope.submitted = false;

    $scope.deviceAndroid = ionic.Platform.isAndroid();
    // alert($scope.deviceAndroid);
    $scope.devicePlatform = ionic.Platform.isIOS();

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
       LoginService.loginprocess(preLoginDetails).then(function(response){
        $scope.LoginStatus=response;
        if(response === "patient")
        {
          var uname1 = "greet+"+$localStorage.user;
          var pw1 = "DQ_patient";
          var success = function(message)
            {
              alert(message);
            }
            var failure = function()
            {
              alert("Error calling Hello Plugin");
            }
              // hello.login(uname1,pw1,success, failure);
        //$state.go('app.patient_home');
        }

        else if(response === "doctor")
        {

        var uname1 = "greet+"+$localStorage.user;
        var pw1 = "DQ_doctor";
        var success = function(message)
          {
            alert(message);
          }
          var failure = function()
          {
            alert("Error calling Hello Plugin");
          }
      //$state.go('templates.doctor_home');
      // hello.login(uname1,pw1,success, failure);
        $localStorage.onOff=1;
        }
         console.log($scope.LoginStatus);
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


    $scope.validateUser1=function(isForm1Valid){
    // console.log('isForm1Valid ', isForm1Valid)
    console.log($scope.PatientDetail.patientAvatar);
    console.log('clicked');

    $scope.submitted = true;
    $scope.firstNum=$scope.PatientDetail.patient_mob.charAt(0);

    if(isForm1Valid) {
      if($scope.firstNum < 7){
        console.log($scope.firstNum);

        $cordovaToast.showLongBottom('Enter a Valid 10 digit phone number', 'short', 'center').then(function(success) {
        // success
        }, function (error) {
        // error
        });
      }
      else{

        //check for existing patient
          patientRegistrationService.existingPatient($scope.PatientDetail.patient_mob).then(function(response)
          {
            $scope.patientExist=response;
            console.log($scope.patientExist);
            if($scope.patientExist === 'patient'){
              $scope.myPopup=$ionicPopup.show({
                title: 'Patient Already Exist',
                template: '<div ><p style="color:#fff; margin: -21px 0 0 15px; ">Please try again if the problem persists call us directly.</p></div><div style="position: absolute; margin-top: 0vh; margin-bottom: 0; top: -17px;left: 88vw; background: #6fa02d; border-radius: 22px; font-size: 8vw; color: #fff; text-align: end; padding: 7px; height:30px" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="color:#fff; margin-top: -7px; ">X</p></div>',
                cssClass: 'loginPopup',
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
              $scope.myPopup.close();
              $window.localStorage.clear();
              // $state.go('auth.loginNew');

              };
            }
              else{
                $scope.phoneno = $scope.PatientDetail.patient_mob;
                $rootScope.imageData=$base64.encode('https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSHkDSrh4dvgrpmNFkYQOOmumy9dIBRAuKZmuuAm4V-DNeti04O');
                console.log($rootScope.imageData);
                patientRegistrationService.sendotp($scope.PatientDetail.patient_mob).then(function(response)
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
          })
          .catch(function(error)
          {
            console.log('failure data', error);
          });

        }


    }

    }


//Validate  Doctor
$scope.validateDoctor=function(isDocFormValid){
  console.log('isDocFormValid ', isDocFormValid)
console.log($rootScope.Doctor);
  console.log('clicked');

  $scope.submitted = true;
  if(isDocFormValid) {
    console.log($scope.Doctor);
    // console.log('isDocFormValid ', isDocFormValid)
    $state.go('auth.doctorRegistration2');
  }
  // console.log($rootScope.PatientDetail);

  // $state.go('auth.patient_reg2');
}

//patient Registration forms.

  $scope.registerPatient=function()
  {
      var patientDetails = {};
      $state.go('auth.patient_reg1');
  }

  $scope.goToPatientReg2 = function ()
  {
      $state.go('auth.patient_reg2');
  }




  $scope.otp = "";


  $scope.goToNextView = function ()
  {

      $scope.phoneno = $scope.PatientDetail.patient_mob;
        patientRegistrationService.sendotp($scope.PatientDetail.patient_mob).then(function(response)
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

      $scope.OTP1 = "";
      $scope.OTP2 = "";
      $scope.OTP3 = "";
      $scope.OTP4 = "";



    patientRegistrationService.sendotp($scope.PatientDetail.patient_mob).then(function(response)
    {
        $scope.otp=response;
        console.log($scope.otp);
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
            alert('Please Enter OTP');
        }
        else if($scope.otpentered.OTP1 === $scope.otp[0] && $scope.otpentered.OTP2 ===  $scope.otp[1] && $scope.otpentered.OTP3 === $scope.otp[2] && $scope.otpentered.OTP4 === $scope.otp[3])
        {
              patientDetails=
                {
                  pateientFname : $scope.PatientDetail.patient_fname,
                  pateientMname : $scope.PatientDetail.patient_mname,
                  pateientLname:$scope.PatientDetail.patient_lname,
                  pateientAge :$scope.PatientDetail.patient_age,
                  pateientPhone:$scope.PatientDetail.patient_mob,
                  pateientEmail:$scope.PatientDetail.pat_email,
                  pateientSex:$scope.PatientDetail.gender,
                  pateientPwd:$scope.PatientDetail.pat_password,
                  patientImage:$rootScope.imageData
                };
                console.log(patientDetails);
          patientRegistrationService.patientRegistrationDone(patientDetails).then(function(response)
          {
            console.log(response);
            if(response =='ERROR'){
              console.log("Patient Already Exist");

              //Alert Popup goes healthcare
              $scope.myPopup = $ionicPopup.show({
								title: 'Patient Already Exist',
								template: '<div ><p style="color:#fff; margin: -21px 0 0 15px; ">Please try again if the problem persists call us directly.</p></div><div style="position: absolute; margin-top: 0vh; margin-bottom: 0; top: -17px;left: 88vw; background: #6fa02d; border-radius: 22px; font-size: 8vw; color: #fff; text-align: end; padding: 7px; height:30px" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="color:red">X</p></div>',
								cssClass: 'loginPopup',
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
							$scope.myPopup.close();
              $window.localStorage.clear();
              $state.go('auth.loginNew');

							};

            }
            else{
              // $state.go('app.patient_home');
              // $scope.PatientDetail =  {};
              /*
              showShortTop(message)
              showShortCenter(message)
              showShortBottom(message)
              showLongTop(message)
              showLongCenter(message)
              showLongBottom(message)
              showWithOptions(options)
              */

              $cordovaToast.showLongBottom('Successfully registered.', 'short', 'center').then(function(success) {
              // success
              $state.go('auth.loginNew');
              }, function (error) {
              // error
              });
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
              $cordovaToast.showLongBottom('Valid code must be entered tap on Resend to receive a code again.', 'short', 'center').then(function(success) {
              // success
              }, function (error) {
              // error
              });
        }

}


    $scope.validateUser=function(isFormValid){
      console.log('clicked');
      $scope.submitted = true;
      if(isFormValid) {
        if($scope.PatientDetail.patient_age<18){
          // alert('You Should be 18+ to use this app')
          $cordovaToast.showLongBottom('You must be 18 over to register', 'short', 'center').then(function(success) {
          // success
          }, function (error) {
          // error
          });

        }
        else{
          $state.go('auth.patient_reg2');

        }
      }

    }


  $scope.doctorRegistration = function(isDocForm1Valid)
  {
    console.log('clicked');
console.log('isDocForm1Valid ', isDocForm1Valid)
    $scope.submitted = true;
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
        $scope.myPopup = $ionicPopup.show({
          title: 'Doctor Already Exist',
          template: '<div ><p style="color:#fff; margin: -21px 0 0 15px; ">Please try again if the problem persists call us directly.</p></div><div style="position: absolute; margin-top: 0vh; margin-bottom: 0; top: -17px;left: 88vw; background: #6fa02d; border-radius: 22px; font-size: 8vw; color: #fff; text-align: end; padding: 7px;" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p></div>',
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

          buttons: [
          //  { text: 'Cancel',
          // 	 //  type: 'button-positive',
          // 	},
           {
             text: '<b>Close</b>',
             type: 'button',
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
