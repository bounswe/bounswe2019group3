package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

import retrofit2.SkipCallbackExecutor;

public class Writing {

    @SerializedName("writing_id")
    public int id;

    @SerializedName("title")
    public String title;

    @SerializedName("text")
    public String text;

    @SerializedName("image")
    public String image;

    @SerializedName("written_by")
    public String writer;

    @SerializedName("assignee")
    public String assignee;
}
