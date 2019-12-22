package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Annotation;
import com.bulingo.R;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jp.wasabeef.glide.transformations.CropCircleTransformation;

public class AnnotateImageWriting extends AppCompatActivity {

    boolean isSent;
    String creator;
    String writing_id;
    private String title;
    private String assignee;
    private String writer;
    private String imageUrl;
    APIInterface apiInterface;
    private int start;
    private int end;
    private PopupWindow popupWindow;
    private View popupView;
    private Map<Integer, Annotation> annotationMap = new HashMap<>();
    private List<Annotation> annotations;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_annotate_image_writing);
        apiInterface = APICLient.getClient(this).create(APIInterface.class);
        isSent = getIntent().getBooleanExtra("isSent", true);
        creator = getIntent().getStringExtra("username");
        imageUrl = getIntent().getStringExtra("image");
        writing_id = getIntent().getStringExtra("id");
        title = getIntent().getStringExtra("textTitle");
        assignee = getIntent().getStringExtra("assignee");
        writer = getIntent().getStringExtra("writtenBy");

        TextView writingTitle = findViewById(R.id.TitleStatic);
        TextView topTitle = findViewById(R.id.title);
        writingTitle.setText(title);

        if(isSent) {
            topTitle.setText("Sent to " + assignee);
        } else {
            topTitle.setText("Review " + writer);
        }

        ImageView imageView = findViewById(R.id.writingImage);

        if(!imageUrl.substring(0,5).contains("http")){
            imageUrl = "http://18.184.207.248/" + imageUrl;
        }
        Glide.with(this)
                .load(imageUrl)
                .skipMemoryCache(true)
                .diskCacheStrategy(DiskCacheStrategy.NONE)
                .into(imageView);
    }


}
