DoctorQuickApp.controller('inviteresultCtrl', function($scope,$state,$rootScope,$stateParams,$localStorage,$ionicLoading,invitereviews,invitereviewsresultservice){

  $scope.toggle = true;
  $rootScope.headerTxt="Invite Reviews";
  $rootScope.showBackBtn=true;
  $rootScope.showNotification=false;
  $rootScope.showBadge=false;
  $rootScope.hideSideMenu = true;
  $rootScope.inviteButton = false;

  $scope.count = $stateParams.countofselected;
  $scope.cc ={};
  $scope.contacts = {};

  $scope.cc.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";

  $scope.showAlert= function(){

    var options = {
      message: $scope.cc.query, // not supported on some apps (Facebook, Instagram)
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
$scope.Savedata = function()
{
  $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br><br>Sending invite'
      });
  console.log($localStorage.user);
      $scope.contacts = invitereviews.getinvitecontacts();
      invitereviews.sendsmstoinvitereviews($scope.contacts,$scope.cc.query,$localStorage.user).then(function(response){
        if(response){
          $ionicLoading.hide();
          $scope.contacts='';
          $state.go("templates.doctor_home")
        }
      }).catch(function(error){
      console.log('failure data', error);
      })
}


$scope.Cleardata = function()
{
  $scope.cc.query = "";
}



});
