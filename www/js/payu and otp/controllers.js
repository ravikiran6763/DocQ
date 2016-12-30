angular.module('your_app_name.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})

// APP
.controller('AppCtrl', function($scope, $ionicConfig) {

})

//LOGIN
.controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope,data) {

var special = {};

	$scope.doLogIn = function(){
	//	$state.go('app.feeds-categories');

		var loginphone=$scope.user.phone;
		var loginpin=$scope.user.pin;


			data.loginprocess(loginphone,loginpin).then(function(response) {

				//$scope.special = response.data;

				if(response.data === "Doctor Login Screens")
				{
					//$state.go('app.feeds-categories');
					$state.go('auth.doctorscreens');

				}
				else {

						$state.go('app.feeds-categories');

				}


			},
			function(error)
			{

							alert('error');

			});


	};

	$scope.doSignUp = function(){//newly added to signup
		$state.go('app.feeds-categories');
	};


	$scope.user = {};

	$scope.user.email = "john@doe.com";
	$scope.user.pin = "12345";

	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

})

.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.feeds-categories');
	};
})

.controller('ForgotPasswordCtrl', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};
})
//newly added for DQ

.controller('doctorRegistrationCtrl', function($scope, $state) {
//alert('hello');doctorRegistration2Ctrl

})

.controller('patientRegistration1Ctrl', function($scope, $state)
{

		$scope.hh = function()
		{

				var fname = $scope.p_fname;

				alert(fname);

		}



})

.controller('patientRegistration2Ctrl', function($scope, $state) {
//alert('hello');
$scope.gender=function(){

	alert('male');
};


})

.controller('patientRegistration3Ctrl', function($scope, $state) {
//alert('hello');
$scope.doLogIn = function(){
	$state.go('app.feeds-categories');
};
})

/*.controller('confirmCtrl', function($scope, $state) {
alert('hello');
$scope.doLogIn = function(){
	$state.go('app.feeds-categories');
};
})*/

.controller('doctorRegistration2Ctrl', function($scope, $state, $ionicPopup, $timeout) {
//alert('hello');
//$scope.doc_fname=doc_fname;
//$scope.doc_mname="ssss";
//$scope.doc_lname="zzzz";
//alert($scope.doc_fname);
//alert($scope.doc_mname);
//alert($scope.doc_lname);


//Patient Register

$scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: '<h4>Thank You</h4>',
       template: 'Thank you for registering Dr. Firstname Middlename,Lastname someone from DoctorQuick will call you soon to help you with the signup.'
     });

   };
})
//form validate controller

.controller('doctorprofile', function($scope, $state, $ionicPopup, $timeout) {


//	alert('kk');
$scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
      // title: '<h4>Thank You</h4>',
       template: 'Request for Video call has been sent <br><center>00:02</center>.'
     });

   };

})

//payment controller patientRefundCtrl
.controller('patientPayCtrl', function($scope, $state) {


	$scope.patientRefund = function(){



};

})

.controller('patientRefundCtrl', function($scope, $state,$ionicPopup, $timeout) {


	$scope.refundReq = function() {
	     var confirmPopup = $ionicPopup.confirm({
	      // title: '<h4>Thank You</h4>',
	       template: 'Your request for refund is processed and it will be added to your account number within 7 business days..'
	     });

	   };

})


