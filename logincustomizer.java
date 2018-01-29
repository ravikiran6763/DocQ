package com.greettelehealth.DoctorQuick.logincustomizer;


import com.greettech.DoctorQuick.MyApplication;
import com.vsee.kit.VSeeServerConnection;



public class logincustomizer {
    public static void customize() {
        setupLoginReceiver();
    }

    private static void setupLoginReceiver() {
        VSeeServerConnection.instance().addReceiver(new VSeeServerConnection.SimpleVSeeServerConnectionReceiver() {
            @Override
            public void onInitializationComplete() {

            }

            @Override
            public void onLoginStateChange(VSeeServerConnection.LoginState newState) {
                if (newState == VSeeServerConnection.LoginState.LOGGED_IN) {

                }
            }
        });
    }
}
