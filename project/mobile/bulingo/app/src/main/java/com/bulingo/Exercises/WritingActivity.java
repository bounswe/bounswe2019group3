package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.ExerciseItem;
import com.bulingo.Database.ExerciseQuestion;
import com.bulingo.PermissionRequestingActivity;
import com.bulingo.R;
import com.bulingo.SendSearchActivity;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import java.util.ArrayList;
import java.util.List;

import jp.wasabeef.glide.transformations.CropCircleTransformation;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class WritingActivity extends PermissionRequestingActivity implements PermissionRequestingActivity.OnPermissionsGrantedListener {

    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    String abbr;
    String id;
    String username;
    String imUri;

    List<ExerciseQuestion> exerciseQuestions = new ArrayList<>();
    RelativeLayout rl;
    TextView imageText;
    EditText writingText;
    EditText writingTitle;
    boolean isImage = false;
    private static int RESULT_LOAD_IMG = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_writing);
        abbr = getIntent().getStringExtra("abbr");
        id = getIntent().getStringExtra("id");
        username = getIntent().getStringExtra("username");

        getQuestion();
        this.setOnPermissionsGrantedListener(this);

        rl = findViewById(R.id.imageLayout);
        imageText = findViewById(R.id.avatarText);
        writingText = findViewById(R.id.writingText);
        writingTitle = findViewById(R.id.writingTitle);
        rl.setVisibility(View.INVISIBLE);
        imageText.setVisibility(View.INVISIBLE);
        RadioGroup rg = (RadioGroup) findViewById(R.id.radioGroup);

        rg.setOnCheckedChangeListener((group, checkedId) -> {
            switch (checkedId) {
                case R.id.radioButtonText:
                    isImage = false;
                    writingText.setVisibility(View.VISIBLE);
                    writingTitle.setVisibility(View.VISIBLE);
                    rl.setVisibility(View.INVISIBLE);
                    imageText.setVisibility(View.INVISIBLE);
                    break;
                case R.id.radioButtonImage:
                    isImage = true;
                    writingText.setVisibility(View.INVISIBLE);
                    writingTitle.setVisibility(View.INVISIBLE);
                    rl.setVisibility(View.VISIBLE);
                    imageText.setVisibility(View.VISIBLE);
                    break;
            }
        });
    }

    public void getQuestion() {

        Call<List<ExerciseQuestion>> responseCall = apiInterface.doGetQuestionsOfExercise(abbr, id);

        responseCall.enqueue(new Callback<List<ExerciseQuestion>>() {
            @Override
            public void onResponse(Call<List<ExerciseQuestion>> call, Response<List<ExerciseQuestion>> response) {
                Log.d("request", response.toString());
                if (response.code() == 200) {
                    exerciseQuestions = response.body();
                    TextView question = findViewById(R.id.question);
                    question.setText(exerciseQuestions.get(0).desc);
                }
            }

            @Override
            public void onFailure(Call<List<ExerciseQuestion>> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    public void selectImage(View view) {
        requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE});
    }

    @Override
    public void onPermissionsGranted() {
        Intent photoPickerIntent = new Intent(Intent.ACTION_GET_CONTENT);
        photoPickerIntent.setType("image/*");
        startActivityForResult(photoPickerIntent, RESULT_LOAD_IMG);
    }

    @Override
    public void onActivityResult(int reqCode, int resultCode, Intent data) {
        super.onActivityResult(reqCode, resultCode, data);
        ImageView imageView = findViewById(R.id.image);

        if (resultCode == RESULT_OK) {
            final Uri imageUri = data.getData();
            this.imUri = imageUri.toString();
            //Set Image with glide
            Glide.with(getApplicationContext())
                    .load(imageUri)
                    .skipMemoryCache(true)
                    .diskCacheStrategy(DiskCacheStrategy.NONE)
                    .bitmapTransform(new CropCircleTransformation(getApplicationContext()))
                    .into(imageView);

        }
    }


    public void sendWriting(View view) {
        String text = writingText.getText().toString();
        String title = writingTitle.getText().toString();
        if((this.imUri == null && isImage) || ((text.equals("") || title.equals("")) && !isImage)) {
            toast("Please provide content.");
            return;
        }
        Intent intent = new Intent(getApplicationContext(), SendSearchActivity.class);
        intent.putExtra("username", this.username);
        intent.putExtra("isImage", isImage);
        intent.putExtra("abbr", abbr);
        if(isImage) {
            intent.putExtra("imageUri", this.imUri);
        } else {
            intent.putExtra("text", text);
            intent.putExtra("title", title);
        }
        startActivity(intent);
        finish();
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }
}
