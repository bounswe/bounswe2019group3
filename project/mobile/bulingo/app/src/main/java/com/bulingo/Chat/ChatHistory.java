package com.bulingo.Chat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Chat;
import com.bulingo.Database.User;
import com.bulingo.R;
import com.bumptech.glide.Glide;

import java.util.ArrayList;
import java.util.List;

import jp.wasabeef.glide.transformations.CropCircleTransformation;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChatHistory extends AppCompatActivity {
    ChatRecyclerViewAdapter adapter;
    RecyclerView recyclerView;
    List<Chat.History> chats = new ArrayList<>();
    APIInterface apiInterface;
    String sender;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_history);
        Toolbar toolbar = (Toolbar) findViewById(R.id.appbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle(null);
        sender = getIntent().getStringExtra("username");
        apiInterface = APICLient.getClient(getApplicationContext()).create(APIInterface.class);
        recyclerView = findViewById(R.id.chatRecyclerview);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new ChatRecyclerViewAdapter(chats, getApplicationContext());
        recyclerView.setAdapter(adapter);
        recyclerView.addOnItemTouchListener(
                new RecyclerItemClickListener(this, recyclerView ,new RecyclerItemClickListener.OnItemClickListener() {
                    @Override public void onItemClick(View view, int position) {
                        Intent intent = new Intent(getApplicationContext(), ChatActivity.class);
                        intent.putExtra("sender", sender);
                        intent.putExtra("receiver", chats.get(position).username);
                        startActivity(intent);
                    }

                    @Override public void onLongItemClick(View view, int position) {
                        // do whatever
                    }
                })
        );
        getChats();
    }

    @Override
    public void onResume(){
        super.onResume();
        getChats();
    }

    public void getChats() {
        Call<Chat> responseCall = apiInterface.doGetChats();
        responseCall.enqueue(new Callback<Chat>() {
            @Override
            public void onResponse(Call<Chat> call, Response<Chat> response) {
                if(response.isSuccessful()) {
                    Chat c = response.body();
                    chats.clear();
                    chats.addAll(c.history);
                    adapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<Chat> call, Throwable t) {
                toast("Cannot get chats. Please try again.");
            }
        });
    }

    private void getDetails(String username, ImageView imageView) {

        Call<User> responseCall = apiInterface.doGetUserDetails(username);

        responseCall.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.code() == 200) {
                    User u = response.body();
                    String imagePath = u.avatar;
                    Glide.with(getApplicationContext())
                            .load(imagePath)
                            .bitmapTransform(new CropCircleTransformation(getApplicationContext()))
                            .into(imageView);
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                toast("Cannot get image.");
            }

        });
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }
}
