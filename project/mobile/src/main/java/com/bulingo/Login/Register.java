package com.bulingo.Login;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.bulingo.Database.Database;
import com.bulingo.MainActivity;
import com.bulingo.R;
import com.google.android.material.textfield.TextInputEditText;

public class Register extends AppCompatActivity {

    Database db = new Database();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
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
        } else if(db.createUserInDatabase(fullName, email, username, password)){
            Toast.makeText(getApplicationContext(),"User Successfully Registered.", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, LogInMain.class);
            startActivity(intent);
        } else {
            Toast.makeText(getApplicationContext(),"Some kind of Error Message", Toast.LENGTH_SHORT).show();
        }
    }

    public void alreadyUserText(View v){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}