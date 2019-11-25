package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class Message {

    @SerializedName("to_username")
    public String receiver;

    @SerializedName("from_username")
    public String sender;

    @SerializedName("message")
    public String body;

    @SerializedName("new")
    public boolean isNew;

    public Message(String message, String sender) {
        this.body = message;
        this.sender = sender;
    }
}
