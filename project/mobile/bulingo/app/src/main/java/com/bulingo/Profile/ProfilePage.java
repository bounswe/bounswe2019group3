package com.bulingo.Profile;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Language;
import com.bulingo.Database.User;
import com.bulingo.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfilePage extends AppCompatActivity {
    String username;
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);
        username = getIntent().getStringExtra("username");
        getDetails(username);
        getLanguageLevels(username);
        getComments(username);
    }

    private void getComments(String username) {
    }

    private void getLanguageLevels(String username) {
    }

    private void getDetails(String username) {

        Call<User> responseCall = apiInterface.doGetUserDetails(username);

        responseCall.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {

                } else {
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });

    }
}
