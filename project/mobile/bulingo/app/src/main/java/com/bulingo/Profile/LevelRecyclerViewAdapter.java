package com.bulingo.Profile;

import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bulingo.Database.Language;
import com.bulingo.R;

import java.util.List;

public class LevelRecyclerViewAdapter extends RecyclerView.Adapter<LevelRecyclerViewAdapter.LevelViewHolder> {
    private List<Language> mDataset;

    // Provide a reference to the views for each data
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class LevelViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public RelativeLayout relativeLayout;
        public LevelViewHolder(RelativeLayout l) {
            super(l);
            relativeLayout = l;
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public LevelRecyclerViewAdapter(List<Language> myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public LevelRecyclerViewAdapter.LevelViewHolder onCreateViewHolder(ViewGroup parent,
                                                                           int viewType) {
        // create a new view
        RelativeLayout v = (RelativeLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.language_level, parent, false);
        LevelViewHolder vh = new LevelViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(LevelViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        TextView languageName = holder.relativeLayout.findViewById(R.id.englishTextView);
        TextView level = holder.relativeLayout.findViewById(R.id.englishLevel);
        languageName.setText(String.format("%s: ", mDataset.get(position).name));
        level.setText(mDataset.get(position).grade);
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.size();
    }
}

