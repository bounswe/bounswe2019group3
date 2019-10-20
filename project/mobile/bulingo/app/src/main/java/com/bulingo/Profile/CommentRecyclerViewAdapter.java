package com.bulingo.Profile;

import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bulingo.Database.Comment;
import com.bulingo.R;

import java.util.List;

public class CommentRecyclerViewAdapter extends RecyclerView.Adapter<CommentRecyclerViewAdapter.CommentViewHolder>{
    private List<Comment> mDataset;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class CommentViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public RelativeLayout relativeLayout;
        public CommentViewHolder(RelativeLayout l) {
            super(l);
            relativeLayout = l;
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public CommentRecyclerViewAdapter(List<Comment> myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public CommentRecyclerViewAdapter.CommentViewHolder onCreateViewHolder(ViewGroup parent,
                                                     int viewType) {
        // create a new view
        RelativeLayout v = (RelativeLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.comment, parent, false);
        CommentViewHolder vh = new CommentViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(CommentViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        TextView commenter = holder.relativeLayout.findViewById(R.id.commenter);
        TextView rating = holder.relativeLayout.findViewById(R.id.comment_rating);
        TextView body = holder.relativeLayout.findViewById(R.id.comment_body);
        TextView date = holder.relativeLayout.findViewById(R.id.comment_date);
        commenter.setText(mDataset.get(position).comment_by);
        rating.setText(String.format("%s/5", mDataset.get(position).rating));
        body.setText(mDataset.get(position).text);
        date.setText(mDataset.get(position).created_at.substring(0,10));
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.size();
    }
}

