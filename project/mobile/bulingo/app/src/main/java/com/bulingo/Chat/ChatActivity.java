package com.bulingo.Chat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Message;
import com.bulingo.R;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChatActivity extends AppCompatActivity {
    MessageRecyclerViewAdapter adapter;
    RecyclerView recyclerView;
    List<Message> messages = new ArrayList<>();
    String sender;
    String receiver;
    APIInterface apiInterface;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);
        Toolbar toolbar = (Toolbar) findViewById(R.id.appbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle(null);
        apiInterface = APICLient.getClient(getApplicationContext()).create(APIInterface.class);
        sender = getIntent().getStringExtra("sender");
        receiver = getIntent().getStringExtra("receiver");
        TextView title = findViewById(R.id.title);
        title.setText(receiver);
        recyclerView = findViewById(R.id.messageRecyclerview);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        layoutManager.setReverseLayout(true);
        layoutManager.setStackFromEnd(false);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new MessageRecyclerViewAdapter(messages, sender);
        recyclerView.setAdapter(adapter);

        getMessages(receiver);
    }

    private void getMessages(String receiver) {
        JsonObject paramObject = new JsonObject();
        paramObject.addProperty("skip", "0");
        paramObject.addProperty("limit", "20");
        Call<List<Message>> responseCall = apiInterface.doGetMessages(receiver);
        responseCall.enqueue(new Callback<List<Message>>() {
            @Override
            public void onResponse(Call<List<Message>> call, Response<List<Message>> response) {
                Log.d("request", response.toString());
                if(response.isSuccessful()) {
                    messages.clear();
                    messages.addAll(response.body());
                    adapter.notifyDataSetChanged();
                } else {
                    toast("There is no such user.");
                }
            }

            @Override
            public void onFailure(Call<List<Message>> call, Throwable t) {
                Log.d("request", t.toString());
                toast("Cannot get messages. Please try again.");
            }
        });
    }
    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }

}
