package com.bulingo.Chat;

import android.graphics.Color;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.ColorInt;
import androidx.recyclerview.widget.RecyclerView;
import com.bulingo.Database.Message;
import com.bulingo.R;

import java.util.List;

public class MessageRecyclerViewAdapter extends RecyclerView.Adapter<MessageRecyclerViewAdapter.MessageViewHolder>{

        private List<Message> mDataset;
        private String username;

        // Provide a reference to the views for each data item
        // Complex data items may need more than one view per item, and
        // you provide access to all the views for a data item in a view holder
        public static class MessageViewHolder extends RecyclerView.ViewHolder {
            // each data item is just a string in this case
            public LinearLayout linearLayout;
            public MessageViewHolder(LinearLayout l) {
                super(l);
                linearLayout = l;
            }
        }

        // Provide a suitable constructor (depends on the kind of dataset)
        public MessageRecyclerViewAdapter(List<Message> myDataset, String username) {
            mDataset = myDataset;
            this.username = username;

        }

        // Create new views (invoked by the layout manager)
        @Override
        public com.bulingo.Chat.MessageRecyclerViewAdapter.MessageViewHolder onCreateViewHolder(ViewGroup parent,
                                                                                                   int viewType) {
            // create a new view
            LinearLayout v = (LinearLayout) LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.message, parent, false);
            com.bulingo.Chat.MessageRecyclerViewAdapter.MessageViewHolder vh = new com.bulingo.Chat.MessageRecyclerViewAdapter.MessageViewHolder(v);
            return vh;
        }

        // Replace the contents of a view (invoked by the layout manager)
        @Override
        public void onBindViewHolder(com.bulingo.Chat.MessageRecyclerViewAdapter.MessageViewHolder holder, int position) {
            // - get element from your dataset at this position
            // - replace the contents of the view with that element
            TextView message = holder.linearLayout.findViewById(R.id.message_body);
            Message m = mDataset.get(position);
            message.setText(mDataset.get(position).body);
            if(m.sender.equals(username)) {
                LinearLayout.LayoutParams params = new LinearLayout.LayoutParams
                        (LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                params.weight = 1.0f;
                params.gravity = Gravity.RIGHT;
                message.setLayoutParams(params);
                message.setBackgroundResource(R.drawable.message_sender_layout);
                message.setTextColor(Color.parseColor("#000000"));
            }


        }

        // Return the size of your dataset (invoked by the layout manager)
        @Override
        public int getItemCount() {
            return mDataset.size();
        }
}
