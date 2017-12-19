// Ionic DoctorQuickApp

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

var DoctorQuickApp = angular.module('DoctorQuick', [
  'ionic',
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
  // 'youtube-embed',
  'ngCordova.plugins.contacts',
  'ngMask',
  'ui.router',
  'ngTagsInput',
  'ionic-ratings',
  'base64',
  'ionic-datepicker',
  'ngMessages',
  // 'ion-alpha-scroll',
  // 'angular-circular-progress',
  'ionic-letter-avatar',
  'ionic.closePopup'
  // 'ionic.cloud'
])

DoctorQuickApp.run(['$rootScope', '$interval', function($rootScope, $interval,$ionicPlatform) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
  //print here
  $interval.cancel($rootScope.loginInterval);

  // $ionicPlatform.registerBackButtonAction(function(){
  //   if($ionicHistory.currentStateName === 'templates.inviteresult'){
  //     console.log('back button disabled');
  //     event.preventDefault();
  //   }else{
  //     $ionicHistory.goBack();
  //   }
  // }, 100);


});
}])

DoctorQuickApp.run(function($window,$timeout,$cordovaSplashscreen, $rootScope) {
  // console.log(navigator.onLine);
      // $cordovaSplashscreen.hide();
      $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
        });
      }, false);

})


DoctorQuickApp.run(function($ionicPlatform,$interval,$cordovaNetwork,$localStorage) {
  $ionicPlatform.ready(function() {
    window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
    // window.plugin.backgroundMode.enable();
    function successFunction() {
      // console.log("It worked!");
    }
    function errorFunction(error) {
        console.log(error);
      }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
    // if (window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    ionic.Platform.fullScreen();
    if (window.StatusBar) {
      return StatusBar.hide();
    }
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 300);

    window.MobileAccessibility.usePreferredTextZoom(true);
   function getTextZoomCallback(textZoom) {
     console.log('WebView text should be scaled to the preferred value ' + textZoom + '%')
   }
   window.MobileAccessibility.getTextZoom(getTextZoomCallback);


  });

  $interval(checkConnection, 1000)
  function checkConnection() {
      var networkState = navigator.network.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown';
      states[Connection.ETHERNET] = 'Ethernet';
      states[Connection.WIFI]     = 'WiFi';
      states[Connection.CELL_2G]  = '2G';
      states[Connection.CELL_3G]  = '3G';
      states[Connection.CELL_4G]  = '4G';
      states[Connection.NONE]     = 'None';

      $localStorage.networkType = states[networkState];
      //console.log('Connection type: ' + $localStorage.networkType);
  }

  // document.addEventListener("offline", onOffline, false);
  // function onOffline() {
  //     // Handle the offline event
  //     console.log('offline');
  //     alert('offline');
  //
  // }
})

