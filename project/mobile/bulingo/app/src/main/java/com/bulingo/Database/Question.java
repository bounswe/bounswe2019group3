package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Question {

        @SerializedName("id")
        public int id;
        @SerializedName("desc")
        public String desc;
        @SerializedName("choices")
        public List<Choice> choices;

        public class Choice {
            @SerializedName("id")
            public int id;
            @SerializedName("desc")
            public String desc;
        }


}
