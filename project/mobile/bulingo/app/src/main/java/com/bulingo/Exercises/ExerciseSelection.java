package com.bulingo.Exercises;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.ExerciseItem;
import com.bulingo.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ExerciseSelection extends AppCompatActivity implements BottomNavigationView.OnNavigationItemSelectedListener {

    BottomNavigationView bottomNavigationView;
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    RecyclerView exerciseRecycler;
    ExerciseRecyclerViewAdapter adapter;
    List<ExerciseItem> exercises = new ArrayList<>();
    String lang = "";
    String languageName = "";
    String currentLevel = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise_selection);
        lang = getIntent().getStringExtra("abbr");
        languageName = getIntent().getStringExtra("name");
        currentLevel = getIntent().getStringExtra("currentLevel");
        TextView title = findViewById(R.id.title);
        TextView level = findViewById(R.id.currentLevel);
        level.setText(currentLevel);
        title.setText(languageName);
        bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setOnNavigationItemSelectedListener(this);
        bottomNavigationView.bringToFront();
        bottomNavigationView.setSelectedItemId(R.id.readingMenu);
        exerciseRecycler = findViewById(R.id.exerciseRecyclerview);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        exerciseRecycler.setLayoutManager(layoutManager);
        adapter = new ExerciseRecyclerViewAdapter(exercises);
        exerciseRecycler.setAdapter(adapter);
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        String type = "";
        if(item.getItemId() == R.id.readingMenu) {
            type = "reading";
        } else if(item.getItemId() == R.id.listeningMenu) {
            type = "listening";
        } else if(item.getItemId() == R.id.vocabMenu) {
            type = "vocabulary";
        } else if(item.getItemId() == R.id.grammarMenu) {
            type = "grammar";
        } else if(item.getItemId() == R.id.writingMenu) {
            type = "writing";
        } else {
            return false;
        }
        getExercises(this.lang, type);
        return true;
    }

    public void getExercises(String abbr, String type) {
        Call<List<ExerciseItem>> responseCall = apiInterface.doGetExercisesOfType(abbr, type);

        responseCall.enqueue(new Callback<List<ExerciseItem>>() {
            @Override
            public void onResponse(Call<List<ExerciseItem>> call, Response<List<ExerciseItem>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200 && response.body() != null) {
                    List<ExerciseItem> temp = response.body();
                    exercises.clear();
                    for(ExerciseItem e : temp) {
                        if(e.abbr.equals(lang)) exercises.add(e);
                    }
                    Collections.sort(exercises, (e1, e2) -> e1.level.compareTo(e2.level));
                    adapter.notifyDataSetChanged();
                } else {
                    toast();
                }
            }

            @Override
            public void onFailure(Call<List<ExerciseItem>> call, Throwable t) {
                Log.d("request", t.toString());
                toast();
            }

        });
    }

    public void toast(){
        String toast = "The exercises are can not be displayed right now. Please try again.";
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
        finish();
    }
}
