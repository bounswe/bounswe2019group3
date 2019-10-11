package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Questions {

    @SerializedName("questions")
    public List<Question> questions;

    class Question {
        @SerializedName("id")
        public String id;
        @SerializedName("desc")
        public String desc;
        @SerializedName("choices")
        public List<Choice> choices;

        class Choice {
            @SerializedName("id")
            public String id;
            @SerializedName("desc")
            public String desc;
        }

    }

}
