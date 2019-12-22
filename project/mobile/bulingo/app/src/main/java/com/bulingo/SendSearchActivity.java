package com.bulingo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import androidx.appcompat.widget.SearchView;

import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;

import com.bulingo.Chat.RecyclerItemClickListener;
import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.ExerciseItem;
import com.bulingo.Database.Language;
import com.bulingo.Database.SearchResult;
import com.bulingo.Exercises.QuestionActivity;
import com.bulingo.Profile.ProfilePage;
import com.bulingo.R;
import com.bulingo.Search.SearchRecyclerViewAdapter;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SendSearchActivity extends AppCompatActivity {

    SearchRecyclerViewAdapter adapter;
    RecyclerView recyclerView;
    List<SearchResult> results = new ArrayList<>();
    APIInterface apiInterface;
    String username;
    String title = "";
    String text = "";
    Boolean isImage;
    Uri imageUri;

    private String textQuery = "";

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_send_search);
            Toolbar toolbar = (Toolbar) findViewById(R.id.appbar);
            setSupportActionBar(toolbar);
            
            username = getIntent().getStringExtra("username");
            isImage = getIntent().getBooleanExtra("isImage", false);
            if(isImage) {
                imageUri = Uri.parse(getIntent().getStringExtra("imageUri"));
            } else {
                title = getIntent().getStringExtra("title");
                text = getIntent().getStringExtra("text");
            }
            apiInterface = APICLient.getClient(getApplicationContext()).create(APIInterface.class);
            recyclerView = findViewById(R.id.chatRecyclerview);
            LinearLayoutManager layoutManager = new LinearLayoutManager(this);
            recyclerView.setLayoutManager(layoutManager);
            adapter = new SearchRecyclerViewAdapter(results, getApplicationContext());
            recyclerView.setAdapter(adapter);
            recyclerView.addOnItemTouchListener(
                    new RecyclerItemClickListener(this, recyclerView, new RecyclerItemClickListener.OnItemClickListener() {
                        @Override
                        public void onItemClick(View view, int position) {
                            if(isImage) {

                            } else {
                                postWriting(title, text, results.get(position).username);
                            }

                        }

                        @Override
                        public void onLongItemClick(View view, int position) {

                        }
                    })
            );

            getResults(" ", "user");
        }



    public void getResults(String text, String type) {
        Call<List<SearchResult>> responseCall = apiInterface.doSearch(text, type);
        responseCall.enqueue(new Callback<List<SearchResult>>() {
            @Override
            public void onResponse(Call<List<SearchResult>> call, Response<List<SearchResult>> response) {
                if(response.isSuccessful()) {
                    results.clear();
                    results.addAll(response.body());
                    adapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<List<SearchResult>> call, Throwable t) {
                toast("Cannot get results. Please try again.");
            }
        });
    }

    public void postWriting(String title, String body, String assignee) {

        JsonObject paramObject = new JsonObject();
        paramObject.addProperty("text", body);
        paramObject.addProperty("title", title);
        paramObject.addProperty("assignee", assignee);
        Call<Void> responseCall = apiInterface.doPostWriting(username, paramObject);

        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                finish();
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }


    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }
}
