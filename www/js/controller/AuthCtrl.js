DoctorQuickApp.controller('AuthCtrl', function($scope, $state,$ionicConfig,$ionicHistory,$base64,$window, $cordovaToast, $timeout, $rootScope, $ionicPlatform, $localStorage, $ionicModal, $http, $ionicPopup, $ionicLoading,ionicDatePicker,$filter, patientRegistrationService, doctorRegistrationService,LoginService) {

    $rootScope.showBackBtn=false;
    $rootScope.PatientDetail = {};
    $rootScope.PatientDetail2 = {};

    $rootScope.Doctor = {};
    $rootScope.PatientDetail = {};
    $scope.Doctor = {};
    $rootScope.dateOfBirth='';
    $scope.submitted = false;

    $scope.deviceAndroid = ionic.Platform.isAndroid();
    // alert($scope.deviceAndroid);
    $scope.devicePlatform = ionic.Platform.isIOS();
    console.log($ionicHistory.currentStateName());

    $ionicConfig.views.swipeBackEnabled(false);

    ionic.Platform.ready(function(){
        // will execute when device is ready, or immediately if the device is already ready.
        if($scope.deviceAndroid){
          console.log('ready');
          // StatusBar.hide();
        }

      });


$scope.sendForm = function($event,form)
{
     $event.preventDefault()
     $scope.submitted = true

};


console.log($localStorage.doctororpatient);


//Validate  Doctor

//patient Registration forms.

  $scope.registerPatient=function()
  {
      console.log($scope.loginDatasubmitted);
      var patientDetails = {};
      $rootScope.loginDatasubmitted=false;
      console.log($scope.loginDatasubmitted);
      $state.go('auth.patient_reg1', {}, {reload: true});
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
          message: "Valid OTP must be entered",
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
                  patientImage:$rootScope.imageData,
                  deviceID:$localStorage.deviceID,
                  serial:$localStorage.serial

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
              $rootScope.dateOfBirth='';
              $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
              });
              $scope.submitted = false;
              $scope.submitted2ndPage = false;
              $rootScope.loginDatasubmitted=false;

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
        			// $timeout(function() {
        		  //    $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
        		  // }, 1000);
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
      $scope.currentDate = new Date();
      console.log($scope.currentDate);
      console.log($rootScope.dateOfBirth);

      var date2 = new Date();
      var date1 = new Date($rootScope.dateOfBirth);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // return $scope.dayDifference;
      console.log($scope.dayDifference);
      // if($scope.dayDifference < 6570){
      //
      //   alert('you should be 18+')
      //
      // }

      // console.log($rootScope.PatientDetail);
      if(isFormValid) {
        console.log(isFormValid);

        if($rootScope.dateOfBirth === '' || $scope.dayDifference < 6570){
          $scope.submittedAge = true;
          window.plugins.toast.showWithOptions({
          message: "You should be 18+ to use DoctorQuick",
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
          $rootScope.PatientDetail.patient_age=$rootScope.dateOfBirth;
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
    $scope.otpentered = {};
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
          var checkDeviceReg={
            user:$rootScope.PatientDetail.patient_mob,
            deviceID:$localStorage.deviceID,
            serial:$localStorage.serial
          }
          console.log(checkDeviceReg);
          patientRegistrationService.existingPatient(checkDeviceReg).then(function(response)
          {
            $scope.patientExist=response;
            console.log($scope.patientExist);
            if($scope.patientExist === 'patient'){
              $scope.myPopup=$ionicPopup.show({
                // title: '',
                template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Mobile Number/Device Already Registered<br>Tap on <a ui-sref="auth.getPassword" ng-click=closethis()>Forgot Password</a> to get your password instantly on your registered mobile number</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',

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
        console.log("doctor Already Exist");
        //Alert Popup goes healthcare
        $scope.myPopup=$ionicPopup.show({
          title: 'Number Already Registered',
          template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Please wait someone from DoctorQuick will call you shortly to help you with registration.</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
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
      else if(response == 'Exist'){
        $scope.myPopup=$ionicPopup.show({
          // title: '',
          template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Mobile Number Already Registered<br>Tap on <a ui-sref="auth.getPassword" ng-click=closethis()>Forgot Password</a> to get your password instantly on your registered mobile number</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',

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

        $scope.regDoc=doctorDetails;
        console.log($scope.regDoc);
        var showDoc= $ionicPopup.show({
          scope: $scope,
          template: "<style>.button{background-color:#648c39;} .popup-buttons{padding:0; min-height:0;} .popup-body { padding: 10px; overflow: scroll; text-align: center; font-family: Ubuntu,bold,sans-serif !important;	 } </style>"+
                      "<body ><p >Thank you for registering <br/> Dr. {{regDoc.doctorFname}} {{regDoc.doctorMname}} {{regDoc.doctorLname}}<br/><br/> Someone from DoctorQuick will call you soon to help you with your Signup.<p/></body>",
          // title: 'Thank You',
          cssClass: 'videoPopup',
          buttons: [

           {
             text: 'Close',
             type: 'button-positive',
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
      templateUrl: "views/auth/terms.html",
      cssClass: 'termsPopup',
      scope: $scope,
    });

    $scope.closethis = function()
    {
    $scope.termsPopup.close();
    };
      $ionicLoading.hide();
  }

  //video popoverOptions

  $scope.playVideo = function() {
  $ionicLoading.show();
  $scope.videoPlayerPopup = $ionicPopup.show({
    // title: 'DoctorQuick',
    template: '<div ><p style="color:#fcfff4; margin: -21px 0 0 15px; "></div><div style="position: absolute; margin-top: 0px; margin-bottom: 0; top: 23px;left: 95%; border-radius: 22px; font-size: 4vw; color: teal; text-align: center; padding: 0px; background-color: white; width: 5%;font-weight: bolder;color: #777;" ng-controller="doctorScreensCtrl" ng-Click="closethis();">X</div>'+
        '<iframe style="width: 100%; height: 59%; border: 4px solid green; margin-top: 7%;" src="https://www.youtube.com/embed/xrLtb9Pkkjg?rel=0&amp;showinfo=0" frameborder="0"  autoplay></iframe>',
    // template:'test',
    cssClass: 'videoPlayerPopup',
    scope: $scope,

  });

  $ionicLoading.hide();
  $scope.closethis = function()
  {
  $scope.videoPlayerPopup.close();
  };
}

var currentTime = new Date()

// returns the month (from 0 to 11)
var month = currentTime.getMonth() ;
$rootScope.currentMonth= month;
// returns the day of the month (from 1 to 31)
var day = currentTime.getDate();
$rootScope.currentDay= day;


// returns the year (four digits)
var year = currentTime.getFullYear();
$rootScope.currentYear= year;


$rootScope.dateOfBirth='';
var ipObj2 = {
    callback: function (val) {  //Mandatory
      $scope.currentDate = new Date();
      console.log($scope.currentDate);
      console.log('Selected To Date : ' + val, new Date(val));

      $rootScope.dateOfBirth = $filter('date')(new Date(val),'yyyy-MM-dd');

    },

    from: new Date(1950, 1, 1), //Optional
    to: new Date($rootScope.currentYear, $rootScope.currentMonth, $rootScope.currentDay), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: false,          //Optional
    // disableWeekdays: [0],       //Optional
    closeOnSelect: true,
    dateFormat: 'dd MMMM yyyy',     //Optional
    templateType: 'popup'       //Optional
  };

$scope.openDatePickerDOB = function(){

  ionicDatePicker.openDatePicker(ipObj2);
};

autoPlayYouTubeModal();

//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
function autoPlayYouTubeModal() {
    var trigger = $("body").find('[data-toggle="modal"]');
    trigger.click(function () {
        var theModal = $(this).data("target"),
            videoSRC = $(this).attr("data-theVideo"),
            videoSRCauto = videoSRC + "?autoplay=1";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC);
        });
    });
}

})
