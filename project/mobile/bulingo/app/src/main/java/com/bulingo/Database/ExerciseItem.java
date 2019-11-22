package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class ExerciseItem {

    @SerializedName("exercise_id")
    public int id;

    @SerializedName("lang_abbr")
    public String abbr;

    @SerializedName("exercise_type")
    public String type;

    @SerializedName("level")
    public String level;

}
