package com.bulingo.Login;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.User;
import com.bulingo.Exercises.Exercise;
import com.bulingo.MainActivity;
import com.bulingo.R;
import com.google.android.material.textfield.TextInputEditText;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LogInMain extends AppCompatActivity {

    APIInterface apiInterface;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in_main);
        String message = getIntent().getStringExtra("message");
        TextView text = findViewById(R.id.textView);
        text.setText(message);
        apiInterface = APICLient.getClient(getApplicationContext()).create(APIInterface.class);
    }

    public void onClickLogOutBtn(View view) {
        userLogout();
    }

    public void onClickExercise(View view) {
        Intent intent = new Intent(this, Exercise.class);
        startActivity(intent);
    }

    private void userLogout() {

        Call<Void> responseCall = apiInterface.doLogout();

        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()) {
                    toast("Successfully logged out.");
                    loggedOut();
                } else {
                    toast("Cannot log out. Please try again.");
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                toast("Cannot log out. Please try again.");
            }

        });
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }

    public void loggedOut(){
        PreferenceManager.getDefaultSharedPreferences(getApplicationContext()).edit().clear().commit();
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }
}
