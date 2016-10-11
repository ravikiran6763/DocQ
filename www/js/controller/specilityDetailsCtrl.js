
DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope, $scope, $interval, $timeout, $stateParams, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;


$rootScope.specialId = $stateParams.specialId;

console.log($rootScope.specialId);

  medicalSpecialityService.getMedicalSpeciality($rootScope.specialId)
   .then(function(response){
      console.log('Details', response);
      $scope.specialityDetails = response;
      $state.go('app.specialityDetailsNew');
   }).catch(function(error){
       console.log('failure data', error);
   });

   $scope.sendrequesttoonlinedoctors = function()
   {
     $ionicLoading.show({
     content: 'Loading...',
     animation: 'fade-in',
     showBackdrop: false,
     maxWidth: 200,
     showDelay: 500,
   });
     console.log('buttonclicked');

     medicalSpecialityService.sendrequesttodoctor($rootScope.specialId).then(function(response){
       // console.log('successfull data', response);
         if(response)
         {
           $scope.requestSent = response;
           // $state.go('app.callAccepted');
           alert('Request Sent');
           $ionicLoading.hide();
         }
         else {
           alert('error');
         }
      }).catch(function(error){
          console.log('failure data', error);
      });
   }


   function CheckOnlineDocs() {
     $localStorage.SpecilityId=$rootScope.specialId;
   medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
    .then(function(response){
      // console.log('Details', response);
      $scope.specialityDetails = response;
      // $state.go('app.specialityDetailsNew');
    }).catch(function(error){
       console.log('failure data', error);
    });
   }
   $interval(CheckOnlineDocs, 5000);


});
