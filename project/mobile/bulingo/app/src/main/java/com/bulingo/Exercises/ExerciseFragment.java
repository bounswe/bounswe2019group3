package com.bulingo.Exercises;


import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.bulingo.Database.Question;
import com.bulingo.R;

/**
 * A simple {@link Fragment} subclass.
 */
public class ExerciseFragment extends Fragment {

    private static final String ARG_QUESTION = "com.bulingo.Exercises.ExerciseFragment.arg_question";
    private static final String ARG_QUESTION_ID = "com.bulingo.Exercises.ExerciseFragment.arg_question_id";
    private static final String ARG_ANSWER_1 = "com.bulingo.Exercises.ExerciseFragment.arg_answer_1";
    private static final String ARG_ANSWER_2 = "com.bulingo.Exercises.ExerciseFragment.arg_answer_2";
    private static final String ARG_ANSWER_3 = "com.bulingo.Exercises.ExerciseFragment.arg_answer_3";
    private static final String ARG_ANSWER_4 = "com.bulingo.Exercises.ExerciseFragment.arg_answer_4";
    private static final String ARG_ANSWER_ID_1 = "com.bulingo.Exercises.ExerciseFragment.arg_answer_id_1";
    private static final String ARG_ANSWER_ID_2 = "com.bulingo.Exercises.ExerciseFragment.arg_answer_id_2";
    private static final String ARG_ANSWER_ID_3 = "com.bulingo.Exercises.ExerciseFragment.arg_answer_id_3";
    private static final String ARG_ANSWER_ID_4 = "com.bulingo.Exercises.ExerciseFragment.arg_answer_id_4";
    private String question;
    private int question_id;
    private String ans1;
    private String ans2;
    private String ans3;
    private String ans4;
    private int ansId1;
    private int ansId2;
    private int ansId3;
    private int ansId4;




    public static ExerciseFragment newInstance(Question question) {
        Bundle args = new Bundle();
        args.putString(ARG_QUESTION, question.desc);
        args.putInt(ARG_QUESTION_ID, question.id);
        if(question.choices.size() == 3) {
            args.putString(ARG_ANSWER_1, question.choices.get(0).desc);
            args.putString(ARG_ANSWER_2, question.choices.get(1).desc);
            args.putString(ARG_ANSWER_3, question.choices.get(2).desc);
            args.putInt(ARG_ANSWER_ID_1, question.choices.get(0).id);
            args.putInt(ARG_ANSWER_ID_2, question.choices.get(1).id);
            args.putInt(ARG_ANSWER_ID_3, question.choices.get(2).id);
        }
        args.putString(ARG_ANSWER_4, "empty");
        args.putInt(ARG_ANSWER_ID_4, -1);
        ExerciseFragment frag = new ExerciseFragment();
        frag.setArguments(args);
        return frag;
    }

    public ExerciseFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Bundle args = getArguments();
        if(args != null) {
            question = args.getString(ARG_QUESTION);
            question_id = args.getInt(ARG_QUESTION_ID);
            ans1 = args.getString(ARG_ANSWER_1);
            ans2 = args.getString(ARG_ANSWER_2);
            ans3 = args.getString(ARG_ANSWER_3);
            ans4 = args.getString(ARG_ANSWER_4);
            ansId1 = args.getInt(ARG_ANSWER_ID_1);
            ansId2 = args.getInt(ARG_ANSWER_ID_2);
            ansId3 = args.getInt(ARG_ANSWER_ID_3);
            ansId4 = args.getInt(ARG_ANSWER_ID_4);
        }

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_exercise, container, false);

        ((TextView) v.findViewById(R.id.questionNumber)).setText(String.valueOf(question_id));
        ((TextView) v.findViewById(R.id.question)).setText(question);
        ((TextView) v.findViewById(R.id.answer1)).setText(ans1);
        ((TextView) v.findViewById(R.id.answer2)).setText(ans2);
        ((TextView) v.findViewById(R.id.answer3)).setText(ans3);
        ((TextView) v.findViewById(R.id.answer4)).setText(ans4);

        return v;
    }

}
