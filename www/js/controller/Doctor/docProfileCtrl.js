DoctorQuickApp.controller('docProfileCtrl', function($scope,$rootScope,$state, $ionicConfig, $timeout, $window, $localStorage, $ionicLoading, doctorServices,rateDoctorServices,urlShortener) {

  $scope.toggle = true;
	$rootScope.headerTxt="Profile";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
  $rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;


console.log($state.$current.name);

$scope.getStars = function(rating) {
  // Get the value
  var val = parseFloat(rating);
  // Turn value into number/100
  var size = val/5*100;
  return size + '%';
}
  $scope.userDoctor = angular.fromJson($window.localStorage['doctorDetails']);
  console.log($scope.userDoctor);
	 $scope.$watch('toggle', function(){
			 $scope.toggleText = $scope.toggle ? 'Accept!' : 'Accepted';
	 });
// console.log($localStorage.user);
   rateDoctorServices.getDocRatingsByAll($localStorage.user).then(function(response){
   $scope.myDoctorRatings=response;//store the response array in doctor details
  //  console.log($scope.myDoctorRatings);
   $scope.ratings = [{
          current: $scope.myDoctorRatings,
          max: 5
      }, ];

   }).catch(function(error){
   console.log('failure data', error);
   });

$scope.showAlert= function(){
  alert('show url')
    urlShortener.shorten("http://ec2-52-66-68-161.ap-south-1.compute.amazonaws.com/prescription/DocQuik1542.jpeg");
}


})
