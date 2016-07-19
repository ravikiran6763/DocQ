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
        'logout': 'logout',
        'ForgotPassword': 'common/forgotPassword.php',

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
        'getMyDoctorRatings':'patient/getMyDoctorRatings.php',
        'getDocRatingsByAll' : 'patient/getDocRatingsByAll.php',
        'docSummary' : 'patient/docSummary.php',


        'sendotp' : 'textgurutest.php',
        'rateMyDoctor':'patient/rateMyDoctor.php',

        // 'rateMyDoctor':'patient/rateMyDoctor.php',

        /*DOCTOR APIS*/
        'doctorRegistration'  :'doctor/doctorRegistration.php',
        'doctorDetails':'doctor/doctorDetails.php',
        'myConsultedPatients':'doctor/myConsultedPatients.php',
        'resendOtp':'DQ/resendOtp.php',
        'changePassword': 'changePassword',
        'invitereviews' : 'invitereview.php',
        'getdoctorrequest' : 'doctor/getdoctorrequestfrompatient.php',
        'requestacceptedbydoctor':  'doctor/acceptedpatientreqbydoctor.php',
        'docAccDetails' : 'doctor/docAccDetails.php',
        'testjpegimage' :'prescription/responseasimages.php',


        'changePatientPwd':'DQ/changePatientPwd.php',
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
