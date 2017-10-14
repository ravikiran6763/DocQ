DoctorQuickApp.controller('loadingDoctor', function($state,$scope,$rootScope,$interval, $ionicConfig, $ionicHistory,$timeout, $window, $localStorage, $ionicLoading, doctorServices,rateDoctorServices,LoginService) {


  //
  // var username = "greet+"+$localStorage.user;
  // var password = "DQ_doctor";
  // function checkNewMessages()
  // {
  //     var success = function(message)
  //     {
  //       $rootScope.unreadchatforpatient = message;
  //       // console.log($scope.unreadchatforpatient);
  //     }
  //
  //     var failure = function()
  //     {
  //       console.log("Error calling Hello Plugin");
  //       //console.log(‘error’);
  //
  //     }
  //       hello.unreadchatfromusers(username,password,success, failure);
  // }


  $timeout( function() {
    $scope.deviceAndroid = ionic.Platform.isAndroid();
    console.log($scope.deviceAndroid);

        $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick'
        });
    var uname1 = "greet+"+$localStorage.user;
    var pw1 = "DQ_doctor";

    window.plugins.OneSignal.getIds(function(ids) {
      $scope.playerId=JSON.stringify(ids['userId']);
      // console.log($scope.playerId);
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

    doctorServices.notifyPatient($localStorage.user).then(function(response){
      console.log(response);
    })


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
        $interval(checkNewMessages,1000);
        }, 3000);
        var username = "greet+"+$localStorage.user;
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

          var success = function(message)
          {
          // alert(message);
          $scope.iosLoggin=message;
          $localStorage.iosLogin=$scope.iosLoggin;

          }
          var failure = function()
          {

          alert("Error calling Hello Plugin");

          }

          hello.login(uname1,pw1,success, failure);

          $timeout( function(){
          console.log('interval started');
          $interval(loginStatus,2000,1);
          $interval(checkNewMessages,2000);

          }, 10000 );


            var username = "greet+"+$localStorage.user;
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
    // $ionicLoading.show({
    //       template: '<ion-spinner></ion-spinner><br><br>Connecting to DoctorQuick',
    //     });
    //     var uname1 = "greet+"+$localStorage.user;
    //     var pw1 = "DQ_doctor";
    //     var success = function(message)
    //     {
    //       console.log(message);
    //
    //       $ionicLoading.hide().then(function(){
    //         console.log("The loading indicator is now hidden");
    //
    //         $ionicHistory.nextViewOptions({
    //           disableAnimate: true,
    //           disableBack: true
    //         });
    //         $state.go('templates.doctor_home', {}, {location: "replace", reload: false});
    //         $interval(checkNewMessages,2000);
    //       });
    //
    //       $scope.iosLoggin=message;
    //       $localStorage.onOff=1;
    //     }
    //     var failure = function()
    //     {
    //
    //       alert("Error calling Hello Plugin");
    //
    //     }
    //
    //     hello.login(uname1,pw1,success, failure);



    // $state.go('templates.doctor_home');

  }, 0);


})
