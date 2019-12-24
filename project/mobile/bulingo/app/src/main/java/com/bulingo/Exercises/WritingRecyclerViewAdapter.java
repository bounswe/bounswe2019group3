package com.bulingo.Exercises;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Writing;
import com.bulingo.R;

import java.util.List;

public class WritingRecyclerViewAdapter extends RecyclerView.Adapter<WritingRecyclerViewAdapter.WritingViewHolder>{

    private List<Writing> mDataset;
    private Context context;
    APIInterface apiInterface;
    boolean isSent = false;



    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class WritingViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public LinearLayout linearLayout;
        public WritingViewHolder(LinearLayout l) {
            super(l);
            linearLayout = l;
        }

    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public WritingRecyclerViewAdapter(List<Writing> myDataset, Context context, boolean isSent) {
        this.context = context;
        mDataset = myDataset;
        apiInterface = APICLient.getClient(context).create(APIInterface.class);
        this.isSent = isSent;

    }

    // Create new views (invoked by the layout manager)
    @Override
    public com.bulingo.Exercises.WritingRecyclerViewAdapter.WritingViewHolder onCreateViewHolder(ViewGroup parent,
                                                                                                 int viewType) {
        // create a new view
        LinearLayout v = (LinearLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.writing, parent, false);
        com.bulingo.Exercises.WritingRecyclerViewAdapter.WritingViewHolder vh = new com.bulingo.Exercises.WritingRecyclerViewAdapter.WritingViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(com.bulingo.Exercises.WritingRecyclerViewAdapter.WritingViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        holder.setIsRecyclable(false);
        TextView where = holder.linearLayout.findViewById(R.id.whereStatic);
        TextView username = holder.linearLayout.findViewById(R.id.writingFrom);
        TextView title = holder.linearLayout.findViewById(R.id.writingText);
        if(isSent) {
            where.setText("To:");
            username.setText(mDataset.get(position).assignee);
            title.setText(mDataset.get(position).title);
        } else {
            where.setText("From: ");
            username.setText(mDataset.get(position).writer);
            title.setText(mDataset.get(position).title);
        }
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.size();
    }

    @Override
    public int getItemViewType(int position) {
        return position;
    }



}
