package host.spencer.react.modules;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import java.util.HashMap;
import java.util.Map;

import host.spencer.lost.BuildConfig;
import host.spencer.lost.MainActivity;


public class RCTUserAgentManager extends ReactContextBaseJavaModule {
    ReactApplicationContext mReactContext;

    public RCTUserAgentManager(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from javascript.
     */
    @Override
    public String getName() {
        return "UserAgent";
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        PackageManager manager = mReactContext.getPackageManager();
        PackageInfo info = null;
        int version_code;
        String version_name ;
        try {
            info = manager.getPackageInfo(mReactContext.getPackageName(), 0);
            version_name = info.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            version_name = "";
        }

        constants.put("VERSION_NAME",version_name);
        constants.put("ENV", BuildConfig.ENV);
        constants.put("DEVICES",Build.MODEL);
        constants.put("SYS_VERSION", Build.VERSION.RELEASE);
        constants.put("DEVICE_NAME",Build.PRODUCT);
        constants.put("SYS_NAME",Build.VERSION.SDK_INT);
        constants.put("PLATFORM","android");
        return constants;
    }
    @ReactMethod
    public void hideMask() {
        ((MainActivity)getCurrentActivity()).hideMask();
    }
    @ReactMethod
    public void showMask() {
        ((MainActivity)getCurrentActivity()).hideMask();
    }
}
