// Ionic DoctorQuickApp
// var handleOpenURL=function(url){
//   alert("Received url"+url);
//   window.localStorage.setItem('externalLoad',url);
// }
//
//

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});


var DoctorQuickApp = angular.module('DoctorQuick', [
  'ionic','ionic.service.core',
  'angularMoment',
  'DoctorQuick.directives',
  'DoctorQuick.filters',
  'DoctorQuick.services',
  'DoctorQuick.factories',
  'DoctorQuick.config',
  'DoctorQuick.views',
  'underscore',
  'ngMap',
  'ngResource',
  'ngCookies',
  'ngStorage',
  'ngCordova',
  'youtube-embed',
  'ngCordova.plugins.contacts',
  'ngMask',
  'ui.router',
  'ngTagsInput',
  'ionic-ratings',
  'base64',
  'ionic-datepicker',
  'ngMessages',
  'ion-alpha-scroll',
  'angular-circular-progress',
  'ionic-letter-avatar'
])



DoctorQuickApp.run(function($cordovaSplashscreen) {
  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 5000)
})

DoctorQuickApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
    window.plugin.backgroundMode.enable();
    function successFunction() {
      console.log("It worked!");
    }

    function errorFunction(error) {
        console.log(error);
      }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleBlackOpaque();
    }
  });
})

DoctorQuickApp.run(function($ionicPlatform, PushNotificationsService, $rootScope, $ionicConfig, $ionicPlatform, $cordovaDevice, $timeout, $ionicHistory, $cordovaKeyboard, $cordovaNetwork, $ionicPopup) {
  $ionicPlatform.on("deviceready", function(){
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      $ionicPlatform.registerBackButtonAction(function (event) {

        if ( ($state.$current.name=="templates.doctor_home" || $state.$current.name=="app.patient_home")){
            console.log('back button disabled');
              
                // H/W BACK button is disabled for these states (these views)
                // Do not go to the previous state (or view) for these states.
                // Do nothing here to disable H/W back button.
                // navigator.app.exitAspp();
            } else {
                // For all other states, the H/W BACK button is enabled
                navigator.app.backHistory();
            }
        }, 100);


      if (ionic.Platform.isAndroid()) {
         window.addEventListener("native.hidekeyboard", function () {
         StatusBar.hide();
         window.AndroidFullScreen.immersiveMode(false, false);
           });}

      if(window.StatusBar)
      {
        // StatusBar.styleDefault();
        StatusBar.hide();
      }

      if (window.Connection)
      {
            if (navigator.connection.type == Connection.NONE)
            {
              toast.show("Internet is disconnected on your device");
            };
      };
      PushNotificationsService.register();

      // Android customization
      cordova.plugins.backgroundMode.setDefaults({ text:'Keeps you Awailable on DQ.'});
      // Enable background mode
      cordova.plugins.backgroundMode.enable();
      if(cordova.plugins.backgroundMode.isEnabled()){
           console.log('Hi, I am enabled. Signed : backgroundMode.');
         }

      // Called when background mode has been activated
      cordova.plugins.backgroundMode.onactivate = function () {
      setTimeout(function () {
      // Modify the currently displayed notification
      cordova.plugins.backgroundMode.configure({
      text:'Running in background for more than 5s now.'
      });
      }, 5000);
      }

          function successFunction()
          {
          console.info("It worked!");
          }
          function errorFunction(error)
          {
          console.error(error);
          }
          function trace(value)
          {
          console.log(value);
          }
      AndroidFullScreen.immersiveMode(successFunction, errorFunction);
  });

  document.addEventListener("deviceready", function () {
      window.plugins.sim.getSimInfo(successCallback, errorCallback);
      function successCallback(result) {
      // alert(result.deviceId);
      }

      function errorCallback(error) {
      // alert(error);
      }
      // Check for network connection
      if(window.Connection) {
      //you can log your connection as well, whether it is internet, wifi and so on.In this case you are checking for no connection
          console.log(navigator.connection.type);
          // if(navigator.connection.type == Connection.NONE) {
          // $ionicPopup.confirm({
          // title: 'Network Problem',
          // content: 'Unable to reach the DoctorQuick servers. Please check your connection and try again later.'
          // }).then(function(){
          // ionic.Platform.exitApp();
          // })
          // //or you can simply navigate it to a page with the no internet connection html.
          // }
      }
      else{

      }

  })

  // This fixes transitions for transparent background views

  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
      if(toState.name.indexOf('app.patient_home') > -1)
      {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
        if(ionic.Platform.isIOS())
        {
          $ionicConfig.views.swipeBackEnabled(true);
        }
          console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
      }
      console.log(toState.name);
      if (toState.name != "app.searchDoctors") {
        $rootScope.sideMenuForSearch = false;
      }

  });

  $ionicPlatform.on("resume", function(){
  PushNotificationsService.register();
  });

  //press again to exit
  //
  // $ionicPlatform.registerBackButtonAction(function(e){
  //   $scope.currState=$ionicHistory.currentStateName();
  //   if($scope.currState === 'templates.doctor_home' || $scope.currState ==='app.patient_home'){
  //     // $ionicHistory.clearHistory();
  //     $ionicHistory.removeBackView();
  //
  //
  //   }
  //     // if ($rootScope.backButtonPressedOnceToExit) {
  //     // ionic.Platform.exitApp();
  //     // }
  //
  //     else if ($ionicHistory.backView()) {
  //     $ionicHistory.goBack();
  //     console.log('cameback');
  //
  //
  //     }
  //     else {
  //     // $rootScope.backButtonPressedOnceToExit = true;
  //     // window.plugins.toast.showShortCenter(
  //     // "Press back button again to exit",function(a){},function(b){}
  //     // );
  //     // setTimeout(function(){
  //     // $rootScope.backButtonPressedOnceToExit = false;
  //     // },2000);
  //     console.log('doNOthing');
  //     }
  //     e.preventDefault();
  //     return false;
  // },101);

  })

