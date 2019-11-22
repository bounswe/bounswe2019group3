package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Language;
import com.bulingo.R;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LanguageSelection extends AppCompatActivity {

    private RecyclerView recyclerView;
    private LanguageRecyclerViewAdapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    private ArrayList<Language> languageList = new ArrayList<Language>();
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    private String username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_language_selection);
        username = getIntent().getStringExtra("username");
        recyclerView = findViewById(R.id.languageRecyclerView);
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new LanguageRecyclerViewAdapter(languageList);
        recyclerView.setAdapter(adapter);
        adapter.setOnLanguageClickListener(this::onClickLanguageSelect);
        getLanguages();
    }

    public void onClickLanguageSelect(Language language) {
        String abbr = language.abbr;

        Call<List<Language>> responseCall = apiInterface.doGetUserLevels(username);

        responseCall.enqueue(new Callback<List<Language>>() {
            @Override
            public void onResponse(Call<List<Language>> call, Response<List<Language>> response) {
                Log.d("request", response.toString());
                String grade = "";
                boolean found = false;
                if(response.code() == 200 && response.body() != null) {
                    List<Language> langs = response.body();
                    for(Language l : langs) {
                        if(l.lang_abbr.equals(abbr)) {
                            found = true;
                            grade = l.grade;
                        }
                    }
                }
                Intent intent;
                if(found) {
                    intent = new Intent(getApplicationContext(), ExerciseSelection.class);
                    intent.putExtra("abbr", abbr);
                    intent.putExtra("name", language.name);
                    intent.putExtra("currentLevel", grade);
                } else {
                    intent = new Intent(getApplicationContext(), Exercise.class);
                    intent.putExtra("abbr", abbr);
                }
                startActivity(intent);
                finish();

            }

            @Override
            public void onFailure(Call<List<Language>> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });


    }


    public void getLanguages(){

        Call<List<Language>> responseCall = apiInterface.doGetLanguages();

        responseCall.enqueue(new Callback<List<Language>>() {
            @Override
            public void onResponse(Call<List<Language>> call, Response<List<Language>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    languageList.clear();
                    languageList.addAll(response.body());

                    Log.d("response", languageList.toString());
                    adapter.notifyDataSetChanged();
                } else {
                }
            }

            @Override
            public void onFailure(Call<List<Language>> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }


}
