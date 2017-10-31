'use strict';
DoctorQuickApp.service('pingService', function ($http,$q, BASE_URL, API) {


	this.pingToServer = function () {
<<<<<<< HEAD
    // console.log('ping service calld');
=======
>>>>>>> dfb6c55c300db30cfe42f30e442b0a64644f47b8
		var deferred = $q.defer();
		$http.post(BASE_URL.url + API.pingToServer)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
<<<<<<< HEAD
      // console.log(data);
=======
>>>>>>> dfb6c55c300db30cfe42f30e442b0a64644f47b8

		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});
