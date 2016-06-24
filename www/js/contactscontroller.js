DoctorQuickApp.controller('contactsCtrl', function($scope, $rootScope, $cordovaContacts,$state,invitereviews){
  $scope.toggle = true;
	$rootScope.headerTxt="Invite Reviews";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;


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
<<<<<<< HEAD

      var count = 0;



=======
      var uniquevalues = [];
>>>>>>> 50495e1409f3abfe4b4eebc4f3b1c40ff88eef97
      $scope.selectedcontacts = function(contactno)
      {
            if($scope.phones[contactno])
            {
<<<<<<< HEAD

                count++;



=======
                console.log(contactno);
>>>>>>> 50495e1409f3abfe4b4eebc4f3b1c40ff88eef97
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
<<<<<<< HEAD

                if(count === 3)
                {

                  $state.go('templates.inviteresult',{'countofselected':count});

                }

            }
            else
            {

              count--;

              //do noting
=======
            $state.go('templates.inviteresult');
            }
            else
            {
            //do noting
>>>>>>> 50495e1409f3abfe4b4eebc4f3b1c40ff88eef97
              console.log('not selected');
            }
      }
})
