package host.spencer.react.views.picker;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import host.spencer.views.wheelview.OnItemSelectedListener;


import java.util.ArrayList;

/**
 * Created by Spencer on 16/8/7.
 */
public class RCTPickerViewManager extends SimpleViewManager<Picker> {

    /**
     * @return the name of this view manager. This will be the name used to reference this view
     * manager from JavaScript in createReactNativeComponentClass.
     */
    @Override
    public String getName() {
        return "RCTIPickerAndroid";
    }

    /**
     * Subclasses should return a new View instance of the proper type.
     *
     * @param reactContext
     */
    @Override
    protected Picker createViewInstance(final ThemedReactContext reactContext) {

        final Picker picker = new Picker(reactContext);
        picker.setOnItemSelectedListener(new OnItemSelectedListener() {
            @Override
            public void onItemSelected(int index) {
                WritableMap event = Arguments.createMap();
                event.putInt("index", index);
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        picker.getId(),
                        "topChange",
                        event);
            }
        });
        return picker;
    }
    
    @ReactProp(name = "selectedIndex")
    public void setSelectedIndex(Picker view, int selectedIndex) {
        view.setSelectedIndex(selectedIndex);
    }

    @ReactProp(name = "items")
    public void setItems(Picker view, ReadableArray items) {
        ArrayList<String> list = new ArrayList();
        int size = items.size();
        for (int i = 0; i < size; i++) {
            list.add(items.getString(i));
        }
        view.setItems(list);
    }
}
