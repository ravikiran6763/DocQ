DoctorQuickApp.controller('invite_reviewsforreferal', function($scope,$filter,$rootScope, $cordovaContacts,$window, $state,$stateParams, $ionicLoading, $timeout, invitereviews){
    $scope.toggle = true;
    $rootScope.headerTxt="Invite Reviews";
    $rootScope.showBackBtn=true;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;
    $rootScope.hideSideMenu = false;
    $rootScope.inviteButton = true;



    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";

    // console.log($stateParams.countofselected);

    $rootScope.contact = {};
    $scope.phoneContacts = [];
    $rootScope.contact1 = {};

    $rootScope.uniquename = {};
     // $rootScope.con = {};
      $rootScope.allcontacts = [];



$rootScope.allcontacts.checked = false;


    $rootScope.allContacts = invitereviews.getinvitecontacts();

      for (var i = 0; i < $rootScope.allContacts.length; i++) {

          $rootScope.contact = $rootScope.allContacts[i];

      }

    // $rootScope.contact1 = angular.fromJson($window.localStorage['allDeviceContacts']);

    invitereviews.getonlysinglecontact($rootScope.contact).then(function(response){
      // window.localStorage['allDeviceContacts'] = angular.toJson(response);
          $rootScope.contact1 = response;
          console.log(response);

           $ionicLoading.hide();


    }).catch(function(error){
    console.log('failure data', error);
    })



    angular.forEach($rootScope.contact1, function(value,key) {
           $rootScope.con.checked = $rootScope.allcontacts.checked;
           console.log($rootScope.con.checked);


         });


    $rootScope.allContactsSelected=[];
    window.localStorage['allConatctsFetched']=angular.toJson($rootScope.allContactsSelected);


});
