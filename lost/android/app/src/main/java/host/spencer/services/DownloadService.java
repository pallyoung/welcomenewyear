package host.spencer.services;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.support.annotation.Nullable;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;

import host.spencer.net.DownloadManager;

public class DownloadService extends Service {
    private Binder mBinder;

    @Override
    public void onCreate() {
        super.onCreate();
        mBinder = new Binder();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mBinder.destory();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }
    class DownloadEntity {
        String url;
        String path;
        DownloadEntity(String u,String p) {
            url = u;
            path = p;
        }
    }
    public class Binder extends android.os.Binder{
        private ArrayList<DownloadEntity> downloadQueue = new ArrayList<DownloadEntity>();
        private DownloadEntity currentDownloadEntity;
        private boolean isRunning = false;
        public Binder() {

        }
        public void startDownload(String url,String path) {
            pushToDownloadQueue(url,path);
        }
        public void destory() {
            if(isRunning) {

            }
        }
        private void clearFile(String fName) {
            File file = new File(fName);
            if (file.isFile()) {
                deleteFile(fName);
            }
        }
        private void pushToDownloadQueue(String url,String path) {
            DownloadEntity  downloadEntity =  new DownloadEntity(url,path);
            if(currentDownloadEntity==null) {
                currentDownloadEntity = downloadEntity;
                runDownloadQueue();
            }else {
                downloadQueue.add(downloadEntity);
            }
        }
        private void runDownloadQueue() {
            isRunning = true;
            String url = currentDownloadEntity.url;
            String path = currentDownloadEntity.path;
            try {
                DownloadManager downloader = new DownloadManager(url,path);
                downloader.start();
            } catch (Exception e) {
                e.printStackTrace();
                clearFile(path);
            }
        }
    }
}
