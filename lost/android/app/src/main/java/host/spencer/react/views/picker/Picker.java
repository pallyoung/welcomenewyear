package host.spencer.react.views.picker;

import android.content.Context;
import android.graphics.Canvas;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import java.util.ArrayList;

import host.spencer.views.wheelview.LoopView;
import host.spencer.views.wheelview.OnItemSelectedListener;

/**
 * Created by Spencer on 16/8/7.
 */
public class Picker extends LinearLayout {
    private LoopView loopView;
    ArrayList<String> items;
    public Picker(Context context) {
        super(context);
        loopView = new LoopView(context);
        loopView.setNotLoop();
        loopView.setTextSize(20);
        LayoutParams params = new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.gravity = Gravity.CENTER;
        addView(loopView,params);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
    }

    public void setItems(ArrayList<String> items){
        loopView.setItems(items);

    }
    public void setSelectedIndex(int index){
        loopView.setInitPosition(index);
    }
    public void setOnItemSelectedListener(OnItemSelectedListener listener){
        loopView.setListener(listener);
    }
}
