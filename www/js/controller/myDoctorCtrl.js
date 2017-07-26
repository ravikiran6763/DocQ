DoctorQuickApp.controller('myDoctorCtrl', function($scope,$rootScope,$ionicConfig, $http, $timeout, $interval, $state, $localStorage, $ionicLoading, doctorServices,rateDoctorServices) {

	$rootScope.headerTxt="My Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;



 var username = "greet+"+$localStorage.user;
 var password = "DQ_patient";

	$scope.getDocRatingsAll = function(doctorPhone) {
			// alert("Loaded!");
			console.log(doctorPhone);
			rateDoctorServices.getDocRatingsByAll(doctorPhone).then(function(response){
				$scope.docRating=response;
				console.log($scope.docRating);
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
		// alert('list');
    $scope.myConsultedDoctors=response;
		console.log($scope.myConsultedDoctors.length);
		$scope.ratings = [{
					current: 0,
					max: 5
			}];
		$ionicLoading.hide();
  }).catch(function(error){
  console.log('failure data', error);
  });


	$scope.viewDocProfile=function(docPhone,rates,total){
		$localStorage.docPhone=docPhone
		$rootScope.ratesForDoc=rates
		$rootScope.totalRate=total
		console.log($localStorage.ratesForDoc);
		console.log($localStorage.totalRate);

	$state.go('app.viewdoctor_profile', {rates: $rootScope.ratesForDoc,totalRates: $rootScope.totalRate})
		// $state.go('app.viewdoctor_profile');
		console.log($localStorage.docPhone);

	}


})
