DoctorQuickApp.controller('invite_reviewsforreferal', function($scope,$filter,$rootScope, $cordovaContacts,$window, $state,$stateParams, $ionicLoading, $timeout, invitereviews){


    $scope.toggle = true;
    $rootScope.headerTxt="Refer A Friend";
    $rootScope.showBackBtn=true;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;
    $rootScope.hideSideMenu = false;
    $rootScope.inviteButtonforref = true;

    console.log('this file called');


    $rootScope.contact2 = {};
    $scope.phoneContacts = [];
    $rootScope.contact3 = {};

    $rootScope.uniquename = {};
     // $rootScope.con = {};
      $rootScope.allcontactsforref = [];



$rootScope.allcontactsforref.checked = false;


    $rootScope.allContacts1 = invitereviews.getinvitecontacts();

      for (var i = 0; i < $rootScope.allContacts1.length; i++) {

          $rootScope.contact2 = $rootScope.allContacts1[i];

      }

    // $rootScope.contact1 = angular.fromJson($window.localStorage['allDeviceContacts']);

    invitereviews.getonlysinglecontact($rootScope.contact2).then(function(response){
      // window.localStorage['allDeviceContacts'] = angular.toJson(response);
          $rootScope.contact3 = response;
          console.log(response);

           $ionicLoading.hide();


    }).catch(function(error){
    console.log('failure data', error);
    })



    angular.forEach($rootScope.contact3, function(value,key) {
           $rootScope.con.checked = $rootScope.allcontactsforref.checked;
           console.log($rootScope.con.checked);


         });


    $rootScope.allContactsSelected=[];
    window.localStorage['allConatctsFetchedforref']=angular.toJson($rootScope.allContactsSelected);


    $scope.checkAllforref = function(checkedstatus)
    {


      var toggleStatus = checkedstatus;


      if(toggleStatus)
      {
          // var i = 0;
          angular.forEach($rootScope.contact3, function(itm)
          {
            itm.selected = toggleStatus;
              // i++;
              console.log(itm.value);
              $rootScope.allContactsSelected.push(itm.value);
              console.log($rootScope.allContactsSelected);
              window.localStorage['allConatctsFetchedforref'] = angular.toJson($rootScope.allContactsSelected);
          });

          // if(i== $rootScope.contact.length)
          // {
          //   console.log($rootScope.contact.length);
          //   console.log(i);
          //   $ionicLoading.hide();
          // }


      }
      else {
        $rootScope.allContactsSelected=[];
        window.localStorage['allConatctsFetchedforref'] = angular.toJson($rootScope.allContactsSelected);

        console.log($rootScope.allContactsSelected);
        console.log('ALL CONATCTS UNSELECTED');
        angular.forEach($rootScope.contact3, function(itm)
        {
          console.log(itm);

          itm.selected = toggleStatus;
        });


      }


      if(i>0)
      {
        $ionicLoading.hide();

      }

    }



    $rootScope.selectedNumber=[];
    window.localStorage['numbersToSendRef']=angular.toJson($rootScope.selectedNumber);

    $scope.optionToggled = function(checkedvalue,value){
        console.log(checkedvalue);
        console.log(value);
        if(checkedvalue)
              {

                $rootScope.selectedNumber.push(value);
                console.log($rootScope.selectedNumber);
                window.localStorage['numbersToSendRef'] = angular.toJson($rootScope.selectedNumber);

              }
              else {

                  var index = $rootScope.selectedNumber.indexOf(value);
                  $rootScope.selectedNumber.splice(index, 1);

                  console.log($rootScope.selectedNumber);
                  window.localStorage['numbersToSendRef'] = angular.toJson($rootScope.selectedNumber);


              }
        $scope.allcontacts = $rootScope.contact1.every(function(itm){
        var togglevaue;
        return itm.selected;
        })

    }



});
