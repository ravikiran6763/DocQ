DoctorQuickApp.service('invitereviews', function ($http,$rootScope,$q,BASE_URL, API) {


var con = [];
this.invitereviewpatient = function (listofcontacts){

    con.push(listofcontacts);
      console.log($rootScope.con);
}

this.getinvitecontacts = function()
{
    return con;
}



this.sendsmstoinvitereviews = function (contactsfrominvitereview,queryforinvitereview,doctor) {


toinvite = {

    phnos : contactsfrominvitereview,
    query : queryforinvitereview,
    user : doctor


};

console.log(toinvite);

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
