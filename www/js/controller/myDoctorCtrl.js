DoctorQuickApp.controller('myDoctorCtrl', function($scope,$rootScope,$ionicConfig, $http, $timeout, $interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices) {

	$rootScope.headerTxt="My Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

 $interval(callAtInterval, 5000);

	function callAtInterval() {
		doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
			$scope.myConsultedDoctors=response;
			$scope.ratings = [{
						current: 1,
						max: 5
				}, ];
			// console.log($scope.myConsultedDoctors);
			$ionicLoading.hide();
		}).catch(function(error){
		console.log('failure data', error);
		});
		// console.log('callAtInterval');
	}

	$scope.getDocRatingsAll = function(doctorPhone) {
			// alert("Loaded!");

			console.log(doctorPhone);

			rateDoctorServices.getDocRatingsByAll(doctorPhone).then(function(response){
				$scope.docRating=response;
				console.log($scope.myConsultedDoctors);
				$ionicLoading.hide();

				$scope.$watch('docRating', function() {
			 // do something here

	 }, true);
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
		$ionicLoading.show();
		doctorServices.myDoctorsDetails($localStorage.docPhone).then(function(response){
		$scope.myDocDetails=response;
		console.log('doc',$scope.myDocDetails);
		$state.go('app.viewdoctor_profile');

		}).catch(function(error){
		console.log('failure data', error);
		});
			$ionicLoading.hide();
	}

	$scope.doRefresh = function() {
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      // $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
      //Stop the ion-refresher from spinning
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
      $scope.$broadcast('scroll.refreshComplete');

    }, 1000);

  };

})
