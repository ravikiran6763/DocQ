DoctorQuickApp.controller('docProfileCtrl', function($scope,$rootScope,$state, $ionicConfig, $timeout, $window, $localStorage, $ionicLoading,$cordovaSocialSharing, doctorServices,rateDoctorServices,urlShortener) {

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

  var options = {
    message: 'share this', // not supported on some apps (Facebook, Instagram)
    // subject: 'the subject', // fi. for email
    // files: ['', ''], // an array of filenames either locally or remotely
    // url: 'https://www.website.com/foo/#bar?a=b',
    chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
  }

  var onSuccess = function(result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  }

  var onError = function(msg){
    console.log("Sharing failed with message: " + msg);
  }

  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
  // $cordovaSocialSharing.share(message, subject, file, link) // Share via native share sheet
  //   .then(function(result) {
  //     // Success!
  //   }, function(err) {
  //     // An error occured. Show a message to the user
  //   });
  //   urlShortener.shorten("http://ec2-52-66-68-161.ap-south-1.compute.amazonaws.com/prescription/DocQuik1542.jpeg");
}


})
