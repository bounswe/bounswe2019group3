package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.widget.TextView;

import com.bulingo.R;

public class Exercise extends AppCompatActivity {

    private ExerciseInfo info;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise);

        Intent i = getIntent();
        info = i.getParcelableExtra("info");

        if(info != null){
            doesIntentWork();
        }
    }

    private void doesIntentWork(){
        TextView questionNumber = findViewById(R.id.questionNumber);
        TextView questionText = findViewById(R.id.question);

        questionText.setText("This is a(n) " + info.getExerciseLanguage() + " question. This is a " +
                info.getExerciseType() + " exam.");

        questionNumber.setText("Question " + info.getQuestionNumber() + " ");
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

        if(isNextQuestionAvailable()){
            Intent intent = new Intent(this, Exercise.class);
            info.incrementQuestionNumber();
            intent.putExtra("info", info);
            startActivity(intent);
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
