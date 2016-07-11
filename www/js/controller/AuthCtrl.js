DoctorQuickApp.controller('AuthCtrl', function($scope, $state,$ionicConfig, $rootScope, $ionicModal, $http, $ionicPopup, $ionicLoading, patientRegistrationService, doctorRegistrationService) {

    $rootScope.showBackBtn=false;
    $rootScope.PatientDetail = {};
    $rootScope.Doctor = {};
    $scope.PatientDetail = {};
    $scope.Doctor = {};

//autofocus using jquery
// $('input[maxlength][tabindex]').on('keyup', function() {
//     var $this = $(this);
//     if ($this.val().length == $this.attr('maxlength')) {
//         $("input[maxlength][tabindex='" + (parseInt($this.attr('tabindex')) + 1) + "']").focus();
//     }
// });

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



        console.log($scope.otpentered.OTP1);

        console.log($scope.otpentered.OTP2);

        console.log($scope.otpentered.OTP3);


        console.log($scope.otpentered.OTP4);



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

          patientRegistrationService.patientRegistrationDone(patientDetails).then(function(response)
          {
              $state.go('app.patient_home');
              $scope.PatientDetail =  {};
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

  $scope.doctorRegistration = function()
  {
    var doctorDetails={
      doctorFname : $scope.Doctor.doc_fname,
      doctorMname : $scope.Doctor.doc_mname,
      doctorLname:$scope.Doctor.doc_lname,
      doctorEmail:$scope.Doctor.doc_email,
      doctorPhone:$scope.Doctor.doc_phone
    };

    doctorRegistrationService.doctorRegistrationDone(doctorDetails).then(function(response){
      console.log(response);
      $scope.Doctor = {};
    }).catch(function(error){
      console.log('failure data', error);

    });

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
