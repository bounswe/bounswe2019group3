package com.bulingo.Profile;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.bulingo.R;

public class EditProfile extends AppCompatActivity {
    String username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
        username = getIntent().getStringExtra("username");
    }

    public void saveChanges(View view) {
    }

    public void cancel(View view) {
        finish();
    }
}
