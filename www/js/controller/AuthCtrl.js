DoctorQuickApp.controller('AuthCtrl', function($scope, $state,$ionicConfig, $rootScope, $ionicModal, $http, $ionicPopup, patientRegistrationService, doctorRegistrationService, DoctorReg) {

    $rootScope.showBackBtn=false;
    $rootScope.PatientDetail = {};
    $rootScope.Doctor = {};
    $scope.PatientDetail = {};
    $scope.Doctor = {};

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

  $ionicModal.fromTemplateUrl('my-modal.html', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.modal = modal;
 });
 $scope.openModal = function() {
   $scope.modal.show();
 };
 $scope.closeModal = function() {
   $scope.modal.hide();
 };
 // Cleanup the modal when we're done with it!
 $scope.$on('$destroy', function() {
   $scope.modal.remove();
 });
 // Execute action on hide modal
 $scope.$on('modal.hidden', function() {
   // Execute action
 });
 // Execute action on remove modal
 $scope.$on('modal.removed', function() {
   // Execute action
 });



})
