package com.bulingo.Profile;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Comment;
import com.bulingo.Database.Language;
import com.bulingo.Database.User;
import com.bulingo.R;
import com.bumptech.glide.Glide;

import java.util.ArrayList;
import java.util.List;

import jp.wasabeef.glide.transformations.CropCircleTransformation;
import jp.wasabeef.glide.transformations.RoundedCornersTransformation;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfilePage extends AppCompatActivity {
    String username;
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    RecyclerView commentRecycler;
    CommentRecyclerViewAdapter commentAdapter;
    List<Comment> comments = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);
        username = getIntent().getStringExtra("username");
        commentRecycler = findViewById(R.id.commentRecycler);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        commentRecycler.setLayoutManager(layoutManager);
        commentAdapter = new CommentRecyclerViewAdapter(comments);
        commentRecycler.setAdapter(commentAdapter);
        getDetails(username);
        getLanguageLevels(username);
        getComments(username);
    }

    private void getComments(String username) {

        Call<List<Comment>> responseCall = apiInterface.doGetUserComments(username);

        responseCall.enqueue(new Callback<List<Comment>>() {
            @Override
            public void onResponse(Call<List<Comment>> call, Response<List<Comment>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    comments.clear();
                    comments.addAll(response.body());
                    commentAdapter.notifyDataSetChanged();
                } else {
                }
            }

            @Override
            public void onFailure(Call<List<Comment>> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });

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
                            .bitmapTransform(new CropCircleTransformation(getApplicationContext()))
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
