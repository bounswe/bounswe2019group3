package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.ExerciseResult;
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
    String mode;
    String id;
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);
        answers = getIntent().getIntArrayExtra("answers");
        questions = getIntent().getIntArrayExtra("questions");
        abbr = getIntent().getStringExtra("abbr");
        mode = getIntent().getStringExtra("mode");
        if(mode.equals("exam")) {
            getExamResult(abbr);
        } else {
            id = getIntent().getStringExtra("id");
            getResults();
        }

    }

    public void getResults(){
        JsonArray paramArray = answersToJsonArray(answers, questions);
        Call<ExerciseResult> responseCall = apiInterface.doGetAnswersOfExercise(abbr, id, paramArray);
        responseCall.enqueue(new Callback<ExerciseResult>() {
            @Override
            public void onResponse(Call<ExerciseResult> call, Response<ExerciseResult> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    ExerciseResult res = response.body();
                    TextView result = findViewById(R.id.examResult);
                    TextView detail = findViewById(R.id.examDetailResult);
                    result.setVisibility(View.GONE);
                    detail.setText(calculateRateForExercise(res.correct, res.numberOfQuestions));
                }
            }

            @Override
            public void onFailure(Call<ExerciseResult> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    public void getExamResult(String abbr){

        JsonArray paramArray = answersToJsonArray(answers, questions);

        Call<Grade> responseCall = apiInterface.doEvaluateExam(abbr, paramArray);
        responseCall.enqueue(new Callback<Grade>() {
            @Override
            public void onResponse(Call<Grade> call, Response<Grade> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    Grade g = response.body();
                    TextView result = findViewById(R.id.examResult);
                    TextView detail = findViewById(R.id.examDetailResult);
                    result.setText(g.grade);
                    detail.setText(calculateRate(g.grade));
                } else {
                }
            }

            @Override
            public void onFailure(Call<Grade> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    private String calculateRate(String grade) {
        return String.format("You have correctly solved %d%s of the questions.", (grade.charAt(0) - 'A') * 40 +
                (Integer.parseInt(String.valueOf(grade.charAt(1))) - 1) * 20, "%");
    }

    private String calculateRateForExercise(int right, int questions) {
        return String.format("You have correctly solved %d out of %d questions.", right, questions);
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
