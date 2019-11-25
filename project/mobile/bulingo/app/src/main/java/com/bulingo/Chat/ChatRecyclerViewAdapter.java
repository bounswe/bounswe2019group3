package com.bulingo.Chat;

import android.content.Context;
import android.graphics.Color;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.ColorInt;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.Chat;
import com.bulingo.Database.User;
import com.bulingo.R;
import com.bumptech.glide.Glide;

import java.util.List;

import jp.wasabeef.glide.transformations.CropCircleTransformation;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class ChatRecyclerViewAdapter extends RecyclerView.Adapter<ChatRecyclerViewAdapter.ChatViewHolder>{

    private List<Chat.History> mDataset;
    private Context context;
    private String username;
    APIInterface apiInterface;


    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ChatViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public LinearLayout linearLayout;
        public ChatViewHolder(LinearLayout l) {
            super(l);
            linearLayout = l;
        }

    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public ChatRecyclerViewAdapter(List<Chat.History> myDataset, Context context) {
        this.context = context;
        mDataset = myDataset;
        apiInterface = APICLient.getClient(context).create(APIInterface.class);


    }

    // Create new views (invoked by the layout manager)
    @Override
    public com.bulingo.Chat.ChatRecyclerViewAdapter.ChatViewHolder onCreateViewHolder(ViewGroup parent,
                                                                                            int viewType) {
        // create a new view
        LinearLayout v = (LinearLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.chat, parent, false);
        com.bulingo.Chat.ChatRecyclerViewAdapter.ChatViewHolder vh = new com.bulingo.Chat.ChatRecyclerViewAdapter.ChatViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(com.bulingo.Chat.ChatRecyclerViewAdapter.ChatViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        holder.setIsRecyclable(false);
        TextView from = holder.linearLayout.findViewById(R.id.messageFrom);
        TextView newMessage = holder.linearLayout.findViewById(R.id.messageText);
        TextView number = holder.linearLayout.findViewById(R.id.newMessages);
        ImageView image = holder.linearLayout.findViewById(R.id.imageView);
        Chat.History c = mDataset.get(position);
        from.setText(c.username);
        newMessage.setText(c.last);
        if(c.newMessages == 0){
            number.setVisibility(View.INVISIBLE);
        } else {
            number.setText(String.valueOf(c.newMessages));
        }
        getDetails(c.username, image);
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

    private void getDetails(String username, ImageView imageView) {

        Call<User> responseCall = apiInterface.doGetUserDetails(username);

        responseCall.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.code() == 200) {
                    User u = response.body();
                    String imagePath = u.avatar;
                    if(!imagePath.substring(0,5).contains("http")){
                        imagePath = "http://18.184.207.248/" + imagePath;
                    }
                    Glide.with(context)
                            .load(imagePath)
                            .bitmapTransform(new CropCircleTransformation(context))
                            .into(imageView);
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
            }

        });
    }

}
