

DoctorQuickApp.controller('myDoctorCtrl', function($scope,$rootScope,$ionicConfig, $http, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices) {

	$rootScope.headerTxt="My Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

	$scope.getDocRatingsAll = function(doctorPhone) {
			// alert("Loaded!");

			console.log(doctorPhone);

			rateDoctorServices.getDocRatingsByAll(doctorPhone).then(function(response){
				$scope.docRating=response;
				console.log($scope.myConsultedDoctors);
				$ionicLoading.hide();
			}).catch(function(error){
			console.log('failure data', error);
			});
			$scope.ratings = [{
						current: $scope.docRating,
						max: 5
				}, ];
	};



	$ionicLoading.show({
	    template: '',
	    hideOnStageChange: true
	});



  doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
    $scope.myConsultedDoctors=response;
		$scope.ratings = [{
					current: 1,
					max: 5
			}, ];
    console.log($scope.myConsultedDoctors);
		$ionicLoading.hide();
  }).catch(function(error){
  console.log('failure data', error);
  });


	$scope.viewDocProfile=function(docPhone){
		$localStorage.docPhone=docPhone
		console.log(docPhone);
			$ionicLoading.show();
		$localStorage.DoctorPhone=docPhone;
		doctorServices.myDoctorsDetails($localStorage.docPhone).then(function(response){
		$scope.myDocDetails=response;
		console.log($scope.myDocDetails);
		$state.go('app.viewdoctor_profile');

		}).catch(function(error){
		console.log('failure data', error);
		});
			$ionicLoading.hide();


	}

})
