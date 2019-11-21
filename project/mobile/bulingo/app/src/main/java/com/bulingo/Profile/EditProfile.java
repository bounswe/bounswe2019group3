package com.bulingo.Profile;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.PathUtils;

import android.Manifest;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.DocumentsContract;
import android.provider.DocumentsProvider;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.PermissionRequestingActivity;
import com.bulingo.R;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditProfile extends PermissionRequestingActivity implements PermissionRequestingActivity.OnPermissionsGrantedListener {
    private static final String TAG = "EditProfile";
    APIInterface apiInterface = APICLient.getClient(this).create(APIInterface.class);
    String username;
    private File imageFile;
    private static int RESULT_LOAD_IMG = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
        username = getIntent().getStringExtra("username");
        this.setOnPermissionsGrantedListener(this);
    }

    public void cancel(View view) {
        finish();
    }

    public void selectAvatar(View view) {
        requestPermissions(new String[] { Manifest.permission.READ_EXTERNAL_STORAGE });
    }



    @Override
    protected void onActivityResult(int reqCode, int resultCode, Intent data) {
        super.onActivityResult(reqCode, resultCode, data);
        ImageView imageView = findViewById(R.id.image);

        if (resultCode == RESULT_OK) {
            try {
                final Uri imageUri = data.getData();
                final InputStream imageStream = getContentResolver().openInputStream(imageUri);
                final Bitmap selectedImage = BitmapFactory.decodeStream(imageStream);
                imageView.setImageBitmap(selectedImage);
                //Get Image File
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
                    Log.d(TAG, path);
                } else {
                    Log.d(TAG, "onActivityResult: noooo");
                    // TODO add some error message or something, lol
                }


            } catch (FileNotFoundException e) {
                e.printStackTrace();
                Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
            }

        }else {
            Toast.makeText(this, "You haven't picked Image",Toast.LENGTH_LONG).show();
        }
    }

    public void saveChanges(View view) {

        TextInputEditText input = findViewById(R.id.bioText);
        String message = input.getText().toString();

        RequestBody body = RequestBody.create(message, MediaType.parse("text/plain"));
        RequestBody fileReqBody = RequestBody.create(imageFile, MediaType.parse("image/*"));
        MultipartBody.Part part = MultipartBody.Part.createFormData("avatar", imageFile.getName(), fileReqBody);

        Call<Void> responseCall = apiInterface.doUpdateProfile(username, body, part);

        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                finish();
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.w("requestImage", t.toString());
                Toast.makeText(EditProfile.this, "Profile Update Failed", Toast.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public void onPermissionsGranted() {
        Intent photoPickerIntent = new Intent(Intent.ACTION_GET_CONTENT);
        photoPickerIntent.setType("image/*");
        startActivityForResult(photoPickerIntent, RESULT_LOAD_IMG);
    }
}
