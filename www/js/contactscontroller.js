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
    $rootScope.contact1 = [];

    $rootScope.uniquename = {};
    // $rootScope.con = {};
    $rootScope.allcontacts = [];
    $rootScope.allcontacts.checked = false;

    $rootScope.allContacts = invitereviews.getinvitecontacts();
    for (var i = 0; i < $rootScope.allContacts.length; i++) {

      $rootScope.contact = $rootScope.allContacts[i];

    }

    invitereviews.getonlysinglecontact($rootScope.contact).then(function(response){
    //window.localStorage['allConatctsFetched'] = angular.toJson(response);
    $rootScope.contact1 = response;
    console.log(response);
    }).catch(function(error){
    console.log('failure data', error);
    })

    angular.forEach($rootScope.contact1, function(value,key) {
     $rootScope.con.checked = $rootScope.allcontacts.checked;
     console.log($rootScope.con.checked);

    });


    var contactsList=[];

    $scope.checkAll = function()
    {

        console.log($scope.allcontacts);
        var toggleStatus = $scope.allcontacts;
        console.log(toggleStatus);
        if(toggleStatus){
          angular.forEach($rootScope.contact1, function(itm)
          {
            itm.selected = toggleStatus;
            contactsList.push(itm.value);
            console.log(itm.value);
            // window.localStorage['allConatctsFetched'] = angular.toJson($scope.contactsList);
            // window.localStorage['allConatctsFetched'] = $scope.contactsList;


          });
          window.localStorage['allConatctsFetched'] = angular.toJson(contactsList);
        }
        else{
          contactsList=[];
          angular.forEach($rootScope.contact1, function(itm)
          {
            itm.selected = toggleStatus;
          });
          $scope.empty=[];
          window.localStorage['allConatctsFetched'] = angular.toJson($scope.empty);

        }

    }

      var singleContList=[];

      $scope.optionToggled = function(checkedvalue,value){
            console.log(checkedvalue);
            console.log(value);
            if(checkedvalue)
            {
              singleContList.push(value);
              window.localStorage['numbersToSendInvites'] = angular.toJson(singleContList);
              console.log(value);
            }
            else {
              var index = singleContList.indexOf(value);
              singleContList.splice(index, 1);
              console.log(value);
              window.localStorage['numbersToSendInvites'] = angular.toJson(singleContList);

            }

      }

});
