package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import java.net.URL;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Annotation;
import com.bulingo.R;
import com.bumptech.glide.Glide;
import com.google.android.material.button.MaterialButton;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Response;

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
    private List<Annotation> annotations;
    private Canvas canvas;
    private Bitmap bitmap;
    private Paint paint;
    private ImageView markingImage;
    private ImageView baseImage;
    private int original_height;
    private int original_width;
    private Map<ArrayList<Integer>, Annotation> annotationMap = new HashMap<>();


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
        annotations = new ArrayList<>();

        if(isSent) {
            topTitle.setText("Sent to " + assignee);
        } else {
            topTitle.setText("Review " + writer);
        }

        baseImage = findViewById(R.id.writingImage);

        if(!imageUrl.substring(0,5).contains("http")){
            imageUrl = "http://18.184.207.248/" + imageUrl;
        }
        Glide.with(this)
                 .load(imageUrl)
                 .into(baseImage);

        Thread thread = new Thread(new Runnable() {

            @Override
            public void run() {
                try  {
                    URL url = new URL(imageUrl);
                    Bitmap bmp = BitmapFactory.decodeStream(url.openConnection().getInputStream());
                    original_width = bmp.getWidth();
                    original_height = bmp.getHeight();
                    Log.d("width", ""+original_width);
                    Log.d("heigh", ""+original_height);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        thread.start();

        baseImage.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View v, MotionEvent event) {
                    switch (event.getActionMasked()) {
                        case MotionEvent.ACTION_DOWN:
                            boolean resFound = false;
                            float currentX = event.getX();
                            float currentY = event.getY();
                            for(ArrayList<Integer> list : annotationMap.keySet()){
                                if(currentX-list.get(0)>-5 && currentX-list.get(0)<85 &&
                                        currentY-list.get(1)<50 && currentY-list.get(1)>-5){
                                    popupAnno(annotationMap.get(list).body.value);
                                    resFound = true;
                                }
                            }

                            if(!resFound && !isSent){
                                addAnnotation(event.getX(), event.getY());
                            }
                    }

                    return false;
                }
        });

        markingImage = findViewById(R.id.writingImageMarking);
        paint = new Paint();
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5.0f);
        paint.setAntiAlias(true);

        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                listAnnotations();
            }
        }, 500);
    }

    public void finishReview(View view) {
        finish();
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }

    public void addAnnotation(float x, float y) {
        LayoutInflater inflater = (LayoutInflater)
                getSystemService(LAYOUT_INFLATER_SERVICE);
        popupView = inflater.inflate(R.layout.popup_add_annotation, null);

        // create the popup window
        int width = LinearLayout.LayoutParams.WRAP_CONTENT;
        int height = LinearLayout.LayoutParams.WRAP_CONTENT;
        boolean focusable = true; // lets taps outside the popup also dismiss it
        popupWindow = new PopupWindow(popupView, width, height, focusable);

        // show the popup window
        // which view you pass in doesn't matter, it is only used for the window tolken
        popupWindow.showAtLocation(baseImage, Gravity.CENTER, 0,0);
        View container = popupWindow.getContentView().getRootView();
        WindowManager wm = (WindowManager) getSystemService(Context.WINDOW_SERVICE);
        WindowManager.LayoutParams p = (WindowManager.LayoutParams) container.getLayoutParams();
        p.flags |= WindowManager.LayoutParams.FLAG_DIM_BEHIND;
        p.dimAmount = 0.4f;
        wm.updateViewLayout(container, p);
        // dismiss the popup window when touched
        popupView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                popupWindow.dismiss();
                return true;
            }
        });

        Button add = popupView.findViewById(R.id.sendAnnotationButton);
        add.setOnClickListener((View v) -> {
            popupWindow.dismiss();
            EditText annotationText = popupView.findViewById(R.id.annotationText);

            String value = annotationText.getText().toString();

            sendAnnotation(value, (float)x/baseImage.getWidth()*original_width, (float)y/baseImage.getHeight()*original_height, (float)90/baseImage.getWidth()*original_width, (float)54/baseImage.getHeight()*original_height);
        });
    }

    public void sendAnnotation(String value, float x, float y, float width, float height) {
        JsonObject params = new JsonObject();
        params.addProperty("@context", "http://www.w3.org/ns/anno.jsonld");
        params.addProperty("type", "Annotation");
        JsonObject body = new JsonObject();
        body.addProperty("type", "TextualBody");
        body.addProperty("value", value);
        body.addProperty("format", "text/plain");
        params.add("body", body);
        JsonObject target = new JsonObject();
        target.addProperty("source", "http://18.184.207.248/api/writing/" + writing_id);
        target.addProperty("creator", creator);
        target.addProperty("type", "Image");
        JsonObject selector = new JsonObject();
        selector.addProperty("type", "FragmentSelector");
        selector.addProperty("conformsTo", "http://www.w3.org/TR/media-frags/");
        selector.addProperty("value", "xywh=" + (int)(x-45) + "," + (int)(y-27) + "," + (int)width + "," + (int)height);
        target.add("selector", selector);
        params.add("target", target);

        Call<Annotation> responseCall = apiInterface.doPostAnnotation(params);

        responseCall.enqueue(new retrofit2.Callback<Annotation>() {
            @Override
            public void onResponse(Call<Annotation> call, Response<Annotation> response) {
                listAnnotations();
            }

            @Override
            public void onFailure(Call<Annotation> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    public void listAnnotations() {
        Call<List<Annotation>> responseCall = apiInterface.doGetAnnotations("http://18.184.207.248/api/writing/" + writing_id);

        responseCall.enqueue(new retrofit2.Callback<List<Annotation>>() {
            @Override
            public void onResponse(Call<List<Annotation>> call, Response<List<Annotation>> response) {
                annotations.clear();
                annotations = response.body();
                for(Annotation a: annotations) {
                    String val = a.target.selector.coordinates;
                    int x = (int)Double.parseDouble(val.substring(val.indexOf("=")+1, val.indexOf(",")));
                    String s = val.substring(val.indexOf(",")+1);
                    int y = (int)Double.parseDouble(s.substring(0,s.indexOf(",")));
                    ArrayList<Integer> list = new ArrayList<>();
                    x = (int)(x*baseImage.getWidth()/original_width);
                    y = (int)(y*baseImage.getHeight()/original_height);
                    list.add(x);
                    list.add(y);
                    annotationMap.put(list, a);
                }
                if(annotations.size() > 0){
                    createAnnotations();
                }
            }

            @Override
            public void onFailure(Call<List<Annotation>> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

    public void createAnnotations() {
        if(baseImage.getMeasuredWidth() <= 0){
            return;
        }

        if(bitmap == null){
            bitmap = Bitmap.createBitmap(
                    baseImage.getMeasuredWidth(),
                    baseImage.getMeasuredHeight(),
                    Bitmap.Config.ALPHA_8
            );
        }
        if(canvas == null){
            canvas = new Canvas(bitmap);
            canvas.drawColor(Color.TRANSPARENT);
        }

        for(ArrayList<Integer> list : annotationMap.keySet()){
            int x = list.get(0);
            int y = list.get(1);
            canvas.drawRoundRect(x, y, x+90,y+54,5.0f,5.0f, paint);
            markingImage.setImageBitmap(bitmap);
        }
    }

    public void popupAnno(String value){
        LayoutInflater inflater = (LayoutInflater)
                getSystemService(LAYOUT_INFLATER_SERVICE);
        popupView = inflater.inflate(R.layout.popup_get_annotation, null);
        MaterialButton button  = popupView.findViewById(R.id.popup);
        button.setText(value + " ");
        int width = LinearLayout.LayoutParams.WRAP_CONTENT;
        int height = LinearLayout.LayoutParams.WRAP_CONTENT;
        popupWindow = new PopupWindow(popupView, width, height, true);
        popupWindow.showAtLocation(baseImage, Gravity.BOTTOM, 0,0);
        View container = popupWindow.getContentView().getRootView();
        WindowManager wm = (WindowManager) getSystemService(Context.WINDOW_SERVICE);
        WindowManager.LayoutParams p = (WindowManager.LayoutParams) container.getLayoutParams();
        p.flags |= WindowManager.LayoutParams.FLAG_DIM_BEHIND;
        p.dimAmount = 0.27f;
        wm.updateViewLayout(container, p);
    }
}