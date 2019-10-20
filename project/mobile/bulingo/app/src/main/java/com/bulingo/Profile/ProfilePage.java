package com.bulingo.Profile;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Language;
import com.bulingo.Database.User;
import com.bulingo.R;
import com.bumptech.glide.Glide;

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
                    User u = response.body();
                    TextView name = findViewById(R.id.realUsername);
                    TextView bio = findViewById(R.id.bio);
                    ImageView avatar = findViewById(R.id.imageView);
                    RatingBar rating = findViewById(R.id.ratingBar);
                    name.setText(username);
                    bio.setText(u.bio);
                    rating.setRating(u.rating);
                    String imagePath = u.avatar;
                    Glide.with(getApplicationContext())
                            .load(imagePath)
                            .centerCrop()
                            .placeholder(R.drawable.girl)
                            .error(R.drawable.girl)
                            .into(avatar);
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
