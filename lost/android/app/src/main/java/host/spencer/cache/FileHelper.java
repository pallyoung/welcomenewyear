package host.spencer.cache;

import android.util.Log;

import java.io.File;

public class FileHelper {
    public static void mkDir(String path) {
        Log.e("ReactNativeJS",path+"333333333333333333");
        File file = new File(path);
        Log.e("ReactNativeJS","make dirs");
        if(!file.exists()) {
            file.mkdirs();
            Log.e("ReactNativeJS","make dirs " + path);
        }
    }
    public  static boolean exists(String path) {
        File file = new File(path);
        return file.exists();
    }
}
