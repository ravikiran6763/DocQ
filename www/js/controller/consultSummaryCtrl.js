DoctorQuickApp.controller('consultSummaryCtrl', function($state, $scope,$rootScope,$ionicConfig, $http, $ionicLoading, $localStorage, LoginService, myConsultationService, rateDoctorServices,doctorServices) {
	$rootScope.headerTxt="Summary";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

//console.log($localStorage.consultedDoctor);
$ionicLoading.show();

myConsultationService.docSummaryDetails($rootScope.consultedDoc).then(function(response){
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
        // minRating:0,    //Optional
        readOnly: false, //Optional
        callback: function(rating) {    //Mandatory
          $scope.ratingsCallback(rating);
        }
      };

      $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
      };

			$scope.unhappy = true;
			var rating={};
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
										$scope.unhappy = true;
										$scope.happy = false;
								}
			};


			$scope.ratingComments={};

			$scope.sendRatings=function(){
					$scope.patient_details ={};
					$scope.userPhone=LoginService.returnUserPhone();

					var ratedValues={
						rates:$rootScope.ratingValue,
						ratedBy:$localStorage.user,
				 ratedTo:$localStorage.Doctocall,

						// ratedTo:$localStorage.consultedDoctor,
						ratingComments:$scope.ratingComments.comment
					};

					rateDoctorServices.rateDoctor(ratedValues).then(function(response){
						// console.log(ratedValues);
						$scope.rated=response;
						console.log($scope.rated);
						$scope.ratingComments.comment="";
						// $state.go('app.patient_home');
						$state.go($state.current, {}, {reload: true});
					}).catch(function(error){
						console.log('failure data', error);
					});
				}

		var myDocratedValues={
		ratedBy:$localStorage.user,
		ratedTo:$localStorage.Doctocall
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

rateDoctorServices.getDocRatingsByAll($localStorage.Doctocall).then(function(response){

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


		$scope.chatclicked = function()
		{

				console.log($localStorage.consultedDoctor);
				console.log($localStorage.user);


						var username = "greet+"+$localStorage.user;
						var password = "DQ_patient";

							// var persontocall = "greet+" + $localStorage.consultedDoctor;

					 var persontocall = "greet+" + $localStorage.Doctocall;

							var success = function(message)
							{
								alert(message);
							}

							var failure = function()
							{
								alert("Error calling Hello Plugin");
							}

							hello.chat(username,password,persontocall,success, failure);


		}





})
