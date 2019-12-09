package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.ExerciseResult;
import com.bulingo.Database.Question;
import com.bulingo.R;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class QuestionActivity extends AppCompatActivity {

    private List<Integer> answers = new ArrayList<>();
    private List<Integer> questions = new ArrayList<>();
    private int questionCounter = 0;
    private List<Question> examQuestions =  new ArrayList<Question>();
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    String abbr;
    String id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);

        Intent i = getIntent();
        abbr = i.getStringExtra("abbr");
        id = i.getStringExtra("id");


    }


    public void getQuestions(String abbr){

        Call<List<Question>> responseCall = apiInterface.doGetExamQuestions(abbr);

        responseCall.enqueue(new Callback<List<Question>>() {
            @Override
            public void onResponse(Call<List<Question>> call, Response<List<Question>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    examQuestions = response.body();
                } else {
                }
            }

            @Override
            public void onFailure(Call<List<Question>> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    public void getResults(){
        Call<ExerciseResult> responseCall = apiInterface.doGetAnswersOfExercise(abbr, id);

        responseCall.enqueue(new Callback<ExerciseResult>() {
            @Override
            public void onResponse(Call<ExerciseResult> call, Response<ExerciseResult> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    examQuestions = response.body();
                } else {
                }
            }

            @Override
            public void onFailure(Call<ExerciseResult> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event)  {
        if (keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) {
            userPrompt();
            return true;
        }

        return super.onKeyDown(keyCode, event);
    }

    public void userPrompt(){
        AlertDialog ad = new AlertDialog.Builder(this).setMessage(
                "Your progress will be lost. Are you sure you want to exit? ").setTitle(
                "Confirm Exit").setCancelable(false)
                .setPositiveButton(android.R.string.ok,
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,
                                                int whichButton) {
                                QuestionActivity.super.onBackPressed();
                            }
                        }).setNeutralButton(android.R.string.cancel,
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,
                                                int whichButton) {
                            }
                        }).show();
    }



}
