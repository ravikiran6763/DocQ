
DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, medicalSpecialityService) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;


    $scope.sendrequesttoonlinedoctors = function(id)
    {


        medicalSpecialityService.sendrequesttodoctor(id);
        


    }





});
