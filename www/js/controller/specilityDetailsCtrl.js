
DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope, $scope, $interval, $stateParams,$ionicPopup ,$localStorage, $timeout, $stateParams, $cordovaToast, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;

	$rootScope.specialId = $stateParams.specialId;
  $rootScope.special = $stateParams.special;
  $rootScope.content1 = $stateParams.content1;
  $rootScope.descrpt = $stateParams.descrpt;
  console.log($rootScope.descrpt);

$rootScope.specialId = $stateParams.specialId;

// TO CHECK NO OF DOCTORS ONLINE IN VSEE

  // var username = "greet+8792618138,ravikiran6763@gmail.com";
  // var password = "DQ_patient";
  //
  // var success = function(message)
  // {
  //   alert(message);
  // }
  //
  // var failure = function()
  // {
  //   alert("Error calling Hello Plugin");
  // }

  // hello.logininformation(username,password,success, failure);



console.log($rootScope.specialId);

  medicalSpecialityService.getMedicalSpeciality($rootScope.specialId)
   .then(function(response){
      console.log('Details', response);
      $scope.specialityDetails = response;
      $state.go('app.specialityDetailsNew');
   }).catch(function(error){
       console.log('failure data', error);
   });

   $scope.counter = 0;
   $scope.stopped = false;
   $scope.buttonText='Send Request';



$scope.sendrequesttoonlinedoctors = function()
{
     //////////
     /*Send request to all available doctor*/
     medicalSpecialityService.sendrequesttodoctor($rootScope.specialId).then(function(response){
       console.log('successfull data', response);

      }).catch(function(error){
          console.log('failure data', error);
      });

      /*Start timers*/
     $scope.counter = 120;
     $scope.onTimeout = function(){
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout,1000);
        if($scope.counter == 0){
          console.log('one minute over');
          $scope.counter=120;
          $rootScope.buttonText='Send Request';
          $timeout.cancel(mytimeout);

        }
     }
     var mytimeout = $timeout($scope.onTimeout,1000);//timer interval
     $rootScope.buttonText='Request sent' ;
     $scope.callReqPopUp = $ionicPopup.show({
           template: "<div ng-app='refresh_div' >Your request for a<br>video call has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
           cssClass: 'requestPopup',
           scope: $scope,
           buttons: [
           {
           text: 'Cancel',
           type: 'button-royal',
           onTap:function(){
             console.log('cancel');
             console.log($scope.counter);
             console.log($localStorage.user);
             medicalSpecialityService.cancelReq($localStorage.user).then(function(response){
             $scope.cancelledReq=response;
               console.log($scope.cancelledReq);
               $state.go($state.current, {}, {reload: true});
             }).catch(function(error){
             console.log('failure data', error);
             });
           }
           },

         ]
         });
         $timeout(function() {
           console.log('cancelCall here');
           medicalSpecialityService.cancelReq($localStorage.user).then(function(response){
           $scope.cancelledReq=response;
             console.log($scope.cancelledReq);
           }).catch(function(error){
           console.log('failure data', error);
           });
            $scope.callReqPopUp.close(); //close the popup after 3 seconds for some reason
            console.log('closing this');
            $interval(checkAcceptedReq, 1000,1);


         }, 120000);



  function checkAcceptedReq() {
  ////////////////////////////////////////////////////////////////////////////////
    medicalSpecialityService.callAccepted($localStorage.user).then(function(response){
    $scope.callStatus=response;
    console.log($scope.callStatus);
    if($scope.callStatus){
        // $state.go('app.viewdoctor_profile', {rates: $rootScope.ratesForDoc,totalRates: $rootScope.totalRate})
        var accptDoc=$scope.callStatus;
        for(var i=0; i<accptDoc.length; i++){
          $rootScope.doctorPhone=accptDoc[i].doctorPhone,
          $rootScope.callId=accptDoc[i].callId,
          $rootScope.cal_flag=accptDoc[i].cal_flag
          console.log($rootScope.cal_flag);

              while ($rootScope.cal_flag == 4) {

                $state.go('app.callAccepted',{accptdDoc:$rootScope.doctorPhone,callId:$rootScope.callId,callFlag:$rootScope.cal_flag});
              }


          console.log($rootScope.doctorPhone);
        }
      // alert('callAccpted view here')
    }
    else{
      $scope.callReqPopUp.close();
      // alert('close n open new popo');
      $scope.noResponsePopUp = $ionicPopup.show({
            template: "<div >None Of the Doctors have responded to your request</div>",
            cssClass: 'requestPopup',
            scope: $scope,
            buttons: [
            {
            text: 'Ok',
            type: 'button-positive',
            onTap:function(){
              medicalSpecialityService.cancelReq($localStorage.user).then(function(response){
              $scope.cancelledReq=response;
                console.log($scope.cancelledReq);
                $state.go($state.current, {}, {reload: true});
              }).catch(function(error){
              console.log('failure data', error);
              });
               $scope.noResponsePopUp.close();

            }
            },

          ]
          });
    }
  // $state.go($state.current, {}, {reload: true});
  }).catch(function(error){
  console.log('failure data', error);
  });
  ////////////////////////////////////////////////////////////////////////////////
  }
   console.log($scope.counter);

       console.log('buttonclicked');


   }

   function CheckOnlineDocs() {
   $localStorage.SpecilityId=$rootScope.specialId;
   medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
    .then(function(response){
      $scope.specialityDetails = response;
    }).catch(function(error){
       console.log('failure data', error);
    });
   }

  //  $interval(CheckOnlineDocs, 5000);


});