DoctorQuickApp.config(['$httpProvider', function($httpProvider) {

  // $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

DoctorQuickApp.config(function( $ionicConfigProvider) {
       $ionicConfigProvider.navBar.alignTitle('center');
       $ionicConfigProvider.views.transition('platform');

});

DoctorQuickApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,USER_ROLES) {
// $ionicConfigProvider.navBar.alignTitle('left')
  //INTRO
  $stateProvider
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.loginNew', {
    url: '/loginNew',
    templateUrl: "views/auth/loginNew.html",
    controller : 'LoginCtrl'
  })

  .state('auth.getPassword', {
    url: "/getPassword",
    templateUrl: "views/auth/getPassword.html",
    controller: 'ForgotPasswordCtrl'
  })



//newly added for Doctor
$stateProvider
.state('auth.doctorRegistration', {
  url: "/doc_reg1",
  templateUrl: "views/auth/doc_reg1.html"

})
.state('auth.doctorRegistration2', {
  url: "/doc_reg2",
  templateUrl: "views/auth/doc_reg2.html"
  })

//Patient
.state('auth.patient_reg1', {
  url: "/patient_reg1",
  templateUrl: "views/auth/patient_reg1.html"

})

.state('auth.patient_reg2', {
  url: "/patient_reg2",
  templateUrl: "views/auth/patient_reg2.html"

})

.state('auth.patient_reg3', {
  url: "/patient_reg3/:pateientPhone",
  templateUrl: "views/auth/patient_reg3.html"

})

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/patient-side-menu.html"

  })

  .state('app.patient_home', {
    url: "/patientScreens",
    views: {
      'menuContent': {
        templateUrl: "views/app/patient_home.html",
        controller: 'patientHomeCtrl'

      }
    }
  })


  .state('app.patient_profile', {
    url: "/patient_profile",
    views: {
      'menuContent': {
        templateUrl: "views/app/patient_profile.html",
        controller:'patientProfileCtrl'
      }
    }
  })

  .state('app.changePassword_patient', {
    url: "/changePassword_patient",
    views: {
      'menuContent': {
        templateUrl: "views/app/changePassword_patient.html"

      }
    }
  })
  //my_doctors
  .state('app.my_doctors', {
    url: "/my_doctors",
    views: {
      'menuContent': {
        templateUrl: "views/app/my_doctors.html",
        controller:'myDoctorCtrl'

      }
    }
  })
