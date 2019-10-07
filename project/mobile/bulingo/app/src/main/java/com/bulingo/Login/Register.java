package com.bulingo.Login;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.User;
import com.bulingo.MainActivity;
import com.bulingo.R;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Register extends AppCompatActivity {

    APIInterface apiInterface;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up_main);
        apiInterface = APICLient.getClient(getApplicationContext()).create(APIInterface.class);
    }

    public void registerUser(View v) {
        TextInputEditText emailText = findViewById(R.id.eposta_text);
        TextInputEditText userText = findViewById(R.id.username_text);
        TextInputEditText passText = findViewById(R.id.password_text);
        TextInputEditText passText2 = findViewById(R.id.password2_text);

        String email = emailText.getText().toString();
        String username = userText.getText().toString();
        String password = passText.getText().toString();
        String password2 = passText2.getText().toString();

        if(email.isEmpty() || username.isEmpty() || password.isEmpty() || password2.isEmpty()){
            Toast.makeText(getApplicationContext(),"Please fill all fields.", Toast.LENGTH_SHORT).show();
        } else if(password.compareTo(password2) != 0){
            Toast.makeText(getApplicationContext(),"Passwords do not match.", Toast.LENGTH_SHORT).show();
            passText.setText("");
            passText2.setText("");
        } else if(password.length() < 6){
            Toast.makeText(getApplicationContext(),"Your Password should be longer than 6 characters.", Toast.LENGTH_SHORT).show();
            passText.setText("");
            passText2.setText("");
        } else {
            createUserInDatabase(email, username, password);
        }
    }

    private void createUserInDatabase(String email, String username, String password) {
        JsonObject paramObject = new JsonObject();
        paramObject.addProperty("username", username);
        paramObject.addProperty("email", email);
        paramObject.addProperty("password", password);
        Call<Void> responseCall = apiInterface.doSignup(paramObject);
        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                Log.d("request", response.toString());
                if(response.isSuccessful()) {
                    registered("Welcome " + username + "!");
                } else {
                    toast("This username or email address is used.");
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.d("request", t.toString());
                toast("Cannot register. Please try again.");
            }

        });
    }

    public void alreadyUserText(View v){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    public void registered(String message){
        Toast.makeText(getApplicationContext(),"User Successfully Registered.", Toast.LENGTH_SHORT).show();
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
}