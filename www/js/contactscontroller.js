DoctorQuickApp.controller('contactsCtrl', function($scope, $rootScope, $cordovaContacts, $state,$stateParams, $ionicLoading, $timeout, invitereviews){
  $scope.toggle = true;
  $rootScope.headerTxt="Invite Reviews";
  $rootScope.showBackBtn=true;
  $rootScope.showNotification=false;
  $rootScope.showBadge=false;
  $rootScope.hideSideMenu = false;
  $rootScope.inviteButton = true;


  $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";

  // console.log($stateParams.countofselected);

  $scope.phoneContacts = [];
  $rootScope.allContacts = invitereviews.getinvitecontacts();

  console.log($rootScope.allContacts);
  $scope.fetchContacts=0;
  // console.log(allContacts.length);
  for (var i = 0; i < $rootScope.allContacts.length; i++) {
    $rootScope.contact = $rootScope.allContacts[i];
    console.log($rootScope.contact);
    if($scope.fetchContacts === $rootScope.allContacts.length){
      $ionicLoading.hide();
    }

    // $scope.phoneContacts.push(contact);
    // console.log($scope.phoneContacts);
  }
  $scope.checkAll = function()
  {


              $ionicLoading.show({
                template:'<ion-spinner></ion-spinner><br>Selecting All Contacts',
                duration:7000
              });


          if ($scope.allcontacts.checked)
          {

          $scope.allcontacts.checked = true;
          console.log($scope.allcontacts.checked);

          // invitereviews.invitereviewforall($rootScope.contact).then(function(response){
          //
          //
          //   console.log(response);
          //
          // }).catch(function(error){
          // console.log('failure data', error);
          // })

          }
        else
        {

          $scope.allcontacts.checked = false;

          console.log($scope.allcontacts.checked);

        }

        $scope.selected=0;
        for (var i=0; i < $rootScope.contact.length; i++) {
          $rootScope.contact[i].checked = $scope.allcontacts.checked;
          $scope.selected++;
          if($scope.selected === $rootScope.contact.length){
             $ionicLoading.hide();
          }

        };



    }


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
    console.log($rootScope.selectedNumber.length);

    if($rootScope.selectedNumber.length == 0){
    $rootScope.selectedNumber=[];
    window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);

    }else{
    window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);

    }

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
