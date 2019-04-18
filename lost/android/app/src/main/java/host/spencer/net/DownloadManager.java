package host.spencer.net;

import android.util.Log;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class DownloadManager {
    private String url;
    private String fileName;
    private OnProgressListener onProgressListener;
    private File file;
    public DownloadManager(String url,String fileName) {
        this.url = url;
        this.fileName = fileName;
        file = new File(fileName);
        file.deleteOnExit();
        File parent = new File(file.getParent());
        if(!parent.exists()) {
            parent.mkdirs();
        }
    }
    public void start() {
        Log.e("ReactNativeJS","开始下载");
        try {
            URL uri = new URL(url);
            HttpURLConnection conn = (HttpURLConnection)uri.openConnection();
            //设置超时间为3秒
            conn.setConnectTimeout(60*1000);
            //防止屏蔽程序抓取而返回403错误
            conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");

            //得到输入流
            InputStream inputStream = conn.getInputStream();
            //获取自己数组
            byte[] getData = readInputStream(inputStream);

            //文件保存位置
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(getData);
            if(fos!=null){
                fos.close();
            }
            if(inputStream!=null){
                inputStream.close();
            }


            Log.e("ReactNativeJS","info:"+url+" download success");
        }catch(Exception e) {
            e.printStackTrace();
        }

    }
    private  byte[] readInputStream(InputStream inputStream) throws IOException {
        byte[] buffer = new byte[1024];
        int len = 0;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        while((len = inputStream.read(buffer)) != -1) {
            bos.write(buffer, 0, len);
        }
        bos.close();
        return bos.toByteArray();
    }
    public File getFile() {
        return  file;
    }
    public void setOnProgressListener(OnProgressListener l){
        onProgressListener = l;
    }
    public interface OnProgressListener {
        void onProgress(int progress);
    }
}
