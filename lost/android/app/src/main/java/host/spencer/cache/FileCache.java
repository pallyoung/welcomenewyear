package host.spencer.cache;
import android.content.Context;
import android.os.Environment;
import android.util.Log;

import java.io.File;

import host.spencer.lost.BuildConfig;
import host.spencer.net.DownloadManager;

public class FileCache {
    private String mCacheRoot;
    private final  String MODULE_NAME = "cache";
    private Context mContext;
/*
private DownloadService.Binder serviceBinder;
private ServiceConnection serviceConnection = new ServiceConnection() {
@Override
public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
serviceBinder = (DownloadService.Binder)iBinder;
}

@Override
public void onServiceDisconnected(ComponentName componentName) {
serviceBinder = null;
}
};
private Intent serviceIntent = new Intent("host.spencer.services.DownloadService");
*/
    public FileCache(Context context){
            mContext = context;
            init(Environment.getExternalStorageDirectory().getAbsolutePath()+File.separator+BuildConfig.PACKAGE_NAME + File.separator + MODULE_NAME);
        }
    public FileCache(Context context,String cacheRoot) {
        mContext = context;
        init(cacheRoot);
    }
    private void init(String cacheRoot){
        mCacheRoot = cacheRoot;
        Log.e("ReactNativeJS",cacheRoot);
        FileHelper.mkDir(cacheRoot);
    }
    private String absoluteName(String fName){
        return  mCacheRoot + File.separator + fName;
    }
    private boolean exists(String fName) {
        return FileHelper.exists(absoluteName(fName));
    }
    public boolean cache(String uri,String name) {
        if(exists(name)) {
            return  true;
        } else {
            return download("http://dl.stream.qqmusic.qq.com/C400003mAan70zUy5O.m4a?guid=2554654464&vkey=44C39AD6DEBE04D4395D6A66CD52D64B75540F64889342446088FDE03A09067C2EADDA5BB7A0776881EE90ED4BCD4F17FB6E3F0EE9244DC7&uin=2897&fromtag=3&r=7433611924525518",name);
        }
    }
    private boolean download(String uri,String fName) {
        final String path =  absoluteName(fName);
        Log.e("ReactNativeJS","Download "+ path);
        try {
            final DownloadManager downloadManager =  new DownloadManager(uri,path);
            new Thread(new Runnable() {
                @Override
                public void run() {
                    downloadManager.start();
                }
            }).start();
            return true;
        } catch (Exception exception) {
            return false;
        }

    }
}
