package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.TextView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Question;
import com.bulingo.R;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Exercise extends AppCompatActivity {

    private List<String> answers;
    private int id;
    private int questionCounter = 0;
    private List<Question> examQuestions =  new ArrayList<Question>();
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise);

        Intent i = getIntent();
        String abbr = i.getStringExtra("abbr");
        getQuestions(abbr);
    }

    public void getQuestions(String abbr){

        Call<List<Question>> responseCall = apiInterface.doGetExamQuestions(abbr);

        responseCall.enqueue(new Callback<List<Question>>() {
            @Override
            public void onResponse(Call<List<Question>> call, Response<List<Question>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    examQuestions = response.body();
                    getSupportFragmentManager().beginTransaction()
                            .replace(R.id.exerciseFrag, ExerciseFragment.newInstance(examQuestions.get(0))).commit();

                } else {
                }
            }

            @Override
            public void onFailure(Call<List<Question>> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    public void onClickNextQuestion(View v){

        //Evaluate Answer
        switch (v.getId()) {
            case R.id.answer1:

                break;
            case R.id.answer2:

                break;
            case R.id.answer3:

                break;
            case R.id.answer4:

                break;
        }

    }

    public boolean isNextQuestionAvailable(){
        return true;
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
                                Exercise.super.onBackPressed();
                            }
                        }).setNeutralButton(android.R.string.cancel,
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,
                                                int whichButton) {
                            }
                        }).show();
    }



}
