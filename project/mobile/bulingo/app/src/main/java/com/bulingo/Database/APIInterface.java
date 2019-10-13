package com.bulingo.Database;

import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface APIInterface {

    @Headers("Content-Type: application/json")
    @POST("/api/auth/login")
     Call<User> doLogin(@Body JsonObject params);

    @Headers("Content-Type: application/json")
    @POST("/api/auth/signup")
    Call<Void> doSignup(@Body JsonObject params);

    @POST("/api/auth/logout")
    Call<Void> doLogout();

    @POST("/api/languague/{language_abbr}/excercise/excercise_type/{exersice_id}/questions")
    Call<Void> doEvaluateExercise(@Path("language_abbr") String abbr, @Path("exercise_id") int id);

    @POST("/api/languague/{language_abbr}/exam/evaluate")
    Call<Grade> doEvaluateExam(@Path("language_abbr") String abbr, @Body JsonObject params);

    @GET("/api/languague/{language_abbr}/excercise/excercise_type/")
    Call<Void> doGetExercises(@Path("language_abbr") String abbr);

    @GET("/api/languague/{language_abbr}/excercise/excercise_type/{exersice_id}/questions")
    Call<Void> doGetExercise(@Path("language_abbr") String abbr, @Path("exercise_id") int id);

    @GET("/api/languague/")
    Call<Language> doGetExercises();

    @GET("/api/languague/{language_abbr}/exam/questions")
    Call<Questions> doGetExamQuestions();


}
