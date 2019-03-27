package host.spencer.lost;

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import host.spencer.views.ReactView;
public class MainActivity extends ReactActivity {
    private ImageView imageView;
    public void showMask(){
        if( View.VISIBLE == imageView.getVisibility() ) {
            return;
        }
        imageView.post(new Runnable() {
            @Override
            public void run() {
                imageView.setVisibility(View.VISIBLE);
            }
        });
    }
    public void hideMask() {
        if( View.INVISIBLE == imageView.getVisibility() ) {
            return;
        }
        imageView.post(new Runnable() {
            @Override
            public void run() {
                imageView.setVisibility(View.INVISIBLE);
            }
        });
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if(imageView == null) {
            initImageView();
        }
        addContentView(imageView,new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "lost";
    }
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new ReactView(MainActivity.this);
            }
        };
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
    private  void initImageView() {
        imageView = new ImageView(this);
        imageView.setImageResource(R.mipmap.bg);
        imageView.setScaleType(ImageView.ScaleType.FIT_XY);
    }
}
