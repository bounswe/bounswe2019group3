package com.bulingo;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "User Log in message";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onClickLogInBtn(View v) {
        EditText userText = findViewById(R.id.emailText);
        EditText passText = findViewById(R.id.passwordText);

        String username = userText.getText().toString();
        String password = passText.getText().toString();

        if(username.isEmpty() || password.isEmpty()) {
            Toast.makeText(getApplicationContext(),"Please fill your credentials.", Toast.LENGTH_SHORT).show();
        } else if (checkUserDatabase(username, password)){
            Toast.makeText(getApplicationContext(),"Your email/password combination does not match.", Toast.LENGTH_SHORT).show();
            userText.setText("");
            passText.setText("");
        } else {
            Intent intent = new Intent(this, LoggedIn.class);

            String message = "User " + username + " Successfully Logged In.";
            intent.putExtra(EXTRA_MESSAGE, message);

            startActivity(intent);
        }
    }

    public void onClickRegisterBtn(View v) {
        Intent intent = new Intent(this, Register.class);
        startActivity(intent);
    }

    private boolean checkUserDatabase(String username, String password){
        //Usera gore sayfa acilmasi icin bu fonksiyon degisecek ya da yardimci fonksiyon yazilacak.
        return false;
    }
}
