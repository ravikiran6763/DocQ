'use strict';
DoctorQuickApp.service('LoginService', function ($http,$q, BASE_URL, API) {

 var userPhone;

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
