package cn.com.fan6.engine;

import java.util.HashMap;

import org.json.JSONArray;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;



public class WebViewNative {
	private HashMap<String,JsPlugin> jsPlugins =  new HashMap<String,JsPlugin>();
	private WebView webview;
	private JsThread jsThread;
	public WebViewNative(WebView webview){
		this.webview = webview;
		jsThread = new JsThread();
		jsThread.start();
	}
	public void insertJsPlugin(String nameSpace,JsPlugin JsPlugin){
		jsPlugins.put(nameSpace, JsPlugin);
	}
	public void removeJsPlugin(String nameSpace){
		jsPlugins.remove(nameSpace);
	}
	@JavascriptInterface
	public String execute(String nameSpace,String method,String args){
		
		JsPlugin jsPlugin = jsPlugins.get(nameSpace);
		String returnValue = "{";
		String message = "";
		int status = 0;
		if(jsPlugin!=null){
			try{
				if(args.startsWith("[")&&args.endsWith("]")){
					JSONArray jsonargs = new JSONArray(args);
					Object[] oargs = new Object[jsonargs.length()];
					for(int i = 0;i<jsonargs.length();i++){
						oargs[i] = jsonargs.get(i);
					}
					message = jsPlugins.get(nameSpace).run(method, oargs);				
				}else{
					message = jsPlugins.get(nameSpace).run(method, args);
				}		
				status = 1;
			}catch(Exception e){
				message = "\""+e.getMessage()+"\"";
			}
			
		}else{
			message = "\"nameSpace is not found\"";
		}
		
		returnValue+="\"status\":"+status;
		returnValue+=",\"message\":"+message+"}";		 
		return returnValue;
	}
	@JavascriptInterface
	public void execute (final String nameSpace,final String method,final String cb,final String args){
		jsThread.post(new Runnable(){
			@Override
			public void run() {				
				final String returnValue = execute(nameSpace,method,args);
				webview.post(new Runnable(){

					@Override
					public void run() {
	
						webview.loadUrl("javascript:"+cb+"('"+returnValue+"')");
					}					
				});
			}			
		});
	}
	/*public void callJs(String js){
		
		String jsMethod = "javascript:(function(){try{var status = 1;var message = ";
		jsMethod+= js+"||'';}catch(e){message = e.message;status = 0;}";
		jsMethod+= "finally{log(message)}})()";
		webview.loadUrl(jsMethod);
	}*/

	class JsThread extends Thread{
		
		Handler handler;
		public void post(Runnable r){
			handler.post(r);
			//Log.e("WebViewNative", handler.getLooper().getThread().getName());
		}
		@Override
		public void run(){
			Looper.prepare();
			if(handler==null){
				handler = new Handler(Looper.myLooper());
			}
			Looper.loop();
			super.run();
		}
		@Override
		public void start(){
			super.start();
			//handler= new Handler();
		}
	}
}
