DoctorQuickApp.controller('consultSummaryCtrl', function($state, $ionicHistory,$rootScope,$stateParams,$window,$timeout,$scope,$rootScope,$ionicConfig, $http, $ionicLoading, $localStorage, LoginService, myConsultationService, rateDoctorServices,doctorServices,patientProfileDetailsService) {
	$rootScope.headerTxt="Summary";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification = false;
	$rootScope.hideSideMenu = false;


	$scope.rating = {};
	  $scope.rating.rate = 3;
	  $scope.rating.max = 5;

console.log($stateParams.calledDoctor);

$ionicLoading.show();

patientProfileDetailsService.updatenotesflag($stateParams.consultId).then(function(response){
		// console.log(response);
	 console.log('success');
 }).catch(function(error){
	 console.log('failure data', error);
 })
var key = this;

$scope.setRating = function(ratings,val){
	var rtgs = $scope.ratingArr;
	for (var i = 0; i < rtgs.length; i++) {
		if (i < val) {
			rtgs[i].icon = 'ion-ios-star';
		} else {
			rtgs[i].icon = 'ion-ios-star-outline';
		}
	};

	$rootScope.ratingValue = ratings;

	console.log(ratings);
	if(ratings <= 3)
	{
			$scope.unhappy = true;
			$scope.happy = false;
			console.log($scope.unhappy);
	}
	else if (ratings >= 4)
	{
			$scope.happy = true;
			$scope.unhappy = false;
			$timeout(function() { $scope.displayErrorMsg = false;}, 2000);
			window.plugins.toast.showWithOptions({
			message: "Thank you for your ratings",
			duration: "short", // 2000 ms
			position: "bottom",
			styling: {
			opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
			textColor: '#ffffff', // Ditto. Default #FFFFFF
			textSize: 13, // Default is approx. 13.
			cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			horizontalPadding: 16, // iOS default 16, Android default 50
			verticalPadding: 12 // iOS default 12, Android default 30
			}
			});
			// $ionicHistory.clearCache();
			$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true,
			historyRoot:true
			});


			var ratedValues={
				rates:$rootScope.ratingValue,
				//ratedBy:$localStorage.user,
				ratedTo:$stateParams.calledDoctor
				//ratingComments:$scope.ratingComments.comment
			};
			console.log(ratedValues);
			rateDoctorServices.rateDoctor(ratedValues).then(function(response){
				// // console.log(ratedValues);
				// $scope.rated=response;
				// console.log($scope.rated);
				// $scope.ratingComments.comment="";

				//$state.go('app.patient_home', {}, {reload: true});
				$ionicHistory.nextViewOptions({
				disableAnimate: true,
				disableBack: true,
				historyRoot:true
				});
				$state.go('app.patient_home',{},{location: "replace", reload: false});


			}).catch(function(error){
				console.log('failure data', error);
			});



	}
	else
	{
			$scope.unhappy = true;
			$scope.happy = false;
	}
}

	$scope.ratingss = [{
		 current: 4,
		 max: 5
 }];

var myDoc={
	calledDoctor:$stateParams.calledDoctor,
	patient:$localStorage.user
}
console.log(myDoc);
 myConsultationService.docSummaryDetails(myDoc).then(function(response){
 		$scope.myDoctor=response;//store the response array in doctor details
 		console.log($scope.myDoctor);
 		$ionicLoading.hide();
 }).catch(function(error){
 	console.log('failure data', error);
 });

