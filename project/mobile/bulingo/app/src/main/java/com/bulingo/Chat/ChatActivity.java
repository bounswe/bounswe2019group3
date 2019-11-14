package com.bulingo.Chat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Message;
import com.bulingo.R;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.LinkedList;
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
    List<Message> allMessages = new ArrayList<>();


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

        getMessages(receiver, 0);

    }

    private void getMessages(String receiver, int skip) {
        Call<List<Message>> responseCall = apiInterface.doGetMessages(receiver, String.valueOf(skip), String.valueOf(20));
        responseCall.enqueue(new Callback<List<Message>>() {
            @Override
            public void onResponse(Call<List<Message>> call, Response<List<Message>> response) {
                if(response.isSuccessful()) {
                    List<Message> responseBody = response.body();

                    if(responseBody.toString().length() > 2) {
                        allMessages.addAll(responseBody);
                        messages.clear();
                        messages.addAll(allMessages);
                        adapter.notifyDataSetChanged();
                        getMessages(receiver, skip+20);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Message>> call, Throwable t) {
                Log.d("request", t.toString());
                toast("Cannot get messages. Please try again.");
            }
        });
    }

    public void sendMessage(View v) {
        EditText input = findViewById(R.id.textInput);
        String message = input.getText().toString().trim();
        input.setText("");
        if(message.isEmpty()) {
            return;
        }
        JsonObject paramObject = new JsonObject();
        paramObject.addProperty("message", message);
        Call<Void> responseCall = apiInterface.doSendMessage(receiver, paramObject);
        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()) {
                    allMessages.add(0, new Message(message, sender));
                    messages.clear();
                    messages.addAll(allMessages);
                    adapter.notifyDataSetChanged();
                    allMessages.clear();
                    getMessages(receiver, 0);

                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.d("request", t.toString());
                toast("Cannot send messages. Please try again.");
            }
        });
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }

}
