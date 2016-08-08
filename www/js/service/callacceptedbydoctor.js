DoctorQuickApp.service('callaccpetedbydoctor', function ($http,$q, BASE_URL, API) {


	this.accepteddoctor = function (patientphno,doctorphone)
  {
		// userPhone = userDetails.userNum;
		var deferred = $q.defer();

		$http.post(BASE_URL.url + API.uploadImage,uploadData)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});
		return deferred.promise;
}


});
