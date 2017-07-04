
DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope, $scope, $interval,$ionicHistory, $stateParams,$ionicPopup ,$localStorage, $timeout, $stateParams, $cordovaToast, medicalSpecialityService,$localStorage, $ionicLoading,doctorServices) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.hideSideMenu = true;
    $rootScope.showBadge=false;

	$rootScope.specialId = $stateParams.specialId;
  $rootScope.special = $stateParams.special;
  $rootScope.content1 = $stateParams.content1;
  $rootScope.descrpt = $stateParams.descrpt;
  console.log($rootScope.descrpt);

$rootScope.specialId = $stateParams.specialId;

// TO CHECK NO OF DOCTORS ONLINE IN VSEE

  var username = "greet+8792618138";
  var password = "DQ_patient";

  var success = function(message)
  {
    alert(message);
  }

  var failure = function()
  {
    alert("Error calling Hello Plugin");
  }

  //hello.logininformation(username,password,success, failure);



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

$rootScope.popUpClosed == false;
$scope.sendrequesttoonlinedoctors = function()
{

     medicalSpecialityService.sendrequesttodoctor($rootScope.special).then(function(response){
       console.log('successfull data', response);
      }).catch(function(error){
          console.log('failure data', error);
      });
      /*Start timers*/
        $scope.counter = 120;
        $scope.onTimeout = function(){
          // console.log($scope.counter);
          $scope.counter--;
          patientTimeout = $timeout($scope.onTimeout,1000);
          if($scope.counter == 0){
          console.log('one minute over');
          $rootScope.buttonText='Send Request';
          $timeout.cancel(patientTimeout);

          var noResponsePopup = $ionicPopup.alert({
          template: "<div ><p>None Of the doctors have accepted your request .</p></div>",
          cssClass: 'requestPopup',
          scope: $scope,
          });

          noResponsePopup.then(function(res) {
            medicalSpecialityService.cancelReq($localStorage.user).then(function(response){
            $scope.cancelledReq=response;
            $state.go("app.medical_speciality");
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

     $rootScope.buttonText='Request sent' ;
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
             console.log($scope.counter);
             console.log($localStorage.user);
             medicalSpecialityService.cancelReq($localStorage.user).then(function(response){
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
           medicalSpecialityService.cancelReq($localStorage.user).then(function(response){
           $scope.cancelledReq=response;
           $scope.callReqPopUp.close(); //close the popup after 3 seconds for some reason
            $scope.nonePopUp=true;
             console.log($scope.cancelledReq);
           }).catch(function(error){
           console.log('failure data', error);
           });

         }

   console.log($scope.counter);
   console.log('buttonclicked');
   }

   $interval(CheckOnlineDocs, 2000);

   function CheckOnlineDocs(){
   $localStorage.SpecilityId=$rootScope.specialId;
   medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
    .then(function(response){
      $scope.specialityDetails = response;
    }).catch(function(error){
       console.log('failure data', error);
    });
   }

  $interval(checkAcceptedReq,2000);
   function checkAcceptedReq(){
    //  console.log($scope.accptdReq);
     medicalSpecialityService.checkForAccptedReq($localStorage.user).then(function(response){
     $scope.accptdReq=response;
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
           $state.go('app.callAccepted',{accptdDoc:$rootScope.doctorPhone,callId:$rootScope.callId,callFlag:$rootScope.cal_flag,rates:$rootScope.rates,totalRates:$rootScope.totalRates},{location: "replace", reload: false});
           console.log('show accpted doc profile');
         }, 1000);

       }

     }).catch(function(error){
     console.log('failure data', error);
     });

   }

   $scope.isFirstTime = false;

});
