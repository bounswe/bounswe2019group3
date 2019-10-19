package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Grade;
import com.bulingo.Login.LoginMain;
import com.bulingo.R;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ResultActivity extends AppCompatActivity {

    private int[] answers;
    private int[] questions;
    String abbr;
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);
        answers = getIntent().getIntArrayExtra("answers");
        questions = getIntent().getIntArrayExtra("questions");
        abbr = getIntent().getStringExtra("abbr");
        getResult(abbr);

    }

    public void getResult(String abbr){

        JsonArray paramArray = answersToJsonArray(answers, questions);

        Call<Grade> responseCall = apiInterface.doEvaluateExam(abbr, paramArray);
        responseCall.enqueue(new Callback<Grade>() {
            @Override
            public void onResponse(Call<Grade> call, Response<Grade> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    Grade g = response.body();
                    TextView result = findViewById(R.id.examResult);
                    result.setText(g.grade);
                } else {
                }
            }

            @Override
            public void onFailure(Call<Grade> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }


    public static JsonArray answersToJsonArray(int[] answers, int[] questions) {
        JsonArray paramArray = new JsonArray();
        for(int i=0; i<answers.length; i++) {
            JsonObject paramObject = new JsonObject();
            paramObject.addProperty("question_id", String.valueOf(questions[i]));
            paramObject.addProperty("choice_id", String.valueOf(answers[i]));
            paramArray.add(paramObject);
        }
        return paramArray;
    }

    public void onClickReturnMain(View view) {
        finish();
    }
}
