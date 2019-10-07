package com.bulingo.Login;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Database;
import com.bulingo.Database.User;
import com.bulingo.MainActivity;
import com.bulingo.R;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Register extends AppCompatActivity {

    Database db = new Database();
    APIInterface apiInterface = APICLient.getClient().create(APIInterface.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up_main);
    }

    public void registerUser(View v) {
        TextInputEditText fullNameText = findViewById(R.id.fullname_text);
        TextInputEditText emailText = findViewById(R.id.eposta_text);
        TextInputEditText userText = findViewById(R.id.username_text);
        TextInputEditText passText = findViewById(R.id.password_text);
        TextInputEditText passText2 = findViewById(R.id.password2_text);

        String fullName = fullNameText.getText().toString();
        String email = emailText.getText().toString();
        String username = userText.getText().toString();
        String password = passText.getText().toString();
        String password2 = passText2.getText().toString();


        //is username taken ?
        //is email taken ?

        if(fullName.isEmpty() || email.isEmpty() || username.isEmpty() || password.isEmpty() || password2.isEmpty()){
            Toast.makeText(getApplicationContext(),"Please fill all fields.", Toast.LENGTH_SHORT).show();
        } else if(!db.checkUserNameDatabase(username, password)){ //normalde ! yok.
            Toast.makeText(getApplicationContext(),"This username is taken.", Toast.LENGTH_SHORT).show();
            userText.setText("");
            passText.setText("");
            passText2.setText("");
        } else if(db.checkEMailDatabase(email)){
            Toast.makeText(getApplicationContext(),"This e-mail address is taken.", Toast.LENGTH_SHORT).show();
            emailText.setText("");
            passText.setText("");
            passText2.setText("");
        } else if(password.compareTo(password2) != 0){
            Toast.makeText(getApplicationContext(),"Passwords do not match.", Toast.LENGTH_SHORT).show();
            passText.setText("");
            passText2.setText("");
        } else if(password.length() < 6){
            Toast.makeText(getApplicationContext(),"Your Password should be longer than 6 characters.", Toast.LENGTH_SHORT).show();
            passText.setText("");
            passText2.setText("");
        } else {
            createUserInDatabase(fullName, email, username, password);
        }
    }

    private void createUserInDatabase(String fullName, String email, String username, String password) {
        JsonObject paramObject = new JsonObject();
        paramObject.addProperty("username", username);
        paramObject.addProperty("email", email);
        paramObject.addProperty("password", password);

        Call<User> responseCall = apiInterface.doSignup(paramObject);
        responseCall.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    User user = response.body();
                    registered("Welcome " + user.username + "!");
                } else {
                    toast("This username or email address is used.");
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
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