.controller('consultSummaryCtrl', function($scope,$state,$rootScope,data,$cordovaCalendar,$http) {



	$scope.rating = 5;
	    $scope.rateFunction = function(rating) {

	      //alert('Rating selected - ' + rating);

					if(rating == 3)
					{

							$scope.unhappy = true;
							$scope.happy = false;


					}
					else if (rating == 4)
					{

							$scope.happy = true;
							$scope.unhappy = false;

					}
					else
					{

							$scope.unhappy = false;
							$scope.happy = false;
					}

			}

			$scope.unhappycu = function()
			{

					var rating = 3;
					data.happyandunhaapy(rating);


			}

			$scope.happycu = function()
			{


					var rating = 4;
					data.happyandunhaapy(rating,$scope.happycomments);

			}

		$scope.from = function(fdatepicker)
		{

			var fdate = fdatepicker;

			if(fdate === null)
			{

				//do nothing

			}
			else {

				alert(fdate);
			}



		}


		$scope.to = function(tdatepicker)
		{

			alert('todate');

		}



		$scope.storejpeg = function()
		{

			var link = "http://greetbss.greettech.com/cgi-bin/greettech/storeasjpeg.pl";

			return $http.get(link).success(function (data, status) {


					alert(data);


				})
				.error(function (data, status) {
					console.log("Error storing device token." + data + " " + status);
					alert('call');
				});


		}


})


.controller('patientTopupCtrl',function($scope,$cordovaInAppBrowser,$rootScope)
{

		//make the product info as user_credentials
		//ALL PAYU CODE GOES HERE
		//var formData = { password: 'test pwd', email : 'test email' };

		var payu_params = {};

		$scope.payuOrder = function(form) {
		        $scope.payu_params = {

				            key: "gtKFFx",
				            salt: "eCwWELxi",
				            txnid:Math.floor(Math.random() * 100000000000),
				            amount:"1",
				            productinfo:"test",
				            firstname:"amit",
				            email:"amit.tantia@gmail.com",
				            surl: encodeURI("https://payu.herokuapp.com/success"), //url needs to be encode
				            furl: encodeURI("http://www.doctorquick.com/") // url needs to be encode
		        }

						var hash_string = $scope.payu_params.key+"|"+$scope.payu_params.txnid+"|"+$scope.payu_params.amount+"|"+
			 $scope.payu_params.productinfo+"|"+$scope.payu_params.firstname+"|"+
			 $scope.payu_params.email+"|||||||||||"+$scope.payu_params.salt;


					        $scope.payu_params.hash = CryptoJS.SHA512(hash_string).toString(CryptoJS.enc.Base64);

					        //console.log("Hash = "+$scope.payu_params.hash);

									var payu_params_string = '';
									for (var key in $scope.payu_params)
									{

										payu_params_string += key + "=" + $scope.payu_params[key] + "&";

									}


									payu_params_string = payu_params_string.slice(0,-1);



									var bytes = [];

									for (var i = 0; i < payu_params_string.length; ++i)
									{

											bytes.push(payu_params_string.charCodeAt(i));

									}



									var winURL = "https://test.payu.in/_payment";
									var form = document.createElement("form");
									form.setAttribute("method", "post");
									form.setAttribute("action", winURL);

									for (var i in $scope.payu_params)
									{
											if ($scope.payu_params.hasOwnProperty(i))
											{
													var input = document.createElement('input');
													input.type = 'hidden';
													input.name = i;
													input.value = $scope.payu_params[i];
													form.appendChild(input);
													document.body.appendChild(form);
					                form.submit();
					                document.body.removeChild(form);

											}
									}

									var winName = "payu";

									var windowoption='resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1';

									document.body.appendChild(form);
						        window.open("winURL", winName,windowoption);
						        form.target = winName;
						        form.submit();
						        document.body.removeChild(form);
		       }



})



.controller('RateApp', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
})

.controller('SendMailCtrl', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'envato@startapplabs.com',
					cc:      'hello@startapplabs.com',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'Greetings',
					body:    'How are you? Nice greetings from DoctorQuick'
				});
			}
		);
	};
})

