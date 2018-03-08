DoctorQuickApp.controller('contactsCtrl', function($scope,$filter,$rootScope, $cordovaContacts, $state,$stateParams, $ionicLoading, $timeout, invitereviews){

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

    invitereviews.getonlysinglecontact($rootScope.contact).then(function(response){
    //window.localStorage['allConatctsFetched'] = angular.toJson(response);
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

    $scope.checkAll = function()
    {


            $ionicLoading.show({
            template: '<p>Selecting All contacts</p>'
            });

            // console.log($rootScope.contact.length);
            // console.log($scope.allcontacts);

            var toggleStatus = $scope.allcontacts;
            if(toggleStatus)
            {

                    var i = 0;
                    angular.forEach($rootScope.contact1, function(itm)
                    {
                        itm.selected = toggleStatus;
                        i++;

                        console.log(i);
                    });

                    if(i== $rootScope.contact.length)
                    {
                            console.log($rootScope.contact.length);
                            console.log(i);
                            $ionicLoading.hide();
                    }

            }
            else {

                    console.log('ALL CONATCTS UNSELECTED');
                    angular.forEach($rootScope.contact1, function(itm)
                    {
                      itm.selected = toggleStatus;
                    });
            }


            if(i>0)
            {

              $ionicLoading.hide();

            }
    }


    $scope.optionToggled = function(checkedvalue,value){

            $scope.allcontacts = $rootScope.contact1.every(function(itm){
              var togglevaue;
              return itm.selected;
            })
    }



});
