DoctorQuickApp.controller('docAccStatementCtrl', function($scope, $rootScope, $ionicConfig, ionicDatePicker) {
  console.log('Doc Account statements');
	$rootScope.headerTxt="Account Statement";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Selected from Date : ' + val, new Date(val));
      },

      from: new Date(2016, 1, 1), //Optional
      to: new Date(2050, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    var ipObj2 = {
        callback: function (val) {  //Mandatory
          console.log('Selected To Date : ' + val, new Date(val));
        },

        from: new Date(2016, 1, 1), //Optional
        to: new Date(2050, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
      };
      $scope.openDatePickerfrom = function(){
        ionicDatePicker.openDatePicker(ipObj1);
      };
    $scope.openDatePickerTo = function(){
      ionicDatePicker.openDatePicker(ipObj2);
    };
})
