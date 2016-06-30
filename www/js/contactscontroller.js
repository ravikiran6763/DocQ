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
      var count = 0;


>>>>>>> 3b3ff4e4626d16d032aa8e5c88309f52d6f1e9a1
      var uniquevalues = [];
      $scope.selectedcontacts = function(contactno)
      {
            if($scope.phones[contactno])
            {
<<<<<<< HEAD


                count++;



                console.log(contactno);
=======
    count++;


                console.log(contactno);

>>>>>>> 3b3ff4e4626d16d032aa8e5c88309f52d6f1e9a1
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


                if(count === 3)
                {

                  $state.go('templates.inviteresult',{'countofselected':count});

                }

            }
            else
            {

              count--;

              //do noting

            $state.go('templates.inviteresult');

            }
<<<<<<< HEAD
            // else
            // {
            // //do noting
            //
            //   console.log('not selected');
            // }
=======
            else
            {
            //do noting

              console.log('not selected');
            }
>>>>>>> 3b3ff4e4626d16d032aa8e5c88309f52d6f1e9a1
      }
})
