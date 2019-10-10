package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.bulingo.R;

public class LanguageSelection extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_language_selection);
    }

    public void onClickLanguageSelect(View v) {
        Intent intent = new Intent(this, Exercise.class);
        ExerciseInfo info;

        switch (v.getId()) {
            case R.id.english:
                info = new ExerciseInfo(ExerciseInfo.ExerciseLanguage.ENGLISH);
                break;
            case R.id.turkish:
                info = new ExerciseInfo(ExerciseInfo.ExerciseLanguage.TURKISH);
                break;
            case R.id.german:
                info = new ExerciseInfo(ExerciseInfo.ExerciseLanguage.GERMAN);
                break;
            case R.id.french:
                info = new ExerciseInfo(ExerciseInfo.ExerciseLanguage.FRENCH);
                break;
                default:
                    info = new ExerciseInfo();
                    break;
        }

        if(isNewUser()){
            info.setExerciseType(ExerciseInfo.ExerciseType.LEVELDETERMINATION);
        }

        intent.putExtra("info", info);
        startActivity(intent);
    }

    public boolean isNewUser(){
        return true;
    }

}
