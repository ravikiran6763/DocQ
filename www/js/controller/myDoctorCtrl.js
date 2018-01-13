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
		    template: '<ion-spinner></ion-spinner><br><br>Loading',
		    // hideOnStageChange: true
		});

  doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
		// alert('list');
    $scope.myConsultedDoctors=response;
		if($scope.myConsultedDoctors){
			$ionicLoading.hide();
		}
		console.log($scope.myConsultedDoctors);
		$scope.getStars = function(rating) {
			// Get the value
			var val = parseFloat(rating);
			// Turn value into number/100
			var size = val/5*100;
			return size + '%';
		  // Get the value
		  var val = parseFloat(rating);
		  // Turn value into number/100
		  var size = val/5*100;
		  return size + '%';
		}
  }).catch(function(error){
  console.log('failure data', error);
  });


	$scope.viewDocProfile=function(docPhone,rates,total){
		$localStorage.docPhone=docPhone
		$rootScope.ratesForDoc=rates
		$rootScope.totalRate=total


	$state.go('app.viewdoctor_profile', {rates: $rootScope.ratesForDoc,totalRates: $rootScope.totalRate})
		// $state.go('app.viewdoctor_profile');


	}


})
