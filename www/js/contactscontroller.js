DoctorQuickApp.controller('contactsCtrl', function($scope, $rootScope, $cordovaContacts, $state,$stateParams, $ionicLoading, $timeout, invitereviews){
    $scope.toggle = true;
    $rootScope.headerTxt="Invite Reviews";
    $rootScope.showBackBtn=true;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;
    $rootScope.hideSideMenu = false;
    $rootScope.inviteButton = true;

    $ionicLoading.hide();

    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";

    // console.log($stateParams.countofselected);

    $scope.phoneContacts = [];
  $rootScope.allContacts = invitereviews.getinvitecontacts();

console.log($rootScope.allContacts);
    // console.log(allContacts.length);
      for (var i = 0; i < $rootScope.allContacts.length; i++) {
          $rootScope.contact = $rootScope.allContacts[i];
          console.log($rootScope.contact);
          // $scope.phoneContacts.push(contact);
          // console.log($scope.phoneContacts);
      }

    //
    // $ionicLoading.show({
    //   template: '<ion-spinner></ion-spinner><br><p>Fetching your contacts</p>'
    // });
    //
    //  $timeout(function () {
    //    console.log('timeout');
    //
    // }, 5000);



    // function onSuccess(contacts) {
    //
    //   $ionicLoading.hide();
    // for (var i = 0; i < contacts.length; i++) {
    //
    //
    // var contact = contacts[i];
    // $scope.phoneContacts.push(contact);
    // }
    // console.log($scope.phoneContacts);
    //
    // };
    // function onError(contactError) {
    // alert(contactError);
    // };
    // var options = {};
    // options.fields = ['phoneNumbers'];
    // options.filter="";
    // options.multiple = true;
    // options.hasPhoneNumber =true;
    // $cordovaContacts.find(options).then(onSuccess, onError);
    // $scope.selectedlist = "";
    //
    //
    // var count = 0;
    // var uniquevalues = [];
    // $scope.selectedcontacts = function(contactno)
    // {
    //       if($scope.phones[contactno])
    //       {
    //               // count++;
    //               console.log(contactno);
    //               $scope.selectedlist = contactno.split(' ').join('');
    //               if($scope.selectedlist.length > 10)
    //               {
    //               $scope.selectedlist = $scope.selectedlist.substring(3);
    //               }
    //               else
    //               {
    //               $scope.selectedlist = $scope.selectedlist;
    //               }
    //               invitereviews.invitereviewpatient($scope.selectedlist);
    //
    //
    //       }
    //       // else
    //       // {
    //       //
    //       //   count--;
    //       //   //do noting
    //       // // $state.go('templates.inviteresult');
    //       // }
    //
    //       $ionicLoading.hide();
    // }

    $scope.numbersToInvite = [];
    $scope.phones = {};
    console.log($scope.myChange);
    $scope.getNumber=function(number){
      $rootScope.selectedNumber=[];
      angular.forEach($scope.phones, function(value, key) {
        if(value){
        var pushNumber = key.replace(/ /g, '');
        console.log(pushNumber);
          $rootScope.selectedNumber.push(parseInt(pushNumber));
          console.log($rootScope.selectedNumber);
          window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);
      // invitereviews.selectedContacts($rootScope.selectedNumber);
        }
    });
    }


    // $scope.getNumber = function (checked) {
    //
    //   invitereviews.invitereviewpatient($scope.numbersToInvite);
    //   $scope.numbersToInvite.push(checked);
    //
    //   console.log($scope.numbersToInvite);
    //
    //
    // };


})
