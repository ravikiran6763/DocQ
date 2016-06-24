// DoctorQuickApp.controller('contactsCtrl', function($scope, $cordovaContacts, $rootScope){
//   $scope.toggle = false;
//   $rootScope.headerTxt="Invite Reviews";
//   $rootScope.showBackBtn=true;
//   $rootScope.checkedValue = false;
//   $rootScope.showBadge=false;
//   $rootScope.showDocStatus=false;
//
//        $scope.getContacts = function() {
//          $scope.phoneContacts = [];
//          function onSuccess(contacts) {
//            for (var i = 0; i < contacts.length; i++) {
//              var contact = contacts[i];
//              $scope.phoneContacts.push(contact);
//            }
//          };
//          function onError(contactError) {
//            alert(contactError);
//          };
//          var options = {};
//          options.multiple = true;
//          $cordovaContacts.find(options).then(onSuccess, onError);
//        };
//      })

DoctorQuickApp.controller('contactsCtrl', function($scope, $cordovaContacts,$state,invitereviews){

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



      $scope.selectedcontacts = function(contactno)
      {



            if($scope.phones[contactno])
            {

                count++;



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
              console.log('not selected');


            }



      }




})
