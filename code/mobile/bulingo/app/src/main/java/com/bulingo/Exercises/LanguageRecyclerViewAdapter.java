package com.bulingo.Exercises;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.recyclerview.widget.RecyclerView;

import com.bulingo.Database.Language;
import com.bulingo.R;
import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;

public class LanguageRecyclerViewAdapter extends RecyclerView.Adapter<LanguageRecyclerViewAdapter.ButtonViewHolder> {
    private ArrayList<Language> mDataset;
    private OnLanguageClickListener onLanguageClickListener;

    public static class ButtonViewHolder extends RecyclerView.ViewHolder {
        public View buttonView;
        MaterialButton button;
        public LinearLayout linearLayout;
        public ButtonViewHolder(LinearLayout l) {
            super(l);
            linearLayout = l;
        //    buttonView = v;
        //    button = v.findViewById(R.id.language);
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public LanguageRecyclerViewAdapter(ArrayList<Language> myDataset)  {
        mDataset = myDataset;
    }



    // Create new views (invoked by the layout manager)
    @Override
    public LanguageRecyclerViewAdapter.ButtonViewHolder onCreateViewHolder(ViewGroup parent,
                                                     int viewType) {
        // create a new view
        LinearLayout v = (LinearLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.language_button, parent, false);
        ButtonViewHolder vh = new ButtonViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ButtonViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        Language lang = mDataset.get(position);
        MaterialButton button = holder.linearLayout.findViewById(R.id.language);
        button.setText(lang.name);
        button.setOnClickListener((v) -> {
            if(onLanguageClickListener != null) {
                onLanguageClickListener.onLanguageClick(lang);
            }
        });

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.size();
    }

    public void setOnLanguageClickListener(OnLanguageClickListener onLanguageClickListener) {
        this.onLanguageClickListener = onLanguageClickListener;
    }

    public interface OnLanguageClickListener {
        void onLanguageClick(Language language);

    }

}
