package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class ExerciseQuestion {

    @SerializedName("question_id")
    public String id;

    @SerializedName("desc")
    public String desc;

    @SerializedName("media_url")
    public String media_url;

    @SerializedName("media_start_time")
    public String media_start_type;

    @SerializedName("media_end_time")
    public String media_end_time;

    @SerializedName("choices")
    public List<Choice> choices;

    public class Choice {
        @SerializedName("id")
        public int id;
        @SerializedName("desc")
        public String desc;
    }


}
