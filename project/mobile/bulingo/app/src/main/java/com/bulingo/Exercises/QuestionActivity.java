package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.ExerciseQuestion;
import com.bulingo.Database.ExerciseResult;
import com.bulingo.Database.Question;
import com.bulingo.R;
import com.google.gson.JsonArray;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class QuestionActivity extends AppCompatActivity  {

    private List<Integer> answers = new ArrayList<>();
    private List<Integer> questions = new ArrayList<>();
    private List<ExerciseResult.Answer> answerKey = new ArrayList<>();
    private int questionCounter = 0;
    private List<ExerciseQuestion> exerciseQuestions =  new ArrayList<ExerciseQuestion>();
    private boolean isLoaded = false;
    private boolean isPlaying = false;
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    MediaPlayer mediaPlayer = null;
    Handler handler = new Handler();
    Runnable stopPlayerTask = (() -> {
        if(mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
        }
    });

    String abbr;
    String id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);

        Intent i = getIntent();
        abbr = i.getStringExtra("abbr");
        id = i.getStringExtra("id");
        getResults();


    }


    public void getQuestions(){

        Call<List<ExerciseQuestion>> responseCall = apiInterface.doGetQuestionsOfExercise(abbr, id);

        responseCall.enqueue(new Callback<List<ExerciseQuestion>>() {
            @Override
            public void onResponse(Call<List<ExerciseQuestion>> call, Response<List<ExerciseQuestion>> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    exerciseQuestions = response.body();
                    nextQuestion();
                }
            }

            @Override
            public void onFailure(Call<List<ExerciseQuestion>> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    public void getResults(){
        Call<ExerciseResult> responseCall = apiInterface.doGetAnswersOfExercise(abbr, id, new JsonArray());

        responseCall.enqueue(new Callback<ExerciseResult>() {
            @Override
            public void onResponse(Call<ExerciseResult> call, Response<ExerciseResult> response) {
                Log.d("request", response.toString());
                if(response.code() == 200) {
                    ExerciseResult res = response.body();
                    answerKey = res.answers;
                    getQuestions();
                }
            }

            @Override
            public void onFailure(Call<ExerciseResult> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    public void nextQuestion() {
        isLoaded = false;

        if(mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.release();
            mediaPlayer = null;
        }

        if(questionCounter >= exerciseQuestions.size()) {

            Intent intent = new Intent(this, ResultActivity.class);
            int[] arr = new int[answers.size()];
            int[] arr2 = new int[answers.size()];
            for(int i=0; i<answers.size(); i++){
                arr[i] = answers.get(i);
                arr2[i] = Integer.parseInt(exerciseQuestions.get(i).id);
            }
            intent.putExtra("answers", arr);
            intent.putExtra("questions", arr2);
            intent.putExtra("abbr", abbr);
            intent.putExtra("mode", "exercise");
            intent.putExtra("id", id);
            startActivity(intent);
            finish();
            return;
        }

        QuestionFragment e = QuestionFragment.newInstance(exerciseQuestions.get(questionCounter), answerKey.get(questionCounter), questionCounter+1);
        if(exerciseQuestions.get(questionCounter).media_url != null) {
            mediaPlayer = new MediaPlayer();
            mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
            isPlaying = false;
            try {
                mediaPlayer.setDataSource("http://ec2-18-184-207-248.eu-central-1.compute.amazonaws.com/"+exerciseQuestions.get(questionCounter).media_url);
            //    mediaPlayer.setDataSource("https://all-birds.com/Sound/white%20geese%20shrt.wav");
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            mediaPlayer.prepareAsync();
            mediaPlayer.setOnPreparedListener(mp -> {
                isLoaded = true;
                e.onReady();
            });
        }

        e.setOnClickAnswerListener(answerId -> {
            answers.add(answerId);
            nextQuestion();
        });
        e.setOnClickPlayListener(play -> {
            if(isLoaded) {
                if(!isPlaying){
                    mediaPlayer.seekTo(Integer.parseInt(exerciseQuestions.get(questionCounter).media_start_time)*1000);
                    mediaPlayer.start();
                    //handler.postDelayed(stopPlayerTask, 12000);
                    isPlaying = true;
                    handler.postDelayed(stopPlayerTask, (Integer.parseInt(exerciseQuestions.get(questionCounter).media_end_time) - Integer.parseInt(exerciseQuestions.get(questionCounter).media_start_time))*1000);
                }
            } else {
                toast("Media is not ready yet.");
            }
        });
        e.setOnClickResetListener(reset -> {
            handler.removeCallbacks(stopPlayerTask);
            if(isLoaded) {
                if(isPlaying){
                    mediaPlayer.pause();
                    mediaPlayer.seekTo(Integer.parseInt(exerciseQuestions.get(questionCounter).media_start_time)*1000);
                    mediaPlayer.seekTo(0);
                    isPlaying = false;
                }
            } else {
                toast("Media is not ready yet.");
            }
        });
        questionCounter ++;
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.questionFrag, e).commit();


    }

    @Override
    protected void onStop() {
        super.onStop();
        handler.removeCallbacks(stopPlayerTask);
        if(mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.release();
            mediaPlayer = null;
        }
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

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }

}