$scope.ratingsObject = {
		iconOn: 'ion-ios-star',    //Optional
		iconOff: 'ion-ios-star-outline',   //Optional
		iconOnColor: 'rgb(200, 200, 100)',  //Optional
		iconOffColor:  'rgb(200, 100, 100)',    //Optional
		// minRating:,    //Optional
		readOnly: false, //Optional
		callback: function(rating) {    //Mandatory
			$scope.ratingsCallback(rating);
		}
	};

      $scope.ratingsCallback = function(rating){
        console.log('Selected rating is : ', rating);
      };


			$rootScope.ratingValue;
			$scope.ratingsCallback = function(rating) {
				$rootScope.ratingValue=rating;
				// console.log('Selected rating is : ', rating);
					console.log('Selected rating is : ', $rootScope.ratingValue);
								if(rating <= 3)
								{
										$scope.unhappy = true;
										$scope.happy = false;
								}
								else if (rating >= 4)
								{
										$scope.happy = true;
										$scope.unhappy = false;
								}
								else
								{
										$scope.unhappy = false;
										$scope.happy = false;
								}
			};


			$scope.ratingComments={};

			$scope.sendRatings=function()
			{

					$scope.patient_details ={};
					// $scope.userPhone=LoginService.returnUserPhone();

					if($scope.ratingComments.comment)
					{


						var ratedValues={
							rates:$rootScope.ratingValue,
							//ratedBy:$localStorage.user,
							ratedTo:$stateParams.calledDoctor,
							ratingComments:$scope.ratingComments.comment
						};
						console.log(ratedValues);
						rateDoctorServices.rateDoctor(ratedValues).then(function(response){
							console.log(ratedValues);
							$scope.rated=response;
							console.log($scope.rated);
							$scope.ratingComments.comment="";

							//$state.go('app.patient_home', {}, {reload: true});
							$ionicHistory.nextViewOptions({
							disableAnimate: true,
							disableBack: true,
							historyRoot:true
							});
							$state.go('app.patient_home',{},{location: "replace", reload: false});


						}).catch(function(error){
							console.log('failure data', error);
						});


					}
					else
					{

						window.plugins.toast.showWithOptions({
						message: "Please Enter Rating Comments",
						duration: "short", // 2000 ms
						position: "bottom",
						styling: {
						opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
						backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
						textColor: '#ffffff', // Ditto. Default #FFFFFF
						textSize: 13, // Default is approx. 13.
						cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
						horizontalPadding: 16, // iOS default 16, Android default 50
						verticalPadding: 12 // iOS default 12, Android default 30
						}
						});
						$timeout(function() {
							 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
						}, 1000);



					}





				}

		var myDocratedValues={
		ratedBy:$localStorage.user,
		ratedTo:$localStorage.consultedDoctor
		// ratedTo:$localStorage.consultedDoctor
		};

		rateDoctorServices.getDocRatingsByMe(myDocratedValues).then(function(response){
			$rootScope.myDocRating = response;
				$scope.myRating=$rootScope.myDocRating;
				console.log($scope.myRating);
			}).catch(function(error){
				console.log('failure data', error);
		});

		//to fetch the overall Rating o0f a doctor

rateDoctorServices.getDocRatingsByAll($stateParams.calledDoctor).then(function(response){
		// rateDoctorServices.getDocRatingsByAll($localStorage.consultedDoctor).then(function(response){
			$rootScope.myDocRating = response;
				$scope.myRating=$rootScope.myDocRating;
				$scope.ratings = [{
	 		        current: $scope.myRating,
	 		        max: 5
	 		    }, ];
				console.log('rating',$scope.myRating);
			}).catch(function(error){
				console.log('failure data', error);
		});

$scope.addToFavorite=function(fav){
	$scope.favorite=fav;
	console.log($scope.favorite);
if($scope.favorite == true){
	$scope.favorite=1;

	}
	else{
		$scope.favorite=2;

	}

	var favoriteDoc={
		ratedBy:$localStorage.user,
		ratedTo:$stateParams.calledDoctor,
		favorite:$scope.favorite
	};

	console.log(favoriteDoc);
$scope.added={};
   // Do whatever you want here
	 rateDoctorServices.addToFavorite(favoriteDoc).then(function(response){
		 $scope.added=response;
		 console.log(response);
		 //console.log($scope.added.favorite);
		 if($scope.added.favorite == 1){
			 //console.log($scope.added.favorite);

			 window.plugins.toast.showWithOptions({
			 message: "Doctor Added to favorites",
			 duration: "short", // 2000 ms
			 position: "bottom",
			 styling: {
			 opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			 backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
			 textColor: '#ffffff', // Ditto. Default #FFFFFF
			 textSize: 10.5, // Default is approx. 13.
			 cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			 horizontalPadding: 10, // iOS default 16, Android default 50
			 verticalPadding: 6 // iOS default 12, Android default 30
			 }
			 });
		 }
		 else{


					 window.plugins.toast.showWithOptions({
					 message: "Doctor removed from favorites",
					 duration: "short", // 2000 ms
					 position: "bottom",
					 styling: {
					 opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
					 backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
					 textColor: '#ffffff', // Ditto. Default #FFFFFF
					 textSize: 10.5, // Default is approx. 13.
					 cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
					 horizontalPadding: 10, // iOS default 16, Android default 50
					 verticalPadding: 6 // iOS default 12, Android default 30
					 }
					 });

		 }
	 }).catch(function(error){
		 console.log('failure data', error);
	 });

}
$scope.ratingArr = [{
    value: 1,
    icon: 'ion-ios-star-outline',
    ratings: 1
  }, {
    value: 2,
    icon: 'ion-ios-star-outline',
    ratings: 2
  }, {
    value: 3,
    icon: 'ion-ios-star-outline',
    ratings: 3
  }, {
    value: 4,
    icon: 'ion-ios-star-outline',
    ratings: 4
  }, {
    value: 5,
    icon: 'ion-ios-star-outline',
    ratings: 5
  }];



})
