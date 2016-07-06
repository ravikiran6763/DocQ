
DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;

    $scope.sendrequesttoonlinedoctors = function(id)
    {
      console.log('buttonclickrd');
      $ionicLoading.show();
      medicalSpecialityService.sendrequesttodoctor(id).then(function(response){
          // console.log('successfull data', response);
          $scope.requestSent = response;
          console.log($scope.requestSent);
          $ionicLoading.hide();
       }).catch(function(error){
           console.log('failure data', error);
       });;

    }

    medicalSpecialityService.getMedicalSpecialist()
    .then(function(response){
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
