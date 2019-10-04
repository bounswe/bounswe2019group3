package com.example.bulingo;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MainActivity extends AppCompatActivity {

    @BindView(R.id.signup_btn)
    Button signUpButton;

    private void onSignUpErrorOKClicked(DialogInterface dialogInterface, int which) {
        Toast.makeText(this, "Wow", Toast.LENGTH_SHORT).show();
    }

    private void onSignUpClicked(View v) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setTitle(R.string.sign_up_error)
                .setMessage(R.string.already_signed_up)
                .setPositiveButton("OK", this::onSignUpErrorOKClicked)
                .create()
                .show();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        signUpButton.setOnClickListener(this::onSignUpClicked);

    }



}
