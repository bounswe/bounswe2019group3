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

    private List<Integer> answers = new ArrayList<>();
    private List<Integer> questions = new ArrayList<>();
    private int questionCounter = 0;
    private List<Question> examQuestions =  new ArrayList<Question>();
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    String abbr;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise);

        Intent i = getIntent();
        abbr = i.getStringExtra("abbr");
        getQuestions(abbr);
    }

    public void nextQuestion() {
        if(questionCounter >= examQuestions.size()) {
            Intent intent = new Intent(this, ResultActivity.class);
            int[] arr = new int[answers.size()];
            int[] arr2 = new int[answers.size()];
            for(int i=0; i<answers.size(); i++){
                arr[i] = answers.get(i);
                arr2[i] = questions.get(i);
            }
            intent.putExtra("answers", arr);
            intent.putExtra("questions", arr2);
            intent.putExtra("abbr", abbr);
            intent.putExtra("mode", "exam");
            startActivity(intent);
            finish();
            return;
        }
        ExerciseFragment e = ExerciseFragment.newInstance(examQuestions.get(questionCounter), ++questionCounter);
        e.setOnClickAnswerListener(answerId -> {
            answers.add(answerId);
            questions.add(examQuestions.get(questionCounter-1).id);
            nextQuestion();
        });
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.exerciseFrag, e).commit();

    }

    public void getQuestions(String abbr){

        Call<List<Question>> responseCall = apiInterface.doGetExamQuestions(abbr);

        responseCall.enqueue(new Callback<List<Question>>() {
            @Override
            public void onResponse(Call<List<Question>> call, Response<List<Question>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    examQuestions = response.body();
                    nextQuestion();
                } else {
                }
            }

            @Override
            public void onFailure(Call<List<Question>> call, Throwable t) {
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