DoctorQuickApp.run(function($state,$ionicPlatform, $rootScope, $ionicConfig, $ionicPlatform,$interval,$localStorage,$ionicLoading, $cordovaDevice, $timeout,$injector,$ionicHistory, $cordovaKeyboard, $cordovaNetwork, $ionicPopup) {
  $ionicPlatform.on("deviceready", function(){


    // AppRate.preferences.storeAppURL.ios = '*insert app id*';
    AppRate.preferences.storeAppURL.android = 'https://play.google.com/store/apps/details?id=com.greettech.DoctorQuick&hl=en';

    var deviceID = device.uuid;
    $localStorage.deviceID=deviceID;
    console.log($localStorage.deviceID);

    var deviceHardwareSerial = device.serial;
    $localStorage.serial=deviceHardwareSerial;
    console.log($localStorage.serial);

    console.log(deviceHardwareSerial);

  if (ionic.Platform.isAndroid()) {
    window.addEventListener("native.hidekeyboard", function () {
    StatusBar.hide();
    window.AndroidFullScreen.immersiveMode(false, false);
    });
  }
  else {
    console.log("localStorage previous value",$localStorage.sendPrescTo);
    $localStorage.sendPrescTo = "";
    console.log("localStorage after value",$localStorage.sendPrescTo);
  }

  if(window.StatusBar){
    // StatusBar.styleDefault();
    StatusBar.hide();
  }

  if (window.Connection){
    if (navigator.connection.type == Connection.NONE)
    {
    toast.show("Internet is disconnected on your device");
    };
  };

  function successFunction() {
    console.info("It worked!");
  }
  function errorFunction(error){
    console.error(error);
  }
  function trace(value){
    console.log(value);
  }
  AndroidFullScreen.immersiveMode(successFunction, errorFunction);
  //-------------------------------------ONESIGNAL PUSH SETUP---------------------

  window.plugins.OneSignal.getIds(function(ids) {
    // alert('getIds: ' + JSON.stringify(ids));
    console.log("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
  });
  var iosSettings = {};
  iosSettings["kOSSettingsKeyAutoPrompt"] = true;
  iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

  var notificationOpenedCallback = function(jsonData) {
    alert("Notification opened:\n" + JSON.stringify(jsonData));
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  window.plugins.OneSignal
  // .startInit("6873c259-9a11-4a2a-a3b5-53aea7d59429")//old one from ravikiran6763@gmail.com
  .startInit("e215d4e2-486f-4f19-984b-e54e8b63f891")//from services.doctorquick
  .iOSSettings(iosSettings)
  .endInit();

  window.plugins.OneSignal
  .startInit( "e215d4e2-486f-4f19-984b-e54e8b63f891")
  .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
  // Notification - native notification display while user has app in focus (can be distracting).
  // InAppAlert (DEFAULT) - native alert dialog display, which can be helpful during development.
  // None - notification is silent.
  .handleNotificationOpened(function(jsonData) {
      var data = jsonData.notification.payload.additionalData;
      // console.log('fromPush',data.reqId);
      console.log("Notification opened:\n" + JSON.stringify(jsonData));
      console.log('didOpenRemoteNotificationCallBack: ' + JSON.stringify(jsonData));

      $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
      });
      $state.go('templates.viewPatientRequest',{ "reqId": data.reqId,"reqPat": data.reqPat,"reqTime": data.reqTime},{location: "replace", reload: false});
  })
  .endInit();

  console.log('deviceredy');

  console.log($localStorage.doctororpatient);

  $rootScope.deviceAndroid = ionic.Platform.isAndroid();
  $rootScope.deviceIOS = ionic.Platform.isIOS();

  if($rootScope.deviceIOS){
    console.log("iosDevice:",$rootScope.deviceIOS);
  }


  console.log('iospatientValue:',$localStorage.sendPrescTo);

  if($localStorage.doctororpatient === "doctor" ){

      if($rootScope.pat_phnofromwebview){
          $localStorage.onOff=2;
          $ionicLoading.show({
          template: '<ion-spinner></ion-spinner><br><br>Please Wait',
          duration:5000
          });
          console.log($rootScope.pat_phnofromwebview);
          $state.go('templates.sendPrescription',{"reqPat": $rootScope.pat_phnofromwebview},{location: "replace", reload: false});
          return '/templates/sendPrescription';
      }

      if($rootScope.deviceIOS === true){
        if($localStorage.sendPrescTo != ''){
          console.log("iosDevice:");
          console.log("iospatient:",$localStorage.sendPrescTo);
          $state.go('templates.sendPrescription',{"reqPat": $localStorage.sendPrescTo},{location: "replace", reload: false});
          return '/templates/sendPrescription';
        }
      }

  }

  else{
    //do nothing
    console.log('UNDEFINED');
  }
  $timeout( function() {
    // $state.go('templates.loadingDoctor');
    if($rootScope.pat_phnofromwebview){
        $localStorage.onOff=2;
        $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br><br>Please Wait',
        duration:5000
        });
        console.log($rootScope.pat_phnofromwebview);
        $state.go('templates.sendPrescription',{"reqPat": $rootScope.pat_phnofromwebview},{location: "replace", reload: false});
        return '/templates/sendPrescription';
    }

    if($rootScope.deviceIOS === true){
      if($localStorage.sendPrescTo != ''){
        console.log("iosDevice:");
        console.log("iospatient:",$localStorage.sendPrescTo);
        $state.go('templates.sendPrescription',{"reqPat": $localStorage.sendPrescTo},{location: "replace", reload: false});
        return '/templates/sendPrescription';
      }
    }
  }, 0);


  //-------------------------------------ONESIGNAL PUSH SETUP---------------------
  });

  //cordova event handling

  document.addEventListener("resume", onResume, false);
  function onResume() {


  setTimeout(function() {
  console.log('resume');
  // $state.go("templates.doc_profile");//working
  // $state.go($state.current, {}, { reload: true, inherit: false, notify: true });
//
  }, 0);
  }

  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams,$localStorage){

  $rootScope.previousState = fromState;
  // console.log(toState.name.indexOf('app.patient_home'));
  if(toState.name.indexOf('app.patient_home') > -1)
  {
  // Restore platform default transition. We are just hardcoding android transitions to auth views.
  // $ionicConfig.views.transition(none);
  // If it's ios, then enable swipe back again
  if(ionic.Platform.isIOS())
  {
      $ionicConfig.views.transition('none');
      $ionicConfig.views.swipeBackEnabled(false);
  }
  else{
      $ionicConfig.views.transition('none');
  }
  console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
  }
  console.log(toState.name);
  console.log(fromState.name);

  if(!$rootScope.previousState && toState.name === "templates.doctor_home"){
    console.log('this is it');
    $state.go('templates.sendPrescription',{}, {location: "replace", reload: false});
  }

  if (toState.name != "app.searchDoctors") {
  $rootScope.sideMenuForSearch = false;
  }
  if (toState.name != "templates.invite_reviews") {
    $rootScope.inviteButton = false;
    $rootScope.hideSideMenu = true;
  }
  if (toState.name === "templates.doctor_home") {
    $rootScope.showNotification = true;
    	$rootScope.showBadge=true;
    // $rootScope.hideSideMenu = true;
  }
  if (toState.name != "templates.doctor_home") {
    $rootScope.showBackBtn=false;
    // $rootScope.hideSideMenu = true;
  }
  if (toState.name == "app.patient_summary") {
  // $rootScope.hideSideMenu = true;
  console.log('summary');
  }
  console.log($rootScope.previousState.name);
  $ionicPlatform.registerBackButtonAction(function (event) {
  console.log($state.$current.name);
  if ( ( $rootScope.previousState.name=="templates.diagnosisForPatient" || $rootScope.previousState.name=="templates.medicationForPatient") || $rootScope.previousState.name=="templates.patientTests"){
  // alert('route to home page and set the root to homepage');

  $rootScope.completeConsultation = $ionicPopup.show({
  template: "<div >Please send the prescription to complete the consultation</b></div>",
  cssClass: 'requestPopup',
  buttons: [
  {
  text: 'Ok',
  type: 'button-royal',
  onTap:function(){
  console.log('cancel');
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.nextViewOptions({
  disableAnimate: true,
  disableBack: true
  });
  // $state.go('templates.doctor_home',{}, {location: "replace", reload: false})
  }
  },
  ]
  });

  }
  else if($rootScope.previousState.name === "app.patient_summary" || $rootScope.previousState.name === "app.callAccepted") {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.nextViewOptions({
  disableBack: true,
  historyRoot: true
  });
  $state.go("app.patient_home");
  }
  else if($rootScope.previousState.name === "templates.prescription" && $state.$current.name === "templates.consulted_patient"){
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.nextViewOptions({
  disableBack: true,
  historyRoot: true
  });
  $state.go("templates.doctor_home");
  }
  else if($state.$current.name === "templates.prescription"){
  $rootScope.prescriptioAlert = $ionicPopup.show({
  title:"Alert!!!",
  template: "<div >Please send the prescription to the Patient</b></div>",
  cssClass: 'requestPopup',
  buttons: [
  {
  text: 'Ok',
  type: 'button-royal',
  onTap:function(){
  console.log('cancel');
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.nextViewOptions({
  disableAnimate: true,
  disableBack: true
  });
  // $state.go('templates.doctor_home',{}, {location: "replace", reload: false})
  }
  },
  ]
  });
  }
  else if($state.$current.name === "templates.sendPrescription"){
  // $ionicHistory.clearCache();
  // $ionicHistory.clearHistory();
  // $ionicHistory.nextViewOptions({
  //   disableAnimate: true,
  //   disableBack: true
  // });
  $state.go("templates.doctor_home")

  }
  else if($state.$current.name === "templates.doctor_home"){
    $rootScope.inviteButton = true;

  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.nextViewOptions({
  disableAnimate: true,
  disableBack: true
  });
  $state.go("templates.doctor_home",{reload:true})

  }
  else if($state.$current.name === "app.patient_home"){
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.nextViewOptions({
  disableAnimate: true,
  disableBack: true
  });
  $state.go("app.patient_home",{reload:true})

  }
  else {
  // For all other states, the H/W BACK button is enabled
  navigator.app.backHistory();
  }
  }, 1000);

  });
  })

