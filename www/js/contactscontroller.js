DoctorQuickApp.controller('contactsCtrl', function($scope, $rootScope, $cordovaContacts, $state, $ionicLoading, $timeout, invitereviews){
  $scope.toggle = true;
	$rootScope.headerTxt="Invite Reviews";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.hideSideMenu = false;
  $rootScope.inviteButton = true;

  $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";


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
          console.log($scope.phoneContacts);

      };
      function onError(contactError) {
          alert(contactError);
      };
      var options = {};
      options.fields = ['phoneNumbers'];
      options.filter="";
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

      $scope.numbersToInvite = [];
    $scope.getNumber = function (checked) {
      console.log(checked);
      invitereviews.invitereviewpatient($scope.numbersToInvite);
      $scope.numbersToInvite.push(checked);

      console.log($scope.numbersToInvite);


    };


})
