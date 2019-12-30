package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class ExerciseItem {

    @SerializedName("exercise_id")
    public int id;

    @SerializedName("lang_abbr")
    public String abbr;

    @SerializedName("type")
    public String type;

    @SerializedName("title")
    public String title;

    @SerializedName("level")
    public String level;

}