// DoctorQuickApp.config(['$httpProvider', function($httpProvider) {
//   // $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
//
//
//     }
// ]);

DoctorQuickApp.config(function( $ionicConfigProvider) {
       $ionicConfigProvider.navBar.alignTitle('center');
      //  $ionicConfigProvider.views.transition('platform');
       $ionicConfigProvider.views.transition('none')


});

DoctorQuickApp.config(function($stateProvider, $httpProvider,$urlRouterProvider, $ionicConfigProvider,USER_ROLES) {
// $ionicConfigProvider.navBar.alignTitle('left')
  //INTRO
  $httpProvider.defaults.timeout = 5000;
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // $httpProvider.interceptors.push('Interceptor');
  $httpProvider.interceptors.push(function($q,$injector,$localStorage,$rootScope) {
    return {
          request: function (config) {
              //config.cache = true;
              config.timeout = 60000;
              return config;
          },
          responseError: function (rejection,response) {
            console.log(rejection);
            console.log(response);

            $rootScope.$watch('online', function(newValue, oldValue){
              console.log('newValue',newValue);
              console.log('oldValue',oldValue);
                   if (newValue !== oldValue) {
                      //  $rootScope.online=$rootScope.online;
                       $injector.get("$ionicLoading").hide();
                        // $injector.get("$state").reload()
                   }
                  // else if(newValue == false && oldValue == false || newValue == true && oldValue == true){
                  //    console.log('on');
                  //  }else{
                  //    console.log('offf');
                  //
                  //  }
               });

              switch (rejection.status) {
                // console.log(rejection.status);
                  // case 0 :  var $http = $injector.get('$http');//for retry condition
                  //           return $http(response.config);
                  //         break;
                  case -1 :
                      console.log('connection timed out!');
                      if($injector.get("$state").$current.name === "auth.loginNew"){
                        console.log('loginview');
                        // $injector.get("$ionicLoading").show({
                        //       template: '<ion-spinner></ion-spinner><br><br>Logging into DoctorQuick',
                        //       duration:30000
                        //     });
                              console.log($injector.get("$state").$current.name);

                                // window.location = "noresponse.html";
                                $injector.get("$ionicLoading").show({
                  						        template: '<ion-spinner></ion-spinner><br><br>Logging into DoctorQuick',

                  						      });
                      }
                      else{

                        $injector.get("$ionicLoading").show({
                              template: '<ion-spinner ></ion-spinner><br><br>Recovering lost connection',
                            });

                            // $injector.get("$ionicLoading").hide();
                            // $injector.get("$ionicLoading").hide().then(function(){
                            // console.log("The loading indicator is now hidden");
                            // // $injector.get("$ionicLoading").show({
                            // //       template: '<ion-spinner ></ion-spinner><br><br>Recovering lost connection',
                            // //     });
                            //
                            // });
                      }
                      break;
                  case 404 :
                      console.log('Error 404 - not found!');

                      break;
                  case 408 :
                      console.log('Timeout');
                      $injector.get("$ionicPopup").confirm({
                            // title: 'Unable to reach DoctorQuick servers',
                            template: '<center>Unable to reach DoctorQuick servers. Please check your connection and try again</center>',
                            cssClass: 'videoPopup',
                            // scope: $scope,
                            buttons: [
                              {
                                text: 'OK',
                                type: 'button-royal',
                                onTap: function(e) {
                                console.log('ok');
                                 console.log($localStorage.doctororpatient);
                                 if($localStorage.doctororpatient === "patient"){
                                   $injector.get("$state").go("app.patient_home");
                                 }
                                 else{
                                   $injector.get("$state").go("templates.doctor_home");
                                 }

                                }
                              },
                            ]
                          });

                      break;
              }
              return $q.reject(rejection);
          }
      }
    });



  $stateProvider
  .state('splash',{
    url:'/splash',
    templateUrl:'splash.html',
    controller : 'splashCtrl'
  })
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
  .state('auth.terms', {
    url: "/terms",
    templateUrl: "views/auth/terms.html"
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
        templateUrl: "views/app/changePassword_patient.html",
        controller:'changePatientPassWord'

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

.state('app.my_consultations',{
  url: "/my_consultations",
  views: {
    'menuContent': {
      templateUrl: "views/app/my_consultations.html",
      controller:'myconsultationsCtrl'
    }
  }
})

.state('app.patient_summary', {
  cache : false,
  url: "/patient_summary/:calledDoctor/:consultId",
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
.state('app.subPatientList', {
  cache : false,
  url: "/subPatientList",
  views: {
    'menuContent': {
      templateUrl: "views/app/subPatientList.html",
      controller:'addNewPatientCtrl'
    }
  }
})

.state('app.addSubPatient', {
  cache : false,
  url: "/addSubPatient",
  views: {
    'menuContent': {
      templateUrl: "views/app/addSubPatient.html",
      controller:'addNewPatientCtrl'
    }
  }
})
.state('app.editPatient', {
  cache : false,
  url: "/editPatient/:id/:fname/:lname/:sex/:dob",
  views: {
    'menuContent': {
      templateUrl: "views/app/editPatient.html",
      controller:'editPatientCtrl'
    }
  }
})

//doctore screens
  .state('app.specialityDetailsNew', {
    url: "/specialityDetailsNew",
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
          templateUrl: "views/app/results.html",
          controller:"searchDoctorsController"
        }
      }
    })

//doctor profile
  .state('app.viewdoctor_profile', {
    url: "/viewdoctor_profile/:rates/:totalRates",
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
    cache : false,
    url: "/callAccepted/:accptdDoc/:callId/:callFlag",
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
    templateUrl: "views/templates/doc-sidemenu.html",
    controller: 'doctorScreensCtrl'
  })

  .state('templates.loadingDoctor', {
    url: "/loadingDoctor",
    views: {
      'menuContent': {
        templateUrl: "views/templates/loadingDoctor.html",
          controller: 'loadingDoctor'
      }
    }
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
  .state('templates.testPrescription', {
    url: "/testPrescription",
    views: {
      'menuContent': {
        templateUrl: "views/templates/testPrescription.html",
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

  .state('templates.viewPatientRequest', {
    url: "/viewPatientRequest/:reqId/:reqPat/:reqTime",
    views: {
      'menuContent': {
        templateUrl: "views/templates/patientRequestfromPush.html",
          controller: 'patientrequestCtrl'
      }
    }
  })

  .state('templates.patientRequest', {
    url: "/patientRequest/:reqId/:reqPat/:reqTime",
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
        templateUrl: "views/templates/invite_reviews.html",
        controller:'contactsCtrl'
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

  .state('templates.prescription', {
    cache : false,
    url: "/notesForPatient/:reqPat",
    views: {
      'menuContent': {
        templateUrl: "views/templates/prescription.html",
        controller:'notesCtrl'
      }
    }
  })


  .state('templates.sendPrescription', {
    cache : false,
    url: "/sendPrescription/:reqPat",
    views: {
      'menuContent': {
        templateUrl: "views/templates/sendPrescription.html",
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

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/splash');
  $urlRouterProvider.otherwise(function($injector,$localStorage,$location,$rootScope) {
    var $state = $injector.get('$state');
    var Storage = $injector.get('$localStorage');
    var rootScope = $injector.get('$rootScope');

    console.log(Storage.sendPrescTo);
      var userType=Storage.doctororpatient;
      var userNum=Storage.user;
      console.log(userType);

      var get = getUrlVars();
      console.log('thisis after getting');
      console.log(get["phno"]);
      rootScope.pat_phnofromwebview = get["phno"];

      function getUrlVars() {
      var vars = {};
      /*Splits the variables into chuncks*/
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      /*Takes those chunks and removes anything after the hashtag*/
      vars[key] = value.replace(/#\b[^#]*$/gi, '');

      });

      console.log('from webviewactivity');
      console.log(vars);
      return vars;

      }
      if(rootScope.pat_phnofromwebview){
        if($localStorage.doctororpatient === "doctor" ){

    	      if($rootScope.pat_phnofromwebview){
    					console.log('Route to prescription view :)');
    	          $localStorage.onOff=2;
    	          $ionicLoading.show({
    	          template: '<ion-spinner></ion-spinner><br><br>Please Wait',
    	          duration:5000
    	          });
    	          console.log($rootScope.pat_phnofromwebview);
    	          $state.go('templates.sendPrescription',{"reqPat": $rootScope.pat_phnofromwebview},{location: "replace", reload: false});
    	          return '/templates/sendPrescription';
    	      }
            //
    	      // if($rootScope.deviceIOS === true){
    	      //   if($localStorage.sendPrescTo != ''){
    	      //     console.log("iosDevice:");
    	      //     console.log("iospatient:",$localStorage.sendPrescTo);
    	      //     $state.go('templates.sendPrescription',{"reqPat": $localStorage.sendPrescTo},{location: "replace", reload: false});
    	      //     return '/templates/sendPrescription';
    	      //   }
    	      // }



    	  }
      }
      else{
        console.log("normal routing");
        return '/splash';
      }

      // if(userType === 'doctor'){
      //
      //   return '/templates/doctor_home';
      // }
      //
      // else{
      //   return '/splash';
      // }

    });


});
