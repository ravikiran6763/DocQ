DoctorQuickApp.controller('doctorScreensCtrl', function($scope, $rootScope,$localStorage, $ionicConfig, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails) {

  	$rootScope.headerTxt="DoctorQuick";
		$rootScope.showBackBtn=false;
		$rootScope.showNotification=true;
		$rootScope.showBadge=true;
		$rootScope.showDocStatus=false;

    $scope.checkedValue=true;
    $scope.onoff=1;
	$rootScope.changeStatus = function (e)
	{
		$scope.checkedValue = "";
				if(e)
				{
						$scope.checkedValue = true;

						var whichdoctoronoff = {

							doctorphno : $localStorage.user,
							onoff : 1
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

						var whichdoctoronoff = {
								doctorphno : $localStorage.user,
								onoff : 2
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


})
