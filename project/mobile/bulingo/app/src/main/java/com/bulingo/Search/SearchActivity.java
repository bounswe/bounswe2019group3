package com.bulingo.Search;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
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

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SearchActivity extends AppCompatActivity {

    SearchRecyclerViewAdapter adapter;
    RecyclerView recyclerView;
    List<SearchResult> results = new ArrayList<>();
    APIInterface apiInterface;
    String sender;
    Spinner languageSpinner, typeSpinner, levelSpinner;

    private static String[] languages = {"English", "German", "Language"};
    private static final String[] types = {"Reading", "Listening", "Vocabulary", "Grammar", "Writing", "Type"};
    private static final String[] levels = {"A1", "A2", "B1", "B2", "C1", "C2", "Level"};

    private String currentLanguageFilter = "";
    private String currentTypeFilter = "";
    private String currentLevelFilter = "";
    private String textQuery = "";
    private boolean isExerciseButtonSelected = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        Toolbar toolbar = (Toolbar) findViewById(R.id.appbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle(null);

        sender = getIntent().getStringExtra("username");
        apiInterface = APICLient.getClient(getApplicationContext()).create(APIInterface.class);
        recyclerView = findViewById(R.id.chatRecyclerview);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        adapter = new SearchRecyclerViewAdapter(results, getApplicationContext());
        recyclerView.setAdapter(adapter);
        recyclerView.addOnItemTouchListener(
                new RecyclerItemClickListener(this, recyclerView ,new RecyclerItemClickListener.OnItemClickListener() {
                    @Override public void onItemClick(View view, int position) {
                        if(isExerciseButtonSelected) {
                            Intent intent = new Intent(getApplicationContext(), QuestionActivity.class);
                            intent.putExtra("abbr", results.get(position).abbr);
                            intent.putExtra("id", results.get(position).exercise_id + "");
                            startActivity(intent);
                        } else {
                            Intent intent = new Intent(getApplicationContext(), ProfilePage.class);
                            intent.putExtra("sender", sender);
                            intent.putExtra("username", results.get(position).username);
                            startActivity(intent);
                        }

                    }

                    @Override
                    public void onLongItemClick(View view, int position) {

                    }
                })
        );

        RadioGroup rg = (RadioGroup) findViewById(R.id.radioGroup);
        LinearLayout ll = findViewById(R.id.filters);
        ll.setVisibility(View.GONE);

        rg.setOnCheckedChangeListener((group, checkedId) -> {
            switch(checkedId){
                case R.id.radioButtonUser:
                    results.clear();
                    adapter.notifyDataSetChanged();
                    isExerciseButtonSelected = false;
                    ll.setVisibility(View.GONE);
                    getResults(textQuery, "user");
                    break;
                case R.id.radioButtonExercise:
                    results.clear();
                    adapter.notifyDataSetChanged();
                    isExerciseButtonSelected = true;
                    ll.setVisibility(View.VISIBLE);
                    getExercises(textQuery, currentLanguageFilter, currentTypeFilter, currentLevelFilter, "exercise");
                    break;
            }
        });

        SearchView searchView = findViewById(R.id.searchText);
        searchView.setOnClickListener(v -> searchView.setIconified(false));
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                textQuery = query;
                if(isExerciseButtonSelected){
                    getExercises(textQuery, currentLanguageFilter, currentTypeFilter, currentLevelFilter, "exercise");
                } else {
                    getResults(query, "user");
                }
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                textQuery = newText;
                if(isExerciseButtonSelected){
                    getExercises(textQuery, currentLanguageFilter, currentTypeFilter, currentLevelFilter, "exercise");
                } else {
                    if (searchView.getQuery().toString().length() != 0) {
                        getResults(searchView.getQuery().toString(), "user");
                    }
                }
                return false;
            }
        });

        //Language Spinner

        languageSpinner = (Spinner)findViewById(R.id.spinnerLanguage);
        ArrayAdapter<String> languageSpinnerAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, languages) {
            @Override
            public int getCount() {
                return 2;
            }
        };
        AdapterView.OnItemSelectedListener languageListener = new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                switch (position) {
                    case 0:
                        currentLanguageFilter = "en";
                        break;
                    case 1:
                        currentLanguageFilter = "de";
                        break;
                }
                getExercises(textQuery, currentLanguageFilter, currentTypeFilter, currentLevelFilter, "exercise");
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {}
        };
        languageSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        languageSpinner.setAdapter(languageSpinnerAdapter);
        languageSpinner.setOnItemSelectedListener(languageListener);
        languageSpinner.setSelection(2);

        //Type spinner
        typeSpinner = (Spinner)findViewById(R.id.spinnerType);
        ArrayAdapter<String> typeSpinnerAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, types) {
            @Override
            public int getCount() {
                return 5;
            }
        };
        AdapterView.OnItemSelectedListener typeListener = new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                switch (position) {
                    case 0:
                        currentTypeFilter = "reading";
                        break;
                    case 1:
                        currentTypeFilter = "listening";
                        break;
                    case 2:
                        currentTypeFilter = "vocabulary";
                        break;
                    case 3:
                        currentTypeFilter = "grammar";
                        break;
                    case 4:
                        currentTypeFilter = "writing";
                        break;
                }
                getExercises(textQuery, currentLanguageFilter, currentTypeFilter, currentLevelFilter, "exercise");
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        };
        typeSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        typeSpinner.setAdapter(typeSpinnerAdapter);
        typeSpinner.setOnItemSelectedListener(typeListener);
        typeSpinner.setSelection(5);

        //Level Spinner
        levelSpinner = (Spinner)findViewById(R.id.spinnerLevel);
        ArrayAdapter<String> levelSpinnerAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, levels) {
            @Override
            public int getCount() {
                return 6;
            }
        };
        AdapterView.OnItemSelectedListener levelListener = new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                switch (position) {
                    case 0:
                        currentLevelFilter = "A1";
                        break;
                    case 1:
                        currentLevelFilter = "A2";
                        break;
                    case 2:
                        currentLevelFilter = "B1";
                        break;
                    case 3:
                        currentLevelFilter = "B2";
                        break;
                    case 4:
                        currentLevelFilter = "C1";
                        break;
                    case 5:
                        currentLevelFilter = "C2";
                        break;
                }
                getExercises(textQuery, currentLanguageFilter, currentTypeFilter, currentLevelFilter, "exercise");
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        };

        levelSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        levelSpinner.setAdapter(levelSpinnerAdapter);
        levelSpinner.setOnItemSelectedListener(levelListener);
        levelSpinner.setSelection(6);
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

    public void getExercises(String text, String abbr, String extype, String level, String type) {
        Call<List<SearchResult>> responseCall = apiInterface.doSearchExercise(text, type, abbr, level, extype);
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


    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }
}
