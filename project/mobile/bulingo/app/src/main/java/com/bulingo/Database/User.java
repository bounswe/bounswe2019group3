package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

public class User {

    @SerializedName("username")
    public String username;
    @SerializedName("email")
    public String email;
    @SerializedName("role")
    public String role;

}
