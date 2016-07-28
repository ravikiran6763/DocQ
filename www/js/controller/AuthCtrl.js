DoctorQuickApp.controller('AuthCtrl', function($scope, $state,$ionicConfig, $window, $timeout, $rootScope, $localStorage, $ionicModal, $http, $ionicPopup, $ionicLoading, patientRegistrationService, doctorRegistrationService,LoginService) {

    $rootScope.showBackBtn=false;
    $rootScope.PatientDetail = {};
    $rootScope.PatientDetail2 = {};

    $rootScope.Doctor = {};
    $scope.PatientDetail = {};
    $scope.Doctor = {};

    $scope.submitted = false;


   if($localStorage.user && $localStorage.pass){


<<<<<<< HEAD
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

     // $state.go('app.patient_home');

         $timeout(function() {
           LoginService.loginprocess(preLoginDetails).then(function(response){
             $scope.LoginStatus=response;
             $ionicLoading.show();
             if(response === "patient")
             {
             $state.go('app.patient_home');
             }

             else if(response === "doctor")
             {
             // $state.go('templates.doctor_home');
             }
             console.log($scope.LoginStatus);
             $ionicLoading.hide();
           }).catch(function(error){
           console.log('failure data', error);
           });
           console.log('timeout fired');
         }, 3000);

     $ionicLoading.hide();
   }
=======
        if(response === "patient")
        {
<<<<<<< HEAD
        //$ionicLoading.show();
        //$state.go('app.patient_home');
=======
        $state.go('app.patient_home');
>>>>>>> e73064bb31f631a24ff039b0b8bd7c9a1a9499a6
        }
>>>>>>> 2bfc4d72f0a58f7a916ecae86de0804f77c148e0



$scope.sendForm = function($event,form)
{
     $event.preventDefault()
     $scope.submitted = true

};
$scope.validateUser=function(isFormValid){
  console.log('isFormValid ', isFormValid)

  console.log('clicked');

  $scope.submitted = true;
  if(isFormValid) {
    // console.log($scope.PatientDetail);
    $state.go('auth.patient_reg2');
  }
  // console.log($rootScope.PatientDetail);

  // $state.go('auth.patient_reg2');
}

    $scope.validateUser1=function(isForm1Valid){
    console.log('isForm1Valid ', isForm1Valid)
    console.log($scope.PatientDetail);
    console.log('clicked');

    $scope.submitted = true;
    if(isForm1Valid) {
    // console.log($scope.PatientDetail);
      // console.log($rootScope.PatientDetail);
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
                  pateientPwd:$scope.PatientDetail.pat_password
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
              $state.go('app.patient_home');
              $scope.PatientDetail =  {};
            }

          })
          .catch(function(error)
          {
              console.log('failure data', error);
          });
        }
        else
        {
              alert('Incorrect OTP');
        }

    }


    $scope.validateUser=function(isFormValid){


      console.log('clicked');

      $scope.submitted = true;
      if(isFormValid) {

        // console.log($scope.PatientDetail);
        $state.go('auth.patient_reg2');
      }
      // console.log($rootScope.PatientDetail);

      // $state.go('auth.patient_reg2');
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
        var showDoc= $ionicPopup.show({
          scope: $scope,
          // template:'<div class="row list-inset" ng-repeat= "(key, data) in '+$scope.myData+'" >'+
          //          '<div class="col font_type2" >{{key}}</div>'+
          //          '<div class="col font_type2" >{{data}}</div>'+
          //          '</div>',
          template: "<style>.button{background-color:#648c39;} .popup-buttons{padding:0; min-height:0;} .popup-body { padding: 10px; overflow: scroll; text-align: center; font-family: Ubuntu,bold,sans-serif !important;	 } </style><body><p >Thank you for registering Dr. {{doc.doctorFname}} Middlename,Lastname someone from DoctorQuick will call you soon to help you with the signup.<p/></body>",
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
