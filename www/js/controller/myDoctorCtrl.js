

DoctorQuickApp.controller('myDoctorCtrl', function($scope,$rootScope,$ionicConfig, $http, $state, $localStorage, $ionicLoading, doctorServices) {


	$rootScope.headerTxt="My Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

	$ionicLoading.show({
	    template: '<ion-spinner icon="dots"></ion-spinner>',
	    hideOnStageChange: true
	});

  doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
    $scope.myConsultedDoctors=response;
    console.log($scope.myConsultedDoctors);
    $state.go('app.my_doctors');
		$ionicLoading.hide();
  }).catch(function(error){
  console.log('failure data', error);
  });

})
