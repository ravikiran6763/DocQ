DoctorQuickApp.controller('doctorScreensCtrl', function($scope, $rootScope,$localStorage, $ionicConfig, $interval, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails) {

  	$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;


  if($localStorage.onOff == 1){
    $scope.checkedValue=true;
  }

	$rootScope.changeStatus = function (e)
	{
		$scope.checkedValue = true;
				if(e)
				{
						$scope.checkedValue = true;
            $localStorage.onOff=1
						var whichdoctoronoff = {
							doctorphno : $localStorage.user,
							onoff : $localStorage.onOff
						}
						doctoronoffdetails.doctoronoff(whichdoctoronoff);

							var uname1 = "greet+"+$localStorage.user;

								var pw1 = "DQ_doctor";


								console.log(uname1);
								console.log(pw1);

								var success = function(message)
								{
									alert(message);
								}

								var failure = function()
								{
									alert("Error calling Hello Plugin");
								}

								hello.login(uname1,pw1,success, failure);

				}
				else
				{
						$scope.checkedValue = false;
            $localStorage.onOff=2
						var whichdoctoronoff = {
								doctorphno : $localStorage.user,
								onoff : $localStorage.onOff
					}
					doctoronoffdetails.doctoronoff(whichdoctoronoff);


					var unametologout = "greet+"+$localStorage.user;
					var pwtologout = "DQ_doctor";

						alert(unametologout);
					var success = function(message)
					{
						alert(message);
					}
					var failure = function()
					{
						alert("Error calling Hello Plugin");
					}
					hello.logout(unametologout,pwtologout,success, failure);

				}

		$scope.docStatus = [
	    {name: 'one', hidden: true},

	  	];

			console.log('check box changed', $scope.checkedValue);
		// $rootScope.showDocStatus=true;

	}

  $scope.res = {};
    doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
    $scope.res = response;
    console.log($scope.res);
    }).catch(function(error){
    console.log('failure data', error);
    })


    $interval(callAtInterval, 5000);

   	function callAtInterval() {
      doctoronoffdetails.getdoctorrequest($localStorage.user).then(function(response){
      $scope.res = response;
      // console.log($scope.res);
      }).catch(function(error){
      console.log('failure data', error);
      })

   		// console.log('callAtInterval');
   	}

})
