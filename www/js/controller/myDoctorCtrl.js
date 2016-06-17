

DoctorQuickApp.controller('myDoctorCtrl', function($scope,$rootScope,$ionicConfig, $http, $state, $localStorage, doctorServices) {


	$rootScope.headerTxt="My Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

  doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
    $scope.myConsultedDoctors=response;
    console.log($scope.myConsultedDoctors);
    $state.go('app.my_doctors');
  }).catch(function(error){
  console.log('failure data', error);
  });

})
