DoctorQuickApp.controller('docAccStatementCtrl', function($scope, $rootScope, $ionicConfig, $localStorage, $filter, $ionicLoading, ionicDatePicker,accountsService) {
  console.log('Doc Account statements');
	$rootScope.headerTxt="Account Statement";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        // console.log(val);
        console.log('Selected from Date : ' + val, new Date(val));
        // $rootScope.from = $filter('date')(new Date(val),'yyyy-MM-dd HH:mm:ss Z');
        $rootScope.from = $filter('date')(new Date(val),'yyyy-MM-dd');
        // $localStorage.fromDate=$rootScope.from;
        accountsService.docAccountsDetails($rootScope.from);
      },

      from: new Date(2016, 1, 1), //Optional
      to: new Date(2050, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,
      dateFormat: 'dd MMMM yyyy',      //Optional
      templateType: 'popup'       //Optional
    };
// console.log($localStorage.fromDate);
    var ipObj2 = {
        callback: function (val) {  //Mandatory
          console.log('Selected To Date : ' + val, new Date(val));
          $rootScope.toDate = $filter('date')(new Date(val),'yyyy-MM-dd');
          // $localStorage.toDate=$rootScope.toDate;

          accountsService.docAccountsDetails();
        },

        from: new Date(2016, 1, 1), //Optional
        to: new Date(2050, 12, 31), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,
        dateFormat: 'dd MMMM yyyy',     //Optional
        templateType: 'popup'       //Optional
      };
      $scope.openDatePickerfrom = function(){
        ionicDatePicker.openDatePicker(ipObj1);
      };
    $scope.openDatePickerTo = function(){
      ionicDatePicker.openDatePicker(ipObj2);
    };
})
