package com.bulingo.Exercises;
import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.ExerciseItem;
import com.bulingo.Database.ExerciseProgress;
import com.bulingo.Database.LanguageProgress;
import com.bulingo.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ExerciseRecyclerViewAdapter extends RecyclerView.Adapter<ExerciseRecyclerViewAdapter.ExerciseViewHolder>{
    private List<ExerciseItem> mDataset;
    private OnExerciseClickListener onExerciseClickListener;
    APIInterface apiInterface;
    private String username;
    Handler handler;
    Context context;

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
    public ExerciseRecyclerViewAdapter(List<ExerciseItem> myDataset, Activity context, String username) {
        apiInterface = APICLient.getClient(context).create(APIInterface.class);
        mDataset = myDataset;
        this.username = username;
        this.context = context;
        handler = new Handler();

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
    //    getProgress(holder, mDataset.get(position).id);
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

    public void getProgress(ExerciseViewHolder holder, int id) {
        Call<ExerciseProgress> responseCall = apiInterface.doGetExerciseProgress(id, this.username);

        responseCall.enqueue(new Callback<ExerciseProgress>() {
            @Override
            public void onResponse(Call<ExerciseProgress> call, Response<ExerciseProgress> response) {
                Log.d("request", response.toString());
                if(response.code() == 200 && response.body() != null) {
                    ExerciseProgress progress = response.body();
                    int percentage;
                    if(progress.done == 0) {
                        percentage = 0;
                    } else {
                        percentage = 100*progress.done/progress.all;
                    }

//                    ((Activity)context).runOnUiThread(() -> {
//                            ProgressBar progressBar = holder.linearLayout.findViewById(R.id.progressBar);
//                            progressBar.setProgress(percentage);
//                    });

                }
            }

            @Override
            public void onFailure(Call<ExerciseProgress> call, Throwable t) {
                Log.d("request", t.toString());
            }

        });
    }

}

