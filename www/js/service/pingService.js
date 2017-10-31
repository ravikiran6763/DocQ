'use strict';
DoctorQuickApp.service('pingService', function ($http,$q, BASE_URL, API) {


	this.pingToServer = function () {
		var deferred = $q.defer();
		$http.post(BASE_URL.url + API.pingToServer)
		.success(function (data, status, headers, config){
			deferred.resolve(data);

		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});
