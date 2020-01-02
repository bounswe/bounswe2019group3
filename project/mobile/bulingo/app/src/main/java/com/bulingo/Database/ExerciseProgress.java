package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class ExerciseProgress {

    @SerializedName("question_done")
    public int done;

    @SerializedName("questions")
    public int all;

}
