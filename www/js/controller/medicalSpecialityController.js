
DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, $interval, $timeout, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;

    medicalSpecialityService.getMedicalSpecialist().then(function(response){
      $ionicLoading.show();
        console.log('successfull data', response);
        $scope.specialitiesList = response;
          $ionicLoading.hide();
     }).catch(function(error){
         console.log('failure data', error);
     });

     medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
 		 .then(function(response){
 				console.log('Details', response);
 				$scope.specialityDetails = response;
        $ionicLoading.hide();
 		 }).catch(function(error){
 				 console.log('failure data', error);
 		 });





});
