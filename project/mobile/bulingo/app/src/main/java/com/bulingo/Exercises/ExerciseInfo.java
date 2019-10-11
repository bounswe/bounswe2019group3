package com.bulingo.Exercises;

import android.os.Parcel;
import android.os.Parcelable;

public class ExerciseInfo implements Parcelable {
    private ExerciseLanguage language;
    private ExerciseType type;
    private int currentQuestionNumber;

    public enum ExerciseLanguage{
        ENGLISH,TURKISH,GERMAN,FRENCH
    }

    public enum ExerciseType{
        LEVELDETERMINATION, PRACTICE
    }

    public ExerciseInfo () {
        this.language = null;
        this.type = null;
        currentQuestionNumber = 1;
    }

    public ExerciseInfo (ExerciseLanguage el) {
        this.language = el;
        this.type = null;
        currentQuestionNumber = 1;
    }

    public ExerciseInfo (ExerciseLanguage el, ExerciseType t) {
        this.language = el;
        this.type = t;
        currentQuestionNumber = 1;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int flags) {
        parcel.writeString(this.language.name());
        parcel.writeString(this.type.name());
        parcel.writeInt(this.currentQuestionNumber);
    }

    public static final Parcelable.Creator<ExerciseInfo> CREATOR = new Parcelable.Creator<ExerciseInfo>() {
        @Override
        public ExerciseInfo createFromParcel(Parcel source) {
            return new ExerciseInfo(source);
        }

        @Override
        public ExerciseInfo[] newArray(int size) {
            return new ExerciseInfo[size];
        }
    };

    private ExerciseInfo(Parcel parcel){
        this.language = ExerciseLanguage.valueOf(parcel.readString());
        this.type = ExerciseType.valueOf(parcel.readString());
        this.currentQuestionNumber = parcel.readInt();
    }

    public ExerciseLanguage getExerciseLanguage(){
        return language;
    }

    public ExerciseType getExerciseType(){
        return type;
    }

    public int getQuestionNumber(){
        return currentQuestionNumber;
    }

    public void setExerciseLanguage(ExerciseLanguage el){
        this.language = el;
    }

    public void setExerciseType(ExerciseType t){
        this.type = t;
    }

    public void incrementQuestionNumber(){
        currentQuestionNumber++;
    }
}