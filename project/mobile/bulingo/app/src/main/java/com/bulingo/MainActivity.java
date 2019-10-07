package com.bulingo;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.User;
import com.bulingo.Login.LogInMain;
import com.bulingo.Login.Register;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonObject;

import java.util.HashSet;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        HashSet<String > preferences = (HashSet<String>) PreferenceManager.getDefaultSharedPreferences(this).getStringSet("PREF_COOKIES", new HashSet<String>());
        Log.d("cookie", preferences.toString());
        if(!preferences.isEmpty()){
            Intent intent = new Intent(this, LogInMain.class);
            startActivity(intent);
        } else {
            setContentView(R.layout.activity_main);
            java.net.CookieManager cm = new java.net.CookieManager();
            java.net.CookieHandler.setDefault(cm);
        }
    }

    public void onClickLogInBtn(View v) {
        TextInputEditText userText = findViewById(R.id.username);
        TextInputEditText passText = findViewById(R.id.password);

        String username = userText.getText().toString();
        String password = passText.getText().toString();

        if(username.isEmpty() || password.isEmpty()) {
            Toast.makeText(getApplicationContext(),"Please fill your credentials.", Toast.LENGTH_SHORT).show();
        } else {
            getUserDatabase(username, password);

        }
    }

    public void onClickRegisterBtn(View v) {
        Intent intent = new Intent(this, Register.class);
        startActivity(intent);
    }

    public void signedIn(String message){
        Intent intent = new Intent(this, LogInMain.class);
        intent.putExtra("message", message);
        startActivity(intent);
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
        TextInputEditText userText = findViewById(R.id.username);
        TextInputEditText passText = findViewById(R.id.password);
        userText.setText("");
        passText.setText("");
    }

    public void getUserDatabase(String username, String password){

        JsonObject paramObject = new JsonObject();
        paramObject.addProperty("id", username);
        paramObject.addProperty("password", password);

        Call<User> responseCall = apiInterface.doLogin(paramObject);

        responseCall.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    User user = response.body();
                    signedIn("Welcome " + user.username + "!");
                } else {
                    toast("Your email/password combination does not match.");
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.d("request", t.toString());
                toast("Cannot sign in. Please try again.");
            }

        });
    }
}
