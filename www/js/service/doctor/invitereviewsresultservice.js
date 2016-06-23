DoctorQuickApp.service('invitereviewsresultservice', function ($http,$q, BASE_URL, API) {


this.sendsmstoinvitereviews = function (contactsfrominvitereview,queryforinvitereview) {

var toinvite = {

  phno : contactsfrominvitereview,
  query:queryforinvitereview

}


  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.invitereviews,toinvite)
  .success(function (data, status, headers, config){
  console.log(data);
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

};





});
