package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class RecommendationResult {

    @SerializedName("username")
    public String username;

    @SerializedName("rating")
    public String rating;

    @SerializedName("grade")
    public String grade;

}
