package com.bulingo.Database;

import com.google.gson.JsonObject;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface APIInterface {

    @Headers("Content-Type: application/json")
    @POST("/api/auth/login")
     Call<User> doLogin(@Body JsonObject params);

    @Headers("Content-Type: application/json")
    @POST("/api/auth/signup")
    Call<User> doSignup(@Body JsonObject params);

    @POST("/api/auth/logout")
    Call<User> doLogout();

}
