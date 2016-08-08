DoctorQuickApp.service('callacceptedbydoctor', function ($http,$q, BASE_URL, API) {


	this.accpeteddoctor = function (patientphno,doctorphno) {

		var deferred = $q.defer();

		$http.post(BASE_URL.url + API.callaccepteddoctor)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});
