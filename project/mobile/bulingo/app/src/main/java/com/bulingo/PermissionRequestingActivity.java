package com.bulingo;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.util.ArrayList;

public class PermissionRequestingActivity extends Activity {

    public static final int REQUEST_CODE_PERMISSION_REQUESTING_ACTIVITY = 0x1000;

    private OnPermissionsGrantedListener onPermissionsGrantedListener;
    private OnPermissionsDeniedListener onPermissionsDeniedListener;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    protected void requestPermissions(String[] permissions) {
        ArrayList<String> requestingPermissions = new ArrayList<>();
        for(String perm : permissions) {
            if(ContextCompat.checkSelfPermission(this,
                    perm) != PackageManager.PERMISSION_GRANTED) {
                requestingPermissions.add(perm);
            }
        }
        if(requestingPermissions.size() == 0) {
            if(onPermissionsGrantedListener != null) onPermissionsGrantedListener.onPermissionsGranted();
        } else {
            String[] requestingPermissionsArray = new String[requestingPermissions.size()];
            requestingPermissions.toArray(requestingPermissionsArray);
            ActivityCompat.requestPermissions(this, requestingPermissionsArray,
                    REQUEST_CODE_PERMISSION_REQUESTING_ACTIVITY);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode == REQUEST_CODE_PERMISSION_REQUESTING_ACTIVITY) {
            if(grantResults.length > 0) {
                boolean flagAllGranted = true;
                for (int res : grantResults) {
                    if(res != PackageManager.PERMISSION_GRANTED) {
                        flagAllGranted = false;
                        break;
                    }
                }
                if(flagAllGranted) {
                    if(onPermissionsGrantedListener != null) onPermissionsGrantedListener.onPermissionsGranted();
                } else {
                    if(onPermissionsDeniedListener != null) onPermissionsDeniedListener.onPermissionsDenied();
                }

            }
        }
    }

    public void setOnPermissionsGrantedListener(OnPermissionsGrantedListener onPermissionsGrantedListener) {
        this.onPermissionsGrantedListener = onPermissionsGrantedListener;
    }

    public void setOnPermissionsDeniedListener(OnPermissionsDeniedListener onPermissionsDeniedListener) {
        this.onPermissionsDeniedListener = onPermissionsDeniedListener;
    }

    public interface OnPermissionsGrantedListener {
        void onPermissionsGranted();
    }

    public interface OnPermissionsDeniedListener {
        void onPermissionsDenied();
    }
}
