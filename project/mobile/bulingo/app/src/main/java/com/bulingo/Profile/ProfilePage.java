package com.bulingo.Profile;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Chat.ChatActivity;
import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Comment;
import com.bulingo.Database.Language;
import com.bulingo.Database.User;
import com.bulingo.Exercises.Exercise;
import com.bulingo.R;
import com.bumptech.glide.Glide;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.ArrayList;
import java.util.List;

import jp.wasabeef.glide.transformations.CropCircleTransformation;
import jp.wasabeef.glide.transformations.RoundedCornersTransformation;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfilePage extends AppCompatActivity {
    String username;
    String sender;
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    RecyclerView commentRecycler;
    CommentRecyclerViewAdapter commentAdapter;
    RecyclerView levelRecycler;
    LevelRecyclerViewAdapter levelAdapter;
    List<Comment> comments = new ArrayList<>();
    ArrayList<Language> languageList = new ArrayList<>();
    ArrayList<Language> levels = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);
        sender = getIntent().getStringExtra("sender");
        username = getIntent().getStringExtra("username");
        if(sender == null || sender.equals(username)){ //Cant send message in own profile
            FloatingActionButton messageButton = findViewById(R.id.messageButton);
            messageButton.hide();
        }
        commentRecycler = findViewById(R.id.commentRecycler);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        commentRecycler.setLayoutManager(layoutManager);
        commentAdapter = new CommentRecyclerViewAdapter(comments);
        commentRecycler.setAdapter(commentAdapter);
        levelRecycler = findViewById(R.id.layoutForLevel);
        RecyclerView.LayoutManager gridManager = new GridLayoutManager(this, 2);
        levelRecycler.setLayoutManager(gridManager);
        levelAdapter = new LevelRecyclerViewAdapter(levels);
        levelRecycler.setAdapter(levelAdapter);
        getDetails(username);
        getLanguages();
        getComments(username);
    }

    private void getComments(String username) {

        Call<List<Comment>> responseCall = apiInterface.doGetUserComments(username);

        responseCall.enqueue(new Callback<List<Comment>>() {
            @Override
            public void onResponse(Call<List<Comment>> call, Response<List<Comment>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200 && response.body() != null) {
                    comments.clear();
                    comments.addAll(response.body());
                    commentAdapter.notifyDataSetChanged();
                } else {
                    toast();
                }
            }

            @Override
            public void onFailure(Call<List<Comment>> call, Throwable t) {
                Log.d("request", t.toString());
                toast();
            }

        });

    }

    private void getLanguageLevels(String username) {

        Call<List<Language>> responseCall = apiInterface.doGetUserLevels(username);

        responseCall.enqueue(new Callback<List<Language>>() {
            @Override
            public void onResponse(Call<List<Language>> call, Response<List<Language>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200 && response.body() != null) {
                    levels.clear();
                    levels.addAll(response.body());
                    for( Language level : levels) {
                        for(Language lang : languageList) {
                            if(level.lang_abbr.equals(lang.abbr)) {
                                level.name = lang.name;
                                break;
                            }
                        }
                    }
                    levelAdapter.notifyDataSetChanged();
                } else {
                    toast();
                }
            }

            @Override
            public void onFailure(Call<List<Language>> call, Throwable t) {
                Log.d("request", t.toString());
                toast();
            }

        });

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
                    TextView email = findViewById(R.id.email);
                    name.setText(username);
                    bio.setText(u.bio);
                    email.setText(u.email);
                    rating.setRating(u.rating);
                    String imagePath = u.avatar;
                    Glide.with(getApplicationContext())
                            .load(imagePath)
                            .bitmapTransform(new CropCircleTransformation(getApplicationContext()))
                            .into(avatar);
                } else {
                    toast();
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.d("request", t.toString());
                toast();
            }

        });

    }

    private void getLanguages(){

        Call<List<Language>> responseCall = apiInterface.doGetLanguages();

        responseCall.enqueue(new Callback<List<Language>>() {
            @Override
            public void onResponse(Call<List<Language>> call, Response<List<Language>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200 && response.body() != null) {
                    languageList.clear();
                    languageList.addAll(response.body());
                    getLanguageLevels(username);
                } else {
                    toast();
                }
            }

            @Override
            public void onFailure(Call<List<Language>> call, Throwable t) {
                Log.d("request", t.toString());
                toast();
            }

        });
    }

    public void sendMessage(View view) {
        Intent intent = new Intent(getApplicationContext(), ChatActivity.class);
        intent.putExtra("sender", sender);
        intent.putExtra("receiver", username);
        startActivity(intent);
    }

    public void toast(){
        String toast = "The profile is can not be opened right now. Please try again.";
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
        finish();
    }

    public void editProfile(View view) {

    }

    public void clickLevelMeaning(View view) {
        userInfo();
    }

    public void userInfo(){
        AlertDialog ad = new AlertDialog.Builder(this).setMessage(
                "From least to most successful, language levels are ordered like this: \n\nA1\nA2\nB1\nB2\nC1\nC2").setTitle(
                "Level Information").setCancelable(true)
                .setPositiveButton(android.R.string.ok,
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,
                                                int whichButton) {
                            }
                        }).show();
    }
}
