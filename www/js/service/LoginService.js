'use strict';
DoctorQuickApp.service('LoginService', function ($http,$q, BASE_URL, API) {

 var userPhone;

this.logoutFromDq = function (userNum) {
  console.log(userNum);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.logout);
  $http.post(BASE_URL.url + API.logout,userNum)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.updatePlayer = function (updatePlayer) {
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.updatePlayer);
  $http.post(BASE_URL.url + API.updatePlayer,updatePlayer)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}


	this.loginprocess = function (userDetails) {
		userPhone = userDetails.userNum;
		var deferred = $q.defer();
    console.log(BASE_URL.url + API.login);
		$http.post(BASE_URL.url + API.login,userDetails)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}
this.returnUserPhone=function(){
  return userPhone;
}

});
