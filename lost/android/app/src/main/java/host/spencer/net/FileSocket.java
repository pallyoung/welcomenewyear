package host.spencer.net;

import android.os.Environment;
import android.text.TextUtils;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.Thread.sleep;

public class FileSocket {

    public static boolean proxyIdle = true;//代理是否空闲
    private boolean writeFile;
    private String writeFileName;
    final static private String LOCAL_IP_ADDRESS = "127.0.0.1";
    final static private int HTTP_PORT = 80;
    private static int available_ip_port = 9090;
    private int port;
    public static List<String> bufferingMusicUrlList = new ArrayList<>();//正在缓存的网络音乐地址
    private OnCaChedProgressUpdateListener mOnCaChedProgressUpdateListener;

    public static long lastProxyId = 0;//最新的代理ID
    public long currProxyId = 0;//当前代理ID

    private ServerSocket localServer = null;
    private String remoteHostAndPort = "";//这个用来到时替换本地地址的
    public SocketAddress remoteAddress;
    int socketTimeoutTime = 5000;
    String trueSocketRequestInfoStr = "";//音乐的远程socket请求地址
    String remotUrl = "";//远程音乐地址
    String musicKey = "";//音乐对象的key
    public int currPlayDegree = 0;//当前音乐播放进度
    public boolean proxyFail = false;//代理播放失败了

