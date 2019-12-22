package com.bulingo.Database;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
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

    @GET("/api/search")
    Call<List<SearchResult>> doSearchExercise(@Query("text") String text, @Query("type") String type, @Query("lang_abbr") String abbr, @Query("level") String level, @Query("exercise_type") String exercise);

    @POST("/api/user/{username}/comments/")
    Call<Void> doAddComment(@Path("username") String username, @Body JsonObject params);

    @Multipart
    @POST("/api/user/{username}")
    Call<Void> doUpdateProfile(@Path("username") String username, @Part("bio") RequestBody bio, @Part MultipartBody.Part file);

    @GET("/api/language/{abbr}/exercise")
    Call<List<ExerciseItem>> doGetExercisesOfType(@Path("abbr") String abbr, @Query("exercise_type") String type, @Query("level") String level);

    @GET("/api/language/{abbr}/exercise/{id}/questions")
    Call<List<ExerciseQuestion>> doGetQuestionsOfExercise(@Path("abbr") String abbr, @Path("id") String id);

    @POST("/api/language/{abbr}/exercise/{id}/evaluate")
    Call<ExerciseResult> doGetAnswersOfExercise(@Path("abbr") String abbr, @Path("id") String id, @Body JsonArray params);

    @GET("/api/user/{username}/language/{abbr}/progress")
    Call<LanguageProgress> doGetLanguageProgress(@Path("abbr") String abbr, @Path("username") String username);

    @GET("/api/user/{username}/exercise/{id}/progress")
    Call<ExerciseProgress> doGetExerciseProgress(@Path("id") int id, @Path("username") String username);

    @POST("/api/user/{username}/writing")
    Call<Void> doPostWriting(@Path("username") String username, @Body JsonObject params);

    @GET("/api/writing")
    Call<List<Writing>> doGetSentWriting(@Query("written_by") String username);

    @GET("/api/writing")
    Call<List<Writing>> doGetReceivedWriting(@Query("assignee") String username);


}
