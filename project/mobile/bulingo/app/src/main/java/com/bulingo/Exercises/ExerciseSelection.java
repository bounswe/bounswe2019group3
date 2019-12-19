package com.bulingo.Exercises;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Chat.RecyclerItemClickListener;
import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.ExerciseItem;
import com.bulingo.Database.LanguageProgress;
import com.bulingo.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ExerciseSelection extends AppCompatActivity implements BottomNavigationView.OnNavigationItemSelectedListener{

    BottomNavigationView bottomNavigationView;
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    RecyclerView exerciseRecycler;
    ExerciseRecyclerViewAdapter adapter;
    List<ExerciseItem> exercises = new ArrayList<>();
    String lang = "";
    String languageName = "";
    String currentLevel = "";
    String type = "";
    String username = "";
    LinearLayout buttons;
    private Spinner spinner;
    private static final String[] paths = {"A1", "A2", "B1", "B2", "C1", "C2", "Levels"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise_selection);
        lang = getIntent().getStringExtra("abbr");
        languageName = getIntent().getStringExtra("name");
        currentLevel = getIntent().getStringExtra("currentLevel");
        username = getIntent().getStringExtra("username");
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
        adapter = new ExerciseRecyclerViewAdapter(exercises, this, username);
        exerciseRecycler.setAdapter(adapter);
        exerciseRecycler.addOnItemTouchListener(
                new RecyclerItemClickListener(this, exerciseRecycler ,new RecyclerItemClickListener.OnItemClickListener() {
                    @Override public void onItemClick(View view, int position) {
                        if(type.equals("writing")) {
                            Intent intent = new Intent(getApplicationContext(), WritingActivity.class);
                            intent.putExtra("username", username);
                            intent.putExtra("abbr", exercises.get(position).abbr);
                            intent.putExtra("id", exercises.get(position).id + "");
                            startActivity(intent);
                        } else {
                            Intent intent = new Intent(getApplicationContext(), QuestionActivity.class);
                            intent.putExtra("abbr", exercises.get(position).abbr);
                            intent.putExtra("id", exercises.get(position).id + "");
                            startActivity(intent);
                        }
                    }

                    @Override public void onLongItemClick(View view, int position) {
                        // do whatever
                    }
                })
        );
        buttons = findViewById(R.id.buttonsLayout);
        buttons.setVisibility(View.GONE);
        getProgress(lang);
        spinner = (Spinner)findViewById(R.id.spinnerLanguage);
        ArrayAdapter<String> spinnerAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item,paths) {
            @Override
            public int getCount() {
                return 6;
            }
        };
        AdapterView.OnItemSelectedListener listener = new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String newLevel = "";
                switch (position) {
                    case 0:
                        newLevel = "A1";
                        break;
                    case 1:
                        newLevel = "A2";
                        break;
                    case 2:
                        newLevel = "B1";
                        break;
                    case 3:
                        newLevel = "B2";
                        break;
                    case 4:
                        newLevel = "C1";
                        break;
                    case 5:
                        newLevel = "C2";
                        break;
                }
                if(!newLevel.equals(""))
                    getExercises(lang, type, newLevel);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        };
        spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(spinnerAdapter);
        spinner.setOnItemSelectedListener(listener);
        spinner.setSelection(6);

    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        if(spinner != null){
            spinner.setSelection(6);
        }
        if(buttons != null) {
            buttons.setVisibility(View.GONE);
        }
        if(item.getItemId() == R.id.readingMenu) {
            this.type = "reading";
        } else if(item.getItemId() == R.id.listeningMenu) {
            this.type = "listening";
        } else if(item.getItemId() == R.id.vocabMenu) {
            this.type = "vocabulary";
        } else if(item.getItemId() == R.id.grammarMenu) {
            this.type = "grammar";
        } else if(item.getItemId() == R.id.writingMenu) {
            this.type = "writing";
            buttons.setVisibility(View.VISIBLE);
        } else {
            return false;
        }
        getExercises(this.lang, this.type, this.currentLevel);
        return true;
    }

    public void getExercises(String abbr, String type, String level) {
        Call<List<ExerciseItem>> responseCall = apiInterface.doGetExercisesOfType(abbr, type, level);

        responseCall.enqueue(new Callback<List<ExerciseItem>>() {
            @Override
            public void onResponse(Call<List<ExerciseItem>> call, Response<List<ExerciseItem>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200 && response.body() != null) {
                    List<ExerciseItem> temp = response.body();
                    exercises.clear();
                    exercises.addAll(temp);
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

    public void getProgress(String abbr) {
        Call<LanguageProgress> responseCall = apiInterface.doGetLanguageProgress(abbr, username);

        responseCall.enqueue(new Callback<LanguageProgress>() {
            @Override
            public void onResponse(Call<LanguageProgress> call, Response<LanguageProgress> response) {
                Log.d("request", response.toString());
                if(response.code() == 200 && response.body() != null) {
                    LanguageProgress progress = response.body();
                    int percentage = 100*progress.done/progress.allExercises;
                    ProgressBar progressBar = findViewById(R.id.progressBar);
                    runOnUiThread(() -> progressBar.setProgress(percentage));
                } else {
                    toast();
                }
            }

            @Override
            public void onFailure(Call<LanguageProgress> call, Throwable t) {
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


    public void startExam(View view) {
        Intent intent = new Intent(getApplicationContext(), Exercise.class);
        intent.putExtra("abbr", this.lang);
        startActivity(intent);
        finish();
    }
}
