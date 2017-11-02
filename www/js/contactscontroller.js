DoctorQuickApp.controller('contactsCtrl', function($scope, $rootScope, $cordovaContacts, $state, $ionicLoading, $timeout, invitereviews){
  $scope.toggle = true;
	$rootScope.headerTxt="Invite Reviews";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.hideSideMenu = false;
  $rootScope.inviteButton = true;

  $ionicLoading.show({
        template: '<p>Fetching all your contacts...</p><ion-spinner></ion-spinner>'
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

      var count = 0;
      var uniquevalues = [];
      $scope.selectedcontacts = function(contactno)
      {
            if($scope.phones[contactno])
            {
                count++;
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
            else
            {

              count--;
              //do noting
            $state.go('templates.inviteresult');
            }

            $ionicLoading.hide();
      }


})
