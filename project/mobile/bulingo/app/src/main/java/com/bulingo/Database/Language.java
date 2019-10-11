package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Language {

    @SerializedName("language")
    public List<LanguageInfo> languages;

    class LanguageInfo {
        @SerializedName("name")
        public String name;
        @SerializedName("abbr")
        public String abbr;
    }

}

