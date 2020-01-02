package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.BackgroundColorSpan;
import android.text.style.ClickableSpan;
import android.util.Log;
import android.view.ActionMode;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Annotation;
import com.bulingo.R;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Response;

public class AnnotateWriting extends AppCompatActivity implements ActionMode.Callback {

    boolean isSent;
    String creator;
    String writing_id;
    private String title;
    private String body;
    private String assignee;
    private String writer;
    private TextView mTextView;
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
        setContentView(R.layout.activity_annotate_writing);
        apiInterface = APICLient.getClient(this).create(APIInterface.class);
        isSent = getIntent().getBooleanExtra("isSent", true);
        creator = getIntent().getStringExtra("username");
        writing_id = getIntent().getStringExtra("id");
        title = getIntent().getStringExtra("textTitle");
        body = getIntent().getStringExtra("textBody");
        assignee = getIntent().getStringExtra("assignee");
        writer = getIntent().getStringExtra("writtenBy");
        mTextView = findViewById(R.id.writingText);
        mTextView.setText(body);
        TextView writingTitle = findViewById(R.id.TitleStatic);
        TextView topTitle = findViewById(R.id.title);
        writingTitle.setText(title);

        annotations = new ArrayList<>();
        if(isSent) {
            mTextView.setTextIsSelectable(false);
            topTitle.setText("Sent to " + assignee);
        } else {
            topTitle.setText("Review " + writer);
        }

        mTextView.setCustomSelectionActionModeCallback(this);
        listAnnotations();
    }

    @Override
    public boolean onActionItemClicked(ActionMode mode, MenuItem item) {
        start = mTextView.getSelectionStart();
        end = mTextView.getSelectionEnd();

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
        popupWindow.showAtLocation(mTextView, Gravity.CENTER, 0,0);
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
            addAnnotation(value, start, end);
        });

        return false;
    }

    @Override
    public boolean onCreateActionMode(ActionMode mode, Menu menu) {
        mode.setTitle("Add Comment");
        mode.getMenuInflater().inflate(R.menu.annotate_menu, menu);

        return true;
    }

    @Override
    public void onDestroyActionMode(ActionMode mode) {

    }

    @Override
    public boolean onPrepareActionMode(ActionMode mode, Menu menu) {
        menu.removeItem(android.R.id.selectAll);
        menu.removeItem(android.R.id.cut);
        menu.removeItem(android.R.id.copy);
        menu.removeItem(android.R.id.shareText);
        return true;
    }


    public void addAnnotation(String value, int start, int end) {

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
        target.addProperty("type", "Text");
        JsonObject selector = new JsonObject();
        selector.addProperty("type", "FragmentSelector");
        selector.addProperty("conformsTo", "http://tools.ietf.org/rfc/rfc5147");
        selector.addProperty("value", "char=" + start + "," + end);
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
                    int index = Integer.parseInt(val.substring(val.indexOf("=")+1, val.indexOf(",")));
                    annotationMap.put(index, a);
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

    private void createAnnotations() {
        SpannableString ss = new SpannableString(mTextView.getText());

        for (Annotation a : annotationMap.values()) {
            ClickableSpan clickableSpan = new ClickableSpan() {
                @Override
                public void onClick(View textView) {
                    Spanned s = (Spanned) mTextView.getText();
                    int clickStart = s.getSpanStart(this);
                    if(annotationMap.get(clickStart) != null){
                        //--------------Popup stuff---------------
                        LayoutInflater inflater = (LayoutInflater)
                                getSystemService(LAYOUT_INFLATER_SERVICE);
                        popupView = inflater.inflate(R.layout.popup_get_annotation, null);
                        MaterialButton button  = popupView.findViewById(R.id.popup);
                        button.setText(annotationMap.get(clickStart).body.value + " ");
                        int width = LinearLayout.LayoutParams.WRAP_CONTENT;
                        int height = LinearLayout.LayoutParams.WRAP_CONTENT;
                        popupWindow = new PopupWindow(popupView, width, height, true);
                        popupWindow.showAtLocation(mTextView, Gravity.BOTTOM, 0,0);
                        View container = popupWindow.getContentView().getRootView();
                        WindowManager wm = (WindowManager) getSystemService(Context.WINDOW_SERVICE);
                        WindowManager.LayoutParams p = (WindowManager.LayoutParams) container.getLayoutParams();
                        p.flags |= WindowManager.LayoutParams.FLAG_DIM_BEHIND;
                        p.dimAmount = 0.27f;
                        wm.updateViewLayout(container, p);
                    }
                }

                @Override
                public void updateDrawState(TextPaint ds) {
                    super.updateDrawState(ds);
                    ds.setUnderlineText(false);
                    ds.setColor(mTextView.getCurrentTextColor());
                    ds.bgColor = getResources().getColor(R.color.colorAccentLessTransparent);
                }
            };
            String val = a.target.selector.coordinates;
            int indexStart = Integer.parseInt(val.substring(val.indexOf("=")+1, val.indexOf(",")));
            int indexEnd = Integer.parseInt(val.substring(val.indexOf(",")+1));
            ss.setSpan(clickableSpan, indexStart, indexEnd, Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
        }
        mTextView.setMovementMethod(LinkMovementMethod.getInstance());
        mTextView.setText(ss);
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }

    public void finishReview(View view) {
        finish();
    }

    @Override
    public void onBackPressed() {
        finish();
    }
}
