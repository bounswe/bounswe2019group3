package com.bulingo.Login;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.User;
import com.bulingo.MainActivity;
import com.bulingo.R;
import com.google.android.material.textfield.TextInputEditText;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LogInMain extends AppCompatActivity {

    APIInterface apiInterface = APICLient.getClient().create(APIInterface.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in_main);
        String message = getIntent().getStringExtra("message");
        TextView text = findViewById(R.id.textView);
        text.setText(message);
    }

    public void onClickLogOutBtn(View view) {
        userLogout();
    }

    private void userLogout() {

        Call<User> responseCall = apiInterface.doLogout();

        responseCall.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if(response.isSuccessful()) {
                    toast("Successfully logged out.");
                    loggedOut();
                } else {
                    toast("Cannot log out. Please try again.");
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                toast("Cannot log out. Please try again.");
            }

        });
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }

    public void loggedOut(){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}
