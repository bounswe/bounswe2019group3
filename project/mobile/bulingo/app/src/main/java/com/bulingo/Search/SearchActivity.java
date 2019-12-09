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
    private ArrayList<Language> languageList;
    private ArrayList<String> languageStringList;
    private static String[] languages;
    private static final String[] types = {"Reading", "Listening", "Vocabulary", "Grammar", "Writing", "Type"};
    private static final String[] levels = {"A1", "A2", "B1", "B2", "C1", "C2", "Level"};

    private String currentLanguageFilter = "";
    private String currentTypeFilter = "";
    private String currentLevelFilter = "";

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
                        Intent intent = new Intent(getApplicationContext(), ProfilePage.class);
                        intent.putExtra("sender", sender);
                        intent.putExtra("username", results.get(position).username);
                        startActivity(intent);
                    }

                    @Override
                    public void onLongItemClick(View view, int position) {

                    }
                })
        );

        getLanguages();

        SearchView searchView = findViewById(R.id.searchText);
        searchView.setOnClickListener(v -> searchView.setIconified(false));
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                getResults(query, "user");
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                if (searchView.getQuery().toString().length() != 0) {
                    getResults(searchView.getQuery().toString(), "user");
                }
                return false;
            }
        });

        RadioGroup rg = (RadioGroup) findViewById(R.id.radioGroup);
        LinearLayout ll = findViewById(R.id.filters);

        rg.setOnCheckedChangeListener((group, checkedId) -> {
            switch(checkedId){
                case R.id.radioButtonUser:
                    ll.setVisibility(View.GONE);
                    break;
                case R.id.radioButtonExercise:
                    ll.setVisibility(View.VISIBLE);
                    break;
            }
        });

        //Language Spinner
        for(Language l : languageList){
            languageStringList.add(l.name);
        }
        languageStringList.add("Language");
        languages = languageStringList.toArray(new String[languageStringList.size()]);

        languageSpinner = (Spinner)findViewById(R.id.spinnerLanguage);
        ArrayAdapter<String> languageSpinnerAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, languages) {
            @Override
            public int getCount() {
                return languages.length-1;
            }
        };
        AdapterView.OnItemSelectedListener languageListener = new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                currentLanguageFilter = languages[position];
                getExercises(currentLanguageFilter, currentTypeFilter, currentLevelFilter);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {}
        };
        languageSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        languageSpinner.setAdapter(languageSpinnerAdapter);
        languageSpinner.setOnItemSelectedListener(languageListener);
        languageSpinner.setSelection(languages.length-1);

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
                        currentTypeFilter = "Reading";
                        break;
                    case 1:
                        currentTypeFilter = "Listening";
                        break;
                    case 2:
                        currentTypeFilter = "Vocabulary";
                        break;
                    case 3:
                        currentTypeFilter = "Grammar";
                        break;
                    case 4:
                        currentTypeFilter = "Writing";
                        break;
                }
                getExercises(currentLanguageFilter, currentTypeFilter, currentLevelFilter);
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
                getExercises(currentLanguageFilter, currentTypeFilter, currentLevelFilter);
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
                }
            }

            @Override
            public void onFailure(Call<List<ExerciseItem>> call, Throwable t) {
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

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }
}