//myconsultations
.state('app.my_consultations', {
  url: "/my_consultations",
  views: {
    'menuContent': {
      templateUrl: "views/app/my_consultations.html",
      controller:'myconsultationsCtrl'
    }
  }
})

.state('app.patient_summary', {
  url: "/patient_summary",
  views: {
    'menuContent': {
      templateUrl: "views/app/patient_summary.html",
      controller:'consultSummaryCtrl'
    }
  }
})

//patientPayments
.state('app.patient_payments', {
  url: "/patient_payments",
  views: {
    'menuContent': {
      templateUrl: "views/app/patient_payments.html",
      controller:'patientpaymentCtrl'
    }
  }
})
//refund
.state('app.refund_patient', {
  url: "/refund_patient/:credit/:debit",
  views: {
    'menuContent': {
      templateUrl: "views/app/refund_patient.html",
      controller:'patientRefundCtrl'
    }
  }
})
//topup
.state('app.patient_topup', {
  url: "/patient_topup",
  views: {
    'menuContent': {
      templateUrl: "views/app/patient_topup.html",
      controller:'patientTopupCtrl'
    }
  }
})
//customercare patient
.state('app.patient_customercare', {
  url: "/patient_customercare",
  views: {
    'menuContent': {
      templateUrl: "views/app/patient_customercare.html",
      controller:'patientCareCtrl'
    }
  }
})
//medical_speciality
.state('app.medical_speciality', {
  url: "/medical_speciality",
  views: {
    'menuContent': {
      templateUrl: "views/app/medical_speciality.html"
    }
  }
})

//doctore screens
  .state('app.specialityDetailsNew', {
    url: "/specialityDetailsNew/:specialId/:special/:content1/:descrpt",
    views: {
      'menuContent': {
        templateUrl: "views/app/specialityDetailsNew.html",
        controller:'specilityDetailsCtrl'

      }
    }
  })

//search
.state('app.searchDoctors', {
  url: "/searchDoctors",
  views: {
    'menuContent': {
      templateUrl: "views/app/searchDoctorNew.html",
      controller:"searchDoctorsController"

    }
  }
})


  .state('app.doctorsearch', {
    url: "/doctorsearch",
    views: {
      'menuContent': {
        templateUrl: "views/app/searchresultbydoctor.html",
        controller:"searchDoctorsController"
      }
    }
  })


  //doctor profile
    .state('app.results', {
      url: "/results/",
      views: {
        'menuContent': {
          templateUrl: "views/app/results.html"

        }
      }
    })



