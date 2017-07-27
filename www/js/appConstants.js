/*globals angular */

'use strict';

/**
 * Contains the Constants, which are available across the app.
 * @author Ravikiran
 */
DoctorQuickApp.constant('BASE_URL', {
        //Development http://ec2-52-39-133-220.us-west-2.compute.amazonaws.com/
        // 'url': 'http://greetbss.greettech.com/'
        //Development
        // 'url': 'http://greetbss.greettech.com/'
        //Testing
        // 'url' :'http://ec2-52-39-133-220.us-west-2.compute.amazonaws.com/'
        //Staging
        'url' : 'http://ec2-54-187-148-143.us-west-2.compute.amazonaws.com/'
    })
.constant('API', {
          /*COMMON APIS*/

        // 'patientRegistration':'DQ/patientegistration.php',

        'login': 'common/dqLogin.php',
        'logout': 'common/logout.php',
        'ForgotPassword': 'common/forgotPassword.php',
        'payuFailure': 'common/payuFailure.php',
        'payuSucces': 'common/payuSucces.php',
        'languages': 'common/languages.php',
        'updatePlayer': 'common/updatePlayer.php',
        'alreadyLoggedIn': 'common/alreadyLoggedIn.php',




        /*PATIENT APIS*/
        'patientRegistration' :'patient/patientRegistration.php',
        'patientDetails'      :'patient/patientDetails.php',
        'fetchMyDoctors'      :'patient/fetchMyDoctors.php',
        'myConsultations'     :'patient/myConsultations.php',
        'myWalletBalance'     :'patient/myWalletBalance.php',
        'patientQuery'        :'patient/patientQuery.php',
        'paientCallBack'      :'patient/paientCallBack.php',
        'getMedicalSpecialist' : 'patient/listallspecialities.php',
        'fetchSpecificSpeciality' : 'patient/fetchSpecificSpeciality.php',
        'fetchSpecificDoctor'     :'patient/fetchSpecificDoctor.php',
        'doctorbydifferentscenario' : 'patient/doctorlist.php',
        'sendrequesttodoctor' : 'patient/sendrequesttodoctor.php',
        'requestForCall' : 'patient/requestForCall.php',
        'cancelOne2oneReq' : 'patient/cancelOne2oneReq.php',
        'sendOfflineMessage' : 'patient/sendOfflineMessage.php',
        'sendNotification' : 'patient/sendNotification.php',




        'getMyDoctorRatings':'patient/getMyDoctorRatings.php',
        'getDocRatingsByAll' : 'patient/getDocRatingsByAll.php',
        'docSummary' : 'patient/docSummary.php',
        'topMeup' : 'patient/topMeUp.php',
        'callAccepted' : 'patient/callAccepted.php',
        'callDecline' : 'patient/callDecline.php',
        'cancelCallReq' : 'patient/cancelCallReq.php',
        'popupSeen' : 'patient/popupSeen.php',
        'uploadImage' : 'patient/uploadImage.php',
        'changePatientPwd':'patient/changePatientPwd.php',
        'callaccepteddoctor':'patient/insertintomyconsultations.php',
        'existingPatient' : 'patient/existingPatient.php',
        'sendotp' : 'textgurutest.php',
        //'rateMyDoctor':'patient/rateMyDoctor.php',

        'rateMyDoctor':'patient/rateMyDoctortodoctordetails.php',
        'addToFavorite':'patient/addToFavorite.php',
        'checkForAccptedReq':'patient/checkForAccptedReq.php',
        'updateseenView':'patient/updateseenView.php',
        'declinedDuringCall':'patient/declinedDuringCall.php',
        'fetchPatientImage':'patient/fetchPatientImage.php',
        'checkCallStatus':'patient/checkCallStatus.php',
        'declineOne2oneReqPatient':'patient/declineOne2oneReqPatient.php',


        /*DOCTOR APIS*/
        'doctorRegistration'  :'doctor/doctorRegistration.php',
        'doctorDetails':'doctor/doctorDetails.php',
        'myConsultedPatients':'doctor/myConsultedPatients.php',
        'resendOtp':'DQ/resendOtp.php',
        'changePassword': 'changePassword',
        'invitereviews' : 'invitereview.php',
        'getdoctorrequest' : 'doctor/getdoctorrequestfrompatient.php',
        'consultationRequest' : 'doctor/consultationRequest.php',
        'fetchOne2OneReq' : 'doctor/fetchOne2OneReq.php',
        'requestacceptedbydoctor':  'doctor/acceptedpatientreqbydoctor.php',
        'declinedbydoctor':'doctor/declinedbydoctor.php',
        'acceptedbydoctor':'doctor/acceptedbydoctor.php',
        'cancelByDoc':'doctor/cancelByDoc.php',
        'patientActivity':'doctor/patientActivity.php',
        'checkIdStatus':'doctor/checkIdStatus.php',

        'videoOrAudio':'doctor/videoOrAudio.php',
        'doctorActivity':'doctor/doctorActivity.php',
        'updateNotes':'doctor/updateNotes.php',

        'docAccountsBalance' : 'doctor/docAccountsBalance.php',
        'docAccDetails' : 'doctor/docAccDetails.php',
        'reqPatientDetails' : 'doctor/reqPatientDetails.php',
        'updateDocPassword':'doctor/updateDocPassword.php',
        'createChatHistory':'doctor/createChatHistory.php',
        'createChatHistoryIos':'doctor/createChatHistoryios.php',
        'createChatHistoryforDoctor':'doctor/createChatHistoryforDoctor.php',
        'fetchChatHistory':'doctor/fetchChatHistory.php',
        'callStatus':'doctor/callStatus.php',

        'testjpegimage' :'prescription/responseasimages.php',

        'fetchAllDoctors':'DQ/fetchDoctors.php',
        'sidemenulist':'DQ/sidemenulist.php',
        'patientTrasactionHistory':'DQ/patientWallet/patientTrasactionHistory.php',


        /*  DOCTOR ON OFF API */
        'doctoronoffconditions':'doctor/doctoronoffline.php'

    })
.constant('AUTH_EVENTS', {
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
      })

.constant('USER_ROLES', {
      admin: 'admin_role',
      public: 'public_role'
      });
