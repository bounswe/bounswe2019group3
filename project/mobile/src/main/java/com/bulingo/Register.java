package com.bulingo;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

public class Register extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
    }

    public void registerUser(View v) {
        EditText emailText = findViewById(R.id.registerEmailText);
        EditText userText = findViewById(R.id.registerUsernameText);
        EditText passText = findViewById(R.id.registerPassword);
        EditText passText2 = findViewById(R.id.registerPassword2);
        CheckBox termsCheck = findViewById(R.id.registerTermsCheckbox);

        String email = emailText.getText().toString();
        String username = userText.getText().toString();
        String password = passText.getText().toString();
        String password2 = passText2.getText().toString();
        boolean terms = termsCheck.isChecked();

        if(email.isEmpty() || username.isEmpty() || password.isEmpty() || password2.isEmpty()){
            Toast.makeText(getApplicationContext(),"Please fill all fields.", Toast.LENGTH_SHORT).show();
        } else if (!terms) {
            Toast.makeText(getApplicationContext(),"Please accept the use of Terms.", Toast.LENGTH_SHORT).show();
        } else if(password.compareTo(password2) != 0){
            Toast.makeText(getApplicationContext(),"Passwords do not match.", Toast.LENGTH_SHORT).show();
            passText.setText("");
            passText2.setText("");
        } else if(createUserInDatabase(email, username, password)){
            Toast.makeText(getApplicationContext(),"User Successfully Registered.", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(getApplicationContext(),"Some kind of Error Message", Toast.LENGTH_SHORT).show();
        }
    }

    private boolean createUserInDatabase(String email, String username, String password){
        return true;
    }
}
