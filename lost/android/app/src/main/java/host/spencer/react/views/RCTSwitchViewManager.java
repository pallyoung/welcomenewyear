package host.spencer.react.views;

import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import host.spencer.views.switchView.Switch;


/**
 * Created by Spencer on 16/8/6.
 */
public class RCTSwitchViewManager extends SimpleViewManager<Switch> {
    private ThemedReactContext reactContext;
    private Switch switchButton;
    /**
     * @return the name of this view manager. This will be the name used to reference this view
     * manager from JavaScript in createReactNativeComponentClass.
     */
    @Override
    public String getName() {
        return "RCTSwitchAndroid";
    }

    /**
     * Subclasses should return a new View instance of the proper type.
     *
     * @param reactContext
     */
    @Override
    protected Switch createViewInstance(ThemedReactContext reactContext) {
        switchButton = new Switch(reactContext);
        this.reactContext = reactContext;
        switchButton.setOnStateChangedListener(new Switch.OnStateChangedListener() {
            @Override
            public void toggleToOn(View view) {
                WritableMap event = Arguments.createMap();
                event.putBoolean("value", true);
                ReactContext context = (ReactContext)view.getContext();
                context.getJSModule(RCTEventEmitter.class).receiveEvent(
                        view.getId(),
                        "topChange",
                        event);
            }

            @Override
            public void toggleToOff(View view) {
                WritableMap event = Arguments.createMap();
                event.putBoolean("value", false);
                ReactContext context = (ReactContext)view.getContext();
                context.getJSModule(RCTEventEmitter.class).receiveEvent(
                        view.getId(),
                        "topChange",
                        event);
            }
        });
        return switchButton;
    }
    @ReactProp(name = "value")
    public void setValue(Switch view,boolean value){
        view.setValue(value);
    }
    @ReactProp(name = "disabled",defaultBoolean = false)
    public void setDisabled(Switch view,boolean disabled){
        view.setDisabled(disabled);
    }
    @ReactProp(name = "tintColor")
    public void setTintColor(Switch view,String tintColor){
        view.setTintColor(tintColor);
    }
    @ReactProp(name = "onTintColor")
    public void setOnTintColor(Switch view,String onTintColor){
        view.setOnTintColor(onTintColor);
    }
    @ReactProp(name = "thumbTintColor")
    public void setThumbTintColor(Switch view,String thumbTintColor){
        view.setThumbTintColor(thumbTintColor);
    }
}