.controller('MapsCtrl', function($scope, $ionicLoading) {

	$scope.info_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.center_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.my_location = "";

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});

	$scope.centerOnMe= function(){

		$scope.positions = [];

		$ionicLoading.show({
			template: 'Loading...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.G,lng: pos.K};
			$scope.my_location = pos.G+", "+pos.K;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
})

.controller('AdsCtrl', function($scope, $ionicActionSheet, AdMob, iAd) {

	$scope.manageAdMob = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
				{ text: 'Show Banner' },
				{ text: 'Show Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				AdMob.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show Banner')
				{
					console.log("show banner");
					AdMob.showBanner();
				}

				if(button.text == 'Show Interstitial')
				{
					console.log("show interstitial");
					AdMob.showInterstitial();
				}

				return true;
			}
		});
	};



	$scope.manageiAd = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
			{ text: 'Show iAd Banner' },
			{ text: 'Show iAd Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show - Interstitial only works in iPad',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				iAd.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show iAd Banner')
				{
					console.log("show iAd banner");
					iAd.showBanner();
				}
				if(button.text == 'Show iAd Interstitial')
				{
					console.log("show iAd interstitial");
					iAd.showInterstitial();
				}
				return true;
			}
		});
	};
})

// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', function($scope, $http) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
})

//bring specific category providers
.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
})

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
	$scope.feed = [];

	var categoryId = $stateParams.categoryId,
			sourceId = $stateParams.sourceId;

	$scope.doRefresh = function() {

		$http.get('feeds-categories.json').success(function(response) {

			$ionicLoading.show({
				template: 'Loading entries...'
			});

			var category = _.find(response, {id: categoryId }),
					source = _.find(category.feed_sources, {id: sourceId });

			$scope.sourceTitle = source.title;

			FeedList.get(source.url)
			.then(function (result) {
				$scope.feed = result.feed;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			}, function (reason) {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			});
		});
	};

	$scope.doRefresh();

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkFeedPost(post);
	};
})

// SETTINGS
.controller('SettingsCtrl', function($scope, $ionicActionSheet, $state) {
	$scope.airplaneMode = true;
	$scope.wifi = false;
	$scope.bluetooth = true;
	$scope.personalHotspot = true;

	$scope.checkOpt1 = true;
	$scope.checkOpt2 = true;
	$scope.checkOpt3 = false;

	$scope.radioChoice = 'B';

	// Triggered on a the logOut button click
	$scope.showLogOutMenu = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('auth.walkthrough');
			}
		});

	};
})

// TINDER CARDS
.controller('TinderCardsCtrl', function($scope, $http) {

	$scope.cards = [];


	$scope.addCard = function(img, name) {
		var newCard = {image: img, name: name};
		newCard.id = Math.random();
		$scope.cards.unshift(angular.extend({}, newCard));
	};

	$scope.addCards = function(count) {
		$http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
			angular.forEach(value.data.results, function (v) {
				$scope.addCard(v.user.picture.large, v.user.name.first + " " + v.user.name.last);
			});
		});
	};

	$scope.addFirstCards = function() {
		$scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/left.png","Nope");
		$scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/right.png", "Yes");
	};

	$scope.addFirstCards();
	$scope.addCards(5);

	$scope.cardDestroyed = function(index) {
		$scope.cards.splice(index, 1);
		$scope.addCards(1);
	};

	$scope.transitionOut = function(card) {
		console.log('card transition out');
	};

	$scope.transitionRight = function(card) {
		console.log('card removed to the right');
		console.log(card);
	};

	$scope.transitionLeft = function(card) {
		console.log('card removed to the left');
		console.log(card);
	};
})


// BOOKMARKS
.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();

	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};
})

// WORDPRESS
.controller('WordpressCtrl', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){
			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
})

// WORDPRESS POST
.controller('WordpressPostCtrl', function($scope, post_data, $ionicLoading) {

	$scope.post = post_data.post;
	$ionicLoading.hide();

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
})


.controller('ImagePickerCtrl', function($scope, $rootScope, $cordovaCamera) {

	$scope.images = [];

	$scope.selImages = function() {

		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					$scope.images.push(results[i]);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function (error) {
				console.log('Error: ' + error);
			}
		);
	};

	$scope.removeImage = function(image) {
		$scope.images = _.without($scope.images, image);
	};

	$scope.shareImage = function(image) {
		window.plugins.socialsharing.share(null, null, image);
	};

	$scope.shareAll = function() {
		window.plugins.socialsharing.share(null, null, $scope.images);
	};
})

;
