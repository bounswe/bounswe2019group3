package com.bulingo.Database;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import okhttp3.MediaType;

public class Database {

    APIInterface apiInterface = APICLient.getClient().create(APIInterface.class);

    //Register icin(username alinmis mi diye) ve log in icin
    public boolean checkUserNameDatabase(String username, String password){

        return true;
    }


    public boolean getUserDatabase(String username, String password){
        return true;
    }

    //Bu email ile daha once register olan var mi diye
    public boolean checkEMailDatabase(String email){

        return false;
    }

    //Gonderilen bilgiler bos gelmiyor, kontrol ediyorum. Yukaridaki fonksiyonlari kullanarak
    //username ve email alinmis mi diye de kontrol ediyorum. Database de kullanici olusturman yeterli.
    public boolean createUserInDatabase(String fullName, String email, String username, String password){

        return true;
    }


    //Simdilik void biraktim, profil icin(bio,avatar,email,rating vs) bilgilerin bir format belirlenip alinmasi gerek.
    public void getProfileInfo(String username){

    }

}
