
DoctorQuickApp.service('patientProfileDetailsService', function($http, $q, BASE_URL, API){

  this.fetchPatient = function(detail){
    // console.log(detail);
    var deferred = $q.defer();
    console.log(BASE_URL.url + API.patientDetails);
		$http.post(BASE_URL.url + API.patientDetails,detail)
		.success(function (data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function (){
			deferred.reject('Error while getting data');
		});

		return deferred.promise;
  }

  


  //password change
  this.changePwd2 = function(newPwd){

    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.changePatientPwd,newPwd)
    .success(function (data, status, headers, config){
      deferred.resolve(data);

    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;


  }



});
