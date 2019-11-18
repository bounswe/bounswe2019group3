package com.bulingo.Database;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface APIInterface {

    @Headers("Content-Type: application/json")
    @POST("/api/auth/login")
     Call<User> doLogin(@Body JsonObject params);

    @Headers("Content-Type: application/json")
    @POST("/api/auth/signup")
    Call<Void> doSignup(@Body JsonObject params);

    @POST("/api/auth/logout")
    Call<Void> doLogout();

    @POST("/api/language/{language_abbr}/excercise/excercise_type/{exersice_id}/questions")
    Call<Void> doEvaluateExercise(@Path("language_abbr") String abbr, @Path("exercise_id") int id);

    @POST("/api/language/{language_abbr}/exam/evaluate")
    Call<Grade> doEvaluateExam(@Path("language_abbr") String abbr, @Body JsonArray params);

    @GET("/api/language/{language_abbr}/excercise/excercise_type/")
    Call<Void> doGetExercises(@Path("language_abbr") String abbr);

    @GET("/api/language/{language_abbr}/excercise/excercise_type/{exersice_id}/questions")
    Call<Void> doGetExercise(@Path("language_abbr") String abbr, @Path("exercise_id") int id);

    @GET("/api/language/")
    Call<List<Language>> doGetLanguages();

    @GET("/api/language/{language_abbr}/exam/questions")
    Call<List<Question>> doGetExamQuestions(@Path("language_abbr") String abbr);

    @GET("/api/user/{username}/")
    Call<User> doGetUserDetails(@Path("username") String username);

    @GET("/api/user/{username}/language/level/")
    Call<List<Language>> doGetUserLevels(@Path("username") String username);

    @GET("/api/user/{username}/comments/")
    Call<List<Comment>> doGetUserComments(@Path("username") String username);

    @GET("/api/chat/{username}/")
    Call<List<Message>> doGetMessages(@Path("username") String username, @Query("skip") String skip, @Query("limit") String limit);

    @POST("/api/chat/{username}/")
    Call<Void> doSendMessage(@Path("username") String username, @Body JsonObject params);

    @GET("/api/chat/")
    Call<Chat> doGetChats();

    @GET("/api/search")
    Call<List<SearchResult>> doSearch(@Query("text") String text, @Query("type") String type);


}
