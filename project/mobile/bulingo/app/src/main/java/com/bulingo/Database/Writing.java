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

    @SerializedName("written_by")
    public String writer;

    @SerializedName("assignee")
    public String assignee;
}
