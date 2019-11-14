package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Chat {
    @SerializedName("history")
    public List<History> history;

    public class History {
        @SerializedName("username")
        public String username;
        @SerializedName("last_message")
        public String last;
        @SerializedName("nb_new_messages")
        public int newMessages;
        @SerializedName("last_message_date")
        public String date;

        public String imagePath;
    }
}
