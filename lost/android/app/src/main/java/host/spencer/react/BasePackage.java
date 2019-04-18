package host.spencer.react;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import host.spencer.react.modules.RCTMusicManager;
import host.spencer.react.modules.RCTUserAgentManager;
import host.spencer.react.views.RCTSwitchViewManager;
import host.spencer.react.views.picker.RCTPickerViewManager;

import java.util.Arrays;
import java.util.List;

public class BasePackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new RCTUserAgentManager(reactContext),new RCTMusicManager(reactContext));
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new RCTPickerViewManager(),
                new RCTSwitchViewManager()
                );
    }
}
