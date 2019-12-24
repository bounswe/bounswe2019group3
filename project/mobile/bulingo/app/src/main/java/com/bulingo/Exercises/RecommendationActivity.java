package com.bulingo.Exercises;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;

import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;

import com.bulingo.Chat.RecyclerItemClickListener;
import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.RecommendationResult;
import com.bulingo.Database.SearchResult;
import com.bulingo.R;
import com.bulingo.Search.SearchRecyclerViewAdapter;
import com.google.gson.JsonObject;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RecommendationActivity extends AppCompatActivity {

    RecommendationRecyclerViewAdapter adapter;
    RecyclerView recyclerView;
    List<RecommendationResult> results = new ArrayList<>();
    APIInterface apiInterface;
    String username;
    String title = "";
    String text = "";
    Boolean isImage;
    Uri imageUri;
    String abbr;
    File imageFile;

    private String textQuery = "";

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_recommendation);
            Toolbar toolbar = (Toolbar) findViewById(R.id.appbar);
            setSupportActionBar(toolbar);
            
            username = getIntent().getStringExtra("username");
            isImage = getIntent().getBooleanExtra("isImage", false);
            abbr = getIntent().getStringExtra("abbr");
            title = getIntent().getStringExtra("title");
            if(isImage) {
                imageUri = Uri.parse(getIntent().getStringExtra("imageUri"));
            } else {
                text = getIntent().getStringExtra("text");
            }
            apiInterface = APICLient.getClient(getApplicationContext()).create(APIInterface.class);
            recyclerView = findViewById(R.id.chatRecyclerview);
            LinearLayoutManager layoutManager = new LinearLayoutManager(this);
            recyclerView.setLayoutManager(layoutManager);
            adapter = new RecommendationRecyclerViewAdapter(results, getApplicationContext());
            recyclerView.setAdapter(adapter);
            recyclerView.addOnItemTouchListener(
                    new RecyclerItemClickListener(this, recyclerView, new RecyclerItemClickListener.OnItemClickListener() {
                        @Override
                        public void onItemClick(View view, int position) {
                            if(isImage) {
                                postWritingImage(title, results.get(position).username);
                            } else {
                                postWriting(title, text, results.get(position).username);
                            }

                        }

                        @Override
                        public void onLongItemClick(View view, int position) {

                        }
                    })
            );

            getResults();
        }



    public void getResults() {
        Call<List<RecommendationResult>> responseCall = apiInterface.doGetRecommendation(abbr);
        responseCall.enqueue(new Callback<List<RecommendationResult>>() {
            @Override
            public void onResponse(Call<List<RecommendationResult>> call, Response<List<RecommendationResult>> response) {
                if(response.isSuccessful()) {
                    results.clear();
                    results.addAll(response.body());
                    adapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<List<RecommendationResult>> call, Throwable t) {
                toast("Cannot get results. Please try again.");
            }
        });
    }

    public void postWriting(String title, String body, String assignee) {

        JsonObject paramObject = new JsonObject();
        paramObject.addProperty("text", body);
        paramObject.addProperty("title", title);
        paramObject.addProperty("assignee", assignee);
        paramObject.addProperty("lang_abbr", this.abbr);
        Call<Void> responseCall = apiInterface.doPostWriting(paramObject);

        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                toast("Writing sent successfully.");
                finish();
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                toast("Writing text sending failed.");
            }

        });
    }

    public void postWritingImage(String title, String assignee) {
        toast(imageUri.toString());
        final String docId = DocumentsContract.getDocumentId(imageUri);
        Uri contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
        final String selection = "_id=?";
        final String[] selectionArgs = { docId.split(":")[1] };

        final String column = "_data";
        final String[] projection = { column };
        String path = null;
        try (Cursor cursor = this.getContentResolver().query(contentUri, projection, selection,
                selectionArgs, null)) {
            if(cursor != null && cursor.moveToFirst()) {
                final int index = cursor.getColumnIndexOrThrow(column);
                path = cursor.getString(index);
            }
        }

        if(path != null) {
            imageFile = new File(path);
        }

        if(imageFile == null || imageFile.length() == 0){
            finish();
            return;
        }

        Map<String, RequestBody> map = new HashMap<>();
        map.put("title", toRequestBody(title));
        map.put("assignee", toRequestBody(assignee));
        map.put("lang_abbr", toRequestBody(abbr));

        RequestBody fileReqBody = RequestBody.create(imageFile, MediaType.parse("image/*"));
        MultipartBody.Part part = MultipartBody.Part.createFormData("image", imageFile.getName(), fileReqBody);

        Call<Void> responseCall = apiInterface.doPostWritingImage(map, part);

        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                toast("Writing image sent successfully.");
                finish();
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                toast("Writing image sending failed.");
            }
        });
    }

    public static RequestBody toRequestBody (String value) {
        RequestBody body = RequestBody.create(MediaType.parse("text/plain"), value);
        return body ;
    }


    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }
}
