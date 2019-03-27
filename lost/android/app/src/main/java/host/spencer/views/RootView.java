package host.spencer.views;

import android.content.Context;
import android.graphics.Canvas;
import android.os.Bundle;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;

import javax.annotation.Nullable;

import host.spencer.lost.R;

public class RootView extends View {
    private ReactView mReactView;
    public RootView(Context context) {
        super(context);
        mReactView = new ReactView(context);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
//        ImageView imageView = new ImageView(getContext());
//        imageView.setLayoutParams(new ViewGroup.LayoutParams(getWidth(),getHeight()));
//        imageView.setImageResource(R.mipmap.ic_launcher);
//        addView(imageView);
    }

}
