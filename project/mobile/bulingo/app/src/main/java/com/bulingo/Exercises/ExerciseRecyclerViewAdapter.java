package com.bulingo.Exercises;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bulingo.Database.ExerciseItem;
import com.bulingo.R;

import java.util.List;

public class ExerciseRecyclerViewAdapter extends RecyclerView.Adapter<ExerciseRecyclerViewAdapter.ExerciseViewHolder>{
    private List<ExerciseItem> mDataset;
    private OnExerciseClickListener onExerciseClickListener;


    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ExerciseViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public LinearLayout linearLayout;
        public ExerciseViewHolder(LinearLayout l) {
            super(l);
            linearLayout = l;
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public ExerciseRecyclerViewAdapter(List<ExerciseItem> myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public ExerciseRecyclerViewAdapter.ExerciseViewHolder onCreateViewHolder(ViewGroup parent,
                                                                           int viewType) {
        // create a new view
        LinearLayout v = (LinearLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.exercise_name, parent, false);
        ExerciseViewHolder vh = new ExerciseViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ExerciseViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        TextView name = holder.linearLayout.findViewById(R.id.exerciseName);
        TextView level = holder.linearLayout.findViewById(R.id.exerciseLevel);
        name.setText(mDataset.get(position).title);
        level.setText(mDataset.get(position).level);
        holder.linearLayout.setOnClickListener((v) -> {
            if(onExerciseClickListener != null) {
                onExerciseClickListener.onExeriseClick(mDataset.get(position));
            }
        });
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.size();
    }

    public void setOnExerciseClickListener(OnExerciseClickListener onExerciseClickListener) {
        this.onExerciseClickListener = onExerciseClickListener;
    }

    public interface OnExerciseClickListener {
        void onExeriseClick(ExerciseItem exercise);

    }

}

