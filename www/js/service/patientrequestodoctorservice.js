DoctorQuickApp.service('patientrequesttodoctor', function ($http,$q, BASE_URL, API) {


      this.accpetedbydoctor = function(docpatphno)
      {

          console.log('clicked');

       		var deferred = $q.defer();

       		$http.post(BASE_URL.url + API.requestacceptedbydoctor,docpatphno)
       		.success(function (data, status, headers, config){
            console.log(data);
       			deferred.resolve(data);
       		})
       		.error(function (){
       			deferred.reject('Error while getting data');
       		});

       		return deferred.promise;



      }


    this.declinedbydoctor = function(docpatphno)
    {



                var deferred = $q.defer();

                $http.post(BASE_URL.url + API.requestacceptedbydoctor,docpatphno)
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
