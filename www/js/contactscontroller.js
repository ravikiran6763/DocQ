DoctorQuickApp.controller('contactsCtrl', function($scope,$filter,$rootScope, $cordovaContacts, $state,$stateParams, $ionicLoading, $timeout, invitereviews){



    console.log('contact controller called');


    $scope.toggle = true;
    $rootScope.headerTxt="Invite Reviews";
    $rootScope.showBackBtn=true;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;
    $rootScope.hideSideMenu = false;
    $rootScope.inviteButton = true;

    $ionicLoading.hide();

    $scope.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";


    $rootScope.contact = [];
    $scope.phoneContacts = [];
   $rootScope.contact1 = [];
    $rootScope.single={};

    $rootScope.check = [];


    $rootScope.allcontacts=[];



  $rootScope.allcontacts.checked = false;
  $rootScope.single.checked = false;





    $rootScope.allContacts = invitereviews.getinvitecontacts();

      for (var i = 0; i < $rootScope.allContacts.length; i++) {
          $rootScope.contact = $rootScope.allContacts[i];
         console.log($rootScope.contact);
      }



    invitereviews.getonlysinglecontact($rootScope.contact).then(function(response){
      console.log($rootScope.contact);
      //window.localStorage['allConatctsFetched'] = angular.toJson(response);
         $rootScope.contact1  = response;

         console.log($rootScope.contact1);

    }).catch(function(error){
    console.log('failure data', error);
    })


      $scope.checkAll = function(checkedvalue,value)
      {


          if(checkedvalue)
          {

              if(value == 3)
              {

                angular.forEach($rootScope.contact1, function(value,key) {
                $rootScope.single.checked = checkedvalue;

                console.log(key,value,checkedvalue);


                });


              }
              else {





                console.log('this is for single contacts');


              }



          }
          else
          {

            if(value ==3)
            {

              angular.forEach($rootScope.contact1, function(value,key) {
              $rootScope.single.checked = checkedvalue;

              console.log(key,value,$rootScope.single.checked);


              });


            }
            else
            {

                $rootScope.single.checked = false;



            }


          }


          // angular.forEach($rootScope.contact1, function(value,key) {
          // $rootScope.single.checked = $rootScope.allcontacts.checked;
          //
          // });


      }


});
