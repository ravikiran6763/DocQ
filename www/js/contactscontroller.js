DoctorQuickApp.controller('contactsCtrl', function($scope, $rootScope, $cordovaContacts, $state, $ionicLoading, $timeout, invitereviews){
  $scope.toggle = true;
	$rootScope.headerTxt="Invite Reviews";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.hideSideMenu = false;
  $rootScope.inviteButton = true;

  $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";

  $scope.showAlert= function(){

    var options = {
      message: $scope.query, // not supported on some apps (Facebook, Instagram)
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

  $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br><p>Fetching all your contacts</p>'
      });

      $timeout(function () {
        console.log('timeout');
       $ionicLoading.hide();
     }, 5000);


      $scope.phoneContacts = [];
      function onSuccess(contacts) {
          for (var i = 0; i < contacts.length; i++) {
          var contact = contacts[i];
          $scope.phoneContacts.push(contact);
          }

      };
      function onError(contactError) {
          alert(contactError);
      };
      var options = {};
      // options.filter="mobile";
      options.multiple = true;
      options.hasPhoneNumber =true;
      $cordovaContacts.find(options).then(onSuccess, onError);
      $scope.selectedlist = "";
      $scope.phones = {};

      // var count = 0;
      var uniquevalues = [];
      $scope.selectedcontacts = function(contactno)
      {
            if($scope.phones[contactno])
            {
                // count++;
                console.log(contactno);
                $scope.selectedlist = contactno.split(' ').join('');
              if($scope.selectedlist.length > 10)
              {
                $scope.selectedlist = $scope.selectedlist.substring(3);
              }
              else
              {
                  $scope.selectedlist = $scope.selectedlist;
              }
              invitereviews.invitereviewpatient($scope.selectedlist);


            // if(count === 3)
            // {
            //   $state.go('templates.inviteresult',{'countofselected':count});
            // }

            }
            // else
            // {
            //
            //   count--;
            //   //do noting
            // // $state.go('templates.inviteresult');
            // }

            $ionicLoading.hide();
      }

      $scope.phones = { };
    $scope.getNumber = function (checked) {
      console.log(checked);
      invitereviews.invitereviewpatient($scope.phones);

    



    };


})
