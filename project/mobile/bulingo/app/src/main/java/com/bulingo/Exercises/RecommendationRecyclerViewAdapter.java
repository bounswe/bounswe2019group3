package com.bulingo.Exercises;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Database.RecommendationResult;
import com.bulingo.Database.User;
import com.bulingo.R;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import java.util.List;

import jp.wasabeef.glide.transformations.CropCircleTransformation;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class RecommendationRecyclerViewAdapter extends RecyclerView.Adapter<RecommendationRecyclerViewAdapter.RecommendationViewHolder>{

    private List<RecommendationResult> mDataset;
    private Context context;
    APIInterface apiInterface;


    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class RecommendationViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public LinearLayout linearLayout;
        public RecommendationViewHolder(LinearLayout l) {
            super(l);
            linearLayout = l;
        }

    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public RecommendationRecyclerViewAdapter(List<RecommendationResult> myDataset, Context context) {
        this.context = context;
        mDataset = myDataset;
        apiInterface = APICLient.getClient(context).create(APIInterface.class);


    }

    // Create new views (invoked by the layout manager)
    @Override
    public com.bulingo.Exercises.RecommendationRecyclerViewAdapter.RecommendationViewHolder onCreateViewHolder(ViewGroup parent,
                                                                                            int viewType) {
        // create a new view
        LinearLayout v = (LinearLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.recommendation, parent, false);
        com.bulingo.Exercises.RecommendationRecyclerViewAdapter.RecommendationViewHolder vh = new com.bulingo.Exercises.RecommendationRecyclerViewAdapter.RecommendationViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(com.bulingo.Exercises.RecommendationRecyclerViewAdapter.RecommendationViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        holder.setIsRecyclable(false);
        TextView name = holder.linearLayout.findViewById(R.id.name);
        ImageView image = holder.linearLayout.findViewById(R.id.imageView);
        TextView rating = holder.linearLayout.findViewById(R.id.rating);
        TextView level = holder.linearLayout.findViewById(R.id.level);
        if(mDataset.get(position).username != null){
            RecommendationResult r = mDataset.get(position);
            name.setText(r.username);
            level.setText(r.grade);
            getDetails(r.username, image, rating);
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

    private void getDetails(String username, ImageView imageView, TextView rating) {

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
                            .skipMemoryCache(true)
                            .diskCacheStrategy(DiskCacheStrategy.NONE)
                            .bitmapTransform(new CropCircleTransformation(context))
                            .into(imageView);
                    rating.setText(String.format("%s / 5", u.rating));
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
            }

        });
    }

}
