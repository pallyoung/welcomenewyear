package host.spencer.react.modules;

import android.content.Context;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import host.spencer.cache.FileCache;


public class RCTMusicManager extends ReactContextBaseJavaModule {
    private Context mContext;
    private FileCache fileCache;
    public RCTMusicManager(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        fileCache = new FileCache(reactContext);
    }

    @Override
    public String getName() {
        return "MusicManager";
    }
    @ReactMethod
    public void download(final String url,final String name) {
        fileCache.cache(url,name);
    }
    public void cache() {

    }
}
