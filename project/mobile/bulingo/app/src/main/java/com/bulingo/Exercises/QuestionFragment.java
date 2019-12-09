package com.bulingo.Exercises;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bulingo.Database.ExerciseQuestion;
import com.bulingo.Database.ExerciseResult;

import com.bulingo.R;
import com.google.android.material.button.MaterialButton;

import java.util.Objects;

public class QuestionFragment extends Fragment {

    private QuestionFragment.OnClickAnswerListener onClickAnswerListener;
    private static final String ARG_QUESTION = "com.bulingo.Exercises.QuestionFragment.arg_question";
    private static final String ARG_QUESTION_ID = "com.bulingo.Exercises.QuestionFragment.arg_question_id";
    private static final String ARG_ANSWER_1 = "com.bulingo.Exercises.QuestionFragment.arg_answer_1";
    private static final String ARG_ANSWER_2 = "com.bulingo.Exercises.QuestionFragment.arg_answer_2";
    private static final String ARG_ANSWER_3 = "com.bulingo.Exercises.QuestionFragment.arg_answer_3";
    private static final String ARG_ANSWER_4 = "com.bulingo.Exercises.QuestionFragment.arg_answer_4";
    private static final String ARG_ANSWER_ID_1 = "com.bulingo.Exercises.QuestionFragment.arg_answer_id_1";
    private static final String ARG_ANSWER_ID_2 = "com.bulingo.Exercises.QuestionFragment.arg_answer_id_2";
    private static final String ARG_ANSWER_ID_3 = "com.bulingo.Exercises.QuestionFragment.arg_answer_id_3";
    private static final String ARG_ANSWER_ID_4 = "com.bulingo.Exercises.QuestionFragment.arg_answer_id_4";
    private static final String ARG_RIGHT_ANSWER = "com.bulingo.Exercises.QuestionFragment.arg_answer_right";
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
    private int rightAns;
    private int red = 0xff6363;
    private int green = 0x75F096;
    private boolean isPressedOnce;
    private int selection = -1;



    private MaterialButton answer1Button;
    private MaterialButton answer2Button;
    private MaterialButton answer3Button;
    private MaterialButton answer4Button;
    private MaterialButton skipButton;


    public static QuestionFragment newInstance(ExerciseQuestion question, ExerciseResult.Answer answer, int count) {
        Bundle args = new Bundle();
        args.putString(ARG_QUESTION, question.desc);
        args.putInt(ARG_QUESTION_ID, count);
        if(question.choices.size() == 4) {
            args.putString(ARG_ANSWER_1, question.choices.get(0).desc);
            args.putString(ARG_ANSWER_2, question.choices.get(1).desc);
            args.putString(ARG_ANSWER_3, question.choices.get(2).desc);
            args.putInt(ARG_ANSWER_ID_1, question.choices.get(0).id);
            args.putInt(ARG_ANSWER_ID_2, question.choices.get(1).id);
            args.putInt(ARG_ANSWER_ID_3, question.choices.get(2).id);
            args.putString(ARG_ANSWER_4, question.choices.get(3).desc);
            args.putInt(ARG_ANSWER_ID_4, question.choices.get(3).id);
            args.putInt(ARG_RIGHT_ANSWER, answer.choiceId);
        }

        QuestionFragment frag = new QuestionFragment();
        frag.setArguments(args);
        return frag;
    }

    public QuestionFragment() {
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
            rightAns = args.getInt(ARG_RIGHT_ANSWER);
        }

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.question_fragment, container, false);

        ((TextView) v.findViewById(R.id.questionNumber)).setText(String.valueOf(question_id));
        ((TextView) v.findViewById(R.id.question)).setText(question);

        answer1Button = v.findViewById(R.id.answer1);
        answer2Button = v.findViewById(R.id.answer2);
        answer3Button = v.findViewById(R.id.answer3);
        answer4Button = v.findViewById(R.id.answer4);
        skipButton = v.findViewById(R.id.skip);

        answer1Button.setText(ans1);
        answer2Button.setText(ans2);
        answer3Button.setText(ans3);
        answer4Button.setText(ans4);

        MaterialButton rightAnswer;

        if(ansId1 == rightAns) {
            rightAnswer = answer1Button;
        } else if (ansId2 == rightAns) {
            rightAnswer = answer2Button;
        } else if (ansId3 == rightAns) {
            rightAnswer = answer3Button;
        } else {
            rightAnswer = answer4Button;
        }

        answer1Button.setOnClickListener((v1) -> {
            if(!isPressedOnce) {
                if (this.onClickAnswerListener != null) {
                    rightAnswer.setBackgroundTintList(getResources().getColorStateList(R.color.colorGreen));
                    if (ansId1 != rightAns) {
                        answer1Button.setBackgroundTintList(getResources().getColorStateList(R.color.colorRed));
                    }
                    isPressedOnce = true;
                    selection = ansId1;
                }
            }
        });
        answer2Button.setOnClickListener((v1) -> {
            if(!isPressedOnce) {
                if (this.onClickAnswerListener != null) {
                    rightAnswer.setBackgroundTintList(getResources().getColorStateList(R.color.colorGreen));
                    if (ansId2 != rightAns) {
                        answer2Button.setBackgroundTintList(getResources().getColorStateList(R.color.colorRed));
                    }
                    isPressedOnce = true;
                    selection = ansId2;
                }
            }
        });
        answer3Button.setOnClickListener((v1) -> {
            if(!isPressedOnce) {
                if (this.onClickAnswerListener != null) {
                    rightAnswer.setBackgroundTintList(getResources().getColorStateList(R.color.colorGreen));
                    if (ansId3 != rightAns) {
                        answer3Button.setBackgroundTintList(getResources().getColorStateList(R.color.colorRed));
                    }
                    isPressedOnce = true;
                    selection = ansId3;
                }
            }
        });
        answer4Button.setOnClickListener((v1) -> {
            if(!isPressedOnce) {
                if (this.onClickAnswerListener != null) {
                    rightAnswer.setBackgroundTintList(getResources().getColorStateList(R.color.colorGreen));
                    if (ansId4 != rightAns) {
                        answer4Button.setBackgroundTintList(getResources().getColorStateList(R.color.colorRed));
                    }
                    isPressedOnce = true;
                    selection = ansId4;
                }
            }
        });
        skipButton.setOnClickListener((v1 -> {
            if(!isPressedOnce) {
                if (this.onClickAnswerListener != null) {
                    rightAnswer.setBackgroundTintList(getResources().getColorStateList(R.color.colorGreen));
                }
                isPressedOnce = true;
            } else {
                if (this.onClickAnswerListener != null) {
                    this.onClickAnswerListener.onClickAnswer(selection);
                }
            }
        }));

        return v;
    }

    public void setOnClickAnswerListener(QuestionFragment.OnClickAnswerListener onClickAnswerListener) {
        this.onClickAnswerListener = onClickAnswerListener;
    }

    public interface OnClickAnswerListener {
        void onClickAnswer(int answerId);

    }
}
