package com.bulingo;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "User Log in message";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onClickBtn(View v) {
        Intent intent = new Intent(this, LoggedIn.class);
        EditText editText = findViewById(R.id.emailText);
        String userName = editText.getText().toString();
        String  message = "User " + userName + " Successfully Logged In.";
        intent.putExtra(EXTRA_MESSAGE, message);
        startActivity(intent);
    }
}
