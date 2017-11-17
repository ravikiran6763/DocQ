
DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, $interval, $window, $timeout, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.hideSideMenu = true;
    $rootScope.showBadge=false;

    $scope.specialitiesList = angular.fromJson($window.localStorage['specialitiesList']);
    console.log($scope.specialitiesList);


       $scope.specialityDetailsNew=function(id){
         $localStorage.SpecilityId=id;
         console.log($localStorage.SpecilityId);
         medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
        		 .then(function(response){
        				console.log('Details', response);
        				$scope.specialityDetails = response;
               $ionicLoading.hide();
        		 }).catch(function(error){
        				 console.log('failure data', error);
        		 });
         $state.go("app.specialityDetailsNew");
       }


});