    private long cachedFileLength = 0;//已缓存的文件长度
    private long fileTotalLength = 0;//要缓存的文件总长度
    public int currMusicCachedProgress = 0;//当前的音乐缓冲值（seekbar上的缓冲值）
    private ArrayList<DownloadEntity> downloadQueue = new ArrayList<DownloadEntity>();
    private int currentDownloadThread = 0;
    public FileSocket() throws Exception {
        createServer();
    }
    private void createServer()throws Exception  {
        try {
            if (localServer == null || localServer.isClosed()) {
                available_ip_port--;
                //创建本地socket服务器，用来监听mediaplayer请求和给mediaplayer提供数据
                localServer = new ServerSocket();
                localServer.setReuseAddress(true);
                InetSocketAddress socketAddress = new InetSocketAddress(InetAddress.getByName(LOCAL_IP_ADDRESS), available_ip_port);
                localServer.bind(socketAddress);
                port = available_ip_port;
            }
        } catch (Exception e) {
            try{
                if(available_ip_port>8000) {
                    createServer();
                }
            } catch (Exception e2) {
                throw new Exception();
            }
        }
    }
    /**
     * 把网络URL转为本地URL，127.0.0.1替换网络域名,且设置远程的socket连接地址
     *
     * @param url 网络URL
     * @return 本地URL
     */
    public String getLocalURLAndSetRemotSocketAddr(String url) {
        try {
            remotUrl = url;

            bufferingMusicUrlList.add(remotUrl);

            String localProxyUrl = "";

            final URI originalURI = URI.create(url);
            final String remoteHost = originalURI.getHost();
            final int remotePort = originalURI.getPort() == -1? HTTP_PORT: originalURI.getPort();
            if (!TextUtils.isEmpty(remoteHost)) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        remoteAddress = new InetSocketAddress(remoteHost, remotePort);//使用80端口
                    }
                }).start();
                localProxyUrl = url.replace(remoteHost+":"+remotePort, LOCAL_IP_ADDRESS + ":" + port);
                remoteHostAndPort = remoteHost;
            }
            return localProxyUrl;
        } catch (Exception e) {
            return "";
        }
    }
    private void pushToQueue(String url,String path) {
        downloadQueue.add(new DownloadEntity(url,path));
    }
    private void runDownloadQueue(DownloadEntity downloadEntity) {
        String url = downloadEntity.url;
        String path = downloadEntity.path;
        try {
            URL uri = new URL(url);
            URLConnection conn = uri.openConnection();
            InputStream inStream = conn.getInputStream();
            FileOutputStream fs = new FileOutputStream(path);

            byte[] buffer = new byte[1204];
            int length;
            int bytesum = 0;
            int byteread = 0;
            while ((byteread = inStream.read(buffer)) != -1) {
                bytesum += byteread;
                fs.write(buffer, 0, byteread);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //获得真实的socket请求信息
    public void getTrueSocketRequestInfo(Socket localSocket) throws Exception {
        InputStream in_localSocket = localSocket.getInputStream();
        String trueSocketRequestInfoStr = "";//保存MediaPlayer的真实HTTP请求

        byte[] local_request = new byte[1024];
        while (in_localSocket.read(local_request) != -1) {
            String str = new String(local_request);
            trueSocketRequestInfoStr = trueSocketRequestInfoStr + str;

            if (trueSocketRequestInfoStr.contains("GET") && trueSocketRequestInfoStr.contains("\r\n\r\n")) {
                //把request中的本地ip改为远程ip
                trueSocketRequestInfoStr = trueSocketRequestInfoStr.replace(LOCAL_IP_ADDRESS + ":" + port, remoteHostAndPort);
                this.trueSocketRequestInfoStr = trueSocketRequestInfoStr;
                //如果用户拖动了进度条，因为拖动了滚动条还有Range则表示本地歌曲还未缓存完，不再保存
                if (trueSocketRequestInfoStr.contains("Range")) {
                    writeFile = false;
                }
                break;
            }
        }
    }

    //通过远程socket连接远程请求，并返回remot_socket
    public Socket sendRemoteRequest() throws Exception {
        //创建远程socket用来请求网络数据
        Socket remoteSocket = new Socket();
        remoteSocket.connect(remoteAddress, socketTimeoutTime);
        remoteSocket.getOutputStream().write(trueSocketRequestInfoStr.getBytes());
        remoteSocket.getOutputStream().flush();
        return remoteSocket;
    }

    //处理真实请求信息, 把网络服务器的反馈发到MediaPlayer，网络服务器->代理服务器->MediaPlayer
    public void processTrueRequestInfo(Socket remoteSocket, Socket localSocket) {
        //如果要写入本地文件的实例声明
        FileOutputStream fileOutputStream = null;
        File theFile = null;

        try {
            //获取音乐网络数据
            InputStream in_remoteSocket = remoteSocket.getInputStream();
            if (in_remoteSocket == null) return;

            OutputStream out_localSocket = localSocket.getOutputStream();
            if (out_localSocket == null) return;

            //如果要写入文件，配置相关实例
            if (writeFile) {
                File dirs = new File(Environment.getExternalStorageDirectory() + File.separator + "clearlee_music");
                dirs.mkdirs();
                theFile = new File(dirs + File.separator + writeFileName + ".m4a");
                fileOutputStream = new FileOutputStream(theFile);
            }

            try {
                int readLenth;
                byte[] remote_reply = new byte[4096];
                boolean firstData = true;//是否循环中第一次获得数据

                //当从远程还能取到数据且播放器还没切换另一首网络音乐
                while ((readLenth = in_remoteSocket.read(remote_reply, 0, remote_reply.length)) != -1 && currProxyId == lastProxyId) {

                    //首先从数据中获得文件总长度
                    try {
                        if (firstData) {
                            firstData = false;
                            String str = new String(remote_reply, "utf-8");
                            Pattern pattern = Pattern.compile("Content-Length:\\s*(\\d+)");
                            Matcher matcher = pattern.matcher(str);
                            if (matcher.find()) {
                                //获取数据的大小
                                fileTotalLength = Long.parseLong(matcher.group(1));
                            }
                        }
                    } catch (Exception e) {
                    }

                    //把远程sokcet拿到的数据用本地socket写到mediaplayer中播放
                    try {
                        out_localSocket.write(remote_reply, 0, readLenth);
                        out_localSocket.flush();
                    } catch (Exception e) {
                    }

                    //计算当前播放时，其在seekbar上的缓冲值,并刷新进度条
                    try {
                        cachedFileLength += readLenth;
                        if (fileTotalLength > 0 && currProxyId == lastProxyId) {
                            //currMusicCachedProgress = (int) (Common.div(cachedFileLength, fileTotalLength, 5) * 100);
                            if (mOnCaChedProgressUpdateListener != null && currMusicCachedProgress <= 100) {
                                mOnCaChedProgressUpdateListener.updateCachedProgress(currMusicCachedProgress);
                            }
                        }
                    } catch (Exception e) {
                    }

                    //如果需要缓存数据到本地，就缓存到本地
                    if (writeFile) {
                        try {
                            if (fileOutputStream != null) {
                                fileOutputStream.write(remote_reply, 0, readLenth);
                                fileOutputStream.flush();
                            }
                        } catch (Exception e) {
                        }
                    }
                }

                //如果是因为切换音乐跳出循环的，当前音乐播放进度，小于 seekbar最大值的1/4,就把当前音乐缓存在本地的数据清除了
                if (currProxyId != lastProxyId && currPlayDegree < 25) {
                    bufferingMusicUrlList.remove(remotUrl);
                    if (theFile != null) {
                        //Common.deleteFile(theFile.getPath());
                    }
                }

            } catch (Exception e) {
                if (theFile != null) {
                    //Common.deleteFile(theFile.getPath());
                }
                bufferingMusicUrlList.remove(remotUrl);

            } finally {
                in_remoteSocket.close();
                out_localSocket.close();
                if (fileOutputStream != null) {
                    fileOutputStream.close();

                    //音频文件缓存完后处理
//                    if (theFile != null && Common.checkFileExist(theFile.getPath())) {
//                        conver2RightAudioFile(theFile);
//                        if (musicControlInterface != null) {
//                            musicControlInterface.updateBufferFinishMusicPath(musicKey, theFile.getPath());
//                            bufferingMusicUrlList.remove(remotUrl);
//                        }
//                    }

                }
                localSocket.close();
                remoteSocket.close();
            }

        } catch (Exception e) {
            if (theFile != null) {
                //Common.deleteFile(theFile.getPath());
            }
            bufferingMusicUrlList.remove(remotUrl);
        }
    }

    public interface MusicControlInterface {
        void updateBufferFinishMusicPath(String musicKey, String localPath);
    }

    public static MusicControlInterface musicControlInterface;

    public interface OnCaChedProgressUpdateListener {
        void updateCachedProgress(int progress);
    }

    public void setOnCaChedProgressUpdateListener(OnCaChedProgressUpdateListener listener) {
        this.mOnCaChedProgressUpdateListener = listener;
    }

    /**
     * 启动代理服务器
     */
    public void startProxy() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    //监听MediaPlayer的请求，MediaPlayer->代理服务器
                    Socket localSocket = localServer.accept();

                    //获得真实请求信息
                    getTrueSocketRequestInfo(localSocket);

                    //保证创建了远程socket地址再进行下一步
                    while (remoteAddress == null) {
                        sleep(25);
                    }

                    //发送真实socket请求，并返回remote_socket
                    Socket remoteSocket = sendRemoteRequest();

                    //处理真实请求信息
                    processTrueRequestInfo(remoteSocket, localSocket);

                } catch (Exception e) {
                    proxyFail = true;
                } finally {

                    //最后释放本地代理serversocket
                    if (localServer != null) {
                        try {
                            localServer.close();
                            localServer = null;
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }

                    proxyIdle = true;
                }
            }
        }).start();
    }

    //转换为正确的音频文件
    public void conver2RightAudioFile(File file) {
        InputStream inputStream = null;
        FileOutputStream fos = null;
        try {
            inputStream = new FileInputStream(file);
            int read = 0;
            while (read > -1) {
                int newRead = inputStream.read();
                if (read == 0 && newRead == 0) {
                    byte[] bs = new byte[inputStream.available() + 2];
                    inputStream.read(bs, 2, bs.length - 2);
                    fos = new FileOutputStream(file);
                    fos.write(bs);
                    fos.flush();
                    break;
                }
                read = newRead;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (inputStream != null) inputStream.close();
                if (fos != null) fos.close();
            } catch (Exception e) {
            }
        }
    }
    class DownloadEntity {
        String url;
        String path;
        DownloadEntity(String u,String p) {
            url = u;
            path = p;
        }
    }
}