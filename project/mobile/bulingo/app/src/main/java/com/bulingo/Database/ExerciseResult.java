package com.bulingo.Database;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class ExerciseResult {

    @SerializedName("nb_correct_answers")
    public int correct;

    @SerializedName("nb_questions")
    public int numberOfQuestions;

    @SerializedName("answers")
    public List<Answer> answers;

    public class Answer {
        @SerializedName("question_id")
        public int questionId;
        @SerializedName("choice_id")
        public int choiceId;
    }
}
