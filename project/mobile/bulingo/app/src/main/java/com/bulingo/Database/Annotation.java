package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

import retrofit2.SkipCallbackExecutor;

public class Annotation {

    @SerializedName("id")
    public String id;

    @SerializedName("body")
    public Body body;

    @SerializedName("target")
    public Target target;

    public class Body {
        @SerializedName("value")
        public String value;
    }

    public class Target {
        @SerializedName("id")
        public String target_id;

        @SerializedName("type")
        public String type;

        @SerializedName("creator")
        public String creator;

        @SerializedName("selector")
        public Selector selector;
    }

    public class Selector {
        @SerializedName("value")
        public String coordinates;
    }
}
