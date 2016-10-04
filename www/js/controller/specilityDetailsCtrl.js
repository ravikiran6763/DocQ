
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


});
