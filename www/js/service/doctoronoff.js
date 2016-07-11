DoctorQuickApp.service('doctoronoffdetails', function ($http,$q, BASE_URL, API) {


  this.doctoronoff = function (whichdoctoronoff)
  {

    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.doctoronoffconditions,whichdoctoronoff)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  };


  this.getdoctorrequest = function(doctorphno)
  {

    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.getdoctorrequest,doctorphno)
    .success(function (data, status, headers, config){
      console.log(data);
      
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;



  }

});
