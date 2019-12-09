package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class SearchResult {

    @SerializedName("username")
    public String username;

    @SerializedName("type")
    public String type;

    @SerializedName("title")
    public String title;
}
