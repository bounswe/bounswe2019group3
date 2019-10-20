package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class Comment {

    @SerializedName("text")
    public String text;
    @SerializedName("rating")
    public String rating;
    @SerializedName("comment_by")
    public String comment_by;
    @SerializedName("comment_to")
    public String comment_to;
    @SerializedName("created_at")
    public String created_at;

}
