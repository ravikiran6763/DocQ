DoctorQuickApp.controller('contactsCtrl', function($scope,$filter,$rootScope, $cordovaContacts, $state,$stateParams, $ionicLoading, $timeout, invitereviews){
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

    $rootScope.contact = {};
    $scope.phoneContacts = [];


    $rootScope.allContacts = invitereviews.getinvitecontacts();

      for (var i = 0; i < $rootScope.allContacts.length; i++) {

          $rootScope.contact = $rootScope.allContacts[i];

      }





      $scope.checkAll = function()
      {


                    $ionicLoading.show({
                      template:'<ion-spinner></ion-spinner><br>Selecting All Contacts'
                    });


        if ($scope.allcontacts.checked)
        {

            $scope.allcontacts.checked = true;
            console.log($scope.allcontacts.checked);

                invitereviews.invitereviewforall($rootScope.contact).then(function(response){

                  window.localStorage['allConatctsFetched'] = angular.toJson(response);
                  console.log(response);

                }).catch(function(error){
                console.log('failure data', error);
                })

        }
        else
        {

          $scope.allcontacts.checked = false;
          $scope.unChecked=[];
            window.localStorage['allConatctsFetched'] = angular.toJson($scope.unChecked);
          console.log($scope.allcontacts.checked);

        }


        for (var i=0; i < $rootScope.contact.length; i++) {
       $rootScope.contact[i].checked = $scope.allcontacts.checked;

        $ionicLoading.hide();


     };

      }


    $scope.numbersToInvite = [];
    $scope.phones = {};
  var index = 0;

    $rootScope.selectedNumber=[];

    $scope.getNumber=function(checkedvalue,number){



      // angular.forEach($scope.phones, function(value, key) {
      //   if(value){
      //


        var pushNumber = number.replace(/ /g, '');
        console.log(pushNumber);


        if(checkedvalue)
        {

          $rootScope.selectedNumber.push(number);
          console.log($rootScope.selectedNumber);
          window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);
        }
        else {

          console.log(number);
                 // $rootScope.selectedNumber.splice(number);

                 var index = $rootScope.selectedNumber.indexOf(number);
                 $rootScope.selectedNumber.splice(index, 1);

                 console.log($rootScope.selectedNumber);
                 window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);
                 

        }





          // if($rootScope.selectedNumber.length == 0){
          //   $rootScope.selectedNumber=[];
          //   window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);
          //
          // }else{
          //   window.localStorage['numbersToSendInvites'] = angular.toJson($rootScope.selectedNumber);
          //
          // }





      // invitereviews.selectedContacts($rootScope.selectedNumber);
    //     }
    // });


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


});
