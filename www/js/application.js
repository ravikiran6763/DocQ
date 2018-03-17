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
  // 'ionic-datepicker',
  'ngMessages',
  // 'ion-alpha-scroll',
  // 'angular-circular-progress',
  'ionic-letter-avatar',
  'ionic.closePopup',
  'base64',
  // 'swipe.name'
  // 'ngImageCompress',
  // 'ngMaterial'
  // 'ionic.cloud'
])

DoctorQuickApp.run(['$rootScope', '$interval', function($rootScope, $interval,$ionicPlatform) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      //print here
      $interval.cancel($rootScope.loginInterval);
      //
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
// DoctorQuickApp.run(function($rootScope, $ionicPlatform, $ionicScrollDelegate){
//
//       $ionicPlatform.ready(function () {
//           if (window.cordova && window.cordova.plugins.Keyboard){
//               cordova.plugins.Keyboard.disableScroll(true); // This will prevent the view to bounce when inputs are on focus
//           }
//       });
//
//       // $rootScope.$on('$ionicView.loaded', function () {
//       //     if (window.cordova && window.cordova.plugins.Keyboard) {
//       //         cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false); // This makes the accessory bar visible and it only works when the view is loaded and DOM ready
//       //     }
//       // });
//
//       // window.addEventListener('native.keyboardshow', function () {
//       //     $ionicScrollDelegate.scrollBy(0, 1); //This will return focus to the current input once the keyboard slides-up in the view
//       // });
//
// });

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

DoctorQuickApp.run(function($ionicPlatform,$interval,$cordovaNetwork,$localStorage, $rootScope){
  $ionicPlatform.ready(function() {
    // window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
    // window.plugin.backgroundMode.enable();
    ionic.Platform.isFullScreen = true
    function successFunction() {
      // console.log("It worked!");
    }
    function errorFunction(error) {
        console.log(error);
      }

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    ionic.Platform.fullScreen();

    setTimeout(function() {
      console.log('hide splash ');
        // navigator.splashscreen.hide();
    }, 300);

    // window.MobileAccessibility.usePreferredTextZoom(true);
   function getTextZoomCallback(textZoom) {
     console.log('WebView text should be scaled to the preferred value ' + textZoom + '%')
   }
   window.MobileAccessibility.getTextZoom(getTextZoomCallback);

      // window.addEventListener('native.keyboardshow', function(e){
      //   setTimeout(function() {
      //     document.activeElement.scrollIntoViewIfNeeded();
      //   }, 100);
      // });
      window.addEventListener('native.keyboardshow', keyboardShowHandler);
document.addEventListener('focusout', function(e) {
  console.log('focused');
  window.scrollTo(0, 0);
});
function keyboardShowHandler(e){
    console.log('Keyboard height is: ' + e.keyboardHeight);
    // container.style.height = scrollViewOffsetHeight + "px";

}
   //    window.addEventListener('native.keyboardshow', function (e) {
   //     console.log('keyboard opened');
   // });

   window.addEventListener('native.keyboardhide', function () {

       console.log('keyboard closed');
   });

   var mailme = function() {
       console.log('Caught!');
   }

   window.addEventListener('error', function(e) {
       var ie = window.event || {};
       var errMsg = e.message || ie.errorMessage || "404 error on " + window.location;
       var errSrc = (e.filename || ie.errorUrl) + ': ' + (e.lineno || ie.errorLine);
       mailme([errMsg, errSrc]);
   }, true);


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

      window.localStorage.networkType = states[networkState];
      $rootScope.networkType = window.localStorage.networkType;
      // console.log('Connection type: ' + window.localStorage.networkType);
  }

})

DoctorQuickApp.run(function($state,$ionicPlatform,$window, $rootScope, $ionicConfig, $ionicPlatform,$interval,$localStorage,$ionicLoading, $cordovaDevice, $timeout,$injector,$ionicHistory, $cordovaKeyboard, $cordovaNetwork, $ionicPopup) {
  $ionicPlatform.on("deviceready", function(){

          var deviceID = device.uuid;
          window.localStorage.deviceID=deviceID;
          console.log(window.localStorage.deviceID);

          var deviceHardwareSerial = device.serial;
          window.localStorage.serial=deviceHardwareSerial;
          console.log(window.localStorage.serial);

          console.log(deviceHardwareSerial);

          if (ionic.Platform.isAndroid()) {
              window.addEventListener("native.hidekeyboard", function () {
                  StatusBar.hide();
                  window.AndroidFullScreen.immersiveMode(false, false);
              });
          }
          else {
          console.log("localStorage previous value",window.localStorage.sendPrescTo);
          window.localStorage.sendPrescTo = "";
          console.log("localStorage after value",window.localStorage.sendPrescTo);
          }
          //
          if(window.StatusBar){
          // StatusBar.styleDefault();
            // StatusBar.overlaysWebView(true);
            StatusBar.hide();
          }

          if (window.Connection){
            if (navigator.connection.type == Connection.NONE)
            {

            console.log("Internet is disconnected on your device");
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
          // AndroidFullScreen.immersiveMode(successFunction, errorFunction);
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
          console.log(window.localStorage.doctororpatient);

          $rootScope.deviceAndroid = ionic.Platform.isAndroid();
          $rootScope.deviceIOS = ionic.Platform.isIOS();

          if($rootScope.deviceIOS){
          console.log("iosDevice:",$rootScope.deviceIOS);
          }

          console.log('iospatientValue:',window.localStorage.sendPrescTo);

          if(window.localStorage.doctororpatient === "doctor" ){

          if($rootScope.pat_phnofromwebview){
          // window.localStorage.onOff=2;
          $ionicLoading.show({
          template: '<ion-spinner></ion-spinner><br><br>Please Wait',
          duration:5000
          });
          console.log($rootScope.pat_phnofromwebview);
          $state.go('templates.sendPrescription',{"reqPat": $rootScope.pat_phnofromwebview},{location: "replace", reload: false});
          return '/templates/sendPrescription';
          }

          if($rootScope.deviceIOS === true){
          if(window.localStorage.sendPrescTo != ''){
          console.log("iosDevice:");
          console.log("iospatient:",window.localStorage.sendPrescTo);
          $state.go('templates.sendPrescription',{"reqPat": window.localStorage.sendPrescTo},{location: "replace", reload: false});
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
          // window.localStorage.onOff=2;
          $ionicLoading.show({
          template: '<ion-spinner></ion-spinner><br><br>Please Wait',
          duration:5000
          });
          console.log($rootScope.pat_phnofromwebview);
          $state.go('templates.sendPrescription',{"reqPat": $rootScope.pat_phnofromwebview},{location: "replace", reload: false});
          return '/templates/sendPrescription';
          }

          if($rootScope.deviceIOS === true){
          if(window.localStorage.sendPrescTo != ''){
          console.log("iosDevice:");
          console.log("iospatient:",window.localStorage.sendPrescTo);
          $state.go('templates.sendPrescription',{"reqPat": window.localStorage.sendPrescTo},{location: "replace", reload: false});
          return '/templates/sendPrescription';
          }
          }
          }, 0);


          var permissions = cordova.plugins.permissions;
          // permissions.requestPermission(permissions.READ_CONTACTS, success, error);

          permissions.requestPermission(permissions.CAMERA, success, error);
          permissions.requestPermission(permissions.RECORD_AUDIO, success, error);

          function error() {
          console.warn('Turned on the permission');
          }

          function success( status ) {
          if( !status.hasPermission ) error();
          }

          //-------------------------------------ONESIGNAL PUSH SETUP---------------------
  });

  document.addEventListener("deviceready", (function() {
  console.log(AppVersion.version); // e.g. "1.2.3"
  console.log(AppVersion.build); // e.g. 1234

  window.localStorage.AppVersion=AppVersion.build;
  console.log(window.localStorage.AppVersion);

// cordova.plugins.market.open('com.greettech.DoctorQuick');
// cordova.plugins.market.search('version');

//   var newVersion = Jsoup
//                       .connect("https://play.google.com/store/apps/details?id=com.greettech.DoctorQuick&hl=en")
//                       .timeout(10000)
//                       .userAgent("Mozilla/5.0 (Windows; U; WindowsNT 5.1; en-US; rv1.8.1.6) Gecko/20070725 Firefox/2.0.0.6")
//                       .referrer("http://www.google.com").get()
//                       .select("widget[itemprop=version]").first()
//                       .ownText();
// console.log(newVersion);

  }), false);


  //cordova event handling
  document.addEventListener('deviceready', function () {
    console.log('splash hidden');
    navigator.splashscreen.hide();
  });
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
  console.log(toState.name.indexOf('app.patient_home'));
  console.log(toState.name.indexOf());
  if(toState.name.indexOf('auth.loginNew') > -1)
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
          $ionicConfig.views.transition('platform');
      }
      console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
  }
  console.log(toState.name);
  console.log(fromState.name);

//to stop back from update view
  if(!$rootScope.previousState && toState.name === "templates.doctor_home"){
    console.log('this is it');
    $state.go('templates.sendPrescription',{}, {location: "replace", reload: false});
  }

  if(!$rootScope.previousState && toState.name === "templates.doctor_home"){
    console.log('this is it');
    $state.go('templates.sendPrescription',{}, {location: "replace", reload: false});
  }

  if(toState.name === "templates.prescription" && fromState.name ==="templates.consulted_patient") {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
    disableBack: true,
    historyRoot: true
    });
    $state.go("templates.doctor_home");
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
  if( fromState.name === "templates.doctor_home"){
    console.log('this is it');
    $rootScope.specialdata=null;
    $rootScope.genderdata= null;
    $rootScope.statusdata=null;
    $rootScope.languagedataselected=null;

    $rootScope.specialityList.sex = "";
    $rootScope.specialityList.search = "";
    $rootScope.specialityList.stat = "";
    $rootScope.specialityList.language = "";

    var specialitywise = "";
    var catwise = "";
    var genderwise = "";
    var languagewise = "";

  }
  console.log($rootScope.previousState.name);
  $ionicPlatform.registerBackButtonAction(function (event){
      console.log($state.$current.name);
      if (( $rootScope.previousState.name==="templates.diagnosisForPatient" || $rootScope.previousState.name === "templates.medicationForPatient") || $rootScope.previousState.name ==="templates.patientTests"){
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
      else if($rootScope.previousState.name === "app.patient_summary" || $rootScope.previousState.name === "app.callAccepted"){
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
            // title:"Alert!!!",
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

          $state.go("templates.doctor_home")

      }
      else if($rootScope.previousState.name === "templates.sendPrescription"){

          $state.go("templates.doctor_home")

      }
      else if($state.$current.name === "templates.doctor_home"){
        // $ionicHistory.nextViewOptions({
        //     disableBack: true,
        //     disableAnimate: true,
        //     historyRoot: true
        // });
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
          $rootScope.inviteButton = false;
          // window.location.reload();

          $state.go("templates.doctor_home")

      }

      else if($state.$current.name === "app.patient_home"){
        console.log('reload homepage');
        // $ionicHistory.nextViewOptions({
        //     disableBack: true,
        //     disableAnimate: true,
        //     historyRoot: true
        // });
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
          $state.go($state.$current)
      }
      else if($state.$current.name === "auth.loginNew"){
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          // $ionicHistory.nextViewOptions({
          // disableAnimate: true,
          // disableBack: true
          // });

          $state.go("auth.loginNew")
      }

      else if($state.$current.name === 'app.searchDoctors'){
            console.log('clear search values here');
            $rootScope.specialdata=null;
            $rootScope.genderdata= null;
            $rootScope.statusdata=null;
            $rootScope.languagedataselected=null;

            $rootScope.specialityList.sex = "";
            $rootScope.specialityList.search = "";
            $rootScope.specialityList.stat = "";
            $rootScope.specialityList.language = "";

            var specialitywise = "";
            var catwise = "";
            var genderwise = "";
            var languagewise = "";

            // console.log($scope.specialdata);
            window.history.back();

      }

      else {
        console.log('goback to prev view');
        console.log($state.$current-1);
          // For all other states, the H/W BACK button is enabled
          // navigator.app.backHistory();
          window.history.back();
          // window.history.go(-(history.length - 1));
          // $ionicHistory.goBack();
      }
  }, 1000);

  });
  })


  DoctorQuickApp.config(['$provide', '$httpProvider', function($provide, $httpProvider) {
      $httpProvider.interceptors.push('RequestsErrorHandler');

      // --- Decorate $http to add a special header by default ---

      function addHeaderToConfig(config) {
          config = config || {};
          config.headers = config.headers || {};

          // Add the header unless user asked to handle errors himself
          if (!specificallyHandleInProgress) {
              config.headers[HEADER_NAME] = true;
          }

          return config;
      }

      // The rest here is mostly boilerplate needed to decorate $http safely
      $provide.decorator('$http', ['$delegate', function($delegate) {
          function decorateRegularCall(method) {
              return function(url, config) {
                  return $delegate[method](url, addHeaderToConfig(config));
              };
          }

          function decorateDataCall(method) {
              return function(url, data, config) {
                  return $delegate[method](url, data, addHeaderToConfig(config));
              };
          }

          function copyNotOverriddenAttributes(newHttp) {
              for (var attr in $delegate) {
                  if (!newHttp.hasOwnProperty(attr)) {
                      if (typeof($delegate[attr]) === 'function') {
                          newHttp[attr] = function() {
                              return $delegate[attr].apply($delegate, arguments);
                          };
                      } else {
                          newHttp[attr] = $delegate[attr];
                      }
                  }
              }
          }

          var newHttp = function(config) {
              return $delegate(addHeaderToConfig(config));
          };

          newHttp.get = decorateRegularCall('get');
          newHttp.delete = decorateRegularCall('delete');
          newHttp.head = decorateRegularCall('head');
          newHttp.jsonp = decorateRegularCall('jsonp');
          newHttp.post = decorateDataCall('post');
          newHttp.put = decorateDataCall('put');

          copyNotOverriddenAttributes(newHttp);

          return newHttp;
      }]);
  }])

DoctorQuickApp.config(function( $ionicConfigProvider) {
       $ionicConfigProvider.navBar.alignTitle('center');
       // $ionicConfigProvider.views.transition('platform');
       $ionicConfigProvider.views.transition('none')
       // $ionicConfigProvider.scrolling.jsScrolling(true);
});

DoctorQuickApp.config(function($stateProvider, $httpProvider,$urlRouterProvider, $ionicConfigProvider,USER_ROLES) {
// $ionicConfigProvider.navBar.alignTitle('left')
  //INTRO
  $httpProvider.defaults.timeout = 60000;
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // $httpProvider.interceptors.push('Interceptor');
  $httpProvider.interceptors.push(function($q,$injector,$localStorage,$rootScope) {
    return {
          request: function (config) {
              //config.cache = true;
              // config.timeout = 30000;
              return config;
          },
          responseError: function (rejection,response) {
            console.log(rejection);
            console.log(response);

            $rootScope.$watchCollection('[networkType, online]', function(newValues, oldValues){
                // do stuff here
                // newValues and oldValues contain the new and respectively old value
                // of the observed collection array
                console.log('newValues',newValues[0],newValues[1]);
                console.log('oldValues',oldValues[0],oldValues[1]);

            });


            $rootScope.$watch('networkType', function(newValue, oldValue){
              // console.log($injector.get("$localStorage").networkType);
              console.log('newValue',newValue);
              console.log('oldValue',oldValue);
              console.log($rootScope.online);

                   if (newValue ==='None' || newValue ==='Unknown' || newValue ==='Ethernet' ) {
                      //  $rootScope.online=$rootScope.online;
                        // $injector.get("$state").reload()
                   }
                   // else if( newValue ==='2G'){
                   //   $injector.get("$state").reload();
                   // }
                   // else if( newValue ==='2G' && oldValue ==='2G'){
                   //   $injector.get("$ionicLoading").hide();
                   // }
                   else{
                     $injector.get("$ionicLoading").hide();
                     // $injector.get("$state").reload();


                   }
                  // else if(newValue == false && oldValue == false || newValue == true && oldValue == true){
                  //    console.log('on');
                  //  }else{
                  //    console.log('offf');
                  //
                  //  }
               });
               console.log(rejection.status);

              switch (rejection.status) {
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
                                // $injector.get("$ionicLoading").show({
                  						  //       template: '<ion-spinner></ion-spinner><br><br>Recovering lost connection',
                  						  //     });
                      }
                      else{

                        $injector.get("$ionicLoading").show({
                              template: 'Recovering lost connection',
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
                                 console.log(window.localStorage.doctororpatient);
                                 if(window.localStorage.doctororpatient === "patient"){
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
    cache : false,
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.loginNew', {
    cache : false,
    url: '/loginNew',
    templateUrl: "views/auth/loginNew.html",
    controller : 'LoginCtrl'
  })

  .state('auth.getPassword', {
    cache : false,
    url: "/getPassword",
    templateUrl: "views/auth/getPassword.html",
    controller: 'ForgotPasswordCtrl'
  })
  .state('auth.terms', {
    cache : false,
    url: "/terms",
    templateUrl: "views/auth/terms.html"
  })




//newly added for Doctor
$stateProvider
.state('auth.doctorRegistration', {
  cache : false,
  url: "/doc_reg1",
  templateUrl: "views/auth/doc_reg1.html"

})
.state('auth.doctorRegistration2', {
  cache : false,
  url: "/doc_reg2",
  templateUrl: "views/auth/doc_reg2.html"
  })

//Patient
.state('auth.patient_reg1', {
  cache : false,
  url: "/patient_reg1",
  templateUrl: "views/auth/patient_reg1.html"

})

.state('auth.patient_reg2', {
  cache : false,
  url: "/patient_reg2",
  templateUrl: "views/auth/patient_reg2.html"

})

.state('auth.patient_reg3', {
  cache : false,
  url: "/patient_reg3/:pateientPhone",
  templateUrl: "views/auth/patient_reg3.html"

})

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/patient-side-menu.html"

  })

  .state('app.patient_home', {
    cache : false,
    url: "/patientScreens",
    // abstract: true,
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
        controller:'updatePatientDetailsCtrl'

      }
    }
  })

  .state('app.changeEmail_patient', {
    url: "/changeEmail_patient",
    views: {
      'menuContent': {
        templateUrl: "views/app/changeEmail_patient.html",
        controller:'updatePatientDetailsCtrl'

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

.state('app.termsOfuse', {
  url: "/termsOfuse",
  views: {
    'menuContent': {
      templateUrl: "views/app/termsOfuse.html",
      controller:'termsCtrl'
    }
  }
})

//medical_speciality
.state('app.medical_speciality', {
  url: "/medical_speciality",
  views: {
    'menuContent': {
      templateUrl: "views/app/medical_speciality.html",
      controller:"specilityListCtrl"
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
  url: "/editPatient",
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
      controller:"SearchCtrl"

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
      url: "/results",
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

  .state('templates.changeEmail_doctor', {
    url: "/changeEmail_doctor",
    views: {
      'menuContent': {
        templateUrl: "views/templates/changeEmail_doctor.html",
        controller:'updateDoctorDetailsCtrl'

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
    url: "/invite_reviews/:countofselected",
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
    url: "/inviteresult",
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
        templateUrl: "views/templates/updatePassword.html",
        controller:'updateDoctorDetailsCtrl'
      }
    }
  })
;

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/auth/loginNew');

$urlRouterProvider.otherwise(function($injector,$localStorage,$window,$location,$rootScope) {

  var $state = $injector.get('$state');
  var Storage = $injector.get('$localStorage');
  var rootScope = $injector.get('$rootScope');

  console.log(window.localStorage.doctororpatient);
  console.log(window.localStorage.doctororpatient);

  if(window.localStorage.doctororpatient === 'doctor'){
    Storage.showConnecting = true;
    console.log(window.localStorage.sendPrescTo);
      var userType=window.localStorage.doctororpatient;
      var userNum=window.localStorage.user;
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
      if(window.localStorage.doctororpatient === "doctor" ){

          if(rootScope.pat_phnofromwebview){
            console.log('Route to prescription view :)');
              Storage.showConnecting = false;
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
          //   if(window.localStorage.sendPrescTo != ''){
          //     console.log("iosDevice:");
          //     console.log("iospatient:",window.localStorage.sendPrescTo);
          //     $state.go('templates.sendPrescription',{"reqPat": window.localStorage.sendPrescTo},{location: "replace", reload: false});
          //     return '/templates/sendPrescription';
          //   }
          // }



      }
    }
    else{
      console.log("normal routing");
      return '/templates/doctor_home';

    }
  }
  else if(window.localStorage.doctororpatient === 'patient'){
    Storage.showConnecting = true;
    return '/app/patientScreens';
  }
  else{
    Storage.showConnecting = false;
    return '/auth/loginNew';
  }

});

  // $urlRouterProvider.otherwise(function($injector,$localStorage,$location,$rootScope) {
  //   var $state = $injector.get('$state');
  //   var Storage = $injector.get('$localStorage');
  //   var rootScope = $injector.get('$rootScope');
  //
  //   console.log(Storage.sendPrescTo);
  //     var userType=Storage.doctororpatient;
  //     var userNum=Storage.user;
  //     console.log(userType);
  //
  //     var get = getUrlVars();
  //     console.log('thisis after getting');
  //     console.log(get["phno"]);
  //     rootScope.pat_phnofromwebview = get["phno"];
  //
  //     function getUrlVars() {
  //     var vars = {};
  //     /*Splits the variables into chuncks*/
  //     var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
  //     /*Takes those chunks and removes anything after the hashtag*/
  //     vars[key] = value.replace(/#\b[^#]*$/gi, '');
  //
  //     });
  //
  //     console.log('from webviewactivity');
  //     console.log(vars);
  //     return vars;
  //
  //     }
  //     if(rootScope.pat_phnofromwebview){
  //       if(window.localStorage.doctororpatient === "doctor" ){
  //
  //   	      if($rootScope.pat_phnofromwebview){
  //   					console.log('Route to prescription view :)');
  //   	          window.localStorage.onOff=2;
  //   	          $ionicLoading.show({
  //   	          template: '<ion-spinner></ion-spinner><br><br>Please Wait',
  //   	          duration:5000
  //   	          });
  //   	          console.log($rootScope.pat_phnofromwebview);
  //   	          $state.go('templates.sendPrescription',{"reqPat": $rootScope.pat_phnofromwebview},{location: "replace", reload: false});
  //   	          return '/templates/sendPrescription';
  //   	      }
  //           //
  //   	      // if($rootScope.deviceIOS === true){
  //   	      //   if(window.localStorage.sendPrescTo != ''){
  //   	      //     console.log("iosDevice:");
  //   	      //     console.log("iospatient:",window.localStorage.sendPrescTo);
  //   	      //     $state.go('templates.sendPrescription',{"reqPat": window.localStorage.sendPrescTo},{location: "replace", reload: false});
  //   	      //     return '/templates/sendPrescription';
  //   	      //   }
  //   	      // }
  //
  //
  //
  //   	  }
  //     }
  //     else{
  //       console.log("normal routing");
  //       return '/splash';
  //     }
  //
  //     // if(userType === 'doctor'){
  //     //
  //     //   return '/templates/doctor_home';
  //     // }
  //     //
  //     // else{
  //     //   return '/splash';
  //     // }
  //
  //   });


});

/*globals angular */

'use strict';

/**
 * Contains the Constants, which are available across the app.
 * @author Ravikiran
 */
DoctorQuickApp.constant('BASE_URL', {

        //testing
        // 'url' : 'http://ec2-52-66-68-161.ap-south-1.compute.amazonaws.com/'
        //Staging doctorquickservices
        // 'url' : 'http://ec2-35-154-118-177.ap-south-1.compute.amazonaws.com/'
        //Development services.doctorquick
        //stage 1
        // 'url' : 'http://ec2-35-154-234-29.ap-south-1.compute.amazonaws.com/'
        //stage 2
        'url' : 'http://ec2-13-126-101-210.ap-south-1.compute.amazonaws.com/'

    })
.constant('API', {
          /*COMMON APIS*/

        // 'patientRegistration':'DQ/patientegistration.php',

        // 'login': 'common/test.php',
        'login': 'common/dqLogin.php',
        'logout': 'common/logout.php',
        'ForgotPassword': 'common/forgotPassword.php',
        'payuFailure': 'common/payuFailure.php',
        'payuSucces': 'common/payuSucces.php',
        'languages': 'common/languages.php',
        'updatePlayer': 'common/updatePlayer.php',
        'alreadyLoggedIn': 'common/alreadyLoggedIn.php',
        'pingToServer': 'common/ping.php',


        /*PATIENT APIS*/
        'patientRegistration' :'patient/patientRegistration.php',
        'patientDetails'      :'patient/patientDetails.php',
        'fetchMyDoctors'      :'patient/fetchMyDoctors.php',
        'myConsultations'     :'patient/myConsultations.php',
        'myWalletBalance'     :'patient/myWalletBalance.php',
        'paidForConsultations':'patient/paidForConsultations.php',
        'patientQuery'        :'patient/patientQuery.php',
        'paientCallBack'      :'patient/paientCallBack.php',
        'getMedicalSpecialist' : 'patient/listallspecialities.php',
        'fetchSpecificSpeciality' : 'patient/fetchSpecificSpeciality.php',
        'fetchSpecificDoctor'     :'patient/fetchSpecificDoctor.php',
        'specificSearch'     :'patient/specificSearch.php',
        'doctorbydifferentscenario' : 'patient/doctorlist.php',
        'sendrequesttodoctor' : 'patient/sendrequesttodoctor.php',
        'requestForCall' : 'patient/requestForCall.php',
        'cancelOne2oneReq' : 'patient/cancelOne2oneReq.php',
        'sendOfflineMessage' : 'patient/sendOfflineMessage.php',
        'sendNotification' : 'patient/sendNotification.php',
        'getMyDoctorRatings':'patient/getMyDoctorRatings.php',
        'getDocRatingsByAll' : 'patient/getDocRatingsByAll.php',
        'docSummary' : 'patient/docSummary.php',
        'topMeup' : 'patient/topMeUp.php',
        'refundRequest' : 'patient/refundRequest.php',

        'callAccepted' : 'patient/callAccepted.php',
        'callDecline' : 'patient/callDecline.php',
        'cancelCallReq' : 'patient/cancelCallReq.php',
        'popupSeen' : 'patient/popupSeen.php',
        'uploadImage' : 'patient/uploadImage.php',
        'changePatientPwd':'patient/changePatientPwd.php',
        'callaccepteddoctor':'patient/insertintomyconsultations.php',
        'existingPatient' : 'patient/existingPatient.php',
        'sendotp' : 'patient/sendotp.php',
        'savePatient':'patient/savePatient.php',
        'editNewPatient':'patient/editNewPatient.php',
        'rateMyDoctor':'patient/rateMyDoctortodoctordetails.php',
        'addToFavorite':'patient/addToFavorite.php',
        'checkForAccptedReq':'patient/checkForAccptedReq.php',
        'updateseenView':'patient/updateseenView.php',
        'declinedDuringCall':'patient/declinedDuringCall.php',
        'fetchPatientImage':'patient/fetchPatientImage.php',
        'checkCallStatus':'patient/checkCallStatus.php',
        'declineOne2oneReqPatient':'patient/declineOne2oneReqPatient.php',
        'getSubPatients':'patient/getSubPatients.php',
        'selectSubPatient':'patient/selectSubPatient.php',
        'deletePatient':'patient/deletePatient.php',
        'claimFreeConsultation':'patient/claimFreeConsultation.php',
        'checkEmailVerification':'patient/checkEmailVerification.php',
        'sendVerificationMail':'patient/sendVerificationMail.php',
        'updateEmail':'patient/updateEmail.php',
        'firstConsultation':'patient/firstConsultation.php',


        'verifyemail':'verifyemail/verifyemail.php',
        'checkDocStatusOnTheGo':'patient/checkDocStatusOnTheGo.php',
        'removeFavDoctor':'patient/removeFavDoctor.php',


        /*AGENT*/
        'agentDetails':'dqagent/dqAgentLogin.php',


        /*DOCTOR APIS*/
        'doctorRegistration'  :'doctor/doctorRegistration.php',
        'doctorDetails':'doctor/doctorDetails.php',
        'myConsultedPatients':'doctor/myConsultedPatients.php',
        'resendOtp':'DQ/resendOtp.php',
        'changePassword': 'changePassword',
        'invitereviews' : 'doctor/invitereview.php',
        'getdoctorrequest' : 'doctor/getdoctorrequestfrompatient.php',
        'consultationRequest' : 'doctor/consultationRequest.php',
        'currentPatient' : 'doctor/currentPatient.php',

        'fetchOne2OneReq' : 'doctor/fetchOne2OneReq.php',
        'requestacceptedbydoctor':  'doctor/acceptedpatientreqbydoctor.php',
        'declinedbydoctor':'doctor/declinedbydoctor.php',
        'acceptedbydoctor':'doctor/acceptedbydoctor.php',
        'cancelByDoc':'doctor/cancelByDoc.php',
        'patientActivity':'doctor/patientActivity.php',
        'checkIdStatus':'doctor/checkIdStatus.php',
        'videoOrAudio':'doctor/videoOrAudio.php',
        'doctorActivity':'doctor/doctorActivity.php',
        'updateNotes':'doctor/updateNotes.php',
        'docAccountsBalance' : 'doctor/docAccountsBalance.php',
        'docAccDetails' : 'doctor/docAccDetails.php',
        'reqPatientDetails' : 'doctor/reqPatientDetails.php',
        'updateDocPassword':'doctor/updateDocPassword.php',
        'createChatHistory':'doctor/createChatHistory.php',
        'createChatHistoryIos':'doctor/createChatHistoryios.php',
        'createChatHistoryIosforDoctor':'doctor/createChatHistoryIosforDoctor.php',
        'createChatHistoryforDoctor':'doctor/createChatHistoryforDoctor.php',
        'fetchChatHistory':'doctor/fetchChatHistory.php',
        'callStatus':'doctor/callStatus.php',
        'pushReqStatus':'doctor/pushReqStatus.php',
        'doctorQuery'  :'doctor/doctorQuery.php',
        'testjpegimage' :'prescription/responseasimages.php',
        'fetchAllDoctors':'DQ/fetchDoctors.php',
        'sidemenulist':'DQ/sidemenulist.php',
        'patientTrasactionHistory':'DQ/patientWallet/patientTrasactionHistory.php',

        /*  DOCTOR ON OFF API */
        'doctoronoffconditions':'doctor/doctoronoffline.php',
        'doctorStatus':'doctor/doctorStatus.php',

        'notifyPatient':'doctor/notifyPatient.php',
        'generateTinyUrl':'doctor/generateTinyUrl.php',
        'doctorEmailVerification':'doctor/doctorEmailVerification.php',
        'updateDoctorEmail':'doctor/updateDoctorEmail.php',
        'sendVerificationMailToDoc':'doctor/sendVerificationMailToDoc.php',
        'doctorDeviceUpdate':'doctor/doctorDeviceUpdate.php',
        'invitereviewforall':'doctor/invitereviewforall.php',
        'getonlysinglecontact':'doctor/getonlysinglecontact.php',




    })
.constant('AUTH_EVENTS', {
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
      })

.constant('USER_ROLES', {
      admin: 'admin_role',
      public: 'public_role'
      });

angular.module('DoctorQuick.config', [])
.constant('GCM_SENDER_ID', '310212728810')
;

DoctorQuickApp.controller('contactsCtrl', function($scope,$filter,$rootScope, $cordovaContacts, $state,$stateParams, $ionicLoading, $timeout, invitereviews){

    $scope.toggle = true;
    $rootScope.headerTxt="Invite Reviews";
    $rootScope.showBackBtn=true;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;
    $rootScope.hideSideMenu = false;
    $rootScope.inviteButton = true;


    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";
    // console.log($stateParams.countofselected);

    $rootScope.contact = {};
    $scope.phoneContacts = [];
    $rootScope.contact1 = {};
    $rootScope.uniquename = {};
    // $rootScope.con = {};
    $rootScope.allcontacts = [];
    $rootScope.allcontacts.checked = false;

    $rootScope.allContacts = invitereviews.getinvitecontacts();
    for (var i = 0; i < $rootScope.allContacts.length; i++) {

      $rootScope.contact = $rootScope.allContacts[i];

    }

    invitereviews.getonlysinglecontact($rootScope.contact).then(function(response){
    //window.localStorage['allConatctsFetched'] = angular.toJson(response);
    $rootScope.contact1 = response;
    console.log(response);

    $ionicLoading.hide();
    }).catch(function(error){
    console.log('failure data', error);
    })

    angular.forEach($rootScope.contact1, function(value,key) {

        $rootScope.con.checked = $rootScope.allcontacts.checked;
        console.log($rootScope.con.checked);


    });

    $scope.checkAll = function()
    {


            $ionicLoading.show({
            template: '<p>Selecting All contacts</p>'
            });

            // console.log($rootScope.contact.length);
            // console.log($scope.allcontacts);

            var toggleStatus = $scope.allcontacts;
            if(toggleStatus)
            {

                    var i = 0;
                    angular.forEach($rootScope.contact1, function(itm)
                    {
                        itm.selected = toggleStatus;
                        i++;

                        console.log(i);
                    });

                    if(i== $rootScope.contact.length)
                    {
                            console.log($rootScope.contact.length);
                            console.log(i);
                            $ionicLoading.hide();
                    }

            }
            else {

                    console.log('ALL CONATCTS UNSELECTED');
                    angular.forEach($rootScope.contact1, function(itm)
                    {
                      itm.selected = toggleStatus;
                    });
            }


            if(i>0)
            {

              $ionicLoading.hide();

            }
    }


    $scope.optionToggled = function(checkedvalue,value){

            $scope.allcontacts = $rootScope.contact1.every(function(itm){
              var togglevaue;
              return itm.selected;
            })
    }



});

// APP
DoctorQuickApp.controller('diagnosisCtrl', function($scope,$state,$rootScope,$stateParams,$ionicConfig,$localStorage,testresultbydoctor) {

		$scope.toggle = true;
		$rootScope.headerTxt="Diagnosis";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.hideSideMenu = false;
		$rootScope.showBadge=false;
		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;
		// $rootScope.prescription={};
		if($rootScope.chekDiag === false){
			$rootScope.val= "";
			$rootScope.prescription.diagnosisforpatient="";
		}


		$scope.clear=function()
		{
				$rootScope.prescription.diagnosisforpatient="";
				$rootScope.chekDiag=false;
				$rootScope.val= "";
		}
})

DoctorQuickApp.controller('patientTestsCtrl', function($scope,$state,$rootScope,$stateParams,$ionicConfig,testresultbydoctor) {

		$rootScope.user={};
		$scope.notes = {};
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$scope.toggle = true;
		$rootScope.headerTxt="Test Recommended";
		$rootScope.showBackBtn=true;
		$rootScope.hideSideMenu = false;

		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;

		// $rootScope.prescription={};
		if($rootScope.chekTests === false){
			$rootScope.testVal= "";
			$rootScope.prescription.checkedTests="";
		}
		$scope.clear=function()
		{
				$rootScope.prescription.checkedTests="";
				$rootScope.chekTests=false;
				$rootScope.testVal= "";

		}

})

DoctorQuickApp.controller('medicationCtrl', function($scope,$rootScope, $stateParams,$state,$ionicConfig,testresultbydoctor) {

		$scope.toggle = true;
		$rootScope.headerTxt="Medication";
		$rootScope.showBackBtn=true;
		$rootScope.showNotification=false;
		$rootScope.showBadge=false;
		$rootScope.hideSideMenu = false;
		$scope.medication={};

		$scope.patientfname = $stateParams.ptFname;
		$scope.patientlname = $stateParams.ptLname;
		$scope.patientImage = $stateParams.ptImage;
		$scope.patientPhone = $stateParams.ptPh;
		// $rootScope.prescription={};
		if($rootScope.chekMedi === false){
			$rootScope.mediVal = "";
			$rootScope.prescription.medicationforpatient="";
		}


		$scope.clear=function()
		{
			$rootScope.prescription.medicationforpatient="";
			$rootScope.chekMedi=false;
			$rootScope.mediVal = "";
		}

})


DoctorQuickApp.controller('sendPrescriptionCtrl', function($scope,$rootScope,$stateParams,$localStorage,$timeout,$window, $ionicConfig) {
  $scope.toggle = true;
	$rootScope.headerTxt="Prescription";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	alert($stateParams.reqPat);

})

DoctorQuickApp.controller('SearchCtrl', function($scope,$rootScope,$stateParams,$localStorage,$timeout,$window, $ionicConfig) {
  $scope.toggle = true;
	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

	// alert($stateParams.reqPat);

})


DoctorQuickApp.controller('specilityListCtrl', function($scope,$rootScope,$state,$stateParams,$localStorage,$timeout,$window,$interval, $ionicConfig) {
	$rootScope.headerTxt="Medical Speciality";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.showSubPatients=false;

	$scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);
	console.log($scope.specialitiesList);

	// alert($stateParams.reqPat);
	$scope.specialityDetailsNew=function(index,id){
 	 console.log(id);
 	 // $ionicLoading.show({
 	 //   template:'<ion-spinner></ion-spinner>'
 	 // })
 	 window.localStorage.SpecilityIndex=index;
 	 window.localStorage.SpecilityId=id;
 	 // $interval(CheckOnlineDocs, 2000);

 	 $state.go("app.specialityDetailsNew");

  }
})

DoctorQuickApp.controller('doc_customercareCtrl', function($scope,$rootScope, $ionicConfig) {
  $scope.toggle = true;
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

})
DoctorQuickApp.controller('updateDoctorDetailsCtrl', function($scope,$state,$rootScope,$ionicPopup,$cordovaToast, $ionicConfig,$localStorage,$ionicLoading,doctorServices) {
				$scope.toggle = true;
				$rootScope.headerTxt="Profile";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;
				$rootScope.showDocStatus=false;

				doctorServices.doctorEmailVerification(window.localStorage.user).then(function(response){
				$rootScope.email=response;
				if($rootScope.email == 1){
				$rootScope.emailVerified = false;
				$rootScope.Verified = false;

				}
				if($rootScope.email == 2){
				$rootScope.emailVerified = true;
				$rootScope.Verified = true;

				}

				$ionicLoading.hide();
				console.log($scope.email);

				}).catch(function(error){
				console.log('failure data', error);
				})

				$scope.emailToUpdate={};
				$scope.updateDoctorEmail = function(){
							$ionicLoading.show({
								template:'<ion-spinner></ion-spinner>'
							})
							console.log($scope.emailToUpdate.email);
							console.log($scope.emailToUpdate.verify);

							if(!$scope.emailToUpdate.email || !$scope.emailToUpdate.verify){
										// alert('empty');
										$ionicLoading.hide();

										window.plugins.toast.showWithOptions({
										message: "Enter a valid email id",
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
							else if($scope.emailToUpdate.email != $scope.emailToUpdate.verify){
								$ionicLoading.hide();

								console.log('toast here');
								window.plugins.toast.showWithOptions({
								message: "Check your mail id",
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
							else if($scope.emailToUpdate.email === $scope.emailToUpdate.verify){
							var emailDetails={
							newMail:$scope.emailToUpdate.email,
							phone:window.localStorage.user
							}
							console.log('verified');
							doctorServices.updateDoctorEmail(emailDetails).then(function(response){

							$rootScope.emailSent=response;
							if(response === 'MailSent'){
								$ionicLoading.hide();
							var confirmPopup = $ionicPopup.confirm({
								// title: 'DoctorQuick',
								template: '<center>Click the link in the email sent to you to complete your registration process</center>',
								// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
								cssClass: 'videoPopup',
								scope: $scope,
								buttons: [
									{
										text: 'OK',
										type: 'button-assertive',
										onTap: function(e) {
										console.log('offline');
										// $state.go("templates.doc_profile");
										}
									},
								]
							});
							}
							console.log($rootScope.emailSent);
							}).catch(function(error){
							console.log('failure data', error);
							})
							}
							else{
							console.log('check the mail id');
							}


				};

				$scope.sendVerificationMailToDoc = function(){
						$ionicLoading.show({
							template:'<ion-spinner></ion-spinner>'
						})
						console.log('send mail');
						doctorServices.sendVerificationMailToDoc(window.localStorage.user).then(function(response){

						if(response === 'MailSent'){
							$ionicLoading.hide();
						console.log('toast here');
						var confirmPopup = $ionicPopup.confirm({
						// title: 'DoctorQuick',
						template: '<center>Click the link in the email sent to you to complete your registration process</center>',
						// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
							{
								text: 'OK',
								type: 'button-assertive',
								onTap: function(e) {
								console.log('offline');
								// $state.go("templates.doctor_home");
								}
							},
						]
						});
						}
						$rootScope.emailSent=response;
						console.log($rootScope.emailSent);
						}).catch(function(error){
						console.log('failure data', error);
						})
				};


})

DoctorQuickApp.controller('updatePatientDetailsCtrl', function($scope,$state,$rootScope,$ionicLoading,$ionicPopup,$cordovaToast, $ionicConfig,$localStorage,patientProfileDetailsService) {
				$scope.toggle = true;
				$rootScope.headerTxt="Profile";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.showBadge=false;
				$rootScope.showDocStatus=false;

				console.log('update controller active');
				patientProfileDetailsService.emailVerification(window.localStorage.user).then(function(response){
				$rootScope.email=response;
				if($rootScope.email == 1){
				$rootScope.emailVerified = false;
				$rootScope.Verified = false;

				}
				if($rootScope.email == 2){
				$rootScope.emailVerified = true;
				$rootScope.Verified = true;

				}

				$ionicLoading.hide();
				console.log($scope.email);

				}).catch(function(error){
				console.log('failure data', error);
				})

				$scope.sendVerificationMail = function(){
				console.log('send mail');
				$ionicLoading.show({
					template:'<ion-spinner></ion-spinner>'
				})
				patientProfileDetailsService.sendVerificationMail(window.localStorage.user).then(function(response){

				$rootScope.emailSent=response;
				if(response){
					$ionicLoading.hide();
				var confirmPopup = $ionicPopup.confirm({
				// title: 'DoctorQuick',
				template: '<center>Click the link in the email sent to you to complete your registration process</center>',
				// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
				cssClass: 'videoPopup',
				scope: $scope,
				buttons: [
				{
					text: 'OK',
					type: 'button-assertive',
					onTap: function(e) {
					// $state.go("app.patient_profile");
					}
				},
				]
				});
				}
				console.log($rootScope.emailSent);
				}).catch(function(error){
				console.log('failure data', error);
				})
				};


				$scope.emailToUpdate={};
				$scope.updateEmail = function(){
					$ionicLoading.show({
						template:'<ion-spinner><ion-spinner>'
					})
				console.log($scope.emailToUpdate.email);
				console.log($scope.emailToUpdate.verify);

				if(!$scope.emailToUpdate.email || !$scope.emailToUpdate.verify){
									$ionicLoading.hide();
								// alert('empty');
								window.plugins.toast.showWithOptions({
								message: "Enter a valid email id",
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
				else if($scope.emailToUpdate.email != $scope.emailToUpdate.verify){
								$ionicLoading.hide();

								console.log('toast here');
								window.plugins.toast.showWithOptions({
								message: "Check your mail id",
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
				else if($scope.emailToUpdate.email === $scope.emailToUpdate.verify){
				console.log('verified');
				var mailData={
				newMail:$scope.emailToUpdate.email,
				phone:window.localStorage.user
				}
				patientProfileDetailsService.updateEmail(mailData).then(function(response){

							$rootScope.emailSent=response;
							if(response){
							// alert('sent');
							$ionicLoading.hide();
							var confirmPopup = $ionicPopup.confirm({
							// title: 'DoctorQuick',
							template: '<center>Click the link in the email sent to you to complete your registration process</center>',
							// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
							cssClass: 'videoPopup',
							scope: $scope,
							buttons: [
								{
									text: 'OK',
									type: 'button-assertive',
									onTap: function(e) {
									console.log('offline');
									$scope.emailToUpdate={};

										// $state.go("app.patient_profile",{reload:false});
									}
								},
							]
							});
							}
							console.log($rootScope.emailSent);
				}).catch(function(error){
				console.log('failure data', error);
				})
				}

				// An email confiramtion link to your email address has been sent. Click the link in that email to complete  registering your email. Make suure to check your spam box in case it got filtered
				else{
				console.log('check the mail id');
				}


				};


})

DoctorQuickApp.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};
	$scope.doSignUp = function(){
		$state.go('app.patient_home');
	};
})
//newly added for DQ
DoctorQuickApp.controller('DocRegController', function($scope,$rootScope, $state,data) {
			//alert('hello');
			$scope.doc={};
			$scope.reg_doc=function(){
				data.doctor_reg($scope.doc.doc_fname,$scope.doc.doc_mname,$scope.doc.doc_lname);

			}
			$rootScope.showBackBtn=true;


})

DoctorQuickApp.controller('reviewCtrl', function($scope,$rootScope, $ionicConfig) {

		$scope.toggle = false;
	 	$rootScope.headerTxt="Invite Reviews";
		$rootScope.showBackBtn=true;
		$rootScope.checkedValue = false;
		$rootScope.showBadge=false;
		$rootScope.showDocStatus=false;


})

// DoctorQuickApp.controller('myconsultationsCtrl', function($scope,$rootScope,$ionicConfig, $http) {
// 	$rootScope.headerTxt="My Consultations";
// 	$rootScope.showBackBtn=true;
// 	$rootScope.checkedValue = false;
//
// })
//
// DoctorQuickApp.controller('patientCareCtrl', function($scope,$rootScope,$ionicConfig, $http) {
// 	$rootScope.headerTxt="Customer Care";
// 	$rootScope.showBackBtn=true;
// 	$rootScope.checkedValue = false;
//
// })

DoctorQuickApp.controller('termsCtrl', function($scope,$rootScope, $ionicConfig) {
	$scope.toggle = true;
	$rootScope.headerTxt="Terms Of Use";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;

})

DoctorQuickApp.controller('splashCtrl',function($rootScope,$timeout,$ionicLoading,$localStorage,$interval,$window,$scope,$state,$ionicHistory,LoginService){
	$timeout(function(){
	// console.log(window.localStorage.doctororpatient);

		$ionicLoading.show({
		template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
		});
		if(window.localStorage.doctororpatient === 'patient'){
				// $state.go('app.patient_home',{}, {location: "replace", reload: false})//for browser login
				window.plugins.OneSignal.getIds(function(ids){
				//document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
				//document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
				console.log(JSON.stringify(ids['userId']));
				$scope.playerId=JSON.stringify(ids['userId']);
				console.log($scope.playerId);
				var updatePlayer ={
					palyerId:$scope.playerId,
					userNum:window.localStorage.user,
					user:'patient'
				}
				console.log(updatePlayer);
				LoginService.updatePlayer(updatePlayer).then(function(response){
				console.log(response);
				})
				});
				$scope.deviceAndroid = ionic.Platform.isAndroid();
				console.log($scope.deviceAndroid);
				var uname1 = "greet+"+window.localStorage.user;
				var pw1 = "DQ_patient";
				if($scope.deviceAndroid === true){

											var success = function(message)
											{
												$ionicLoading.hide().then(function(){
											  console.log("The loading indicator is now hidden");
											  // alert('loggedin');
											  $ionicHistory.nextViewOptions({
											  disableAnimate: true,
											  disableBack: true
											  });
											  $interval.cancel(loginStatus);
											  $state.go('app.patient_home', {}, {location: "replace", reload: false});
											  });
											}
											var failure = function()
											{
											alert("Error calling Hello Plugin");
											}
											hello.login(uname1,pw1,success, failure);

											$timeout( function(){
											console.log('interval started');
											$interval(checkNewMessages,1000);

											}, 3000);
											var username = "greet+"+window.localStorage.user;
											var password = "DQ_patient";
											function checkNewMessages()
											{
											  var success = function(message)
											  {
											    $rootScope.unreadchatforpatient = message;
											    console.log($scope.unreadchatforpatient);
											  }

											  var failure = function()
											  {
											    console.log("Error calling Hello Plugin");
											    //console.log(‘error’);

											  }
											    hello.unreadchatfromusers(username,password,success, failure);
											}
				}
				else{

									$ionicLoading.show({
									template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
									});
									var success = function(message)
									{
									console.log(message);
									$scope.iosLoggin=message;

									}
									var failure = function()
									{

									alert("Error calling Hello Plugin");

									}

									// $state.go('app.patient_home');//for browser login
									hello.login(uname1,pw1,success, failure);

									$timeout( function(){
									console.log('interval started');
									$interval($rootScope.loginInterval,2000,1);
									// $interval(checkNewMessages,2000);

									}, 10000 );

									var username = "greet+"+window.localStorage.user;
									var password = "DQ_patient";
									function checkNewMessages()
									{
									var success = function(message)
									{
									$rootScope.unreadchatforpatient = message;
									console.log($scope.unreadchatforpatient);
									}

									var failure = function()
									{
									console.log("Error calling Hello Plugin");
									//console.log(‘error’);

									}
									hello.unreadchatfromusers(username,password,success, failure);
									}



									$rootScope.loginInterval = function() {
									var success = function(message)
									{
									// alert(message);
									$ionicLoading.hide().then(function(){
									console.log("The loading indicator is now hidden");
									// alert('loggedin');
									$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
									});
									$interval.cancel($rootScope.loginInterval);
									$state.go('app.patient_home', {}, {location: "replace", reload: false});
									});

									}

									var failure = function()
									{
									alert("Error Occurred While Loggin in to DoctoQuick");
									}
									hello.loginstatus(success,failure);
									}

				}

		}
		else if(window.localStorage.doctororpatient === 'doctor'){
				window.plugins.OneSignal.getIds(function(ids) {
				$scope.playerId=JSON.stringify(ids['userId']);
				// console.log($scope.playerId);
				var updatePlayer ={
				palyerId:$scope.playerId,
				userNum:window.localStorage.user,
				user:'doctor'
				}
				console.log(updatePlayer);
				LoginService.updatePlayer(updatePlayer).then(function(response){
				console.log(response);
				})
				});
				$scope.deviceAndroid = ionic.Platform.isAndroid();
				console.log($scope.deviceAndroid);
				var uname1 = "greet+"+window.localStorage.user;
				var pw1 = "DQ_doctor";
				if($scope.deviceAndroid === true){

									var success = function(message)
									{
										// alert(message);
										$ionicLoading.hide().then(function(){
									  console.log("The loading indicator is now hidden");
									  // alert('loggedin');
									  $ionicHistory.nextViewOptions({
									  disableAnimate: true,
									  disableBack: true
									  });
									  $interval.cancel(loginStatus);
									  $state.go('templates.doctor_home', {}, {location: "replace", reload: false});
									  });
									// alert(message);
									}
									var failure = function()
									{
									alert("Error calling Hello Plugin");
									}

									hello.login(uname1,pw1,success, failure);

									$timeout( function(){
									console.log('interval started');
									$interval(checkNewMessages,1000);

									}, 3000);
									var username = "greet+"+window.localStorage.user;
									var password = "DQ_doctor";
									function checkNewMessages()
									{
									var success = function(message)
									{
									$rootScope.unreadchatforpatient = message;
									console.log($scope.unreadchatforpatient);
									}

									var failure = function()
									{
									console.log("Error calling Hello Plugin");
									//console.log(‘error’);

									}
									hello.unreadchatfromusers(username,password,success, failure);
									}
				}
				else{

										$ionicLoading.show({
										template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
										});
										var success = function(message)
										{
										// alert(message);
											$scope.iosLoggin=message;
											window.localStorage.iosLogin=$scope.iosLoggin;

										}
										var failure = function()
										{

											alert("Error calling Hello Plugin");

										}

										// $state.go('app.patient_home');//for browser login
										// $state.go('app.patient_home');//for browser login
										hello.login(uname1,pw1,success, failure);

										$timeout( function(){
										console.log('interval started');
										$interval(loginStatus,2000,1);
										}, 10000 );

										function loginStatus() {
										var success = function(message)
										{
												// alert(message);
												$ionicLoading.hide().then(function(){
												console.log("The loading indicator is now hidden");
												// alert('loggedin');
												$ionicHistory.nextViewOptions({
												disableAnimate: true,
												disableBack: true
												});
												$interval.cancel(loginStatus);

												$state.go('templates.doctor_home', {}, {location: "replace", reload: false});
												});

										}

										var failure = function()
										{
											alert("Error Occurred While Loggin in to DoctoQuick");
										}
										hello.loginstatus(success,failure);
										}

				}

		}
		else{
				$ionicLoading.hide();
				$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
				});
				$state.go('auth.loginNew',{}, {location: "replace", reload: false})
		}
	},0);
	$ionicHistory.clearHistory();
})

DoctorQuickApp.controller('callAccptCtrl', function($scope,$rootScope, $stateParams,$ionicConfig,$localStorage,$ionicLoading,patientrequesttodoctor) {
   	$scope.toggle = true;
	 	$rootScope.headerTxt="Call";
		$rootScope.showBackBtn=true;
		$rootScope.checkedValue = false;
		$rootScope.showNotification=false;

		var docpatphno = {
		accpetcode : "1",
		doctorphno : window.localStorage.user,
		patientphno : window.localStorage.reqPat,
		reqId:window.localStorage.reqId
		}
		console.log(docpatphno);
		patientrequesttodoctor.accpetedbydoctor(docpatphno).then(function(response){
			$scope.reqAccpted=response;
			$ionicLoading.hide();
			console.log($scope.reqAccpted);

		}).catch(function(error){
			console.log('failure data', error);
		});
});

angular.module('DoctorQuick.directives', [])


.directive('mdToggle', function($ionicGesture, $timeout,$state) {
		return {
			restrict: 'E',
	    replace: 'true',
	    require: '?ngModel',
	    transclude: true,
			template:
	    '<div class="flip-toggle">' +
	    '<div ng-transclude></div>' +
	    '<label class="toggle">' +
	    '<input type="checkbox">' +
	    '<div class="track">' +
	    '<div class="handle"><span class="handle-label handle-label-a">ON</span><span class="handle-label handle-label-b">OFF</span></div>' +
	    '</div>' +
	    '</label>' +
	    '</div>',
			compile: function(element, attr) {
	      var input = element.find('input');
	      angular.forEach({
	        'name': attr.name,
	        'ng-value': attr.ngValue,
	        'ng-model': attr.ngModel,
	        'ng-checked': attr.ngChecked,
	        'ng-disabled': attr.ngDisabled,
	        'ng-true-value': attr.ngTrueValue,
	        'ng-false-value': attr.ngFalseValue,
	        'ng-change': attr.ngChange
	      }, function(value, name) {
	        if (angular.isDefined(value)) {
	          input.attr(name, value);
	        }
	      });


	      if(attr.toggleClass) {
	        element[0].getElementsByTagName('label')[0].classList.add(attr.toggleClass);
	      }

	      return function($scope, $element, $attr) {
	        var el, checkbox, track, handle;

	        el = $element[0].getElementsByTagName('label')[0];
	        checkbox = el.children[0];
	        track = el.children[1];
	        handle = track.children[0];

	        var ngModelController = angular.element(checkbox).controller('ngModel');

	        $scope.toggle = new ionic.views.Toggle({
	          el: el,
	          track: track,
	          checkbox: checkbox,
	          handle: handle,
	          onChange: function() {
	            if(checkbox.checked) {
	              ngModelController.$setViewValue(true);
	            } else {
	              ngModelController.$setViewValue(false);
	            }
	            $scope.$apply();
	          }
	        });

	        $scope.$on('$destroy', function() {
	          $scope.toggle.destroy();
	        });
	      };
	    }
		}
})


.directive('showHideContainer', function(){
		return {
			scope: {
			},
			controller: function($scope, $element, $attrs) {
				$scope.show = false;

				$scope.toggleType = function($event){
					$event.stopPropagation();
					$event.preventDefault();

					$scope.show = !$scope.show;

					// Emit event
					$scope.$broadcast("toggle-type", $scope.show);
				};
			},
			templateUrl: 'views/common/show-hide-password.html',
			restrict: 'A',
			replace: false,
			transclude: true
		};
})


.directive('showHideInput', function(){
		return {
			scope: {
			},
			link: function(scope, element, attrs) {
				// listen to event
				scope.$on("toggle-type", function(event, show){
					var password_input = element[0],
							input_type = password_input.getAttribute('type');

					if(!show)
					{
						password_input.setAttribute('type', 'password');
					}

					if(show)
					{
						password_input.setAttribute('type', 'text');
					}
				});
			},
			require: '^showHideContainer',
			restrict: 'A',
			replace: false,
			transclude: false
		};
})

//Use this directive to open external links using inAppBrowser cordova plugin
.directive('dynamicAnchorFix', function($ionicGesture, $timeout, $cordovaInAppBrowser) {
	return {
		scope: {},
		link: function(scope, element, attrs) {
			$timeout(function(){
				var anchors = element.find('a');
				if(anchors.length > 0)
				{
					angular.forEach(anchors, function(a) {

						var anchor = angular.element(a);

						anchor.bind('click', function (event) {
							event.preventDefault();
							event.stopPropagation();

							var href = event.currentTarget.href;
							var	options = {};

							//inAppBrowser see documentation here: http://ngcordova.com/docs/plugins/inAppBrowser/

							$cordovaInAppBrowser.open(href, '_blank', options)
								.then(function(e) {
									// success
								})
								.catch(function(e) {
									// error
								});
						});

					});
				}
			}, 10);
		},
		restrict: 'A',
		replace: false,
		transclude: false
	};
})

.directive('validPin', function($http) {
	return {
		require: 'ngModel',
		link: function(scope, ele, attrs, c) {
			scope.$watch(attrs.ngModel, function(pinValue) {
				// $http({
				// 	method: 'POST',
				// 	url: '/api/check/' + attrs.validPin,
				// 	data: {'pin': attrs.validPin}
				// }).success(function(data, status, headers, cfg) {
				// 	c.$setValidity('valid-pin', data.isValid);
				// }).error(function(data, status, headers, cfg) {
				// 	c.$setValidity('valid-pin', false);
				// });
				if(pinValue==="")
				{
					c.$setValidity('valid-pin', true);
				}
				else
				{
					c.$setValidity('valid-pin', false);
				}
			});
		}
	};
})

.directive('multiBg', function(_){
	return {
		scope: {
			multiBg: '=',
			interval: '=',
			helperClass: '@'
		},
		controller: function($scope, $element, $attrs) {
			$scope.loaded = false;
			var utils = this;

			this.animateBg = function(){
				// Think i have to use apply because this function is not called from this controller ($scope)
				$scope.$apply(function () {
					$scope.loaded = true;
					$element.css({'background-image': 'url(' + $scope.bg_img + ')'});
				});
			};

			this.setBackground = function(bg) {
				$scope.bg_img = bg;
			};

			if(!_.isUndefined($scope.multiBg))
			{
				if(_.isArray($scope.multiBg) && ($scope.multiBg.length > 1) && !_.isUndefined($scope.interval) && _.isNumber($scope.interval))
				{
					// Then we need to loop through the bg images
					utils.setBackground($scope.multiBg[0]);
				}
				else
				{
					// Then just set the multiBg image as background image
					utils.setBackground($scope.multiBg[0]);
				}
			}
		},
		templateUrl: 'views/common/multi-bg.html',
		restrict: 'A',
		replace: true,
		transclude: true
	};
})

.directive('bg', function() {
	return {
		restrict: 'A',
		require: '^multiBg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, multiBgController) {
			element.on('load', function() {
				multiBgController.animateBg();
		  });
		}
	};
})

.directive('preImg', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			ratio:'@',
			helperClass: '@'
		},
		controller: function($scope) {
			$scope.loaded = false;

			this.hideSpinner = function(){
				// Think i have to use apply because this function is not called from this controller ($scope)
				$scope.$apply(function () {
					$scope.loaded = true;
				});
			};
		},
		templateUrl: 'views/common/pre-img.html'
	};
})

.directive('spinnerOnLoad', function() {
	return {
		restrict: 'A',
		require: '^preImg',
		scope: {
			ngSrc: '@'
		},
		link: function(scope, element, attr, preImgController) {
			element.on('load', function() {
				preImgController.hideSpinner();
		  });
		}
	};
})

//new directives
.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
})


.directive('shiftInput', ['$parse', function($parse) {
    return {
        restrict: 'A',
        require: ['ngModel'],
        link: function(scope, element, attrs, ctrls) {
            var model=ctrls[0], form=ctrls[1];

            scope.next = function(){
                return model.$valid
            }

            scope.$watch(scope.next, function(newValue, oldValue){
                if (newValue && model.$dirty)
                {
                    var nextinput = element.next('input');
                    if (nextinput.length === 1)
                    {
                        // nextinput[0].focus();
												element.next()[0].focus();
                    }
                }
            })
        }
    }
}])

//directive for change password

.directive('nxEqual', function(){
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.nxEqual) {
                console.error('nxEqual expects a model as an argument!');
                return;
            }
            scope.$watch(attrs.nxEqual, function (value) {
                model.$setValidity('nxEqual', value === model.$viewValue);
            });
            model.$parsers.push(function (value) {
                var isValid = value === scope.$eval(attrs.nxEqual);
                model.$setValidity('nxEqual', isValid);
                return isValid ? value : undefined;
            });
        }
    };
})

	//favorite  Directive
.directive('buttonStar', function(){
  return {
    scope: true,
    restrict: 'E',
    template: '<button class="btn btn-icon"><span class="ionic_rating_icon_on" ng-class="{active: favorite.star}"></span></button>',
    link: function(scope, elem) {
      elem.bind('click', function() {
        scope.$apply(function(){
          scope.favorite.star = !scope.favorite.star;
        });
      });
    }
  };
})

.directive('accessibleForm', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            // set up event handler on the form element
            elem.on('submit', function () {
                // find the first invalid element
                var firstInvalid = elem[0].querySelector('.ng-invalid');
                // if we find one, set focus
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            });
        }
    };
})


.directive('iconSwitcher', function(){
  return {
    restrict : 'A',
		scope: currentState=true,

    link : function(scope, elem, attrs) {

      elem.on('click', function() {
        console.log('You clicked me!');

        if(currentState === true) {
          console.log('It is on!');
          angular.element(elem).removeClass(attrs.onIcon);
          angular.element(elem).addClass(attrs.offIcon);
        } else {
          console.log('It is off!');
          angular.element(elem).removeClass(attrs.offIcon);
          angular.element(elem).addClass(attrs.onIcon);
        }
				console.log(currentState);
        currentState = !currentState
				// $rootScope.$broadcast('currentState', currentState);
      });
  	}

  };
})
// the following directive is to link the buttons
.directive("linked",function(){
    return function (scope, element, attrs) {
        var id = attrs["linked"];
        element.on("click",function(){
            document.getElementById(id).click();
        });
    };
})

.directive('autoNext', function() {
    return {
       restrict: 'A',
       link: function(scope, element, attr, form) {
           var otpBox = parseInt(attr.otpBox);
           var maxLength = parseInt(attr.ngMaxlength);
           element.on('keypress', function(e) {
               if (element.val().length > maxLength-1) {
                  var next = angular.element(document.body).find('[otpBox=' + (otpBox+1) + ']');
                  if (next.length > 0) {
                      next.focus();
                      return next.triggerHandler('keypress', { which: e.which});
                  }
                  else  {
                      return false;
                  }
               }
               return true;
           });

       }
    }
})

.directive("moveNextOnMaxlength", function() {
    return {
        restrict: "A",
        link: function($scope, element) {
            element.on("input", function(e) {
                if(element.val().length == element.attr("maxlength")) {
								    var $nextElement = element.next();
                    if($nextElement.length) {
                        $nextElement[0].focus();
                    }
                }
            });
        }
    }
})

.directive('autofocusWhen1', function (){
	    return function (scope, element, attrs) {
	        scope.$watch('otpentered.OTP1', function(newValue){
						// scope.$watch('maxLengthReach', function(newValue){

	            if (newValue.length >= 1 ) {
	                element[0].focus();
	            }
	        });
	    }
	})

.directive('autofocusWhen2', function () {
	    return function (scope, element, attrs) {
	        scope.$watch('otpentered.OTP2', function(newValue){
						// scope.$watch('maxLengthReach', function(newValue){

	            if (newValue.length >= 1 ) {
	                element[0].focus();
	            }
	        });
	    }
	})


.directive('noSpecialChar', function() {
return {
  require: 'ngModel',
  restrict: 'A',
  link: function(scope, element, attrs, modelCtrl) {
    modelCtrl.$parsers.push(function(inputValue) {
      if (inputValue == null)
        return ''
      cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
      if (cleanInputValue != inputValue) {
        modelCtrl.$setViewValue(cleanInputValue);
        modelCtrl.$render();
      }
      return cleanInputValue;
    });
  }
} })

.directive('autofocusWhen3', function () {
    return function (scope, element, attrs) {
        scope.$watch('otpentered.OTP3', function(newValue){
					// scope.$watch('maxLengthReach', function(newValue){

            if (newValue.length >= 1 ) {
                element[0].focus();
            }
        });
    }
})


.directive('maxlines', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      var maxLines = 1;
      attrs.$observe('maxlines', function(val) {
        maxLines = parseInt(val);
      });
      ngModel.$validators.maxlines = function(modelValue, viewValue) {
        var numLines = (modelValue || '').split("\n").length;
        return numLines <= maxLines;
      };
      attrs.$observe('maxlinesPreventEnter', function(preventEnter) {
        // if attribute value starts with 'f', treat as false. Everything else is true
        preventEnter = (preventEnter || '').toLocaleLowerCase().indexOf('f') !== 0;
        if (preventEnter) {
          addKeypress();
        } else {
          removeKeypress();
        }
      });

      function addKeypress() {
        elem.on('keypress', function(event) {
          // test if adding a newline would cause the validator to fail
          if (event.keyCode == 13 && !ngModel.$validators.maxlines(ngModel.$modelValue + '\n', ngModel.$viewValue + '\n')) {
            event.preventDefault();
          }
        });
      }

      function removeKeypress() {
        elem.off('.maxlines');
      }

      scope.$on('$destroy', removeKeypress);
    }
  };
})

///////////
.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
						min: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
})


//timer
.directive('timer', ['$compile', function ($compile) {
    return {
        restrict: 'EAC',
        replace: false,
        scope: {
            interval: '=interval',
            startTimeAttr: '=startTime',
            endTimeAttr: '=endTime',
            countdownattr: '=countdown',
            finishCallback: '&finishCallback',
            autoStart: '&autoStart',
            maxTimeUnit: '='
        },
        controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {

            // Checking for trim function since IE8 doesn't have it
            // If not a function, create tirm with RegEx to mimic native trim
            if (typeof String.prototype.trim !== 'function') {
                String.prototype.trim = function () {
                    return this.replace(/^\s+|\s+$/g, '');
                };
            }

            //angular 1.2 doesn't support attributes ending in "-start", so we're
            //supporting both "autostart" and "auto-start" as a solution for
            //backward and forward compatibility.
            $scope.autoStart = $attrs.autoStart || $attrs.autostart;

            if ($element.html().trim().length === 0) {
                $element.append($compile('<span>{{millis}}</span>')($scope));
            } else {
                $element.append($compile($element.contents())($scope));
            }

            $scope.startTime = null;
            $scope.endTime = null;
            $scope.timeoutId = null;
            $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) >= 0 ? parseInt($scope.countdownattr, 10) : undefined;
            $scope.isRunning = false;

            $scope.$on('timer-start', function () {
                $scope.start();
            });

            $scope.$on('timer-resume', function () {
                $scope.resume();
            });

            $scope.$on('timer-stop', function () {
                $scope.stop();
            });

            $scope.$on('timer-clear', function () {
                $scope.clear();
            });

            $scope.$on('timer-set-countdown', function (e, countdown) {
                $scope.countdown = countdown;
            });

            function resetTimeout() {
                if ($scope.timeoutId) {
                    clearTimeout($scope.timeoutId);
                }
            }

            $scope.start = $element[0].start = function () {
                $scope.startTime = $scope.startTimeAttr ? new Date($scope.startTimeAttr) : new Date();
                $scope.endTime = $scope.endTimeAttr ? new Date($scope.endTimeAttr) : null;
                if (!$scope.countdown) {
                    $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
                }
                resetTimeout();
                tick();
                $scope.isRunning = true;
            };

            $scope.resume = $element[0].resume = function () {
                resetTimeout();
                if ($scope.countdownattr) {
                    $scope.countdown += 1;
                }
                $scope.startTime = new Date() - ($scope.stoppedTime - $scope.startTime);
                tick();
                $scope.isRunning = true;
            };

            $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function () {
                var timeoutId = $scope.timeoutId;
                $scope.clear();
                $scope.$emit('timer-stopped', {
                    timeoutId: timeoutId,
                    millis: $scope.millis,
                    seconds: $scope.seconds,
                    minutes: $scope.minutes,
                    hours: $scope.hours,
                    days: $scope.days
                });
            };

            $scope.clear = $element[0].clear = function () {
                // same as stop but without the event being triggered
                $scope.stoppedTime = new Date();
                resetTimeout();
                $scope.timeoutId = null;
                $scope.isRunning = false;
            };

            $element.bind('$destroy', function () {
                resetTimeout();
                $scope.isRunning = false;
            });

            function calculateTimeUnits() {
                if ($attrs.startTime !== undefined) {
                    $scope.millis = new Date() - new Date($scope.startTimeAttr);
                }
                // compute time values based on maxTimeUnit specification
                if (!$scope.maxTimeUnit || $scope.maxTimeUnit === 'day') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                    $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                    $scope.days = Math.floor((($scope.millis / (3600000)) / 24));
                    $scope.months = 0;
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'second') {
                    $scope.seconds = Math.floor($scope.millis / 1000);
                    $scope.minutes = 0;
                    $scope.hours = 0;
                    $scope.days = 0;
                    $scope.months = 0;
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'minute') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor($scope.millis / 60000);
                    $scope.hours = 0;
                    $scope.days = 0;
                    $scope.months = 0;
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'hour') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                    $scope.hours = Math.floor($scope.millis / 3600000);
                    $scope.days = 0;
                    $scope.months = 0;
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'month') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                    $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                    $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
                    $scope.months = Math.floor((($scope.millis / (3600000)) / 24) / 30);
                    $scope.years = 0;
                } else if ($scope.maxTimeUnit === 'year') {
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                    $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
                    $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
                    $scope.months = Math.floor((($scope.millis / (3600000)) / 24 / 30) % 12);
                    $scope.years = Math.floor(($scope.millis / (3600000)) / 24 / 365);
                }
                // plural - singular unit decision
                $scope.secondsS = ($scope.seconds === 1 || $scope.seconds === 0) ? '' : 's';
                $scope.minutesS = ($scope.minutes === 1 || $scope.minutes === 0) ? '' : 's';
                $scope.hoursS = ($scope.hours === 1 || $scope.hours === 0) ? '' : 's';
                $scope.daysS = ($scope.days === 1 || $scope.days === 0) ? '' : 's';
                $scope.monthsS = ($scope.months === 1 || $scope.months === 0) ? '' : 's';
                $scope.yearsS = ($scope.years === 1 || $scope.years === 0) ? '' : 's';
                //add leading zero if number is smaller than 10
                $scope.sseconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
                $scope.mminutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
                $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
                $scope.ddays = $scope.days < 10 ? '0' + $scope.days : $scope.days;
                $scope.mmonths = $scope.months < 10 ? '0' + $scope.months : $scope.months;
                $scope.yyears = $scope.years < 10 ? '0' + $scope.years : $scope.years;

            }

            //determine initial values of time units and add AddSeconds functionality
            if ($scope.countdownattr) {
                $scope.millis = $scope.countdownattr * 1000;

                $scope.addCDSeconds = $element[0].addCDSeconds = function (extraSeconds) {
                    $scope.countdown += extraSeconds;
                    $scope.$digest();
                    if (!$scope.isRunning) {
                        $scope.start();
                    }
                };

                $scope.$on('timer-add-cd-seconds', function (e, extraSeconds) {
                    $timeout(function () {
                        $scope.addCDSeconds(extraSeconds);
                    });
                });

                $scope.$on('timer-set-countdown-seconds', function (e, countdownSeconds) {
                    if (!$scope.isRunning) {
                        $scope.clear();
                    }

                    $scope.countdown = countdownSeconds;
                    $scope.millis = countdownSeconds * 1000;
                    calculateTimeUnits();
                });
            } else {
                $scope.millis = 0;
            }
            calculateTimeUnits();

            var tick = function () {

                $scope.millis = new Date() - $scope.startTime;
                var adjustment = $scope.millis % 1000;

                if ($scope.endTimeAttr) {
                    $scope.millis = $scope.endTime - new Date();
                    adjustment = $scope.interval - $scope.millis % 1000;
                }


                if ($scope.countdownattr) {
                    $scope.millis = $scope.countdown * 1000;
                }

                if ($scope.millis < 0) {
                    $scope.stop();
                    $scope.millis = 0;
                    calculateTimeUnits();
                    if ($scope.finishCallback) {
                        $scope.$eval($scope.finishCallback);
                    }
                    return;
                }
                calculateTimeUnits();

                //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
                $scope.timeoutId = setTimeout(function () {
                    tick();
                    $scope.$digest();
                }, $scope.interval - adjustment);

                $scope.$emit('timer-tick', {
                    timeoutId: $scope.timeoutId,
                    millis: $scope.millis
                });

                if ($scope.countdown > 0) {
                    $scope.countdown--;
                } else if ($scope.countdown <= 0) {
                    $scope.stop();
                    if ($scope.finishCallback) {
                        $scope.$eval($scope.finishCallback);
                    }
                }
            };

            if ($scope.autoStart === undefined || $scope.autoStart === true) {
                $scope.start();
            }
        }]
    };
}])

.directive('myDate', ['$timeout', '$filter', function ($timeout, $filter)
    {
        return {
            require: 'ngModel',

            link: function ($scope, $element, $attrs, $ctrl)
            {
                var dateFormat = 'mm/dd/yyyy';
                $ctrl.$parsers.push(function (viewValue)
                {
                    //convert string input into moment data model
                    var pDate = Date.parse(viewValue);
                    if (isNaN(pDate) === false) {
                        return new Date(pDate);
                    }
                    return undefined;

                });
                $ctrl.$formatters.push(function (modelValue)
                {
                    var pDate = Date.parse(modelValue);
                    if (isNaN(pDate) === false) {
                        return $filter('date')(new Date(pDate), dateFormat);
                    }
                    return undefined;
                });
                $element.on('blur', function ()
                {
                    var pDate = Date.parse($ctrl.$modelValue);
                    if (isNaN(pDate) === true) {
                        $ctrl.$setViewValue(null);
                        $ctrl.$render();
                    } else {
                        if ($element.val() !== $filter('date')(new Date(pDate), dateFormat)) {
                            $ctrl.$setViewValue($filter('date')(new Date(pDate), dateFormat));
                            $ctrl.$render();
                        }
                    }

                });
                $timeout(function ()
                {
                    $element.kendoDatePicker({

                        format: dateFormat
                    });

                });
            }
        };
    }])
//search  directive
;

var HEADER_NAME = 'DoctorQuick-HTTP-ErrorHandling';
var specificallyHandleInProgress = false;


angular.module('DoctorQuick.factories', [])
.factory('patientReg', function($http){
  return{
          patientRegProcess:function(pat_fname,pat_mname,pat_lname,pat_age,pat_num,pat_sex,pat_email,pat_pwd){

            var link = "http://greetbss.greettech.com/DQ/patientregistration.php";

            return $http.post(link,{patFname : pat_fname,patMname : pat_mname,patLname:pat_lname,patAge:pat_age,patNum:pat_num,patSex:pat_sex,patEmail:pat_email,patPwd:pat_pwd}).success(function (data, status) {

                console.log(data);

              })
              .error(function (data, status) {
                console.log("Error storing device token." + data + " " + status);
                alert('You are not connected to the greet network');
              });


          }
      };


})

.factory('Socket', function($rootScope) {
    var socket = io.connect('http://localhost:3000');

    //Override socket.on to $apply the changes to angular
    return {
        on: function(eventName, fn) {
            socket.on(eventName, function(data) {
                $rootScope.$apply(function() {
                    fn(data);
                });
            });
        },
        emit: socket.emit
    };
})



.factory('isLoggedIn', function($http){
  return{

          name : function()
          {

              return true;


          }



      };


})


//remember

.factory('$remember', function() {
            function fetchValue(name) {
                var gCookieVal = document.cookie.split("; ");
                for (var i=0; i < gCookieVal.length; i++)
                {
                    // a name/value pair (a crumb) is separated by an equal sign
                    var gCrumb = gCookieVal[i].split("=");
                    if (name === gCrumb[0])
                    {
                        var value = '';
                        try {
                            value = angular.fromJson(gCrumb[1]);
                        } catch(e) {
                            value = unescape(gCrumb[1]);
                        }
                        return value;
                    }
                }
                // a cookie with the requested name does not exist
                return null;
            }
            return function(name, values) {
                if(arguments.length === 1) return fetchValue(name);
                var cookie = name + '=';
                if(typeof values === 'object') {
                    var expires = '';
                    cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
                    if(values.expires) {
                        var date = new Date();
                        date.setTime( date.getTime() + (values.expires * 24 *60 * 60 * 1000));
                        expires = date.toGMTString();
                    }
                    cookie += (!values.session) ? 'expires=' + expires + ';' : '';
                    cookie += (values.path) ? 'path=' + values.path + ';' : '';
                    cookie += (values.secure) ? 'secure;' : '';
                } else {
                    cookie += values + ';';
                }
                document.cookie = cookie;
            }
        })



// Factory for node-pushserver (running locally in this case), if you are using other push notifications server you need to change this
.factory('NodePushServer', function ($http){
  // Configure push notifications server address
  // 		- If you are running a local push notifications server you can test this by setting the local IP (on mac run: ipconfig getifaddr en1)
  var push_server_address = "http://192.168.1.102:8000";

  return {
    // Stores the device token in a db using node-pushserver
    // type:  Platform type (ios, android etc)
    storeDeviceToken: function(type, regId) {
      // Create a random userid to store with it
      var user = {
        user: 'user' + Math.floor((Math.random() * 10000000) + 1),
        type: type,
        token: regId
      };
      console.log("Post token for registered device with data " + JSON.stringify(user));

      $http.post(push_server_address+'/subscribe', JSON.stringify(user))
      .success(function (data, status) {
        console.log("Token stored, device is successfully subscribed to receive push notifications.");
      })
      .error(function (data, status) {
        console.log("Error storing device token." + data + " " + status);
      });
    },
    // CURRENTLY NOT USED!
    // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
    // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
    // time the app opens which this currently does. However in many cases you will always receive the same device token as
    // previously so multiple userids will be created with the same token unless you add code to check).
    removeDeviceToken: function(token) {
      var tkn = {"token": token};
      $http.post(push_server_address+'/unsubscribe', JSON.stringify(tkn))
      .success(function (data, status) {
        console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
      })
      .error(function (data, status) {
        console.log("Error removing device token." + data + " " + status);
      });
    }
  };
})


.factory('AdMob', function ($window){
  var admob = $window.AdMob;

  if(admob)
  {
    // Register AdMob events
    // new events, with variable to differentiate: adNetwork, adType, adEvent
    document.addEventListener('onAdFailLoad', function(data){
      console.log('error: ' + data.error +
      ', reason: ' + data.reason +
      ', adNetwork:' + data.adNetwork +
      ', adType:' + data.adType +
      ', adEvent:' + data.adEvent); // adType: 'banner' or 'interstitial'
    });
    document.addEventListener('onAdLoaded', function(data){
      console.log('onAdLoaded: ' + data);
    });
    document.addEventListener('onAdPresent', function(data){
      console.log('onAdPresent: ' + data);
    });
    document.addEventListener('onAdLeaveApp', function(data){
      console.log('onAdLeaveApp: ' + data);
    });
    document.addEventListener('onAdDismiss', function(data){
      console.log('onAdDismiss: ' + data);
    });

    var defaultOptions = {
      // bannerId: admobid.banner,
      // interstitialId: admobid.interstitial,
      // adSize: 'SMART_BANNER',
      // width: integer, // valid when set adSize 'CUSTOM'
      // height: integer, // valid when set adSize 'CUSTOM'
      position: admob.AD_POSITION.BOTTOM_CENTER,
      // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
      bgColor: 'black', // color name, or '#RRGGBB'
      // x: integer,		// valid when set position to 0 / POS_XY
      // y: integer,		// valid when set position to 0 / POS_XY
      isTesting: true, // set to true, to receiving test ad for testing purpose
      // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
    };
    var admobid = {};

    if(ionic.Platform.isAndroid())
    {
      admobid = { // for Android
        banner: 'ca-app-pub-6869992474017983/9375997553',
        interstitial: 'ca-app-pub-6869992474017983/1657046752'
      };
    }

    if(ionic.Platform.isIOS())
    {
      admobid = { // for iOS
        banner: 'ca-app-pub-6869992474017983/4806197152',
        interstitial: 'ca-app-pub-6869992474017983/7563979554'
      };
    }

    admob.setOptions(defaultOptions);

    // Prepare the ad before showing it
    // 		- (for example at the beginning of a game level)
    admob.prepareInterstitial({
      adId: admobid.interstitial,
      autoShow: false,
      success: function(){
        console.log('interstitial prepared');
      },
      error: function(){
        console.log('failed to prepare interstitial');
      }
    });
  }
  else
  {
    console.log("No AdMob?");
  }

  return {
    showBanner: function() {
      if(admob)
      {
        admob.createBanner({
          adId:admobid.banner,
          position:admob.AD_POSITION.BOTTOM_CENTER,
          autoShow:true,
          success: function(){
            console.log('banner created');
          },
          error: function(){
            console.log('failed to create banner');
          }
        });
      }
    },
    showInterstitial: function() {
      if(admob)
      {
        // If you didn't prepare it before, you can show it like this
        // admob.prepareInterstitial({adId:admobid.interstitial, autoShow:autoshow});

        // If you did prepare it before, then show it like this
        // 		- (for example: check and show it at end of a game level)
        admob.showInterstitial();
      }
    },
    removeAds: function() {
      if(admob)
      {
        admob.removeBanner();
      }
    }
  };
})

.factory('iAd', function ($window){
  var iAd = $window.iAd;

  // preppare and load ad resource in background, e.g. at begining of game level
  if(iAd) {
    iAd.prepareInterstitial( { autoShow:false } );
  }
  else
  {
    console.log("No iAd?");
  }

  return {
    showBanner: function() {
      if(iAd)
      {
        // show a default banner at bottom
        iAd.createBanner({
          position:iAd.AD_POSITION.BOTTOM_CENTER,
          autoShow:true
        });
      }
    },
    showInterstitial: function() {
      // ** Notice: iAd interstitial Ad only supports iPad.
      if(iAd)
      {
        // If you did prepare it before, then show it like this
        // 		- (for example: check and show it at end of a game level)
        iAd.showInterstitial();
      }
    },
    removeAds: function() {
      if(iAd)
      {
        iAd.removeBanner();
      }
    }
  };
})

.factory('$localstorage', ['$window', function($window) {
  return {

    // Clear everything !!! ------------
    clear: function() {
      $window.localStorage.clear();
    },

    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}])

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      return q.promise;
    }
  }

}])

.factory('Auth', function () {
   if (window.localStorage['session']) {
      var _user = JSON.parse(window.localStorage['session']);
   }
   var setUser = function (session) {
      _user = session;
      window.localStorage['session'] = JSON.stringify(_user);
   }

   return {
      setUser: setUser,
      isLoggedIn: function () {
         return _user ? true : false;
      },
      getUser: function () {
         return _user;
      },
      logout: function () {
         window.localStorage.removeItem("session");
         window.localStorage.removeItem("list_dependents");
         _user = null;
      }
   }
})

.factory('Factory', function($q, $http, $rootScope){
    var httpLoc = 'http://ec2-52-66-68-161.ap-south-1.compute.amazonaws.com/';
    return{
        ckIfOnline: function(){
            $http.get(httpLoc);
        },
        change: function(){
            return 'noresponse'
        }
    }
})

// .factory('RequestsErrorHandler', function($q, $http, $rootScope){
//   return {
//       // --- The user's API for claiming responsiblity for requests ---
//       specificallyHandled: function(specificallyHandledBlock) {
//           specificallyHandleInProgress = true;
//           try {
//               return specificallyHandledBlock();
//           } finally {
//               specificallyHandleInProgress = false;
//           }
//       },
//
//       // --- Response interceptor for handling errors generically ---
//       responseError: function(rejection) {
//
//
//           var shouldHandle = (rejection && rejection.config && rejection.config.headers
//               && rejection.config.headers[HEADER_NAME]);
//               console.log('shouldHandle',shouldHandle);
//           if (shouldHandle){
//             console.log('handeled');
//             console.log(rejection);
//             console.log(rejection.config);
//             console.log(rejection.config.headers);
//             console.log(rejection.config.headers[HEADER_NAME]);
//             // $ionicLoading.show({
//             //     template:'<ion-spinner></ion-spinner><br></br>Lost Connection'
//             //   });
//               // --- Your generic error handling goes here ---
//           }
//           else{
//             // $ionicLoading.hide();
//           }
//
//           return $q.reject(rejection);
//       }
//   };
// })

.factory('RequestsErrorHandler', ['$q', function($q) {
    return {
        // --- The user's API for claiming responsiblity for requests ---
        specificallyHandled: function(specificallyHandledBlock) {
            specificallyHandleInProgress = true;
            try {
                return specificallyHandledBlock();
            } finally {
                specificallyHandleInProgress = false;
            }
        },

        // --- Response interceptor for handling errors generically ---
        responseError: function(rejection) {
            // var $ionicLoading = $injector.get('$ionicLoading');
            var shouldHandle = (rejection && rejection.config && rejection.config.headers
                && rejection.config.headers[HEADER_NAME]);
                console.log('shouldHandle',shouldHandle);
            if (shouldHandle){
              console.log('handeled');
              console.log(rejection);
              console.log(rejection.config);
              console.log(rejection.config.headers);
              console.log(rejection.config.headers[HEADER_NAME]);
              // EROOR HANDLING 
            }
            else{
            }

            return $q.reject(rejection);
        }
    };
}])

;

angular.module('DoctorQuick.filters', [])

.filter('rawHtml', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
})

.filter('parseDate', function() {
  return function(value) {
      return Date.parse(value);
  };
})

.filter('customSplitString', function() {
  return function(input) {
    var arr = input.split(',');
    return arr;
  };
})

.filter('customSpaceString', function() {
  return function(input) {
    var arr = input.split(' ');
    return arr;
  };
})

//the following filter capitalizes the first letter only
.filter('capitalize', function() {
    return function(input, scope) {
      if (input!=null) {
          var stringArr = input.split(" ");
          var result = "";
          var cap = stringArr.length;
          for(var x = 0; x < cap; x++) {
            stringArr[x].toLowerCase();
            if(x === cap - 1) {
              result += stringArr[x].substring(0,1).toUpperCase() + stringArr[x].substring(1);
            } else {
              result += stringArr[x].substring(0,1).toUpperCase() + stringArr[x].substring(1) + " ";
            }
          }
        return result;
      }
    }
  })

.filter('formatDateTime', function ($filter) {
    return function (date, format) {
        if (date) {
            return moment(Number(date)).format(format || "DD/MM/YYYY h:mm A");
        }
        else
            return "";
    };
})

.filter('formatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);
        return (z(hours) +':'+z(minutes)+':'+z(seconds));
    };
})
.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])


.filter('groupBy', function() {
    return _.memoize(function(items, field) {
            return _.groupBy(items, field);
        }
    );
})

.filter('unique', function() {
    return function (arr, field) {
        return _.uniq(arr, function(a) { return a[field]; });
    };
})
;

//By Ravikiran

(function() {
  'use strict';
  angular.module('ionic-ratings', ['ionic'])
    .directive('ionicRatings', ionicRatings);

  function ionicRatings() {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="text-center ionic_ratings">' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(1)" ng-if="rating < 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" ng-if="rating > 0" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(2)" ng-if="rating < 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" ng-if="rating > 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(3)" ng-if="rating < 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" ng-if="rating > 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(4)" ng-if="rating < 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" ng-if="rating > 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(5)" ng-if="rating < 5" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" ng-if="rating > 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '</div>',
      scope: {
        ratingsObj: '=ratingsobj',
        index: '=index'
      },
      link: function(scope, element, attrs) {

        //Setting the default values, if they are not passed
        scope.iconOn = scope.ratingsObj.iconOn || 'ion-ios-star';
        scope.iconOff = scope.ratingsObj.iconOff || 'ion-ios-star-outline';
        scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(200, 200, 100)';
        scope.iconOffColor = scope.ratingsObj.iconOffColor || 'rgb(200, 100, 100)';
        scope.rating = scope.ratingsObj.rating || 0;
        scope.minRating = scope.ratingsObj.minRating || 0;
        scope.readOnly = scope.ratingsObj.readOnly || false;
        scope.index = scope.index || 0;

        //Setting the color for the icon, when it is active
        scope.iconOnColor = {
          color: scope.iconOnColor
        };

        //Setting the color for the icon, when it is not active
        scope.iconOffColor = {
          color: scope.iconOffColor
        };

        //Setting the rating
        scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

        //Setting the previously selected rating
        scope.prevRating = 0;

        scope.$watch('ratingsObj.rating', function(newValue, oldValue) {
          setRating(newValue);
        });

        function setRating(val, uiEvent) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          scope.prevRating = val;
          if (uiEvent) scope.ratingsObj.callback(scope.rating, scope.index);
        }

        //Called when he user clicks on the rating
        scope.ratingsClicked = function(val) {
          setRating(val, true);
        };

        //Called when he user un clicks on the rating
        scope.ratingsUnClicked = function(val) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          if (scope.prevRating == val) {
            if (scope.minRating !== 0) {
              scope.rating = scope.minRating;
            } else {
              scope.rating = 0;
            }
          }
          scope.prevRating = val;
          scope.ratingsObj.callback(scope.rating, scope.index);
        };
      }
    };
  }

})();

/**
 * Ionic Letter Avatar is directive for AngularJS apps
 * @version v3.0.0 - 2015-09-28 * @link https://github.com/uttesh/ionic-letteravatar
 * @author Ravikiran
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function () {

	'use strict';
	var nla = angular.module('ionic-letter-avatar', []);

	nla.constant('defaultSettings', {
		alphabetcolors : ["#5A8770", "#B2B7BB", "#6FA9AB", "#F5AF29", "#0088B9", "#F18636", "#D93A37", "#A6B12E", "#5C9BBC", "#F5888D", "#9A89B5", "#407887", "#9A89B5", "#5A8770", "#D33F33", "#A2B01F", "#F0B126", "#0087BF", "#F18636", "#0087BF", "#B2B7BB", "#72ACAE", "#9C8AB4", "#5A8770", "#EEB424", "#407887"],
		textColor : '#ffffff',
		defaultBorder : 'border:5px solid white',
		fontsize : 30, // unit in pixels
		height : 50, // unit in pixels
		width : 50, // unit in pixels
		fontWeight : 400, //
		charCount : 1,
		fontFamily : 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
		base : 'data:image/svg+xml;base64,',
		radius : 'border-radius:30px;'

	});

	nla.directive('ionicLetterAvatar', ['defaultSettings', function (defaultSettings) {
				return {
					restrict : 'AE',
					replace : true,
					link : function (scope, element, attrs) {

						var params = {
							charCount : attrs.charcount || defaultSettings.charCount,
							data : attrs.data,
							textColor : defaultSettings.textColor,
							height : attrs.height || defaultSettings.height,
							width : attrs.width || defaultSettings.width,
							fontsize : attrs.fontsize || defaultSettings.fontsize,
							fontWeight : attrs.fontweight || defaultSettings.fontWeight,
							fontFamily : attrs.fontfamily || defaultSettings.fontFamily,
							avatarBorderStyle : attrs.avatarcustomborder,
							avatardefaultBorder : attrs.avatarborder,
							defaultBorder : defaultSettings.defaultBorder,
							shape : attrs.shape
						};

						var c = params.data.substr(0, params.charCount).toUpperCase();
						var cobj = getCharacterObject(c, params.textColor, params.fontFamily, params.fontWeight, params.fontsize);
						var colorIndex = '';
						var color = '';

						if (c.charCodeAt(0) < 65) {
							color = getRandomColors();
						} else {
							colorIndex = Math.floor((c.charCodeAt(0) - 65) % defaultSettings.alphabetcolors.length);
							color = defaultSettings.alphabetcolors[colorIndex];
						}

						var svg = getImgTag(params.width, params.height, color);
						svg.append(cobj);
						var lvcomponent = angular.element('<div>').append(svg.clone()).html();
						var svgHtml = window.btoa(unescape(encodeURIComponent(lvcomponent)));
						var component;
						var base = defaultSettings.base;
						var _style = '';
						if (params.avatarBorderStyle) {
							_style = params.avatarBorderStyle;
						} else if (params.avatardefaultBorder) {
							_style = params.defaultBorder;
						}

						if (params.shape) {
							if (params.shape === 'round') {
								var round_style = defaultSettings.radius + _style;
								component = "<img src=" + base + svgHtml + " style='" + round_style + "' />";
							}
						} else {
							component = "<img src=" + base + svgHtml + " style='" + _style + "' />";
						}
						element.replaceWith(component);
					}
				};
			}
		]);

	function getRandomColors() {
		var letters = '0123456789ABCDEF'.split('');
		var _color = '#';
		for (var i = 0; i < 6; i++) {
			_color += letters[Math.floor(Math.random() * 16)];
		}
		return _color;
	}

	function getImgTag(width, height, color) {

		var svgTag = angular.element('<svg></svg>')
			.attr({
				'xmlns' : 'http://www.w3.org/2000/svg',
				'pointer-events' : 'none',
				'width' : width,
				'height' : height
			})
			.css({
				'background-color' : color,
				'width' : width + 'px',
				'height' : height + 'px'
			});

		return svgTag;
	}

	function getCharacterObject(character, textColor, fontFamily, fontWeight, fontsize) {
		var textTag = angular.element('<text text-anchor="middle"></text>')
			.attr({
				'y' : '50%',
				'x' : '50%',
				'dy' : '0.35em',
				'pointer-events' : 'auto',
				'fill' : textColor,
				'font-family' : fontFamily
			})
			.html(character)
			.css({
				'font-weight' : fontWeight,
				'font-size' : fontsize + 'px',
			});

		return textTag;
	}

})();

/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="1.12.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(!l.ownFirst)for(b in a)return k.call(a,b);for(b in a);return void 0===b||k.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(h)return h.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=e.call(arguments,2),d=function(){return a.apply(b||this,c.concat(e.call(arguments)))},d.guid=a.guid=a.guid||n.guid++,d):void 0},now:function(){return+new Date},support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}if(f=d.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return A.find(a);this.length=1,this[0]=f}return this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||(e=n.uniqueSort(e)),D.test(a)&&(e=e.reverse())),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=!0,c||j.disable(),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.addEventListener?(d.removeEventListener("DOMContentLoaded",K),a.removeEventListener("load",K)):(d.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(d.addEventListener||"load"===a.event.type||"complete"===d.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll)a.setTimeout(n.ready);else if(d.addEventListener)d.addEventListener("DOMContentLoaded",K),a.addEventListener("load",K);else{d.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&d.documentElement}catch(e){}c&&c.doScroll&&!function f(){if(!n.isReady){try{c.doScroll("left")}catch(b){return a.setTimeout(f,50)}J(),n.ready()}}()}return I.promise(b)},n.ready.promise();var L;for(L in n(l))break;l.ownFirst="0"===L,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c,e;c=d.getElementsByTagName("body")[0],c&&c.style&&(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",l.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(e))}),function(){var a=d.createElement("div");l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}a=null}();var M=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b},N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0;
}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(M(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),"object"!=typeof b&&"function"!=typeof b||(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function S(a,b,c){if(M(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=void 0)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}}),function(){var a;l.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,e;return c=d.getElementsByTagName("body")[0],c&&c.style?(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(d.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(e),a):void 0}}();var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),V=["Top","Right","Bottom","Left"],W=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function X(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&U.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var Y=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)Y(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Z=/^(?:checkbox|radio)$/i,$=/<([\w:-]+)/,_=/^$|\/(?:java|ecma)script/i,aa=/^\s+/,ba="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a){var b=ba.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}!function(){var a=d.createElement("div"),b=d.createDocumentFragment(),c=d.createElement("input");a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l.leadingWhitespace=3===a.firstChild.nodeType,l.tbody=!a.getElementsByTagName("tbody").length,l.htmlSerialize=!!a.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==d.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,b.appendChild(c),l.appendChecked=c.checked,a.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!a.cloneNode(!0).lastChild.defaultValue,b.appendChild(a),c=d.createElement("input"),c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),a.appendChild(c),l.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!!a.addEventListener,a[n.expando]=1,l.attributes=!a.getAttribute(n.expando)}();var da={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};da.optgroup=da.option,da.tbody=da.tfoot=da.colgroup=da.caption=da.thead,da.th=da.td;function ea(a,b){var c,d,e=0,f="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ea(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function fa(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}var ga=/<|&#?\w+;/,ha=/<tbody/i;function ia(a){Z.test(a.type)&&(a.defaultChecked=a.checked)}function ja(a,b,c,d,e){for(var f,g,h,i,j,k,m,o=a.length,p=ca(b),q=[],r=0;o>r;r++)if(g=a[r],g||0===g)if("object"===n.type(g))n.merge(q,g.nodeType?[g]:g);else if(ga.test(g)){i=i||p.appendChild(b.createElement("div")),j=($.exec(g)||["",""])[1].toLowerCase(),m=da[j]||da._default,i.innerHTML=m[1]+n.htmlPrefilter(g)+m[2],f=m[0];while(f--)i=i.lastChild;if(!l.leadingWhitespace&&aa.test(g)&&q.push(b.createTextNode(aa.exec(g)[0])),!l.tbody){g="table"!==j||ha.test(g)?"<table>"!==m[1]||ha.test(g)?0:i:i.firstChild,f=g&&g.childNodes.length;while(f--)n.nodeName(k=g.childNodes[f],"tbody")&&!k.childNodes.length&&g.removeChild(k)}n.merge(q,i.childNodes),i.textContent="";while(i.firstChild)i.removeChild(i.firstChild);i=p.lastChild}else q.push(b.createTextNode(g));i&&p.removeChild(i),l.appendChecked||n.grep(ea(q,"input"),ia),r=0;while(g=q[r++])if(d&&n.inArray(g,d)>-1)e&&e.push(g);else if(h=n.contains(g.ownerDocument,g),i=ea(p.appendChild(g),"script"),h&&fa(i),c){f=0;while(g=i[f++])_.test(g.type||"")&&c.push(g)}return i=null,p}!function(){var b,c,e=d.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b]=c in a)||(e.setAttribute(c,"t"),l[b]=e.attributes[c].expando===!1);e=null}();var ka=/^(?:input|select|textarea)$/i,la=/^key/,ma=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,na=/^(?:focusinfocus|focusoutblur)$/,oa=/^([^.]*)(?:\.(.+)|)/;function pa(){return!0}function qa(){return!1}function ra(){try{return d.activeElement}catch(a){}}function sa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)sa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=qa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return"undefined"==typeof n||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(G)||[""],h=b.length;while(h--)f=oa.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=oa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(i=m=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!na.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),h=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),l=n.event.special[q]||{},f||!l.trigger||l.trigger.apply(e,c)!==!1)){if(!f&&!l.noBubble&&!n.isWindow(e)){for(j=l.delegateType||q,na.test(j+q)||(i=i.parentNode);i;i=i.parentNode)p.push(i),m=i;m===(e.ownerDocument||d)&&p.push(m.defaultView||m.parentWindow||a)}o=0;while((i=p[o++])&&!b.isPropagationStopped())b.type=o>1?j:l.bindType||q,g=(n._data(i,"events")||{})[b.type]&&n._data(i,"handle"),g&&g.apply(i,c),g=h&&i[h],g&&g.apply&&M(i)&&(b.result=g.apply(i,c),b.result===!1&&b.preventDefault());if(b.type=q,!f&&!b.isDefaultPrevented()&&(!l._default||l._default.apply(p.pop(),c)===!1)&&M(e)&&h&&e[q]&&!n.isWindow(e)){m=e[h],m&&(e[h]=null),n.event.triggered=q;try{e[q]()}catch(s){}n.event.triggered=void 0,m&&(e[h]=m)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ma.test(f)?this.mouseHooks:la.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=g.srcElement||d),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,h.filter?h.filter(a,g):a},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button,h=b.fromElement;return null==a.pageX&&null!=b.clientX&&(e=a.target.ownerDocument||d,f=e.documentElement,c=e.body,a.pageX=b.clientX+(f&&f.scrollLeft||c&&c.scrollLeft||0)-(f&&f.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(f&&f.scrollTop||c&&c.scrollTop||0)-(f&&f.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?b.toElement:h),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ra()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ra()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=d.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?pa:qa):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:qa,isPropagationStopped:qa,isImmediatePropagationStopped:qa,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=pa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=pa,a&&!this.isSimulated&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=pa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submit||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?n.prop(b,"form"):void 0;c&&!n._data(c,"submit")&&(n.event.add(c,"submit._submit",function(a){a._submitBubble=!0}),n._data(c,"submit",!0))})},postDispatch:function(a){a._submitBubble&&(delete a._submitBubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.change||(n.event.special.change={setup:function(){return ka.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._justChanged=!0)}),n.event.add(this,"click._change",function(a){this._justChanged&&!a.isTrigger&&(this._justChanged=!1),n.event.simulate("change",this,a)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;ka.test(b.nodeName)&&!n._data(b,"change")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a)}),n._data(b,"change",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!ka.test(this.nodeName)}}),l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d){return sa(this,a,b,c,d)},one:function(a,b,c,d){return sa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=qa),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ta=/ jQuery\d+="(?:null|\d+)"/g,ua=new RegExp("<(?:"+ba+")[\\s/>]","i"),va=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,wa=/<script|<style|<link/i,xa=/checked\s*(?:[^=]|=\s*.checked.)/i,ya=/^true\/(.*)/,za=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Aa=ca(d),Ba=Aa.appendChild(d.createElement("div"));function Ca(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Da(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function Ea(a){var b=ya.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Ga(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(Da(b).text=a.text,Ea(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Z.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}}function Ha(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&xa.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(o&&(k=ja(b,a[0].ownerDocument,!1,a,d),e=k.firstChild,1===k.childNodes.length&&(k=e),e||d)){for(i=n.map(ea(k,"script"),Da),h=i.length;o>m;m++)g=k,m!==p&&(g=n.clone(g,!0,!0),h&&n.merge(i,ea(g,"script"))),c.call(a[m],g,m);if(h)for(j=i[i.length-1].ownerDocument,n.map(i,Ea),m=0;h>m;m++)g=i[m],_.test(g.type||"")&&!n._data(g,"globalEval")&&n.contains(j,g)&&(g.src?n._evalUrl&&n._evalUrl(g.src):n.globalEval((g.text||g.textContent||g.innerHTML||"").replace(za,"")));k=e=null}return a}function Ia(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(ea(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&fa(ea(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(va,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ua.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(Ba.innerHTML=a.outerHTML,Ba.removeChild(f=Ba.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ea(f),h=ea(a),g=0;null!=(e=h[g]);++g)d[g]&&Ga(e,d[g]);if(b)if(c)for(h=h||ea(a),d=d||ea(f),g=0;null!=(e=h[g]);g++)Fa(e,d[g]);else Fa(a,f);return d=ea(f,"script"),d.length>0&&fa(d,!i&&ea(a,"script")),d=h=e=null,f},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.attributes,m=n.event.special;null!=(d=a[h]);h++)if((b||M(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k||"undefined"==typeof d.removeAttribute?d[i]=void 0:d.removeAttribute(i),c.push(f))}}}),n.fn.extend({domManip:Ha,detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return Y(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||d).createTextNode(a))},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ea(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return Y(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(ta,""):void 0;if("string"==typeof a&&!wa.test(a)&&(l.htmlSerialize||!ua.test(a))&&(l.leadingWhitespace||!aa.test(a))&&!da[($.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ea(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(ea(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],f=n(a),h=f.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(f[d])[b](c),g.apply(e,c.get());return this.pushStack(e)}});var Ja,Ka={HTML:"block",BODY:"block"};function La(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function Ma(a){var b=d,c=Ka[a];return c||(c=La(a,b),"none"!==c&&c||(Ja=(Ja||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ja[0].contentWindow||Ja[0].contentDocument).document,b.write(),b.close(),c=La(a,b),Ja.detach()),Ka[a]=c),c}var Na=/^margin/,Oa=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Pa=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Qa=d.documentElement;!function(){var b,c,e,f,g,h,i=d.createElement("div"),j=d.createElement("div");if(j.style){j.style.cssText="float:left;opacity:.5",l.opacity="0.5"===j.style.opacity,l.cssFloat=!!j.style.cssFloat,j.style.backgroundClip="content-box",j.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===j.style.backgroundClip,i=d.createElement("div"),i.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",j.innerHTML="",i.appendChild(j),l.boxSizing=""===j.style.boxSizing||""===j.style.MozBoxSizing||""===j.style.WebkitBoxSizing,n.extend(l,{reliableHiddenOffsets:function(){return null==b&&k(),f},boxSizingReliable:function(){return null==b&&k(),e},pixelMarginRight:function(){return null==b&&k(),c},pixelPosition:function(){return null==b&&k(),b},reliableMarginRight:function(){return null==b&&k(),g},reliableMarginLeft:function(){return null==b&&k(),h}});function k(){var k,l,m=d.documentElement;m.appendChild(i),j.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",b=e=h=!1,c=g=!0,a.getComputedStyle&&(l=a.getComputedStyle(j),b="1%"!==(l||{}).top,h="2px"===(l||{}).marginLeft,e="4px"===(l||{width:"4px"}).width,j.style.marginRight="50%",c="4px"===(l||{marginRight:"4px"}).marginRight,k=j.appendChild(d.createElement("div")),k.style.cssText=j.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",k.style.marginRight=k.style.width="0",j.style.width="1px",g=!parseFloat((a.getComputedStyle(k)||{}).marginRight),j.removeChild(k)),j.style.display="none",f=0===j.getClientRects().length,f&&(j.style.display="",j.innerHTML="<table><tr><td></td><td>t</td></tr></table>",j.childNodes[0].style.borderCollapse="separate",k=j.getElementsByTagName("td"),k[0].style.cssText="margin:0;border:0;padding:0;display:none",f=0===k[0].offsetHeight,f&&(k[0].style.display="",k[1].style.display="none",f=0===k[0].offsetHeight)),m.removeChild(i)}}}();var Ra,Sa,Ta=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ra=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Oa.test(g)&&Na.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0===g?g:g+""}):Qa.currentStyle&&(Ra=function(a){return a.currentStyle},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Oa.test(g)&&!Ta.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Ua(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Va=/alpha\([^)]*\)/i,Wa=/opacity\s*=\s*([^)]*)/i,Xa=/^(none|table(?!-c[ea]).+)/,Ya=new RegExp("^("+T+")(.*)$","i"),Za={position:"absolute",visibility:"hidden",display:"block"},$a={letterSpacing:"0",fontWeight:"400"},_a=["Webkit","O","Moz","ms"],ab=d.createElement("div").style;function bb(a){if(a in ab)return a;var b=a.charAt(0).toUpperCase()+a.slice(1),c=_a.length;while(c--)if(a=_a[c]+b,a in ab)return a}function cb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&W(d)&&(f[g]=n._data(d,"olddisplay",Ma(d.nodeName)))):(e=W(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function db(a,b,c){var d=Ya.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function eb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+V[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+V[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+V[f]+"Width",!0,e))):(g+=n.css(a,"padding"+V[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+V[f]+"Width",!0,e)));return g}function fb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ra(a),g=l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Sa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Oa.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+eb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Sa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=U.exec(c))&&e[1]&&(c=X(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Sa(a,b,d)),"normal"===f&&b in $a&&(f=$a[b]),""===c||c?(e=parseFloat(f),c===!0||isFinite(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Xa.test(n.css(a,"display"))&&0===a.offsetWidth?Pa(a,Za,function(){return fb(a,b,d)}):fb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return db(a,c,d?eb(a,b,d,l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Wa.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Va,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Va.test(f)?f.replace(Va,e):f+" "+e)}}),n.cssHooks.marginRight=Ua(l.reliableMarginRight,function(a,b){return b?Pa(a,{display:"inline-block"},Sa,[a,"marginRight"]):void 0}),n.cssHooks.marginLeft=Ua(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Sa(a,"marginLeft"))||(n.contains(a.ownerDocument,a)?a.getBoundingClientRect().left-Pa(a,{
marginLeft:0},function(){return a.getBoundingClientRect().left}):0))+"px":void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+V[d]+b]=f[d]||f[d-2]||f[0];return e}},Na.test(a)||(n.cssHooks[a+b].set=db)}),n.fn.extend({css:function(a,b){return Y(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return cb(this,!0)},hide:function(){return cb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){W(this)?n(this).show():n(this).hide()})}});function gb(a,b,c,d,e){return new gb.prototype.init(a,b,c,d,e)}n.Tween=gb,gb.prototype={constructor:gb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=gb.propHooks[this.prop];return a&&a.get?a.get(this):gb.propHooks._default.get(this)},run:function(a){var b,c=gb.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):gb.propHooks._default.set(this),this}},gb.prototype.init.prototype=gb.prototype,gb.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},gb.propHooks.scrollTop=gb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=gb.prototype.init,n.fx.step={};var hb,ib,jb=/^(?:toggle|show|hide)$/,kb=/queueHooks$/;function lb(){return a.setTimeout(function(){hb=void 0}),hb=n.now()}function mb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=V[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function nb(a,b,c){for(var d,e=(qb.tweeners[b]||[]).concat(qb.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ob(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&W(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k="none"===j?n._data(a,"olddisplay")||Ma(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==Ma(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],jb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(o))"inline"===("none"===j?Ma(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=nb(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function pb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function qb(a,b,c){var d,e,f=0,g=qb.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=hb||lb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:hb||lb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(pb(k,j.opts.specialEasing);g>f;f++)if(d=qb.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,nb,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(qb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return X(c.elem,a,U.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],qb.tweeners[c]=qb.tweeners[c]||[],qb.tweeners[c].unshift(b)},prefilters:[ob],prefilter:function(a,b){b?qb.prefilters.unshift(a):qb.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(W).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=qb(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&kb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(mb(b,!0),a,d,e)}}),n.each({slideDown:mb("show"),slideUp:mb("hide"),slideToggle:mb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(hb=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),hb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ib||(ib=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(ib),ib=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a,b=d.createElement("input"),c=d.createElement("div"),e=d.createElement("select"),f=e.appendChild(d.createElement("option"));c=d.createElement("div"),c.setAttribute("className","t"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],b.setAttribute("type","checkbox"),c.appendChild(b),a=c.getElementsByTagName("a")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==c.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=f.selected,l.enctype=!!d.createElement("form").enctype,e.disabled=!0,l.optDisabled=!f.disabled,b=d.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value}();var rb=/\r/g,sb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(sb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>-1)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var tb,ub,vb=n.expr.attrHandle,wb=/^(?:checked|selected)$/i,xb=l.getSetAttribute,yb=l.input;n.fn.extend({attr:function(a,b){return Y(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ub:tb)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?yb&&xb||!wb.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(xb?c:d)}}),ub={set:function(a,b,c){return b===!1?n.removeAttr(a,c):yb&&xb||!wb.test(c)?a.setAttribute(!xb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=vb[b]||n.find.attr;yb&&xb||!wb.test(b)?vb[b]=function(a,b,d){var e,f;return d||(f=vb[b],vb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,vb[b]=f),e}:vb[b]=function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),yb&&xb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):tb&&tb.set(a,b,c)}}),xb||(tb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},vb.id=vb.name=vb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:tb.set},n.attrHooks.contenteditable={set:function(a,b,c){tb.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var zb=/^(?:input|select|textarea|button|object)$/i,Ab=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return Y(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):zb.test(a.nodeName)||Ab.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var Bb=/[\t\r\n\f]/g;function Cb(a){return n.attr(a,"class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,Cb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,Cb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,Cb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=Cb(this),b&&n._data(this,"__className__",b),n.attr(this,"class",b||a===!1?"":n._data(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+Cb(c)+" ").replace(Bb," ").indexOf(b)>-1)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Db=a.location,Eb=n.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(Gb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new a.DOMParser,c=d.parseFromString(b,"text/xml")):(c=new a.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var Hb=/#.*$/,Ib=/([?&])_=[^&]*/,Jb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Kb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Lb=/^(?:GET|HEAD)$/,Mb=/^\/\//,Nb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ob={},Pb={},Qb="*/".concat("*"),Rb=Db.href,Sb=Nb.exec(Rb.toLowerCase())||[];function Tb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Ub(a,b,c,d){var e={},f=a===Pb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Vb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Wb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Xb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Rb,type:"GET",isLocal:Kb.test(Sb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Qb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Vb(Vb(a,n.ajaxSettings),b):Vb(n.ajaxSettings,a)},ajaxPrefilter:Tb(Ob),ajaxTransport:Tb(Pb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var d,e,f,g,h,i,j,k,l=n.ajaxSetup({},c),m=l.context||l,o=l.context&&(m.nodeType||m.jquery)?n(m):n.event,p=n.Deferred(),q=n.Callbacks("once memory"),r=l.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,getResponseHeader:function(a){var b;if(2===u){if(!k){k={};while(b=Jb.exec(g))k[b[1].toLowerCase()]=b[2]}b=k[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===u?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return u||(a=t[c]=t[c]||a,s[a]=b),this},overrideMimeType:function(a){return u||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>u)for(b in a)r[b]=[r[b],a[b]];else w.always(a[w.status]);return this},abort:function(a){var b=a||v;return j&&j.abort(b),y(0,b),this}};if(p.promise(w).complete=q.add,w.success=w.done,w.error=w.fail,l.url=((b||l.url||Rb)+"").replace(Hb,"").replace(Mb,Sb[1]+"//"),l.type=c.method||c.type||l.method||l.type,l.dataTypes=n.trim(l.dataType||"*").toLowerCase().match(G)||[""],null==l.crossDomain&&(d=Nb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Sb[1]&&d[2]===Sb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Sb[3]||("http:"===Sb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=n.param(l.data,l.traditional)),Ub(Ob,l,c,w),2===u)return w;i=n.event&&l.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Lb.test(l.type),f=l.url,l.hasContent||(l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=Ib.test(f)?f.replace(Ib,"$1_="+Eb++):f+(Fb.test(f)?"&":"?")+"_="+Eb++)),l.ifModified&&(n.lastModified[f]&&w.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&w.setRequestHeader("If-None-Match",n.etag[f])),(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&w.setRequestHeader("Content-Type",l.contentType),w.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Qb+"; q=0.01":""):l.accepts["*"]);for(e in l.headers)w.setRequestHeader(e,l.headers[e]);if(l.beforeSend&&(l.beforeSend.call(m,w,l)===!1||2===u))return w.abort();v="abort";for(e in{success:1,error:1,complete:1})w[e](l[e]);if(j=Ub(Pb,l,c,w)){if(w.readyState=1,i&&o.trigger("ajaxSend",[w,l]),2===u)return w;l.async&&l.timeout>0&&(h=a.setTimeout(function(){w.abort("timeout")},l.timeout));try{u=1,j.send(s,y)}catch(x){if(!(2>u))throw x;y(-1,x)}}else y(-1,"No Transport");function y(b,c,d,e){var k,s,t,v,x,y=c;2!==u&&(u=2,h&&a.clearTimeout(h),j=void 0,g=e||"",w.readyState=b>0?4:0,k=b>=200&&300>b||304===b,d&&(v=Wb(l,w,d)),v=Xb(l,v,w,k),k?(l.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(n.lastModified[f]=x),x=w.getResponseHeader("etag"),x&&(n.etag[f]=x)),204===b||"HEAD"===l.type?y="nocontent":304===b?y="notmodified":(y=v.state,s=v.data,t=v.error,k=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),w.status=b,w.statusText=(c||y)+"",k?p.resolveWith(m,[s,y,w]):p.rejectWith(m,[w,y,t]),w.statusCode(r),r=void 0,i&&o.trigger(k?"ajaxSuccess":"ajaxError",[w,l,k?s:t]),q.fireWith(m,[w,y]),i&&(o.trigger("ajaxComplete",[w,l]),--n.active||n.event.trigger("ajaxStop")))}return w},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}});function Yb(a){return a.style&&a.style.display||n.css(a,"display")}function Zb(a){if(!n.contains(a.ownerDocument||d,a))return!0;while(a&&1===a.nodeType){if("none"===Yb(a)||"hidden"===a.type)return!0;a=a.parentNode}return!1}n.expr.filters.hidden=function(a){return l.reliableHiddenOffsets()?a.offsetWidth<=0&&a.offsetHeight<=0&&!a.getClientRects().length:Zb(a)},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var $b=/%20/g,_b=/\[\]$/,ac=/\r?\n/g,bc=/^(?:submit|button|image|reset|file)$/i,cc=/^(?:input|select|textarea|keygen)/i;function dc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||_b.test(a)?d(a,e):dc(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)dc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)dc(c,a[c],b,e);return d.join("&").replace($b,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&cc.test(this.nodeName)&&!bc.test(a)&&(this.checked||!Z.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(ac,"\r\n")}}):{name:b.name,value:c.replace(ac,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return this.isLocal?ic():d.documentMode>8?hc():/^(get|post|head|put|delete|options)$/i.test(this.type)&&hc()||ic()}:hc;var ec=0,fc={},gc=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in fc)fc[a](void 0,!0)}),l.cors=!!gc&&"withCredentials"in gc,gc=l.ajax=!!gc,gc&&n.ajaxTransport(function(b){if(!b.crossDomain||l.cors){var c;return{send:function(d,e){var f,g=b.xhr(),h=++ec;if(g.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(f in b.xhrFields)g[f]=b.xhrFields[f];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType),b.crossDomain||d["X-Requested-With"]||(d["X-Requested-With"]="XMLHttpRequest");for(f in d)void 0!==d[f]&&g.setRequestHeader(f,d[f]+"");g.send(b.hasContent&&b.data||null),c=function(a,d){var f,i,j;if(c&&(d||4===g.readyState))if(delete fc[h],c=void 0,g.onreadystatechange=n.noop,d)4!==g.readyState&&g.abort();else{j={},f=g.status,"string"==typeof g.responseText&&(j.text=g.responseText);try{i=g.statusText}catch(k){i=""}f||!b.isLocal||b.crossDomain?1223===f&&(f=204):f=j.text?200:404}j&&e(f,i,j,g.getAllResponseHeaders())},b.async?4===g.readyState?a.setTimeout(c):g.onreadystatechange=fc[h]=c:c()},abort:function(){c&&c(void 0,!0)}}}});function hc(){try{return new a.XMLHttpRequest}catch(b){}}function ic(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=d.head||n("head")[0]||d.documentElement;return{send:function(e,f){b=d.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||f(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var jc=[],kc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=jc.pop()||n.expando+"_"+Eb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(kc.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&kc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(kc,"$1"+e):b.jsonp!==!1&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,jc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ja([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var lc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&lc)return lc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h,a.length)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function mc(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?("undefined"!=typeof e.getBoundingClientRect&&(d=e.getBoundingClientRect()),c=mc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Qa})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return Y(this,function(a,d,e){var f=mc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ua(l.pixelPosition,function(a,c){return c?(c=Sa(a,b),Oa.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({
padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return Y(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var nc=a.jQuery,oc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=oc),b&&a.jQuery===n&&(a.jQuery=nc),n},b||(a.jQuery=a.$=n),n});

!function(){"use strict";angular.module("ngMask",[])}(),function(){"use strict";angular.module("ngMask").directive("mask",["$log","$timeout","MaskService",function(a,b,c){return{restrict:"A",require:"ngModel",compile:function(d,e){function f(a){"number"==typeof a&&(b.cancel(g),g=b(function(){var b=a+1,c=d[0];if(c.setSelectionRange)c.focus(),c.setSelectionRange(a,b);else if(c.createTextRange){var e=c.createTextRange();e.collapse(!0),e.moveEnd("character",b),e.moveStart("character",a),e.select()}}))}if(!e.mask||!e.ngModel)return void a.info("Mask and ng-model attributes are required!");var g,h,i=c.create();return{pre:function(a,b,c){h=i.generateRegex({mask:c.mask,repeat:c.repeat||c.maskRepeat,clean:"true"===(c.clean||c.maskClean),limit:"true"===(c.limit||c.maskLimit||"true"),restrict:c.restrict||c.maskRestrict||"select",validate:"true"===(c.validate||c.maskValidate||"true"),model:c.ngModel,value:c.ngValue})},post:function(c,d,e,g){h.then(function(){function h(b){var c=b;b=b||"";var d=i.getViewValue(b),e=k.maskWithoutOptionals||"",h=d.withDivisors(!0),j=d.withoutDivisors(!0);try{var l=i.getRegex(h.length-1),m=i.getRegex(e.length-1),n=l.test(h)||m.test(h),o=b.length-h.length===1,p=e.length-h.length>0;if("accept"!==k.restrict)if("select"!==k.restrict||n&&!o)"reject"!==k.restrict||n||(d=i.removeWrongPositions(h),h=d.withDivisors(!0),j=d.withoutDivisors(!0));else{var q=b[b.length-1],r=h[h.length-1];q!==r&&p&&(h+=q);var s=i.getFirstWrongPosition(h);angular.isDefined(s)&&f(s)}k.limit||(h=d.withDivisors(!1),j=d.withoutDivisors(!1)),k.validate&&g.$dirty&&(m.test(h)||g.$isEmpty(c)?g.$setValidity("mask",!0):g.$setValidity("mask",!1)),b!==h&&(g.$setViewValue(angular.copy(h),"input"),g.$render())}catch(t){throw a.error("[mask - parseViewValue]"),t}return k.clean?j:h}var j,k=i.getOptions();g.$parsers.push(h),d.on("click input paste keyup",function(){j=b(function(){b.cancel(j),h(d.val()),c.$apply()},100)});var l=c.$watch(e.ngModel,function(a){angular.isDefined(a)&&(h(a),l())});k.value&&c.$evalAsync(function(){g.$setViewValue(angular.copy(k.value),"input"),g.$render()})})}}}}}])}(),function(){"use strict";angular.module("ngMask").factory("MaskService",["$q","OptionalService","UtilService",function(a,b,c){function d(){function d(a,b){var c;try{var d=t[a],e=C[d],f=h(a);e?c="("+e.source+")":(i(a)||(z.push(a),A[a]=d),c="(\\"+d+")")}catch(g){throw g}return(f||b)&&(c+="?"),new RegExp(c)}function e(a,b){var c,f;try{var g=d(a,b);c=g;var i=h(a),j=g.source;if(i&&u>a+1){var k=e(a+1,!0).elementOptionalRegex();j+=k.source}f=new RegExp(j)}catch(l){throw l}return{elementRegex:function(){return c},elementOptionalRegex:function(){return f}}}function f(c){var d=a.defer();s=c;try{var f=c.mask,g=c.repeat;if(!f)return;g&&(f=Array(parseInt(g)+1).join(f)),w=b.getOptionals(f).fromMaskWithoutOptionals(),s.maskWithoutOptionals=t=b.removeOptionals(f),u=t.length;for(var h,i=0;u>i;i++){var l=e(i),m=l.elementRegex(),n=l.elementOptionalRegex(),o=h?h.source+n.source:n.source;o=new RegExp(o),h=h?h.source+m.source:m.source,h=new RegExp(h),B.push(o)}j(),v=k(t).length,d.resolve({options:s,divisors:z,divisorElements:A,optionalIndexes:w,optionalDivisors:x,optionalDivisorsCombinations:y})}catch(p){throw d.reject(p),p}return d.promise}function g(a){var b;try{b=B[a]?B[a].source:""}catch(c){throw c}return new RegExp("^"+b+"$")}function h(a){return c.inArray(a,w)}function i(a){return c.inArray(a,z)}function j(){function a(a,b){return a-b}for(var b=z.sort(a),c=w.sort(a),d=0;d<b.length;d++)for(var e=b[d],f=1;f<=c.length;f++){var g=c[f-1];if(g>=e)break;x[e]=x[e]?x[e].concat(e-f):[e-f],A[e-f]=A[e]}}function k(a){a=a.toString();try{if(z.length>0&&a){for(var b=Object.keys(A),d=[],e=b.length-1;e>=0;e--){var f=A[b[e]];f&&d.push(f)}d=c.uniqueArray(d);var g=new RegExp("[\\"+d.join("\\")+"]","g");return a.replace(g,"")}return a}catch(h){throw h}}function l(a,b){function d(a,b){for(var c=b,d=0;d<a.length;d++){var e=a[d];e<c.length&&c.splice(e,0,A[e])}return c}var e=a,f=z.filter(function(a){var d=Object.keys(x).map(function(a){return parseInt(a)});return!c.inArray(a,b)&&!c.inArray(a,d)});return angular.isArray(a)&&angular.isArray(b)?(e=d(f,e),e=d(b,e)):e}function m(a){var b=a.split(""),d=!0;if(w.length>0){for(var e=[],f=Object.keys(x),h=0;h<f.length;h++){var i=x[f[h]];e.push(i)}0===y.length&&c.lazyProduct(e,function(){y.push(Array.prototype.slice.call(arguments))});for(var h=y.length-1;h>=0;h--){var j=angular.copy(b);j=l(j,y[h]);var k=j.join(""),m=g(t.length-1);if(m.test(k)){d=!1,b=j;break}}}return d&&(b=l(b,z)),b.join("")}function n(){return s}function o(a){try{var b=k(a),c=m(b);return{withDivisors:function(a){return a?c.substr(0,u):c},withoutDivisors:function(a){return a?b.substr(0,v):b}}}catch(d){throw d}}function p(a,b){var c=[];if(!a)return 0;for(var d=0;d<a.length;d++){var e=g(d),f=a.substr(0,d+1);if(e&&!e.test(f)&&(c.push(d),b))break}return c}function q(a){return p(a,!0)[0]}function r(a){for(var b=p(a,!1),c=a,d=0;d<b.length;d++){var e=b[d],f=a.split("");f.splice(e,1),c=f.join("")}return o(c)}var s,t,u=0,v=0,w=[],x={},y=[],z=[],A={},B=[],C={9:/[0-9]/,8:/[0-8]/,7:/[0-7]/,6:/[0-6]/,5:/[0-5]/,4:/[0-4]/,3:/[0-3]/,2:/[0-2]/,1:/[0-1]/,0:/[0]/,"*":/./,w:/\w/,W:/\W/,d:/\d/,D:/\D/,s:/\s/,S:/\S/,b:/\b/,A:/[A-Z]/,a:/[a-z]/,Z:/[A-ZÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,z:/[a-zçáàãâéèêẽíìĩîóòôõúùũüû]/,"@":/[a-zA-Z]/,"#":/[a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,"%":/[0-9a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/};return{getViewValue:o,generateRegex:f,getRegex:g,getOptions:n,removeDivisors:k,getFirstWrongPosition:q,removeWrongPositions:r}}return{create:d}}])}(),function(){"use strict";angular.module("ngMask").factory("OptionalService",[function(){function a(a){var c=[];try{for(var d=/\?/g,e=[];null!=(e=d.exec(a));)c.push(e.index-1)}catch(f){throw f}return{fromMask:function(){return c},fromMaskWithoutOptionals:function(){return b(c)}}}function b(a){for(var b=[],c=0;c<a.length;c++)b.push(a[c]-c);return b}function c(a){var b;try{b=a.replace(/\?/g,"")}catch(c){throw c}return b}return{removeOptionals:c,getOptionals:a}}])}(),function(){"use strict";angular.module("ngMask").factory("UtilService",[function(){function a(a,b,c){function d(h){var i=a[h],j=g[h];if(h===f)for(var k=0;j>k;++k)e[h]=i[k],b.apply(c,e);else for(var k=0;j>k;++k)e[h]=i[k],d(h+1);e.pop()}c||(c=this);for(var e=[],f=a.length-1,g=[],h=a.length;h--;)g[h]=a[h].length;d(0)}function b(a,b){var c;try{c=b.indexOf(a)>-1}catch(d){throw d}return c}function c(a){for(var b={},c=[],d=0,e=a.length;e>d;++d)b.hasOwnProperty(a[d])||(c.push(a[d]),b[a[d]]=1);return c}return{lazyProduct:a,inArray:b,uniqueArray:c}}])}();
//# sourceMappingURL=ngMask.min.map

/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.8.3',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   goo.gl/v3V4Gp
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);

/*! ngTagsInput v3.0.0 License: MIT */!function(){"use strict";var a={backspace:8,tab:9,enter:13,escape:27,space:32,up:38,down:40,left:37,right:39,"delete":46,comma:188},b=9007199254740991,c=["text","email","url"],d=angular.module("ngTagsInput",[]);d.directive("tagsInput",["$timeout","$document","$window","tagsInputConfig","tiUtil",function(d,e,f,g,h){function i(a,b,c,d){var e,f,g,i={};return e=function(b){return h.safeToString(b[a.displayProperty])},f=function(b,c){b[a.displayProperty]=c},g=function(b){var d=e(b);return d&&d.length>=a.minLength&&d.length<=a.maxLength&&a.allowedTagsPattern.test(d)&&!h.findInObjectArray(i.items,b,a.keyProperty||a.displayProperty)&&c({$tag:b})},i.items=[],i.addText=function(a){var b={};return f(b,a),i.add(b)},i.add=function(c){var d=e(c);return a.replaceSpacesWithDashes&&(d=h.replaceSpacesWithDashes(d)),f(c,d),g(c)?(i.items.push(c),b.trigger("tag-added",{$tag:c})):d&&b.trigger("invalid-tag",{$tag:c}),c},i.remove=function(a){var c=i.items[a];return d({$tag:c})?(i.items.splice(a,1),i.clearSelection(),b.trigger("tag-removed",{$tag:c}),c):void 0},i.select=function(a){0>a?a=i.items.length-1:a>=i.items.length&&(a=0),i.index=a,i.selected=i.items[a]},i.selectPrior=function(){i.select(--i.index)},i.selectNext=function(){i.select(++i.index)},i.removeSelected=function(){return i.remove(i.index)},i.clearSelection=function(){i.selected=null,i.index=-1},i.clearSelection(),i}function j(a){return-1!==c.indexOf(a)}return{restrict:"E",require:"ngModel",scope:{tags:"=ngModel",text:"=?",onTagAdding:"&",onTagAdded:"&",onInvalidTag:"&",onTagRemoving:"&",onTagRemoved:"&",onTagClicked:"&"},replace:!1,transclude:!0,templateUrl:"ngTagsInput/tags-input.html",controller:["$scope","$attrs","$element",function(a,c,d){a.events=h.simplePubSub(),g.load("tagsInput",a,c,{template:[String,"ngTagsInput/tag-item.html"],type:[String,"text",j],placeholder:[String,"Add  Filter"],tabindex:[Number,null],removeTagSymbol:[String,String.fromCharCode(215)],replaceSpacesWithDashes:[Boolean,!0],minLength:[Number,3],maxLength:[Number,b],addOnEnter:[Boolean,!0],addOnSpace:[Boolean,!1],addOnComma:[Boolean,!0],addOnBlur:[Boolean,!0],addOnPaste:[Boolean,!1],pasteSplitPattern:[RegExp,/,/],allowedTagsPattern:[RegExp,/.+/],enableEditingLastTag:[Boolean,!1],minTags:[Number,0],maxTags:[Number,b],displayProperty:[String,"text"],keyProperty:[String,""],allowLeftoverText:[Boolean,!1],addFromAutocompleteOnly:[Boolean,!1],spellcheck:[Boolean,!0]}),a.tagList=new i(a.options,a.events,h.handleUndefinedResult(a.onTagAdding,!0),h.handleUndefinedResult(a.onTagRemoving,!0)),this.registerAutocomplete=function(){var b=d.find("input");return{addTag:function(b){return a.tagList.add(b)},focusInput:function(){b[0].focus()},getTags:function(){return a.tagList.items},getCurrentTagText:function(){return a.newTag.text()},getOptions:function(){return a.options},on:function(b,c){return a.events.on(b,c),this}}},this.registerTagItem=function(){return{getOptions:function(){return a.options},removeTag:function(b){a.disabled||a.tagList.remove(b)}}}}],link:function(b,c,g,i){var j,k=[a.enter,a.comma,a.space,a.backspace,a["delete"],a.left,a.right],l=b.tagList,m=b.events,n=b.options,o=c.find("input"),p=["minTags","maxTags","allowLeftoverText"];j=function(){i.$setValidity("maxTags",l.items.length<=n.maxTags),i.$setValidity("minTags",l.items.length>=n.minTags),i.$setValidity("leftoverText",b.hasFocus||n.allowLeftoverText?!0:!b.newTag.text())},i.$isEmpty=function(a){return!a||!a.length},b.newTag={text:function(a){return angular.isDefined(a)?(b.text=a,void m.trigger("input-change",a)):b.text||""},invalid:null},b.track=function(a){return a[n.keyProperty||n.displayProperty]},b.$watch("tags",function(a){a?(l.items=h.makeObjectArray(a,n.displayProperty),b.tags=l.items):l.items=[]}),b.$watch("tags.length",function(){j(),i.$validate()}),g.$observe("disabled",function(a){b.disabled=a}),b.eventHandlers={input:{keydown:function(a){m.trigger("input-keydown",a)},focus:function(){b.hasFocus||(b.hasFocus=!0,m.trigger("input-focus"))},blur:function(){d(function(){var a=e.prop("activeElement"),d=a===o[0],f=c[0].contains(a);(d||!f)&&(b.hasFocus=!1,m.trigger("input-blur"))})},paste:function(a){a.getTextData=function(){var b=a.clipboardData||a.originalEvent&&a.originalEvent.clipboardData;return b?b.getData("text/plain"):f.clipboardData.getData("Text")},m.trigger("input-paste",a)}},host:{click:function(){b.disabled||o[0].focus()}},tag:{click:function(a){m.trigger("tag-clicked",{$tag:a})}}},m.on("tag-added",b.onTagAdded).on("invalid-tag",b.onInvalidTag).on("tag-removed",b.onTagRemoved).on("tag-clicked",b.onTagClicked).on("tag-added",function(){b.newTag.text("")}).on("tag-added tag-removed",function(){b.tags=l.items,i.$setDirty()}).on("invalid-tag",function(){b.newTag.invalid=!0}).on("option-change",function(a){-1!==p.indexOf(a.name)&&j()}).on("input-change",function(){l.clearSelection(),b.newTag.invalid=null}).on("input-focus",function(){c.triggerHandler("focus"),i.$setValidity("leftoverText",!0)}).on("input-blur",function(){n.addOnBlur&&!n.addFromAutocompleteOnly&&l.addText(b.newTag.text()),c.triggerHandler("blur"),j()}).on("input-keydown",function(c){var d,e,f,g,i=c.keyCode,j={};if(!h.isModifierOn(c)&&-1!==k.indexOf(i)){if(j[a.enter]=n.addOnEnter,j[a.comma]=n.addOnComma,j[a.space]=n.addOnSpace,d=!n.addFromAutocompleteOnly&&j[i],e=(i===a.backspace||i===a["delete"])&&l.selected,g=i===a.backspace&&0===b.newTag.text().length&&n.enableEditingLastTag,f=(i===a.backspace||i===a.left||i===a.right)&&0===b.newTag.text().length&&!n.enableEditingLastTag,d)l.addText(b.newTag.text());else if(g){var m;l.selectPrior(),m=l.removeSelected(),m&&b.newTag.text(m[n.displayProperty])}else e?l.removeSelected():f&&(i===a.left||i===a.backspace?l.selectPrior():i===a.right&&l.selectNext());(d||f||e||g)&&c.preventDefault()}}).on("input-paste",function(a){if(n.addOnPaste){var b=a.getTextData(),c=b.split(n.pasteSplitPattern);c.length>1&&(c.forEach(function(a){l.addText(a)}),a.preventDefault())}})}}}]),d.directive("tiTagItem",["tiUtil",function(a){return{restrict:"E",require:"^tagsInput",template:'<ng-include src="$$template"></ng-include>',scope:{data:"="},link:function(b,c,d,e){var f=e.registerTagItem(),g=f.getOptions();b.$$template=g.template,b.$$removeTagSymbol=g.removeTagSymbol,b.$getDisplayText=function(){return a.safeToString(b.data[g.displayProperty])},b.$removeTag=function(){f.removeTag(b.$index)},b.$watch("$parent.$index",function(a){b.$index=a})}}}]),d.directive("autoComplete",["$document","$timeout","$sce","$q","tagsInputConfig","tiUtil",function(b,c,d,e,f,g){function h(a,b,c){var d,f,h,i={};return h=function(){return b.tagsInput.keyProperty||b.tagsInput.displayProperty},d=function(a,c){return a.filter(function(a){return!g.findInObjectArray(c,a,h(),function(a,c){return b.tagsInput.replaceSpacesWithDashes&&(a=g.replaceSpacesWithDashes(a),c=g.replaceSpacesWithDashes(c)),g.defaultComparer(a,c)})})},i.reset=function(){f=null,i.items=[],i.visible=!1,i.index=-1,i.selected=null,i.query=null},i.show=function(){b.selectFirstMatch?i.select(0):i.selected=null,i.visible=!0},i.load=g.debounce(function(c,j){i.query=c;var k=e.when(a({$query:c}));f=k,k.then(function(a){k===f&&(a=g.makeObjectArray(a.data||a,h()),a=d(a,j),i.items=a.slice(0,b.maxResultsToShow),i.items.length>0?i.show():i.reset())})},b.debounceDelay),i.selectNext=function(){i.select(++i.index)},i.selectPrior=function(){i.select(--i.index)},i.select=function(a){0>a?a=i.items.length-1:a>=i.items.length&&(a=0),i.index=a,i.selected=i.items[a],c.trigger("suggestion-selected",a)},i.reset(),i}function i(a,b){var c=a.find("li").eq(b),d=c.parent(),e=c.prop("offsetTop"),f=c.prop("offsetHeight"),g=d.prop("clientHeight"),h=d.prop("scrollTop");h>e?d.prop("scrollTop",e):e+f>g+h&&d.prop("scrollTop",e+f-g)}return{restrict:"E",require:"^tagsInput",scope:{source:"&"},templateUrl:"ngTagsInput/auto-complete.html",controller:["$scope","$element","$attrs",function(a,b,c){a.events=g.simplePubSub(),f.load("autoComplete",a,c,{template:[String,"ngTagsInput/auto-complete-match.html"],debounceDelay:[Number,100],minLength:[Number,3],highlightMatchedText:[Boolean,!0],maxResultsToShow:[Number,10],loadOnDownArrow:[Boolean,!1],loadOnEmpty:[Boolean,!1],loadOnFocus:[Boolean,!1],selectFirstMatch:[Boolean,!0],displayProperty:[String,""]}),a.suggestionList=new h(a.source,a.options,a.events),this.registerAutocompleteMatch=function(){return{getOptions:function(){return a.options},getQuery:function(){return a.suggestionList.query}}}}],link:function(b,c,d,e){var f,h=[a.enter,a.tab,a.escape,a.up,a.down],j=b.suggestionList,k=e.registerAutocomplete(),l=b.options,m=b.events;l.tagsInput=k.getOptions(),f=function(a){return a&&a.length>=l.minLength||!a&&l.loadOnEmpty},b.addSuggestionByIndex=function(a){j.select(a),b.addSuggestion()},b.addSuggestion=function(){var a=!1;return j.selected&&(k.addTag(angular.copy(j.selected)),j.reset(),k.focusInput(),a=!0),a},b.track=function(a){return a[l.tagsInput.keyProperty||l.tagsInput.displayProperty]},k.on("tag-added tag-removed invalid-tag input-blur",function(){j.reset()}).on("input-change",function(a){f(a)?j.load(a,k.getTags()):j.reset()}).on("input-focus",function(){var a=k.getCurrentTagText();l.loadOnFocus&&f(a)&&j.load(a,k.getTags())}).on("input-keydown",function(c){var d=c.keyCode,e=!1;if(!g.isModifierOn(c)&&-1!==h.indexOf(d))return j.visible?d===a.down?(j.selectNext(),e=!0):d===a.up?(j.selectPrior(),e=!0):d===a.escape?(j.reset(),e=!0):(d===a.enter||d===a.tab)&&(e=b.addSuggestion()):d===a.down&&b.options.loadOnDownArrow&&(j.load(k.getCurrentTagText(),k.getTags()),e=!0),e?(c.preventDefault(),c.stopImmediatePropagation(),!1):void 0}),m.on("suggestion-selected",function(a){i(c,a)})}}}]),d.directive("tiAutocompleteMatch",["$sce","tiUtil",function(a,b){return{restrict:"E",require:"^autoComplete",template:'<ng-include src="$$template"></ng-include>',scope:{data:"="},link:function(c,d,e,f){var g=f.registerAutocompleteMatch(),h=g.getOptions();c.$$template=h.template,c.$index=c.$parent.$index,c.$highlight=function(c){return h.highlightMatchedText&&(c=b.safeHighlight(c,g.getQuery())),a.trustAsHtml(c)},c.$getDisplayText=function(){return b.safeToString(c.data[h.displayProperty||h.tagsInput.displayProperty])}}}}]),d.directive("tiTranscludeAppend",function(){return function(a,b,c,d,e){e(function(a){b.append(a)})}}),d.directive("tiAutosize",["tagsInputConfig",function(a){return{restrict:"A",require:"ngModel",link:function(b,c,d,e){var f,g,h=a.getTextAutosizeThreshold();f=angular.element('<span class="input"></span>'),f.css("display","none").css("visibility","hidden").css("width","auto").css("white-space","pre"),c.parent().append(f),g=function(a){var b,e=a;return angular.isString(e)&&0===e.length&&(e=d.placeholder),e&&(f.text(e),f.css("display",""),b=f.prop("offsetWidth"),f.css("display","none")),c.css("width",b?b+h+"px":""),a},e.$parsers.unshift(g),e.$formatters.unshift(g),d.$observe("placeholder",function(a){e.$modelValue||g(a)})}}}]),d.directive("tiBindAttrs",function(){return function(a,b,c){a.$watch(c.tiBindAttrs,function(a){angular.forEach(a,function(a,b){c.$set(b,a)})},!0)}}),d.provider("tagsInputConfig",function(){var a={},b={},c=3;this.setDefaults=function(b,c){return a[b]=c,this},this.setActiveInterpolation=function(a,c){return b[a]=c,this},this.setTextAutosizeThreshold=function(a){return c=a,this},this.$get=["$interpolate",function(d){var e={};return e[String]=function(a){return a},e[Number]=function(a){return parseInt(a,10)},e[Boolean]=function(a){return"true"===a.toLowerCase()},e[RegExp]=function(a){return new RegExp(a)},{load:function(c,f,g,h){var i=function(){return!0};f.options={},angular.forEach(h,function(h,j){var k,l,m,n,o,p;k=h[0],l=h[1],m=h[2]||i,n=e[k],o=function(){var b=a[c]&&a[c][j];return angular.isDefined(b)?b:l},p=function(a){f.options[j]=a&&m(a)?n(a):o()},b[c]&&b[c][j]?g.$observe(j,function(a){p(a),f.events.trigger("option-change",{name:j,newValue:a})}):p(g[j]&&d(g[j])(f.$parent))})},getTextAutosizeThreshold:function(){return c}}}]}),d.factory("tiUtil",["$timeout",function(a){var b={};return b.debounce=function(b,c){var d;return function(){var e=arguments;a.cancel(d),d=a(function(){b.apply(null,e)},c)}},b.makeObjectArray=function(a,b){if(!angular.isArray(a)||0===a.length||angular.isObject(a[0]))return a;var c=[];return a.forEach(function(a){var d={};d[b]=a,c.push(d)}),c},b.findInObjectArray=function(a,c,d,e){var f=null;return e=e||b.defaultComparer,a.some(function(a){return e(a[d],c[d])?(f=a,!0):void 0}),f},b.defaultComparer=function(a,c){return b.safeToString(a).toLowerCase()===b.safeToString(c).toLowerCase()},b.safeHighlight=function(a,c){function d(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}if(!c)return a;a=b.encodeHTML(a),c=b.encodeHTML(c);var e=new RegExp("&[^;]+;|"+d(c),"gi");return a.replace(e,function(a){return a.toLowerCase()===c.toLowerCase()?"<em>"+a+"</em>":a})},b.safeToString=function(a){return angular.isUndefined(a)||null==a?"":a.toString().trim()},b.encodeHTML=function(a){return b.safeToString(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},b.handleUndefinedResult=function(a,b){return function(){var c=a.apply(null,arguments);return angular.isUndefined(c)?b:c}},b.replaceSpacesWithDashes=function(a){return b.safeToString(a).replace(/\s/g,"-")},b.isModifierOn=function(a){return a.shiftKey||a.ctrlKey||a.altKey||a.metaKey},b.simplePubSub=function(){var a={};return{on:function(b,c){return b.split(" ").forEach(function(b){a[b]||(a[b]=[]),a[b].push(c)}),this},trigger:function(c,d){var e=a[c]||[];return e.every(function(a){return b.handleUndefinedResult(a,!0)(d)}),this}}},b}]),d.run(["$templateCache",function(a){a.put("ngTagsInput/tags-input.html",'<div class="host" tabindex="-1" ng-click="eventHandlers.host.click()" ti-transclude-append><div class="tags" ng-class="{focused: hasFocus}"><ul class="tag-list"><li class="tag-item" ng-repeat="tag in tagList.items track by track(tag)" ng-class="{ selected: tag == tagList.selected }" ng-click="eventHandlers.tag.click(tag)"><ti-tag-item data="::tag"></ti-tag-item></li></ul><input class="input" autocomplete="off" ng-model="newTag.text" ng-model-options="{getterSetter: true}" ng-keydown="eventHandlers.input.keydown($event)" ng-focus="eventHandlers.input.focus($event)" ng-blur="eventHandlers.input.blur($event)" ng-paste="eventHandlers.input.paste($event)" ng-trim="false" ng-class="{\'invalid-tag\': newTag.invalid}" ng-disabled="disabled" ti-bind-attrs="{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}" ti-autosize></div></div>'),a.put("ngTagsInput/tag-item.html",'<span ng-bind="$getDisplayText()"></span> <a class="remove-button" ng-click="$removeTag()" ng-bind="::$$removeTagSymbol"></a>'),a.put("ngTagsInput/auto-complete.html",'<div class="autocomplete" ng-if="suggestionList.visible"><ul class="suggestion-list"><li class="suggestion-item" ng-repeat="item in suggestionList.items track by track(item)" ng-class="{selected: item == suggestionList.selected}" ng-click="addSuggestionByIndex($index)" ng-mouseenter="suggestionList.select($index)"><ti-autocomplete-match data="::item"></ti-autocomplete-match></li></ul></div>'),a.put("ngTagsInput/auto-complete-match.html",'<span ng-bind-html="$highlight($getDisplayText())"></span>')}])}();

!function(){function e(e,r){return[].slice.call((r||document).querySelectorAll(e))}if(window.addEventListener){var r=window.StyleFix={link:function(e){try{if("stylesheet"!==e.rel||e.hasAttribute("data-noprefix"))return}catch(t){return}var n,i=e.href||e.getAttribute("data-href"),a=i.replace(/[^\/]+$/,""),o=(/^[a-z]{3,10}:/.exec(a)||[""])[0],s=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(a)||[""])[0],l=/^([^?]*)\??/.exec(i)[1],u=e.parentNode,p=new XMLHttpRequest;p.onreadystatechange=function(){4===p.readyState&&n()},n=function(){var t=p.responseText;if(t&&e.parentNode&&(!p.status||p.status<400||p.status>600)){if(t=r.fix(t,!0,e),a){t=t.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,r,t){return/^([a-z]{3,10}:|#)/i.test(t)?e:/^\/\//.test(t)?'url("'+o+t+'")':/^\//.test(t)?'url("'+s+t+'")':/^\?/.test(t)?'url("'+l+t+'")':'url("'+a+t+'")'});var n=a.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");t=t.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+n,"gi"),"$1")}var i=document.createElement("style");i.textContent=t,i.media=e.media,i.disabled=e.disabled,i.setAttribute("data-href",e.getAttribute("href")),u.insertBefore(i,e),u.removeChild(e),i.media=e.media}};try{p.open("GET",i),p.send(null)}catch(t){"undefined"!=typeof XDomainRequest&&(p=new XDomainRequest,p.onerror=p.onprogress=function(){},p.onload=n,p.open("GET",i),p.send(null))}e.setAttribute("data-inprogress","")},styleElement:function(e){if(!e.hasAttribute("data-noprefix")){var t=e.disabled;e.textContent=r.fix(e.textContent,!0,e),e.disabled=t}},styleAttribute:function(e){var t=e.getAttribute("style");t=r.fix(t,!1,e),e.setAttribute("style",t)},process:function(){e("style").forEach(StyleFix.styleElement),e("[style]").forEach(StyleFix.styleAttribute)},register:function(e,t){(r.fixers=r.fixers||[]).splice(void 0===t?r.fixers.length:t,0,e)},fix:function(e,t,n){for(var i=0;i<r.fixers.length;i++)e=r.fixers[i](e,t,n)||e;return e},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,r){return r.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};!function(){setTimeout(function(){},10),document.addEventListener("DOMContentLoaded",StyleFix.process,!1)}()}}(),function(e){function r(e,r,n,i,a){if(e=t[e],e.length){var o=RegExp(r+"("+e.join("|")+")"+n,"gi");a=a.replace(o,i)}return a}if(window.StyleFix&&window.getComputedStyle){var t=window.PrefixFree={prefixCSS:function(e,n){var i=t.prefix;if(t.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi,function(e,r,t,n){return r+(t||"")+"linear-gradient("+(90-n)+"deg"})),e=r("functions","(\\s|:|,)","\\s*\\(","$1"+i+"$2(",e),e=r("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+i+"$2$3",e),e=r("properties","(^|\\{|\\s|;)","\\s*:","$1"+i+"$2:",e),t.properties.length){var a=RegExp("\\b("+t.properties.join("|")+")(?!:)","gi");e=r("valueProperties","\\b",":(.+?);",function(e){return e.replace(a,i+"$1")},e)}return n&&(e=r("selectors","","\\b",t.prefixSelector,e),e=r("atrules","@","\\b","@"+i+"$1",e)),e=e.replace(RegExp("-"+i,"g"),"-"),e=e.replace(/-\*-(?=[a-z]+)/gi,t.prefix)},property:function(e){return(t.properties.indexOf(e)?t.prefix:"")+e},value:function(e){return e=r("functions","(^|\\s|,)","\\s*\\(","$1"+t.prefix+"$2(",e),e=r("keywords","(^|\\s)","(\\s|$)","$1"+t.prefix+"$2$3",e)},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+t.prefix})},prefixProperty:function(e,r){var n=t.prefix+e;return r?StyleFix.camelCase(n):n}};!function(){var e={},r=[],n=getComputedStyle(document.documentElement,null),i=document.createElement("div").style,a=function(t){if("-"===t.charAt(0)){r.push(t);var n=t.split("-"),i=n[1];for(e[i]=++e[i]||1;n.length>3;){n.pop();var a=n.join("-");o(a)&&-1===r.indexOf(a)&&r.push(a)}}},o=function(e){return StyleFix.camelCase(e)in i};if(n.length>0)for(var s=0;s<n.length;s++)a(n[s]);else for(var l in n)a(StyleFix.deCamelCase(l));var u={uses:0};for(var p in e){var f=e[p];u.uses<f&&(u={prefix:p,uses:f})}t.prefix="-"+u.prefix+"-",t.Prefix=StyleFix.camelCase(t.prefix),t.properties=[];for(var s=0;s<r.length;s++){var l=r[s];if(0===l.indexOf(t.prefix)){var c=l.slice(t.prefix.length);o(c)||t.properties.push(c)}}"Ms"!=t.Prefix||"transform"in i||"MsTransform"in i||!("msTransform"in i)||t.properties.push("transform","transform-origin"),t.properties.sort()}(),function(){function e(e,r){return i[r]="",i[r]=e,!!i[r]}var r={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};r["repeating-linear-gradient"]=r["repeating-radial-gradient"]=r["radial-gradient"]=r["linear-gradient"];var n={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};t.functions=[],t.keywords=[];var i=document.createElement("div").style;for(var a in r){var o=r[a],s=o.property,l=a+"("+o.params+")";!e(l,s)&&e(t.prefix+l,s)&&t.functions.push(a)}for(var u in n){var s=n[u];!e(u,s)&&e(t.prefix+u,s)&&t.keywords.push(u)}}(),function(){function r(e){return a.textContent=e+"{}",!!a.sheet.cssRules.length}var n={":read-only":null,":read-write":null,":any-link":null,"::selection":null},i={keyframes:"name",viewport:null,document:'regexp(".")'};t.selectors=[],t.atrules=[];var a=e.appendChild(document.createElement("style"));for(var o in n){var s=o+(n[o]?"("+n[o]+")":"");!r(s)&&r(t.prefixSelector(s))&&t.selectors.push(o)}for(var l in i){var s=l+" "+(i[l]||"");!r("@"+s)&&r("@"+t.prefix+s)&&t.atrules.push(l)}e.removeChild(a)}(),t.valueProperties=["transition","transition-property"],e.className+=" "+t.prefix,StyleFix.register(t.prefixCSS)}}(document.documentElement);
angular.module('DoctorQuick.services', [])

.service('FeedList', function ($rootScope, FeedLoader, $q){
	this.get = function(feedSourceUrl) {
		var response = $q.defer();
		//num is the number of results to pull form the source
		FeedLoader.fetch({q: feedSourceUrl, num: 20}, {}, function (data){
			response.resolve(data.responseData);
		});
		return response.promise;
	};
})


.service('isLoggedIn', function ($rootScope, FeedLoader, $q){
	this.get = function() {
		return true;

	};
})


// PUSH NOTIFICATIONS
.service('PushNotificationsService', function ($rootScope, $cordovaPush, NodePushServer, GCM_SENDER_ID){
	/* Apple recommends you register your application for push notifications on the device every time it’s run since tokens can change. The documentation says: ‘By requesting the device token and passing it to the provider every time your application launches, you help to ensure that the provider has the current token for the device. If a user restores a backup to a device other than the one that the backup was created for (for example, the user migrates data to a new device), he or she must launch the application at least once for it to receive notifications again. If the user restores backup data to a new device or reinstalls the operating system, the device token changes. Moreover, never cache a device token and give that to your provider; always get the token from the system whenever you need it.’ */
	this.register = function() {
		var config = {};

		// ANDROID PUSH NOTIFICATIONS
		if(ionic.Platform.isAndroid())
		{
			config = {
				"senderID": GCM_SENDER_ID
			};

			$cordovaPush.register(config).then(function(result) {
				// Success
				console.log("$cordovaPush.register Success");
				console.log(result);
			}, function(err) {
				// Error
				console.log("$cordovaPush.register Error");
				console.log(err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				console.log(JSON.stringify([notification]));
				switch(notification.event)
				{
					case 'registered':
						if (notification.regid.length > 0 ) {
							console.log('registration ID = ' + notification.regid);
							NodePushServer.storeDeviceToken("android", notification.regid);
						}
						break;

					case 'message':
						if(notification.foreground == "1")
						{
							console.log("Notification received when app was opened (foreground = true)");
						}
						else
						{
							if(notification.coldstart == "1")
							{
								console.log("Notification received when app was closed (not even in background, foreground = false, coldstart = true)");
							}
							else
							{
								console.log("Notification received when app was in background (started but not focused, foreground = false, coldstart = false)");
							}
						}

						// this is the actual push notification. its format depends on the data model from the push server
						console.log('message = ' + notification.message);
						break;

					case 'error':
						console.log('GCM error = ' + notification.msg);
						break;

					default:
						console.log('An unknown GCM event has occurred');
						break;
				}
			});

			// WARNING: dangerous to unregister (results in loss of tokenID)
			$cordovaPush.unregister(options).then(function(result) {
			  // Success!
			}, function(err) {
			  // Error
			});
		}

		if(ionic.Platform.isIOS())
		{
			config = {
				"badge": true,
				"sound": true,
				"alert": true
			};

			$cordovaPush.register(config).then(function(result) {
				// Success -- send deviceToken to server, and store for future use
				console.log("result: " + result);
				NodePushServer.storeDeviceToken("ios", result);
			}, function(err) {
				console.log("Registration error: " + err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				console.log(notification.alert, "Push Notification Received");
			});
		}
	};
})

//new services
.service('PatientReg', function () {
     var Patient = {
        FirstName: '',
        MName: '',
				LastName: '',
				Age: '',
    };
    return Patient;
})

.factory('payu', function ($resource) {
       return $resource('http://localhost:8100/');
   })

	 .service('APIInterceptor', function($rootScope, checkInternet) {
	     var service = this;
	     service.request = function(config) {

	         return config;
	     };
	     service.responseError = function(response) {
	         if (response.status === 401) {
	             $rootScope.$broadcast('unauthorized');
	         }
	         return response;
	     };
	 })

.service('checkInternet', function($rootScope){
	console.log('check');
	console.log('network',navigator.onLine);

})

.service( 'HardwareBackButtonManager', function($ionicPlatform){
  this.deregister = undefined;

  this.disable = function(){
    this.deregister = $ionicPlatform.registerBackButtonAction(function(e){
    e.preventDefault();
    return false;
    }, 101);
  }

  this.enable = function(){
    if( this.deregister !== undefined ){
      this.deregister();
      this.deregister = undefined;
    }
  }
  return this;
})

.service('goBackMany',function($ionicHistory){
  return function(depth){
    // get the right history stack based on the current view
    var historyId = $ionicHistory.currentHistoryId();
    var history = $ionicHistory.viewHistory().histories[historyId];
    // set the view 'depth' back in the stack as the back view
    var targetViewIndex = history.stack.length - 1 - depth;
    $ionicHistory.backView(history.stack[targetViewIndex]);
    // navigate to it
    $ionicHistory.goBack();
  }
})

.service('urlShortener', service);

function service($log, $q, $http) {

    var gapiKey = 'AIzaSyAnSYS82Y5k9Lmln9xUS6k7e3xNcpHvOWs';
    var gapiUrl = 'https://www.googleapis.com/urlshortener/v1/url';

    return {
        shorten: shorten
    };

    //////////////////////////////////////////////////

    function shorten(url) {
        console.log(url);
        var data = {
            method: 'POST',
            url: gapiUrl + '?key=' + gapiKey,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                longUrl: "url",
            }
        };

        return $http(data).then(function (response) {
					console.log(data);
            // $log.debug(response);
            return response.data;
        }, function (response) {
            // $log.debug(response);
            return response.data;
        });
    };
}

;

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(a,m){var r={},f=r.lib={},g=function(){},l=f.Base={extend:function(a){g.prototype=this;var b=new g;a&&b.mixIn(a);b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
p=f.WordArray=l.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=m?b:4*a.length},toString:function(a){return(a||q).stringify(this)},concat:function(a){var b=this.words,d=a.words,c=this.sigBytes;a=a.sigBytes;this.clamp();if(c%4)for(var j=0;j<a;j++)b[c+j>>>2]|=(d[j>>>2]>>>24-8*(j%4)&255)<<24-8*((c+j)%4);else if(65535<d.length)for(j=0;j<a;j+=4)b[c+j>>>2]=d[j>>>2];else b.push.apply(b,d);this.sigBytes+=a;return this},clamp:function(){var n=this.words,b=this.sigBytes;n[b>>>2]&=4294967295<<
32-8*(b%4);n.length=a.ceil(b/4)},clone:function(){var a=l.clone.call(this);a.words=this.words.slice(0);return a},random:function(n){for(var b=[],d=0;d<n;d+=4)b.push(4294967296*a.random()|0);return new p.init(b,n)}}),y=r.enc={},q=y.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var d=[],c=0;c<a;c++){var j=b[c>>>2]>>>24-8*(c%4)&255;d.push((j>>>4).toString(16));d.push((j&15).toString(16))}return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c+=2)d[c>>>3]|=parseInt(a.substr(c,
2),16)<<24-4*(c%8);return new p.init(d,b/2)}},G=y.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var d=[],c=0;c<a;c++)d.push(String.fromCharCode(b[c>>>2]>>>24-8*(c%4)&255));return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c++)d[c>>>2]|=(a.charCodeAt(c)&255)<<24-8*(c%4);return new p.init(d,b)}},fa=y.Utf8={stringify:function(a){try{return decodeURIComponent(escape(G.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return G.parse(unescape(encodeURIComponent(a)))}},
h=f.BufferedBlockAlgorithm=l.extend({reset:function(){this._data=new p.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=fa.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(n){var b=this._data,d=b.words,c=b.sigBytes,j=this.blockSize,l=c/(4*j),l=n?a.ceil(l):a.max((l|0)-this._minBufferSize,0);n=l*j;c=a.min(4*n,c);if(n){for(var h=0;h<n;h+=j)this._doProcessBlock(d,h);h=d.splice(0,n);b.sigBytes-=c}return new p.init(h,c)},clone:function(){var a=l.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});f.Hasher=h.extend({cfg:l.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){h.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new ga.HMAC.init(a,
d)).finalize(b)}}});var ga=r.algo={};return r}(Math);
(function(a){var m=CryptoJS,r=m.lib,f=r.Base,g=r.WordArray,m=m.x64={};m.Word=f.extend({init:function(a,p){this.high=a;this.low=p}});m.WordArray=f.extend({init:function(l,p){l=this.words=l||[];this.sigBytes=p!=a?p:8*l.length},toX32:function(){for(var a=this.words,p=a.length,f=[],q=0;q<p;q++){var G=a[q];f.push(G.high);f.push(G.low)}return g.create(f,this.sigBytes)},clone:function(){for(var a=f.clone.call(this),p=a.words=this.words.slice(0),g=p.length,q=0;q<g;q++)p[q]=p[q].clone();return a}})})();
(function(){function a(){return g.create.apply(g,arguments)}for(var m=CryptoJS,r=m.lib.Hasher,f=m.x64,g=f.Word,l=f.WordArray,f=m.algo,p=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),
a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,
2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),
a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,
3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],y=[],q=0;80>q;q++)y[q]=a();f=f.SHA512=r.extend({_doReset:function(){this._hash=new l.init([new g.init(1779033703,4089235720),new g.init(3144134277,2227873595),new g.init(1013904242,4271175723),new g.init(2773480762,1595750129),new g.init(1359893119,2917565137),new g.init(2600822924,725511199),new g.init(528734635,4215389547),new g.init(1541459225,327033209)])},_doProcessBlock:function(a,f){for(var h=this._hash.words,
g=h[0],n=h[1],b=h[2],d=h[3],c=h[4],j=h[5],l=h[6],h=h[7],q=g.high,m=g.low,r=n.high,N=n.low,Z=b.high,O=b.low,$=d.high,P=d.low,aa=c.high,Q=c.low,ba=j.high,R=j.low,ca=l.high,S=l.low,da=h.high,T=h.low,v=q,s=m,H=r,E=N,I=Z,F=O,W=$,J=P,w=aa,t=Q,U=ba,K=R,V=ca,L=S,X=da,M=T,x=0;80>x;x++){var B=y[x];if(16>x)var u=B.high=a[f+2*x]|0,e=B.low=a[f+2*x+1]|0;else{var u=y[x-15],e=u.high,z=u.low,u=(e>>>1|z<<31)^(e>>>8|z<<24)^e>>>7,z=(z>>>1|e<<31)^(z>>>8|e<<24)^(z>>>7|e<<25),D=y[x-2],e=D.high,k=D.low,D=(e>>>19|k<<13)^
(e<<3|k>>>29)^e>>>6,k=(k>>>19|e<<13)^(k<<3|e>>>29)^(k>>>6|e<<26),e=y[x-7],Y=e.high,C=y[x-16],A=C.high,C=C.low,e=z+e.low,u=u+Y+(e>>>0<z>>>0?1:0),e=e+k,u=u+D+(e>>>0<k>>>0?1:0),e=e+C,u=u+A+(e>>>0<C>>>0?1:0);B.high=u;B.low=e}var Y=w&U^~w&V,C=t&K^~t&L,B=v&H^v&I^H&I,ha=s&E^s&F^E&F,z=(v>>>28|s<<4)^(v<<30|s>>>2)^(v<<25|s>>>7),D=(s>>>28|v<<4)^(s<<30|v>>>2)^(s<<25|v>>>7),k=p[x],ia=k.high,ea=k.low,k=M+((t>>>14|w<<18)^(t>>>18|w<<14)^(t<<23|w>>>9)),A=X+((w>>>14|t<<18)^(w>>>18|t<<14)^(w<<23|t>>>9))+(k>>>0<M>>>
0?1:0),k=k+C,A=A+Y+(k>>>0<C>>>0?1:0),k=k+ea,A=A+ia+(k>>>0<ea>>>0?1:0),k=k+e,A=A+u+(k>>>0<e>>>0?1:0),e=D+ha,B=z+B+(e>>>0<D>>>0?1:0),X=V,M=L,V=U,L=K,U=w,K=t,t=J+k|0,w=W+A+(t>>>0<J>>>0?1:0)|0,W=I,J=F,I=H,F=E,H=v,E=s,s=k+e|0,v=A+B+(s>>>0<k>>>0?1:0)|0}m=g.low=m+s;g.high=q+v+(m>>>0<s>>>0?1:0);N=n.low=N+E;n.high=r+H+(N>>>0<E>>>0?1:0);O=b.low=O+F;b.high=Z+I+(O>>>0<F>>>0?1:0);P=d.low=P+J;d.high=$+W+(P>>>0<J>>>0?1:0);Q=c.low=Q+t;c.high=aa+w+(Q>>>0<t>>>0?1:0);R=j.low=R+K;j.high=ba+U+(R>>>0<K>>>0?1:0);S=l.low=
S+L;l.high=ca+V+(S>>>0<L>>>0?1:0);T=h.low=T+M;h.high=da+X+(T>>>0<M>>>0?1:0)},_doFinalize:function(){var a=this._data,f=a.words,h=8*this._nDataBytes,g=8*a.sigBytes;f[g>>>5]|=128<<24-g%32;f[(g+128>>>10<<5)+30]=Math.floor(h/4294967296);f[(g+128>>>10<<5)+31]=h;a.sigBytes=4*f.length;this._process();return this._hash.toX32()},clone:function(){var a=r.clone.call(this);a._hash=this._hash.clone();return a},blockSize:32});m.SHA512=r._createHelper(f);m.HmacSHA512=r._createHmacHelper(f)})();

angular.module("DoctorQuick.views", []).run(["$templateCache", function($templateCache) {
$templateCache.put("views/w.html","<ion-view class=\"walkthrough-view\" cache-view=\"false\">\r\n  <ion-content class=\"padding\" scroll=\"true\">\r\n    <!--<div class=\"list text-center padding\">\r\n          <img ng-src=\"img/dq_login_logo.png\" style=\"width:65vmin; height:auto;\">\r\n    </div>-->\r\n    <div class=\"list text-center padding\">\r\n           <img ng-src=\"img/dq_login_logo.png\" style=\"width:65vmin; height:auto;\">\r\n         </div>\r\n  <form name=\"login_form\"  novalidate ng-cloak>\r\n    <div class=\"list text-center\">\r\n      <label class=\"item item-input \" >\r\n          <input  type=\"text\" placeholder=\"Phone Number\" name=\"user_phone\" ng-model=\"user.phone\" required autofocus>\r\n      </label>\r\n      <label class=\"item item-input \" show-hide-container>\r\n          <input  type=\"password\" placeholder=\"Password\" name=\"user_pin\" ng-model=\"user.pin\" required show-hide-input autofocus>\r\n      </label>\r\n    </div>\r\n    <div class=\"padding-top text-center\">\r\n      <button class=\" button button-block button-stable \" ng-click=\"doLogIn();\" >\r\n        Login\r\n      </button>\r\n    </div>\r\n    <div class=\"login_container\" >\r\n\r\n        <div class=\"conditions\" >\r\n            <p >By Logging in you agree to our <a href=\"#\">Terms&Conditions</a></p>\r\n        </div>\r\n          <div class=\"Remember row\">\r\n          <input type=\"checkbox\" value=\"None\" id=\"squaredTwo\" name=\"check\" checked />Remember me\r\n            <div class=\"col\"><a href=\"#\">Forgot Password?</a></div>\r\n          </div>\r\n         <button class=\" button button-block button-positive\" ui-sref=\"auth.patientRegistration1\" >\r\n           Register\r\n         </button>\r\n         <div class=\"row row-bottom bottom\">\r\n           <a  class=\"col button button-small button-clear  \"  ui-sref=\"auth.demo\">\r\n             <img class=\"img2\" ng-src=\"img/button_change.png\"><br><p class=\"imgtitle\">Learn More</p>\r\n           </a>\r\n           <a class=\"col col-50 button button-small button-clear  \"  ui-sref=\"auth.doctorRegistration\">\r\n             <img class=\"img2\" ng-src=\"img/doc_symbol.png\"><br><p class=\"imgtitle\">Register as a Doctor</p>\r\n           </a>\r\n         </div>\r\n\r\n\r\n\r\n      </form>\r\n    </div>\r\n\r\n\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/app/bookmarks.html","<ion-view class=\"bookmarks-view\">\n  <ion-nav-title>\n    <span>Bookmarks</span>\n  </ion-nav-title>\n  <ion-content>\n    <div ng-if=\"(bookmarks.wordpress.length == 0 && bookmarks.feeds.length == 0)\" class=\"row bookmarks-container\">\n      <div class=\"col col-center\">\n        <div class=\"empty-results\">\n          <i class=\"icon ion-bookmark\"></i>\n          <h3 class=\"no-bookmarks\">There\'s nothing here yet. Start exploring!</h3>\n        </div>\n      </div>\n    </div>\n    <ul ng-if=\"(bookmarks.wordpress.length > 0 || bookmarks.feeds.length > 0)\" class=\"bookmarks-list\">\n      <div ng-if=\"bookmarks.feeds.length > 0\" class=\"item item-divider\">\n        Feeds Bookmarks\n      </div>\n      <li class=\"bookmark-item\" ng-repeat=\"bookmark in bookmarks.feeds\">\n        <a ng-click=goToFeedPost(bookmark.link)>\n          <h2 class=\"post-title\" ng-bind-html=\"bookmark.title | rawHtml\"></h2>\n          <p class=\"post-date\">Posted <span class=\"post-time\" am-time-ago=\"bookmark.date\"></span></p>\n        </a>\n      </li>\n      <div ng-if=\"bookmarks.wordpress.length > 0\" class=\"item item-divider\">\n        Wordpress bookmarks\n      </div>\n      <li class=\"bookmark-item\" ng-repeat=\"bookmark in bookmarks.wordpress\">\n        <a ng-click=goToWordpressPost(bookmark.id)>\n          <h2 class=\"post-title\" ng-bind-html=\"bookmark.title | rawHtml\"></h2>\n          <p class=\"post-date\">Posted <span class=\"post-time\" am-time-ago=\"bookmark.date\"></span></p>\n        </a>\n      </li>\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/consultSummary.html","<ion-view class=\"summary-view\" cache-view=\"false\">\n  <ion-nav-title>\n    <span>Summary</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <a class=\"item item-avatar item-icon-right\" >\n      <img src=\"img/doc.jpg\">\n      <h2>Dr.FirstName LastName </h2> <i class=\"icon ion-android-add-circle\"></i>\n      <p class=\"degrees\">General Medicine,Degrees</p>\n        <p class=\"practice\">Practicing since 1999<span>*****</span><span>(4.9/27)</span></p>\n    </a>\n    <div class=\"card summary-content\">\n      <div class=\"row\">\n            <div class=\"col\">Messeges</div>\n            <div class=\"col right-side\"><span class=\"badge badge-positive \">{{1}}</span></div>\n      </div>\n      <div class=\"row\">\n            <div class=\"col-75\">Add Doctor to favorites</div>\n            <div class=\"col right-side\">*</div>\n      </div>\n      <div class=\"row\">\n            <div class=\"col\">Ratings</div>\n            <div class=\"col right-side\">*****</div>\n      </div>\n    </div>\n    <div class=\"top-content row\">\n      <div class=\"col col-center\">\n        <h2>Please share details with us why you were unhappy with the consultation so that we can improve our service.</h2>\n      </div>\n\n\n    </div>\n    <div class=\"textform\">\n      <label class=\"item item-input\">\n       <textarea placeholder=\" \" ></textarea>\n     </label>\n     <div class=\"col-30 col-50 col-offset-50\">\n       <button class=\"button-small button-block\">Send</button>\n     </div>\n     <!--<div class=\"row\">\n      <div class=\"col-75 col-offset-25\">\n        <button class=\"button button-block button-energized\">Button</button>\n      </div>\n    </div>-->\n\n    </div>\n    <div class=\"bottom-content row\">\n      <div class=\"col col-center\">\n\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/customercare.html","<ion-view class=\"customercare-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span>Customer Care</span>\r\n  </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n      <h1>Please contact us through the form </h1>\r\n      <h2>below or request a callback</h2>\r\n      <div class=\"textform\">\r\n        <label class=\"item item-input\">\r\n         <textarea placeholder=\" \" ></textarea>\r\n       </label>\r\n       <div class=\"col-30 col-50 col-offset-50\">\r\n         <button class=\"button button-block\">Send</button>\r\n       </div>\r\n       <!--<div class=\"row\">\r\n        <div class=\"col-75 col-offset-25\">\r\n          <button class=\"button button-block button-energized\">Button</button>\r\n        </div>\r\n      </div>-->\r\n\r\n      </div>\r\n    </div>\r\n    <div class=\"bottom-content row\">\r\n      <pre-img ratio=\"\" helper-class=\"\" class=\"cc-bottom-content\"  >\r\n          <img ng-src=\"/img/dq_icon_time_540x960.png\" spinner-on-load>\r\n        </pre-img>\r\n        <h3>Working Hours:9am to 9pm</h3>\r\n        <h4>(Indian standerd time)</h4>\r\n        <div class=\" col\">\r\n          <button class=\"button button-block\">Request a callback</button>\r\n        </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/app/doctorprofile.html","<ion-view class=\"doctor-profile-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span>Doctor Profile</span>\r\n  </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"profile-container\">\r\n      <div class=\"user-image-container\">\r\n        <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\r\n          <!--<img class=\"user-image\" ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\" spinner-on-load>-->\r\n          <img class=\"user-image \" ng-src=\"img/doc.jpg\" spinner-on-load>\r\n            <img class=\"doctor-online \" ng-src=\"\" spinner-on-load>\r\n        </pre-img>\r\n        <h1>Dr.FirstName LastName</h1>\r\n        <h2>General medicin, Degrees</h2>\r\n        <h3>practicing since 10 yers</h3>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"top-content row\">\r\n      <div class=\"col col-center\">\r\n        <div class=\"card row\">\r\n        <div class=\"  col\">\r\n          Rating\r\n        </div>\r\n        <div class=\" col\">\r\n          4.9/23\r\n        </div>\r\n        <div class=\" col\">\r\n          *****\r\n        </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"bottom-content row\">\r\n      <div class=\"col col-center\">\r\n        <h4>Request a consultation via</h4>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <button type=\"submit\" class=\"video-call button button-stable button-block\"  ng-click=\"showConfirm();\">\r\n      Voice Call\r\n    </button>\r\n      </div>\r\n    <div class=\"row\">\r\n    <button type=\"submit\" class=\"video-call button button-stable button-block\" ng-click=\"showConfirm();\">\r\n      Video Call\r\n    </button>\r\n    </div>\r\n\r\n      <h5> Consultation fee: $123</h5>\r\n\r\n\r\n\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/app/forms.html","<ion-view class=\"forms-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Forms</span>\n  </ion-nav-title>\n  <ion-content>\n    <ul class=\"list\">\n\n      <div class=\"item item-divider\">Inline Labels</div>\n      \n      <label class=\"item item-input\">\n        <span class=\"input-label\">First Name</span>\n        <input type=\"text\">\n      </label>\n      <label class=\"item item-input\">\n        <span class=\"input-label\">Last Name</span>\n        <input type=\"text\">\n      </label>\n      <label class=\"item item-input\">\n        <span class=\"input-label\">Email</span>\n        <input type=\"email\">\n      </label>\n\n      <div class=\"item item-divider\">Floating Labels</div>\n\n      <label class=\"item item-input item-floating-label\">\n        <span class=\"input-label\">Telephone</span>\n        <input type=\"tel\" placeholder=\"Your phone\">\n      </label>\n      <label class=\"item item-input item-floating-label\">\n        <span class=\"input-label\">Number</span>\n        <input type=\"number\" placeholder=\"Some number\">\n      </label>\n\n      <div class=\"item item-divider\">Stacked Labels</div>\n\n      <label class=\"item item-input item-stacked-label\">\n        <span class=\"input-label\">Birth date</span>\n        <input type=\"date\">\n      </label>\n      <label class=\"item item-input item-stacked-label\">\n        <span class=\"input-label\">Month</span>\n        <input type=\"month\">\n      </label>\n\n      <div class=\"item item-divider\">Placeholder Labels</div>\n\n      <label class=\"item item-input\">\n        <textarea placeholder=\"Description\"></textarea>\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" placeholder=\"Your password\">\n      </label>\n\n      <div class=\"item item-divider\">Inset Inputs</div>\n\n      <div class=\"item item-input-inset\">\n        <label class=\"item-input-wrapper\">\n          <input type=\"text\" placeholder=\"Search...\">\n        </label>\n        <button class=\"button button-small\">\n          Submit\n        </button>\n      </div>\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/medicalSpeciality.html","<ion-view class=\"medical-speciality-view\" cache-view=\"false\">\n  <ion-nav-title>\n   <span>Medical Speciality</span>\n </ion-nav-title>\n  <ion-content >\n    <a class=\"item  item-icon-right\" ui-sref=\"app.specialityDetails\"><!---->\n           <h2>Anasthsia</h2>\n           <p>lorem ipsum lorem ipsum</p>  <i class=\"icon ion-android-alert\"></i>\n    </a>\n\n    <a class=\"item  item-icon-right\" ><!--ui-sref=\"app.doctorprofile\"-->\n       <h2>Dermotalogy</h2>\n       <p>lorem ipsum lorem ipsum</p>  <i class=\"icon ion-android-add-circle\"></i>\n   </a>\n   <a class=\"item  item-icon-right\" ><!--ui-sref=\"app.doctorprofile\"-->\n       <h2>Emergency Medicine</h2>\n       <p>lorem ipsum lorem ipsum</p>  <i class=\"icon ion-android-alert\"></i>\n   </a>\n   <a class=\"item  item-icon-right\" ui-sref=\"app.specialityDetails\"><!---->\n          <h2>Anasthsia</h2>\n          <p>lorem ipsum lorem ipsum</p>  <i class=\"icon ion-android-alert\"></i>\n   </a>\n\n   <a class=\"item  item-icon-right\" ><!--ui-sref=\"app.doctorprofile\"-->\n      <h2>Dermotalogy</h2>\n      <p>lorem ipsum lorem ipsum</p>  <i class=\"icon ion-android-add-circle\"></i>\n  </a>\n  <a class=\"item  item-icon-right\" ><!--ui-sref=\"app.doctorprofile\"-->\n      <h2>Emergency Medicine</h2>\n      <p>lorem ipsum lorem ipsum</p>  <i class=\"icon ion-android-alert\"></i>\n  </a>\n    <div class=\"top-content row\">\n      <div class=\"col col-center\">\n\n      </div>\n    </div>\n    <div class=\"bottom-content row\">\n      <div class=\"col col-center\">\n\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/myconsultations.html","<ion-view class=\"mypatient-profile-view\">\r\n  <ion-nav-title>\r\n    <span>My Consultations</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n\r\n\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"app.consultSummary\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.consultSummary\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"app.consultSummary\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.consultSummary\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"app.consultSummary\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.consultSummary\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"app.consultSummary\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/app/mydoctors.html","<ion-view class=\"mydoctor-profile-view\">\r\n  <ion-nav-title>\r\n    <span>My Doctors</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.doctorprofile\">\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName </h2> <i class=\"icon ion-android-add-circle\"></i>\r\n            <p>General Medicine,Degrees</p>\r\n              <p>Practicing since 1999<span>*****</span></p>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.doctorprofile\">\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName </h2><i class=\"icon ion-android-add-circle\"></i>\r\n            <p>General Medicine,Degrees</p>\r\n            <p>Practicing since 1999<span>*****</span></p>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.doctorprofile\">\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName </h2><i class=\"icon ion-android-add-circle\"></i>\r\n            <p>General Medicine,Degrees</p>\r\n              <p>Practicing since 1999<span>*****</span></p>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.doctorprofile\">\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName </h2><i class=\"icon ion-android-add-circle\"></i>\r\n            <p>General Medicine,Degrees</p>\r\n            <p>Practicing since 1999<span>*****</span></p>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.doctorprofile\">\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName </h2><i class=\"icon ion-android-add-circle\"></i>\r\n            <p>General Medicine,Degrees</p>\r\n              <p>Practicing since 1999<span>*****</span></p>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.doctorprofile\">\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName </h2><i class=\"icon ion-android-add-circle\"></i>\r\n            <p>General Medicine,Degrees</p>\r\n            <p>Practicing since 1999<span>*****</span></p>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ui-sref=\"app.doctorprofile\">\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName </h2><i class=\"icon ion-android-add-circle\"></i>\r\n            <p>General Medicine,Degrees</p>\r\n              <p>Practicing since 1999<span>*****</span></p>\r\n          </a>\r\n\r\n    <div class=\"bottom-content\">\r\n\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/app/patientPayments.html","<ion-view class=\"patient-payment-view\" cache-view=\"false\">\r\n\r\n  <ion-nav-title>\r\n    <span>Payments</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n\r\n    <div class=\"top-content row\">\r\n      <div class=\"profile-container\">\r\n        <div class=\"user-image-container\">\r\n          <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\r\n            <!--<img class=\"user-image\" ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\" spinner-on-load>-->\r\n           <img ng-src=\"/img/dq_icon_payments_large_540x960.png\" spinner-on-load>\r\n          </pre-img>\r\n        </div>\r\n        <h1>DoctorQuick Wallet</h1>\r\n        <h2>Balance<span>$72.00</span></h2>\r\n    </div>\r\n\r\n\r\n    </div>\r\n    <div class=\"button-container\">\r\n      <button  type=\"submit\" class=\"refund button button-balanced\" ui-sref=\"app.patientRefund\">\r\n         Refund\r\n        </button>\r\n       <button class=\"topup button button-balanced\" ui-sref=\"app.patientTopup\">\r\n         Topup\r\n       </button>\r\n\r\n    </div>\r\n<ion-item class=\"item-divider\">Transaction History</ion-item>\r\n<div class=\"bottom-content\">\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n\r\n</div>\r\n\r\n</ion-content>\r\n\r\n\r\n</ion-view>\r\n");
$templateCache.put("views/app/patientRefund.html","<ion-view class=\"patient-refund-view\" cache-view=\"false\">\r\n\r\n  <ion-nav-title>\r\n    <span>Refund</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n\r\n    <div class=\"top-content row\">\r\n      <div class=\"profile-container\">\r\n        <div class=\"user-image-container\">\r\n          <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\r\n            <!--<img class=\"user-image\" ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\" spinner-on-load>-->\r\n           <img ng-src=\"/img/dq_icon_payments_large_540x960.png\" spinner-on-load>\r\n          </pre-img>\r\n        </div>\r\n        <h1>DoctorQuick Wallet</h1>\r\n        <h2>Balance:$72.00</h2>\r\n\r\n\r\n    </div>\r\n\r\n    </div>\r\n    <div class=\"refund\">\r\n      <label class=\"item item-input\" name=\"refund_amt\">\r\n          <input type=\"number\" placeholder=\"00.00\">\r\n      </label>\r\n    </div>\r\n    <div class=\"button-container\">\r\n    <button class=\"refund.button button button-balanced button-block\" >Refund</button>\r\n    </div>\r\n\r\n<ion-item class=\"item-divider\">Transaction History</ion-item>\r\n<div class=\"bottom-content\">\r\n\r\n  <a class=\"item  item-avatar\" ui-sref=\"\">\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" ui-sref=\"\">\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n  <a class=\"item  item-avatar\" ui-sref=\"\">\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n\r\n</div>\r\n\r\n</ion-content>\r\n\r\n\r\n</ion-view>\r\n");
$templateCache.put("views/app/patientTopup.html","<ion-view class=\"patient-topup-view\" cache-view=\"false\">\r\n\r\n  <ion-nav-title>\r\n    <span>Topup</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n\r\n    <div class=\"top-content row\">\r\n      <div class=\"profile-container\">\r\n        <div class=\"user-image-container\">\r\n          <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\r\n            <!--<img class=\"user-image\" ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\" spinner-on-load>-->\r\n           <img ng-src=\"/img/dq_icon_payments_large_540x960.png\" spinner-on-load>\r\n          </pre-img>\r\n        </div>\r\n        <h1>DoctorQuick Wallet</h1>\r\n        <h2>Balance:$72.00</h2>\r\n\r\n\r\n\r\n    </div>\r\n\r\n    </div>\r\n    <div class=\"refund\">\r\n        <h3>(You can always get a refund of your left your balance)</h3>\r\n      <label class=\"item item-input\" name=\"refund_amt\">\r\n          <input type=\"number\" placeholder=\"00.00\">\r\n      </label>\r\n    </div>\r\n    <div class=\"button-container\">\r\n    <button class=\"refund.button button button-balanced button-block\" >Topup</button>\r\n    </div>\r\n\r\n<ion-item class=\"item-divider\">Transaction History</ion-item>\r\n<div class=\"bottom-content\">\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n\r\n</div>\r\n\r\n</ion-content>\r\n\r\n\r\n</ion-view>\r\n");
$templateCache.put("views/app/profile.html","<ion-view class=\"patientprofile-view\" cache-view=\"false\">\n\n  <ion-nav-buttons side=\"primary\">\n\n    </ion-nav-buttons>\n  <ion-nav-title >\n    <span>Patient Profile</span>\n\n  </ion-nav-title>\n  <ion-content>\n\n    <div class=\"top-content row\">\n      <div class=\"\">\n        <div class=\"user-image-container\">\n          <pre-img >\n            <img class=\"user-image\" ng-src=\"/img/doc.jpg\" spinner-on-load>\n          </pre-img>\n          <div class=\"user-name\"><h4>FirstName LastName </h4></div>\n\n        </div>\n\n      </div>\n\n    </div>\n<div class=\"bottom-content\">\n\n    <div class=\"card \">\n      <div class=\"row\">\n            <div class=\"col\">Age</div>\n            <div class=\"col\">33</div>\n\n      </div>\n      <div class=\"row\">\n            <div class=\"col\">Gender</div>\n            <div class=\"col\">Male</div>\n\n      </div>\n\n    </div>\n\n    <div class=\"card\">\n      <div class=\"row\">\n            <div class=\"col\">Email</div>\n            <div class=\"col col-67\">ravikiran@greettech.com</div>\n\n      </div>\n    </div>\n\n    <div class=\"card \">\n      <div class=\"row\">\n            <div class=\"col\">Language 1</div>\n            <div class=\"col\">English</div>\n\n      </div>\n      <div class=\"row\">\n            <div class=\"col\">Language 2</div>\n            <div class=\"col\">Kannada</div>\n\n      </div>\n    </div>\n\n    <div class=\"card\" ui-sref=\"templates.patientchat\">\n        <div class=\"row\">\n              <div class=\"col\">Change Password</div>\n        </div>\n     </div>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/searchDoctors.html","<ion-view class=\"search-view\">\r\n  <ion-nav-title>\r\n    <span>Search All Doctors</span>\r\n  </ion-nav-title>\r\n\r\n  <ion-content>\r\n    <div class=\"item list dark item-input-inset\">\r\n        <label class=\"item-input-wrapper\">\r\n          <input type=\"text\" placeholder=\"Search...\">\r\n        </label>\r\n        <button class=\"button button-small\">\r\n          Cancel\r\n        </button>\r\n      </div>\r\n      <div class=\"top-content\">\r\n              <div class=\"list dark \">\r\n\r\n            <a class=\"item item-icon-right \" ui-sref=\"app.doctorprofile\"  animation=\"slide-left-right\">\r\n\r\n              <h2>Speciality</h2><i class=\"icon ion-ios-arrow-right\"></i>\r\n\r\n            </a>\r\n\r\n            <a class=\"item item-icon-right \" ui-sref=\"\">\r\n\r\n              <h2>Gender</h2><i class=\"icon ion-ios-arrow-right\"></i>\r\n            </a>\r\n\r\n            <a class=\"item item-icon-right \" ui-sref=\"\">\r\n\r\n              <h2>Online/Offline</h2><i class=\"icon ion-ios-arrow-right\"></i>\r\n\r\n            </a>\r\n          </div>\r\n      </div>\r\n\r\n  </ion-content>\r\n\r\n</ion-view>\r\n");
$templateCache.put("views/app/settings.html","<ion-view class=\"settings-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Settings</span>\n  </ion-nav-title>\n  <ion-content>\n    <ul class=\"list\">\n\n      <div class=\"item item-divider\">TOGGLE</div>\n\n      <ion-toggle ng-model=\"airplaneMode\" toggle-class=\"toggle-assertive\">Airplane Mode</ion-toggle>\n      <ion-toggle ng-model=\"wifi\" toggle-class=\"toggle-positive\">Wi-Fi</ion-toggle>\n      <ion-toggle ng-model=\"bluetooth\" toggle-class=\"toggle-calm\">Bluetooth</ion-toggle>\n      <ion-toggle ng-model=\"personalHotspot\" toggle-class=\"toggle-dark\">Personal Hotspot</ion-toggle>\n\n      <div class=\"item item-divider\">CHECKBOXES</div>\n\n      <ion-checkbox ng-model=\"checkOpt1\">Option 1</ion-checkbox>\n      <ion-checkbox ng-model=\"checkOpt2\">Option 2</ion-checkbox>\n      <ion-checkbox ng-model=\"checkOpt3\">Option 3</ion-checkbox>\n\n      <div class=\"item item-divider\">RADIO</div>\n\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'A\'\">Choose A</ion-radio>\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'B\'\">Choose B</ion-radio>\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'C\'\">Choose C</ion-radio>\n\n      <div class=\"item item-divider\">RANGES</div>\n\n      <div class=\"range\">\n        <i class=\"icon ion-volume-low\"></i>\n        <input type=\"range\" name=\"volume\">\n        <i class=\"icon ion-volume-high\"></i>\n      </div>\n      <div class=\"item range range-positive\">\n        <i class=\"icon ion-ios-sunny-outline\"></i>\n        <input type=\"range\" name=\"volume\" min=\"0\" max=\"100\" value=\"33\">\n        <i class=\"icon ion-ios-sunny\"></i>\n      </div>\n\n      <div class=\"item item-divider\"></div>\n\n      <button class=\"button button-block button-assertive\" ng-click=\"showLogOutMenu()\">\n        Logout\n      </button>\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/side-menu.html","<ion-side-menus enable-menu-with-back-views=\"true\" class=\"patientSidemenu-view\">\n  <ion-side-menu-content class=\"post-size-14px\">\n    <ion-nav-bar class=\"bar app-top-bar\" align-title=\"left\">\n\n      <ion-nav-buttons side=\"right\">\n        <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"right\">\n        </button>\n      </ion-nav-buttons>\n    </ion-nav-bar>\n    <ion-nav-view name=\"menuContent\"></ion-nav-view>\n  </ion-side-menu-content>\n\n  <ion-side-menu side=\"right\" class=\"main-menu\" expose-aside-when=\"large\">\n    <ion-content>\n      <ion-list>\n       <ion-item class=\"heading-item\" nav-clear menu-close ui-sref=\"\">\n          <!--<div class=\"user-image-container\">\n            <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\n              <img class=\"user-image\" ng-src=\"/img/ionic.png\" spinner-on-load>\n          	</pre-img>\n          </div>-->\n          <!--<h2 class=\"greeting\">Name</h2>\n         <p class=\"message\">Welcome back Name</p>-->\n        </ion-item>\n        <ion-item class=\"item-icon-left\" ui-sref=\"app.profile\" menu-close>\n          <i class=\"icon ion-android-bookmark\"></i>\n          <h2 class=\"menu-text\">Profile</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.mydoctors\">\n          <i class=\"icon ion-radio-waves\"></i>\n          <h2 class=\"menu-text\">My Doctors</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.myconsultations\">\n          <i class=\"icon ion-social-wordpress\"></i>\n          <h2 class=\"menu-text\">My Consultations</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.patientPayments\">\n          <i class=\"icon ion-wand\"></i>\n          <h2 class=\"menu-text\">Payments</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.miscellaneous\">\n          <i class=\"icon ion-asterisk\"></i>\n          <h2 class=\"menu-text\">Review App</h2>\n        </ion-item>\n        <!--<ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.forms\">\n          <i class=\"icon ion-document\"></i>\n          <h2 class=\"menu-text\">Notifications</h2>\n          <ion-toggle ng-model=\"airplaneMode\" toggle-class=\"toggle-assertive\">Airplane Mode</ion-toggle>\n        </ion-item>-->\n        <!-- <b>{{ simple || false }}</b>-->\n        <!--<ion-toggle class=\"item item-icon-left dark-bg\" ion-toggle-text ng-model=\"simple\">\n          <i class=\"icon ion-document\"></i><h2 class=\"menu-text\">Notification</h2>\n        </ion-toggle>-->\n        <ion-item style=\"background-color:#20242c !important\" nav-clear   >\n\n      <div ><h2 class=\"menu-text\"><i class=\"icon ion-document\"></i>Notification</h2></div>                                            <div class=\"slideThree\">\n           <input type=\"checkbox\" value=\"None\" id=\"slideThree\" name=\"check\" checked />\n           <label for=\"slideThree\"></label>\n         </div>\n       </ion-item>\n      <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.customercare\">\n          <i class=\"icon ion-gear-a\"></i>\n          <h2 class=\"menu-text\">Customer Care</h2>\n        </ion-item>\n\n\n\n\n        <!--<button class=\"button button button-stable button-block\" ng-click=\"showLogOutMenu()\">\n        Logout\n      </button>-->\n    </ion-list>\n    </ion-content>\n    <ion-footer-bar align-title=\"left\" class=\"bar-positive item-icon-left\">\n\n        <i class=\"icon ion-android-bookmark\"></i>\n        <h5 class=\"menu-text\">Signout</h5>\n\n\n    </ion-footer-bar>\n  </ion-side-menu>\n</ion-side-menus>\n");
$templateCache.put("views/app/specialityDetails.html","<ion-view class=\"sepecility-details-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n   <span>Medical Speciality</span>\r\n </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <a class=\"item dark item-avatar item-icon-right\"  ><!--ui-sref=\"app.doctorprofile\"-->\r\n        <img src=\"img/dq_icon_specialities_medium_540x960.png\">\r\n        <div><h2>Anasthesia </h2>\r\n        <p>Description and details about speciality</p>\r\n        </div>\r\n        <i class=\"icon ion-android-alert\"></i>\r\n    </a>\r\n<p class=\"description\">Medications that cause anaesthesia are called anaesthetics. Anaesthetics are used during tests and surgical operations to numb sensation in certain areas of the body or induce sleep. This prevents pain and discomfort, and enables a wide range of medical procedures to be carried out.Medications that cause anaesthesia are called anaesthetics. Anaesthetics are used during tests and surgical operations to numb sensation in certain areas of the body or induce sleep. This prevents pain and discomfort, and enables a wide range of medical procedures to be carried out.</p>\r\n<div class=\"card \">\r\n  <div class=\"row\">\r\n        <div class=\"col\">Online Doctors</div>\r\n        <div class=\"col right-side\">25</div>\r\n  </div>\r\n</div>\r\n<p class=\"sendRequest\">Send request for a consultation to all {{Anasthesia}} Specialists who are online</p>\r\n    <a class=\"login button button-block button-stable\" >\r\n      send Request\r\n    </a>\r\n\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/auth/auth.html","<ion-nav-view class=\"auth-outer\">\n	<div multi-bg=\"[\'img/background.png\']\"></div>\n	<!-- <div multi-bg=\"[\'img/bg-img.jpg\']\"></div> -->\n</ion-nav-view>\n");
$templateCache.put("views/auth/DoctorRegister.html","<html>\r\n<head>\r\n</head>\r\n<body>\r\n<p>Hello DOC</p>\r\n</body>\r\n</html>\r\n");
$templateCache.put("views/auth/doctorRegistration.html","<ion-view class=\"doctor-reg-view\" cache-view=\"false\">\r\n  <ion-content scroll=\"false\">\r\n     <p class=\"doct\"> Doctor Registration</p>\r\n     <img src=\"img/progress1.png\" >\r\n     <p class=\"dqdesc\"> DoctorQuick is a unique technology to help you consult and treat patients at your own time and pace from different corners of the country and get paid for your time.</p>\r\n     <form class=\"list\">\r\n\r\n            <label class=\"item item-input\" name=\"doc_fname\">\r\n                <input type=\"text\" placeholder=\"First Name\" ng-model=\"doc_fname\">\r\n            </label>\r\n\r\n         <div class=\"spa\"> </div>\r\n\r\n            <label class=\"item item-input\" name=\"doc_mname\">\r\n                <input type=\"text\" placeholder=\"Middle Name\" ng-model=\"doc_mname\">\r\n            </label>\r\n\r\n              <div class=\"spa\"> </div>\r\n\r\n            <label class=\"item item-input\" name=\"doc_lname\" >\r\n                <input type=\"text\" placeholder=\"Last Name\" ng-model=\"doc_lname\">\r\n            </label>\r\n\r\n\r\n            <a  class=\"login button button button-block button-balanced \" ui-sref=\"auth.doctorRegistration2\">Next</a>\r\n\r\n      </form>\r\n  \r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/auth/doctorRegistration2.html","<ion-view class=\"doc-reg2-view\" cache-view=\"false\">\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n      <div class=\"col col-center\">\r\n        <img src=\"img/progress2.png\">\r\n      </div>\r\n\r\n    </div>\r\n    <form class=\"list\">\r\n\r\n          <label class=\"item item-input\" name=\"doc_email\">\r\n              <input type=\"email\" placeholder=\"Email Address\">\r\n          </label>\r\n\r\n          <div class=\"spacerform\"> </div>\r\n\r\n          <label class=\"item item-input\" name=\"doc_phnum\">\r\n              <input type=\"tel\" placeholder=\"Mobile Number\">\r\n          </label>\r\n\r\n          <div class=\"spacerform\"></div>\r\n\r\n          <button class=\"login button button-balanced\" ng-click=\"showConfirm();\">Submit</button>\r\n      </form>\r\n\r\n    <div class=\"bottom-content row\">\r\n      <div class=\"col col-center\">\r\n\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/auth/doctorThankq.html","\r\n<ion-view class=\"signup-view auth-view\" cache-view=\"false\">\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"row\">\r\n      <div class=\"col col-center\">\r\n        <div class=\"card sign-up-container\">\r\n          <p>Thankq</p>\r\n        <form name=\"signup_form\" class=\"\" novalidate>\r\n            <div class=\"item item-body\">\r\n\r\n            </div>\r\n            <div class=\"item item-body bottom-content\">\r\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"cancel()\" >\r\n                Close\r\n              </button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"alternative-actions\">\r\n          <a class=\"log-in button button-small button-clear button-light\" ui-sref=\"auth.login\">\r\n            Login\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/auth/forgot-password.html","<ion-view class=\"forgot-password-view auth-view\" cache-view=\"false\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card forgot-password-container\">\n          <form name=\"forgot_password_form\" class=\"\" novalidate>\n            <div class=\"item item-body\">\n              <label class=\"item item-input\">\n                <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n              </label>\n            </div>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"recoverPassword()\" ng-disabled=\"forgot_password_form.$invalid\">\n                Recover it\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <a class=\"log-in button button-small button-clear button-light\" ui-sref=\"auth.login\">\n            Log In\n          </a>\n          <a class=\"sign-up button button-small button-clear button-light\" ui-sref=\"auth.signup\">\n            Sign Up\n          </a>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/login.html","<ion-view class=\"login-view auth-view\" cache-view=\"false\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card login-container\" content-tabs tabsdata=\'tabsdata\'>\n          <form name=\"login_form\" class=\"\" novalidate ng-cloak>\n            <my-tabs>\n              <!--Email Login TAb-->\n            <!--  <my-tab title=\"Email\">\n                <div class=\"list\">\n                  <label class=\"item item-input\">\n                    <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n                  </label>\n                  <label class=\"item item-input\" show-hide-container>\n                    <input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\n                  </label>\n                </div>\n              </my-tab>-->\n              <my-tab title=\"Phone\">\n                <p>Hello</p>\n                <div class=\"list\">\n                  <label class=\"item item-input\">\n                    <input type=\"text\" placeholder=\"Phone number\" name=\"user_phone\" ng-model=\"user.phone\" required>\n                  </label>\n                  <label class=\"item item-input\" show-hide-container>\n                    <input type=\"password\" placeholder=\"PIN\" name=\"user_pin\" ng-model=\"user.pin\" required valid-pin=\"user.pin\" show-hide-input>\n                  </label>\n                </div>\n              </my-tab>\n            </my-tabs>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"doLogIn()\" ng-disabled=\"(selected_tab==\'Email\') ? (login_form.user_email.$invalid || login_form.user_password.$invalid) : ((selected_tab==\'Phone\') ? (login_form.user_phone.$invalid || login_form.user_pin.$invalid) : false)\">\n                Log In\n              </button>\n              <center><p>By Logging in you agree to our <a href=\"#\">Terms&Conditions</a></p></center>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <a class=\"forgot-password button button-small button-clear button-light\" ui-sref=\"auth.forgot-password\">\n            Forgot Password?\n          </a>\n          <a class=\"sign-up button button-small button-clear button-light\" ui-sref=\"auth.signup\">\n            Signup\n          </a>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n  <ion-side-menu-content>\n    <ion-nav-bar class=\"bar-stable\">\n      <ion-nav-back-button>\n      </ion-nav-back-button>\n\n      <ion-nav-buttons side=\"right\">\n        <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"right\">\n        </button>\n      </ion-nav-buttons>\n    </ion-nav-bar>\n    <ion-nav-view name=\"menuContent\"></ion-nav-view>\n  </ion-side-menu-content>\n\n  <ion-side-menu side=\"left\">\n    <ion-header-bar class=\"bar-stable\">\n      <h1 class=\"title\">Left</h1>\n    </ion-header-bar>\n    <ion-content>\n      <ion-list>\n        <ion-item menu-close ng-click=\"login()\">\n          Login\n        </ion-item>\n        <ion-item menu-close href=\"#/app/search\">\n          Search\n        </ion-item>\n        <ion-item menu-close href=\"#/app/browse\">\n          Browse\n        </ion-item>\n        <ion-item menu-close href=\"#/app/playlists\">\n          Playlists\n        </ion-item>\n      </ion-list>\n    </ion-content>\n  </ion-side-menu>\n</ion-side-menus>\n");
$templateCache.put("views/auth/patientRegistration1.html","<ion-view class=\"patient-reg-1-view\" cache-view=\"false\">\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"mainHeading\">\r\n\r\n         <p>Patient Registration</p>\r\n\r\n     </div>\r\n     <img class=\"img1\" src=\"img/iOS-Assets-v01_patient_registration_progress1.png\" >\r\n     <div class=\"Content\">\r\n\r\n     <p> Register now and get your first consultation FREE with doctor of your choice. </p>\r\n\r\n    </div>\r\n    <form class=\"list\">\r\n          <div class=\"input-types\">\r\n                  <label class=\"item item-input\" name=\"pat_fname\">\r\n                      <input type=\"text\" placeholder=\"First Name\" >\r\n                  </label>\r\n\r\n                  <label class=\"item item-input\" name=\"pat_mname\">\r\n                      <input type=\"text\" placeholder=\"Middle Name\">\r\n                  </label>\r\n\r\n                  <label class=\"item item-input\" name=\"pat_lname\">\r\n                      <input type=\"text\" placeholder=\"Last Name\">\r\n                  </label>\r\n\r\n                  <label class=\"item item-input\" name=\"pat_lname\">\r\n                      <input type=\"number\" placeholder=\"Age\">\r\n                  </label>\r\n          </div>\r\n      </div>\r\n\r\n\r\n        <button class=\"login button button-block button-calm  \" ui-sref=\"auth.patientRegistration2\">Next</button>\r\n\r\n              <h2 > By Signing in, I agree to DoctorQuicks </h2>\r\n              <h3 class=\"link\"><a href=\"#\">Terms and Conditions</a> </h3>\r\n      </form>\r\n\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/auth/patientRegistration2.html","<ion-view class=\"patient-reg-2-view\" cache-view=\"false\">\r\n  <ion-content scroll=\"false\">\r\n\r\n    <img src=\"img/iOS-Assets-v01_patient_registration_progress2.png\" >\r\n    <div class=\"detailspatient\">\r\n\r\n       <p> Age, gender, email &amp; password</p>\r\n\r\n   </div>\r\n   <form class=\"list\">\r\n\r\n      <div class=\"input-types\">\r\n\r\n          <label class=\"item item-input\" name=\"doc_phnum\">\r\n              <input type=\"tel\" placeholder=\"Mobile Number\">\r\n          </label>\r\n\r\n            <button small  class=\" button-small button-light   ion-male\"   ng-click=\"gender();\">Male</button>\r\n            <button small class=\"female button-small button-light   ion-female\"  ng-click=\"gender();\">Female</button>\r\n          <div class=\"e-mail\">\r\n                <label class=\" item item-input\" name=\"pat_email\">\r\n                    <input type=\"email\" placeholder=\"Email Address\">\r\n                </label>\r\n\r\n          </div>\r\n          <div class=\"password\">\r\n            <label class=\"item item-input\" name=\"pat_email\">\r\n                <input type=\"password\" placeholder=\"Password\">\r\n            </label>\r\n\r\n          </div>\r\n\r\n      </div>\r\n          <button class=\"login button button-block button-calm  \" ui-sref=\"auth.patientRegistration3\">Next</button>\r\n\r\n            <h2 > By Signing in, I agree to DoctorQuicks </h2>\r\n            <h3 class=\"link\"><a href=\"#\">Terms and Conditions</a> </h3>\r\n          \r\n        </form>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/auth/patientRegistration3.html","<ion-view class=\"patient-reg-3-view\" cache-view=\"false\">\r\n  <ion-content scroll=\"false\">\r\n    <img  src=\"img/iOS-Assets-v01_patient_registration_progress3.png\">\r\n    <h1> Please enter the 4 digit verification code in the text message sent to </h1>\r\n    <h2>9844992181</h2>\r\n\r\n    <form class=\"formdata\">\r\n\r\n           <div class=\"row\">\r\n               <div class=\"col\">\r\n                 <label class=\"item item-input\" name=\"otp\">\r\n                     <input type=\"number\" placeholder=\"1\" maxlength=\"1\">\r\n                 </label>\r\n               </div>\r\n               <div class=\"col\">\r\n                 <label class=\"item item-input\" name=\"otp\">\r\n                     <input type=\"number\" placeholder=\"2\" maxlength=\"1\">\r\n                 </label>\r\n               </div>\r\n               <div class=\"col\">\r\n                 <label class=\"item item-input\" name=\"otp\">\r\n                     <input type=\"number\" placeholder=\"3\" maxlength=\"1\">\r\n                 </label>\r\n               </div>\r\n               <div class=\"col\">\r\n                 <label class=\"item item-input\" name=\"otp\">\r\n                     <input type=\"number\" placeholder=\"4\" maxlength=\"1\">\r\n                 </label>\r\n               </div>\r\n           </div>\r\n          <div class=\"button-container\">\r\n\r\n            <button class=\" login button button-balanced\"> Resend </button>\r\n\r\n            <button type=\"submit\" class=\"login button button-balanced \" ng-click=\"doLogIn();\" ng-disabled=\"(login_form.user_phone.$invalid || login_form.user_pin.$invalid) : false\">\r\n              Confirm\r\n            </button>\r\n          </div>\r\n\r\n   </form>\r\n   <h3>Din\'t receive a text from DoctorQuick? <p>Tap Resend.</p></h3>\r\n   <h4>By signing in, I agree to DoctorQuicks <p><a href=\"#\">Terms and Conditions</a></p> </h4>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/auth/signup.html","\n<ion-view class=\"signup-view auth-view\" cache-view=\"false\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card sign-up-container\">\n          <form name=\"signup_form\" class=\"\" novalidate>\n            <div class=\"item item-body\">\n              <label class=\"item item-input\">\n                <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n              </label>\n              <label class=\"item item-input\" show-hide-container>\n                <input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\n              </label>\n            </div>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"doSignUp()\" ng-disabled=\"signup_form.$invalid\">\n                Signup\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <a class=\"log-in button button-small button-clear button-light\" ui-sref=\"auth.login\">\n            Login\n          </a>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/walkthrough.html","<ion-view class=\"walkthrough-view\" cache-view=\"false\" hide-back-button=\"true\">\r\n        <ion-content class=\"padding-top\">\r\n          <div class=\"logo_container\">\r\n            <img class=\"logo \" ng-src=\"img/dq_login_logo.png\" >\r\n          </div>\r\n\r\n\r\n          <form novalidate name=\"loginForm\" ng-submit=\"loginForm.$valid && signIn(user)\">\r\n          <div class=\"list\">\r\n            <label class=\"item item-input phone_field text-center\" >\r\n                <input  type=\"text\" placeholder=\"Phone Number\" name=\"user_phone\" ng-model=\"user.phone\" required autofocus>\r\n            </label>\r\n            <label class=\"item item-input password_field \" show-hide-container>\r\n                <input  type=\"password\" placeholder=\"Password\" name=\"user_pin\" ng-model=\"user.pin\" required show-hide-input autofocus>\r\n            </label>\r\n            <button class=\"login_button button button-block button-stable \" ng-click=\"doLogIn();\" >\r\n              Login\r\n            </button>\r\n            <div class=\"conditions\" >\r\n                      <p class=\"login-fonts text-center\">By Logging in you agree to our <a href=\"#\">Terms&Conditions</a></p>\r\n            </div>\r\n          <!--  <label class=\"item item-input \" show-hide-container>\r\n                <input  type=\"password\" placeholder=\"Password\" name=\"user_pin\" ng-model=\"user.pin\" required show-hide-input autofocus>\r\n            </label>-->\r\n            <button class=\"login_button button button-block button-calm \" ui-sref=\"auth.patientRegistration1\" >\r\n              Register\r\n            </button>\r\n          </div>\r\n\r\n          <div class=\"padding-top text-center\">\r\n\r\n          </div>\r\n        </form>\r\n        </ion-content>\r\n        <div class=\"row row-bottom bottom\">\r\n             <a  class=\"col button button-small button-clear  \"  ui-sref=\"auth.demo\">\r\n               <img class=\"img2\" ng-src=\"img/button_change.png\"><br><p class=\"doc_reg\" style=\"text-align: center\">Learn More</p>\r\n             </a>\r\n             <a class=\"col col-50 button button-small button-clear  \"  ui-sref=\"auth.doctorRegistration\">\r\n               <img class=\"img2\" ng-src=\"img/doc_symbol.png\"><br><p class=\"doc_reg\" style=\"text-align: center\">Register as a Doctor</p>\r\n             </a>\r\n       </div>\r\n</ion-view>\r\n");
$templateCache.put("views/common/ionic-youtube-video.html","<youtube-video video-id=\"videoId\" player=\"yt_video\" player-vars=\"playerVars\"></youtube-video>\n");
$templateCache.put("views/common/multi-bg.html","<div class=\"multi-bg-outer\" ng-class=\"{ \'finish-loading\': loaded }\">\n	<img bg class=\"multi-bg {{ helperClass }}\" ng-src=\"{{ bg_img }}\"/>\n	<!--<span class=\"bg-overlay\"></span>-->\n	<ion-spinner ng-show=\"!loaded\" class=\"spinner-on-load\"></ion-spinner>\n	<!-- <span ng-show=\"!loaded\" class=\"spinner-on-load ion-load-c\"></span> -->\n	<ng-transclude></ng-transclude>\n</div>\n");
$templateCache.put("views/common/my-tab.html","<div class=\"tab-content ng-cloak ng-hide\" ng-cloak ng-show=\"selected\" ng-transclude></div>\n");
$templateCache.put("views/common/my-tabs.html","<div class=\"item item-divider card-heding\">\n	<div class=\"tabs-striped\">\n		<div class=\"tabs\">\n			<a ng-repeat=\"tab in tabs\" ng-click=\"select(tab)\" ng-class=\"{ active: tab.selected }\" class=\"tab-item\">{{tab.title}}</a>\n		</div>\n	</div>\n</div>\n<div class=\"item item-body\">\n	<div class=\"tabs-content\" ng-transclude></div>\n</div>\n");
$templateCache.put("views/common/pre-img.html","<div class=\"pre-img {{ratio}} {{ helperClass }}\" ng-class=\"{ \'finish-loading\': loaded }\">\n	<ion-spinner ng-show=\"!loaded\" class=\"spinner-on-load\"></ion-spinner>\n	<!-- <span ng-show=\"!loaded\" class=\"spinner-on-load ion-load-c\"></span> -->\n	<ng-transclude></ng-transclude>\n</div>\n");
$templateCache.put("views/common/show-hide-password.html","<div class=\"show-hide-input\" ng-transclude>\n</div>\n<a class=\"toggle-view-anchor\" on-touch=\"toggleType($event)\">\n	<span class=\"ion-eye-disabled\" ng-show=\"show\"></span>\n	<span class=\"ion-eye\" ng-show=\"!show\"></span>\n</a>\n");
$templateCache.put("views/patient/medicalSpeciality.html","<ion-view class=\"profile-view\">\r\n  <ion-nav-title>\r\n    <span>My Consultations</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n    <div class=\"top-content1\">\r\n            <div class=\"list dark item\">\r\n\r\n          <a class=\"item item-avatar item-icon-right\" ><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\" ><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/doc.jpg\">\r\n            <h2>Dr.FirstName LastName <span>2015/11/23</span></h2>\r\n            <p><font size=2>Last sent/received msg</font></p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"bottom-content\">\r\n\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/patient/patientRegistration1.html","<ion-view title=\"Patient Registration1\">\n    <ion-content padding=\"\'true\'\" class=\"has-header\">\n        <div>\n            <center>Patient Registration</center>\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 9px;\"></div>\n        <img src=\"img/lg6fumZSgK9SqSpF5qUa_iOS-Assets-v01_patient_registration_progress1.png\" width=\"50%\" height=\"auto\" style=\"width: 50%; height: auto;\">\n        <div class=\"spacer\" style=\"width: 300px; height: 12px;\"></div>\n        <div>\n            <center>Register now and get your first consultation FREE with Doctor of your choice.</center>\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 18px;\"></div>\n        <form class=\"list\">\n            <label class=\"item item-input\" name=\"pat_fname\">\n                <input type=\"text\" placeholder=\"First Name\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 7px;\"></div>\n            <label class=\"item item-input\" name=\"pat_mname\">\n                <input type=\"text\" placeholder=\"Middle Name\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 7px;\"></div>\n            <label class=\"item item-input\" name=\"pat_lname\">\n                <input type=\"text\" placeholder=\"Last Name\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 9px;\"></div>\n            <label class=\"item item-input\" name=\"pat_lname\">\n                <input type=\"number\" placeholder=\"Age\">\n            </label>\n            <a menu-close=\"\" href=\"#/Patient Registration2\" class=\"button button-balanced button-block \">Next</a>\n        </form>\n    </ion-content>\n</ion-view>");
$templateCache.put("views/patient/patientRegistration2.html","<ion-view title=\"Patient Registration2\">\n    <ion-content padding=\"\'true\'\" class=\"has-header\">\n        <img src=\"img/wAB0XYGRQeP7SKJpMEQi_iOS-Assets-v01_patient_registration_progress2.png\" width=\"50%\" height=\"auto\" style=\"width: 50%; height: auto;\">\n        <div>\n\n            <center>\n                <font>Age,gender,email &amp; password</font>\n            </center>\n\n        </div>\n        <form class=\"list\">\n            <label class=\"item item-input\" name=\"doc_phnum\">\n                <input type=\"tel\" placeholder=\"Mobile Number\">\n            </label>\n            <div class=\"button-bar\">\n                <button class=\"button button-light button-block  icon-left ion-male\">Male</button>\n                <button class=\"button button-light button-block  icon-left ion-female\">Female</button>\n            </div>\n            <label class=\"item item-input\" name=\"pat_email\">\n                <input type=\"email\" placeholder=\"Email\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 9px;\"></div>\n            <label class=\"item item-input\" name=\"pat_email\">\n                <input type=\"password\" placeholder=\"Password\">\n            </label>\n            <div>\n                <p>\n                </p>\n                <center>\n                    <font size=\"1\">Prescription and consultation receipts will be mailed to this email address</font>\n                </center>\n            </div>\n            <a menu-close=\"\" href=\"#/page3\" class=\"button button-balanced button-block \">Next</a>\n            <div>\n\n                <center>\n                    <font size=\"1\">By signing in i agree to DoctorQuicks\n                        <a href=\"#/\">Terms&amp;COnditions</a>\n                    </font>\n                </center>\n\n            </div>\n        </form>\n    </ion-content>\n</ion-view>");
$templateCache.put("views/patient/patientRegistration3.html","<ion-view title=\"Patient Registration3\">\n    <ion-content padding=\"\'true\'\" class=\"has-header\">\n        <div class=\"spacer\" style=\"width: 300px; height: 18px;\"></div>\n        <img src=\"img/B0ddrD4USpGDQstTqEPL_iOS-Assets-v01_patient_registration_progress3.png\" width=\"50%\" height=\"auto\" style=\"width: 50%; height: auto;\">\n        <div class=\"spacer\" style=\"width: 300px; height: 14px;\"></div>\n        <div>\n            <p>\n            </p>\n            <center>\n                <font>Please enter the four digit verification code sent to +91912345678</font>\n            </center>\n            <p></p>\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 27px;\"></div>\n        <form class=\"list\">\n            <label class=\"item item-input\" name=\"otp\">\n                <input type=\"number\" placeholder=\"PIN\">\n            </label>\n        </form>\n        <button class=\"button button-balanced  \">Resend</button>\n        <button class=\"button button-balanced  \">Confirm</button>\n        <div>\n            <p>\n            </p>\n            <center>\n                <font></font>\n            </center>\n\n            <p></p>\n        </div>\n        <div>\n            <center>\n                <font>Din\'t receive a text from DoctorQuick?\n                    <br>Tap Resend.</font>\n            </center>\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 27px;\"></div>\n        <div>\n\n            <center>\n                <font size=\"1\">By signing in i agree to DoctorQuicks\n                    <a href=\"#/\">Terms&amp;COnditions</a>\n                </font>\n            </center>\n\n        </div>\n        <div class=\"button-bar\">\n            <button class=\"button button-stable button-block \">1</button>\n            <button class=\"button button-stable button-block \">2</button>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("views/templates/accepted.html","<ion-view class=\"call-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n   <span>Call</span>\r\n </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n\r\n      <div class=\"profile-container\">\r\n        <div class=\"user-image-container\">\r\n          <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\r\n            <!--<img class=\"user-image\" ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\" spinner-on-load>-->\r\n            <img class=\"user-image \" ng-src=\"img/patient.jpg\" spinner-on-load>\r\n          </pre-img>\r\n        </div>\r\n        <h1>FirstName LastName</h1>\r\n        <h2>Male,Age:36</h2>\r\n        <h3>Bangalore,India</h3>\r\n        <h4>Call Ended</h4><!--Consultation accepted-->\r\n        <h5>If call ended unexpectedly please wait for the callback</h5><!--Please wait for the call-->\r\n      </div>\r\n\r\n\r\n    </div>\r\n    <div class=\"bottom-content row\">\r\n      <div class=\"col col-center\">\r\n        <a class=\"login button button-block button-stable\" ui-sref=\"templates.notes\">\r\n          End Consultation\r\n        </a>\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/templates/consultedpatients.html","<ion-view class=\"mypatient-profile-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span>My Consultations</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"templates.patientchat\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/patient.jpg\">\r\n            <h2>FirstName LastName <span>2015/11/23</span></h2>\r\n            <p>Last sent/received msg</p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"templates.patientchat\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/patient.jpg\">\r\n            <h2>FirstName LastName <span>2015/11/23</span></h2>\r\n            <p>Last sent/received msg</p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"templates.patientchat\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/patient.jpg\">\r\n            <h2>FirstName LastName <span>2015/11/23</span></h2>\r\n            <p>Last sent/received msg</p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"templates.patientchat\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/patient.jpg\">\r\n            <h2>FirstName LastName <span>2015/11/23</span></h2>\r\n            <p>Last sent/received msg</p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"templates.patientchat\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/patient.jpg\">\r\n            <h2>FirstName LastName <span>2015/11/23</span></h2>\r\n            <p>Last sent/received msg</p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"templates.patientchat\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/patient.jpg\">\r\n            <h2>FirstName LastName <span>2015/11/23</span></h2>\r\n            <p>Last sent/received msg</p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n\r\n          <a class=\"item item-avatar item-icon-right\"  ui-sref=\"templates.patientchat\"><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/patient.jpg\">\r\n            <h2>FirstName LastName <span>2015/11/23</span></h2>\r\n            <p>Last sent/received msg</p>  <i class=\"icon ion-ios-arrow-right\"></i>\r\n          </a>\r\n\r\n\r\n\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/templates/customercare.html","<ion-view class=\"customercare-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span>Customer Care</span>\r\n  </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n      <h1>Please contact us through the form </h1>\r\n      <h2>below or request a callback</h2>\r\n      <div class=\"textform\">\r\n        <label class=\"item item-input\">\r\n         <textarea placeholder=\" \" ></textarea>\r\n       </label>\r\n       <div class=\"col-30 col-50 col-offset-50\">\r\n         <button class=\"button button-block\">Send</button>\r\n       </div>\r\n       <!--<div class=\"row\">\r\n        <div class=\"col-75 col-offset-25\">\r\n          <button class=\"button button-block button-energized\">Button</button>\r\n        </div>\r\n      </div>-->\r\n\r\n      </div>\r\n    </div>\r\n    <div class=\"bottom-content row\">\r\n      <pre-img ratio=\"\" helper-class=\"\" class=\"cc-bottom-content\"  >\r\n          <img ng-src=\"/img/dq_icon_time_540x960.png\" spinner-on-load>\r\n        </pre-img>\r\n        <h3>Working Hours:9am to 9pm</h3>\r\n        <h4>(Indian standerd time)</h4>\r\n        <div class=\" col\">\r\n          <button class=\"button button-block\">Request a callback</button>\r\n        </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/templates/diagnosis.html","<ion-view class=\"prescription-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span>Diagnosis</span>\r\n  </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n      <div class=\"col col-center\">\r\n        <a class=\"item dark item-avatar item-icon-right\"  ><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/pat.jpg\">\r\n            <div><h2>FirstName LastName </h2>\r\n            <p>14:33 on 16/01/2016</p>\r\n            </div>\r\n\r\n        </a>\r\n        <button class=\"clear-field button button-clear button-positive\">\r\n          Clear\r\n        </button>\r\n        <button class=\"done button button-clear button-positive\">\r\n          Done\r\n        </button>\r\n        <div class=\"textform\">\r\n          <label class=\"item item-input\">\r\n           <textarea placeholder=\" \" id=diagnosis name=diagnosis></textarea>\r\n         </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"bottom-content row\">\r\n      <div class=\"col col-center\">\r\n\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/templates/doctoraccounts.html","<ion-view class=\"doctor-acc-view\" cache-view=\"false\">\r\n\r\n  <ion-nav-title>\r\n    <span>Account Statement</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n\r\n    <div class=\"top-content row\">\r\n      <div class=\"profile-container\">\r\n        <div class=\"user-image-container\">\r\n          <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\r\n            <!--<img class=\"user-image\" ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\" spinner-on-load>-->\r\n           <img ng-src=\"/img/dq_icon_payments_large_540x960.png\" spinner-on-load>\r\n          </pre-img>\r\n        </div>\r\n        <h1>Report</h1>\r\n        <h2>Balance<span>$72.00</span></h2>\r\n    </div>\r\n    </div>\r\n\r\n<ion-item class=\"item-divider\">Transaction History</ion-item>\r\n<div class=\"calender-container\">\r\n  <div class=\" from-date\">\r\n    <div class=\"card  item-icon-right\">\r\n      <div class=\"row\">\r\n            <div class=\"col\">From</div>\r\n            <div class=\"col\"><i class=\"icon ion-android-calendar\"></i></div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <div class=\" to-date\">\r\n    <div class=\"card  item-icon-right\">\r\n      <div class=\"row\">\r\n            <div class=\"col\">To</div>\r\n            <div class=\"col\"><i class=\"icon ion-android-calendar\"></i></div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"bottom-content\">\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n  <a class=\"item  item-avatar\" >\r\n    <img src=\"img/doc.jpg\">\r\n    <h3>FirstName LastName<span>$15.00</span></h3>\r\n    <p>12 january 2016</p>\r\n  </a>\r\n\r\n\r\n</div>\r\n\r\n</ion-content>\r\n\r\n\r\n</ion-view>\r\n");
$templateCache.put("views/templates/doctorprofile.html","<ion-view class=\"docprofile-view\" cache-view=\"false\">\n\n  <ion-nav-buttons side=\"primary\">\n\n    </ion-nav-buttons>\n  <ion-nav-title class=\"\">\n    <span>Doctor Profile</span>\n\n  </ion-nav-title>\n  <ion-content>\n\n    <div class=\"top-content row\">\n      <div class=\"\">\n        <div class=\"user-image-container\">\n          <pre-img >\n            <img class=\"user-image\" ng-src=\"/img/doc.jpg\" spinner-on-load>\n          </pre-img>\n          <div class=\"user-name\"><h4>Dr FirstName LastName </h4></div>\n            <div class=\"rating\">*****(25 Reviews)</div>\n\n\n\n        </div>\n\n      </div>\n\n    </div>\n<div class=\"bottom-content\">\n\n    <div class=\"card \">\n      <div class=\"row\">\n            <div class=\"col\">First Name</div>\n            <div class=\"col\">Aaaaa</div>\n      </div>\n      <div class=\"row\">\n            <div class=\"col\">Middle Name</div>\n            <div class=\"col\">Bbbbb</div>\n      </div>\n      <div class=\"row\">\n            <div class=\"col\">Last Name</div>\n            <div class=\"col\">Cccccc</div>\n      </div>\n    </div>\n\n     <div class=\"card\">\n       <div class=\"row\">\n             <div class=\"col\">Degrees</div>\n             <div class=\"col\">MBBS,MD</div>\n       </div>\n       <div class=\"row\">\n             <div class=\"col\">Practicing Since</div>\n             <div class=\"col\">10 years</div>\n       </div>\n     </div>\n\n    <div class=\"card \">\n      <div class=\"row\">\n            <div class=\"col\">Age</div>\n            <div class=\"col\">33</div>\n      </div>\n      <div class=\"row\">\n            <div class=\"col\">Gender</div>\n            <div class=\"col\">Male</div>\n      </div>\n    </div>\n\n   <div class=\"card \">\n     <div class=\"row\">\n           <div class=\"col\">Country</div>\n           <div class=\"col\">India</div>\n\n     </div>\n     <div class=\"row\">\n           <div class=\"col\">City</div>\n           <div class=\"col\">Bangalore</div>\n\n     </div>\n     <div class=\"row\">\n           <div class=\"col\">Address Line1</div>\n           <div class=\"col\">L-144 Sector-6 HSR Layout</div>\n\n     </div>\n     <div class=\"row\">\n           <div class=\"col\">Address Line2</div>\n           <div class=\"col\">Bangalore</div>\n\n     </div>\n     <div class=\"row\">\n           <div class=\"col\">Pincode</div>\n           <div class=\"col\">560 012</div>\n\n     </div>\n\n   </div>\n    <div class=\"card\">\n      <div class=\"row\">\n            <div class=\"col\">Email</div>\n            <div class=\"col col-67\">ravikiran@greettech.com</div>\n\n      </div>\n    </div>\n\n    <div class=\"card \">\n      <div class=\"row\">\n            <div class=\"col\">Language 1</div>\n            <div class=\"col\">English</div>\n\n      </div>\n      <div class=\"row\">\n            <div class=\"col\">Language 2</div>\n            <div class=\"col\">Kannada</div>\n\n      </div>\n    </div>\n\n    <div class=\"card\" ui-sref=\"templates.patientchat\">\n        <div class=\"row\">\n              <div class=\"col\">Change Password</div>\n        </div>\n     </div>\n\n    <div class=\"card\">\n      <div class=\"row\">\n            <div class=\"col\">Mobile Number</div>\n            <div class=\"col\">+919844992181</div>\n      </div>\n     </div>\n\n     <div class=\"card \">\n       <div class=\"row\">\n             <div class=\"col\">Bank Details</div>\n             <div class=\"col\">Bank Name</div>\n       </div>\n       <div class=\"row\">\n             <div class=\"col\">A/C No</div>\n             <div class=\"col\">123456789123</div>\n       </div>\n       <div class=\"row\">\n             <div class=\"col\">IFSC Code</div>\n             <div class=\"col\">KKBK004201</div>\n       </div>\n     </div>\n\n      <div class=\"card\">\n        <div class=\"row\">\n              <div class=\"col\">Consulting Fee</div>\n              <div class=\"col\">$30</div>\n        </div>\n      </div>\n\n      <div class=\"card\">\n        <div class=\"row\">\n              <div class=\"col\">Specialities</div>\n              <div class=\"col\">Neurology,General Medicine</div>\n        </div>\n      </div>\n\n      <div class=\"card item item-text-wrap\">\n        <div class=\"row\">\n              <div class=\"col-75\">Medical Council Membership</div>\n              <div class=\"col\">**</div>\n        </div>\n        <div class=\"row \">\n              <div class=\"col-75\">Medical Council Membership</div>\n              <div class=\"col\">**</div>\n        </div>\n      </div>\n<p><a href=\"\">Terms of Use</a></p>\n</div>\n\n\n\n\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/templates/doctorscreens.html","<ion-view class=\"doctorscreen-view\" cache-view=\"false\" >\r\n\r\n  <ion-nav-title class=\"item-icon-left\" >\r\n    <i class=\"icon ion-android-textsms iconleft\" side=\"left\"><span class=\"badge badge-assertive badge-container\">{{1}}</span></i>\r\n    <span class=\"headerTitle\">Doctor</span>\r\n\r\n  </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n\r\n<ion-slide-box does-continue=\"true\" auto-play=\"true\" class=\"slides\" show-pager=\"true\" class=\"with-my-pager\">\r\n\r\n        <ion-slide>\r\n            <img src=\"img/welcome2.jpg\" width=\"100%\" height=\"50%\" >\r\n        </ion-slide>\r\n        <ion-slide>\r\n          <img src=\"img/welcome.jpg\" width=\"100%\" height=\"50%\" >\r\n        </ion-slide>\r\n        <ion-slide>\r\n          <img src=\"img/welcome2.jpg\" width=\"100%\" height=\"50%\" >\r\n        </ion-slide>\r\n        <ion-slide>\r\n          <img src=\"img/welcome.jpg\" width=\"100%\" height=\"50%\" >\r\n        </ion-slide>\r\n\r\n</ion-slide-box>\r\n<!--<div class=\"slideTwo\" ng-controller=\"doctorScreensCtrl\" >\r\n      <input type=\"checkbox\" class=\"track\" value=\"1\" id=\"slideTwo\" name=\"check\" ng-click=\"setStatus(item.checked);\" ng-model=\"item.checked\" ng-checked=\"item.checked\" />\r\n      <label for=\"slideTwo\"></label>\r\n</div>\r\n  ONLINE/OFFLINE toggle working with disturbance\r\n-->\r\n  <ion-item class=\"item-divider\">Requests Pending</ion-item>\r\n\r\n  <div class=\"list top-content item-icon-right\" >\r\n\r\n      <a class=\"item item-avatar\" ui-sref=\"templates.patientrequest\">\r\n        <img src=\"img/patient.jpg\">\r\n        <h2>FirstName LastName</h2>\r\n        <p>Male,Age 36</p><p>Region or Location</p>\r\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n      </a>\r\n\r\n      <a class=\"item item-avatar\" ui-sref=\"templates.patientrequest\">\r\n        <img src=\"img/patient.jpg\">\r\n        <h2>FirstName LastName</h2>\r\n        <p>Male,Age 12</p><p>Region or Location</p>\r\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n      </a>\r\n\r\n      <a class=\"item item-avatar\" ui-sref=\"templates.patientrequest\">\r\n        <img src=\"img/patient.jpg\">\r\n        <h2>FirstName LastName</h2>\r\n        <p>Male,Age 13</p><p>Region or Location</p>\r\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n      </a>\r\n\r\n      <a class=\"item item-avatar\" ui-sref=\"templates.patientrequest\">\r\n        <img src=\"img/patient.jpg\">\r\n        <h2>FirstName LastName</h2>\r\n        <p>Male,Age 14</p><p>Region or Location</p>\r\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n      </a>\r\n\r\n      <a class=\"item item-avatar\" ui-sref=\"templates.patientrequest\">\r\n        <img src=\"img/patient.jpg\">\r\n        <h2>FirstName LastName</h2>\r\n        <p>Male,Age 15</p><p>Region or Location</p>\r\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n      </a>\r\n\r\n      <a class=\"item item-avatar\" ui-sref=\"templates.patientrequest\">\r\n        <img src=\"img/patient.jpg\">\r\n        <h2>FirstName LastName</h2>\r\n        <p>Male,Age 16</p><p>Region or Location</p>\r\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n      </a>\r\n\r\n      <a class=\"item item-avatar\" ui-sref=\"templates.patientrequest\">\r\n        <img src=\"img/patient.jpg\">\r\n        <h2>FirstName LastName</h2>\r\n        <p>Male,Age 17</p><p>Region or Location</p>\r\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n      </a>\r\n\r\n      <a class=\"item item-avatar\" ui-sref=\"templates.patientrequest\">\r\n        <img src=\"img/patient.jpg\">\r\n        <h2>FirstName LastName</h2>\r\n        <p>Male,Age 18</p><p>Region or Location</p>\r\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n      </a>\r\n\r\n  </div>\r\n\r\n  </ion-content>\r\n  <ion-content class=\"bottom-content\">\r\n    <label class=\"toggle toggle-assertive\">\r\n       <input type=\"checkbox\">\r\n       <div class=\"track\">\r\n         <div class=\"handle\"></div>\r\n       </div>\r\n     </label>\r\n   </ion-content>\r\n\r\n</ion-view>\r\n");
$templateCache.put("views/templates/medication.html","<ion-view class=\"prescription-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span>Medications</span>\r\n  </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n      <div class=\"col col-center\">\r\n        \r\n        <a class=\"item dark item-avatar item-icon-right\"  ><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/pat.jpg\">\r\n            <div><h2>FirstName LastName </h2>\r\n            <p>14:33 on 16/01/2016</p>\r\n            </div>\r\n        </a>\r\n\r\n        <button class=\"clear-field button button-clear button-positive\">\r\n          Clear\r\n        </button>\r\n        <button class=\"done button button-clear button-positive\">\r\n          Done\r\n        </button>\r\n        <div class=\"textform\">\r\n          <label class=\"item item-input\">\r\n           <textarea placeholder=\" \" id=medication name=medications></textarea>\r\n         </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"bottom-content row\">\r\n      <div class=\"col col-center\">\r\n\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/templates/menu.html","<ion-view class=\"sidemenu-view\" cache-view=\"false\" enable-menu-with-back-views=\"true\" >\n<ion-side-menus enable-menu-with-back-views=\"true\">\n  <ion-side-menu-content class=\"post-size-14px\">\n\n    <ion-nav-bar class=\"bar app-top-bar\" align-title=\"left\">\n    <ion-nav-buttons side=\"right\">\n    <p ng-model=\"status\"></p>\n    <img class=\"onlineOffline\" align=right src=\"img/dq_notification_red-circle_540x960.png\" width=\"auto\" height=\"25px\" margin=10px /><!--adds onlin/offline image-->\n        <a class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"right\">\n        </a>\n      </ion-nav-buttons>\n      <div class=\"slideTwo\" ng-controller=\"doctorScreensCtrl\" >\n            <input type=\"checkbox\" class=\"track\" value=\"1\" id=\"slideTwo\" name=\"check\" ng-click=\"setStatus(item.checked);\" ng-model=\"item.checked\" ng-checked=\"item.checked\" />\n            <label for=\"slideTwo\"></label>\n      </div>\n\n    </ion-nav-bar>\n    <ion-nav-view name=\"menuContent\"></ion-nav-view>\n  </ion-side-menu-content>\n\n  <ion-side-menu side=\"right\" class=\"main-menu\" expose-aside-when=\"large\">\n    <ion-content>\n      <ion-list>\n       <ion-item class=\"heading-item\" nav-clear menu-close ui-sref=\"\">\n          <!--<div class=\"user-image-container\">\n            <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\n              <img class=\"user-image\" ng-src=\"/img/ionic.png\" spinner-on-load>\n          	</pre-img>\n          </div>-->\n          <!--<h2 class=\"greeting\">Name</h2>\n         <p class=\"message\">Welcome back Name</p>-->\n        </ion-item>\n        <ion-item class=\"item-icon-left\" ui-sref=\"templates.doctorprofile\" menu-close>\n          <i class=\"icon ion-android-bookmark\"></i>\n          <h2 class=\"menu-text\">Profile</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"templates.consultedpatients\">\n          <i class=\"icon ion-social-wordpress\"></i>\n          <h2 class=\"menu-text\">My Consultations</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"templates.doctorprofile\">\n          <i class=\"icon ion-asterisk\"></i>\n          <h2 class=\"menu-text\">Review App</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"templates.customercare\">\n            <i class=\"icon ion-gear-a\"></i>\n            <h2 class=\"menu-text\">Customer Care</h2>\n          </ion-item>\n          <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"templates.doctoraccounts\">\n              <i class=\"icon ion-android-wifi\"></i>\n              <h2 class=\"menu-text\">Accounts Statement</h2>\n            </ion-item>\n            <ion-item style=\"background-color:#20242c !important\" nav-clear   >\n\n          <div ><h2 class=\"menu-text\"><i class=\"icon ion-document\"></i>Notification</h2></div>                                            <div class=\"slideThree\">\n               <input type=\"checkbox\" value=\"None\" id=\"slideThree\" name=\"check\" checked />\n               <label for=\"slideThree\"></label>\n             </div>\n           </ion-item>\n\n    </ion-list>\n\n\n    </ion-content>\n    \n  </ion-side-menu>\n</ion-side-menus>\n\n</ion-view>\n");
$templateCache.put("views/templates/notes.html","<ion-view class=\"patient-notes-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n   <span>Notes</span>\r\n </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <a class=\"item dark item-avatar item-icon-right\"  ><!--ui-sref=\"app.doctorprofile\"-->\r\n        <img src=\"img/pat.jpg\">\r\n        <div><h2>FirstName LastName </h2>\r\n        <p>14:33 on 16/01/2016</p>\r\n        </div>\r\n\r\n    </a>\r\n    <p class=\"description\">After completing the diagnosis,test recomnded and medication section the results will be sent to your patient as an attachment in message.</p>\r\n    <div class=\"card \">\r\n    <div class=\"row\">\r\n          <div class=\"col col-75\"  ui-sref=\"templates.diagnosis\" >Diagnosis</div>\r\n  <label class=\"checkbox\">\r\n             <input class=\"checkbox\" type=\"checkbox\" id=diagnosis name=diagnosis >\r\n  </label>\r\n\r\n          <div class=\"col\" ui-sref=\"templates.diagnosis\"><i class=\"icon ion-chevron-right icon-accessory\" ></i></div>\r\n    </div>\r\n    <div class=\"  row\">\r\n          <div class=\"col col-75\"  ui-sref=\"templates.tests\">Tests Recomended</div>\r\n          <label class=\"checkbox\">\r\n             <input class=\"checkbox\"  type=\"checkbox\" id=tests name=tests >\r\n          </label>\r\n\r\n          <div class=\"col\" ui-sref=\"templates.tests\"><i class=\"icon ion-chevron-right icon-accessory\"></i></div>\r\n    </div>\r\n    <div class=\"  row\">\r\n          <div class=\"col col-75\"  ui-sref=\"templates.medication\" >Medication</div>\r\n          <label class=\"checkbox\">\r\n             <input class=\"checkbox\"  type=\"checkbox\" id=medication name=medication >\r\n          </label>\r\n\r\n          <div class=\"col\" ui-sref=\"templates.medication\"><i class=\"icon ion-chevron-right icon-accessory\"></i></div>\r\n    </div>\r\n\r\n\r\n  </div>\r\n  <div class=\"buttons\">\r\n   <button  class=\"button button-block button-assertive\" >Send prescription</button>\r\n   <button  class=\"button button-block button-assertive\" >Complete & charge</button>\r\n   <button  class=\"button button-block button-energized\" >Complete without charge</button>\r\n </div>\r\n\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/templates/patientchat.html","<ion-view class=\"patient-chat-view\" cache-view=\"false\">\n  <ion-nav-title has-header>\n    <span>Messages</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <a class=\"item item-avatar item-icon-right\" >\n      <img src=\"img/doc.jpg\">\n      <h2>Dr.FirstName LastName </h2> <i class=\"icon ion-android-add-circle\"></i>\n      <p class=\"degrees\">General Medicine,Degrees</p>\n        <p class=\"practice\">Practicing since 1999<span>*****</span><span>(4.9/27)</span></p>\n    </a>\n    <div class=\"top-content row\">\n      <div class=\"col col-center\">\n\n      </div>\n    </div>\n    <div class=\"bottom-content row\">\n      <div class=\"col col-center\">\n\n      </div>\n    </div>\n  </ion-content>\n  <!--<ion-footer-bar align-title=\"left\" class=\"bar-assertive item-icon-left\">\n  <i class=\"icon ion-arrow-up-c\"></i>\n  <label class=\"item item-input\" name=\"chat-message\">\n      <input type=\"text\"  ng-model=\"chat-message\">\n  </label>\n</ion-footer-bar>-->\n<form name=\"sendMessageForm\" ng-submit=\"sendMessage(sendMessageForm)\" novalidate>\n             <ion-footer-bar class=\"bar-stable item-input-inset message-footer \" keyboard-attach>\n\n                 <label class=\"item-input-wrapper item-icon-left\">\n                     <i class=\"icon ion-arrow-up-c\"></i><textarea ng-model=\"input.message\" value=\"\" placeholder=\"Send {{toUser.username}} a message...\" required minlength=\"1\" maxlength=\"1500\" msd-elastic></textarea>\n                 </label>\n                 <div class=\"footer-btn-wrap\">\n                   <button class=\"button button-icon icon ion-android-send footer-btn\" type=\"submit\"\n                       ng-disabled=\"!input.message || input.message === \'\'\">\n                   </button>\n                 </div>\n             </ion-footer-bar>\n</form>\n</ion-view>\n");
$templateCache.put("views/templates/patientrequest.html","<ion-view class=\"patient-request-view\" cache-view=\"false\">\r\n  <ion-nav-title >\r\n    <span>Request</span>\r\n  </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n\r\n      <div class=\"profile-container\">\r\n        <div class=\"user-image-container\">\r\n          <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\r\n            <!--<img class=\"user-image\" ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\" spinner-on-load>-->\r\n            <img class=\"user-image \" ng-src=\"img/patient.jpg\" spinner-on-load>\r\n          </pre-img>\r\n        </div>\r\n        <h1>FirstName LastName</h1>\r\n        <h2>Male,Age:36</h2>\r\n        <h3>Bangalore,India</h3>\r\n        <h4>Requested a Voice call</h4><!--Consultation accepted-->\r\n        <h5>30 min ago</h5><!--Please wait for the call-->\r\n      </div>\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"bottom-content row\">\r\n\r\n        <div class=\"button-bar\" >\r\n          <button class=\"button  button-block button-calm  \" ng-click=\"accept();\" ui-sref=\"templates.accepted\">Decline</button>\r\n          <button class=\"button  button-block button-calm  \" ng-click=\"toggle = !toggle\">{{toggleText}}</button>\r\n\r\n        </div>\r\n\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/templates/tests.html","<ion-view class=\"prescription-view\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span>Tests</span>\r\n  </ion-nav-title>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n      <div class=\"col col-center\">\r\n        <a class=\"item dark item-avatar item-icon-right\"  ><!--ui-sref=\"app.doctorprofile\"-->\r\n            <img src=\"img/pat.jpg\">\r\n            <div><h2>FirstName LastName </h2>\r\n            <p>14:33 on 16/01/2016</p>\r\n            </div>\r\n\r\n        </a>\r\n        <button class=\"clear-field button button-clear button-positive\">\r\n          Clear\r\n        </button>\r\n        <button class=\"done button button-clear button-positive\">\r\n          Done\r\n        </button>\r\n        <div class=\"textform\">\r\n          <label class=\"item item-input\">\r\n           <textarea placeholder=\" \" id=tests name=tests></textarea>\r\n         </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"bottom-content row\">\r\n      <div class=\"col col-center\">\r\n\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>\r\n");
$templateCache.put("views/app/feeds/category-feeds.html","<!--This file is for after cliking the feeds image in template this is disabled for now-->\n<ion-view class=\"category-feeds-view\">\n\n  <ion-nav-title>\n    <span>{{categoryTitle}} feeds</span>\n\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"list category-feeds\">\n      <a ng-repeat=\"source in category_sources\" class=\"item item-icon-right\" ui-sref=\"app.feed-entries({categoryId: categoryId, sourceId: (source.title | slugify)})\">\n        <div class=\"thumbnail-outer\">\n          <pre-img ratio=\"_1_1\" helper-class=\"\">\n            <img class=\"thumbnail\" ng-src=\"{{source.image}}\" spinner-on-load>\n          </pre-img>\n        </div>\n        <div>\n          <span class=\"title\">{{source.title}}</span>\n          <p class=\"description\">{{source.description}}</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/feeds/feed-entries.html","<ion-view class=\"feed-entries-view\">\n  <ion-nav-title>\n    <span>{{sourceTitle}}</span>\n  </ion-nav-title>\n  <ion-content>\n    <!-- Refresh to get the new posts -->\n    <ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=\"doRefresh()\">\n    </ion-refresher>\n\n    <div class=\"entries-list\">\n      <div ng-repeat=\"entry in feed.entries\" class=\"list card entry-item\">\n        <div class=\"entry-heading item item-text-wrap\">\n          <h2 class=\"entry-title\" ng-bind-html=\"entry.title | rawHtml\"></h2>\n          <p class=\"entry-author\">\n            Published <span>{{ entry.publishedDate | parseDate | amTimeAgo }}</span>\n          </p>\n        </div>\n        <div class=\"entry-content item item-text-wrap\">\n          <p class=\"entry-excerpt\" dynamic-anchor-fix ng-bind-html=\"entry.contentSnippet | rawHtml\"></p>\n          <div class=\"entry-actions row\">\n            <div class=\"actions col col-center col-66\">\n              <a class=\"button button-icon icon ion-bookmark\" ng-click=\"bookmarkPost(entry)\"></a>\n            </div>\n            <div class=\"read-more col col-center col-33\" dynamic-anchor-fix>\n              <a class=\"button button-small button-block button-assertive\" ng-href=\"{{entry.link}}\">\n                Read more\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/feeds/patientScreens.html","<ion-view class=\"patientScreen-view\" cache-view=\"false\">\n\n  <ion-nav-title class=\"item-icon-left\" >\n    <i class=\"icon ion-android-textsms iconleft\" side=\"left\"><span class=\"badge badge-assertive badge-container\">{{1}}</span></i>\n    <span >Patient</span>\n\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n\n<ion-slide-box does-continue=\"true\" auto-play=\"true\" class=\"slides\" show-pager=\"true\" class=\"with-my-pager\">\n\n        <ion-slide>\n            <img src=\"img/welcome2.jpg\" width=\"100%\" height=\"50%\" >\n        </ion-slide>\n        <ion-slide>\n          <img src=\"img/welcome.jpg\" width=\"100%\" height=\"50%\" >\n        </ion-slide>\n        <ion-slide>\n          <img src=\"img/welcome2.jpg\" width=\"100%\" height=\"50%\" >\n        </ion-slide>\n        <ion-slide>\n          <img src=\"img/welcome.jpg\" width=\"100%\" height=\"50%\" >\n        </ion-slide>\n\n</ion-slide-box>\n<!--<div class=\"slideTwo\" ng-controller=\"doctorScreensCtrl\" >\n      <input type=\"checkbox\" class=\"track\" value=\"1\" id=\"slideTwo\" name=\"check\" ng-click=\"setStatus(item.checked);\" ng-model=\"item.checked\" ng-checked=\"item.checked\" />\n      <label for=\"slideTwo\"></label>\n\n      ONLINE/OFFLINE toggle working with disturbance\n</div>-->\n  <ion-item class=\"item-divider\">Find a Doctor</ion-item>\n\n  <div class=\"list top-content\" >\n\n            <ion-item class=\"item item-icon-left item-icon-right \" ui-sref=\"app.medicalSpeciality\" style=\"background-color:#6aa433 !important\">\n              <i class=\"icon ion-android-happy\"></i>\n              <h2>Medical Speciality</h2>\n              <p>Find a Doctor specific to your problem</p>\n              <i class=\"icon ion-ios-arrow-right\"></i>\n            </ion-item>\n\n            <ion-item class=\"item item-icon-left item-icon-right \" ui-sref=\"app.searchDoctors\" style=\"background-color:#6aa433 !important\">\n              <i class=\"icon ion-android-search\"></i>\n                  <h2>Search</h2>\n\n                <p>Search Doctor by name or speciality</p>\n              <i class=\"icon ion-ios-arrow-right\"></i>\n            </ion-item>\n\n            <ion-item class=\"item item-icon-left item-icon-right  \" ui-sref=\"app.mydoctors\" style=\"background-color:#6aa433 !important\">\n              <i class=\"icon ion-ios-medkit\"></i>\n                <h2>My Doctors</h2>\n\n              <p>Doctors you have recently consulted</p>\n              <i class=\"icon ion-ios-arrow-right\"></i>\n            </ion-item>\n  </div>\n\n      <div class=\"bottom-content row\">\n\n      </div>\n  </ion-content>\n\n</ion-view>\n");
$templateCache.put("views/app/layouts/layouts.html","<ion-view class=\"layouts-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Layouts</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"list layouts-functionalities\">\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.tinder-cards\">\n        <i class=\"icon ion-happy-outline\"></i>\n        <div>\n          <span class=\"title\">Tinder Cards</span>\n          <p class=\"description\">Awesome Tinder Cards</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.slider\">\n        <i class=\"icon ion-arrow-swap\"></i>\n        <div>\n          <span class=\"title\">Slider</span>\n          <p class=\"description\">Example of sliding cards</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/layouts/slider.html","<ion-view class=\"slider-view\">\n  <ion-nav-title>\n    <span>Slider</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <ion-slide-box show-pager=\"true\">\n      <ion-slide ng-repeat=\"i in [1,2,3,4,5]\">\n        <div class=\"list card\">\n          <div class=\"item item-image\">\n            <img ng-src=\"http://lorempixel.com/300/200/nature?v={{i}}\">\n          </div>\n          <div class=\"item item-body\">\n            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n          </div>\n        </div>\n      </ion-slide>\n    </ion-slide-box>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/layouts/tinder-cards.html","<ion-view class=\"tinder-cards-view\">\n  <ion-nav-title>\n    <span>Tinder Cards</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <td-cards>\n      <td-card id=\"td-card\" ng-repeat=\"card in cards\"\n      on-transition-left=\"transitionLeft(card)\"\n      on-transition-right=\"transitionRight(card)\"\n      on-transition-out=\"transitionOut(card)\"\n      on-destroy=\"cardDestroyed($index)\"\n      on-swipe-left=\"cardSwipedLeft($index)\"\n      on-swipe-right=\"cardSwipedRight($index)\"\n      on-partial-swipe=\"cardPartialSwipe(amt)\">\n        <div class=\"image\">\n          <div class=\"no-text overlayBox\">\n            <div class=\"noBox boxed\">\n              Nope\n            </div>\n          </div>\n          <img ng-src=\"{{card.image}}\">\n          <div class=\"yes-text overlayBox\">\n            <div class=\"yesBox boxed\">\n              Yes\n            </div>\n          </div>\n        </div>\n        <div class=\"title\">\n          {{card.name}}\n        </div>\n      </td-card>\n    </td-cards>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/miscellaneous/image-picker.html","<ion-view class=\"image-picker-view\">\n  <ion-nav-title>\n    <span>Image picker</span>\n  </ion-nav-title>\n  <ion-content class=\"padding\">\n    <button class=\"button button-block button-dark\" ng-click=\"selImages()\">\n      Select Images\n    </button>\n    <button  ng-show=\"images.length > 0\" class=\"button button-block button-stable\" ng-click=\"shareAll()\">\n      Share All\n    </button>\n    <div class=\"list card\" ng-repeat=\"img in images\">\n      <div class=\"item item-image\">\n        <img ng-src=\"{{img}}\">\n      </div>\n      <div class=\"item tabs tabs-secondary tabs-icon-left\">\n        <a class=\"tab-item image-option\" href=\"#\" ng-click=\"shareImage(img)\">\n          <i class=\"icon ion-share\"></i>\n          Share\n        </a>\n        <a class=\"tab-item assertive image-option\" href=\"#\" ng-click=\"removeImage(img)\">\n          <i class=\"icon ion-trash-a assertive\"></i>\n          Remove\n        </a>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/miscellaneous/maps.html","<ion-view class=\"maps-view\">\n  <ion-nav-title>\n    <span>Maps</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <div class=\"mapWrap\"  data-tap-disabled=\"true\">\n      <div class=\"row center-map-action\">\n        <div class=\"col\">\n          <div class=\"list\">\n            <div class=\"item item-input-inset\">\n              <a class=\"button button-icon icon ion-pinpoint\" ng-click=\"centerOnMe()\"></a>\n              <label class=\"item-input-wrapper\">\n                <input type=\"text\" placeholder=\"My Location\" disabled ng-model=\"my_location\">\n              </label>\n            </div>\n          </div>\n        </div>\n      </div>\n      <map center=\"{{center_position.lat}},{{center_position.lng}}\" zoom=\"15\">\n        <marker\n            position=\"{{current_position.lat}},{{current_position.lng}}\"\n            title=\"Hello Marker\"\n            visible=\"true\">\n        </marker>\n        <info-window id=\"1\" position=\"{{info_position.lat}},{{info_position.lng}}\" visible=\"true\">\n          <div ng-non-bindable=\"\">\n            <b>The best restaurant</b><br>\n            This is html so you can put whatever <br>\n            you want such as images and <a href=\"\">links</a> <br>\n            <img style=\" border-radius: 24px;\" src=\"http://lorempixel.com/50/50/food/?v=1\"></img>\n            <img style=\" border-radius: 24px;\" src=\"http://lorempixel.com/50/50/food/?v=2\"></img>\n            <img style=\" border-radius: 24px;\" src=\"http://lorempixel.com/50/50/food/?v=3\"></img>\n          </div>\n        </info-window>\n      </map>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/miscellaneous/miscellaneous.html","<ion-view class=\"miscellaneous-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Miscellaneous</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"list miscellaneous-functionalities\">\n      <div dynamic-anchor-fix>\n        <a class=\"item item-icon-left item-icon-right\" href=\"http://www.ionicthemes.com\">\n          <i class=\"icon ion-ios-browsers-outline\"></i>\n          <div>\n            <span class=\"title\">In App Browser</span>\n            <p class=\"description\">Show web browser view with external links</p>\n          </div>\n          <i class=\"icon ion-arrow-right-c\"></i>\n        </a>\n      </div>\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.maps\">\n        <i class=\"icon ion-map\"></i>\n        <div>\n          <span class=\"title\">Maps & GeoLocation</span>\n          <p class=\"description\">Show map & access user\'s current location</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.image-picker\">\n        <i class=\"icon ion-images\"></i>\n        <div>\n          <span class=\"title\">Image Picker</span>\n          <p class=\"description\">Select and share images from your phone</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" href=\"#\" ng-controller=\"AdsCtrl\" ng-click=\"manageAdMob()\">\n        <i class=\"icon ion-social-usd-outline\"></i>\n        <div>\n          <span class=\"title\">AdMob</span>\n          <p class=\"description\">Show Google AdMob mobile ads</p>\n        </div>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" href=\"#\" ng-controller=\"AdsCtrl\" ng-click=\"manageiAd()\">\n        <i class=\"icon ion-social-usd-outline\"></i>\n        <div>\n          <span class=\"title\">iAd</span>\n          <p class=\"description\">Show Apple iAd mobile ads</p>\n        </div>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" href=\"#\" ng-controller=\"RateApp\" ng-click=\"rateApp()\">\n        <i class=\"icon ion-ios-star-half\"></i>\n        <div>\n          <span class=\"title\">Rate the app</span>\n          <p class=\"description\">Rate this app in Google and Apple stores</p>\n        </div>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" href=\"#\" ng-controller=\"SendMailCtrl\" ng-click=\"sendMail()\">\n        <i class=\"icon ion-email\"></i>\n        <div>\n          <span class=\"title\">Send email</span>\n          <p class=\"description\">Access your phone native email sender provider</p>\n        </div>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/wordpress/wordpress.html","<ion-view class=\"wordpress-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>WordPress</span>\n  </ion-nav-title>\n  <ion-content>\n    <!-- Refresh to get the new posts -->\n    <ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=\"doRefresh()\">\n    </ion-refresher>\n\n    <div class=\"posts-list\">\n      <div ng-repeat=\"post in posts\" class=\"list card post-item\">\n        <div class=\"post-heading item item-text-wrap\">\n          <h2 class=\"post-title\" ng-bind-html=\"post.title | rawHtml\"></h2>\n          <p class=\"post-author\">\n            By <span>{{post.author.nickname}}</span> <span am-time-ago=\"post.date\"></span>\n          </p>\n        </div>\n        <div class=\"post-content item item-text-wrap\" post-content>\n          <p class=\"post-excerpt\" dynamic-anchor-fix ng-bind-html=\"post.content | rawHtml\"></p>\n          <div class=\"post-actions row\">\n            <div class=\"actions col col-center col-66\">\n              <a class=\"button button-icon icon ion-bookmark\" ng-click=\"bookmarkPost(post)\"></a>\n            </div>\n            <div class=\"read-more col col-center col-33\">\n              <a ui-sref=\"app.post({postId: post.id})\" class=\"button button-small button-block button-assertive\">\n                Read more\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Infinit scroll -->\n    <ion-infinite-scroll ng-if=\"moreDataCanBeLoaded()\" on-infinite=\"loadMoreData()\" distance=\"1%\" icon=\"ion-loading-c\">\n    </ion-infinite-scroll>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/wordpress/wordpress_post.html","<ion-view class=\"post-view\">\n  <ion-content>\n    <div class=\"post-heading item item-text-wrap\">\n      <h1 class=\"post-title\">{{post.title}}</h1>\n      <p class=\"post-author\">\n        By <span>{{post.author.nickname}}</span> <span am-time-ago=\"post.date\"></span>\n      </p>\n    </div>\n    <div class=\"post-content item item-text-wrap\" post-content>\n      <p class=\"post-text\" dynamic-anchor-fix ng-bind-html=\"post.content | rawHtml\"></p>\n    </div>\n    <div class=\"post-tags item item-text-wrap\">\n      <span class=\"post-tag button button-small button-outline button-stable\" ng-repeat=\"category in post.categories\">{{category.title}}</span>\n    </div>\n  </ion-content>\n  <ion-footer-bar class=\"post-footer bar bar-footer bar-dark\">\n    <div class=\"row\">\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon icon-right ion-plus\" bigger-text=\".post-view .post-text\">A</a>\n      </div>\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon icon-right ion-minus\" smaller-text=\".post-view .post-text\">A</a>\n      </div>\n      <div class=\"col col-20 col-offset-20 col-center\">\n        <a class=\"button button-icon icon ion-heart\"></a>\n      </div>\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon ion-android-share-alt\" ng-click=\"sharePost(post.url)\"></a>\n      </div>\n    </div>\n  </ion-footer-bar>\n</ion-view>\n");
$templateCache.put("views/auth/orginal/doctorRegistration.html","<ion-view title=\"walkthrough-view\">\n    <ion-content padding=\"\'true\'\" class=\"has-header\">\n        <div>\n            <center><h3>Doctor Registration</h3></center>\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 9px;\"></div>\n        <center><img src=\"img/progress1.png\" width=\"50%\" height=\"auto\" style=\"width: 50%; height: auto;\"></center>\n        <div class=\"spacer\" style=\"width: 300px; height: 12px;\"></div>\n        <div>\n            <center><font size=3>DoctorQuick is a unique technology to help you consult and treat patients at your own time and place from different cornerof the country and get paid for your time.</font></center>\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 18px;\"></div>\n        <form class=\"\" >\n            <label class=\"item item-input\" name=\"doc_fname\">\n                <input type=\"text\" placeholder=\"First Name\" ng-model=\"doc_fname\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 7px;\"></div>\n            <label class=\"item item-input\" name=\"doc_mname\">\n\n                <input type=\"text\" placeholder=\"Middle Name\" ng-model=\"doc_mname\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 7px;\"></div>\n            <label class=\"item item-input\" name=\"doc_lname\" >\n                <input type=\"text\" placeholder=\"Last Name\" ng-model=\"doc_lname\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 43px;\"></div>\n            <a  class=\"sign-up button button button-block button-balanced \" ui-sref=\"auth.doctorRegistration2\">Next</a>\n\n        </form>\n        Full Name: {{doc_fname + \" \" + doc_mname}}\n    </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/orginal/doctorRegistration2.html","<ion-view title=\"Doctor Registration\">\n    <ion-content padding=\"\'true\'\" class=\"has-header\">\n        <div class=\"spacer\" style=\"width: 300px; height: 35px;\"></div>\n        <center><img src=\"img/progress2.png\" width=\"50%\" height=\"auto\" style=\"width: 50%; height: auto;\"></center>\n        <div class=\"spacer\" style=\"width: 300px; height: 35px;\"></div>\n        <form class=\"list\">\n            <label class=\"item item-input\" name=\"doc_email\">\n                <input type=\"email\" placeholder=\"Email\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 18px;\"></div>\n            <label class=\"item item-input\" name=\"doc_phnum\">\n                <input type=\"tel\" placeholder=\"Mobile Number\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 87px;\"></div>\n            <button class=\"button button-balanced button-block \" ng-click=\"showConfirm();\">Submit</button>\n        </form>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/orginal/patientRegistration1.html","<ion-view title=\"Patient Registration1\" class=\"pateint-view\" cache-view=\"false\">\n  <div class=\"top-content row\">\n    <ion-content padding=\"\'true\'\" class=\"has-header\">\n\n            <center><h3>Patient Registration</h3></center>\n\n        <div class=\"spacer\" style=\"width: 300px; height: 9px;\"></div>\n        <center><img src=\"img/iOS-Assets-v01_patient_registration_progress1.png\" width=\"50%\" height=\"auto\" style=\"width: 50%; height: auto;\"></center>\n        <div class=\"spacer\" style=\"width: 300px; height: 12px;\"></div>\n        <div>\n            <center>Register now and get your first consultation FREE with Doctor of your choice.</center>\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 18px;\"></div>\n        <form class=\"list\">\n            <label class=\"item item-input\" name=\"pat_fname\">\n                <input type=\"text\" placeholder=\"First Name\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 7px;\"></div>\n            <label class=\"item item-input\" name=\"pat_mname\">\n                <input type=\"text\" placeholder=\"Middle Name\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 7px;\"></div>\n            <label class=\"item item-input\" name=\"pat_lname\">\n                <input type=\"text\" placeholder=\"Last Name\">\n            </label>\n            <div class=\"spacer\" style=\"width: 300px; height: 9px;\"></div>\n            <label class=\"item item-input\" name=\"pat_lname\">\n                <input type=\"number\" placeholder=\"Age\">\n            </label>\n            <div class=\"spacer\" style=\"width: 500px; height: 50px;\"></div>\n\n  </div>\n\n\n\n  <div class=\"bottom-content col\">\n      <a  class=\"login button button-stable button-block \" ui-sref=\"auth.patientRegistration2\">Next</a>\n      <center>\n          <font size=\"2\">By signing in I agree to DoctorQuicks\n              <a href=\"#/\">Terms&amp;Conditions</a>\n          </font>\n      </center>\n\n  </div>\n\n        </form>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/orginal/patientRegistration2.html","<ion-view title=\"Patient Registration2\"  class=\"pateint-view\" cache-view=\"false\">\n\n<div class=\"top-content row\">\n    <ion-content padding=\"\'true\'\" class=\"has-header\">\n  <center>  <img src=\"img/iOS-Assets-v01_patient_registration_progress2.png\" width=\"50%\" height=\"auto\" style=\"width: 50%; height: auto;\"></center>\n    <div>\n\n        <center>\n            <font><h5>Age,gender,email &amp; password</h5></font>\n        </center>\n\n    </div>\n    <form class=\"list\">\n        <label class=\"item item-input\" name=\"doc_phnum\">\n            <input type=\"tel\" placeholder=\"Mobile Number\">\n        </label>\n        <div class=\"button-bar\">\n            <button class=\"button button-light button-block  icon-left ion-male\" ng-click=\"gender();\">Male</button>\n            <button class=\"button button-light button-block  icon-left ion-female\" ng-click=\"gender();\">Female</button>\n        </div>\n        <label class=\"item item-input\" name=\"pat_email\">\n            <input type=\"email\" placeholder=\"Email\">\n        </label>\n        <div class=\"spacer\" style=\"width: 300px; height: 9px;\"></div>\n        <label class=\"item item-input\" name=\"pat_email\">\n            <input type=\"password\" placeholder=\"Password\">\n        </label>\n        <div>\n\n            <center>\n                <font size=\"2\">Prescription and consultation receipts will be mailed to this email address</font>\n            </center>\n        </div>\n\n</div>\n\n            <div class=\"bottom-content col\">\n              <a  class=\"login button button-stable button-block\" ui-sref=\"auth.patientRegistration3\">Next</a>\n            <!--<a menu-close=\"\" href=\"#/page3\" class=\"button button-balanced button-block \">Next</a>-->\n\n\n                <center>\n                    <font size=\"2\">By signing in I agree to DoctorQuicks\n                        <a href=\"#/\">Terms&amp;Conditions</a>\n                    </font>\n                </center>\n\n\n\n            </div>\n\n        </form>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/orginal/patientRegistration3.html","<ion-view title=\"Patient Registration3\">\n    <ion-content padding=\"\'true\'\" class=\"has-header\">\n        <div class=\"spacer\" style=\"width: 300px; height: 18px;\"></div>\n        <center><img src=\"img/iOS-Assets-v01_patient_registration_progress3.png\" width=\"50%\" height=\"auto\" style=\"width: 50%; height: auto;\"></center>\n        <div class=\"spacer\" style=\"width: 300px; height: 14px;\"></div>\n        <div>\n\n            <center>\n                <font>Please enter the four digit verification code sent to +91912345678</font>\n            </center>\n\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 27px;\"></div>\n        <form class=\"list\">\n            <label class=\"item item-input\" name=\"otp\">\n                <input type=\"number\" placeholder=\"PIN\">\n            </label>\n        </form>\n      <center>\n        <button class=\"button button-balanced  \">Resend&nbsp; </button>\n        <button type=\"submit\" class=\"login button button-balanced \" ng-click=\"doLogIn();\" ng-disabled=\"(login_form.user_phone.$invalid || login_form.user_pin.$invalid) : false\">\n          Confirm\n        </button>\n      <!--  <button type=\"submit\" class=\"login button button-balanced  ng-click=\"doLogIn();\"\">Confirm</button>-->\n      </center>\n        <div>\n            <center>\n                <font>Din\'t receive a text from DoctorQuick?\n                    <br>Tap Resend.</font>\n            </center>\n        </div>\n        <div class=\"spacer\" style=\"width: 300px; height: 27px;\"></div>\n        <div>\n\n            <center>\n                <font size=\"2\">By signing in i agree to DoctorQuicks\n                    <a href=\"#/\">Terms&amp;Conditions</a>\n                </font>\n            </center>\n\n        </div>\n        <!--<div class=\"button-bar\">\n            <button class=\"button button-stable button-block \">1</button>\n            <button class=\"button button-stable button-block \">2</button>\n        </div>-->\n    </ion-content>\n</ion-view>\n");}]);

DoctorQuickApp.controller('AppCtrl', function($state, $scope, $rootScope,$window, $timeout,$location, $stateParams,$ionicPlatform,$cordovaDevice, $window, $ionicHistory, $interval, $ionicModal, $ionicPopover, $ionicLoading, $ionicConfig, $ionicPopup,$http, $ionicSideMenuDelegate, $localStorage, $sessionStorage, $cordovaInAppBrowser,$cordovaCamera, $cordovaNetwork,$cordovaToast,$ionicNavBarDelegate, LoginService, patientProfileDetailsService,searchDoctorServices, doctorServices, medicalSpecialityService,myConsultationService,rateDoctorServices,patientWalletServices,searchbyspecialities,rateDoctorServices,medicalSpecialityService, callAcceptedService,testresultbydoctor,searchDoctorServices,Factory) {

	$rootScope.headerTxt='';
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$rootScope.hideSideMenu = true;

	$scope.myDocDetail = {};

	$rootScope.showSPecialities=false;
	$rootScope.showSex=false;
	$rootScope.showStatus=false;
	$rootScope.showLanguage=false;
	$rootScope.inviteButton = false;

	$scope.closeSideMenu = function() {
		console.log('closing side menu');
		$ionicSideMenuDelegate.toggleRight();
	};

	$scope.showConsulation=function()
	{
		$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true,
			historyRoot:true
		});
			$state.go('app.my_consultations',{}, {location: "replace", reload: false});
	}

	var specialitywise = "";
	var catwise = "";
	var genderwise = "";
	var languagewise = "";

	$rootScope.chekDiag=false;
	$rootScope.chekTests=false;
	$rootScope.chekMedi=false;
	// console.log($rootScope.chekDiag);

	$scope.accptNotifications=false;
	$scope.rejectNotifications=true;
	$rootScope.sandwich=false;
	// var model = $cordovaDevice.getModel();
	// console.log(model);
	console.log('appcalld');

	$scope.deviceAndroid = ionic.Platform.isAndroid();
	$scope.devicePlatform = ionic.Platform.isIOS();


	console.log($rootScope.previousState);

	// if(window.localStorage.doctororpatient === 'doctor')
	// {
  //
	// }


		//var networkState= $cordovaNetwork.isOnline();
		////////////////////////////////////////////////////////////////////////////////
		//console.log(networkState);
		// $interval(checkForInternet, 1000);

		window.localStorage.chekedData =0;
		window.localStorage.dataConnection=navigator.onLine;
		// $scope.dataLost=window.localStorage.dataConnection;
		$scope.dataLost=window.localStorage.networkType;

		$scope.showAlert==false;

		console.log(window.localStorage.dataConnection);
		$scope.$watch('dataLost', function (newValue, oldValue, scope){
			// alert('changed');
			// alert(window.localStorage.dataConnection);
			console.log('newVal',newValue);
			console.log('oldValue',oldValue);

				if(newValue === 'None' && oldValue != 'None'){
					var confirmPopup = $ionicPopup.confirm({
						title: 'DoctorQuick',
						template: 'Seems you are disconnected from the internet',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
							{
								text: 'Cancel',
								type: 'button-royal',
							},
							{
								text: 'Ok',
								type: 'button-positive',
								onTap: function(e) {
								console.log('ok');

							}
							},
						]
					});


				}
		},true);
		////////////////////////////////////////////////////////////////////////////////

		$rootScope.statename = $ionicHistory.currentStateName();

		// console.log($rootScope.statename);
	if($ionicHistory.currentStateName() === 'app.patient_home'){
		console.log($ionicHistory.currentStateName() );
		$ionicHistory.nextViewOptions({
		disableBack: true
		});
	}
	// console.log($scope.deviceAndroid );
	$scope.doRefresh = function() {
		console.log('Refreshing!');
		$timeout( function() {
		$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
	};

	$scope.$on('$ionicView.afterEnter', function (event, viewData) {
	  $timeout(function() {
	    $ionicNavBarDelegate.align('center');
	  }, 100);
	});

	$rootScope.goBack = function()
	{

				console.log($ionicHistory.backView());
				$scope.prevPage=$ionicHistory.currentStateName();
				console.log($ionicHistory.currentStateName());
				console.log(window.localStorage.doctororpatient);
				if(!$ionicHistory.backView()){
					if(window.localStorage.doctororpatient === 'doctor'){
						$state.go('templates.doctor_home');
					}
					else{
						$state.go('app.patient_home');
					}
				}
				else{

									if($scope.prevPage === 'app.patient_summary'){
											// alert('summary page')
											$state.go('app.patient_home');
											$ionicHistory.clearHistory();
									}
									else if($scope.prevPage === 'templates.prescription'){
											$state.go('templates.doctor_home');
											$ionicHistory.clearHistory();
									}
									else if($scope.prevPage === 'templates.requestAccepted'){
											$state.go('templates.doctor_home');
											$ionicHistory.clearHistory();
									}
									else if($scope.prevPage === 'app.patient_home' || $scope.prevPage === 'templates.doctor_home'){
											// $state.go('templates.doctor_home');
											console.log('donothing');
									}
									else if($scope.prevPage === 'app.specialityDetailsNew'){
											window.history.back();
									}
									else if($scope.prevPage === 'app.searchDoctors'){
												console.log('clear search values here');
												$rootScope.specialdata=null;
												$rootScope.genderdata= null;
												$rootScope.statusdata=null;
												$rootScope.languagedataselected=null;

												$rootScope.specialityList.sex = "";
												$rootScope.specialityList.search = "";
												$rootScope.specialityList.stat = "";
												$rootScope.specialityList.language = "";

												var specialitywise = "";
												var catwise = "";
												var genderwise = "";
												var languagewise = "";

												console.log($rootScope.specialdata);
												window.history.back();

									}
									else if($scope.prevPage === 'templates.prescription'){
											$state.go('templates.doctor_home');
											$ionicHistory.clearHistory();
									}
									else if($scope.prevPage === 'app.callAccepted'){
											// alert('decline call here');
											// ion.sound.play("bell_ring");
									}

									else if($scope.prevPage === 'app.changeEmail_patient'){
											// $state.go('templates.doctor_home');
											// $ionicHistory.clearHistory();
											window.history.go(-1);
									}
									else{
												window.history.go(-1);
												// window.history.back(-1);
												// $scope.backView = $ionicHistory.backView();
												//        $scope.backView.go();
												// $ionicHistory.goBack();
												// $ionicHistory.goBack(-1);
												console.log(window.history.length);
												// window.history.go(-(history.length - 1));
									}
				}

	}



	$rootScope.specialityList = {};
	$rootScope.sexList = {};
	$rootScope.LanguageList = {};
	$rootScope.statusList = {};

	$scope.showSideMenu = function (selectedSearch){

			if (selectedSearch == "gender")
			{

				$rootScope.sexList = [
				{'sex': 'Male'},
				{'sex': 'Female'},
				{'sex': 'Any'}

				]

				$rootScope.SearchHeader='Gender';
				$rootScope.showSPecialities=false;
				$rootScope.showSex=true;
				$rootScope.showStatus=false;
				$rootScope.showLanguage=false;

			}

			if (selectedSearch == "language")
			{
					$scope.LanguageList = angular.fromJson($window.localStorage['languages']);
					console.log($scope.LanguageList);

					$rootScope.SearchHeader='Language';
					$rootScope.showSPecialities=false;
					$rootScope.showSex=false;
					$rootScope.showStatus=false;
					$rootScope.showLanguage=true;

			}

			if (selectedSearch == "onlineOffline") {
				$rootScope.showSearchOption=true;

				$rootScope.statusList = [

				{'stat': 'Online'},
				{'stat': 'Offline'}
				]
				$rootScope.SearchHeader='Online/Offline';
				$rootScope.showSPecialities=false;
				$rootScope.showSex=false;
				$rootScope.showStatus=true;
				$rootScope.showLanguage=false;

			};
			//Make API request and get the data
			$rootScope.specialityList1={};
			if (selectedSearch == "speciality")
			{
				$rootScope.SearchHeader='Speciality';
				$rootScope.showSPecialities=true;
				$rootScope.showSex=false;
				$rootScope.showStatus=false;
				$rootScope.showLanguage=false;

				$scope.specialityList1 = angular.fromJson($window.localStorage['specialityList1']);
				console.log($scope.specialityList1);

			};

		$rootScope.sideMenuForSearch = true;
		$ionicSideMenuDelegate.toggleRight();
	}


	$scope.sidemenu = {};
	$scope.choice='';

	$scope.selectSpeciality = function(val)	{
		$scope.specfic = val;
		$scope.choice= val;
		console.log($scope.specfic);
		$ionicSideMenuDelegate.toggleRight();
		searchbyspecialities.specialitywisesearch($scope.specfic);
		$rootScope.specialdata =  searchbyspecialities.getSpecialData();
	}

	$scope.selectSex = function(val)	{
		if(val === "Male")
		{
			$scope.gender = "Male";
		}
		else if(val === "Female")
		{
			$scope.gender = "Female";
		}
		else
		{
			$scope.gender = "Any";
		}
			$ionicSideMenuDelegate.toggleRight();
			searchbyspecialities.categorywisesearch($scope.gender);
			$rootScope.genderdata =  searchbyspecialities.getcategoryData();
			console.log($scope.gender);

	}
	$scope.selectStatus = function(val)	{

		if(val === "Online")
		{
		// $scope.onoff = 'Online';
		$scope.onoff =  "Online";
		}
		else
		{
		// $scope.onoff = 'Offline';
		$scope.onoff =  "Offline";
		}
		$ionicSideMenuDelegate.toggleRight();
		searchbyspecialities.genderwisesearch($scope.onoff);
		$rootScope.statusdata =  searchbyspecialities.getgenderData();

	}
	$scope.selectLanguage = function(val)	{
		console.log(val);
		$ionicSideMenuDelegate.toggleRight();
		searchbyspecialities.languagewisesearch(val);
		$rootScope.languagedataselected =  searchbyspecialities.getlanguageData();
		console.log($scope.languagedataselected);
	}
	$scope.items=[];
	$scope.moredata = false;

	// $scope.loadMore=function()
  // {
	// 	console.log($rootScope.doclist.length);
  //     $scope.items.push({id: $rootScope.doclist.length});
	// 		console.log($scope.items);
	//
  //     if($scope.items.length==10)
  //     {
  //         $scope.moredata=true;
  //     }
  //   $scope.$broadcast('scroll.infiniteScrollComplete');
  // };


	$scope.searchdoctorbydifferentscenario = function(specialitywise,catwise,genderwise,languagewise)
	{

					$rootScope.doclist = {};
					$ionicLoading.show({
						template:'<ion-spinner><ion-spinner>'
					});
					//PUT ONE ERROR MESSAGE HERE
					if(specialitywise == null && catwise == null && genderwise == null && languagewise == null)
					{
							console.log('Please Select Atlease One Search Criteria');
							$ionicLoading.hide();
							window.plugins.toast.showWithOptions({
								message: "Please select atleast one search criteria",
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


					}
					else
					{
								console.log(specialitywise);
								/* Patients Selected One of the Search Criteria */
								var searchdoctor = {
								byspecial:specialitywise,
								bygender:catwise,
								bystatus:genderwise,
								bylanguage:languagewise
								};

								console.log(searchdoctor);
								$rootScope.rates=0;
								$rootScope.totalRates=0;
									//// ///////////////////////////////////SEARCH PATTERN QUERY FORMATION/////////////////////////////////////////////////

									console.log(searchdoctor.byspecial);

									//// ///////////////////////////////////SEARCH PATTERN QUERY FORMATION/////////////////////////////////////////////////
									var DEFAULT_PAGE_SIZE_STEP = 15;

									  $rootScope.currentPage = 1;
									  $rootScope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;

									  $scope.loadNextPage = function(){
											console.log($rootScope.searchResultLength);
											console.log($rootScope.pageSize);

									    $rootScope.currentPage++;
									    $rootScope.pageSize = $rootScope.currentPage * DEFAULT_PAGE_SIZE_STEP;
											if($rootScope.pageSize>=$rootScope.searchResultLength){
												console.log('hide show more');
												$rootScope.showMore=true;
											}

									  }

								searchbyspecialities.getlistofspecialist(searchdoctor).then(function (response) {
										$ionicLoading.show();


										console.log(response.length);
								if(response.length)
								{
												if(response.length <= 15){
														console.log('hide show more');
														$rootScope.showMore=true;
												}
												else{
													$rootScope.showMore=false;
												}
												$rootScope.searchResultLength = response.length;
												console.log(response);
												console.log($rootScope.pageSize);

												$ionicLoading.hide();
												window.localStorage['doclist'] = angular.toJson(response);
												$rootScope.doclist = angular.fromJson($window.localStorage['doclist']);
												$state.go('app.doctorsearch');
												// $rootScope.doclist = response;

												var data=$rootScope.doclist;//take all json data into this variable
												for(var i=0; i<data.length; i++){

												$rootScope.rate=data[i].ratings,
												//$rootScope.totalRates=data[i].totalRates
												$rootScope.totalRates=data[i].ratingCount
												// console.log($rootScope.rate);
												// console.log($rootScope.totalRates);
												$rootScope.totalRates=data[i].ratingCount

												if($rootScope.rate == 0 || $rootScope.totalRates == 0){
													$rootScope.overallRating= 1;
												}

												else{
													$rootScope.overallRating = $rootScope.rate/$rootScope.totalRates;
												}
												// console.log($rootScope.overallRating);
												$scope.ratings = [{
												current: $rootScope.overallRating,
												max: 5
												}];
												// console.log($scope.ratings);
												$scope.getStars = function(rating) {
												// Get the value
												var val = parseFloat(rating);
												// Turn value into number/100
												var size = val/5*100;
												return size + '%';
												}
												// $rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;

												}


								}
								else if(Object.keys(response).length == 0)
								{
											$ionicLoading.hide();
											console.log('empty');
											var confirmPopup = $ionicPopup.confirm({
											title: 'No Doctors Available',
											template: '<center>Please try again after some time.</center>',
											cssClass: 'videoPopup',
											scope: $scope,
											buttons: [

											{
											text: 'OK',
											type: 'button-royal',
											onTap: function(e) {
											console.log('ok');

											}
											},
											]
											});

											return true;

								}
								else {
										$rootScope.doclist = response;
										console.log(response);
										$state.go('app.doctorsearch');
										$rootScope.doclist = "no doctors found";
										}
								}).catch(function (response, data, status, header) {
								});
					}
	}


	//signout

		$scope.confirmSignout = function() {
			console.log('closing side menu');
			$ionicSideMenuDelegate.toggleRight();
					var confirmPopup = $ionicPopup.confirm({
							template: '<center>Are you sure you want to Signout?</center>',
							cssClass: 'videoPopup',
							scope: $scope,
							buttons: [
							{
							text: 'Cancel',
							type: 'button-royal',
							onTap: function(e) {
							// $ionicSideMenuDelegate.toggleRight();
							}
							},
							{
							text: 'OK',
							type: 'button-positive',
							onTap: function(e) {
								$ionicLoading.show({
									template:'<ion-spinner></ion-spinner><br><br>Logging out from DoctorQuick'
								})
							LoginService.logoutFromDq(window.localStorage.user).then(function(response){
							$scope.loggedOut=response;
							console.log($scope.loggedOut);
							if($scope.loggedOut){
								// $ionicHistory.clearCache();
								// 	$ionicHistory.clearHistory();
								$scope.loginDatasubmitted = false;

								var unametologout = "greet+"+window.localStorage.user;
								var pwtologout = "DQ_patient";


								var success = function(message)
								{
											$ionicLoading.hide();
											console.log(message);
											$ionicHistory.nextViewOptions({
											disableBack: true,
											disableAnimate: true,
											historyRoot: true
											});
											$ionicHistory.clearCache();
											$ionicHistory.clearHistory();
											$window.localStorage.clear();

											$state.go('auth.loginNew');
											// $window.location.reload();

								}
								var failure = function()
								{
									console.log('error calling hello plugin');
								}
								hello.logout(unametologout,pwtologout,success, failure);
							}
							}).catch(function(error){
							console.log('failure data', error);
							});
							}
							},
							]
					});

		}

	$rootScope.toggleLeftSideMenu = function () {
		$rootScope.sideMenuForSearch = false;
		$ionicSideMenuDelegate.toggleRight();
	}

		$scope.clearAllHistory = function(){
			if(window.localStorage.doctororpatient === 'patient'){
				$ionicHistory.clearCache().then(function(){ $state.go('app.patient_home'); });
				console.log($ionicHistory.viewHistory());

			}
			if(window.localStorage.doctororpatient === 'doctor'){
				$ionicHistory.clearCache().then(function(){ $state.go('templates.doctor_home'); });
				console.log($ionicHistory.viewHistory());
			}
		}

	$scope.getPatientDetails = function(){
		$state.go('app.patient_profile');
		// $scope.patient_details ={};
	}
	console.log($state.$current.name);
	$scope.changePwd=function(){
		$state.go('app.changePassword_patient');
	}
	$scope.changeDocPwd=function(){
		$state.go('templates.updatePassword');
	}

	$rootScope.passwordToUpdate={};
	$rootScope.ratedBy;
	$scope.updatePwd=function(){
							$ionicLoading.show({
								template:'<ion-spinner>,ion-spinner>'
							})
							// $rootScope.ratedBy=$rootScope.passwordToUpdate.userPhone;
							var newPwd={
							newPwd1:$rootScope.passwordToUpdate.password,
							userPhone:window.localStorage.user
							};
							console.log($rootScope.passwordToUpdate.password);
							if(!$rootScope.passwordToUpdate.password){
									$ionicLoading.hide();
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
							if($rootScope.passwordToUpdate.password && !$rootScope.passwordToUpdate.verify){
									$ionicLoading.hide();
										// $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
										$scope.submittedPwd = true;

										window.plugins.toast.showWithOptions({
										message: "Please confirm your new password",
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
							console.log($rootScope.passwordToUpdate.verify);
							if($rootScope.passwordToUpdate.password && $rootScope.passwordToUpdate.verify){
									if($rootScope.passwordToUpdate.password === $rootScope.passwordToUpdate.verify){
											patientProfileDetailsService.changePwd2(newPwd).then(function(response){
												console.log(response);
												$ionicLoading.hide();

												$rootScope.passwordToUpdate={};
												window.plugins.toast.showWithOptions({
												message: "Your password has been updated",
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
												}).catch(function(error){
											console.log('failure data', error);
											});
											//
											// $ionicHistory.nextViewOptions({
											// disableAnimate: true,
											// disableBack: true
											// });
											// $state.go("app.patient_profile");
									}
									else{
												$ionicLoading.hide();

												window.plugins.toast.showWithOptions({
												message: "Password did not match",
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
							}


}
$scope.updateDocPwd=function(){
					$ionicLoading.show({
						template:'<ion-spinner></ion-spinner>'
					})
					$rootScope.ratedBy=$rootScope.passwordToUpdate.userPhone;
					var newPwd={
					newPwd1:$rootScope.passwordToUpdate.password,
					userPhone:window.localStorage.user
					};
					console.log($rootScope.passwordToUpdate.password);
					console.log($rootScope.passwordToUpdate.verify);

					console.log(newPwd);
					if(!$rootScope.passwordToUpdate.password){
								$ionicLoading.hide();
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
					if($rootScope.passwordToUpdate.password && $rootScope.passwordToUpdate.verify){
							if($rootScope.passwordToUpdate.password === $rootScope.passwordToUpdate.verify){
									doctorServices.changeDocPwd(newPwd).then(function(response){
									console.log(response);
									$ionicLoading.hide();

									// $state.go("templates.doc_profile")
									$rootScope.passwordToUpdate='';
									window.plugins.toast.showWithOptions({
									message: "Your password has been updated",
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

									// $state.go("templates.doctor_home");

									}).catch(function(error){
									console.log('failure data', error);
									});
							}
							else{
									$ionicLoading.hide();

									window.plugins.toast.showWithOptions({
									message: "Password did not match",
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
					}


}
$scope.myDoctors=function(){
$state.go('app.my_doctors');
}

//Rating functionality

$scope.ratingsObject = {
iconOn: 'ion-ios-star',    //Optional
iconOff: 'ion-ios-star-outline',   //Optional
rating:  $scope.myRating, //fetch value from database if already rated
minRating:0,    //Optional
readOnly: true, //Optional
callback: function(rating) {    //Mandatory
$scope.ratingsCallback(rating);
}

};



$scope.ReviewApp = function()
{

$scope.deviceAndroid = ionic.Platform.isAndroid();


if($scope.deviceAndroid)
{
$ionicSideMenuDelegate.toggleRight();
window.open("market://details?id=com.greettech.DoctorQuick","_system");

}


}


$scope.getWallet=function(){
$rootScope.patientWalletdetails ={};
$rootScope.patientTransactiondetails ={};
$state.go('app.patient_payments');
}

$scope.balAmnt;
$rootScope.myBalance;

//  console.log(window.localStorage.seen);
// $interval(callReqInterval, 15000);
function callReqInterval() {

if($ionicHistory.currentStateName() != 'auth.loginNew'){
medicalSpecialityService.callAccepted(window.localStorage.user).then(function(response){
// console.log('successfull data', response);
$scope.calledDetails=response;
console.log($rootScope.online);
console.log($scope.calledDetails);
var data=$scope.calledDetails;//take all json data into this variable
var totList=[];
for(var i=0; i<data.length; i++){

$rootScope.cal_flag=data[i].cal_flag,
$rootScope.callId=data[i].callId,
$rootScope.onoff=data[i].onoff,
$rootScope.doctorPhone=data[i].doctorPhone,
$rootScope.popupSeen=data[i].popupSeen,
$rootScope.accptdDocFname=data[i].doctorFname,
$rootScope.accptdDocLname=data[i].doctorLname,

console.log($rootScope.popupSeen);

window.localStorage.Doctocall =  $rootScope.doctorPhone;
if($rootScope.cal_flag === '4'  && $rootScope.popupSeen === '1' ){

$ionicPopup.confirm({
title: '<i class="ion-checkmark-circled" style="font-size: 20vw !important; color: #6fa02d !important;"></i><br/>',
template: '<center><b>Dr {{accptdDocFname}} {{accptdDocLname}}</b><br> has accepted your invitation for a consultation. Please start the consultation now or decline.</center>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{
text: 'Decline',
type: 'button-royal',
onTap: function(e) {
console.log('Decline');
}
},
{
text: 'View',
type: 'button-positive',
onTap: function(e) {
console.log($rootScope.callId);
callAcceptedService.acceptPopUpSeen($rootScope.callId).then(function(response){
$scope.popupSTATUS=response;
console.log($scope.popupSTATUS);
}).catch(function(error){
console.log('failure data', error);
});
$state.go('app.callAccepted');
}
},
]
})

}
else{
window.localStorage.showPopup =2;
}
}

}).catch(function(error){
console.log('failure data', error);
});

}

// console.log('callAtInterval');
}



//video call in search

$scope.checkWalletBalance=function()
{
$ionicLoading.show();
var calldecline={
patient:window.localStorage.user,
doctor:$rootScope.doctorPhone,
callId:$rootScope.callId
}
console.log(calldecline);
doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
// console.log(response[0][0]);
$scope.myBalance=response[0][0];
window.localStorage.patientWalletBalance=$scope.myBalance;
console.log('pop up page clicked');
var uname = "greet+"+window.localStorage.user;
var pw = "DQ_patient";

var persontocall = "greet+" + window.localStorage.docPhone;
//  var persontocall = "greet+" + window.localStorage.consultedDoctor;
console.log(uname);
console.log(persontocall);
var success = function(message)
{
console.log(message);
}
var failure = function()
{
alert("Error calling Hello Plugin");
}


if($scope.myBalance >= 270)
{

hello.greet(uname,pw,persontocall,success, failure);
var confirmPopup = $ionicPopup.confirm({
template: '<b>Request for Video call has been sent <br><center>00:02</center></b>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{ text: 'Cancel',
type: 'button-royal', },

{
text: 'Resend',
type: 'button-positive',

},
]
//templateUrl: "views/app/viewdoctor_profile.html",
});


}
else
{

var confirmPopup = $ionicPopup.confirm({
template: '<b>Your DoctorQuick Balance is too low.</b>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{
text: 'Cancel',
type: 'button-royal', },
{

text: 'Topup',
type: 'button-positive',
onTap: function(e) {
$state.go('app.patient_topup');
}

},
]
//templateUrl: "views/app/viewdoctor_profile.html",
});

}
$ionicLoading.hide();
}).catch(function(error){
console.log('failure data', error);
});

}



$scope.BalanceForVoiceCall=function()
{
$ionicLoading.show();
doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
// console.log(response[0][0]);
$scope.myBalance=response[0][0];
var uname = "greet+"+window.localStorage.user;
var pw = "DQ_patient";

var persontocall = "greet+" + window.localStorage.docPhone;
//  var persontocall = "greet+" + window.localStorage.consultedDoctor;
console.log(uname);
console.log(persontocall);

var success = function(message)
{
alert(message);
}
var failure = function()
{
alert("Error calling Hello Plugin");
}



if($scope.myBalance >= 270)
{
hello.audiocallvsee(uname,pw,persontocall,success, failure);
var confirmPopup = $ionicPopup.confirm({
template: '<b>Request for Voice call has been sent <br><center>00:02</center></b>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{ text: 'Cancel',
type: 'button-royal', },

{
text: 'Resend',
type: 'button-positive',

},
]
//templateUrl: "views/app/viewdoctor_profile.html",
});
}
else
{
var confirmPopup = $ionicPopup.confirm({
template: '<b>Your DoctorQuick Balance is too low.</b>',
cssClass: 'videoPopup',
scope: $scope,
buttons: [
{
text: 'Cancel',
type: 'button-royal', },
{
text: 'Topup',
type: 'button-positive',
onTap: function(e) {
$state.go('app.patient_topup');
}
},
]
//templateUrl: "views/app/viewdoctor_profile.html",
});
}
$ionicLoading.hide();
}).catch(function(error){
console.log('failure data', error);
});

}

/////////////Show and hide notification////////////////////////////////////////

$scope.hideNotifications = function (msg) {
console.log(msg);
$scope.accptNotifications=true;
$scope.rejectNotifications=false;
if(window.localStorage.doctororpatient === 'patient'){
var updatePlayer ={
palyerId:'',
userNum:window.localStorage.user,
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
userNum:window.localStorage.user,
user:'doctor'
}

LoginService.updatePlayer(updatePlayer).then(function(response){
console.log(response);
})
}




// 	window.plugins.OneSignal.registerForPushNotifications(true);
};
$scope.showNotifications = function (msg) {
// alert(msg);
$scope.accptNotifications=false;
$scope.rejectNotifications=true;
window.plugins.OneSignal.getIds(function(ids){
//document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
//document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
console.log(JSON.stringify(ids['userId']));
$scope.playerId=JSON.stringify(ids['userId']);
// alert('oneSignal')
console.log($scope.playerId);
if(window.localStorage.doctororpatient === 'patient'){
var updatePlayer ={
palyerId:$scope.playerId,
userNum:window.localStorage.user,
user:'patient'
}
}
else{
var updatePlayer ={
palyerId:$scope.playerId,
userNum:window.localStorage.user,
user:'doctor'
}
}

LoginService.updatePlayer(updatePlayer).then(function(response){
console.log(response);
})
});
};


///prescription par
$rootScope.prescription={};

$scope.done = function (prescType,sno){
switch(sno){
case 1:	//for diagnosis
if($rootScope.prescription.diagnosisforpatient)
{
console.log($rootScope.previousState.name);

testresultbydoctor.diagnosisdone($rootScope.prescription.diagnosisforpatient);
$rootScope.chekDiag=true;
$rootScope.val=$rootScope.prescription.diagnosisforpatient;
if($rootScope.previousState.name === "templates.sendPrescription"){
console.log('prescription view');
$state.go('templates.sendPrescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});
return '/templates/sendPrescription';
}
else{
console.log('notes view');
$state.go('templates.prescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});

}
}
else
{

$rootScope.prescription.diagnosisforpatient="";
// alert('please enter diagnosis');
window.plugins.toast.showWithOptions({
message: "Please enter diagnosis",
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
// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
// }, 1000);
}  break;
case 2:	//for tests
if($rootScope.prescription.checkedTests)
{
console.log($rootScope.previousState.name);

testresultbydoctor.testrecommended($rootScope.prescription.checkedTests);
$rootScope.chekTests=true;
$rootScope.testVal=$rootScope.prescription.checkedTests;
// $state.go("templates.prescription");
if($rootScope.previousState.name === "templates.sendPrescription"){
console.log('prescription view');
$state.go('templates.sendPrescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});
return '/templates/sendPrescription';
}
else{
console.log('notes view');
$state.go('templates.prescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});

}
}
else {
$rootScope.prescription.checkedTests="";
window.plugins.toast.showWithOptions({
message: "Please enter test recomended",
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
// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
// }, 1000);
// alert('please enter tests details');
}
break;
case 3:	//for medications

if($rootScope.prescription.medicationforpatient)
{
console.log($rootScope.previousState.name);

testresultbydoctor.medicationdone($rootScope.prescription.medicationforpatient);
$rootScope.chekMedi=true;
$rootScope.mediVal=$rootScope.prescription.medicationforpatient;
// $state.go("templates.prescription");
if($rootScope.previousState.name === "templates.sendPrescription"){
console.log('prescription view');
$state.go('templates.sendPrescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});
return '/templates/sendPrescription';
}
else{
console.log('notes view');
$state.go('templates.prescription',{ "reqPat": window.localStorage.activePatient},{location: "replace", reload: false});

}
}
else {
// alert('please enter medication');
$rootScope.prescription.medicationforpatien="";
window.plugins.toast.showWithOptions({
message: "Please enter medication",
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
// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
// }, 1000);
}

console.log("3. Selected Name: " + prescType );
break;
default:console.log('default');

}
}


$rootScope.chekMedi = false;
$rootScope.chekDiag = false;
$rootScope.chekTests = false;

$rootScope.newPatient={};




	$scope.endConsultation = function(type)
	{
				console.log(type);
				$rootScope.charge=type;
				console.log(window.localStorage.subPatientId);
				window.localStorage.newPatientFname='';
				window.localStorage.newPatientLname='';
				window.localStorage.newPatientAge='';
				window.localStorage.newPatientSex='';

				$scope.diagnosis ="";
				$scope.tests = "";
				$scope.medication = "";
				var prescriptiondetails={};
				console.log($rootScope.chekDiag,$rootScope.chekTests,$rootScope.chekMedi);
				if($rootScope.charge == 1 || $rootScope.charge == 3){

				if($rootScope.chekDiag  === true && $rootScope.chekMedi  === true && $rootScope.chekTests === true)
				{
						$scope.diagnosis = testresultbydoctor.getdiagnosis();
						$scope.tests = testresultbydoctor.gettests();
						$scope.medication = testresultbydoctor.getmedication();

				}
				else if($rootScope.chekDiag  === true && $rootScope.chekTests  === true)
				{
							$scope.diagnosis = testresultbydoctor.getdiagnosis();
							$scope.tests = testresultbydoctor.gettests();
							// $scope.medication = testresultbydoctor.getmedication();

							window.plugins.toast.showWithOptions({
							message: "You Missed Medication",
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
							// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
							// }, 1000);
							// alert('You Missed Medication');
							$scope.diagnosis = testresultbydoctor.getdiagnosis();
							$scope.tests = testresultbydoctor.gettests();
							var diagandtests = {
							diagnosis : $scope.diagnosis,
							tests : $scope.tests
							}
							console.log(diagandtests);
				}
				else if($rootScope.chekDiag  === true && $rootScope.chekMedi  === true)
				{
							$scope.diagnosis = testresultbydoctor.getdiagnosis();
							// $scope.tests = testresultbydoctor.gettests();
							$scope.medication = testresultbydoctor.getmedication();

							window.plugins.toast.showWithOptions({
							message: "You Missed Tests",
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
							// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
							// }, 1000);
							// alert('You Missed Tests');
							$scope.diagnosis = testresultbydoctor.getdiagnosis();
							$scope.medication = testresultbydoctor.getmedication();
							var diagandmedication = {
							diagnosis : $scope.diagnosis,
							medication : $scope.medication
							}
							console.log(diagandmedication);
				}
				else if($rootScope.chekTests  === true && $rootScope.chekMedi  === true)
				{
						// $scope.diagnosis = testresultbydoctor.getdiagnosis();
						$scope.tests = testresultbydoctor.gettests();
						$scope.medication = testresultbydoctor.getmedication();

						window.plugins.toast.showWithOptions({
						message: "You Missed Diagnosis",
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
						// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
						// }, 1000);
						// alert('You Missed Diagnosis');
						$scope.tests = testresultbydoctor.gettests();
						$scope.medication = testresultbydoctor.getmedication();
						var testsandmedication = {
						tests : $scope.tests,
						medication : $scope.medication
						}
						console.log(testsandmedication);
				}
				else if($rootScope.chekDiag  === true)
				{
						$scope.diagnosis = testresultbydoctor.getdiagnosis();
						// $scope.tests = testresultbydoctor.gettests();
						// $scope.medication = testresultbydoctor.getmedication();
						window.plugins.toast.showWithOptions({
						message: "You have Missed tests and Medication",
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
						// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
						// }, 1000);
						// alert('You have Missed tests and Medication');
						$scope.diagnosis = testresultbydoctor.getdiagnosis();
						var onlydiagnosis = {
						diagnosis : $scope.diagnosis
						}
						console.log(onlydiagnosis);
				}
				else if($rootScope.chekTests  === true)
				{
							// $scope.diagnosis = testresultbydoctor.getdiagnosis();
							$scope.tests = testresultbydoctor.gettests();
							// $scope.medication = testresultbydoctor.getmedication();
							window.plugins.toast.showWithOptions({
							message: "You have Missed Diagnosis and Medication",
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
							// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
							// }, 1000);
							// alert('You have Missed Diagnosis and Medication');
							$scope.tests = testresultbydoctor.gettests();
							var onlytests = {
							tests : $scope.tests
							}
							console.log(onlytests);
				}
				else if($rootScope.chekMedi === true)
				{
							// $scope.diagnosis = testresultbydoctor.getdiagnosis();
							// $scope.tests = testresultbydoctor.gettests();
							$scope.medication = testresultbydoctor.getmedication();
							window.plugins.toast.showWithOptions({
							message: "You have Missed Diagnosis and Tests",
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
							// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
							// }, 1000);
							// alert('You have Missed Diagnosis and Tests');
							$scope.medication = testresultbydoctor.getmedication();
							var onlymedication = {
							medication : $scope.medication
							}
							console.log(onlymedication);
				}
				else
				{
							window.plugins.toast.showWithOptions({
							message: "Diagnosis has to be entered ",
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
							// 	 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
							// }, 1000);
							console.log('Please select atleast one Test')
				}
					$scope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
					// console.log('CURRENT PATIENT FOR SEND PRESCRIPTION',$scope.currentPatient);
					console.log('FROM STATEPARAMS',$stateParams.reqPat);
					// console.log('FROM SCOPE VALUE',$scope.currentPatient.patientNum);

				if(!$scope.currentPatient){
					$rootScope.patientNum=$stateParams.reqPat;
					window.localStorage.patientToDisplay=$stateParams.reqPat;
				}
				else{
					console.log($stateParams.reqPat);
					$rootScope.patientNum=$scope.currentPatient.patientNum;
					window.localStorage.patientToDisplay=$scope.currentPatient.patientNum;

				}

					// window.localStorage.patientToDisplay=$stateParams.reqPat;

				var patientToDisplay =window.localStorage.patientToDisplay;
				if($rootScope.chekDiag || $rootScope.chekTests || $rootScope.chekMedi)
				{

							$ionicLoading.show({
								templates:'<ion-spinner></ion-spinner>'
							})
								// $rootScope.newpatientAdded=doctorServices.getNewPatient();
								// console.log($rootScope.newpatientAdded);
								// $scope.newPatientFname=$scope.newpatientAdded.fname;
								// $scope.newPatientLname=$scope.newpatientAdded.lname;

								if(!patientToDisplay){
								patientToDisplay=$stateParams.reqPat;
								}

								var prescriptiondetails = {
										docphno : window.localStorage.user,
										patientphno : patientToDisplay,
										diagnosis : $scope.diagnosis,
										tests : $scope.tests,
										medication : $scope.medication,
										subPatient:window.localStorage.subPatientId,
										charge:$rootScope.charge,
										currentReqId:window.localStorage.currentReqId
								};
								console.log(prescriptiondetails);
								console.log($rootScope.chekDiag);

								//test jpeg image response/Users/amittantia/Desktop/RK/VseePlugin
								testresultbydoctor.jpegtest(prescriptiondetails).then(function(response){
								console.log(response);
								$scope.pic=response
								console.log(prescriptiondetails);
								if($scope.pic === "DiagnosisError"){
										$ionicLoading.hide();
										window.plugins.toast.showWithOptions({
										message: "Please Enter Diagnosis as it is Mandatory.",
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
								var auname =  "greet+"+window.localStorage.user;
								var apw = "DQ_doctor";
								if(!patientToDisplay){
								patientToDisplay=$stateParams.reqPat;
								}
								var ato = "greet+" + patientToDisplay;

								console.log(auname);
								console.log(ato);
								var prescImg=$scope.pic;

								console.log(prescImg);

								var success = function(message)
								{
										$ionicLoading.hide();

										window.localStorage.sendPrescTo = "";

										console.log('prescription clicked');
										console.log(message);
										$rootScope.prescription = {};
										prescriptiondetails='';
										window.localStorage.subPatientId='';
										$ionicHistory.nextViewOptions({
										disableAnimate: true,
										disableBack: true
										});
										$state.go('templates.consulted_patient',{},{location:"replace",reload:true});
										// alert(message);
										console.log(message);
								}

								var failure = function()
								{
								alert("Error calling Hello Plugin");
								}

								hello.automatic(auname,apw,ato,prescImg,success, failure);

								}

								}).catch(function(error){
								console.log('failure data', error);
								});

				}
					$rootScope.chekTests;
				}
				else{
					$state.go("templates.doctor_home");
				}
	}





});

DoctorQuickApp.controller('AuthCtrl', function($scope,$ionicScrollDelegate,$cordovaDatePicker,$interval, $state,$ionicConfig,$ionicHistory,$base64,$window, $cordovaToast, $timeout, $rootScope, $ionicPlatform, $localStorage, $ionicModal, $http, $ionicPopup, $ionicLoading,$filter, patientRegistrationService, doctorRegistrationService,LoginService,patientProfileDetailsService,searchDoctorServices,medicalSpecialityService) {

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

    medicalSpecialityService.getMedicalSpecialist().then(function(response){
        console.log('successfull data', response);
        $scope.specialitiesList = response;
        window.localStorage['specialitiesList'] = angular.toJson(response);
     }).catch(function(error){
         console.log('failure data', error);
     });

     searchDoctorServices.specialitySearch().then(function(response){
       window.localStorage['specialityList1'] = angular.toJson(response);
       // console.log(window.localStorage['specialityList1']);
     }).catch(function(error){
     console.log('failure data', error);
     });

     searchDoctorServices.getLanguages().then(function(response){
       window.localStorage['languages'] = angular.toJson(response);
       // console.log(window.localStorage['languages']);
     }).catch(function(error){
     console.log('failure data', error);
     });


$ionicScrollDelegate.$getByHandle('nomineeDiv').scrollBy(500,100,true);

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


console.log(window.localStorage.doctororpatient);


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
  $rootScope.otp = "";
  $scope.goToNextView = function ()
  {

      $scope.phoneno = $rootScope.PatientDetail.patient_mob;
        patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
        {
            $rootScope.otp=response;
          console.log($rootScope.otp);
          })
          .catch(function(error)
          {
              console.log('failure data', error);
          });

      $state.go('auth.patient_reg3');
  }

  $scope.backView = function()
  {
    window.history.go(-1);
  }
  $scope.resendOtp = function()
  {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner><br>Resending OTP'
    });
    patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
    {
      $rootScope.otpentered = {};
        $rootScope.otp=response;
        console.log($rootScope.otp);
        if($rootScope.otp){
          $ionicLoading.hide();
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
        }
      })
      .catch(function(error)
      {
          console.log('failure data', error);
      });
  }

    $rootScope.otpentered = {};


$scope.patientRegistration = function()
{
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner><br><br><br>Logging into DoctorQuick'
  });
        console.log('reg clicked');
        console.log($rootScope.otp);
        if($rootScope.otpentered.OTP1 === undefined && $rootScope.otpentered.OTP2 === undefined && $rootScope.otpentered.OTP3 === undefined && $rootScope.otpentered.OTP4 === undefined)
        {
            $ionicLoading.hide();
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

        }
        else if($rootScope.otpentered.OTP1 === $rootScope.otp[0] && $rootScope.otpentered.OTP2 ===  $rootScope.otp[1] && $rootScope.otpentered.OTP3 === $rootScope.otp[2] && $rootScope.otpentered.OTP4 === $rootScope.otp[3])
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
                  deviceID:window.localStorage.deviceID,
                  serial:window.localStorage.serial

                };
                var loginData = {
                  'phone': $rootScope.PatientDetail.patient_mob,
                  'password': $rootScope.PatientDetail.pat_password
                };
                console.log(loginData);
                window.localStorage.user=$rootScope.PatientDetail.patient_mob;
                window.localStorage.pass=$rootScope.PatientDetail.pat_password;
                window.localStorage.doctororpatient='patient'
                console.log(patientDetails);
          patientRegistrationService.patientRegistrationDone(patientDetails).then(function(response)
          {

            console.log(response);
            if(response){

              window.plugins.OneSignal.getIds(function(ids) {
                $scope.playerId=JSON.stringify(ids['userId']);
                // console.log($scope.playerId);
                var updatePlayer ={
                  palyerId:$scope.playerId,
                  userNum:window.localStorage.user,
                  user:'patient'
                }
                console.log(updatePlayer);
                LoginService.updatePlayer(updatePlayer).then(function(response){
                  console.log(response);
                })
              });

              patientProfileDetailsService.fetchPatient($rootScope.PatientDetail.patient_mob).then(function(response){
  							window.localStorage['patientDetails'] = angular.toJson(response);
  						}).catch(function(error){
  						console.log('failure data', error);
  						})

              patientProfileDetailsService.fetchPatientImage($rootScope.PatientDetail.patient_mob).then(function(response){
  							console.log(response);
  							window.localStorage['patientProfileImage'] = angular.toJson(response);
  						}).catch(function(error){
  						console.log('failure data', error);
  						})

  						searchDoctorServices.specialitySearch().then(function(response){
  							window.localStorage['specialityList1'] = angular.toJson(response);
  							// console.log(window.localStorage['specialityList1']);
  						}).catch(function(error){
  						console.log('failure data', error);
  						});

  						searchDoctorServices.getLanguages().then(function(response){
  							window.localStorage['languages'] = angular.toJson(response);
  							// console.log(window.localStorage['languages']);
  						}).catch(function(error){
  						console.log('failure data', error);
  						});

              medicalSpecialityService.getMedicalSpecialist().then(function(response){
                  console.log('successfull data', response);
                  $scope.specialitiesList = response;
                  window.localStorage['specialitiesList'] = angular.toJson(response);
               }).catch(function(error){
                   console.log('failure data', error);
               });

              $rootScope.dateOfBirth='';
              $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
              });
              $scope.submitted = false;
              $scope.submitted2ndPage = false;
              $rootScope.loginDatasubmitted=false;

              // $ionicLoading.show({
              //   template:'<ion-spinner></ion-spinner><br><br><br>Logging into DoctorQuick'
              // });
              var uname1 = "greet+"+$rootScope.PatientDetail.patient_mob;
  						var pw1 = "DQ_patient";
              var success = function(message)
              {
                // console.log(message);

                $ionicLoading.hide().then(function(){
                  console.log("The loading indicator is now hidden");
                  $rootScope.PatientDetail={};

                  $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true,
                    historyRoot:true
                  });
                  $state.go('app.patient_home', {}, {location: "replace", reload: true});

                });
                $timeout( function(){
                console.log('interval started');
                $interval(checkNewMessages,2000);
                }, 5000 );
              }

              var failure = function()
              {

                alert("Error Occurred While Loggin in to DoctoQuick");

              }
              // $ionicHistory.nextViewOptions({
              //   disableAnimate: true,
              //   disableBack: true,
              //   historyRoot:true
              // });
              // $state.go('app.patient_home', {}, {location: "replace", reload: true});

            hello.login(uname1,pw1,success, failure);

            var username = "greet+"+$rootScope.PatientDetail.patient_mob;
            var password = "DQ_patient";
            $rootScope.unreadchatforpatient = 0;

            function checkNewMessages()
            {
                var success = function(message)
                {
                  $rootScope.unreadchatforpatient = message;
                  console.log($rootScope.unreadchatforpatient);
                }

                var failure = function()
                {
                  console.log("Error calling Hello Plugin");
                  //console.log(‘error’);

                }
                  hello.unreadchatfromusers(username,password,success, failure);
            }
            // var details = {
            //   'phone': $rootScope.PatientDetail.patient_mob,
            //   'password': $rootScope.PatientDetail.pat_password
            // }
            // console.log(details);
            //   $state.go('auth.loginNew', {userPhone:$rootScope.PatientDetail.patient_mob,userPassword:$rootScope.PatientDetail.pat_password}, {location: "replace", reload: true});

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
              $ionicLoading.hide();
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
      console.log($rootScope.PatientDetail.dob);

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

///this is for calender

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
        // $state.go('auth.patient_reg2');

      }

    }

    $rootScope.validInput=true;
  $scope.validateUser1=function(isForm1Valid){

    console.log('clicked');
    $rootScope.validInput=false;
    $scope.submitted2ndPage = true;
    // console.log($rootScope.PatientDetail.patient_mob);
    $rootScope.otpentered = {};
    if(!$rootScope.PatientDetail.patient_mob){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      $scope.submittedMob = true;
      console.log($rootScope.PatientDetail.patient_mob);

    }
    else if(!$rootScope.PatientDetail.gender){
      $scope.submittedSex = true;

    }
    else if(!$rootScope.PatientDetail.pat_email){
      $scope.submittedMail = true;

    }
    else if(!$rootScope.PatientDetail.pat_password){
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
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'
      })
      // console.log($rootScope.PatientDetail.pat_password.length());
      if($scope.firstNum < 6){
        $ionicLoading.hide();
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
            deviceID:window.localStorage.deviceID,
            serial:window.localStorage.serial
          }
          console.log(checkDeviceReg);
          patientRegistrationService.existingPatient(checkDeviceReg).then(function(response)
          {
            $scope.patientExist=response;
            console.log($scope.patientExist);
                if($scope.patientExist === 'patient'){
                  $ionicLoading.hide();
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
                      $scope.phoneno = $rootScope.PatientDetail.patient_mob;

                      patientRegistrationService.sendotp($rootScope.PatientDetail.patient_mob).then(function(response)
                      {
                            $rootScope.otp=response;
                            console.log($rootScope.otp);
                            if($rootScope.otp){
                            $ionicLoading.hide();
                            $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true,
                            historyRoot: true

                            });
                            $state.go('auth.patient_reg3');
                            }
                      }).catch(function(error)
                      {
                        console.log('failure data', error);
                      });

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

      // window.plugins.toast.showWithOptions({
      // message: "Valid email must be entered",
      // duration: "short", // 2000 ms
      // position: "bottom",
      // styling: {
      // opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      // backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
      // textColor: '#ffffff', // Ditto. Default #FFFFFF
      // textSize: 13, // Default is approx. 13.
      // cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      // horizontalPadding: 16, // iOS default 16, Android default 50
      // verticalPadding: 12 // iOS default 12, Android default 30
      // }
      // });

    }
    else if(!$scope.Doctor.doc_phone){
      // $scope.firstNum=$rootScope.PatientDetail.patient_mob.charAt(0);
      console.log('enter mail');
      $scope.submittedMob = true;
      console.log($scope.Doctor.doc_phone);

      // window.plugins.toast.showWithOptions({
      //     message: "Valid phone number must be entered",
      //     duration: "short", // 2000 ms
      //     position: "bottom",
      //     styling: {
      //     opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      //     backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
      //     textColor: '#ffffff', // Ditto. Default #FFFFFF
      //     textSize: 13, // Default is approx. 13.
      //     cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      //     horizontalPadding: 16, // iOS default 16, Android default 50
      //     verticalPadding: 12 // iOS default 12, Android default 30
      //     }
      // });

    }

    else{
      console.log('2nd form validated');
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

          $scope.myPopup = $ionicPopup.show({
          // title: 'Invalid Credentials',
          cssClass: 'requestPopup',
          template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Please wait someone from DoctorQuick will call you shortly to help you with registration.</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
          scope: $scope,
          buttons: [
          {
          text: 'OK',
          type: 'button-royal',
          onTap:function(){
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $window.localStorage.clear();
          }
          },
          ]


          });
          $scope.closethis = function()
          {
            $scope.myPopup.close();
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
    // templateType: 'Modal'       //Optional
  };


  var options = {
     date: new Date(),
     mode: 'date', // or 'time'
     // minDate: new Date() - 10000,
     // allowOldDates: true,
     allowFutureDates: false,
     androidTheme : 3,
     cancelButtonLabel: 'CANCEL',
     cancelButtonColor: '#ff0101',
     doneButtonLabel: 'DONE',
     doneButtonColor: '#6aa13e'

   };

$scope.openDatePickerDOB = function(){
  $cordovaDatePicker.show(options).then(function(date){
    $rootScope.dateOfBirth=date;
          console.log(date);
      });
};

})

DoctorQuickApp.controller('CameraCtrl', function ($scope, $rootScope, $cordovaCamera, $ionicLoading, $localStorage,cameraService) {
console.log(window.localStorage.user);
	$scope.takePhoto = function () {
	                  var options = {
	                    quality: 75,
	                    destinationType: Camera.DestinationType.DATA_URL,
	                    sourceType: Camera.PictureSourceType.CAMERA,
	                    allowEdit: true,
	                    encodingType: Camera.EncodingType.JPEG,
	                    targetWidth: 300,
	                    targetHeight: 300,
	                    popoverOptions: CameraPopoverOptions,
	                    saveToPhotoAlbum: false
	                };

	                    $cordovaCamera.getPicture(options).then(function (imageData) {
	                        $rootScope.imgURI = "data:image/jpeg;base64," + imageData;

	                    }, function (err) {
	                        // An error occured. Show a message to the user
	                    });

	                }

	                $scope.choosePhoto = function () {
	                  var options = {
	                    quality: 75,
	                    destinationType: Camera.DestinationType.DATA_URL,
	                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
	                    allowEdit: true,
	                    encodingType: Camera.EncodingType.JPEG,
	                    targetWidth: 300,
	                    targetHeight: 300,
	                    popoverOptions: CameraPopoverOptions,
	                    saveToPhotoAlbum: false
	                };

	                    $cordovaCamera.getPicture(options).then(function (imageData) {
	                        $rootScope.imgURI = "data:image/jpeg;base64," + imageData;

													$state.go('app.patient_profile')
	                    }, function (err) {
	                        // An error occured. Show a message to the user
	                    });
											alert(window.localStorage.user);
	                }



})

DoctorQuickApp.controller('ForgotPasswordCtrl', function($scope,$window,$state,$ionicPopup , $ionicLoading,$cordovaToast, $ionicHistory,ForgotPassword) {
$scope.user = {};

  console.log('forgotPasseword');
	$scope.recoverPassword = function(){
    console.log($scope.user.phone);
		console.log('recoverclicked');
    $ionicLoading.show({

    })

    ForgotPassword.forgotPassword($scope.user.phone).then(function(response){
        $scope.PasswordDetails=response;//store the response array in doctor details
        console.log($scope.PasswordDetails);
        if($scope.PasswordDetails === "DoesNotExist"){
          $ionicLoading.hide();
          var confirmPopup = $ionicPopup.confirm({

    				template: '<center>This mobile number is not registered with us</center>',
    				cssClass: 'videoPopup',
    				scope: $scope,
    				buttons: [
    					{
    						text: 'OK',
    						type: 'button-positive',
    						onTap: function(e){
    						console.log('ok');
    						}
    					},
    				]
    			});
        }
        else{
          $ionicLoading.hide();

          var confirmPopup = $ionicPopup.confirm({

    				template: '<center>Your password has been sent to registered mobile number</center>',
    				cssClass: 'videoPopup',
    				scope: $scope,
    				buttons: [
    					{
    						text: 'OK',
    						type: 'button-positive',
    						onTap: function(e){
    						console.log('ok');
                $ionicHistory.nextViewOptions({
                  disableAnimate: true,
                  disableBack: true
                });
                $state.go('auth.loginNew', {}, {location: "replace", reload: false});
    						}
    					},
    				]
    			});


          // window.plugins.toast.showWithOptions({
          // message: "Your password has been sent to registerd mobile number",
          // duration: "short", // 2000 ms
          // position: "bottom",
          // styling: {
          // opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
          // backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
          // textColor: '#ffffff', // Ditto. Default #FFFFFF
          // textSize: 13, // Default is approx. 13.
          // cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
          // horizontalPadding: 16, // iOS default 16, Android default 50
          // verticalPadding: 12 // iOS default 12, Android default 30
          // }
          // });


        }


    }).catch(function(error){
      console.log('failure data', error);
    });

	};


})

DoctorQuickApp.controller('LoginCtrl', function($scope, $state,$stateParams, $cordovaNetwork,$interval, $q, $rootScope, $ionicPopover, $ionicPopup, $timeout, $remember,$ionicLoading, $ionicHistory, $localStorage, $sessionStorage, $cookies, $window, LoginService,doctorServices,medicalSpecialityService,patientProfileDetailsService,searchDoctorServices,myConsultationService)
{
		var loggedIn=false;


		$scope.user = {};
		$scope.user.rememberMe = false;
		$scope.loginData = {};

		$scope.loginData.phone=$stateParams.userPhone;
		$scope.loginData.pin=$stateParams.userPassword;


			$scope.rememberme =  function()
			{
						if($scope.user.rememberMe)
						{
							$cookies.put('Phone', $scope.loginData.phone);
							$cookies.put('password', $scope.loginData.pin);
						}
						else
 						{
								$cookies.put('Username', '');
								$cookies.put('password', '');
						}

			}
		$scope.sendForm = function($event,form)
		{
	       $event.preventDefault()
	       $scope.loginDatasubmitted = true
				//  console.log($scope.submitted);
	  };

		var special = {};

			$scope.loginData.phone = $cookies.get('Phone');
			$scope.loginData.pin = $cookies.get('password');

			// $(document).ready(function() {
			//     $(".input-group > input").focus(function(e){
			//         $(this).parent().addClass("input-group-focus");
			//     }).blur(function(e){
			//         // $(this).parent().removeClass("input-group-focus");
			//     });
			// });
			$scope.countries = [
					{
					name: "India",
					dial_code: "+91",
					code: "IN"
					},
					{
					name: "US",
					dial_code: "+1",
					code: "US"
					}
				 ]

				 $scope.getPassword = function(num)
				 {
					 // $ionicLoading.show({
						//  template:'Getting your password',
						//  duration:3000
					 // });
				      console.log("get password",num);
				 };

	$scope.doLogIn = function()
	{
		console.log($rootScope.loginDatasubmitted);
				$rootScope.loginDatasubmitted=true;
				window.localStorage.showConnecting=false;
				window.localStorage.showConnecting = false;

			if($scope.loginData.phone && $scope.loginData.pin)
			{
				window.localStorage.user = $scope.loginData.phone;
				window.localStorage.pass = $scope.loginData.pin;
				$rootScope.user = $scope.loginData.phone;
				console.log('user:',window.localStorage.user);
				console.log('user:',window.localStorage.pass);

				$rootScope.logginMessage="Logging into DoctorQuick";
				$ionicLoading.show({
			        template: '<ion-spinner></ion-spinner><br><br>{{logginMessage}}'
			      });


				var userDetails={
					userNum : $scope.loginData.phone,
					password : $scope.loginData.pin,
					deviceID : window.localStorage.deviceID,
					serial:window.localStorage.serial
				};

				$scope.lastView = $ionicHistory.backView();
				LoginService.loginprocess(userDetails).then(function(response){
					// console.log(navigator.connection.type);
					console.log(response);

					if(response === "patient")
					{

						window.localStorage.doctororpatient = response;
						window.plugins.OneSignal.getIds(function(ids) {
							$scope.playerId=JSON.stringify(ids['userId']);
							// console.log($scope.playerId);
							var updatePlayer ={
								palyerId:$scope.playerId,
								userNum:window.localStorage.user,
								user:'patient'
							}
							console.log(updatePlayer);
							LoginService.updatePlayer(updatePlayer).then(function(response){
								console.log(response);
							})
						});

						patientProfileDetailsService.fetchPatient($scope.loginData.phone).then(function(response){
							window.localStorage['patientDetails'] = angular.toJson(response);
						}).catch(function(error){
						console.log('failure data', error);
						})

						patientProfileDetailsService.fetchPatientImage($scope.loginData.phone).then(function(response){
							console.log(response);
							window.localStorage['patientProfileImage'] = angular.toJson(response);
						}).catch(function(error){
						console.log('failure data', error);
						})

						// myConsultationService.myConsultedDoctors($scope.loginData.phone).then(function(response){
						// 	console.log(response);
            //
						// window.localStorage['ConsultedDoctor'] = angular.toJson(response);
						// }).catch(function(error){
						// // console.log('failure data', error);
						// });

            //

            //
						// ///////////get all specialities///////////


						// doctorServices.myDoctorsFetched($scope.loginData.phone).then(function(response){
						// 	// alert('list');
					  //   $scope.myConsultedDoctors=response;
						// 	window.localStorage['myDoctors'] = angular.toJson(response);
						//
					  // }).catch(function(error){
					  // console.log('failure data', error);
					  // });
						//


						var uname1 = "greet+"+$scope.loginData.phone;
						var pw1 = "DQ_patient";


						$scope.deviceAndroid = ionic.Platform.isAndroid();
						console.log($scope.deviceAndroid);
						if($scope.deviceAndroid === true){
							// $ionicLoading.show({
						  //       template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
						  //     });
							var success = function(message)
							{

									console.log('vsee plugin called');

								loggedIn=true;
									$ionicLoading.hide().then(function(){
										console.log("The loading indicator is now hidden");
										            $ionicHistory.nextViewOptions({
										                disableBack: true,
										                disableAnimate: true,
										                historyRoot: true
										            });
										            $ionicHistory.clearCache();
										            $ionicHistory.clearHistory();
																$state.go('app.patient_home',{}, {location: "replace", reload: true});

										$ionicHistory.nextViewOptions({
											disableAnimate: true,
											// disableBack: true,
											historyRoot:true
										});

									});
									$timeout( function(){
									console.log('interval started');
									$interval(checkNewMessages,2000);
									}, 5000 );


							}
							var failure = function()
							{

								alert("Error calling Hello Plugin");

							}
							// $state.go('app.patient_home');//for browser login
							hello.login(uname1,pw1,success, failure);


							var username = "greet+"+window.localStorage.user;
	            var password = "DQ_patient";
	            function checkNewMessages()
	            {
	                var success = function(message)
	                {
	                  $rootScope.unreadchatforpatient = message;
	                  console.log($rootScope.unreadchatforpatient);
	                }

	                var failure = function()
	                {
	                  console.log("Error calling Hello Plugin");
	                  //console.log(‘error’);

	                }
	                  hello.unreadchatfromusers(username,password,success, failure);
	            }
						}
						else{
							$ionicLoading.show({
						        template: '<ion-spinner></ion-spinner><br><br>Logging to DoctorQuick'
						      });
							var success = function(message)
							{
										console.log(message);
								$scope.iosLoggin=message;
								window.localStorage.iosLogin=$scope.iosLoggin;


							}
							var failure = function()
							{

								alert("Error calling Hello Plugin");

							}

							hello.login(uname1,pw1,success, failure);

							$timeout( function(){
									console.log('interval started');
						            $interval($rootScope.loginInterval,2000,1);
												$interval(checkNewMessages,2000);

						         }, 10000 );

										 var username = "greet+"+window.localStorage.user;
										 var password = "DQ_patient";
										 function checkNewMessages()
										 {
										 		var success = function(message)
										 		{
										 			$rootScope.unreadchatforpatient = message;
										 			console.log($scope.unreadchatforpatient);
										 		}

										 		var failure = function()
										 		{
										 			console.log("Error calling Hello Plugin");
										 			//console.log(‘error’);

										 		}
										 			hello.unreadchatfromusers(username,password,success, failure);
										 }
								 $rootScope.loginInterval = function () {
									 var success = function(message)
	 								{
										console.log(message);
										$ionicLoading.hide().then(function(){
										console.log("The loading indicator is now hidden");
										$ionicHistory.nextViewOptions({
										disableAnimate: true,
										disableBack: true
										});
										$state.go('app.patient_home', {}, {location: "replace", reload: false});
											//$interval.cancel(loginStatus);
										});
	 								}

	 								var failure = function()
	 								{
	 									alert("Error Occurred While Loggin in to DoctoQuick");
	 								}
	 								hello.loginstatus(success,failure);
								  }


						}

					}
					else if(response === "doctor")
					{
						window.localStorage.doctororpatient = response;
						window.plugins.OneSignal.getIds(function(ids){
							$scope.playerId=JSON.stringify(ids['userId']);

							console.log('OneSignal for doctor');
							// console.log($scope.playerId);
							var updatePlayer ={
								palyerId:$scope.playerId,
								userNum:window.localStorage.user,
								user:'doctor'
							}
							console.log(updatePlayer);
							LoginService.updatePlayer(updatePlayer).then(function(response){
								console.log(response);
							})
						});

						doctorServices.doctorDetails($scope.loginData.phone).then(function(response,data){
							$rootScope.doctor_details=response;//store the response array in doctor details
							console.log($rootScope.doctor_details);
							window.localStorage['doctorDetails'] = angular.toJson(response);

						}).catch(function(error){
							console.log('failure data', error);
						});

						var uname1 = "greet+"+$scope.loginData.phone;
						var pw1 = "DQ_doctor";

						$scope.deviceAndroid = ionic.Platform.isAndroid();
						console.log($scope.deviceAndroid);
						if($scope.deviceAndroid === true){
												// $ionicLoading.show({
												// 			template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
												// 		});
														console.log(uname1);
													var success = function(message)
													{
														$rootScope.logginMessage="Connecting to DoctorQuick";
														console.log(message);

														$ionicLoading.hide().then(function(){
															console.log("The loading indicator is now hidden");

															$ionicHistory.nextViewOptions({
																	disableBack: true,
																	disableAnimate: true,
																	historyRoot: true
															});
															$ionicHistory.clearCache();
															$ionicHistory.clearHistory();
															$state.go('templates.doctor_home', {}, {location: "replace", reload: true});

														});
														$timeout( function(){
														console.log('interval started');
														$interval(checkNewMessages,2000);
														}, 5000 );
													}

													var failure = function()
													{

														alert("Error Occurred While Loggin in to DoctoQuick");

													}
												// $state.go('templates.doctor_home');//for logging in from browser
												hello.login(uname1,pw1,success, failure);




												var username = "greet+"+window.localStorage.user;
						            var password = "DQ_doctor";
						            function checkNewMessages()
						            {
						                var success = function(message)
						                {
						                  $rootScope.unreadchatforpatient = message;
						                  console.log($rootScope.unreadchatforpatient);
						                }

						                var failure = function()
						                {
						                  console.log("Error calling Hello Plugin");
						                  //console.log(‘error’);

						                }
						                  hello.unreadchatfromusers(username,password,success, failure);
						            }
												// window.localStorage.onOff=1;

						}
						else{
							$ionicLoading.show({
						        template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
						      });

							var success = function(message)
							{
										console.log(message);
								$scope.iosLoggin=message;
								window.localStorage.iosLogin=$scope.iosLoggin;
							}
							var failure = function()
							{
								alert("Error calling Hello Plugin");
							}

							hello.login(uname1,pw1,success, failure);

							$timeout( function(){
									console.log('interval started');
						            $interval($rootScope.loginInterval,2000,1);
												$interval(checkNewMessages,2000);

						         }, 10000 );
										 var username = "greet+"+window.localStorage.user;
				             var password = "DQ_doctor";
				             function checkNewMessages()
				             {
				                 var success = function(message)
				                 {
				                   $rootScope.unreadchatforpatient = message;
				                   console.log($rootScope.unreadchatforpatient);
				                 }

				                 var failure = function()
				                 {
				                   console.log("Error calling Hello Plugin");
				                   //console.log(‘error’);

				                 }
				                   hello.unreadchatfromusers(username,password,success, failure);
				             }

								 $rootScope.loginInterval = function () {
									 var success = function(message)
	 								{
										console.log(message);
										$ionicLoading.hide().then(function(){
										console.log("The loading indicator is now hidden");
										console.log('hide loader');

										$ionicHistory.nextViewOptions({
												disableBack: true,
												disableAnimate: true,
												historyRoot: true
										});
										$ionicHistory.clearCache();
										$ionicHistory.clearHistory();
										$state.go('templates.doctor_home', {}, {location: "replace", reload: true});

										//$interval.cancel(loginStatus);
										});
	 								}

	 								var failure = function()
	 								{
	 									alert("Error Occurred While Loggin in to DoctoQuick");
	 								}
	 								hello.loginstatus(success,failure);
								  }

						}
						console.log('doctor screen should entered');

					}
					else if(response === "alreadyLoggedIn"){
						$ionicLoading.hide();
						$scope.myPopup = $ionicPopup.show({
							// title: 'Invalid Credentials',
							template: '<i class="icon-left ion-alert-circled"></i><div class="heading"><p>Already Logged In</p></div><div class="errorContent"><p>The user is alreaady Logged in</p></div><div class="closeButton" ng-controller="LoginCtrl" ng-Click="closethis();"><p style="margin: -1vh 3px 0 1vw; font-size: 8vw; color: #fff;">X</p>',
							cssClass: 'videoPopup',
							scope: $scope,
						});
						$scope.closethis = function()
						{
						$scope.myPopup.close();
						};
					}
						else{
								$ionicLoading.hide();
								$scope.myPopup = $ionicPopup.show({
								// title: 'Invalid Credentials',
								template: '<div class="errorContent"><p>The Username or Password is incorrect.<br>Tap on <a ui-sref="auth.getPassword" ng-click=closethis()>Forgot Password</a> to receive the same instantly</p></div>',
								cssClass: 'requestPopup',
								scope: $scope,
								buttons: [
								{
								text: 'OK',
								type: 'button-royal',
								onTap:function(){
									$ionicHistory.clearCache();
									$ionicHistory.clearHistory();
									$window.localStorage.clear();
								}
								},
								]


							});
							$scope.closethis = function()
							{
							$scope.myPopup.close();
							};

						}

				}).catch(function(error){
					console.log('failure data', error);
				});
			}
			else{
				// alert('Number Doesnot exist in our database')
			}


		}

		// $scope.$on('$destroy', function(){
		// 		$interval.cancel(checkNewMessages);
		// });


})


DoctorQuickApp.controller('patientProfileCtrl', function($scope,$interval,$ionicHistory,$rootScope,$cordovaEmailComposer,$ionicPlatform,$state,$window,$ionicConfig,$localStorage,$timeout, $ionicLoading ,$http,$base64, $ionicPopup, LoginService,patientProfileDetailsService,$cordovaCamera,cameraService,IonicClosePopupService) {

// /DoctorQuickApp.controller('patientProfileCtrl', function($scope,$rootScope,$state,$ionicConfig,$localStorage,$ionicLoading, $interval,$http, $ionicPopup, LoginService,patientProfileDetailsService,$cordovaCamera,cameraService) {

	$rootScope.headerTxt="Profile";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	console.log($state.current.name);

	$scope.loginData={};
	$rootScope.patient=window.localStorage.user;
	// console.time('Timer1');
	$ionicLoading.show({
		templates:'<ion-spinner></ion-spinner>',
		showBackdrop:true
	});
	$scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);


	patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
		if(response){
			$ionicLoading.hide();
		}
		window.localStorage['patientDetails'] = angular.toJson(response);
		$scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
		console.log($scope.patient_details);
	}).catch(function(error){
	console.log('failure data', error);
	})

	// debugger;
	var msg='raaa';
	console.todo = function(msg) {
	console.log(' % c % s % s % s', 'color: yellow; background - color: black;', '–', msg, '–');
}
console.todo('RAVI');
	$scope.patientProfileImage = angular.fromJson($window.localStorage['patientProfileImage']);

	$scope.updatePatientEmail=function(){
		// $ionicHistory.nextViewOptions({
		// 		disableBack: true,
		// 		disableAnimate: true,
		// });
		$state.go('app.changeEmail_patient');
	// 	patientProfileDetailsService.updateEmail(window.localStorage.user).then(function(response){
	// 		$scope.patient_email=response;
	// 		console.log($scope.patient_email);
	// 		console.log($scope.patient_email);
  //
	// }).catch(function(error){
	// console.log('failure data', error);
	// })

}

// console.timeEnd('Timer1');
$scope.register = function() {
 console.log('Ionic Push: Registering user');

 $scope.accptNotifications=true;
 $scope.rejectNotifications=false;
 // Register with the Ionic Push service.  All parameters are optional.

};
	function updatedPIc(){

		patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
			$scope.patient_details=response;
			$ionicLoading.hide();
			console.log($scope.patient_details);

	}).catch(function(error){
	console.log('failure data', error);
	})

	}


				$scope.termsAndCond=function(){
					// console.log('clicked');
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

				}

				$scope.changeProfilePhoto = function() {
					var options = {
						quality: 75,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: Camera.PictureSourceType.CAMERA,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 300,
						targetHeight: 300,
						popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: true
				};

						$cordovaCamera.getPicture(options).then(function (imageData) {
								$rootScope.imgURI = "data:image/jpeg;base64," + imageData;

								var imageUploadData ={
									image:$rootScope.imgURI,
									patientPhone:$rootScope.patient
								}
								$window.localStorage['patientProfileImage'] = JSON.stringify([{
									image: $rootScope.imgURI,
								}]);
								console.log($rootScope.imgURI);

								patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
									console.log(response);
									window.localStorage['patientDetails'] = angular.toJson(response);
								}).catch(function(error){
								console.log('failure data', error);
								})

								cameraService.uploadPicture(imageUploadData).then(function(response){
									$scope.uploadedData=response;
									console.log($scope.uploadedData);
									// $ionicLoading.hide();
									 // $window.location.reload();
									return $state.transitionTo($state.current, {}, {reload: true}).then(function() {
	 								$scope.hideContent = true;
	 								return $timeout(function() {
	 								return $scope.hideContent = false;
	 								}, 1);
	 								});
									 $scope.$on('$ionicView.afterEnter', function (event, viewData) {
								 	  $timeout(function() {
								 	    $ionicNavBarDelegate.align('center');
								 	  }, 100);
								 	});
								//
								// $scope.reload = function() {
								//
								// };


							}).catch(function(error){
							console.log('failure data', error);
							})

						}, function (err) {
								// An error occured. Show a message to the user
						});


				}


				// $ionicPlatform.onHardwareBackButton(function(e) {
				// 		console.log('close popup');
				//   },400);


			$scope.changePhoto = function() {
							// console.trace('trace');

							var confirmPopup = $ionicPopup.confirm({
							title: 'Upload Profile Picture',
							template:' <center>Choose From</center>',
							cssClass: 'inviteReviewPopup',
							scope: $scope,
							buttons: [
							{
										text: 'Camera',
										type: ' button-assertive',
										onTap: $scope.takePhoto = function () {
																		var options = {
																			quality: 75,
																			destinationType: Camera.DestinationType.DATA_URL,
																			sourceType: Camera.PictureSourceType.CAMERA,
																			allowEdit: true,
																			encodingType: Camera.EncodingType.JPEG,
																			targetWidth: 300,
																			targetHeight: 300,
																			popoverOptions: CameraPopoverOptions,
																			saveToPhotoAlbum: true
																	};

																			$cordovaCamera.getPicture(options).then(function (imageData) {
																					$rootScope.imgURI = "data:image/jpeg;base64," + imageData;

																					var imageUploadData ={
																						image:$rootScope.imgURI,
																						patientPhone:$rootScope.patient
																					}
																					$window.localStorage['patientProfileImage'] = JSON.stringify([{
																					  image: $rootScope.imgURI,
																					}]);
																					console.log($rootScope.imgURI)
																					cameraService.uploadPicture(imageUploadData).then(function(response){
																						$scope.uploadedData=response;
																						console.log($scope.uploadedData);
																						// $ionicLoading.hide();
																						 $window.location.reload();
																					$scope.reload = function() {
																					return $state.transitionTo($state.current, $stateParams, {reload: true}).then(function() {
																					$scope.hideContent = true;
																					return $timeout(function() {
																					return $scope.hideContent = false;
																					}, 1);
																					});
																					};


																				}).catch(function(error){
																				console.log('failure data', error);
																				})

																			}, function (err) {
																					// An error occured. Show a message to the user
																			});

																	}
							},
							{
												text: 'Gallery',
												type: 'button-royal',
												onTap: $scope.choosePhoto = function () {
												var options = {
												quality: 100,
												destinationType: Camera.DestinationType.DATA_URL,
												sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
												allowEdit: true,
												encodingType: Camera.EncodingType.JPEG,
												targetWidth: 300,
												targetHeight: 300,
												correctOrientation:false,
												// popoverOptions: CameraPopoverOptions,
												popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
												mediaType:0,
												saveToPhotoAlbum: false
												};

												$cordovaCamera.getPicture(options).then(function (imageData) {
													console.log(imageData);
														$rootScope.imgURI = "data:image/jpeg;base64," + imageData;
											// 	var options1 = {
											// 	uri: $rootScope.imgURI,
											// 	// folderName: "Protonet Messenger",
											// 	quality: 100,
											// 	width: 1280,
      								// 	height: 1280,
											// 	// base64: true
											// };
                      //
											// 	window.ImageResizer.resize(options1,
											// 	function(image) {
											// 		console.log(image);
											// 	// success: image is the new resized image
											// 	}, function() {
											// 		console.log('failed to resize');
											// 	// failed: grumpy cat likes this function
											// 	});
														// $rootScope.imgURI = imageData;

														// $scope.encoded = $base64.decode($rootScope.imgURI);
														// console.log($scope.encoded);

														// var resizebase64 = require('resize-base64');
														// console.log($rootScope.imgURI);
														// var  img = resizebase64(imageData, 300, 300);
														// console.log(img);
														var imageUploadData ={
															image:$rootScope.imgURI,
															patientPhone:$rootScope.patient
														}
														$window.localStorage['patientProfileImage'] = JSON.stringify([{
														  image: $rootScope.imgURI,
														}]);
														cameraService.uploadPicture(imageUploadData).then(function(response){
															$scope.uploadedData=response;
															console.log($scope.uploadedData);
															// $ionicLoading.hide();
															$scope.reload = function() {
															return $state.transitionTo($state.current, $stateParams, {reload: false}).then(function() {
															$scope.hideContent = true;
															return $timeout(function() {
															return $scope.hideContent = false;
															}, 1);
															});
															};
													}).catch(function(error){
													console.log('failure data', error);
													})

												}, function (err) {
														// An error occured. Show a message to the user
												});

												}
							},

							]
							});

							IonicClosePopupService.register(confirmPopup);

			};


			patientProfileDetailsService.emailVerification(window.localStorage.user).then(function(response){
				$rootScope.email=response;
				if($rootScope.email == 1){
					$rootScope.emailVerified = false;
					$rootScope.Verified = false;

				}
				if($rootScope.email == 2){
					$rootScope.emailVerified = true;
					$rootScope.Verified = true;

				}

				$ionicLoading.hide();
				console.log($scope.email);

			}).catch(function(error){
			console.log('failure data', error);
			})

});

DoctorQuickApp.controller('addNewPatientCtrl', function($state,$ionicLoading,$ionicHistory, $scope,$stateParams,$window,$cordovaDatePicker, $rootScope,$filter, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage, LoginService, medicalSpecialityService) {
  $scope.toggle = true;
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.headerTxt="Select Patient";
  $rootScope.hideSideMenu = true;


console.log("inNotesCOntoller:",$state.$current.name);
if($state.$current.name === 'app.addSubPatient'){
  $rootScope.headerTxt="Add Patient";

}

$scope.defaultPatient = angular.fromJson($window.localStorage['patientDetails']);
console.log($scope.defaultPatient);
  $rootScope.editNewPatient=function(sub){
    $rootScope.editPatient=sub;
    console.log($rootScope.editPatient);
    console.log($rootScope.editPatient.newPatientDOB);
    //
    //
    // $ionicHistory.nextViewOptions({
    //     disableBack: true,
    //     disableAnimate: true,
    //     historyRoot: true
    // });
    $state.go("app.editPatient");

  }

  $rootScope.deleteNewPatient=function(sub){

    var confirmPopup = $ionicPopup.confirm({
      template: '<center>Are you sure you want to delete the patient?</center>',
      cssClass: 'videoPopup',
      scope: $scope,
      buttons: [

        {
          text: 'Cancel',
          type: 'button-positive',
          onTap: function(e) {
          console.log('ok');

          }
        },
        {
          text: 'Delete',
          type: 'button-royal',
          onTap: function(e) {
            medicalSpecialityService.deletePatient(sub).then(function(response){
               console.log('saved', response);
               if(response){
                 $state.reload()
               }
            }).catch(function(error){
                console.log('failure data', error);
            });

          }
        },
      ]
    });
    console.log(sub);
    // console.log('app.editPatient',{id:$scope.subPAtientDetails.id});

  }
  $rootScope.selectSubPatient=function(id){
    window.localStorage.selectedSubPatient=id;
    console.log(id);
    console.log('selected');
    window.history.back();
    // $state.go("app.specialityDetailsNew");
  }
$rootScope.loginDatasubmitted=false;
  $rootScope.savePatient=function(){
    $ionicLoading.show({
      template:'<ion-spinner><ion-spinner>'
    })

    // alert('add new patient');
    $rootScope.addedPatient=$rootScope.newPatient.fname+" "+$rootScope.newPatient.lname;
    $rootScope.newPatient.dob=$rootScope.dateOfBirth;
    if($rootScope.newPatient.fname && $rootScope.newPatient.lname && $rootScope.newPatient.dob  && $rootScope.newPatient.sex){
      var patientAdded={
        fname:$rootScope.newPatient.fname,
        lname:$rootScope.newPatient.lname,
        dob:$rootScope.newPatient.dob,
        sex:$rootScope.newPatient.sex,
        addedBy:window.localStorage.user
      }
      console.log(patientAdded);

      medicalSpecialityService.savePatient(patientAdded).then(function(response){
         console.log('saved', response);
         if(response){
           $ionicLoading.hide();
           $rootScope.loginDatasubmitted=false;
           $rootScope.newPatient.dob='';
           patientAdded={};
           $state.reload();

           // $state.go("app.subPatientList");
           window.plugins.toast.showWithOptions({
             message: "New patient added",
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

         }
         $rootScope.newPatient={};
         console.log(patientAdded);
      }).catch(function(error){
          console.log('failure data', error);
      });

    }
    else{
      $ionicLoading.hide();
      if(!$rootScope.newPatient.fname ){
          $rootScope.loginDatasubmitted=true;
      }
      else if(!$rootScope.newPatient.lname){
          $rootScope.loginDatasubmitted=true;
      }
      else if(!$rootScope.newPatient.dob){
          $ionicLoading.hide();
          window.plugins.toast.showWithOptions({
          message: "Please fill DOB",
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
      else if(!$rootScope.newPatient.sex){
        $ionicLoading.hide();
        window.plugins.toast.showWithOptions({
          message: "Please select Gender",
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
        // #donothing
      }
      console.log("nodata");
    }
  }
  medicalSpecialityService.getSubPatients(window.localStorage.user)
   .then(function(response){
     $scope.subPatients = response;
     window.localStorage['subPatients'] = angular.toJson(response);
     console.log($scope.subPatients);
   }).catch(function(error){
      console.log('failure data', error);
   });

   $rootScope.dateOfBirth='';
   var ipObj2 = {
       callback: function (val) {  //Mandatory
         $scope.currentDate = new Date();
         console.log($scope.currentDate);
         console.log('Selected To Date : ' + val, new Date(val));

         $rootScope.dateOfBirth = $filter('date')(new Date(val),'yyyy-MM-dd');

       },

       from: new Date(1950, 1, 1), //Optional
       to: new Date(2050, 12, 31), //Optional
       inputDate: new Date(),      //Optional
       mondayFirst: false,          //Optional
       // disableWeekdays: [0],       //Optional
       closeOnSelect: true,
       dateFormat: 'dd MMMM yyyy',     //Optional
       templateType: 'popup'       //Optional
     };


     var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        // minDate: new Date() - 10000,
        // allowOldDates: true,
        allowFutureDates: false,
        androidTheme : 3,
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#ff0101',
        doneButtonLabel: 'DONE',
        doneButtonColor: '#6aa13e'

      };

   $scope.openDatePickerDOB = function(){
     $cordovaDatePicker.show(options).then(function(date){
       $rootScope.dateOfBirth=date;
             console.log(date);
             $rootScope.dateOfBirth =date;
         });
     // ionicDatePicker.openDatePicker(ipObj2);
   };


})

DoctorQuickApp.controller('callAcceptedCtrl', function($scope,$rootScope,$ionicConfig, $http, $location,$cordovaNetwork,$timeout,$ionicPopup,$ionicPlatform,$ionicHistory, $stateParams,$interval, $state, $localStorage, $ionicLoading, doctorServices,$ionicSideMenuDelegate,rateDoctorServices,callacceptedbydoctor,callAcceptedService,doctorServices,HardwareBackButtonManager,patientProfileDetailsService) {

	$rootScope.headerTxt="DoctorQuick";
	$rootScope.showBackBtn=false;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.sandwich=false;
	$rootScope.hideSideMenu = false;

	HardwareBackButtonManager.disable();
	$ionicSideMenuDelegate.canDragContent(false)

	var currentConsultation={
		consultId:$stateParams.callId,
		doctor:$stateParams.accptdDoc
	}
	console.log(currentConsultation);

	 $rootScope.accptdDoc=$stateParams.accptdDoc;
	 $rootScope.callId=$stateParams.callId;
	 $rootScope.callFlag=$stateParams.callFlag;
	 $rootScope.rates=$stateParams.rates;
	 $rootScope.totalRates=$stateParams.totalRates;

 $scope.ratings = [{
 			 current: $rootScope.rates,
 			 max: 5,
 			 total:$rootScope.totalRates
 	 }, ];

console.log($rootScope.callFlag,$rootScope.callId);
 callAcceptedService.updateseenView($rootScope.callId).then(function(response){
 $scope.cancelledReq=response;
 }).catch(function(error){
 console.log('failure data', error);
 });


 doctorServices.doctorDetails($rootScope.accptdDoc).then(function(response){
 $scope.calledDetails=response;
 console.log($scope.calledDetails);
 $scope.getStars = function(rating) {
	 // Get the value
	 var val = parseFloat(rating);
	 // Turn value into number/100
	 var size = val/5*100;
	 return size + '%';
   // Get the value
   var val = parseFloat(rating);
   // Turn value into number/100
   var size = val/5*100;
   return size + '%';
 }
 }).catch(function(error){
 console.log('failure data', error);
 });

// console.log($ionicHistory);

$scope.callDoctor = function(callType)
{
	var videocallflag = callType;
	console.log(videocallflag);

	$scope.startdate = new Date();
	$scope.callid = $rootScope.callId;
	// window.localStorage.ViewDoc=1;

	console.log(window.localStorage.networkType);
	var uname = "greet+"+window.localStorage.user;
	var pw = "DQ_patient";

		 var persontocall = "greet+" + $rootScope.accptdDoc;
		 console.log(uname);
		 console.log(persontocall);
		 console.log($scope.callid);

	if(window.localStorage.networkType == 'None')
	{
		var confirmPopup = $ionicPopup.confirm({
						// title: 'DoctorQuick',
						template: 'You are Offline ',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
							{
								text: 'OK',
								type: 'button-royal',
								onTap: function(e) {
								console.log('offline');
								}
							},
						]
					});
	}
	else if(window.localStorage.networkType == 'Ethernet' || window.localStorage.networkType == '2G' || window.localStorage.networkType == '3G')
	{
		var confirmPopup = $ionicPopup.confirm({
						// title: 'DoctorQuick',
						template: 'We detected slow nwtwork on your device ',
						cssClass: 'videoPopup',
						scope: $scope,
						buttons: [
							{
								text: 'OK',
								type: 'button-positive',
								onTap: function(e) {
								console.log('ok');
								}
							},
						]
					});
	}
	else if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi' || window.localStorage.networkType == 'Unknown')
	{
		var success = function(message)
		{

				console.log(message);
				$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true
			 });

			 $scope.deviceAndroid = ionic.Platform.isAndroid();
			 console.log($scope.deviceAndroid);
			 //$state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc,consultId:$scope.callId}, {location: "replace", reload: false});
			 if($scope.deviceAndroid === false){
				 $ionicLoading.show({
         template: '<ion-spinner></ion-spinner><br><br>Loading'
         });
				 $timeout( function(){
           $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
           // alert('loggedin');
           $ionicHistory.nextViewOptions({
           disableAnimate: true,
           disableBack: true
           });
					 $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc,consultId:$scope.callId},{location: "replace", reload: true});

           });

         }, 10000 );
			 }
			 else{
				 $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc,consultId:$scope.callId},{location: "replace", reload: true});
			 }

			 	console.log('callEnded');
				//
				$scope.enddate = new Date();
				console.log(window.localStorage.user);
				console.log($rootScope.accptdDoc);
				// console.log(window.localStorage.Doctocall);
				callacceptedbydoctor.accpeteddoctor(window.localStorage.user,$rootScope.accptdDoc,videocallflag,$scope.startdate,$scope.enddate,$scope.callId);

				console.log($rootScope.reqId);



		}
		var failure = function()
		{
			alert("Error calling Hello Plugin");
		}
		if(videocallflag == 3){
			console.log(videocallflag);
			hello.audiocallvsee(uname,pw,persontocall,success, failure);

		}
		if(videocallflag == 2){
			console.log(videocallflag);
			hello.greet(uname,pw,persontocall,success, failure);
		}


	}
	else{

		//Do nNothing

	}
				// $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc});
}



$scope.BalanceForVoiceCall = function()
{
      // alert('called');
	var audiocallflag = 1;
	$scope.startdate = new Date();
	$scope.callid = $rootScope.callId;

				var unametoaudiocall = "greet+"+window.localStorage.user;
			 	var pwtoaudiocall = "DQ_patient";

			 	var persontocallforaudio = "greet+" + window.localStorage.Doctocall;
			//  console.log(uname);
			//  console.log(persontocallforaudio);
				 var success = function(message)
				{

						console.log(message);
						$scope.enddate = new Date();
							console.log(window.localStorage.user);
							console.log(window.localStorage.Doctocall);
							callacceptedbydoctor.accpeteddoctor(window.localStorage.user,window.localStorage.Doctocall,audiocallflag,$scope.startdate,$scope.enddate,$scope.callid);
							$ionicHistory.nextViewOptions({
 						 	disableAnimate: true,
 						 	disableBack: true
 						 });
 						 $state.go('app.patient_summary',{calledDoctor:$rootScope.accptdDoc}, {location: "replace", reload: true});

				}
				var failure = function()
				{
					alert("Error calling Hello Plugin");
				}

				hello.audiocallvsee(unametoaudiocall,pwtoaudiocall,persontocallforaudio,success, failure);

}

$scope.isFirstTime = true;
$interval(checkAcceptedReqDocStatus,2000);
var checkPatientActivity={
	callId:$rootScope.callId,
	doctor:$stateParams.accptdDoc
}
console.log(checkPatientActivity);
 function checkAcceptedReqDocStatus(){
	//  doctorServices.patientActivity($rootScope.callId).then(function(response){
	 doctorServices.patientActivity(checkPatientActivity).then(function(response){
	 $scope.consultStatus=response;
	 // console.log($scope.consultStatus);
	 window.localStorage.declinedByDoc = $scope.consultStatus[0][0];
	 $scope.docDeclined=window.localStorage.declinedByDoc;
	//  console.log($scope.consultStatus);
	 }).catch(function(error){
	//  console.log('failure data', error);
	 });
 }
 $scope.$watch('docDeclined', function (newValue, oldValue, scope){
 		console.log('changed');
		console.log('oldValue',oldValue);
		console.log('newValue',newValue);

 		if(newValue > oldValue){
			setTimeout(function (){
					 console.log('delay 3 sec');
				 }, 3000);

		     var alertPopup = $ionicPopup.alert({
		      //  title: 'Declined!',
					 template: "<div>Doctor does not wish to proceed for a consultation at this time</div>",
					 cssClass: 'requestPopup',
					 scope: $scope,
		     });
		     	 alertPopup.then(function(res) {
					 $state.go("app.patient_home");
					 $ionicHistory.clearHistory();
		     });
 		}

 },true);

 $scope.declineCall=function(){
		 var calldecline={
		 patient:window.localStorage.user,
		 doctor:$rootScope.doctorPhone,
		 callId:$rootScope.callId
		 }
		 console.log(calldecline);
		 $interval.cancel(checkAcceptedReqDocStatus);
		//  window.localStorage.ViewDoc=0;
		 callAcceptedService.callDeclined(calldecline).then(function(response){
			 $scope.declineStatus=response;
			 console.log($scope.declineStatus);
		 }).catch(function(error){
		 console.log('failure data', error);
		 });
			 $state.go('app.patient_home')
			 console.log('decline clicked');
 }

 $scope.$on('$destroy', function(){
 		$interval.cancel(checkAcceptedReqDocStatus);

 });

});

DoctorQuickApp.controller('consultSummaryCtrl', function($state, $ionicHistory,$rootScope,$stateParams,$ionicPopup,$window,$timeout,$scope,$rootScope,$ionicConfig, $http, $ionicLoading, $localStorage, LoginService, myConsultationService, rateDoctorServices,doctorServices,patientProfileDetailsService) {
	$rootScope.headerTxt="Summary";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification = false;
	$rootScope.hideSideMenu = false;


	$scope.rating = {};
	  $scope.rating.rate = 3;
	  $scope.rating.max = 5;

console.log($stateParams.calledDoctor);

// $ionicLoading.show();

var confirmPopup = $ionicPopup.confirm({
	template: '<center>Prescription filled by the doctor will be available in My Consultation shortly</center>',
	cssClass: 'summaryPopup',
	scope: $scope,
	buttons: [
	{
		text: 'OK',
		type: 'button-positive',
		onTap: function(e) {
		console.log('ok');
		}
	},
	]
});


patientProfileDetailsService.updatenotesflag($stateParams.consultId).then(function(response){
		// console.log(response);
	 console.log('success');
 }).catch(function(error){
	 console.log('failure data', error);
 })
var key = this;

$scope.setRating = function(ratings,val){
	var rtgs = $scope.ratingArr;
	for (var i = 0; i < rtgs.length; i++) {
		if (i < val) {
			rtgs[i].icon = 'ion-ios-star';
		} else {
			rtgs[i].icon = 'ion-ios-star-outline';
		}
	};

	$rootScope.ratingValue = ratings;

	console.log(ratings);
	if(ratings <= 3)
	{
			// $scope.unhappy = true;
			// $scope.happy = false;
			console.log($scope.unhappy);
			var filRatings = $ionicPopup.confirm({
				// template: '<p>Please share details with us why you were<br>unhappy with the consultation so that we <br>can improve our services.</p><br><textarea name="ratingComments" id="ratingComments" ng-model="ratingComments.comment"></textarea>',
				template: '<p>Please tell us why you were unhappy with the consultation</p><textarea name="ratingComments" id="ratingComments" ng-model="ratingComments.comment" style="height: 15%; border: 1px solid teal;"></textarea>',
				cssClass: 'summaryPopup',
				scope: $scope,
				buttons: [
					{
						text: 'Cancel',
						type: 'button-royal',
						onTap: function(e) {
							$ionicHistory.clearCache();
							$ionicHistory.clearHistory();
							$ionicHistory.nextViewOptions({
									disableBack: true,
									disableAnimate: true,
									historyRoot: true
							});

							$state.go("app.patient_home");
						}
					},
				{
					text: 'Send',
					type: 'button-positive',
					onTap: function(e) {
					console.log('ok');


										$scope.patient_details ={};
										// $scope.userPhone=LoginService.returnUserPhone();

										if($scope.ratingComments.comment)
										{


											var ratedValues={
												rates:$rootScope.ratingValue,
												//ratedBy:window.localStorage.user,
												ratedTo:$stateParams.calledDoctor,
												ratingComments:$scope.ratingComments.comment
											};
											console.log(ratedValues);
											rateDoctorServices.rateDoctor(ratedValues).then(function(response){
												console.log(ratedValues);
												$scope.rated=response;
												console.log($scope.rated);
												$scope.ratingComments.comment="";

												//$state.go('app.patient_home', {}, {reload: true});
												$ionicHistory.nextViewOptions({
												disableAnimate: true,
												disableBack: true,
												historyRoot:true
												});
												$state.go('app.patient_home',{},{location: "replace", reload: false});


											}).catch(function(error){
												console.log('failure data', error);
											});


										}
										else
										{

											window.plugins.toast.showWithOptions({
											message: "Please Enter Rating Comments",
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



										}







					}
				}

				]
			});
	}
	else if (ratings >= 4)
	{
			$scope.happy = true;
			$scope.unhappy = false;
			$timeout(function() { $scope.displayErrorMsg = false;}, 2000);
			window.plugins.toast.showWithOptions({
			message: "Thank you for your ratings",
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
			// $ionicHistory.clearCache();
			$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true,
			historyRoot:true
			});


			var ratedValues={
				rates:$rootScope.ratingValue,
				//ratedBy:window.localStorage.user,
				ratedTo:$stateParams.calledDoctor
				//ratingComments:$scope.ratingComments.comment
			};
			console.log(ratedValues);
			rateDoctorServices.rateDoctor(ratedValues).then(function(response){
				// // console.log(ratedValues);
				// $scope.rated=response;
				// console.log($scope.rated);
				// $scope.ratingComments.comment="";

				//$state.go('app.patient_home', {}, {reload: true});
				$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true,
				historyRoot:true
				});
				$state.go('app.patient_home',{},{location: "replace", reload: false});


			}).catch(function(error){
				console.log('failure data', error);
			});



	}
	else
	{
			$scope.unhappy = true;
			$scope.happy = false;
	}
}

	$scope.ratingss = [{
		 current: 4,
		 max: 5
 }];

var myDoc={
	calledDoctor:$stateParams.calledDoctor,
	patient:window.localStorage.user
}
console.log(myDoc);
 myConsultationService.docSummaryDetails(myDoc).then(function(response){
 		$scope.myDoctor=response;//store the response array in doctor details
 		console.log($scope.myDoctor);
 		$ionicLoading.hide();
 }).catch(function(error){
 	console.log('failure data', error);
 });

$scope.ratingsObject = {
		iconOn: 'ion-ios-star',    //Optional
		iconOff: 'ion-ios-star-outline',   //Optional
		iconOnColor: 'rgb(200, 200, 100)',  //Optional
		iconOffColor:  'rgb(200, 100, 100)',    //Optional
		// minRating:,    //Optional
		readOnly: false, //Optional
		callback: function(rating) {    //Mandatory
			$scope.ratingsCallback(rating);
		}
	};

      $scope.ratingsCallback = function(rating){
        console.log('Selected rating is : ', rating);
      };


			$rootScope.ratingValue;
			$scope.ratingsCallback = function(rating) {
				$rootScope.ratingValue=rating;
				// console.log('Selected rating is : ', rating);
					console.log('Selected rating is : ', $rootScope.ratingValue);
								if(rating <= 3)
								{
										$scope.unhappy = true;
										$scope.happy = false;
								}
								else if (rating >= 4)
								{
										$scope.happy = true;
										$scope.unhappy = false;
								}
								else
								{
										$scope.unhappy = false;
										$scope.happy = false;
								}
			};


			$scope.ratingComments={};

			$scope.sendRatings=function()
			{

					$scope.patient_details ={};
					// $scope.userPhone=LoginService.returnUserPhone();

					if($scope.ratingComments.comment)
					{


						var ratedValues={
							rates:$rootScope.ratingValue,
							//ratedBy:window.localStorage.user,
							ratedTo:$stateParams.calledDoctor,
							ratingComments:$scope.ratingComments.comment
						};
						console.log(ratedValues);
						rateDoctorServices.rateDoctor(ratedValues).then(function(response){
							console.log(ratedValues);
							$scope.rated=response;
							console.log($scope.rated);
							$scope.ratingComments.comment="";

							//$state.go('app.patient_home', {}, {reload: true});
							$ionicHistory.nextViewOptions({
							disableAnimate: true,
							disableBack: true,
							historyRoot:true
							});
							$state.go('app.patient_home',{},{location: "replace", reload: false});


						}).catch(function(error){
							console.log('failure data', error);
						});


					}
					else
					{

						window.plugins.toast.showWithOptions({
							message: "Please Enter Rating Comments",
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



					}





				}

		var myDocratedValues={
		ratedBy:window.localStorage.user,
		ratedTo:window.localStorage.consultedDoctor
		// ratedTo:window.localStorage.consultedDoctor
		};

		rateDoctorServices.getDocRatingsByMe(myDocratedValues).then(function(response){
			$rootScope.myDocRating = response;
				$scope.myRating=$rootScope.myDocRating;
				console.log($scope.myRating);
			}).catch(function(error){
				console.log('failure data', error);
		});

		//to fetch the overall Rating o0f a doctor

rateDoctorServices.getDocRatingsByAll($stateParams.calledDoctor).then(function(response){
		// rateDoctorServices.getDocRatingsByAll(window.localStorage.consultedDoctor).then(function(response){
			$rootScope.myDocRating = response;
				$scope.myRating=$rootScope.myDocRating;
				$scope.ratings = [{
	 		        current: $scope.myRating,
	 		        max: 5
	 		    }, ];
				console.log('rating',$scope.myRating);
			}).catch(function(error){
				console.log('failure data', error);
		});

$scope.removeFavorite=function(fav){
	var favoriteDoc={
		ratedBy:window.localStorage.user,
		ratedTo:$stateParams.calledDoctor,
		favorite:2
	};

	rateDoctorServices.addToFavorite(favoriteDoc).then(function(response){
		$scope.added=response;
		console.log(response);
		$state.go($state.current, {}, {reload: true});
					window.plugins.toast.showWithOptions({
					message: "Doctor added to favorites",
					duration: "short", // 2000 ms
					position: "bottom",
					styling: {
					opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
					backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
					textColor: '#ffffff', // Ditto. Default #FFFFFF
					textSize: 13, // Default is approx. 13.
					cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
					horizontalPadding: 10, // iOS default 16, Android default 50
					verticalPadding: 6 // iOS default 12, Android default 30
					}
					});

	}).catch(function(error){
		console.log('failure data', error);
	});

}
$scope.addToFavorite=function(fav){
	$rootScope.favorite=fav;
	console.log($rootScope.favorite);
if($rootScope.favorite == true){
	$rootScope.favorite=1;

	}
	else{
		$rootScope.favorite=2;

	}

	var favoriteDoc={
		ratedBy:window.localStorage.user,
		ratedTo:$stateParams.calledDoctor,
		favorite:$rootScope.favorite
	};

	console.log(favoriteDoc);
$scope.added={};
   // Do whatever you want here
	 rateDoctorServices.addToFavorite(favoriteDoc).then(function(response){
		 $scope.added=response;
		 console.log(response);
		 //console.log($scope.added.favorite);
		 if($rootScope.favorite=== 1){
			 //console.log($scope.added.favorite);

			 window.plugins.toast.showWithOptions({
			 message: "Doctor Added to favorites",
			 duration: "short", // 2000 ms
			 position: "bottom",
			 styling: {
			 opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			 backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
			 textColor: '#ffffff', // Ditto. Default #FFFFFF
			 textSize: 13, // Default is approx. 13.
			 cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			 horizontalPadding: 10, // iOS default 16, Android default 50
			 verticalPadding: 6 // iOS default 12, Android default 30
			 }
			 });
		 }
		 else{


					 window.plugins.toast.showWithOptions({
					 message: "Doctor removed from favorites",
					 duration: "short", // 2000 ms
					 position: "bottom",
					 styling: {
					 opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
					 backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
					 textColor: '#ffffff', // Ditto. Default #FFFFFF
					 textSize: 13, // Default is approx. 13.
					 cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
					 horizontalPadding: 10, // iOS default 16, Android default 50
					 verticalPadding: 6 // iOS default 12, Android default 30
					 }
					 });

		 }
	 }).catch(function(error){
		 console.log('failure data', error);
	 });

}
$scope.ratingArr = [{
    value: 1,
    icon: 'ion-ios-star-outline',
    ratings: 1
  }, {
    value: 2,
    icon: 'ion-ios-star-outline',
    ratings: 2
  }, {
    value: 3,
    icon: 'ion-ios-star-outline',
    ratings: 3
  }, {
    value: 4,
    icon: 'ion-ios-star-outline',
    ratings: 4
  }, {
    value: 5,
    icon: 'ion-ios-star-outline',
    ratings: 5
  }];



})

DoctorQuickApp.controller('editPatientCtrl', function($state, $scope,$stateParams,  $cordovaDatePicker, $rootScope, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage,$filter, LoginService, medicalSpecialityService) {
  $scope.toggle = true;
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.headerTxt="Edit Patient";
  $rootScope.hideSideMenu = true;

  window.localStorage.newPatientVal=0;
  console.log(window.localStorage.newPatientVal);
  $rootScope.dateOfBirth='';
  var ipObj2 = {
      callback: function (val) {  //Mandatory
        $scope.currentDate = new Date();
        console.log($scope.currentDate);
        console.log('Selected To Date : ' + val, new Date(val));

    $rootScope.editPatient.newPatientDOB = $filter('date')(new Date(val),'yyyy-MM-dd');

      },

      from: new Date(1950, 1, 1), //Optional
      to: new Date(2050, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      // disableWeekdays: [0],       //Optional
      closeOnSelect: true,
      dateFormat: 'dd MMMM yyyy',     //Optional
      templateType: 'popup'       //Optional
    };


    var options = {
       date: new Date(),
       mode: 'date', // or 'time'
       // minDate: new Date() - 10000,
       // allowOldDates: true,
       allowFutureDates: false,
       androidTheme : 3,
       cancelButtonLabel: 'CANCEL',
       cancelButtonColor: '#ff0101',
       doneButtonLabel: 'DONE',
       doneButtonColor: '#6aa13e'

     };

  $scope.openDatePickerDOB = function(){

    $cordovaDatePicker.show(options).then(function(date){
      $rootScope.dateOfBirth=date;
            console.log(date);
            $rootScope.editPatient.newPatientDOB =date;

        });


    // ionicDatePicker.openDatePicker(ipObj2);
  };

  $rootScope.editNewPatient=function(newdata){
    console.log(newdata.newPatientDOB);
    console.log(newdata.newPatientFname);
    console.log(newdata.newPatientLname);
    if(!newdata.newPatientFname){
      // alert('lname missed');
      $rootScope.loginDatasubmitted=true;
    }

    else if(!newdata.newPatientLname){
      // alert('lname missed');
      $rootScope.loginDatasubmitted=true;
    }

    else if(!newdata.newPatientDOB){
      alert('fill dob');
    }
    else{
      medicalSpecialityService.editNewPatient(newdata).then(function(response){
         console.log('saved', response);
         if(response){
           window.plugins.toast.showWithOptions({
             message: "Patient updated successfully",
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
         }
         // $state.go("app.subPatientList");
         $rootScope.newPatient={};
      }).catch(function(error){
          console.log('failure data', error);
      });
    }

  }

})

DoctorQuickApp.controller('inviteresultCtrl', function($scope,$state,$rootScope,$stateParams,$ionicPlatform,  $cordovaContacts ,$localStorage,$ionicLoading,$ionicPopup,invitereviews,invitereviewsresultservice,IonicClosePopupService){

  $scope.toggle = true;
  $rootScope.headerTxt="Invite Reviews";
  $rootScope.showBackBtn=true;
  $rootScope.showNotification=false;
  $rootScope.showBadge=false;
  // $rootScope.hideSideMenu = true;
  $rootScope.inviteButton = false;

  $scope.count = $stateParams.countofselected;
  $scope.cc ={};
  $scope.contacts = {};

  invitereviews.generateTinyUrl(window.localStorage.user).then(function(response){
    $rootScope.docTinyUrl=response;
    window.localStorage.docTinyUrl=$rootScope.docTinyUrl;
  }).catch(function(error){
  console.log('failure data', error);
  });
console.log(window.localStorage.docTinyUrl);

var permissions = cordova.plugins.permissions;
permissions.requestPermission(permissions.READ_CONTACTS, success, error);
function error() {
console.warn('Turned on the permission');
}

function success( status ) {
if( !status.hasPermission ) error();
}

  $scope.query = "Hi,\nPlease visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients. Thanks.\nClick here: ";
  $scope.tiny=window.localStorage.docTinyUrl;

$scope.query =$scope.query+$scope.tiny;
console.log($scope.query);
// $scope.query=$scope.query window.localStorage.docTinyUrl;
  $scope.showAlert= function(){

    var options = {
      message: $scope.query, // not supported on some apps (Facebook, Instagram)
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    var onSuccess = function(result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }

    var onError = function(msg){
      console.log("Sharing failed with message: " + msg);
    }

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

  }
$scope.Savedata = function()
{

  var confirmPopup = $ionicPopup.show({
         template: '<center>You can send Review invites<br>through DoctorQuick or you<br>can use your own device apps.</center> ',
         cssClass: 'inviteReviewPopup',
         scope: $scope,
         buttons: [
           {
             text: 'DoctorQuick',
             type: 'button-positive',
             onTap: function(e) {
                    $rootScope.hideSideMenu = false;

                    $ionicLoading.show({
                       template: '<ion-spinner></ion-spinner><br><p>Fetching your contacts</p>'
                   });
                   var options = {};
                   options.multiple = true;
                   options.hasPhoneNumber = true;
                   options.fields = ['name.formatted', 'phoneNumbers'];
                   $cordovaContacts.find(options).then(function(result) {
                       $scope.contacts = result;

                       var contactsWithAtLeastOnePhoneNumber = _.filter(result, function(contact){
                           return contact.phoneNumbers.length > 0
                       });

                       //
                       // Contacts with at least one phone number...
                       $scope.deviceContacts=contactsWithAtLeastOnePhoneNumber;
                       // $scope.deviceContacts='ravikiran';
                       console.log( $scope.deviceContacts);
                       console.log(contactsWithAtLeastOnePhoneNumber);
                       invitereviews.invitereviewpatient(contactsWithAtLeastOnePhoneNumber);
                       $state.go("templates.invite_reviews");
                       // $ionicLoading.hide();

                   }, function(error) {
                       console.log("ERROR: " + error);
                   });
             }
           },
           {
             text: 'Other Apps',
             type: 'button-positive',
             onTap: function(e) {
               var options = {
                 message: $scope.query, // not supported on some apps (Facebook, Instagram)
                 // subject: 'the subject', // fi. for email
                 // files: ['', ''], // an array of filenames either locally or remotely
                 // url: 'https://www.website.com/foo/#bar?a=b',
                 chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
               }

               var onSuccess = function(result) {
                 console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                 console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
               }

               var onError = function(msg){
                 console.log("Sharing failed with message: " + msg);
               }

               window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
             }
           },

         ]
       });

       IonicClosePopupService.register(confirmPopup);

}


$scope.Cleardata = function()
{
  $scope.cc.query = "";
}




});

DoctorQuickApp.controller('ionicRatings', ['$scope', function($scope) {

      $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: 'rgb(200, 200, 100)',  //Optional
        iconOffColor:  'rgb(200, 100, 100)',    //Optional
        rating:  2, //Optional
        minRating:0,    //Optional
        readOnly: true, //Optional
        callback: function(rating) {    //Mandatory
          $scope.ratingsCallback(rating);
        }
      };

      $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
      };

}])


DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, $interval, $window, $timeout, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.hideSideMenu = true;
    $rootScope.showBadge=false;

    


});

DoctorQuickApp.controller('myDoctorCtrl', function($scope,$rootScope,$ionicConfig, $http, $window,$timeout, $interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices) {

	$rootScope.headerTxt="My Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			showBackdrop:true

			// hideOnStageChange: true
	});
	$scope.myConsultedDoctors = angular.fromJson($window.localStorage['myDoctors']);

 var username = "greet+"+window.localStorage.user;
 var password = "DQ_patient";

	$scope.getDocRatingsAll = function(doctorPhone) {
			// alert("Loaded!");
			console.log(doctorPhone);
			rateDoctorServices.getDocRatingsByAll(doctorPhone).then(function(response){
				$scope.docRating=response;
				console.log($scope.docRating);
				$ionicLoading.hide();
				$scope.$watch('docRating', function() {
			 // do something here
	 }, true);
			}).catch(function(error){
			console.log('failure data', error);
			});
			$scope.ratings = [{
						current: $scope.docRating,
						max: 5
				}, ];

	};
		$ionicLoading.show({
		    template: '<ion-spinner></ion-spinner>',
				showBackdrop:true

		    // hideOnStageChange: true
		});

  doctorServices.myDoctorsFetched(window.localStorage.user).then(function(response){
		// alert('list');
		$ionicLoading.show({
		    template: '<ion-spinner></ion-spinner>',
				showBackdrop:true
		    // hideOnStageChange: true
		});
		window.localStorage['myDoctors'] = angular.toJson(response);
		$scope.myConsultedDoctors = angular.fromJson($window.localStorage['myDoctors']);

    // $scope.myConsultedDoctors=response;
		if($scope.myConsultedDoctors){
			$ionicLoading.hide();
		}
		console.log($scope.myConsultedDoctors);
		$scope.getStars = function(rating) {
			// Get the value
			var val = parseFloat(rating);
			// Turn value into number/100
			var size = val/5*100;
			return size + '%';
		  // Get the value
		  var val = parseFloat(rating);
		  // Turn value into number/100
		  var size = val/5*100;
		  return size + '%';
		}
  }).catch(function(error){
  console.log('failure data', error);
  });

$scope.delItem=function(removeFav){
	$ionicLoading.show({
		template:'<ion-spinner></ion-spinner>'
	});
	console.log(removeFav);
	var docToRemove={
		docPhone:removeFav,
		patientPhone:window.localStorage.user
	}
	console.log(docToRemove);
	doctorServices.removeFavDoctor(docToRemove).then(function(response){
		console.log(response);
		if(response === 'deleted'){
			$ionicLoading.hide();
			$state.reload();
		}
	}).catch(function(error){
	console.log('failure data', error);
	});
}

	$scope.viewDocProfile=function(docPhone,rates,total){
		$ionicLoading.show({
			template:'<ion-spinner>,ion-spinner>'
		})
		window.localStorage.docPhone=docPhone
		$rootScope.ratesForDoc=rates
		$rootScope.totalRate=total

		doctorServices.myDoctorsDetails(window.localStorage.docPhone).then(function(response){
			if(response){
				$ionicLoading.hide();
				$scope.myDocDetails1=response;
				window.localStorage['myDocDetails1'] = angular.toJson(response);
				$state.go('app.viewdoctor_profile', {rates: $rootScope.ratesForDoc,totalRates: $rootScope.totalRate})

			}

		console.log('doc',$scope.myDocDetails1);

		}).catch(function(error){
		console.log('failure data', error);
		});


		// $state.go('app.viewdoctor_profile');


	}


})

DoctorQuickApp.controller('myconsultationsCtrl', function($state,$ionicHistory,$scope,$window, $rootScope, $ionicPlatform,$localStorage, $ionicLoading, $ionicConfig, $http,$interval, LoginService, patientCareService, doctorServices,myConsultationService,Factory) {

	$rootScope.headerTxt="My Consultations";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$rootScope.inviteButton = false;


	$scope.names = {};
	$scope.listofnames = [];
	$scope.fromusername = [];
	$scope.listofphones = [];
// for doctors consultationDetails
// console.log('consultations');

var username = "greet+"+window.localStorage.user;
// console.log('MY CONSULTATION CALLED');
if(window.localStorage.doctororpatient == 'doctor'){
	var password = "DQ_doctor";

}
else{
	var password = "DQ_patient";
}

$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			showBackdrop:true
			// duration:3000
		});

if(window.localStorage.doctororpatient === "patient"){ //to list out the consulted patient/doctors
	$rootScope.ConsultedDoctor = angular.fromJson($window.localStorage['ConsultedDoctor']);

	myConsultationService.myConsultedDoctors(window.localStorage.user).then(function(response){
	$rootScope.ConsultedDoctor=response;//store the response array in doctor details
	window.localStorage['ConsultedDoctor'] = angular.toJson(response);
	$rootScope.ConsultedDoctor = angular.fromJson($window.localStorage['ConsultedDoctor']);
	console.log($rootScope.ConsultedDoctor);

	if($rootScope.ConsultedDoctor){
		$ionicLoading.hide();

		var data = response;
		for(var i=0; i<data.length; i++){
		$rootScope.doctorFname=data[i].doctorFname;
		$rootScope.doctorLname=data[i].doctorLname;
		$rootScope.doctorMname=data[i].doctorMname;
		$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
		}
	}

	}).catch(function(error){
	// console.log('failure data', error);
	});
}
else{
	myConsultationService.myConsultedPatients(window.localStorage.user).then(function(response){
	$scope.myPatients=response;//store the response array in doctor details
	console.log($scope.myPatients);
	if($scope.myPatients){
		$ionicLoading.hide();

		var data = $scope.myPatients;
		for(var i=0; i<data.length; i++){
		$scope.patientFname=data[i].patientFname;
		$scope.patientLname=data[i].patientLname;
		$scope.patientPhone=data[i].patientPhone;
		$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
		$scope.listofnames.push($scope.fullname);
		$scope.listofphones.push(data[i].patientPhone);
		//console.log(window.localStorage.user);
		}
	}

	}).catch(function(error){
	console.log('failure data', error);
	});
}

$rootScope.checkNewMessages = $interval(function(){
	// console.log('refreshing consultation list for new messages');

		var success = function(message)
		{
				// console.log(message.length);
				if($scope.deviceAndroid)
				{
						if(window.localStorage.doctororpatient == 'patient')
						{
								//var password = "DQ_doctor";
								$scope.chatlist1 = message;
								// console.log(message);
								var forandroidchatlist = {};
								forandroidchatlist = $scope.chatlist1;
								var dataofandroid = JSON.parse(forandroidchatlist);
								dataofandroid.chatTo=window.localStorage.user;
								doctorServices.createChatHistory(dataofandroid).then(function(response){
								$scope.chatHistory=response;//store the response array in doctor details
							//  console.log('dataSent :',response);
								}).catch(function(error){
								console.log('failure data', error);
								});


								myConsultationService.myConsultedDoctors(window.localStorage.user).then(function(response){
								$rootScope.ConsultedDoctor=response;//store the response array in doctor details
								// console.log($rootScope.ConsultedDoctor);
								var data = response;
								// console.log(response);
								for(var i=0; i<data.length; i++){
								$rootScope.doctorFname=data[i].doctorFname;
								$rootScope.doctorLname=data[i].doctorLname;
								$rootScope.doctorMname=data[i].doctorMname;
								$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
								}
								$ionicLoading.hide();
								}).catch(function(error){
								console.log('failure data', error);
								});

						}
						else
						{

								$scope.chatlist1 = message;
								// console.log(message);
								var forandroidchatlist = {};
								forandroidchatlist = $scope.chatlist1;
								var dataofandroid = JSON.parse(forandroidchatlist);
								dataofandroid.chatTo=window.localStorage.user;
								doctorServices.createChatHistoryforDoctor(dataofandroid).then(function(response){
								$scope.chatHistory=response;//store the response array in doctor details
								//  console.log('dataSent :',response);
								}).catch(function(error){
								console.log('failure data', error);
								});

								myConsultationService.myConsultedPatients(window.localStorage.user).then(function(response){
								$scope.myPatients=response;//store the response array in doctor details
								// console.log($scope.myPatients);
								var data = $scope.myPatients;
								for(var i=0; i<data.length; i++){
								$scope.patientFname=data[i].patientFname;
								$scope.patientLname=data[i].patientLname;
								$scope.patientPhone=data[i].patientPhone;
								$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
								$scope.listofnames.push($scope.fullname);
								$scope.listofphones.push(data[i].patientPhone);
								//console.log(window.localStorage.user);
								}
								}).catch(function(error){
								console.log('failure data', error);
								});

						}

				}
				else
				{

				// console.log('this is ios chat histroy');


				if(window.localStorage.doctororpatient == 'patient')
				{
						// console.log('this is patient');

						$scope.ios = message;
						// console.log($scope.ios);
						$scope.ios = message;
						var forioschatlist = {};
						forioschatlist = $scope.ios;
						var res = forioschatlist.slice(1,-1);
						var dataForIos = JSON.parse(forioschatlist);

						doctorServices.createChatHistoryIos(dataForIos).then(function(response){
						$scope.chatHistoryios=response;//store the response array in doctor details
						// console.log('dataSent :',$scope.chatHistoryios);
						}).catch(function(error){
						console.log('failure data', error);
						});

						myConsultationService.myConsultedDoctors(window.localStorage.user).then(function(response){
						$rootScope.ConsultedDoctor=response;//store the response array in doctor details
						var data = response;
						$ionicLoading.hide();
						for(var i=0; i<data.length; i++){
						$rootScope.doctorFname=data[i].doctorFname;
						$rootScope.doctorLname=data[i].doctorLname;
						$rootScope.doctorMname=data[i].doctorMname;
						$rootScope.fullname = $rootScope.doctorFname+" "+$rootScope.doctorLname;
						}

						}).catch(function(error){
						console.log('failure data', error);
						});

				}
				else {

							$scope.ios = message;
							var forioschatlist = {};
							forioschatlist = $scope.ios;
							var res = forioschatlist.slice(1,-1);
							var dataForIos = JSON.parse(forioschatlist);

							// console.log(dataForIos);
							doctorServices.createChatHistoryIosforDoctor(dataForIos).then(function(response){
							$scope.chatHistoryios=response;//store the response array in doctor details
							// console.log('dataSent :',$scope.chatHistoryios);
							}).catch(function(error){
							console.log('failure data', error);
							});

							myConsultationService.myConsultedPatients(window.localStorage.user).then(function(response){
							$scope.myPatients=response;//store the response array in doctor details
							// console.log($scope.myPatients);
							var data = $scope.myPatients;
							for(var i=0; i<data.length; i++){
							$scope.patientFname=data[i].patientFname;
							$scope.patientLname=data[i].patientLname;
							$scope.patientPhone=data[i].patientPhone;
							$scope.fullname = $scope.patientFname+" "+$scope.patientLname;
							$scope.listofnames.push($scope.fullname);
							$scope.listofphones.push(data[i].patientPhone);
							//console.log(window.localStorage.user);
							}
							$ionicLoading.hide();
							}).catch(function(error){
							console.log('failure data', error);
							});

				}

				}

		}


		var failure = function()
		{
		 alert("Error calling Hello Plugin");
		}

		hello.chatcounts(username,password,success, failure);
}, 1000);

$scope.pagedecision=$ionicHistory.currentStateName();
var username = "greet+"+window.localStorage.user;

if($scope.pagedecision === 'templates.consulted_patient')
		{
				var password = "DQ_doctor";
				// console.log(password);
		}
		else {
			var password = "DQ_patient";
		}

$scope.deviceAndroid = ionic.Platform.isAndroid();

$scope.consultationDetails=function(consultedDoc)
{

			var username = "greet+"+window.localStorage.user;
			var password = "DQ_patient";
		 	var persontocall = "greet+" + consultedDoc;
			console.log(persontocall);

		var success = function(message)
		{
			console.log(message);
		}
		var failure = function()
		{
			console.log("Error calling Hello Plugin");
		}

 hello.chat(username,password,persontocall,success, failure);

}
$scope.clicktochat = function(pateientPhone)
{
		console.log(pateientPhone);
		$rootScope.deviceIOS = ionic.Platform.isIOS();


		if($scope.deviceIOS === true){
			console.log('iosPlatform');
			window.localStorage.sendPrescTo=pateientPhone;
			console.log('tosend prescription',window.localStorage.sendPrescTo);
		}

		$scope.patientToChat=pateientPhone;
		var username = "greet+"+window.localStorage.user;
		var password = "DQ_doctor";
	 	var persontocall = "greet+" + $scope.patientToChat;
		var success = function(message)
		{
			console.log(message);
		}

		var failure = function()
		{
			console.log('error');

		}
		hello.chat(username,password,persontocall,success, failure);


}
console.log($state.$current.name);
console.log($rootScope.previousState.name);

$scope.$on('$destroy', function(){
	console.log('destroyed');
   $interval.cancel($rootScope.checkNewMessages);

});

});


DoctorQuickApp.controller('patientCareCtrl', function($scope,$state, $rootScope,$cordovaNetwork, $timeout, $localStorage, $cordovaToast, $ionicLoading, $ionicPopup,$ionicConfig, $http, patientCareService) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.cc={};

	$scope.submitted = false;
	$scope.sendQuery=function(isQueryValid){
		console.log(isQueryValid);
		$scope.submitted = true;
		// console.log($scope.submitted);
		$ionicLoading.show();
		if(!$rootScope.cc.query){
			console.log($rootScope.cc.query);
			// $scope.queryPopup =$ionicPopup.show({
	    //  template: 'Please Enter your query',
			//  cssClass: 'dqAlerts',
			//  scope: $scope,
			//  	});
			$ionicLoading.hide();
			window.plugins.toast.showWithOptions({
			message: "Please Enter your query",
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
		}
		else{
			var patientQuery={
	      patientPhone:window.localStorage.user,
	      query:$rootScope.cc.query
	    }
	    patientCareService.submitQuery(patientQuery).then(function(response,status){
				console.log(response);
				$ionicLoading.hide();
	        $rootScope.cc.query="";
					var confirmPopup = $ionicPopup.confirm({
									template: '<center>Someone will contact you from DoctorQuick</center>',
									cssClass: 'videoPopup',
									scope: $scope,
									buttons: [
										{
											text: 'OK',
											type: 'button-positive',
											onTap: function(e) {
											console.log('offline');
											$state.go("app.patient_home")
											}
										},
									]
								});
				// window.plugins.toast.showWithOptions({
        // message: "Your query has been submitted.",
        // duration: "short", // 2000 ms
        // position: "bottom",
        // styling: {
        // opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        // backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
        // textColor: '#ffffff', // Ditto. Default #FFFFFF
        // textSize: 13, // Default is approx. 13.
        // cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
        // horizontalPadding: 16, // iOS default 16, Android default 50
        // verticalPadding: 12 // iOS default 12, Android default 30
        // }
        // });


			}).catch(function(error){
					console.log(error);
					//
					// if(error){
					// 	alert('error ');
					// }
	      console.log('failure data', error);

	    });
		}

	};

  $scope.requestCallback=function(){
    console.log('callback');

		patientCareService.submitCallBack(window.localStorage.user).then(function(response){
			console.log('check network connection here');
			console.log(response );
			if(response === 'Query Submitted'){
				$ionicLoading.show();

				$timeout(function () {
					console.log('timeout');
					$ionicLoading.hide();
					var confirmPopup = $ionicPopup.confirm({
									template: '<center>Someone will contact you from DoctorQuick</center>',
									cssClass: 'videoPopup',
									scope: $scope,
									buttons: [
										{
											text: 'OK',
											type: 'button-positive',
											onTap: function(e) {
											console.log('offline');
											$state.go("app.patient_home")
											}
										},
									]
								});
					// window.plugins.toast.showWithOptions({
					// message: "Someone will contact you from DoctorQuick.",
					// duration: "short", // 2000 ms
					// position: "bottom",
					// styling: {
					// opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
					// backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
					// textColor: '#ffffff', // Ditto. Default #FFFFFF
					// textSize: 13, // Default is approx. 13.
					// cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
					// horizontalPadding: 16, // iOS default 16, Android default 50
					// verticalPadding: 12 // iOS default 12, Android default 30
					// }
					// });
				}, 2000);

			}
			else{
				alert('check ur this thing');
			}
			$rootScope.cc.query="";
		}).catch(function(error){
		console.log('failure data', error);
		});

  };
})

// $ionicLoading.show({
//   duration: 60000,
//   noBackdrop: true,
//   template: '<i circular-progress class="ion-android-call" style="position: absolute;margin: 30px 0 0 36px; font-size: 19vw;"></i><circular-progress value="100" max="100" orientation="1" radius="50" stroke="10" base-color="#e2e2e2"  progress-color="#00745f" iterations="700" animation="easeInOutCubic" ></circular-progress>'
// });


DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope,$interval,$window, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, HardwareBackButtonManager,doctoronoffdetails,doctorServices,patientProfileDetailsService,myConsultationService,patientWalletServices,pingService) {

			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;
			$rootScope.hideSideMenu = true;



			window.localStorage.selectedSubPatient=0;
			HardwareBackButtonManager.disable();
			$ionicConfig.views.swipeBackEnabled(false);

			$scope.currentState=$ionicHistory.currentStateName();

			$ionicConfig.views.swipeBackEnabled(false);

			console.log($scope.currentState);
			$rootScope.goToConsultation = function ()
	    {
	      $state.go("app.my_consultations");
	    }
			$scope.medicalSpeciality = function(){
				$state.go('app.medical_speciality');
				$ionicLoading.hide();
			}

			// $window.location.reload();

			$scope.searchDoctors=function()
			{
					console.log('search clicked');
					$state.go('app.searchDoctors');

			}


			$timeout( function(){
	        console.log('interval started');
					console.log($localStorage.showConnecting);

	        if($localStorage.showConnecting === true){

						$timeout( function(){
						$rootScope.connectingMessage = 'Internet connection appears very slow'
					}, 60000 );
						$rootScope.connectingMessage = 'Connecting to DoctorQuick'
	          $ionicLoading.show({
	            template: '<ion-spinner></ion-spinner><br><br>{{connectingMessage}}',
							// duration:3000,
							noBackdrop: true
	          });

						// if(window.localStorage.networkType != 'None' || window.localStorage.networkType != 'Unknown' || window.localStorage.networkType != 'Ethernet'){
							$interval(availableInVsee,2000,1);
							patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
							 $rootScope.patientWalletdetails=response;
							 if(response){
								 window.localStorage['patientWalletdetails'] = angular.toJson(response);
							 }

							 console.log($rootScope.patientWalletdetails);
							 }).catch(function(error){
								 console.log('failure data', error);
							 });
						// }

							// $timeout(function(){
							// $ionicLoading.hide();
							// 	alert('no network');
							// },10000);

	        }
					// else{
					// 		alert('NOINTERNET')
					// }




	    }, 0 );

			function availableInVsee() {
				console.log('login check');
							var uname1 = "greet+"+window.localStorage.user;
							var pw1 = "DQ_patient";

							console.log(uname1);
							var success = function(message)
							{
							console.log(message);
							$interval(checkNewMessages,2000);

							$ionicLoading.hide().then(function(){
							console.log("The loading indicator is now hidden");
							// alert('loggedin');
							$localStorage.showConnecting = false;
							$ionicHistory.nextViewOptions({
									disableBack: true,
									disableAnimate: true,
									historyRoot: true
							});
							$ionicHistory.clearCache();
							$ionicHistory.clearHistory();
							$state.go($state.current, {}, {location: "replace",reload: false});

							});
							// alert(message);
							}
							var failure = function()
							{
								alert("Error calling Hello Plugin");
							}

							hello.login(uname1,pw1,success, failure);
			}

			function checkNewMessages()
			{
				var uname1 = "greet+"+window.localStorage.user;
				var pw1 = "DQ_patient";

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
					hello.unreadchatfromusers(uname1,pw1,success, failure);
			}

				function startPinging()
				{
					// console.log('start piniging');
					pingService.pingToServer().then(function(response){
							// console.log( response);
					 }).catch(function(error){
							 console.log('failure data', error);
					 });
				}

				$rootScope.unreadchatforpatient = 0;

				$scope.statename = $ionicHistory.currentStateName();
				$scope.iphone=window.localStorage.iosLogin;

				$scope.deviceAndroid = ionic.Platform.isAndroid();
				// console.log();
				if($scope.deviceAndroid === false){
					window.localStorage.iphoneLogin=0;
				}


				doctorServices.myDoctorsFetched(window.localStorage.user).then(function(response){
					// alert('list');
					$scope.myConsultedDoctors=response;
					window.localStorage['myDoctors'] = angular.toJson(response);

				}).catch(function(error){
				console.log('failure data', error);
				});


				patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
					window.localStorage['patientDetails'] = angular.toJson(response);
				}).catch(function(error){
				console.log('failure data', error);
				})

				patientProfileDetailsService.fetchPatientImage(window.localStorage.user).then(function(response){
					console.log(response);
					window.localStorage['patientProfileImage'] = angular.toJson(response);
				}).catch(function(error){
				console.log('failure data', error);
				})

				// myConsultationService.myConsultedDoctors(window.localStorage.user).then(function(response){
				// 	console.log(response);
				// window.localStorage['ConsultedDoctor'] = angular.toJson(response);
				// }).catch(function(error){
				// // console.log('failure data', error);
				// });

				myConsultationService.firstConsultation(window.localStorage.user).then(function(response){
					console.log(response);
				if(response === 'DONE'){
						$rootScope.firstConsultationDone = false;
				}
				else{
					$rootScope.firstConsultationDone = true;
					// window.localStorage['ConsultedDoctor'] = angular.toJson(response);
				}

				}).catch(function(error){
				// console.log('failure data', error);
				});


				///////////get all specialities///////////
				doctorServices.myDoctorsFetched(window.localStorage.user).then(function(response){
					// alert('list');
					$scope.myConsultedDoctors=response;
					window.localStorage['myDoctors'] = angular.toJson(response);

				}).catch(function(error){
				console.log('failure data', error);
				});


				 medicalSpecialityService.getMedicalSpecialist().then(function(response){
						 console.log('successfull data', response);
						 $scope.specialitiesList = response;
						 window.localStorage['specialitiesList'] = angular.toJson(response);
					}).catch(function(error){
							console.log('failure data', error);
					});

					medicalSpecialityService.getMedicalSpecialist().then(function(response){
				 		 console.log('successfull data', response);
				 		 $scope.specialitiesList1 = response;
				 		 window.localStorage['specialitiesList1'] = angular.toJson(response);
				 	}).catch(function(error){
				 			console.log('failure data', error);
				 	});



});

DoctorQuickApp.controller('patientRefundCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$ionicPopup, $stateParams, $cordovaToast, $http,patientWalletServices) {
	$rootScope.headerTxt="Refund ";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

	$rootScope.credit = $stateParams.credit;
	$rootScope.debit = $stateParams.debit;
	$scope.payment={};
	$rootScope.balanceAmt=$rootScope.credit-$rootScope.debit;

console.log('refundCtrl');

patientWalletServices.paidToDoctors(window.localStorage.user).then(function(response){
 $rootScope.doctorsList=response;
 console.log($rootScope.doctorsList);
 }).catch(function(error){
	 console.log('failure data', error);
 });

if($rootScope.debit===''){
	console.log('null');
}
console.log($rootScope.debit);
	$scope.refundReq = function(isDocTopUpValid) {
		console.log('isDocTopUpValid ', isDocTopUpValid)
		$scope.submitted = true;

		if(!$scope.payment.refund){


						window.plugins.toast.showWithOptions({
						message: "Amount must be entered",
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
		else if ($scope.payment.refund>$rootScope.balanceAmt) {


			window.plugins.toast.showWithOptions({
			message: "Amount more than available balance",
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
						// $cordovaToast.showLongCenter('Amount more than available balance.', 'short', 'center').then(function(success) {
						// // success
						// }, function (error) {
						// // error
						// });

		}
		else{
			var refundDetails ={
				reqBy:window.localStorage.user,
				reqAmount:$scope.payment.refund
			}


			//refund code should be here
			patientWalletServices.refundRequest(refundDetails).then(function(response){
			 $rootScope.refundRequested=response;
			 if($rootScope.refundRequested){
				 var confirmPopup = $ionicPopup.confirm({
	 				// title: 'Refund',
	 				template: 'Your request for refund is processed and it will be credited to your account within 7 business days',
	 				cssClass: 'videoPopup',
	 				scope: $scope,
	 				buttons: [

	 					{
	 						text: 'OK',
	 						type: 'button-positive',
	 						onTap: function(e) {
	 						console.log('OK');

	 						}
	 					},
	 				]
	 			});
			 }
			 console.log($rootScope.refundRequested);
			 }).catch(function(error){
				 console.log('failure data', error);
			 });



			// var confirmPopup = $ionicPopup.confirm({
			//  // title: '<h4>Thank You</h4>',
			// 	template: 'Your request for refund is processed and it will be added to your account number within 7 business days..'
			// });
		}



	   };

})

DoctorQuickApp.controller('patientTopupCtrl', function($scope,$rootScope,$state,$localStorage, $location, $ionicConfig,$cordovaInAppBrowser, $http, $cordovaToast, patientWalletServices, RazorPayService ,patientProfileDetailsService,BASE_URL, API) {

	$rootScope.headerTxt="Topup";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	$scope.paymentid= "";

	// if (StatusBar.isVisible) {
	//     // do something
	// 		alert('statusbar shown');
	// }

	$scope.validateTopup=function(isDocTopUpValid){
	  console.log('isDocTopUpValid ', isDocTopUpValid);
	  console.log('clicked');

	  $scope.topUp = true;
	  if(isDocTopUpValid) {
	    // console.log('isDocFormValid ', isDocFormValid)

								$scope.payment.topUpAmt=($scope.payment.topUp*100);
								console.log($scope.payment.topUp);
							 if($scope.payment.topUp < 270){//250
								 window.plugins.toast.showWithOptions({
								 message: "Amount must be ₹270 or higher",
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
									var options = {
											description: 'GET WELL SOONER',
											currency: 'INR',
											// key: 'rzp_test_JTodx06v7mHqbr',//change this key to live account key rzp_live_gTFcR9lOEpUn71 // rzp_test_JTodx06v7mHqbr
											key: 'rzp_live_gTFcR9lOEpUn71',//change this key to live account key rzp_live_gTFcR9lOEpUn71 // rzp_test_JTodx06v7mHqbr
											amount:$scope.payment.topUpAmt ,
											name: 'DoctorQuick',
											method:{
												wallet:true,
												upi:true
											},
											prefill:{
												email: $scope.patientEmail,
												contact: window.localStorage.user,
												name: $scope.patientFname
											},

									}
									RazorPayService.topUpOptions(options);


									var successCallback = function(payment_id) {
									console.log('payment_id: ' + payment_id)

									$scope.paymentid = payment_id;
										RazorPayService.topUp($scope.paymentid).then(function(response){
									   $rootScope.patientWalletUpdate=response;
										 console.log($rootScope.patientWalletUpdate);
										 if($rootScope.patientWalletUpdate === 'TransactionSuccessful'){

											 // console.log('TransactionSuccessful');
											 var confirmPopup = $ionicPopup.confirm({
							 					// title: 'DoctorQuick',
							 					template: '<center>Successfully added the amount to you DoctorQuick Deposit</center>',
							 					// template: 'An email confirmation link to your email address has been sent. Click the link in that email to complete registering your email. Make sure to check your spam box in case it got filtered. ',
							 					cssClass: 'videoPopup',
							 					scope: $scope,
							 					buttons: [
							 						{
							 							text: 'OK',
							 							type: 'button-assertive',
							 							onTap: function(e) {
							 							console.log('offline');
							 							// $state.go("templates.doctor_home");
														// $window.location.reload(true);
														$state.reload();

							 							}
							 						},
							 					]
							 				});

											  // $state.go('app.patient_topup');

												// $state.go("app.patient_payments", $stateParams, {reload: true, inherit: false});
												// 	this.navCtrl.push("patient_payments",{
												// 		status: this.status
												// 	});
										 }
										 if($rootScope.patientWalletUpdate ==='ERROR'){
											  alert('Error While Initiating Payment');
										 }
										 $scope.payment.topUpAmt="";
										 // $state.reload()
										// $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
									 console.log($rootScope.patientWalletUpdate);
									   }).catch(function(error){
									     console.log('failure data', error);
									   });
									}

									var cancelCallback = function(error) {
									console.log(error.description + ' (Error '+error.code+')')
										window.plugins.toast.showWithOptions({
										message: "Transaction cancelled",
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
										// $window.location.reload(true);
									}

									RazorpayCheckout.open(options, successCallback, cancelCallback);



								}
	  }
		else{
			window.plugins.toast.showWithOptions({
			message: "Amount must be ₹270 or higher",
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
			// $cordovaToast.showLongCenter('amount must be ₹250 or higher.', 'short', 'center').then(function(success) {
			// // success
			// }, function (error) {
			// // error
			// });
		}
	}


  $scope.payment={};

	patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
   $rootScope.patientWalletdetails=response;
   console.log($rootScope.patientWalletdetails);
   }).catch(function(error){
     console.log('failure data', error);
   });

//RAZORPAY DETAILS

//key id:rzp_test_mzUbTyUmUd2dyE
//Key secret :Ocof0Yf9Ms36q8Pq7EtE2zUd
// https://rzp_test_mzUbTyUmUd2dyE:Ocof0Yf9Ms36q8Pq7EtE2zUd@api.razorpay.com/v1/payments

$scope.patient_details=[];
	 patientProfileDetailsService.fetchPatient(window.localStorage.user).then(function(response){
		$scope.patient_details=response;
		console.log($scope.patient_details);
		var data=$scope.patient_details//take all json data into this variable
		 var totList=[];
				for(var i=0; i<data.length; i++){

						$scope.patientFname=data[i].patientFname,
						$scope.patientEmail=data[i].patientEmail,

				console.log($scope.patientFname);
				console.log($scope.patientEmail);

				}

 }).catch(function(error){
 console.log('failure data', error);
 })

 patientWalletServices.paidToDoctors(window.localStorage.user).then(function(response){
	$rootScope.doctorsList=response;
	console.log($rootScope.doctorsList);
	}).catch(function(error){
		console.log('failure data', error);
	});
})

DoctorQuickApp.controller('patientpaymentCtrl', function($scope, $ionicConfig, $rootScope, $localStorage,$ionicPopup,$ionicLoading,  $window, $ionicSideMenuDelegate, LoginService, patientWalletServices) {

console.log(window.localStorage.user);
  $rootScope.headerTxt="Payments";
  $rootScope.showBackBtn=true;
  $rootScope.checkedValue = false;
  $rootScope.showNotification=false;
  $rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

$ionicLoading.show({
  template:'<ion-spinner></ion-spinner>',
  showBackdrop:true
})

$scope.patientWalletdetails = angular.fromJson($window.localStorage['patientWalletdetails']);


  patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
    console.log(response);
   // $rootScope.patientWalletdetails=response;
   if(response){
     window.localStorage['patientWalletdetails'] = angular.toJson(response);
     $scope.patientWalletdetails = angular.fromJson($window.localStorage['patientWalletdetails']);
     $ionicLoading.hide();
   }

   console.log($rootScope.patientWalletdetails);
   }).catch(function(error){
     console.log('failure data', error);
   });

   patientWalletServices.claimFreeConsultation(window.localStorage.user).then(function(response){
    $rootScope.freeDetails=response;
    if($rootScope.freeDetails == "Claimed"){
      var confirmPopup = $ionicPopup.confirm({
        template: '<center>Free consultation for this device <br>has been already claimed with another phone number.<br>A deposit is required to continue with consultations.<br>Contact Customer Care for Help.</center>',
        cssClass: 'videoPopup',
        scope: $scope,
        buttons: [
        {
          text: 'OK',
          type: 'button-positive',
          onTap: function(e) {
          console.log('ok');
          }
        },
        ]
      });
    }
    console.log($rootScope.freeDetails);
    }).catch(function(error){
      console.log('failure data', error);
    });

   patientWalletServices.paidToDoctors(window.localStorage.user).then(function(response){
    $rootScope.doctorsList=response;
    console.log($rootScope.doctorsList);
    }).catch(function(error){
      console.log('failure data', error);
    });

   $scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);

})

DoctorQuickApp.controller('searchDoctorsController', function($scope,$window,$interval,$ionicHistory, $ionicConfig,$timeout, $state,$rootScope, $ionicSideMenuDelegate,$localStorage, $ionicLoading, $ionicPopup, searchDoctorServices,doctorServices, searchbyspecialities,callacceptedbydoctor,$ionicHistory,medicalSpecialityService) {

	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	console.log('Search controller called');

	$ionicSideMenuDelegate.canDragContent(false); //preventes sidemenu sliding


	console.log(window.screen.width);
	console.log(window.screen.height);



	$scope.audioCall=function(num)
	{
		console.log('user:',window.localStorage.user);
		$rootScope.docNumToCall=num;
	  $ionicLoading.show();
	  doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
	    // console.log(response[0][0]);
			$rootScope.patientWalletdetails=response;
			$rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
			$rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

			$rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;
	    if($rootScope.myWalletBal >= 270)
	    {
	      hello.audiocallvsee(uname,pw,persontocall,success, failure);
	      var confirmPopup = $ionicPopup.confirm({
	        template: '<b>Request for Voice call has been sent <br><center>00:02</center></b>',
	        cssClass: 'videoPopup',
	        scope: $scope,
	        buttons: [
	           { text: 'Cancel',
	             type: 'button-royal', },

	           {
	           text: 'Resend',
	           type: 'button-positive',

	           },
	         ]
	        //templateUrl: "views/app/viewdoctor_profile.html",
	      });
	    }
	    else
	    {
	      var confirmPopup = $ionicPopup.confirm({
					title: 'DoctorQuick',
 				 template: '<center><b>Your request could not be processed as your<br>DoctorQuick deposit is less than ₹270.</b></center> ',
 				 cssClass: 'videoPopup',
 				 scope: $scope,
 				 buttons: [
 					 {
 						 text: 'Cancel',
 						 type: 'button-royal',
 						 onTap: function(e) {
 							 $ionicHistory.nextViewOptions({
 								 disableAnimate: true,
 								 disableBack: true
 							 });
 							 $state.go('app.patient_home',{}, {location: "replace", reload: false})
 						 }
 					 },
 					 {
 						 text: 'Topup',
 						 type: 'button-positive',
 						 onTap: function(e) {
 							 $ionicHistory.nextViewOptions({
 								 disableAnimate: true,
 								 disableBack: true
 							 });
 							 $state.go('app.patient_topup',{}, {location: "replace", reload: false});
 						 }
 					 },

 				 ]
	      });
	    }
	      $ionicLoading.hide();
	    }).catch(function(error){
	  console.log('failure data', error);
	  });

	}

	$scope.$watch('checkDocStatusdfromSearch', function (newValue, oldValue, scope){
		 console.log('changed');
		 console.log('oldValue',oldValue);
		 console.log('newValue',newValue);

		 if(newValue == 2){
			 $scope.callReqPopUp.close();

			 var patientTimeout = $timeout($scope.onTimeout,1000);//timer interval
				 $scope.$on('$destroy', function(){
				 $timeout.cancel(patientTimeout);
				 console.log('destroyed');
			 });

			 searchDoctorServices.declineOne2oneReqPatient(window.localStorage.one2oneId).then(function(response){
			 $scope.declinedByPat=response;
			 window.localStorage.myCallId=0;
			 window.localStorage.callStatus=0;
			 console.log($scope.declinedByPat);
			 }).catch(function(error){
				 console.log('failure data', error);
			 });

			 $scope.alertPopup = $ionicPopup.alert({
				 // title: 'Declined!',
				 template: "<div>Doctor did not accept your consultation</div>",
				 cssClass: 'requestPopup',
				 scope: $scope,
			 });
				 alertPopup.then(function(res) {
					 var patientTimeout = $timeout($scope.onTimeout,1000);//timer interval
					 $scope.$on('$destroy', function(){
					 $timeout.cancel(patientTimeout);
					 console.log('destroyed');
					 $scope.callAccept.close();
					 $window.location.reload();



					 });
				 $state.go("app.patient_home");
				 $ionicHistory.clearHistory();
			 });
		 }

	},true);

$interval(checkDocStatus, 1000);
$scope.myDocDetail = angular.fromJson($window.localStorage['myDocDetail']);
$ionicLoading.show({
	template:'<ion-spinner></ion-spinner>'
})
doctorServices.myDoctorsDetails(window.localStorage.docPhoneSearch).then(function(response){
	// console.log(window.localStorage.docPhone);
	if(response){
		$ionicLoading.hide();
		// $rootScope.searchDocStatus=response[0]['onoff'];
		// console.log($rootScope.searchDocStatus);
		window.localStorage['myDocDetail'] = angular.toJson(response);

		$scope.myDocDetail = angular.fromJson($window.localStorage['myDocDetail']);

	$scope.myDocDetail=response;
	var data=$scope.myDocDetail;//take all json data into this variable
		for(var i=0; i<data.length; i++){

					$rootScope.rates=data[i].ratings,
					$rootScope.totalRates=data[i].totalRates

					if($rootScope.rates == null ){
						$rootScope.rates=''
					}
					if($rootScope.totalRates == null ){
						$rootScope.totalRates=''
					}
					// console.log($rootScope.rates);
					$rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
					// console.log('rates',$rootScope.DocRates);
					// console.log('total',$rootScope.totalRates);
			}
	}


}).catch(function(error){
console.log('failure data', error);
});


$scope.docClicked=function(docPhone){
	$ionicLoading.show({
		template:'<ion-spinner></ion-spinner>'
	})
	window.localStorage.docPhoneSearch=docPhone;
	console.log(docPhone);
	doctorServices.specificSearch(window.localStorage.docPhoneSearch).then(function(response){
		if(response){
			window.localStorage['myDocDetail'] = angular.toJson(response);
			$scope.myDocDetail = angular.fromJson($window.localStorage['myDocDetail']);
			console.log(response);
			$ionicLoading.hide();

		}
		$state.go('app.results');
	}).catch(function(error){
	console.log('failure data', error);
	});
	// $state.go('app.results');
	$scope.myDoctorRatings={}
}

	function checkDocStatus(){
	  doctorServices.myDoctorsDetails(window.localStorage.docPhoneSearch).then(function(response){
			// console.log(window.localStorage.docPhone);
			if(response){
				// console.log(response);
				window.localStorage['myDocDetail'] = angular.toJson(response);
				$scope.myDocDetail = angular.fromJson($window.localStorage['myDocDetail']);
			//
			// if($rootScope.searchDocStatus === response[0]['onoff']){
			// 	// console.log('nochange');
			// }
			// else{
			// 	$scope.myDocDetail =response;
			// }

		  $scope.myDocDetail=response;
		  var data=$scope.myDocDetail;//take all json data into this variable
		    for(var i=0; i<data.length; i++){

		          $rootScope.rates=data[i].ratings,
		          $rootScope.totalRates=data[i].totalRates

		          if($rootScope.rates == null ){
		            $rootScope.rates=''
		          }
		          if($rootScope.totalRates == null ){
		            $rootScope.totalRates=''
		          }
		          // console.log($rootScope.rates);
		          $rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
		          // console.log('rates',$rootScope.DocRates);
		          // console.log('total',$rootScope.totalRates);
		      }
			}


	  }).catch(function(error){
	  console.log('failure data', error);
	  });
	}

	function checkDocStatusOnTheGo(){
		console.log(window.localStorage.docPhoneSearch);
		searchDoctorServices.checkDocStatusOnTheGo(window.localStorage.docPhoneSearch).then(function(response){
			console.log(window.localStorage.myCallId);
		$scope.myDocStatSearch = response;
		console.log($scope.myDocStatSearch);
		window.localStorage.myDocStatusSearch=$scope.myDocStatSearch;
		$scope.checkDocStatusdfromSearch=window.localStorage.myDocStatusSearch;
		})
	}


	$scope.callDoctor=function(num,callType)
	{
		$ionicLoading.show({
			template:'<ion-spinner></ion-spinner>'
		});

		$rootScope.callType=callType;

		$interval(checkCallStatus,2000);
		$interval(checkDocStatusOnTheGo,2000);


		$rootScope.docNumToCall = num;
		$ionicLoading.show();
		var callRequest={
		patient:window.localStorage.user,
		doctor:$rootScope.docNumToCall,
		subPatient:window.localStorage.selectedSubPatient

		// callId:$rootScope.callId
		}
		console.log(callRequest);
		doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
			$rootScope.patientWalletdetails=response;
			if($rootScope.patientWalletdetails === 'agent'){
				// alert('agent');
				$rootScope.myWalletBal='agent';
			}
			else{
				console.log($rootScope.patientWalletdetails);
				$rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
				$rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

				$rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;

				console.log($rootScope.myWalletBal);
			}
						$rootScope.counter = 0;
			if($rootScope.myWalletBal >= 270 || $rootScope.myWalletBal ==='agent')
			{

					if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi'){


											searchDoctorServices.requestForCall(callRequest).then(function(response){
												$ionicLoading.hide();
												console.log('print response',response);
											window.localStorage['one2oneReq'] = angular.toJson(response);
											$rootScope.one2oneReq = angular.fromJson($window.localStorage['one2oneReq']);
											window.localStorage.one2oneId = $rootScope.one2oneReq.reqId;
											console.log(window.localStorage.one2oneId);
											console.log($rootScope.one2oneReq.callStatus);

										}).catch(function(error){
										console.log('failure data', error);
										});

										// hello.greet(uname,pw,persontocall,success, failure);
										$rootScope.counter = 120;
						        $rootScope.onTimeout = function(){
						          console.log($rootScope.counter);
						          $rootScope.counter--;
						          patientTimeout = $timeout($rootScope.onTimeout,1000);
						          if($rootScope.counter == 0){
						          console.log('one minute over');
						          $rootScope.buttonText='Send Request';
						          $timeout.cancel(patientTimeout);

						          var noResponsePopup = $ionicPopup.alert({
						          template: "<div ><p>Doctor did not accepted your request .</p></div>",
						          cssClass: 'requestPopup',
						          scope: $scope,
						          });

						          noResponsePopup.then(function(res) {
												console.log('delete request here');
												searchDoctorServices.cancelOne2oneReq(window.localStorage.one2oneId).then(function(response){
												$scope.cancelledReq=response;
												window.localStorage.one2oneId=0;
												window.localStorage.callStatus=0;
												$scope.callAccept.close();
												console.log($scope.cancelledReq);
												}).catch(function(error){
													console.log('failure data', error);
												});
						          });

						          $scope.callReqPopUp.close();

						          }
						        }
										var patientTimeout = $timeout($scope.onTimeout,1000);//timer interval
							      $scope.$on('$destroy', function(){
							      $timeout.cancel(patientTimeout);
							      console.log('destroyed');
							      });
										$scope.callReqPopUp = $ionicPopup.show({
									 			 template: "<div >Your request for a<br>video call has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
									 			 cssClass: 'requestPopup',
									 			 scope: $scope,
									 			 buttons: [
									 			 {
									 			 text: 'Cancel',
									 			 type: 'button-royal',
									 			 onTap:function(){
									 				 console.log('cancel');
									 				 console.log($rootScope.counter);
									 				 console.log(window.localStorage.user);
													 $scope.callReqPopUp.close();
													  $state.go($state.current, {}, {reload: true});
													  searchDoctorServices.cancelOne2oneReq(window.localStorage.one2oneId).then(function(response){
													  $scope.cancelledReq=response;
														window.localStorage.one2oneId=0;
														window.localStorage.callStatus=0;
														console.log($scope.cancelledReq);
													  }).catch(function(error){
													  	console.log('failure data', error);
													  });

									 			 }
									 			 },

									 		 ]

									 		 });

					}
					else{
						var slowData = $ionicPopup.confirm({
							// title: 'Slow Data',
							template: 'Unable to send request at the moment as we detected slow network on your device. Please try after sometime ',
							cssClass: 'videoPopup',
							scope: $scope,
							buttons: [
							{
								text: 'OK',
								type: 'button-positive',
								onTap: function(e) {
								console.log('ok');
								}
							},
							]
						});
					}

			}
			else
			{

				var confirmPopup = $ionicPopup.confirm({
					// title: 'DoctorQuick',
					template: '<center>Your request could not be processed as your DoctorQuick deposit is less than ₹270.</center> ',
					cssClass: 'videoPopup',
					scope: $scope,
					buttons: [
						{
							text: 'Cancel',
							type: 'button-royal',
							onTap: function(e) {
								$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
								});
								$state.go('app.patient_home',{}, {location: "replace", reload: false})
							}
						},
						{
							text: 'Topup',
							type: 'button-positive',
							onTap: function(e) {
								$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
								});
								$state.go('app.patient_topup',{}, {location: "replace", reload: false});
							}
						},

					]
					//templateUrl: "views/app/viewdoctor_profile.html",
				});

			}
				$ionicLoading.hide();
			}).catch(function(error){
		console.log('failure data', error);
		});

	}




	function checkCallStatus(){
		searchDoctorServices.checkCallStatus(window.localStorage.one2oneId).then(function(response){
			console.log(window.localStorage.one2oneId);
		$scope.calStat = response;
		console.log($scope.calStat[0][0]);
		window.localStorage.callStatus=$scope.calStat[0][0];
		$scope.checkStatus=window.localStorage.callStatus;
		})
	}
	$scope.$watch('checkStatus', function (newValue, oldValue, scope){
		 console.log('changed');

		 if(newValue == 2){
			 console.log('changed call val');
			 $scope.callReqPopUp.close();
			 setTimeout(function (){
						console.log('delay 3 sec');
					}, 3000);
					console.log('value changed');
					// $scope.alertPopup.close();
					$scope.callAccept = $ionicPopup.show({
				 			 template: "<div >Doctor has accepted your invitation for a<br>consultation. Please start the<br>consultation or decline</div>",
				 			 cssClass: 'requestPopup',
				 			 scope: $scope,
				 			 buttons: [
				 			 {
				 			 text: 'Decline',
				 			 type: 'button-royal',
				 			 onTap:function(){
				 				 console.log('cancel');
				 				 console.log(window.localStorage.user);
								 $interval.cancel(checkCallStatus);
								 $scope.callReqPopUp.close();
								  searchDoctorServices.declineOne2oneReqPatient(window.localStorage.one2oneId).then(function(response){
								  $scope.declinedByPat=response;
									window.localStorage.one2oneId=0;
									window.localStorage.callStatus=0;
									console.log($scope.declinedByPat);
								  }).catch(function(error){
								  	console.log('failure data', error);
								  });
									$state.go($state.current, {}, {reload: true});
				 			 }
				 			 },
							 {
							  text: 'Start',
							  type: 'button-assertive',
							  onTap:function(){
									console.log($rootScope.callType);
									var videocallflag = $rootScope.callType;
									$scope.startdate = new Date();
									$scope.callid = $rootScope.callId;
									// window.localStorage.ViewDoc=1;
									$interval.cancel(checkCallStatus);
									console.log(window.localStorage.networkType);
									var uname = "greet+"+window.localStorage.user;
									var pw = "DQ_patient";

										 var persontocall = "greet+" + $rootScope.docNumToCall;
										 console.log(uname);
										 console.log(persontocall);

									if(window.localStorage.networkType == 'None')
									{
										var confirmPopup = $ionicPopup.confirm({
														title: 'DoctorQuick',
														template: 'You are Offline ',
														cssClass: 'videoPopup',
														scope: $scope,
														buttons: [
															{
																text: 'Ok',
																type: 'button-royal',
																onTap: function(e) {
																console.log('offline');
																}
															},
														]
													});
									}
									else if(window.localStorage.networkType == 'Unknown' || window.localStorage.networkType == 'Ethernet' || window.localStorage.networkType == '2G' || window.localStorage.networkType == '3G')
									{
										var confirmPopup = $ionicPopup.confirm({
														// title: 'DoctorQuick',
														template: 'We detected slow nwtwork on your device. Please try after sometime ',
														cssClass: 'videoPopup',
														scope: $scope,
														buttons: [
															{
																text: 'Ok',
																type: 'button-positive',
																onTap: function(e) {
																console.log('ok');
																}
															},
														]
													});
									}
									else if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi')
									{
										console.log($rootScope.callType );
										var success = function(message)
										{

												$ionicHistory.nextViewOptions({
												disableAnimate: true,
												disableBack: true
											 });

												//
												$scope.enddate = new Date();
												console.log(window.localStorage.user);
												console.log($rootScope.accptdDoc);
												// console.log(window.localStorage.Doctocall);
												callacceptedbydoctor.accpeteddoctor(window.localStorage.user,$rootScope.docNumToCall,videocallflag,$scope.startdate,$scope.enddate,window.localStorage.one2oneId).then(function(response){
													console.log('inserted to consultation',response);

													$state.go('app.patient_summary',{calledDoctor:$rootScope.docNumToCall,consultId:window.localStorage.one2oneId}, {location: "replace", reload: false});


					              }).catch(function(error){
					              console.log('failure data', error);
					              });
										}
										var failure = function()
										{
											alert("Error calling Hello Plugin");
										}

										if($rootScope.callType == 5){
											hello.greet(uname,pw,persontocall,success, failure);
										}
										if($rootScope.callType == 6){
											hello.audiocallvsee(uname,pw,persontocall,success, failure);
										}


									}
									else{

										//Do nNothing

									}


							  }
							  },
				 		 ]

				 		 });
		 }
		 if(newValue == 4){
						//  alert('declined');

						 $scope.callReqPopUp.close();
						 var confirmPopup = $ionicPopup.confirm({
										 // title: 'Declined!',
										 template: '<center>Doctor has declined for consultation</center>',
										 cssClass: 'videoPopup',
										 scope: $scope,
										 buttons: [
											 {
												 text: 'OK',
												 type: 'button-positive',
												 onTap: function(e) {
													 var test = $timeout($scope.onTimeout,1000);//timer interval
										 			$scope.$on('$destroy', function(){
										 			$timeout.cancel(test);
													console.log('declined here');
										 			console.log('destroyed');
													$scope.callAccept.close();
										 			});
													 $state.go($state.current, {}, {reload: true});
												 console.log('ok');
												 }
											 },
										 ]
						 });
		 }

	},true);

	$scope.sendOfflineMessage=function(num){
		$ionicLoading.show({
			template:'<ion-spinner></ion-spinner>'
		})
		var sendMessage={
			patient:window.localStorage.user,
			doctor:num
		}
		searchDoctorServices.sendOfflineMessage(sendMessage).then(function(response){
			if(response){
				$ionicLoading.hide();

				var confirmPopup = $ionicPopup.confirm({
							template: '<center>You will be notified once the Doctor is available</center>',
							cssClass: 'videoPopup',
							scope: $scope,
							buttons: [
							{
								text: 'OK',
								type: 'button-positive',
								onTap: function(e) {
								console.log('OK');
								}
							},
							]
						});
			}
			console.log(response);
		}).catch(function(error){
		console.log('failure data', error);
		});
	}


	    $scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
	    console.log($scope.patient_details);
	    $rootScope.defaultPatientFname=$scope.patient_details[0][0];
	    $rootScope.defaultPatientLname=$scope.patient_details[0][2];
	    $rootScope.defaultPatientNum=$scope.patient_details[0][5];


	    console.log($rootScope.defaultPatientFname);
	    console.log($rootScope.defaultPatientLname);

	    $scope.patientToConsult='';
	    $scope.changePatient=function (val) {
	      $state.go("app.subPatientList");
	    }
	    $scope.editNewPatient=function () {
	     if(window.localStorage.newPatientVal == 0){
	       console.log('select patient to edit');
	     }
	     else if(window.localStorage.newPatientVal === window.localStorage.user || window.localStorage.newPatientVal === 'new'){
	       console.log('can not edit default patient');
	     }
	     else{
	       $state.go("app.editPatient",{id:window.localStorage.newPatientVal});

	     }


	    }
			var subPatientToShow={
				subPatId:window.localStorage.selectedSubPatient,
				mainPatient:window.localStorage.user
			}
			medicalSpecialityService.selectSubPatient(subPatientToShow).then(function(response){
				 $rootScope.newPAtient=response;
				 console.log($rootScope.newPAtient.length);
				 if($rootScope.newPAtient.length == 0){
					 // console.log('hide');
					 $rootScope.defaultPatient=false;
					 $rootScope.shownewPatient=true;

				 }
				 else{
					 $rootScope.defaultPatient=true;
					 $rootScope.shownewPatient=false;
				 }
			}).catch(function(error){
					console.log('failure data', error);
			});

})

DoctorQuickApp.controller('searchbyspecialities', function($scope,searchbyspecialities) {

  $scope.res = searchbyspecialities.getSearchData();
  console.log($scope.res);




});

DoctorQuickApp.controller('specialityDetailsController', function($rootScope,$scope,$stateParams,medicalSpecialityService)
{

	console.log('state params', $stateParams);

	var getSpecialityDetails = function () {
		medicalSpecialityService.getSpecialistDetails($stateParams.specialityId)
		.then(function(response) {
			$scope.specilaityDetails = response.data;
		})
		.catch(function(error) {
			console.log(error);
		})
	}();

})


DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope,$window, $scope, $interval,$ionicHistory, $stateParams,$ionicPopup ,$localStorage, $timeout, $stateParams, $cordovaToast, medicalSpecialityService,$localStorage, $ionicLoading,doctorServices,patientWalletServices) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.hideSideMenu = true;
    $rootScope.showBadge=false;
    $rootScope.showSubPatients=false;



// TO CHECK NO OF DOCTORS ONLINE IN VSEE
$scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
console.log($scope.patient_details);
$rootScope.defaultPatientFname=$scope.patient_details[0][0];
$rootScope.defaultPatientLname=$scope.patient_details[0][2];
$rootScope.defaultPatientNum=$scope.patient_details[0][5];


console.log($rootScope.defaultPatientFname);
console.log($rootScope.defaultPatientLname);

// $rootScope.newPAtient=medicalSpecialityService.getNewPatient();

$interval(CheckOnlineDocs, 2000);

var subPatientToShow={
  subPatId:window.localStorage.selectedSubPatient,
  mainPatient:window.localStorage.user
}
console.log(subPatientToShow);
console.log(window.localStorage.selectedSubPatient);

medicalSpecialityService.selectSubPatient(subPatientToShow).then(function(response){
   $rootScope.newPAtient=response;
   console.log($rootScope.newPAtient.length);
   if($rootScope.newPAtient.length == 0){
     console.log('hide');
     $rootScope.defaultPatient=false;
     $rootScope.shownewPatient=true;

   }
   else{
     $rootScope.defaultPatient=true;
     $rootScope.shownewPatient=false;
   }
}).catch(function(error){
    console.log('failure data', error);
});
console.log($rootScope.newPatientFname);
  //hello.logininformation(username,password,success, failure);
console.log($rootScope.SpecilityId);
$ionicLoading.show({
  template:'<ion-spinner></ion-spinner>'
})



$scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);
console.log(window.localStorage.SpecilityId);

// var result = JSON.parse(localStorage.getItem("specialitiesList"));
// $scope.specialityDetails = JSON.parse(localStorage.getItem("specialitiesList"))[window.localStorage.SpecilityIndex];
// console.log($scope.specialityDetails);
// console.log($scope.specialitiesList[window.localStorage.SpecilityId]);

  medicalSpecialityService.getMedicalSpeciality(window.localStorage.SpecilityId)
   .then(function(response){
     if(response){
       console.log(response);
       $rootScope.oldDocStatus=response[0]['noofonlinedoctors']
       console.log($rootScope.oldDocStatus);

       var data = response;
       for(var i=0; i<data.length; i++){
         $rootScope.doctorFname=data[i].doctorFname;
       console.log(i);
       }


       window.localStorage['specialityDetails'] = angular.toJson(response);
       $scope.specialityDetails = angular.fromJson($window.localStorage['specialityDetails']);
       console.log($scope.specialityDetails[0][1] );
       $ionicLoading.hide();
     }
      console.log('Details', response);
      $scope.specialityDetails = response;
      $rootScope.showSubPatients=true;
   }).catch(function(error){
       console.log('failure data', error);
   });

  $rootScope.counter = 0;
   $scope.stopped = false;
   $scope.buttonText='Send Request';

   $rootScope.popUpClosed == false;
  $scope.sendrequesttoonlinedoctors = function()
  {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner>'
    });
      $interval(checkAcceptedReqDocStatus,2000);
    patientWalletServices.myWalletBalance(window.localStorage.user).then(function(response){
     $rootScope.patientWalletdetails=response;
     if($rootScope.patientWalletdetails === 'agent'){
       // alert('agent');
       $rootScope.myWalletBal='agent';
     }
     else{
       console.log($rootScope.patientWalletdetails);
       $rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
       $rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

       $rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;

       console.log($rootScope.myWalletBal);
     }

     $rootScope.newPAtient=medicalSpecialityService.getNewPatient();
     console.log($rootScope.newPAtient);
     if($rootScope.myWalletBal >= 270 || $rootScope.myWalletBal === 'agent'){
       console.log(window.localStorage.networkType);
       if(window.localStorage.networkType === '4G' || window.localStorage.networkType === 'WiFi' || window.localStorage.networkType === 'Unknown'){
         console.log(window.localStorage.SpecilityId);

         medicalSpecialityService.sendrequesttodoctor(window.localStorage.SpecilityId).then(function(response){
           console.log('successfull data', response[0][1]);
           $rootScope.sentReqResponse=response;
           $rootScope.sentReqId=$rootScope.sentReqResponse[0];
           $rootScope.sentReqStat=$rootScope.sentReqResponse[1];
           console.log($rootScope.sentReqStat);
           console.log($rootScope.sentReqId);


           if($rootScope.sentReqStat === 'Inserted'){
             $ionicLoading.hide();
            $rootScope.counter = 120;
             $rootScope.onTimeout = function(){
               // console.log($scope.counter);
              $rootScope.counter--;
               patientTimeout = $timeout($rootScope.onTimeout,1000);
               if($scope.counter == 0){
               console.log('one minute over');
               $rootScope.buttonText='Send Request';
               $timeout.cancel(patientTimeout);

               var noResponsePopup = $ionicPopup.alert({
               template: "<div ><p>None of the doctors have accepted your request</p></div>",
               cssClass: 'requestPopup',
               scope: $scope,
               });

               noResponsePopup.then(function(res) {
                 medicalSpecialityService.cancelReq(window.localStorage.user).then(function(response){
                 $scope.cancelledReq=response;
                 // $state.go("app.medical_speciality");
                 $interval.cancel(checkAcceptedReq);
                 $interval.cancel(checkAcceptedReqDocStatus);
                 }).catch(function(error){
                 console.log('failure data', error);
                 });
               });

               $scope.callReqPopUp.close();

               }
             }
          var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer interval
          $scope.$on('$destroy', function(){
          $timeout.cancel(patientTimeout);
          console.log('destroyed');
          });



          $rootScope.buttonText='Request sent' ;
          $scope.callReqPopUp = $ionicPopup.show({
                template: "<div >Your request for a<br>consultation has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
                cssClass: 'requestPopup',
                scope: $scope,
                buttons: [
                {
                text: 'Cancel',
                type: 'button-royal',
                onTap:function(){

                  $interval.cancel(checkAcceptedReq);
                  $interval.cancel(checkAcceptedReqDocStatus);

                  console.log('cancel');
                  console.log($scope.counter);
                  console.log(window.localStorage.user);
                  medicalSpecialityService.cancelReq(window.localStorage.user).then(function(response){
                  $scope.cancelledReq=response;
                    $state.go($state.current, {}, {reload: true});
                  }).catch(function(error){
                  console.log('failure data', error);
                  });
                }
                },
              ]

              });
              $scope.nonePopUp=false;
              var closePopup=function(){
                console.log('cancelCall here');
                medicalSpecialityService.cancelReq(window.localStorage.user).then(function(response){
                $scope.cancelledReq=response;
                $scope.callReqPopUp.close(); //close the popup after 3 seconds for some reason
                 $scope.nonePopUp=true;
                   $interval.cance(checkAcceptedReq);
                  console.log($scope.cancelledReq);
                }).catch(function(error){
                console.log('failure data', error);
                });

              }

              console.log($scope.counter);
              console.log('buttonclicked');
              $interval(checkAcceptedReq,2000);

              var checkAcceptedReq = $interval(function () {
                var newCallStatus = {
                  patient:window.localStorage.user,
                  reqId:$rootScope.sentReqId
                }
                 console.log('intervalStarted');
                 console.log(newCallStatus);
                    medicalSpecialityService.checkForAccptedReq(newCallStatus).then(function(response){
                    $scope.accptdReq=response;
                    console.log($scope.accptdReq);
                      if($scope.accptdReq != ''){
                        console.log($scope.accptdReq);
                        var accptDoc=$scope.accptdReq;
                        for(var i=0; i<accptDoc.length; i++){
                          $rootScope.doctorPhone=accptDoc[i].doctorPhone,
                          $rootScope.callId=accptDoc[i].callId,
                          $rootScope.cal_flag=accptDoc[i].flag,
                          $rootScope.rates=accptDoc[i].ratings,
                          $rootScope.totalRates=accptDoc[i].totalRates
                        }
                        $scope.callReqPopUp.close();

                        setTimeout(function (){
                          console.log('delay 3 sec');
                          $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                          });
                          var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer interval
                          $scope.$on('$destroy', function(){
                          $timeout.cancel(patientTimeout);
                          console.log('destroyed');
                          });
                          $state.go('app.callAccepted',{accptdDoc:$rootScope.doctorPhone,callId:$rootScope.callId,callFlag:$rootScope.cal_flag,rates:$rootScope.rates,totalRates:$rootScope.totalRates},{location: "replace", reload: false});
                          console.log('show accpted doc profile');
                            $interval.cancel(checkAcceptedReq);
                        }, 1000);

                      }

                    }).catch(function(error){
                    console.log('failure data', error);
                    });

               }, 2000);

           }
          else{
              console.log('Database Error');
          }
          }).catch(function(error){
              console.log('failure data', error);
          });
          /*Start timers*/
       }
       else{

             $ionicLoading.show({
               template: 'Sending request',
               duration: 5000
             });
             $timeout( function(){
               var confirmPopup = $ionicPopup.confirm({
                 // title: 'Slow Data',
                 template: 'Unable to send request at the moment as we detected slow network on your device. Please try after sometime ',
                 cssClass: 'videoPopup',
                 scope: $scope,
                 buttons: [
                 {
                   text: 'OK',
                   type: 'button-positive',
                   onTap: function(e) {
                   console.log('ok');
                   }
                 },
                 ]
               });
             }, 5000 );

       }
     }
     else{
              $ionicLoading.hide();
               var confirmPopup = $ionicPopup.confirm({
           						// title: 'Low Balance',
           						template: '<center>Your request could not be processed as your DoctorQuick deposit is less than ₹270.</center> ',
           						cssClass: 'videoPopup',
           						scope: $scope,
           						buttons: [
                        {
           								text: 'Cancel',
           								type: 'button-royal',
           								onTap: function(e) {
                            $ionicHistory.nextViewOptions({
                              disableAnimate: true,
                              disableBack: true
                            });
                            $state.go($state.$current,{}, {location: "replace", reload: false})
           								}
           							},
           							{
           								text: 'Topup',
           								type: 'button-positive',
           								onTap: function(e) {
                            $ionicHistory.nextViewOptions({
                              disableAnimate: true,
                              disableBack: true
                            });
                            $state.go('app.patient_topup',{}, {location: "replace", reload: false});
           								}
           							},

           						]
           					});
         }
     }).catch(function(error){
       console.log('failure data', error);
     });

  }




   function CheckOnlineDocs(){
   // window.localStorage.SpecilityId=$rootScope.SpecilityId;
   medicalSpecialityService.getMedicalSpeciality(window.localStorage.SpecilityId)
    .then(function(response){
      $rootScope.newDocStatus=response[0]['noofonlinedoctors']
      if($rootScope.newDocStatus === $rootScope.oldDocStatus){

        // console.log('same data');
      }
      else{
        $rootScope.oldDocStatus = $rootScope.newDocStatus;
        console.log($scope.specialityDetails);
        console.log(response);
        $scope.specialityDetails =response;
      }
      // console.log(response[0]['noofonlinedoctors']);

      // console.log($scope.specialityDetails);

      // $rootScope.newValueForOnlineDoc=$rootScope.specialityDetails[]['noofonlinedoctors'];
      // console.log($rootScope.newValueForOnlineDoc);
      $scope.specialityDetails = response;
      // console.log($scope.specialityDetails);
    }).catch(function(error){
       console.log('failure data', error);
    });
   }

   $scope.isFirstTime = false;

   var checkPatientActivity={
   	callId:$rootScope.callId,
   	doctor:$stateParams.accptdDoc
   }
   console.log(checkPatientActivity);
    function checkAcceptedReqDocStatus(){
   	//  doctorServices.patientActivity($rootScope.callId).then(function(response){
   	 doctorServices.patientActivity(checkPatientActivity).then(function(response){
   	 $scope.consultStatus=response;
   // 	 console.log($scope.consultStatus);
   	 window.localStorage.declinedByDoc = $scope.consultStatus[0][0];
   	 $scope.docDeclined=window.localStorage.declinedByDoc;
   	//  console.log($scope.consultStatus);
   	 }).catch(function(error){
   	//  console.log('failure data', error);
   	 });
    }
    $scope.$watch('docDeclined', function (newValue, oldValue, scope){
    		console.log('changed');

    		if(newValue > oldValue){
   			setTimeout(function (){
   					 console.log('delay 3 sec');
   				 }, 3000);

   		     var alertPopup = $ionicPopup.alert({
   		       title: 'Declined!',
   					 template: "<div>Doctor has declined for a consultation</div>",
   					 cssClass: 'requestPopup',
   					 scope: $scope,
   		     });
   		     	 alertPopup.then(function(res) {
               var test = $timeout($rootScope.onTimeout,1000);//timer interval
         			$scope.$on('$destroy', function(){
         			$timeout.cancel(test);
         			console.log('destroyed');
         			});
   					 $state.go("app.patient_home");
   					 $ionicHistory.clearHistory();
   		     });
    		}

    },true);

//New patient details

    $scope.patientToConsult='';
    $scope.changePatient=function (val) {
      $state.go("app.subPatientList");
    }
   $scope.editNewPatient=function () {
     if(window.localStorage.newPatientVal == 0){
       console.log('select patient to edit');
     }
     else if(window.localStorage.newPatientVal === window.localStorage.user || window.localStorage.newPatientVal === 'new'){
       console.log('can not edit default patient');
     }
     else{
       $state.go("app.editPatient",{id:window.localStorage.newPatientVal});

     }


  }




  $rootScope.newpatientAdded=medicalSpecialityService.getNewPatient();
  console.log($rootScope.newpatientAdded);
  $scope.newPatientFname=$scope.newpatientAdded.fname;
  $scope.newPatientLname=$scope.newpatientAdded.lname;
  if($rootScope.newpatientAdded){
    $rootScope.shownewPatient=false;
  }
  else{
    $rootScope.shownewPatient=true;
  }
  $scope.$on('$destroy', function(){
      console.log('destroyed');
      $interval.cancel(checkAcceptedReqDocStatus);
      $interval.cancel(CheckOnlineDocs);

  });


});

DoctorQuickApp.controller('chatWithPatientCtrl', function($scope, $rootScope, $localStorage, $ionicConfig, $ionicActionSheet) {
	$rootScope.headerTxt="Messeges";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.hideSideMenu = true;

	$scope.showActionsheet = function() {

	 $ionicActionSheet.show({

		 buttons: [

			 { text: ' Send Photo ' },
			 { text: ' Send Prescription' },

			 ],
		//  destructiveText: 'Delete',
		 cancelText: 'Cancel',
		 cancel: function() {
			 console.log('CANCELLED');
			 window.localStorage.$reset;
		 },
		 buttonClicked: function(index) {
			 console.log('BUTTON CLICKED', index);
			 if(index == 0){
				//  alert('sendphoto');
				console.log('Send photo');

			 }
			 if(index == 1){
				console.log('sendprescription');
			}
			 return true;
		 },

	 });
 };
	// $http.get('patient_home.json').success(function(response) {
	// 	$scope.feeds_categories = response;
	// });patientProfileCtrl
})

DoctorQuickApp.controller('docAccStatementCtrl', function($scope, $rootScope,$cordovaDatePicker, $ionicConfig, $localStorage, $filter, $ionicLoading,accountsService) {
  console.log('Doc Account statements');
	$rootScope.headerTxt="Account Statement";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.hideSideMenu = true;
  $rootScope.inviteButton = false;


  console.log(window.localStorage.user);
  $rootScope.from ='';
  $rootScope.toDate='';

accountsService.docAccountsBalance(window.localStorage.user).then(function(response){
    $scope.availableBalance=response;
    console.log($scope.availableBalance);
  }).catch(function(error){
  console.log('failure data', error);
});

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log(val);
        console.log('Selected from Date : ' + val, new Date(val));
        $rootScope.from = $filter('date')(new Date(val),'yyyy-MM-dd');
        accountsService.docAccountsDetails($rootScope.from);
      },

      from: new Date(2016, 1, 1), //Optional
      to: new Date(2050, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      // disableWeekdays: [0],       //Optional
      closeOnSelect: true,
      dateFormat: 'dd MMMM yyyy',      //Optional
      templateType: 'popup'       //Optional
    };
// console.log(window.localStorage.fromDate);
$rootScope.transcMsg='Select Dates';
    var ipObj2 = {
        callback: function (val) {  //Mandatory
          console.log('Selected To Date : ' + val, new Date(val));
          $rootScope.toDate = $filter('date')(new Date(val),'yyyy-MM-dd');
          accountsService.docAccountsDetails().then(function(response){
              console.log(response);
              $scope.DocAcc=response;
            if($scope.DocAcc.length === 0){
              $rootScope.transcMsg='No Transactions';
            }else{
              $rootScope.transcMsg='';
            }

              }).catch(function(error){
            console.log('failure data', error);
          });
        },

        from: new Date(2016, 1, 1), //Optional
        to: new Date(2050, 12, 31), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: false,          //Optional
        // disableWeekdays: [0],       //Optional
        closeOnSelect: true,
        dateFormat: 'dd MMMM yyyy',     //Optional
        templateType: 'popup'       //Optional
      };


      var options = {
         date: new Date(),
         mode: 'date', // or 'time'
         // minDate: new Date() - 10000,
         // allowOldDates: true,
         allowFutureDates: false,
         androidTheme : 3,
         cancelButtonLabel: 'CANCEL',
         cancelButtonColor: '#ff0101',
         doneButtonLabel: 'DONE',
         doneButtonColor: '#6aa13e'

       };



      $scope.openDatePickerfrom = function(){

        $cordovaDatePicker.show(options).then(function(date){
          $rootScope.from=date;
                console.log(date);
            });
            accountsService.docAccountsDetails($rootScope.from);
        // ionicDatePicker.openDatePicker(ipObj1);
      };
    $scope.openDatePickerTo = function(){

      $cordovaDatePicker.show(options).then(function(date){
        $rootScope.toDate =date;
              console.log(date);
              if($rootScope.toDate){
                accountsService.docAccountsDetails().then(function(response){
                    console.log(response);
                    $scope.DocAcc=response;
                  if($scope.DocAcc.length === 0){
                    $rootScope.transcMsg='No Transactions';
                  }else{
                    $rootScope.transcMsg='';
                  }

                    }).catch(function(error){
                  console.log('failure data', error);
                });
              }
          });

      // ionicDatePicker.openDatePicker(ipObj2);
    };




})

DoctorQuickApp.controller('docProfileCtrl', function($scope,$rootScope,$state, $ionicConfig, $timeout, $window, $localStorage, $ionicLoading,$cordovaSocialSharing, doctorServices,rateDoctorServices,urlShortener) {

  $scope.toggle = true;
	$rootScope.headerTxt="Profile";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
  $rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
  $rootScope.inviteButton = false;


  console.log($state.$current.name);


  $scope.userDoctor = angular.fromJson($window.localStorage['doctorDetails']);
  $scope.getStars = function(rating) {
    // Get the value
    var val = parseFloat(rating);
    // Turn value into number/100
    var size = val/5*100;
    return size + '%';
  }
  console.log($scope.userDoctor);
	 $scope.$watch('toggle', function(){
			 $scope.toggleText = $scope.toggle ? 'Accept!' : 'Accepted';
	 });
// console.log(window.localStorage.user);
   rateDoctorServices.getDocRatingsByAll(window.localStorage.user).then(function(response){
   $scope.myDoctorRatings=response;//store the response array in doctor details
  //  console.log($scope.myDoctorRatings);
   $scope.ratings = [{
          current: $scope.myDoctorRatings,
          max: 5
      }, ];

   }).catch(function(error){
   console.log('failure data', error);
   });

   $scope.changeDocEmail=function(){
     $state.go('templates.changeEmail_doctor');
   }


   doctorServices.doctorEmailVerification(window.localStorage.user).then(function(response){
     $rootScope.email=response;
     if($rootScope.email == 1){
       $rootScope.emailVerified = false;
       $rootScope.Verified = false;

     }
     if($rootScope.email == 2){
       $rootScope.emailVerified = true;
       $rootScope.Verified = true;

     }

     $ionicLoading.hide();
     console.log($scope.email);

   }).catch(function(error){
   console.log('failure data', error);
   })

})

DoctorQuickApp.controller('doctorCareCtrl', function($scope,$state, $rootScope,$ionicPopup, $localStorage,$timeout, $ionicConfig, $ionicLoading, $http, $cordovaToast, doctorCareService) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showBadge=false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;


	$rootScope.cc={};
	$scope.doctorQuery=function(){

		if(!$rootScope.cc.query){
			console.log($rootScope.cc.query);
			window.plugins.toast.showWithOptions({
			message: "Please Enter your query",
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
			var doctorQuery={
	      patientPhone:window.localStorage.user,
	      query:$rootScope.cc.query
	    }

	    doctorCareService.submitQuery(doctorQuery).then(function(response){
	        console.log(response);
	        $rootScope.cc.query="";

					var confirmPopup = $ionicPopup.confirm({
									template: '<center>Someone from DoctorQuick will contact you soon</center>',
									cssClass: 'videoPopup',
									scope: $scope,
									buttons: [
										{
											text: 'OK',
											type: 'button-positive',
											onTap: function(e) {
											console.log('offline');
											$state.go("templates.doctor_home")
											}
										},
									]
								});

	      }).catch(function(error){
	      console.log('failure data', error);
	    });

		}

	};

  $scope.doctorCallback=function(){
    console.log('callback');
		// $scope.name="ravi";
		$ionicLoading.show({
      // duration: 30000,
      noBackdrop: true,
      template: '<ion-spinner icon="lines"/><p class="item-icon-left">Loading stuff...</p>'
    });

    doctorCareService.submitCallBack(window.localStorage.user).then(function(response){
        console.log(response);
				$ionicLoading.hide();
        $rootScope.cc.query="";
				var confirmPopup = $ionicPopup.confirm({
								template: '<center>Someone from DoctorQuick will contact you soon</center>',
								cssClass: 'videoPopup',
								scope: $scope,
								buttons: [
									{
										text: 'OK',
										type: 'button-positive',
										onTap: function(e) {
										console.log('offline');
										$state.go("templates.doctor_home")
										}
									},
								]
							});
      }).catch(function(error){
      console.log('failure data', error);
    });

  };

})

DoctorQuickApp.controller('doctorCtrl', function($state, $scope, $rootScope, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage, LoginService, doctorServices) {
console.log(window.localStorage.user);
$scope.userPhone=LoginService.returnUserPhone();

  $scope.getDocDetails=function(){
    $state.go('templates.doc_profile');
  }

$scope.getMyConsultations=function(){
    doctorServices.myConsultedPatients(window.localStorage.user).then(function(response){
      $scope.myPatients=response;//store the response array in doctor details
      console.log($scope.myPatients);

  }).catch(function(error){
    console.log('failure data', error);
  });
}

})

DoctorQuickApp.controller('doctorScreensCtrl', function($scope,$ionicHistory,$timeout,$window,$location,$rootScope,$localStorage,$interval,$ionicConfig, $state, $ionicSideMenuDelegate,$ionicLoading, $interval, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails,doctorServices,HardwareBackButtonManager,LoginService,invitereviews) {

  	$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;
    $scope.docAvailable=true;
    $scope.docNotAvailable=false;
    $rootScope.inviteButton = false;

    $rootScope.homePage=$ionicHistory.currentStateName();
    $ionicSideMenuDelegate.canDragContent(false); //preventes sidemenu sliding

    HardwareBackButtonManager.disable();
    $ionicConfig.views.swipeBackEnabled(false);//disables swipe back in iphone

    // alert($rootScope.previousState.name);
    // alert($rootScope.homePage);

    doctorServices.doctorStatus(window.localStorage.user).then(function(response){
        console.log(response);
        window.localStorage.onOff=response;
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

    $rootScope.goToConsultation = function ()
    {
      $state.go("templates.consulted_patient")
    }
    $timeout( function(){
        console.log('interval started');


        if($localStorage.showConnecting === true){
          console.log($localStorage.showConnecting);

          $timeout( function(){
          $rootScope.connectingMessage = 'Internet connection appears very slow. Please try later'
        }, 60000 );
          $rootScope.connectingMessage = 'Connecting to DoctorQuick'
          $ionicLoading.show({
            template: '<ion-spinner></ion-spinner><br><br>{{connectingMessage}}',
            // duration:3000,
            noBackdrop: true
          });

            $interval(availableInVsee,2000,1);

        }
        // $interval(checkNewMessages,2000);


    }, 0 );

    doctorServices.doctorDetails(window.localStorage.user).then(function(response,data){
      $rootScope.doctor_details=response;//store the response array in doctor details
      console.log($rootScope.doctor_details);
      window.localStorage['doctorDetails'] = angular.toJson(response);

    }).catch(function(error){
      console.log('failure data', error);
    });




    function availableInVsee() {
      console.log('LOGIN CHECK');
            var uname1 = "greet+"+window.localStorage.user;
            var pw1 = "DQ_doctor";
            var success = function(message)
            {
                    console.log(message);

                    $ionicLoading.hide().then(function(){
                    console.log("The loading indicator is now hidden");
                    // alert('loggedin');
                    $localStorage.showConnecting = false;
                    $interval(checkNewMessages,2000);

                    $interval.cancel(availableInVsee);

                    doctorServices.doctorStatus(window.localStorage.user).then(function(response){
                        console.log(response);
                        window.localStorage.onOff=response;
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

                    });
            }
            var failure = function()
            {
            alert("Error calling Hello Plugin");
            }

            hello.login(uname1,pw1,success, failure);
    }


// $rootScope.checkNewMessages = $interval(function(){}, 2000);
    function checkNewMessages()
    {
          var username = "greet+"+window.localStorage.user;
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
$rootScope.unreadchatforpatient = 0;
    invitereviews.generateTinyUrl(window.localStorage.user).then(function(response){
      $rootScope.docTinyUrl=response;
      window.localStorage.docTinyUrl=$rootScope.docTinyUrl;
    }).catch(function(error){
    console.log('failure data', error);
    });

  if($rootScope.previousState.name === '' && $rootScope.homePage === 'templates.doctor_home'){
    $scope.docAvailable=false;
    $scope.docNotAvailable=true;
    // window.localStorage.onOff=2;
  }
    console.log($ionicHistory.viewHistory());
    $interval(checkConsultations,2000,false);
    console.log(window.localStorage.onOff);
    // $scope.docStatus=window.localStorage.onOff;
    $scope.$watch('docStatus', function (newValue, oldValue, scope){
       console.log('changed');

       if(newValue > oldValue){
           $interval.cancel(checkConsultations);
       }

    },true);

var doctorDeviceDetails ={
  doctorNum:window.localStorage.user,
  deviceId:window.localStorage.deviceID,
  deviceSerial:window.localStorage.serial
}
function checkConsultations(){
    doctoronoffdetails.getdoctorrequest(doctorDeviceDetails).then(function(response){
    $scope.pendingRequests = response;
    // console.log('pending:',$scope.pendingRequests);
    $scope.requests=$scope.pendingRequests.length;
  });
  // .catch(function(error){
  //   console.log('failure data', error);
  // })

  console.log($ionicHistory.currentStateName());
  if ($ionicHistory.currentStateName() === 'auth.loginNew') {
    return false;
  }

  doctoronoffdetails.doctorDeviceUpdate(window.localStorage.user).then(function(response){
    $scope.deviceDetails = response;
    // console.log( $scope.deviceDetails);
    // console.log('deviceUUID:',$scope.deviceDetails[0][0]);
    // console.log('DeviceSerial:',$scope.deviceDetails[0][1]);

    window.localStorage.deviceUUID = $scope.deviceDetails[0][0];
    $scope.deviceUUID=window.localStorage.deviceUUID;
    if(window.localStorage.deviceID === $scope.deviceUUID){
      $rootScope.LogoutDocFromOldDevce=false;
    }
    else {
      console.log('device changed');
      var unametologout = "greet+"+window.localStorage.user;
      var pwtologout = "DQ_doctor";
        var success = function(message)
        {

              $rootScope.LogoutDocFromOldDevce=true;
              $ionicLoading.hide();
              console.log(message);
              $ionicHistory.nextViewOptions({
              disableBack: true,
              disableAnimate: true,
              historyRoot: true
              });

              $state.go('auth.loginNew');
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory();
              $window.localStorage.clear();
                var alertPopup = $ionicPopup.alert({
                  template: '<center>Your device is no longer registered <br> with DoctorQuick. Contact care@doctorquick.com</center>',
                  cssClass: 'videoPopup',
                });
                alertPopup.then(function(res) {
                  ionic.Platform.exitApp();
                });
        }
        var failure = function()
        {
          console.log('error calling hello plugin');
        }
        hello.logout(unametologout,pwtologout,success, failure);



    }

  })
  .catch(function(error){
    console.log('failure data', error);
  })


}

    // console.log($ionicHistory.currentStateName());
    $scope.emailNotification = 'Subscribed';
    // console.log($scope.emailNotification);
    $scope.Online = function (message) {
      $scope.status=message;
      console.log(window.localStorage.user);
      doctorServices.notifyPatient(window.localStorage.user).then(function(response){
        console.log(response);
      })
          console.log(message);
          $scope.docAvailable=true;
          $scope.docNotAvailable=false;

          var whichdoctoronoff = {
            doctorphno : window.localStorage.user,
            onoff :1
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
    						if(window.localStorage.doctororpatient === 'patient'){
    							var updatePlayer ={
    								palyerId:$scope.playerId,
    								userNum:window.localStorage.user,
    								user:'patient'
    							}
    						}
    						else{
    							var updatePlayer ={
    								palyerId:$scope.playerId,
    								userNum:window.localStorage.user,
    								user:'doctor',
                    status:$scope.status
    							}


    						}

                LoginService.updatePlayer(updatePlayer).then(function(response){
                  console.log(response);
              });


              })



        };
  $scope.Offline = function (message) {
        console.log(message);
        $scope.status=message;
        // $window.location.reload();
        $scope.docAvailable=false;
        $scope.docNotAvailable=true;

        $scope.accptNotifications=true;
        $scope.rejectNotifications=false;
        if(window.localStorage.doctororpatient === 'patient'){
        var updatePlayer ={
        palyerId:'',
        userNum:window.localStorage.user,
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
        userNum:window.localStorage.user,
        user:'doctor',
        status:$scope.status
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

    if(window.localStorage.onOff == 1){
    $scope.checkedValue=true;
    }

	$rootScope.changeStatus = function (e)
	{
    console.log(e);
		$scope.checkedValue = true;
				if(e)
				{
						$scope.checkedValue = true;
            window.localStorage.onOff=1
						var whichdoctoronoff = {
							doctorphno : window.localStorage.user,
							onoff : window.localStorage.onOff
						}
						doctoronoffdetails.doctoronoff(whichdoctoronoff);

							var uname1 = "greet+"+window.localStorage.user;
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
            // window.localStorage.onOff=2
						var whichdoctoronoff = {
								doctorphno : window.localStorage.user,
								onoff : window.localStorage.onOff
					}
					doctoronoffdetails.doctoronoff(whichdoctoronoff);
					var unametologout = "greet+"+window.localStorage.user;
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

 $scope.pending=window.localStorage.requests;
  $scope.hello = 5;
  window.localStorage.totalReq = 0;

    $scope.$watch('requests', function (newValue, oldValue, scope){

        if(newValue > oldValue){

        }

    },true);



$rootScope.ExpiredAlert= false;
$scope.viewRequest=function(patient){
  console.log('view');
  // $ionicLoading.show({
  //   template:'<ion-spinner></ion-spinner>'
  // })
  $rootScope.currentPatient = patient;
  window.localStorage['currentPatient'] = angular.toJson($rootScope.currentPatient);

  console.log($rootScope.currentPatient);
  console.log($rootScope.currentPatient.requestedTime);
        $rootScope.id= $rootScope.currentPatient.id;
  $state.go('templates.patientRequest',{'reqId':$rootScope.currentPatient.id,'reqPat':$rootScope.currentPatient.patientNum,'reqTime':$rootScope.currentPatient.awstime})
  // $state.go('templates.patientRequest',{},{location:"replace",reload:true})
}
$scope.playDemoVideo = function() {

$scope.videoPlayerPopup = $ionicPopup.show({
  template: '<div ><p style="color:#fcfff4; margin: -21px 0 0 15px; "></div><div style="position: absolute; margin-top: 0px; margin-bottom: 0; top: 23px;left: 95%; border-radius: 22px; font-size: 4vw; color: teal; text-align: center; padding: 0px; background-color: white; width: 5%;font-weight: bolder;color: #777;" ng-controller="doctorScreensCtrl" ng-Click="closethis();">X</div>'+
      '<iframe style="width: 100%; height: 59%; border: 4px solid green; margin-top: 7%;" src="https://www.youtube-nocookie.com/embed/Nt364t3Vp6I?rel=0&amp;showinfo=0" frameborder="0"  autoplay></iframe>',
  cssClass: 'videoPlayerPopup',
  scope: $scope,

});

$scope.closethis = function()
{
    $scope.videoPlayerPopup.close();
};
// $scope.showModal('templates/video-popover.html');
}


//invite Reviews
$scope.contacts='';
$scope.inviteForReview=function(){
  $scope.contacts = angular.fromJson($window.localStorage['numbersToSendInvites']);

  $scope.allConatctsFetched = angular.fromJson($window.localStorage['allConatctsFetched']);
  console.log($scope.allConatctsFetched);

  console.log($scope.allConatctsFetched.length);

  // $scope.contacts = invitereviews.getinvitecontacts();
	console.log($scope.contacts.length);


  if($scope.contacts.length === 0 && $scope.allConatctsFetched.length === 0)
  {

    $ionicLoading.hide();
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
  else if($scope.allConatctsFetched.length === 0 &&  $scope.contacts.length > 0)
  {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner><br><center>Sending invite</center>'
    })
    $scope.all=2;

    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";
    invitereviews.sendsmstoinvitereviews($scope.contacts,$scope.query,window.localStorage.user,window.localStorage.docTinyUrl,$scope.all).then(function(response){
      if(response){
        console.log(response);
        $ionicLoading.hide();
        $scope.contacts=[];
        window.localStorage['numbersToSendInvites'] = angular.toJson($scope.contacts);
        $state.go("templates.doctor_home")
      }
    }).catch(function(error){
    console.log('failure data', error);
    })

  }
  else if($scope.allConatctsFetched.length > 0 &&  $scope.contacts.length === 0)
  {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner><br><center>Sending invite</center>'
    })
    $scope.all=1;

    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";
    invitereviews.sendsmstoinvitereviews($scope.allConatctsFetched,$scope.query,window.localStorage.user,window.localStorage.docTinyUrl,$scope.all).then(function(response){
      if(response){
        console.log(response);
        $ionicLoading.hide();
        $scope.contacts=[];
        window.localStorage['allConatctsFetched'] = angular.toJson($scope.contacts);
        $state.go("templates.doctor_home")
      }
    }).catch(function(error){
    console.log('failure data', error);
    })

  }
  else {


  }

}
$scope.$on('$destroy', function(){
	console.log('destroyed');
   $interval.cancel(checkNewMessages);

});

});

DoctorQuickApp.controller('doctorprofileCtrl', function($scope, $state, $stateParams, $ionicPopup,$ionicHistory, $timeout, $interval, $rootScope, $cordovaNetwork, $window,$localStorage, $ionicLoading,callacceptedbydoctor,doctorServices,patientrequesttodoctor,searchDoctorServices,medicalSpecialityService) {

$rootScope.headerTxt="Doctor Profile";
$rootScope.showBackBtn=true;
$rootScope.checkedValue = false;
$rootScope.docPhone = window.localStorage.docPhone;

console.log($rootScope.docPhone);
console.log('docprofileview');

$rootScope.docRates=$stateParams.rates;
$rootScope.docTotalRates=$stateParams.totalRates;

$ionicLoading.show({
  templates:'<ion-spinner></ion-spinner>',
  showBackdrop:true

});
$interval(checkDocStatus, 1000);

$scope.myDocDetails1 = angular.fromJson($window.localStorage['myDocDetails1']);


doctorServices.myDoctorsDetails(window.localStorage.docPhone).then(function(response){
  console.log(response[0]['onoff']);
  $rootScope.myDocAvailable=response[0]['onoff'];
  window.localStorage['myDocDetails1'] = angular.toJson(response);

// $scope.myDocDetails1=response;
console.log('doc',$scope.myDocDetails1);
$scope.myDocDetails1 = angular.fromJson($window.localStorage['myDocDetails1']);

var data=$scope.myDocDetails1;//take all json data into this variable
  for(var i=0; i<data.length; i++){

        $rootScope.rates=data[i].ratings,
        $rootScope.totalRates=data[i].ratingCount

        if($rootScope.rates == null ){
          $rootScope.rates=''
        }
        if($rootScope.totalRates == null ){
          $rootScope.totalRates=''
        }
        console.log($rootScope.rates);

        $rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
        console.log('rates',$rootScope.DocRates);
        console.log('total',$rootScope.totalRates);

        console.log('doc',$rootScope.DocRates);

        $scope.ratings = [{
               current: $rootScope.DocRates,
               max: 5,
               total:$rootScope.totalRates
             }, ];
             $scope.getStars = function(rating) {
               // Get the value
               var val = parseFloat(rating);
               // Turn value into number/100
               var size = val/5*100;
               return size + '%';
             }

    }
}).catch(function(error){
console.log('failure data', error);
});

$scope.example = {
       value: new Date()
     };

function checkDocStatus(){

  doctorServices.myDoctorsDetails(window.localStorage.docPhone).then(function(response){
  $scope.myDocDetails1=response;
  // console.log($scope.myDocDetails1);
  var data=$scope.myDocDetails1;//take all json data into this variable
    for(var i=0; i<data.length; i++){

          $rootScope.rates=data[i].ratings,
          $rootScope.totalRates=data[i].totalRates
          $rootScope.onoff=data[i].onoff;
          if($rootScope.myDocAvailable ===  $rootScope.onoff ){

            // console.log('docAvailability',$rootScope.myDocAvailable);
            // console.log($rootScope.myDocAvailable);
          }
          else{
            $scope.example = {
                   value: new Date()
                 };
            $scope.myDocDetails1 = response;
            // $rootScope.counter++;
            $rootScope.myDocAvailable =  $rootScope.onoff ;
            console.log('update data');
          }
          // console.log($rootScope.onoff);
          // console.log($scope.myDocDetails1);

          if($rootScope.rates == null ){
            $rootScope.rates=''
          }
          if($rootScope.totalRates == null ){
            $rootScope.totalRates=''
          }
          // console.log($rootScope.rates);

          $rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
          // console.log('rates',$rootScope.DocRates);
          // console.log('total',$rootScope.totalRates);



      }


  }).catch(function(error){
  console.log('failure data', error);
  });
}



doctorServices.myDoctorsFetched(window.localStorage.user).then(function(response){
    $scope.myConsultedDoctors=response;
    $ionicLoading.hide();
  }).catch(function(error){
console.log('failure data', error);
});

    $scope.checkWalletBalance=function()
    {
      $ionicLoading.show();
      doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
        // console.log(response[0][0]);
      $scope.myBalance=response[0][0];
      window.localStorage.patientWalletBalance=$scope.myBalance;
          console.log('pop up page clicked');

          	var uname = "greet+"+window.localStorage.user;
             var pw = "DQ_patient";
             var persontocall = "greet+" + window.localStorage.docPhone;

            //  var persontocall = "greet+" + window.localStorage.consultedDoctor;


             console.log(uname);
             console.log(persontocall);

             var success = function(message)
              {
                  console.log(message);
              }
              var failure = function()
              {
                console.log("Error calling Hello Plugin");
              }


        if($scope.myBalance >= 270)
        {

          // hello.greet(uname,pw,persontocall,success, failure);


          var confirmPopup = $ionicPopup.confirm({
            template: '<b>Request for Video call has been sent <br><center>00:02</center></b>',
            cssClass: 'videoPopup',
            scope: $scope,
            buttons: [
               { text: 'Cancel',
                 type: 'button-royal', },

               {
               text: 'Resend',
               type: 'button-positive',

               },
             ]
            //templateUrl: "views/app/viewdoctor_profile.html",
          });


        }
        else
        {

          var confirmPopup = $ionicPopup.confirm({
            template: '<center><b>Your request could not be processed as your<br>DoctorQuick deposit is less than ₹270.</b></center> ',
            cssClass: 'videoPopup',
            scope: $scope,
            buttons: [
             	{
                text: 'Cancel',
                type: 'button-royal', },
             	{

             	text: 'Topup',
             	type: 'button-positive',
               onTap: function(e) {
                 	$state.go('app.patient_topup');
               }

             	},
             ]
            //templateUrl: "views/app/viewdoctor_profile.html",
          });

        }
          $ionicLoading.hide();
        }).catch(function(error){
      console.log('failure data', error);
      });

    }
//for voice call
$scope.BalanceForVoiceCall=function()
{
        $ionicLoading.show();
        doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
        // console.log(response[0][0]);
        $scope.myBalance=response[0][0];
        var uname = "greet+"+window.localStorage.user;
        var pw = "DQ_patient";

        //var persontocall = "greet+" + window.localStorage.docPhone;
        var persontocall = "greet+" + window.localStorage.consultedDoctor;
        console.log(uname);
        console.log(persontocall);

        var success = function(message)
        {
        alert(message);
        }
        var failure = function()
        {
        alert("Error calling Hello Plugin");
        }



        if($scope.myBalance >= 270)
        {
        hello.audiocallvsee(uname,pw,persontocall,success, failure);
        var confirmPopup = $ionicPopup.confirm({
        template: '<b>Request for Voice call has been sent <br><center>00:02</center></b>',
        cssClass: 'videoPopup',
        scope: $scope,
        buttons: [
        { text: 'Cancel',
        type: 'button-royal', },

        {
        text: 'Resend',
        type: 'button-positive',

        },
        ]
        //templateUrl: "views/app/viewdoctor_profile.html",
        });
        }
        else
        {
        var confirmPopup = $ionicPopup.confirm({
        template: '<center>Your request could not be processed as your DoctorQuick deposit is less than ₹270.</center> ',
        cssClass: 'videoPopup',
        scope: $scope,
        buttons: [
        {
        text: 'Cancel',
        type: 'button-royal', },
        {
        text: 'Topup',
        type: 'button-positive',
        onTap: function(e) {
        $state.go('app.patient_topup');
        }
        },
        ]
        //templateUrl: "views/app/viewdoctor_profile.html",
        });
        }
        $ionicLoading.hide();
        }).catch(function(error){
        console.log('failure data', error);
        });

}

    doctorServices.myDoctorsDetails(window.localStorage.consultedDoctor).then(function(response){
    $scope.myDocDetails=response;
    }).catch(function(error){
    console.log('failure data', error);
    });

    $scope.updateDocPwd=function(){
      $rootScope.ratedBy=$scope.login.userPhone;
      console.log('dddd');
      // var newPwd={
      // newPwd1:$scope.login.password,
      // userPhone:window.localStorage.user
      // };
      // console.log(newPwd);
      // patientProfileDetailsService.changePwd2(newPwd)
      // .then(function(response){
      // console.log(response);
      //
      // }).catch(function(error){
      // console.log('failure data', error);
      // });

    }
    // $scope.sendOfflineRequest=function()
    // {
    //   patientrequesttodoctor.sendOfflineMessage(window.localStorage.user).then(function(response)
    //   {
    //     $scope.otp=response;
    //     console.log($scope.otp);
    //   }).catch(function(error)
    //   {
    //     console.log('failure data', error);
    //   });
    //
    // }
    $scope.sendOfflineMessage=function(num){
  		var sendMessage={
  			patient:window.localStorage.user,
  			doctor:num
  		}
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'
      });
      console.log(sendMessage);
  		searchDoctorServices.sendOfflineMessage(sendMessage).then(function(response){
  			console.log(response);
        if(response){
          console.log('hide loading');
          $ionicLoading.hide();
          var confirmPopup = $ionicPopup.confirm({
          			template: '<center>You will be notified once the Doctor is available</center>',
          			cssClass: 'videoPopup',
          			scope: $scope,
          			buttons: [
          			{
          				text: 'OK',
          				type: 'button-positive',
          				onTap: function(e) {
          				console.log('OK');
          				}
          			},
          			]
          		});


        }

  		}).catch(function(error){
  		console.log('failure data', error);
  		});
  	}

    $scope.$watch('myDocStatus', function (newValue, oldValue, scope){
       console.log('changed');
       console.log('oldValue',oldValue);
       console.log('newValue',newValue);

       if(newValue == 2){
         $scope.callReqPopUp.close();

         var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer interval
           $scope.$on('$destroy', function(){
           $timeout.cancel(patientTimeout);
           console.log('destroyed');
         });

         searchDoctorServices.declineOne2oneReqPatient(window.localStorage.myCallId).then(function(response){
         $scope.declinedByPat=response;
         window.localStorage.myCallId=0;
         window.localStorage.callStatus=0;
         console.log($scope.declinedByPat);
         }).catch(function(error){
           console.log('failure data', error);
         });

         $scope.alertPopup = $ionicPopup.alert({
           // title: 'Declined!',
           template: "<div>Doctor did not accept your consultation</div>",
           cssClass: 'requestPopup',
           scope: $scope,
         });
           alertPopup.then(function(res) {
             var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer inerval
             $scope.$on('$destroy', function(){
             $timeout.cancel(patientTimeout);
             console.log('destroyed');
             console.log("callID:",window.localStorage.myCallId);
             $scope.callAccept.close();
             $window.location.reload();



             });
           $state.go("app.patient_home");
           $ionicHistory.clearHistory();
         });
       }

    },true);

    function checkDocStatusOnTheGo(){
      console.log($rootScope.onGoingDoc);
      searchDoctorServices.checkDocStatusOnTheGo($rootScope.onGoingDoc).then(function(response){
        console.log(window.localStorage.myCallId);
      $scope.myDocStat = response;
      console.log($scope.myDocStat);
      window.localStorage.myDocStatus=$scope.myDocStat;
      $scope.myDocStatus=window.localStorage.myDocStatus;
      })
    }


  	function checkMyCallStatus(){
  		searchDoctorServices.checkCallStatus(window.localStorage.myCallId).then(function(response){
  			console.log(window.localStorage.myCallId);
  		$scope.myCalStat = response;
  		// console.log($scope.myCalStat[0][0]);
  		window.localStorage.myCallStatus=$scope.myCalStat[0][0];
  		$scope.checkMyStatus=window.localStorage.myCallStatus;
  		})
  	}
  	$scope.$watch('checkMyStatus', function (newValue, oldValue, scope){
  		 console.log('changed');
       if(newValue == 4){
         $scope.callReqPopUp.close();
         var alertPopup = $ionicPopup.alert({
           // title: 'Declined!',
           template: "<div ><p>Doctor did not accept your request</p></div>",
           cssClass: 'requestPopup',
           scope: $scope,
         });
           alertPopup.then(function(res){
             var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer interval
             $scope.$on('$destroy', function(){
               $scope.callAccept.close();

             $timeout.cancel(patientTimeout);
             console.log('destroyed');
             });

             searchDoctorServices.declineOne2oneReqPatient(window.localStorage.myCallId).then(function(response){
             $scope.declinedByPat=response;
             window.localStorage.myCallId=0;
             window.localStorage.callStatus=0;
             console.log($scope.declinedByPat);
             // $scope.alertPopup.hide();
             $scope.callAccept.close();
             }).catch(function(error){
               console.log('failure data', error);
             });
              // $state.reaload();
             $state.go("app.patient_home");
           $ionicHistory.clearHistory();
         });
       }
  		 else if(newValue == 2){
  			 console.log('changed call val');
  			 $scope.callReqPopUp.close();
  			 setTimeout(function (){
  						console.log('delay 3 sec');
  					}, 3000);
  					console.log('value changed');
            // $interval.cancel(checkMyCallStatus);

            console.log('show popup');
  					$scope.callAccept = $ionicPopup.show({
  				 			 template: "<div >Doctor has accepted your invitation for a<br>consultation. Please start the<br>consultation or decline</div>",
  				 			 cssClass: 'requestPopup',
  				 			 scope: $scope,
  				 			 buttons: [
  				 			 {
  				 			 text: 'Decline',
  				 			 type: 'button-royal',
  				 			 onTap:function(){
  				 				 console.log('cancel');
  				 				 console.log(window.localStorage.user);
                   $interval.cancel(checkMyCallStatus);
  								 $scope.callReqPopUp.close();
  								  searchDoctorServices.declineOne2oneReqPatient(window.localStorage.myCallId).then(function(response){
  								  $scope.declinedByPat=response;
  									window.localStorage.myCallId=0;
  									window.localStorage.callStatus=0;
  									console.log($scope.declinedByPat);
  								  }).catch(function(error){
  								  	console.log('failure data', error);
  								  });
  									$state.go($state.current, {}, {reload: true});
  				 			 }
  				 			 },
  							 {
  							  text: 'Start',
  							  type: 'button-assertive',
  							  onTap:function(){

  									var videocallflag = $rootScope.callType;
                    console.log(videocallflag);
  									$scope.startdate = new Date();
  									$scope.callid = $rootScope.callId;
  									// window.localStorage.ViewDoc=1;
                    $interval.cancel(checkMyCallStatus);
  									console.log(window.localStorage.networkType);
  									var uname = "greet+"+window.localStorage.user;
  									var pw = "DQ_patient";

  										 var persontocall = "greet+" + $rootScope.docNumToCall;
  										 console.log(uname);
  										 console.log(persontocall);

  									if(window.localStorage.networkType == 'None')
  									{
  										var confirmPopup = $ionicPopup.confirm({
  														title: 'DoctorQuick',
  														template: 'You are Offline ',
  														cssClass: 'videoPopup',
  														scope: $scope,
  														buttons: [
  															{
  																text: 'Ok',
  																type: 'button-royal',
  																onTap: function(e) {
  																console.log('offline');
  																}
  															},
  														]
  													});
  									}
  									else if(window.localStorage.networkType == 'Unknown' || window.localStorage.networkType == 'Ethernet' || window.localStorage.networkType == '2G' || window.localStorage.networkType == '3G')
  									{
  										var confirmPopup = $ionicPopup.confirm({
  														// title: 'DoctorQuick',
  														template: 'We detected slow nwtwork on your device. Please try after sometime ',
  														cssClass: 'videoPopup',
  														scope: $scope,
  														buttons: [
  															{
  																text: 'OK',
  																type: 'button-positive',
  																onTap: function(e) {
  																console.log('ok');
  																}
  															},
  														]
  													});
  									}
  									else if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi' )
  									{
                        console.log(videocallflag);
  										var success = function(message)
  										{

  												$ionicHistory.nextViewOptions({
  												disableAnimate: true,
  												disableBack: true
  											 });
  												//
  												$scope.enddate = new Date();
  												console.log(window.localStorage.user);
  												console.log($rootScope.accptdDoc);
  												// console.log(window.localStorage.Doctocall);

  												callacceptedbydoctor.accpeteddoctor(window.localStorage.user,$rootScope.docNumToCall,videocallflag,$scope.startdate,$scope.enddate,window.localStorage.myCallId).then(function(response){
  													console.log('inserted to consultation',response);
                            $state.go('app.patient_summary',{calledDoctor:$rootScope.docNumToCall,consultId:window.localStorage.myCallId}, {location: "replace", reload: false});
  					              }).catch(function(error){
  					              console.log('failure data', error);
  					              });
  										}
  										var failure = function()
  										{
  											alert("Error calling Hello Plugin");
  										}
                      if(videocallflag == 5){
                        hello.greet(uname,pw,persontocall,success, failure);
                      }
                      if(videocallflag == 6){
                        hello.audiocallvsee(uname,pw,persontocall,success, failure);
                      }
  									}
  									else{
  										//Do nNothing
  									}
  							  }
  							  },
  				 		 ]

  				 		 });
  		 }
       else{
         //do nothing
       }

  	},true);

    $scope.callMyDoc=function(num,type)
    {
      console.log(num);
      console.log(type);
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'
      });
      $rootScope.onGoingDoc=num;
      $rootScope.callType=type;
      console.log(type);
      $rootScope.docNumToCall = num;
      $interval(checkMyCallStatus,2000);
      $interval(checkDocStatusOnTheGo,2000);

      var callRequest={
        patient:window.localStorage.user,
        doctor:$rootScope.docNumToCall,
        subPatient:window.localStorage.selectedSubPatient
        // callId:$rootScope.callId
      }
      console.log(window.localStorage.selectedSubPatient);
      doctorServices.checkMyBalance(window.localStorage.user).then(function(response){
        $scope.patientWalletdetails=response;
        if($rootScope.patientWalletdetails === 'agent'){
          // alert('agent');
          $rootScope.myWalletBal='agent';
        }
        else{
          console.log($rootScope.patientWalletdetails);
          $rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
          $rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

          $rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;

          console.log($rootScope.myWalletBal);
        }
              $rootScope.counter = 0;
        if($scope.myWalletBal >= 270 || $scope.myWalletBal === 'agent')
        {
              console.log(callRequest);
              if(window.localStorage.networkType == '4G' || window.localStorage.networkType == 'WiFi'){
                searchDoctorServices.requestForCall(callRequest).then(function(response){
                console.log('one2oneReq',response);
                window.localStorage['one2oneReq'] = angular.toJson(response);
                $rootScope.one2oneReq = angular.fromJson($window.localStorage['one2oneReq']);
                window.localStorage.myCallId = $rootScope.one2oneReq.reqId;

                console.log(window.localStorage.myCallId);
                console.log($rootScope.one2oneReq.callStatus);

                }).catch(function(error){
                console.log('failure data', error);
                });

            // hello.greet(uname,pw,persontocall,success, failure);
            $rootScope.counter = 120;
            $rootScope.onTimeout = function(){
              console.log($rootScope.counter);
              $rootScope.counter--;
              patientTimeout = $timeout($rootScope.onTimeout,1000);
              if($rootScope.counter == 0){
              console.log('one minute over');
              $rootScope.buttonText='Send Request';
              $timeout.cancel(patientTimeout);

              var noResponsePopup = $ionicPopup.alert({
              template: "<div ><p>Doctor did not accept your request</p></div>",
              cssClass: 'requestPopup',
              scope: $scope,
              });

              noResponsePopup.then(function(res){
                console.log('delete request here');
                searchDoctorServices.cancelOne2oneReq(window.localStorage.myCallId).then(function(response){
                  $scope.alertPopup.close();

                $scope.cancelledReq=response;
                window.localStorage.myCallId=0;
                window.localStorage.callStatus=0;
                console.log($scope.cancelledReq);
                }).catch(function(error){
                  console.log('failure data', error);
                });
              });
              $scope.callReqPopUp.close();

              }
            }

              var patientTimeout = $timeout($rootScope.onTimeout,1000);//timer interval
              $scope.$on('$destroy', function(){
              $timeout.cancel(patientTimeout);
              console.log('destroyed');
              });



            $scope.callReqPopUp = $ionicPopup.show({
                 template: "<div >Your request for a<br>video call has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
                 cssClass: 'requestPopup',
                 scope: $scope,
                 buttons: [
                 {
                 text: 'Cancel',
                 type: 'button-royal',
                 onTap:function(){
                   console.log('cancel');
                   console.log($rootScope.counter);
                   console.log(window.localStorage.user);
                   $scope.callReqPopUp.close();
                    $state.go($state.current, {}, {reload: true});
                    searchDoctorServices.cancelOne2oneReq(window.localStorage.myCallId).then(function(response){
                    $scope.cancelledReq=response;
                    window.localStorage.myCallId=0;
                    window.localStorage.callStatus=0;
                    console.log($scope.cancelledReq);
                    }).catch(function(error){
                      console.log('failure data', error);
                    });

                 }
                 },

               ]

               });

              }
              else{
                var slowData = $ionicPopup.confirm({
    							// title: 'Slow Data',
    							template: 'Unable to send request at the moment as we detected slow network on your device. Please try after sometime ',
    							cssClass: 'videoPopup',
    							scope: $scope,
    							buttons: [
    							{
    								text: 'OK',
    								type: 'button-positive',
    								onTap: function(e) {
    								console.log('ok');
    								}
    							},
    							]
    						});
              }

        }
        else
        {

          var confirmPopup = $ionicPopup.confirm({
      						title: 'DoctorQuick',
      						template: '<center><b>You can not send request now as your Wallet Balance is low</b></center> ',
      						cssClass: 'videoPopup',
      						scope: $scope,
      						buttons: [
                   {
      								text: 'Cancel',
      								type: 'button-royal',
      								onTap: function(e) {
                       $ionicHistory.nextViewOptions({
                         disableAnimate: true,
                         disableBack: true
                       });
                       $state.go('app.patient_home',{}, {location: "replace", reload: false})
      								}
      							},
      							{
      								text: 'Topup',
      								type: 'button-positive',
      								onTap: function(e) {
                       $ionicHistory.nextViewOptions({
                         disableAnimate: true,
                         disableBack: true
                       });
                       $state.go('app.patient_topup',{}, {location: "replace", reload: false});
      								}
      							},

      						]
      					});

        }
          $ionicLoading.hide();
        }).catch(function(error){
      console.log('failure data', error);
      });

    }

    $scope.patient_details = angular.fromJson($window.localStorage['patientDetails']);
    console.log($scope.patient_details);
    $rootScope.defaultPatientFname=$scope.patient_details[0][0];
    $rootScope.defaultPatientLname=$scope.patient_details[0][2];
    $rootScope.defaultPatientNum=$scope.patient_details[0][5];


    console.log($rootScope.defaultPatientFname);
    console.log($rootScope.defaultPatientLname);

    $scope.patientToConsult='';
    $scope.changePatient=function (val) {
      $state.go("app.subPatientList");
    }
    $scope.editNewPatient=function () {
     if(window.localStorage.newPatientVal == 0){
       console.log('select patient to edit');
     }
     else if(window.localStorage.newPatientVal === window.localStorage.user || window.localStorage.newPatientVal === 'new'){
       console.log('can not edit default patient');
     }
     else{
       $state.go("app.editPatient",{id:window.localStorage.newPatientVal});

     }


    }
    var subPatientToShow={
      subPatId:window.localStorage.selectedSubPatient,
      mainPatient:window.localStorage.user
    }
    medicalSpecialityService.selectSubPatient(subPatientToShow).then(function(response){
       $rootScope.newPAtient=response;
       console.log($rootScope.newPAtient.length);
       if($rootScope.newPAtient.length == 0){
         console.log('hide');
         $rootScope.defaultPatient=false;
         $rootScope.shownewPatient=true;

       }
       else{
         $rootScope.defaultPatient=true;
         $rootScope.shownewPatient=false;
       }
    }).catch(function(error){
        console.log('failure data', error);
    });
})

DoctorQuickApp.controller('loadingDoctor', function($state,$scope,$rootScope,$interval, $ionicConfig, $ionicHistory,$timeout, $window, $localStorage, $ionicLoading, doctorServices,rateDoctorServices,LoginService,doctoronoffdetails) {



  var username = "greet+"+window.localStorage.user;
  var password = "DQ_doctor";
  function checkNewMessages()
  {
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


  $timeout( function() {
    $scope.deviceAndroid = ionic.Platform.isAndroid();
    console.log($scope.deviceAndroid);

        $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick',
        duration:7000
        });
    var uname1 = "greet+"+window.localStorage.user;
    var pw1 = "DQ_doctor";

    // window.plugins.OneSignal.getIds(function(ids) {
    //   $scope.playerId=JSON.stringify(ids['userId']);
    //   // console.log($scope.playerId);
    //   var updatePlayer ={
    //     palyerId:$scope.playerId,
    //     userNum:window.localStorage.user,
    //     user:'doctor'
    //   }
    //   console.log(updatePlayer);
    //   LoginService.updatePlayer(updatePlayer).then(function(response){
    //     console.log(response);
    //   })
    // });

    doctorServices.doctorDetails(window.localStorage.user).then(function(response,data){
      $rootScope.doctor_details=response;//store the response array in doctor details
      console.log($rootScope.doctor_details);
      window.localStorage['doctorDetails'] = angular.toJson(response);

    }).catch(function(error){
      console.log('failure data', error);
    });
    doctorServices.notifyPatient(window.localStorage.user).then(function(response){
      console.log(response);
    })
    var whichdoctoronoff = {
      doctorphno : window.localStorage.user,
      onoff : 1
    }
    doctoronoffdetails.doctoronoff(whichdoctoronoff).then(function(response){
    console.log(response);
    }).catch(function(error){
    console.log('failure data', error);
    });


    if($scope.deviceAndroid === true){

        var success = function(message)
        {
          $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
          // alert('loggedin');
          $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
          });
          $interval.cancel(loginStatus);
          $state.go('templates.doctor_home', {}, {location: "replace", reload: false});
          });
        // alert(message);
        }
        var failure = function()
        {
        alert("Error calling Hello Plugin");
        }

        hello.login(uname1,pw1,success, failure);
        $timeout( function(){
        console.log('interval started');
        var username = "greet+"+window.localStorage.user;
        var password = "DQ_doctor";
          $rootScope.checkNewMessages = $interval(function(){
          //code goes here
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
          }, 1000);
        }, 3000);

    }
    else{

          var success = function(message)
          {
          // alert(message);
          $scope.iosLoggin=message;
          window.localStorage.iosLogin=$scope.iosLoggin;

          }
          var failure = function()
          {

          alert("Error calling Hello Plugin");

          }

          hello.login(uname1,pw1,success, failure);

          $timeout( function(){
          console.log('interval started');
          $interval(loginStatus,2000,1);
          // $interval(checkNewMessages,2000);

          }, 10000 );


            var username = "greet+"+window.localStorage.user;
            var password = "DQ_doctor";

            function checkNewMessages()
            {
                var success = function(message)
                {
                  $rootScope.unreadchatforpatient = message;
                  console.log($rootScope.unreadchatforpatient);
                }

                var failure = function()
                {
                  console.log("Error calling Hello Plugin");
                  //console.log(‘error’);

                }
                  hello.unreadchatfromusers(username,password,success, failure);
            }
            function loginStatus() {
              var success = function(message)
              {
                // alert(message);
                $ionicLoading.hide().then(function(){
                console.log("The loading indicator is now hidden");
                // alert('loggedin');
                $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
                });
                $interval.cancel(loginStatus);
                $state.go('templates.doctor_home', {}, {location: "replace", reload: false});
                });

              }

              var failure = function()
              {
                alert("Error Occurred While Loggin in to DoctoQuick");
              }
              hello.loginstatus(success,failure);
            }

    }


  }, 0);


})


DoctorQuickApp.controller('notesCtrl', function($scope,$state,$window,$rootScope,$localStorage,$ionicConfig,$ionicLoading,$stateParams,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,patientProfileDetailsService,doctorServices,medicalSpecialityService) {

  $scope.toggle = true;
	$rootScope.showBackBtn=false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.inviteButton = false;

  $scope.deviceAndroid = ionic.Platform.isAndroid();
  if($scope.deviceAndroid === false){
    window.localStorage.sendPrescTo='';
  }
  console.log(window.localStorage.subPatientId);
  console.log(window.localStorage.patientNum);

console.log("inNotesCOntoller:",$state.$current.name);
if($state.$current.name === 'templates.prescription'){
    $rootScope.headerTxt="Notes";
    $rootScope.hideSideMenu = false;
    $scope.currentPatient={};
    // $window.location.reload();
    // $scope.newpatientAdded=doctorServices.getNewPatient();
    // console.log($rootScope.newpatientAdded);

    $rootScope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
    console.log($rootScope.currentPatient);
    window.localStorage.patientToDisplay=$rootScope.currentPatient.patientNum;
    $rootScope.patientFname=$scope.currentPatient.patientFname;
    $rootScope.patientLname=$scope.currentPatient.patientLname;
    $rootScope.patientAge=$scope.currentPatient.patientAge;
    $rootScope.patientSex=$scope.currentPatient.patientSex;
    $rootScope.patientImage=$scope.currentPatient.image;
    $rootScope.dateAndTime=$scope.currentPatient.requestedTime;
    $rootScope.reqId=$scope.currentPatient.id;
    $rootScope.patientNum=$scope.currentPatient.patientNum;
    $rootScope.subPatientId=$scope.currentPatient.subPatientId;

    window.localStorage.reqPat = $stateParams.reqPat;

    var patientToDisplay =window.localStorage.patientToDisplay;
    var subPatientToShow ={
      subPatId:window.localStorage.subPatientId,
      mainPatient:window.localStorage.patientNum
    }
    console.log(subPatientToShow);
    medicalSpecialityService.selectSubPatient(subPatientToShow).then(function(response){
       $rootScope.subPatientDetails=response;
       console.log($rootScope.subPatientDetails);
       console.log($rootScope.subPatientDetails.length);
       if($rootScope.subPatientDetails.length == 0){
         console.log('hide');
         $rootScope.defaultPatient=false;
         $rootScope.shownewPatient=true;

       }
       else{
         $rootScope.defaultPatient=true;
         $rootScope.shownewPatient=false;
       }
    }).catch(function(error){
        console.log('failure data', error);
    });
    // console.log(patientToDisplay);
    if(!patientToDisplay){
      patientProfileDetailsService.fetchPatient($stateParams.reqPat).then(function(response){
        $scope.patient_details=response;
        console.log($scope.patient_details.subPatientId);
        $ionicLoading.hide();
      }).catch(function(error){
        console.log('failure data', error);
      })
    }
    else{
      console.log('from localStorage',$rootScope.currentPatient.patientNum);
      patientProfileDetailsService.fetchPatient($rootScope.currentPatient.patientNum).then(function(response){
        $scope.patient_details=response;
        console.log($scope.patient_details);
        $ionicLoading.hide();
      }).catch(function(error){
        console.log('failure data', error);
      })
    }

    $ionicLoading.show();


}

else {
  $rootScope.headerTxt="Prescription";
  $rootScope.hideSideMenu = true;
  window.localStorage.activePatient=$stateParams.reqPat;
  $scope.subPatient='';
  window.localStorage.showConnecting =false;
  // $scope.newpatientAdded=doctorServices.getNewPatient();
  // $scope.newPatientFname=$scope.newpatientAdded.fname;
  // $scope.newPatientLname=$scope.newpatientAdded.lname;
  //
  // console.log($scope.newpatientAdded.fname);
  // console.log($scope.newpatientAdded.lname);
  $scope.selectedPatient=function(id){
    console.log(id);
    console.log('selected patient',$scope.subPatient.id);
  }
  medicalSpecialityService.getSubPatients($stateParams.reqPat)
   .then(function(response){
     $scope.subPatients = response;
     console.log($scope.subPatients);
   }).catch(function(error){
      console.log('failure data', error);
   });

  patientProfileDetailsService.fetchPatient($stateParams.reqPat).then(function(response){
    $scope.patient_details=response;
    console.log($scope.patient_details);
    $ionicLoading.hide();
  }).catch(function(error){
    console.log('failure data', error);
  })
}



})

 DoctorQuickApp.controller('patientrequestCtrl', function($scope,$window,$rootScope,$state,$localStorage,$stateParams,$interval,$location,$ionicPlatform,$ionicHistory,$timeout,$ionicPopup,$ionicConfig,$ionicLoading,patientrequesttodoctor,doctorServices,patientProfileDetailsService,medicalSpecialityService) {
			  $scope.toggle = true;
				$rootScope.headerTxt="Request";
				$rootScope.showBackBtn=true;
				$rootScope.showNotification=false;
				$rootScope.hideSideMenu = true;
				$rootScope.showBadge=false;
        $rootScope.inviteButton = false;


				$scope.toggleText = "Accept";
				console.log($state.$current.name);
				// if($state.$current.name === "templates.viewPatientRequest"){
				// 	alert("check for notification id existance here");
				// 	alert("Patient:",$stateParams.reqPat,"reqId:",$stateParams.reqId);
				// }

				$timeout( function(){
						console.log('interval started');
						if($state.$current.name === "templates.viewPatientRequest"){
							$rootScope.showBackBtn=false;
							$rootScope.hideSideMenu = false;
							$scope.deviceAndroid = ionic.Platform.isAndroid();
							console.log($scope.deviceAndroid);

							doctorServices.pushReqStatus($stateParams.reqId).then(function(response){
								console.log('exp',response);
									var uname1 = "greet+"+window.localStorage.user;
									var pw1 = "DQ_doctor";

									$ionicLoading.show({
									template: '<ion-spinner></ion-spinner><br><br>Preparing for Consultation.'
									});

									if($scope.deviceAndroid === true){
										// alert($stateParams.reqId);
										var success = function(message)
										{
										$ionicLoading.hide();
										console.log(message);
										$ionicHistory.nextViewOptions({
										disableAnimate: true,
										disableBack: true
										});
										$state.go($state.$current, {}, {location: "replace", reload: false});
										// alert(message);
										}
										var failure = function()
										{

										alert("Error calling Hello Plugin");
										}
										$ionicLoading.hide();
										hello.login(uname1,pw1,success, failure);

									}
									else{

									$ionicLoading.show({
									template: '<ion-spinner></ion-spinner><br><br>Preparing for Consultation.'
									});
									var success = function(message)
									{
									// alert(message);
									$scope.iosLoggin=message;
									window.localStorage.iosLogin=$scope.iosLoggin;

									}
									var failure = function()
									{

									alert("Error calling Hello Plugin");

									}

									hello.login(uname1,pw1,success, failure);

									$timeout( function(){
									console.log('interval started');
									$interval(loginStatus,2000,1);
									}, 10000 );

									function loginStatus() {
									var success = function(message)
									{
									// alert(message);
									$ionicLoading.hide().then(function(){
									console.log("The loading indicator is now hidden");
									// alert('loggedin');
									$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
									});
									$interval.cancel(loginStatus);

									$state.go($state.$current, {}, {location: "replace", reload: false});
									});

									}

									var failure = function()
									{
									alert("Error Occurred While Loggin in to DoctoQuick");
									}
									hello.loginstatus(success,failure);
									}

									}
								// }elsee
							// console.log('one2onePending:',$scope.one2oneRequests);
							})

						}
					}, 2000 );


					$rootScope.pushReqId=$stateParams.reqId;
					$rootScope.pushReqPat=$stateParams.reqPat;
					$rootScope.dateAndTime=$stateParams.reqTime;


					console.log('from previous',$rootScope.dateAndTime);
					console.log('from previous stateParams',$stateParams.reqTime);

					// doctorServices.currentPatient($stateParams.reqPat).then(function(response){
					// 	console.log(response);
					// window.localStorage['currentPatient'] = angular.toJson(response);
					// // console.log('one2onePending:',$scope.one2oneRequests);
					// })


					console.log('from root scope',$rootScope.dateAndTime);


					// alert($rootScope.dateAndTime);
					 console.log('reqId',$rootScope.pushReqId)
					 console.log('reqPat',$rootScope.pushReqPat)
					 var consltDetails ={
						 reqId:$stateParams.reqId,
						 reqPat:$stateParams.reqPat
					 }


           $rootScope.reqPatDetails1 = angular.fromJson($window.localStorage['currentPatient']);
           $ionicLoading.show({
             template:'<ion-spinner></ion-spinner>'
           })
           console.log($rootScope.reqPatDetails1);
					 console.log('consutation:',consltDetails);
					 console.log($rootScope.existingId);
					 doctorServices.fetchReqPatientDetails(consltDetails).then(function(response){
						 console.log('Response::',response);
             if(response){
               $ionicLoading.hide();

             }
					 $rootScope.reqPatDetails=response;
					 var data=$rootScope.reqPatDetails//take all json data into this variable
					 		for(var i=0; i<data.length; i++){
			 						$rootScope.reqId=data[i].id,
			 						$rootScope.reqPat=data[i].patientPhone,
                  $rootScope.subPatientId=data[i].subPatientId,
									// $rootScope.dateAndTime=data[i].requestedTime
					 		console.log($rootScope.reqId);
					 		console.log($rootScope.reqPat);
              console.log($rootScope.subPatientId);
              window.localStorage.currentReqId=$rootScope.reqId;
					 		}

					  //  $state.go($state.current, {}, {reload: true});
					 }).catch(function(error){
					 console.log('failure data', error);
					 });


					 $scope.deviceAndroid = ionic.Platform.isAndroid();

					 $scope.currentPatient={};
					 $scope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
			     // console.log('current patient',$scope.currentPatient);
					 $rootScope.patientNum=$scope.currentPatient.patientNum;
           $rootScope.subPatientId=$scope.currentPatient.subPatientId;

           console.log($rootScope.subPatientId);
           window.localStorage.subPatientId=$rootScope.subPatientId;
           window.localStorage.patientNum=$rootScope.patientNum;




			 	$scope.CurrentDate = new Date();
				$rootScope.dateDiff=$rootScope.dateAndTime-$scope.CurrentDate;

				// alert('DateDiff',$scope.CurrentDate);
				$rootScope.closeDocPopUp=false;
				////// calculate datedifference////
					var timestamp = new Date($rootScope.dateAndTime).getTime();
					var tt = $rootScope.dateAndTime;
					var date_test = new Date(tt.replace(/-/g,"/"));
					console.log('converted date and time',date_test);
					var timestamp = new Date(date_test).getTime();
					var currentTimestamp = new Date($scope.CurrentDate).getTime();
					console.log('from date and time',$rootScope.dateAndTime);
					console.log('current date and time',$scope.CurrentDate);
					var justdate = $rootScope.dateAndTime;

					var t = justdate.split(/[- :]/);

          // Apply each element to the Date function
          var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
          var actiondate = new Date(d);

          var timestamp = new Date(actiondate).getTime();


          console.log('actiondate',timestamp);

					console.log('timestamp',timestamp);
					console.log('currentTimestamp',currentTimestamp);



					var diffMs = (currentTimestamp - timestamp);
					var diffDays = Math.round(diffMs / 86400000); // days
					var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
					var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

					console.log('diffDays',diffDays);
					console.log('diffMins',diffMins);
				  console.log('diffHrs',diffHrs);
          $rootScope.requestedDUration= diffMins+ " Minutes"+" ago";
          // next line displys hr min and sec
					// $rootScope.requestedDUration= diffDays + " days, " + diffHrs + " Hours, " + diffMins+ " Minutes"+" ago";
					// $rootScope.requestedDUration= diffDays + " day " + "ago";
					console.log($rootScope.requestedDUration);
					var diff = currentTimestamp-timestamp;
					console.log('diff',diff);

					console.log('diffDays',diffDays);
					console.log('diffHrs',diffHrs);
					console.log('diffMins',diffMins);
					console.log('timestamp',timestamp);
					console.log('currentTimestamp',currentTimestamp);

					var diffMs = (currentTimestamp - timestamp);
					console.log('datedifference in min',diffMs);


				//////
					$rootScope.callReq=false;
					$rootScope.callAcc=true;
					$rootScope.timer=true;

    $scope.type = '';
    $scope.setType = function(event){
    $scope.isDisabled = false;
    $scope.type = angular.element(event.target).text();
		console.log($scope.type);
		if($scope.type === 'Decline' && window.localStorage.accpt === 1){

				console.log('cant Decline now');

		}
		else if($scope.type === 'Accept'){
			window.localStorage.accpt=1;
			$scope.isDisabled = true;
			$scope.toggleText ='Accepted';
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'
      })
			doctorServices.pushReqStatus($stateParams.reqId).then(function(response){
				// alert('this alert is showing');
				if(response === '"expired"'){
          $ionicLoading.hide();
					$rootScope.expiredReq = $ionicPopup.show({
					template: "<div >This Request has been served/Expired </b></div>",
					cssClass: 'requestPopup',
					scope: $scope,
					buttons: [
					{
					text: 'OK',
					type: 'button-positive',
					onTap:function(){
					console.log('cancel');
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});
						$state.go('templates.doctor_home',{}, {location: "replace", reload: false})
					}
					},
					]
					});
				}
				else{
                $ionicLoading.hide();

								$rootScope.chekDiag=false;
								$rootScope.chekTests=false;
								$rootScope.chekMedi=false;

								$rootScope.callReq=true;
								$rootScope.callAcc=false;
								$rootScope.timer=false;

								var accptdReq = {
								accpetcode : "2",
								doctorphno : window.localStorage.user,
								patientphno : $rootScope.reqPat,
								consultId:$rootScope.reqId
								}
								console.log('accptdReq',accptdReq);
								patientrequesttodoctor.accpetedbydoctor(accptdReq).then(function(response){
									$scope.reqStatus=response;
									console.log('updatedResponse:',response);
														if($scope.reqStatus == 'alreadyupdated'){
																	$rootScope.callReqPopUp = $ionicPopup.show({
																	title:"Sorry!!!",
																	template: "<div >This Request has been served already</b></div>",
																	cssClass: 'requestPopup',
																	scope: $scope,
																	buttons: [
																	{
																	text: 'OK',
																	type: 'button-positive',
																	onTap:function(){
																	console.log('cancel');
																	$ionicHistory.nextViewOptions({
																		disableAnimate: true,
																		disableBack: true
																	});
																		$state.go('templates.doctor_home',{}, {location: "replace", reload: false})
																	}
																	},
																	]
																	});


														}
														else{
																  if(window.localStorage.networkType === '4G' || window.localStorage.networkType === 'WiFi' || window.localStorage.networkType === 'Unknown'){
																				// $interval(videoOrAudio,2000);
                                        $ionicLoading.hide();
                                        $rootScope.callReqPopUp = $ionicPopup.show({
																					template: "<div >Please wait for the call<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
																					cssClass: 'requestPopup',
																					scope: $scope,
																					buttons: [
																					{
																					text: 'Cancel',
																					type: 'button-royal',
																					onTap:function(){
																						$interval.cancel($rootScope.videoOrAudio);
																						$interval.cancel($rootScope.checkAcceptedReq);

																						console.log('cancel');
																						console.log($scope.counter);
																						console.log(window.localStorage.reqId);

																						$state.go("templates.doctor_home");

																						doctorServices.cancelByDoc($rootScope.reqId).then(function(response){
																						$scope.cancelledByDoc=response;
																						console.log($scope.cancelledByDoc);
																						//  $state.go($state.current, {}, {reload: true});
																						}).catch(function(error){
																						console.log('failure data', error);
																						});
																					}
																					},
																					]
																				});
																				var patAct = {
																					accpetcode : "2",
																					doctorphno : window.localStorage.user,
																					patientphno : $rootScope.pushReqPat,
																					consultId:$rootScope.pushReqId
																				}
																				$rootScope.checkAcceptedReq = $interval(function () {
																					doctorServices.doctorActivity(patAct).then(function(response){
																					$scope.consultStatus=response;
																					window.localStorage.patientDeclined=$scope.consultStatus[0][0];
																					$scope.patDeclined=window.localStorage.patientDeclined;
																					// console.log($scope.consultStatus);
																					}).catch(function(error){
																					//  console.log('failure data', error);
																					});

																				}, 2000);

																				$rootScope.videoOrAudio = $interval(function (){
																					console.log('videoIntervalStarted');
																					console.log("currentRequestId:",$rootScope.reqId);
																					doctorServices.callStatus($rootScope.reqId).then(function(response){
																					$rootScope.callStatus=response;//store the response array in doctor details
																					window.localStorage.callStatus=$rootScope.callStatus[0][0];
																					$scope.notes=window.localStorage.callStatus;
																					console.log($scope.callStatus);
																					}).catch(function(error){
																					console.log('failure data', error);
																					});
																				}, 2000);

																}
																// else{
																// 	$ionicLoading.show({
																// 		template: 'Accepting',
																// 		duration: 5000
																// 	});
																// 	$timeout( function(){
																// 		var confirmPopup = $ionicPopup.confirm({
																// 			title: 'Slow Data',
																// 			template: 'Unable to accept the consultation request at the moment as we detected slow network on your device.',
																// 			cssClass: 'videoPopup',
																// 			scope: $scope,
																// 			buttons: [
																// 			{
																// 				text: 'OK',
																// 				type: 'button-positive',
																// 				onTap: function(e) {
																// 				console.log('OK');
																// 				$state.go("templates.doctor_home");
																// 				}
																// 			},
																// 			]
																// 		});
																// 	}, 5000 );
																// }
														}
								});


								$scope.counter = 120;
								$scope.onTimeout = function(){
									$scope.counter--;
									console.log($scope.counter);
									docTimeout = $timeout($scope.onTimeout,1000);
									if($scope.counter == 0){
									console.log('one minute over');
									$rootScope.buttonText='Send Request';
									$timeout.cancel(docTimeout);
									$rootScope.callReqPopUp.close();

									$rootScope.closeDocPopUp=true;
									console.log($rootScope.closeDocPopUp);
									$scope.noResponsePopup = $ionicPopup.show({
												template: "<div ng-app='refresh_div' ><p>No response has been received from patient .</p></div>",
												cssClass: 'requestPopup',
												scope: $scope,
												buttons: [
												{
												text: 'OK',
												type: 'button-positive',
												onTap:function(){
													$state.go("templates.doctor_home");
												}
												},

											]
											});

									}
								}

								var docTimeout = $timeout($scope.onTimeout,1000);//timer interval
								$scope.$on('$destroy', function(){
								$timeout.cancel(docTimeout);
								console.log('destroyed');
								});
										window.localStorage.accpt = 0;

								// patientrequesttodoctor.acceptedbydoctor(accptdReq);
								// $state.go('templates.requestAccepted');
				}

			}).catch(function(error){
			console.log('failure data', error);
			})

		}
		else if($scope.type === 'Accepted'){
			$scope.isDisabled = true;
		}
		else if($scope.type === 'Decline'){

			console.log($scope.type);
			window.localStorage.accpt='';

			if(window.localStorage.accpt === 1){
				$scope.isDisabled = true;
				console.log('donNothing');
			}
			else{
				var docpatphno = {
				accpetcode : "2",
				doctorphno : window.localStorage.user,
				patientphno :$stateParams.reqPat,
				consultId:$rootScope.reqId
				}
				patientrequesttodoctor.declinedbydoctor(docpatphno).then(function(response){
	   		console.log(response);
				if(response){
					$state.go('templates.doctor_home');
					$rootScope.hideSideMenu = true;
				}
	   	 }).catch(function(error){
	   	//  console.log('failure data', error);
	   	 });
			}

		}
		else{
		//do nothing
		}

	};
// check patient activity///
$scope.DeclinedBypatient = true
$interval(checkForrDeclined,5000);

function checkForrDeclined(){
	if($scope.routeTo == true ){
		console.log($scope.routeTo);
		$rootScope.callReqPopUp.close();

	}
}
window.localStorage.showPopUp = 1;

// $interval(checkAcceptedReq,1000);
$rootScope.path=$location.path();
var values = $rootScope.path.split("/");

var checkPatientActivity={
	callId:$rootScope.reqId,
	patient:$rootScope.patientNum
}
console.log(checkPatientActivity);
// var patAct = {
// accpetcode : "2",
// doctorphno : window.localStorage.user,
// patientphno : $rootScope.pushReqPat,
// consultId:$rootScope.pushReqId
// }
$scope.popupShown = true;

 $scope.$watch('patDeclined', function (newValue, oldValue, scope){
		 console.log('changed');

		 if(newValue == 3){
			 $scope.callReqPopUp.close();
		 	setTimeout(function (){
					console.log('delay 3 sec');
				}, 3000);

				$scope.patientDeclined = $ionicPopup.show({
							template: "<div >Patient does not wish to proceed for a consultation at this time</div>",
							cssClass: 'requestPopup',
							scope: $scope,
							buttons: [
							{
							text: 'OK',
							type: 'button-positive',
							onTap:function(){
								console.log('patient Declined to call');
								$interval.cancel($rootScope.videoOrAudio);
								$interval.cancel($rootScope.checkAcceptedReq);
								$state.go("templates.doctor_home", {}, {reload: false});

							}
							},
						]

						});

		 }

 },true);

 // $interval(videoOrAudio,1000);
 // function videoOrAudio(){
 //  console.log($rootScope.reqId);
 //  doctorServices.callStatus($rootScope.reqId).then(function(response){
 //  		$rootScope.callStatus=response;//store the response array in doctor details
 // 		window.localStorage.callStatus=$rootScope.callStatus[0][0];
 // 		$scope.notes=window.localStorage.callStatus;
 //  		console.log($scope.callStatus);
 //  }).catch(function(error){
 //  	console.log('failure data', error);
 //  });
 // }
 $scope.$watch('notes', function (newValue, oldValue, scope){

 		console.log('changed');
 		console.log(newValue);
 		console.log(oldValue);
 		if(newValue == 2){
			//  alert('close prev popup')
			 $rootScope.callReqPopUp.close();
			 $ionicHistory.nextViewOptions({
				 disableAnimate: true,
				 disableBack: true
			 });
       if($stateParams.reqPat){
         window.localStorage.activePatient= $stateParams.reqPat;
       }
			 else {
           window.localStorage.activePatient= $scope.currentPatient.patientPhone;
			 }
      //  $interval.cancel($rootScope.videoOrAudio);
      //  $state.go("templates.prescription",{"reqPat":window.localStorage.activePatient},{location: "replace", reload: false});
			 if($scope.deviceAndroid === true){
         console.log(window.localStorage.activePatient);
				 $interval.cancel($rootScope.videoOrAudio);
				 $state.go("templates.prescription",{"reqPat":window.localStorage.activePatient},{location: "replace", reload: false})

			 }
			 else{
         $ionicLoading.show({
         template: '<ion-spinner></ion-spinner><br><br>Loading'
         });
         $timeout( function(){
           $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
           // alert('loggedin');
           $ionicHistory.nextViewOptions({
           disableAnimate: true,
           disableBack: true
           });
           $state.go("templates.prescription",{"reqPat":window.localStorage.activePatient},{location: "replace", reload: false})
           $interval.cancel($rootScope.videoOrAudio);

           });

         }, 10000 );

			 }


 		}

 },true);

 $scope.$on('$destroy', function(){
     $interval.cancel(checkForrDeclined,5000);
 });



});

'use strict';
DoctorQuickApp.service('ForgotPassword', function ($http,$q, BASE_URL, API) {

  this.forgotPassword = function (userNum){
    console.log('from service',userNum);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.ForgotPassword);
    $http.post(BASE_URL.url + API.ForgotPassword,userNum)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }


})

'use strict';
DoctorQuickApp.service('LoginService', function ($http,$q, BASE_URL, API) {

 var userPhone;
 var loggedIn = false;


this.logoutFromDq = function (userNum) {
  console.log(userNum);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.logout);
  $http.post(BASE_URL.url + API.logout,userNum)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.updatePlayer = function (updatePlayer) {
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.updatePlayer);
  $http.post(BASE_URL.url + API.updatePlayer,updatePlayer)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.alreadyLoggedIn = function (userDetails) {
  console.log(userDetails);
  userPhone = userDetails.userNum;
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.alreadyLoggedIn);
  $http.post(BASE_URL.url + API.alreadyLoggedIn,userDetails)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

	this.loginprocess = function (userDetails) {

    console.log(userDetails);
    loggedIn = true;

		userPhone = userDetails.userNum;
		var deferred = $q.defer();
    console.log(BASE_URL.url + API.login);
		$http.post(BASE_URL.url + API.login,userDetails)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
      console.log(data);
      console.log(status);

		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}
this.isLoggedIn=function(){

  console.log(loggedIn);
  return loggedIn;
}

});

DoctorQuickApp.service('agentServices', function ($http,$q, BASE_URL, API) {


  this.agentDetails = function (agentPhone) {
    var deferred = $q.defer();
    // console.log(docPhone);
    console.log(BASE_URL.url + API.agentDetails);
    $http.post(BASE_URL.url + API.agentDetails,agentPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;

  }


});

'use strict';
DoctorQuickApp.service('callAcceptedService', function ($http,$q, BASE_URL, API) {

  this.callDeclined = function (patientQuery){
    console.log('from service',patientQuery);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.callDecline,patientQuery)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.acceptPopUpSeen = function (accptId) {
    console.log(accptId);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.popupSeen);
    $http.post(BASE_URL.url + API.popupSeen,accptId)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.updateseenView = function (callId) {
    console.log(callId);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.updateseenView);
    $http.post(BASE_URL.url + API.updateseenView,callId)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }


})

DoctorQuickApp.service('callacceptedbydoctor', function ($http,$q, BASE_URL, API) {


	this.accpeteddoctor = function (patientphno,doctorphno,videocallflag,startdate,enddate,callid) {
		console.log('called');
		var details = {
			patient_phno:patientphno,
			doctor_phno : doctorphno,
			decide : videocallflag,
			startdate : startdate,
			enddate : enddate,
			callid : callid
		}
		console.log(details);
		var deferred = $q.defer();
		$http.post(BASE_URL.url + API.callaccepteddoctor,details)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
      console.log(data);

		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});

'use strict';
DoctorQuickApp.service('cameraService', function ($http,$q, BASE_URL, API) {

 var userPhone;

	this.uploadPicture = function (uploadData) {
    console.log(uploadData);
		// userPhone = userDetails.userNum;
		var deferred = $q.defer();
		$http.post(BASE_URL.url + API.uploadImage,uploadData)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});

DoctorQuickApp.service('doctoronoffdetails', function ($http,$q, BASE_URL, API) {


  this.doctoronoff = function (whichdoctoronoff)
  {

    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.doctoronoffconditions,whichdoctoronoff)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  };


  this.getdoctorrequest = function(doctorphno)
  {
    var deferred = $q.defer();
    // console.log(BASE_URL.url + API.consultationRequest);
    $http.post(BASE_URL.url + API.consultationRequest,doctorphno)
    .success(function (data, status, headers, config){
      // console.log(data);
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.fetchOne2OneReq = function(doctorphno)
  {
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.fetchOne2OneReq,doctorphno)
    .success(function (data, status, headers, config){
      // console.log(data);
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }


  this.doctorDeviceUpdate = function(doctorphno)
  {
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.doctorDeviceUpdate,doctorphno)
    .success(function (data, status, headers, config){
      // console.log(data);
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

});

DoctorQuickApp.service('medicalSpecialityService', function($http, $q, BASE_URL, API,$localStorage, $ionicLoading){

      this.getMedicalSpecialist = function(){
            var deferred = $q.defer();
            console.log(BASE_URL.url + API.getMedicalSpecialist);
            $http.get(BASE_URL.url + API.getMedicalSpecialist).then ( function(response) {
                if(response.status === 200){
                  deferred.resolve(response.data);
                }else{
                  deferred.reject(response.data)
                }
            });
            return deferred.promise;
        };

      this.getMedicalSpeciality = function (specialityId) {
          var deferred = $q.defer();
              $http.post(BASE_URL.url + API.fetchSpecificSpeciality,specialityId).then ( function(response) {
              if(response.status === 200){
                deferred.resolve(response.data);
                // console.log(response.data);
              }else{
                deferred.reject(response.data)
              }
          });
          return deferred.promise;
        }

        this.sendrequesttodoctor = function(medicalSpecialityId)
        {
            var patientrequest = {
              patientphno : window.localStorage.user,
              speciality : medicalSpecialityId,
              subPatientId:window.localStorage.selectedSubPatient
            }

            console.log(patientrequest);
          var deferred = $q.defer();
          $http.post(BASE_URL.url + API.sendrequesttodoctor,patientrequest)
          .success(function (data, status, headers, config){
            // console.log(data);

            deferred.resolve(data);
          })
          .error(function (){
            deferred.reject('Error while getting data');
          });
          $ionicLoading.hide();
          return deferred.promise;

        }

        this.callAccepted = function (patient) {
      		// console.log(patient);
      		var deferred = $q.defer();
          console.log(BASE_URL.url + API.callAccepted);
      		$http.post(BASE_URL.url + API.callAccepted,patient)
      		.success(function (data, status, headers, config){
      			deferred.resolve(data);
      		})
      		.error(function (){
      			deferred.reject('Error while getting data');
      		});
      		return deferred.promise;
      }

      this.checkForAccptedReq = function (patient) {
        // console.log(patient);
        var deferred = $q.defer();
        $http.post(BASE_URL.url + API.checkForAccptedReq,patient)
        .success(function (data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function (){
          deferred.reject('Error while getting data');
        });
        return deferred.promise;
    }

      this.cancelReq = function (patient) {
        // console.log(patient);
        var deferred = $q.defer();
        console.log(BASE_URL.url + API.cancelCallReq);
        $http.post(BASE_URL.url + API.cancelCallReq,patient)
        .success(function (data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function (){
          deferred.reject('Error while getting data');
        });
        return deferred.promise;
    }

    this.declinedDuringCall = function (reqId) {
      // console.log(patient);
      var deferred = $q.defer();
      console.log(BASE_URL.url + API.declinedDuringCall);
      $http.post(BASE_URL.url + API.declinedDuringCall,reqId)
      .success(function (data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function (){
        deferred.reject('Error while getting data');
      });
      return deferred.promise;
  }

  var newPatientAdded="";
  var newPatient="";

  this.savePatient = function (patientAdded){
    console.log('service:',patientAdded);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.savePatient);
    $http.post(BASE_URL.url + API.savePatient,patientAdded)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
}

this.editNewPatient = function (patientAdded){
  console.log('service:',patientAdded);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.editNewPatient);
  $http.post(BASE_URL.url + API.editNewPatient,patientAdded)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.getSubPatients = function (user){
  console.log('service:',user);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.getSubPatients);
  $http.post(BASE_URL.url + API.getSubPatients,user)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.selectSubPatient = function (subPatientToShow){
  console.log('service:',subPatientToShow);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.selectSubPatient);
  $http.post(BASE_URL.url + API.selectSubPatient,subPatientToShow)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}
this.deletePatient = function (subPatientToDelete){
  console.log('service:',subPatientToDelete);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.deletePatient);
  $http.post(BASE_URL.url + API.deletePatient,subPatientToDelete)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

  this.addNewPatient = function(newPatient)
  {
       newPatientAdded = newPatient;
  }
  this.getNewPatient = function()
  {
    return newPatientAdded;
  }



});

'use strict';
DoctorQuickApp.service('myConsultationService', function ($http,$q, BASE_URL, API) {

this.myConsultedDoctors = function (patient_phone) {
// console.log(patient_phone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myConsultations,patient_phone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

this.docSummaryDetails = function (myDoc) {
console.log(myDoc);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.docSummary);
  $http.post(BASE_URL.url + API.docSummary,myDoc)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

//for doctors consultationDetails


this.myConsultedPatients = function (doctor_phone) {
// console.log(patient_phone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myConsultedPatients,doctor_phone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


this.firstConsultation = function (patient) {
// console.log(patient_phone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.firstConsultation,patient)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}



});

angular.module('mlz.openurl', [])
  .factory('OpenUrlService', ['$log', '$location', '$rootScope', '$ionicHistory', function ($log, $location, $rootScope, $ionicHistory) {

    var openUrl = function (url) {

      $log.debug('Handling open URL ' + url);

      // Stop it from caching the first view as one to return when the app opens
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableBack: true,
        disableAnimation: true
      });

      if (url) {
        window.location.hash = url.substr(5);
        $rootScope.$broadcast('handleopenurl', url);

        window.cordova.removeDocumentEventHandler('handleopenurl');
        window.cordova.addStickyDocumentEventHandler('handleopenurl');
        document.removeEventListener('handleopenurl', handleOpenUrl);
      }
    };

    var handleOpenUrl = function (e) {
      openUrl(e.url);
    };

    var onResume = function () {
      document.addEventListener('handleopenurl', handleOpenUrl, false);
    };

    return {
      handleOpenUrl: handleOpenUrl,
      onResume: onResume
    };

  }]).run(['OpenUrlService', function (OpenUrlService) {
    if (OpenUrlService) {
      document.addEventListener('handleopenurl', OpenUrlService.handleOpenUrl, false);
      document.addEventListener('resume', OpenUrlService.onResume, false);
    }
  }]);

'use strict';
DoctorQuickApp.service('patientCareService', function ($http,$q, BASE_URL, API) {

  this.submitQuery = function (patientQuery){
    console.log('from service',patientQuery);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.patientQuery,patientQuery)
    .success(function (data, status, headers, config){
      console.log('enter success part');
      console.log(data);
      console.log(status);
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.submitCallBack = function (patientPhone){
    console.log('from service',patientPhone);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.paientCallBack,patientPhone,{timeout: 1000})
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }



})


DoctorQuickApp.service('patientProfileDetailsService', function($http, $q, BASE_URL, API){


this.updatenotesflag = function(callid)
{
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.updateNotes);
  $http.post(BASE_URL.url + API.updateNotes,callid)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;
}

this.fetchPatientImage = function(detail){
  console.log(detail);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.fetchPatientImage);
  $http.post(BASE_URL.url + API.fetchPatientImage,detail)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;
}

  this.fetchPatient = function(detail){
    // console.log(detail);
    var deferred = $q.defer();
    // console.log(BASE_URL.url + API.patientDetails);
		$http.post(BASE_URL.url + API.patientDetails,detail)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});

		return deferred.promise;
  }

  this.emailVerification = function(patient){
    // console.log(detail);
    var deferred = $q.defer();
    // console.log(BASE_URL.url + API.patientDetails);
		$http.post(BASE_URL.url + API.checkEmailVerification,patient)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});

		return deferred.promise;
  }

  this.sendVerificationMail = function(patient){
    // console.log(detail);
    var deferred = $q.defer();
    // console.log(BASE_URL.url + API.patientDetails);
		$http.post(BASE_URL.url + API.sendVerificationMail,patient)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});

		return deferred.promise;
  }

  this.updateEmail = function(emailDetails)
  {
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.updateEmail);
    $http.post(BASE_URL.url + API.updateEmail,emailDetails)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;
  }



  //password change
  this.changePwd2 = function(newPwd){

    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.changePatientPwd,newPwd)
    .success(function (data, status, headers, config){
      deferred.resolve(data);

    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;


  }


  // this.updateEmail = function(phoneno){
  //
  //   console.log(phoneno);
  //
  //   var deferred = $q.defer();
  //   $http.post(BASE_URL.url + API.updateEmail,phoneno)
  //   .success(function (data, status, headers, config){
  //     deferred.resolve(data);
  //
  //   })
  //   .error(function (){
  //     deferred.reject('Error while getting data');
  //   });
  //
  //   return deferred.promise;
  //
  //
  // }



});

DoctorQuickApp.service('patientRegistrationService', function ($rootScope, $http,$q, BASE_URL, API)
{

  $rootScope.shareData = function( userDetails )
  {

    console.log(userDetails);
    $scope.sampleFunction( userDetails) ;

  };

//
this.existingPatient = function (existingPatient)
{
  console.log(existingPatient);
      var deferred = $q.defer();
      console.log(BASE_URL.url + API.existingPatient);
      $http.post(BASE_URL.url + API.existingPatient,existingPatient)
      .success(function (data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function (){
        deferred.reject('Error while getting data');
      });
      return deferred.promise;

};
//
  this.patientRegistrationDone = function (patientDetails)
  {
      	var deferred = $q.defer();
        console.log(BASE_URL.url + API.patientRegistration);
    		$http.post(BASE_URL.url + API.patientRegistration,patientDetails)
    		.success(function (data, status, headers, config){
    			deferred.resolve(data);
    		})
    		.error(function (){
    			deferred.reject('Error while getting data');
    		});
    		return deferred.promise;

  };

this.sendotp = function(phoneno)
{
  console.log(phoneno);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.sendotp,phoneno)
  .success(function (data, status, headers, config){

    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;





}


});

'use strict';
DoctorQuickApp.service('patientWalletServices', function ($cookies,$http,$q, BASE_URL, API) {

  this.myWalletBalance = function (patientPhone) {
      console.log('wallet Service:',patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.myWalletBalance,patientPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.claimFreeConsultation = function (patientPhone) {
      console.log('wallet Service:',patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.claimFreeConsultation,patientPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.paidToDoctors = function (patientPhone) {
      console.log('wallet Service:',patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.paidForConsultations,patientPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.refundRequest = function (refundDetails) {
      console.log('refundDetails:',refundDetails);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.refundRequest,refundDetails)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  // //transaction history
  // this.mytransactionHistory = function (patientPhone) {
  //     console.log('transaction history of:',patientPhone);
  //
  //
  // }


});

DoctorQuickApp.service('patientrequesttodoctor', function ($http,$q, BASE_URL, API) {


      this.accpetedbydoctor = function(accptdReq)
      {
          console.log('clicked');
       		var deferred = $q.defer();
          // console.log(BASE_URL.url + API.acceptedbydoctor);
       		$http.post(BASE_URL.url + API.acceptedbydoctor,accptdReq)
       		.success(function (data, status, headers, config){
            console.log(data);
       			deferred.resolve(data);
       		})
       		.error(function (){
       			deferred.reject('Error while getting data');
       		});
       		return deferred.promise;
      }

      this.declinedbydoctor = function(docpatphno)
      {
        console.log(docpatphno);
        var deferred = $q.defer();
        $http.post(BASE_URL.url + API.declinedbydoctor,docpatphno)
        .success(function (data, status, headers, config){
        console.log(data);
        deferred.resolve(data);
        })
        .error(function (){
        deferred.reject('Error while getting data');
        });

        return deferred.promise;

      }

      this.sendNotification = function(patient)
      {
        var deferred = $q.defer();
        $http.post(BASE_URL.url + API.sendNotification,patient)
        .success(function (data, status, headers, config){
        console.log(data);
        deferred.resolve(data);
        })
        .error(function (){
        deferred.reject('Error while getting data');
        });

        return deferred.promise;

      }


});

'use strict';
DoctorQuickApp.service('pingService', function ($http,$q, BASE_URL, API) {


	this.pingToServer = function () {
    // console.log('ping service calld');
		var deferred = $q.defer();
		$http.post(BASE_URL.url + API.pingToServer)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
      // console.log(data);

		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});

'use strict';
DoctorQuickApp.service('rateDoctorServices', function ($http,$q, BASE_URL, API) {

  this.getDocRatingsByMe  = function (myDocratedValues) {
    console.log('from service',myDocratedValues);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.getMyDoctorRatings);
    $http.post(BASE_URL.url + API.getMyDoctorRatings,myDocratedValues)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  this.getDocRatingsByAll  = function (consultedDoctor) {
    console.log('from service',consultedDoctor);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.getDocRatingsByAll);
    $http.post(BASE_URL.url + API.getDocRatingsByAll,consultedDoctor)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }


this.rateDoctor = function (ratedValues) {
    console.log('from service',ratedValues);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.rateMyDoctor);
  $http.post(BASE_URL.url + API.rateMyDoctor,ratedValues)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

this.addToFavorite = function (favorite) {
    console.log('favorite Doc',favorite);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.addToFavorite);
  $http.post(BASE_URL.url + API.addToFavorite,favorite)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


});

'use strict';
DoctorQuickApp.service('RazorPayService', function ($http,$q,$rootScope, BASE_URL, API) {

  this.topUpOptions  = function (options) {
    $rootScope.options=options;
  }

  this.topUp  = function (RazorPayId) {

    $rootScope.Id=RazorPayId;
    // alert('hello')
    var storePaymentDetails={
      paymentId:$rootScope.Id,
      amountPaid:$rootScope.options.amount/100,
      patientPhone:$rootScope.options.prefill.contact,
    }
    console.log('deposit Details :',storePaymentDetails);
    // alert(storePaymentDetails.paymentId);
    // alert(storePaymentDetails.amountPaid);
    // alert(storePaymentDetails.patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.topMeup,storePaymentDetails)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
      alert(data);


    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }



});

'use strict';
DoctorQuickApp.service('searchDoctorServices', function ($http,$q, BASE_URL, API) {

this.specialitySearch = function (speciality) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.getMedicalSpecialist,speciality)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

this.getLanguages = function () {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.languages)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}
//function to fetch all the Doctors

this.fetchAllDoctors = function () {
  console.log('function called to fetch doctors');
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.fetchAllDoctors)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


//
// var resultofsearch;


    // // sdidemenu list php file
    // this.searchData = function (sidemenu)
    // {
    //
    //     resultofsearch = sidemenu.spec;
    //     console.log(resultofsearch);
    //
    // };

    // this.getSearchData = function()
    // {
    //
    //   return resultofsearch;
    //   console.log("hello");
    //
    // };

var tags = [
         { "text": "Tag1" },
         { "text": "Tag2" },
         { "text": "Tag3" },
         { "text": "Tag4" },
         { "text": "Tag5" },
         { "text": "Tag6" },
         { "text": "Tag7" },
         { "text": "Tag8" },
         { "text": "Tag9" },
         { "text": "Tag10" }
       ];

 this.load = function() {
   var deferred = $q.defer();
   deferred.resolve(tags);
   return deferred.promise;
 };

 this.requestForCall  = function (patient) {
   console.log('from service',patient);
   var deferred = $q.defer();
   console.log(BASE_URL.url + API.requestForCall);
   $http.post(BASE_URL.url + API.requestForCall,patient)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }
 this.cancelOne2oneReq  = function (id) {
   console.log('from service',id);
   var deferred = $q.defer();
   console.log(BASE_URL.url + API.cancelOne2oneReq);
   $http.post(BASE_URL.url + API.cancelOne2oneReq,id)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }

 this.checkCallStatus  = function (id) {
   console.log('from service',id);
   var deferred = $q.defer();
   console.log(BASE_URL.url + API.checkCallStatus);
   $http.post(BASE_URL.url + API.checkCallStatus,id)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }

 this.declineOne2oneReqPatient  = function (id) {
   console.log('from service',id);
   var deferred = $q.defer();
   console.log(BASE_URL.url + API.declineOne2oneReqPatient);
   $http.post(BASE_URL.url + API.declineOne2oneReqPatient,id)
   .success(function (data, status, headers, config){
     deferred.resolve(data);
   })
   .error(function (){
     deferred.reject('Error while getting data');
   });

   return deferred.promise;

 }
 this.sendOfflineMessage  = function (sendMessage) {
   console.log('MessageDAta',sendMessage);
   var deferred = $q.defer();
   $http.post(BASE_URL.url + API.sendOfflineMessage,sendMessage)
   .success(function (data, status, headers, config){
     deferred.resolve(data);

     console.log(data);


   })
   .error(function (){
     deferred.reject('Error while getting data');
   });
   return deferred.promise;

 }

 this.checkDocStatusOnTheGo  = function (docNum) {
   console.log('MessageDAta',docNum);
   var deferred = $q.defer();
   $http.post(BASE_URL.url + API.checkDocStatusOnTheGo,docNum)
   .success(function (data, status, headers, config){
     deferred.resolve(data);

     console.log(data);


   })
   .error(function (){
     deferred.reject('Error while getting data');
   });
   return deferred.promise;

 }

});

DoctorQuickApp.service('searchbyspecialities', function ($http,$q,BASE_URL, API) {

  var selectedspecial = "";
  var selectedcategory = "";
  var selectedgender = "";
  var selectedlanguage = "";

  this.specialitywisesearch = function(specialfromsearch)
  {
    selectedspecial = specialfromsearch;
  }
  this.categorywisesearch = function(categoryfromsearch)
  {
    selectedcategory = categoryfromsearch;
  }
  this.genderwisesearch = function(genderfromsearch)
  {
    selectedgender= genderfromsearch;
  }
  this.languagewisesearch = function(languagefromsearch)
  {
    selectedlanguage = languagefromsearch;
  }

  this.getSpecialData = function()
  {
    return selectedspecial;
  }

  this.getcategoryData = function()
  {
    return selectedcategory;
  }

  this.getgenderData = function()
  {
    return selectedgender;


  }
  this.getlanguageData = function()
  {
    return selectedlanguage;
  }



  this.getlistofspecialist = function(searchdoctor)
  {
      var deferred = $q.defer();
      console.log(BASE_URL.url + API.doctorbydifferentscenario);
      $http.post(BASE_URL.url + API.doctorbydifferentscenario,searchdoctor)
      .success(function (data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function (){
        deferred.reject('Error while getting data');
      });
      return deferred.promise;
  }




});

'use strict';
DoctorQuickApp.service('accountsService', function ($http,$q, BASE_URL, API,$rootScope, $localStorage ) {

	this.docAccountsBalance = function (docPhone) {
      // alert('get details')
      var deferred = $q.defer();
    		$http.post(BASE_URL.url + API.docAccountsBalance,docPhone)
  		.success(function (data, status, headers, config){
  			deferred.resolve(data);
  		})
  		.error(function (){
  			deferred.reject('Error while getting data');
  		});
  		return deferred.promise;
}


	this.docAccountsDetails = function (docPhone){
		$rootScope.docPhone=docPhone;
		console.log('service:',docPhone);
    var docAccDetails={
			docPhone:window.localStorage.user,
      fromDate :$rootScope.from,
      toDate:$rootScope.toDate
    }
		console.log(docAccDetails);
    if($rootScope.from && $rootScope.toDate){
      // alert('get details')
      console.log('from Service',docAccDetails);
      var deferred = $q.defer();
      // console.log(BASE_URL.url + API.docAccDetails);
  		$http.post(BASE_URL.url + API.docAccDetails,docAccDetails)
  		.success(function (data, status, headers, config){
  			deferred.resolve(data);
  		})
  		.error(function (){
  			deferred.reject('Error while getting data');
  		});
  		return deferred.promise;
    }

}
this.returnUserPhone=function(){
  return userPhone;
}

});

'use strict';
DoctorQuickApp.service('doctorCareService', function ($http,$q, BASE_URL, API) {

  this.submitQuery = function (doctorQuery){
    console.log('from service',doctorQuery);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.patientQuery,doctorQuery)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }

  this.submitCallBack = function (doctorPhone){
    console.log('from service',doctorPhone);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.paientCallBack,doctorPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }



})

DoctorQuickApp.service('doctorRegistrationService', function ($http,$q, BASE_URL, API) {
//Doctor Registration
this.doctorRegistrationDone = function (doctorDetails) {

  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.doctorRegistration,doctorDetails)
  .success(function (data, status, headers, config){
  
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

};

});

'use strict';
DoctorQuickApp.service('doctorServices', function ($http,$q,$localStorage, BASE_URL, API) {


this.doctorDetails = function (docPhone) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.doctorDetails,docPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.currentPatient = function (docPhone) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.currentPatient,docPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}
this.fetchReqPatientDetails = function(detail){
  // console.log(detail);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.reqPatientDetails);
  $http.post(BASE_URL.url + API.reqPatientDetails,detail)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;
}

//mydoctors function
this.myDoctorsFetched = function (userPhone){
//console.log(userPhone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.fetchMyDoctors,userPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.myDoctorsDetails = function (mydocPhone) {
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.fetchSpecificDoctor);
  $http.post(BASE_URL.url + API.fetchSpecificDoctor,mydocPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.specificSearch = function (mydocPhone) {
  console.log('mysearch',mydocPhone);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.specificSearch);
  $http.post(BASE_URL.url + API.specificSearch,mydocPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.myConsultedPatients = function (meDoc) {
  // console.log(meDoc);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myConsultedPatients,meDoc)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


this.checkMyBalance = function (myNumber) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myWalletBalance,myNumber)
  .success(function (data, status, headers, config){
    deferred.resolve(data);

  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


this.changeDocPwd = function(newPwd){

  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.updateDocPassword);
  $http.post(BASE_URL.url + API.updateDocPassword,newPwd)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.cancelByDoc = function(consultId){

  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.cancelByDoc,consultId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.patientActivity = function(checkPatientActivity){
  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.patientActivity,checkPatientActivity)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.doctorActivity = function(patAct){
  // console.log(accptdReq);
  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.doctorActivity,patAct)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.videoOrAudio = function(consultId){
  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.videoOrAudio,consultId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.createChatHistory = function (chat) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.createChatHistory,chat)
  .success(function (data, status, headers, config){
    deferred.resolve(data);



  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}



this.createChatHistoryforDoctor = function (chat) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.createChatHistoryforDoctor,chat)
  .success(function (data, status, headers, config){
    deferred.resolve(data);



  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}




this.createChatHistoryIos = function (chat) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.createChatHistoryIos,chat)
  .success(function (data, status, headers, config){
    deferred.resolve(data);



  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.createChatHistoryIosforDoctor = function (chat) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.createChatHistoryIosforDoctor,chat)
  .success(function (data, status, headers, config){
    deferred.resolve(data);



  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}


this.callStatus = function (reqId){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.callStatus,reqId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.fetchChatHistory = function (chatHistory){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.fetchChatHistory,chatHistory)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.checkIdStatus = function (id){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.checkIdStatus,id)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.pushReqStatus = function (id){
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.pushReqStatus,id)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}


this.notifyPatient = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.notifyPatient,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.doctorStatus = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.doctorStatus,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.doctorEmailVerification = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.doctorEmailVerification,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.updateDoctorEmail = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.updateDoctorEmail,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.sendVerificationMailToDoc = function (doctor){
  console.log(doctor);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.sendVerificationMailToDoc,doctor)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.removeFavDoctor = function (removeFav){
  console.log(removeFav);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.removeFavDoctor);
  $http.post(BASE_URL.url + API.removeFavDoctor,removeFav)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}





});

DoctorQuickApp.service('invitereviews', function ($http,$rootScope,$q,BASE_URL, API) {


var con = [];
this.invitereviewpatient = function (listofcontacts){

    con.push(listofcontacts);
  }

this.getinvitecontacts = function()
{
    return con;
    console.log(con);



}



this.sendsmstoinvitereviews = function (contactsfrominvitereview,queryforinvitereview,doctor,link) {


toinvite = {

    phnos : contactsfrominvitereview,
    query : queryforinvitereview,
    user : doctor,
    inviteLink:link

};

console.log(toinvite);

var deferred = $q.defer();
$http.post(BASE_URL.url + API.invitereviews,toinvite)
.success(function (data, status, headers, config){
console.log(data);
  deferred.resolve(data);
})
.error(function (){
  deferred.reject('Error while getting data');
});

return deferred.promise;

};
this.generateTinyUrl = function (docPhone) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.generateTinyUrl,docPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.invitereviewforall = function (contact) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.invitereviewforall,contact)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.getonlysinglecontact = function (contact) {
  var deferred = $q.defer();
  // console.log(docPhone);
  $http.post(BASE_URL.url + API.getonlysinglecontact,contact)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}



});

DoctorQuickApp.service('invitereviewsresultservice', function ($http,$q, BASE_URL, API) {


});

DoctorQuickApp.service('testresultbydoctor', function ($http,$q, BASE_URL, API, $cordovaFileTransfer,$cordovaFile) {

    var diagnosisbydoctor = "";
    var testsbydoctor = "";
    var medicationbydoctor = "";
    var diagnosis = "";
    var tests = "";
    var medication = "";

  this.diagnosisdone = function(diagnosis)
  {
       diagnosisbydoctor = diagnosis;
  }

  this.testrecommended = function(tests)
  {
    testsbydoctor = tests;
  }

  this.medicationdone = function(medication)
  {
      medicationbydoctor = medication;
  }

  this.getdiagnosis = function()
  {
      if(diagnosisbydoctor)
      {
            return diagnosisbydoctor;
      }
      else
      {
          return "";
      }
  }

  this.gettests = function()
  {
    if(testsbydoctor)
    {
          return testsbydoctor;
    }
    else
    {
          return "";
    }
  }

  this.getmedication = function()
  {
    if(medicationbydoctor)
    {
          return medicationbydoctor;
    }
    else
    {
          return "";
    }
  }

  this.jpegtest = function(options)
  {
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.testjpegimage,options)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;

  }
});
