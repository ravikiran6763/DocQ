DoctorQuickApp.controller('docProfileCtrl', function($scope,$rootScope, $ionicConfig, $localStorage, doctorServices,rateDoctorServices) {

  $scope.toggle = true;
	$rootScope.headerTxt="Doctor Profile";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  doctorServices.doctorDetails($localStorage.user).then(function(response){
      $scope.doctor_details=response;//store the response array in doctor details
      console.log($scope.doctor_details);
  }).catch(function(error){
    console.log('failure data', error);
  });

	 $scope.$watch('toggle', function(){
			 $scope.toggleText = $scope.toggle ? 'Accept!' : 'Accepted';
	 });
// console.log($localStorage.user);
   rateDoctorServices.getDocRatingsByAll($localStorage.user).then(function(response){
   $scope.myDoctorRatings=response;//store the response array in doctor details
   console.log($scope.myDoctorRatings);
   $scope.ratings = [{
          current: $scope.myDoctorRatings,
          max: 5
      }, ];

   }).catch(function(error){
   console.log('failure data', error);
   });

})
