package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;

import com.bulingo.Chat.RecyclerItemClickListener;
import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.RecommendationResult;
import com.bulingo.Database.SearchResult;
import com.bulingo.R;
import com.bulingo.Search.SearchRecyclerViewAdapter;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RecommendationActivity extends AppCompatActivity {

    RecommendationRecyclerViewAdapter adapter;
    RecyclerView recyclerView;
    List<RecommendationResult> results = new ArrayList<>();
    APIInterface apiInterface;
    String username;
    String title = "";
    String text = "";
    Boolean isImage;
    Uri imageUri;
    String abbr;

    private String textQuery = "";

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_recommendation);
            Toolbar toolbar = (Toolbar) findViewById(R.id.appbar);
            setSupportActionBar(toolbar);
            
            username = getIntent().getStringExtra("username");
            isImage = getIntent().getBooleanExtra("isImage", false);
            abbr = getIntent().getStringExtra("abbr");
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
            adapter = new RecommendationRecyclerViewAdapter(results, getApplicationContext());
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

            getResults();
        }



    public void getResults() {
        Call<List<RecommendationResult>> responseCall = apiInterface.doGetRecommendation(abbr);
        responseCall.enqueue(new Callback<List<RecommendationResult>>() {
            @Override
            public void onResponse(Call<List<RecommendationResult>> call, Response<List<RecommendationResult>> response) {
                if(response.isSuccessful()) {
                    results.clear();
                    results.addAll(response.body());
                    adapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<List<RecommendationResult>> call, Throwable t) {
                toast("Cannot get results. Please try again.");
            }
        });
    }

    public void postWriting(String title, String body, String assignee) {

        JsonObject paramObject = new JsonObject();
        paramObject.addProperty("text", body);
        paramObject.addProperty("title", title);
        paramObject.addProperty("assignee", assignee);
        paramObject.addProperty("lang_abbr", this.abbr);
        Call<Void> responseCall = apiInterface.doPostWriting(paramObject);

        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                toast("Writing sent successfully.");
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
