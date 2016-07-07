

DoctorQuickApp.controller('myDoctorCtrl', function($scope,$rootScope,$ionicConfig, $http, $state, $localStorage, $ionicLoading, doctorServices) {


	$rootScope.headerTxt="My Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

	$ionicLoading.show({
	    template: '<ion-spinner icon="dots"></ion-spinner>',
	    hideOnStageChange: true
	});

	$scope.ratings = [{
 				current: 4,
 				max: 5
 		}, ];

  doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
    $scope.myConsultedDoctors=response;
    console.log($scope.myConsultedDoctors);
    $state.go('app.my_doctors');
		$ionicLoading.hide();
  }).catch(function(error){
  console.log('failure data', error);
  });


	$scope.viewDocProfile=function(docPhone){
			$ionicLoading.show();
		$localStorage.DoctorPhone=docPhone;
		doctorServices.myDoctorsDetails($localStorage.DoctorPhone).then(function(response){
		$scope.myDocDetails=response;
		console.log($scope.myDocDetails);
		$state.go('app.viewdoctor_profile');

		}).catch(function(error){
		console.log('failure data', error);
		});
			$ionicLoading.hide();


	}

})
