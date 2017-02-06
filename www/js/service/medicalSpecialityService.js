DoctorQuickApp.service('medicalSpecialityService', function($http, $q, BASE_URL, API,$localStorage, $ionicLoading){

      this.getMedicalSpecialist = function(){
            var deferred = $q.defer();
            console.log(BASE_URL.url + API.getMedicalSpecialist);
            $http.get(BASE_URL.url + API.getMedicalSpecialist).then ( function(response) {
                if(response.status === 200){
                  deferred.resolve(response.data);
                }else{
                  deferred.reject(response.data)
                }
            });
            return deferred.promise;
        };

      this.getMedicalSpeciality = function (specialityId) {
          var deferred = $q.defer();
              $http.post(BASE_URL.url + API.fetchSpecificSpeciality,specialityId).then ( function(response) {
              if(response.status === 200){
                deferred.resolve(response.data);
                // console.log(response.data);
              }else{
                deferred.reject(response.data)
              }
          });
          return deferred.promise;
        }

        this.sendrequesttodoctor = function(medicalSpecialityId)
        {
            var patientrequest = {
              patientphno : $localStorage.user,
              speciality : medicalSpecialityId
            }

          var deferred = $q.defer();
          $http.post(BASE_URL.url + API.sendrequesttodoctor,patientrequest)
          .success(function (data, status, headers, config){
            // console.log(data);

            deferred.resolve(data);
          })
          .error(function (){
            deferred.reject('Error while getting data');
          });
          $ionicLoading.hide();
          return deferred.promise;

        }

        this.callAccepted = function (patient) {
      		// console.log(patient);
      		var deferred = $q.defer();
          console.log(BASE_URL.url + API.callAccepted);
      		$http.post(BASE_URL.url + API.callAccepted,patient)
      		.success(function (data, status, headers, config){
      			deferred.resolve(data);
      		})
      		.error(function (){
      			deferred.reject('Error while getting data');
      		});
      		return deferred.promise;
      }

      this.checkForAccptedReq = function (patient) {
        // console.log(patient);
        var deferred = $q.defer();
        $http.post(BASE_URL.url + API.checkForAccptedReq,patient)
        .success(function (data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function (){
          deferred.reject('Error while getting data');
        });
        return deferred.promise;
    }

      this.cancelReq = function (patient) {
        // console.log(patient);
        var deferred = $q.defer();
        console.log(BASE_URL.url + API.cancelCallReq);
        $http.post(BASE_URL.url + API.cancelCallReq,patient)
        .success(function (data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function (){
          deferred.reject('Error while getting data');
        });
        return deferred.promise;
    }

    this.declinedDuringCall = function (reqId) {
      // console.log(patient);
      var deferred = $q.defer();
      console.log(BASE_URL.url + API.declinedDuringCall);
      $http.post(BASE_URL.url + API.declinedDuringCall,reqId)
      .success(function (data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function (){
        deferred.reject('Error while getting data');
      });
      return deferred.promise;
  }



});
