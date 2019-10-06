package com.bulingo;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.bulingo.Database.Database;
import com.bulingo.Login.LogInMain;
import com.bulingo.Login.Register;
import com.google.android.material.textfield.TextInputEditText;

public class MainActivity extends AppCompatActivity {

    Database db = new Database();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onClickLogInBtn(View v) {
        TextInputEditText userText = findViewById(R.id.username);
        TextInputEditText passText = findViewById(R.id.password);

        String username = userText.getText().toString();
        String password = passText.getText().toString();

        if(username.isEmpty() || password.isEmpty()) {
            Toast.makeText(getApplicationContext(),"Please fill your credentials.", Toast.LENGTH_SHORT).show();
        } else if (!db.checkUserNameDatabase(username, password)){
            Toast.makeText(getApplicationContext(),"Your email/password combination does not match.", Toast.LENGTH_SHORT).show();
            userText.setText("");
            passText.setText("");
        } else {
            Intent intent = new Intent(this, LogInMain.class);

            //db.getProfileInfo()

            startActivity(intent);
        }
    }

    public void onClickRegisterBtn(View v) {
        Intent intent = new Intent(this, Register.class);
        startActivity(intent);
    }
}