//doctor profile
  .state('app.viewdoctor_profile', {
    url: "/viewdoctor_profile",
    views: {
      'menuContent': {
        templateUrl: "views/app/viewdoctor_profile.html",
        controller: 'doctorprofileCtrl'
      }
    }
  })

  .state('app.capture', {
    url: "/capture",
    views: {
      'menuContent': {
        templateUrl: "views/app/capture.html"

      }
    }
  })

  .state('app.callAccepted', {
    url: "/callAccepted",
    views: {
      'menuContent': {
        templateUrl: "views/app/callAccepted.html",
        controller:'callAcceptedCtrl'

      }
    }
  })

  .state('templates', {
    url: "/templates",
    abstract: true,
    templateUrl: "views/templates/doc-sidemenu.html"
  })

  .state('templates.doctor_home', {
    url: "/doctor_home",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doctor_home.html",
          controller: 'doctorScreensCtrl'
      }
    }
  })

  .state('templates.doc_profile', {
    url: "/doc_profile",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doc_profile.html",
        controller:'docProfileCtrl'
      }
    }
  })

  .state('templates.doc_acc_statement', {
    url: "/doc_acc_statement",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doc_acc_statement.html",
        controller:'docAccStatementCtrl'
      }
    }
  })
  .state('templates.consulted_patient', {
    url: "/consulted_patient",
    views: {
      'menuContent': {
        templateUrl: "views/templates/consulted_patient.html",
        controller:'myconsultationsCtrl'
      }
    }
  })
  .state('templates.patientRequest', {
    url: "/patientRequest/:reqId/:pfname/:plname/:psex/:page/:pphno/:image/:dateAndTime",
    views: {
      'menuContent': {
        templateUrl: "views/templates/patientRequestfromdocotor.html",
          controller: 'patientrequestCtrl'
      }
    }
  })

  // .state('templates.chat_with_patient', {
  //   url: "/chat_with_patient",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "views/templates/chat_with_patient.html",
  //       controller:'chatWithPatientCtrl'
  //     }
  //   }
  // })
  .state('templates.doc-customercare', {
    url: "/doc_customercare",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doc-customercare.html",
          controller:'doctorCareCtrl'
      }
    }
  })

/* serach results by patients */

  .state('templates.invite_reviews', {
    url: "/invite_reviews",
    views: {
      'menuContent': {
        templateUrl: "views/templates/invite_reviews.html"

      }
    }
  })


  .state('templates.requestAccepted', {
    url: "/requestAccepted",
    views: {
      'menuContent': {
        templateUrl: "views/templates/requestAccepted.html",
        controller:"callAccptCtrl"
      }
    }
  })

  .state('templates.notesForPatient', {
    url: "/notesForPatient",
    views: {
      'menuContent': {
        templateUrl: "views/templates/notesForPatient.html",
        controller:'notesCtrl'
      }
    }
  })

  .state('templates.diagnosisForPatient', {
    url: "/diagnosisForPatient/:ptFname/:ptLname/:ptImage/:ptPh",
    views: {
      'menuContent': {
        templateUrl: "views/templates/diagnosisForPatient.html",
        controller:'diagnosisCtrl'

      }
    }
  })

  .state('templates.medicationForPatient', {
    url: "/medicationForPatient/:ptFname/:ptLname/:ptImage/:ptPh",
    views: {
      'menuContent': {
        templateUrl: "views/templates/medicationForPatient.html",
        controller:'medicationCtrl'
      }
    }
  })

  .state('templates.patientTests', {
    url: "/patientTests/:ptFname/:ptLname/:ptImage/:ptPh",
    views: {
      'menuContent': {
        templateUrl: "views/templates/patientTests.html",
        controller:'patientTestsCtrl'
      }
    }
  })


  .state('templates.inviteresult', {
    url: "/inviteresult/:countofselected",
    views: {
      'menuContent': {
        templateUrl: "views/templates/inviteresult.html",
        controller : 'inviteresultCtrl'

      }
    }
  })




  .state('templates.termsOfUse', {
    url: "/termsOfUse",
    views: {
      'menuContent': {
        templateUrl: "views/templates/termsOfUse.html",
        controller:'termsCtrl'
      }
    }
  })

  .state('templates.video', {
    url: "/video",
    views: {
      'menuContent': {
        templateUrl: "views/templates/video.html",
        controller:'videoCtrl'
      }
    }
  })

  .state('templates.updatePassword', {
    url: "/updatePassword",
    views: {
      'menuContent': {
        templateUrl: "views/templates/updatePassword.html"

      }
    }
  })
;

  //Patient signup
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/loginNew');

});
