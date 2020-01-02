package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class SearchResult {

    @SerializedName("username")
    public String username;

    @SerializedName("type")
    public String type;

    @SerializedName("title")
    public String title;

    @SerializedName("exercise_id")
    public int exercise_id;

    @SerializedName("lang_abbr")
    public String abbr;

    @SerializedName("exercise_type")
    public String exercise_type;
}
