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

DoctorQuickApp.controller('contactsCtrl', function($scope, $cordovaContacts){
    // console.log('contacts');
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
      options.multiple = false;
      options.hasPhoneNumber =true;
      $cordovaContacts.find(options).then(onSuccess, onError);

})
