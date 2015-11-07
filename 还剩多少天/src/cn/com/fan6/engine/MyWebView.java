package cn.com.fan6.engine;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Random;

import org.json.JSONArray;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;

@SuppressLint("SetJavaScriptEnabled")
public class MyWebView extends WebView{
	private WebSettings settings;
	public WebViewNative webviewNative;
	private HashMap<Integer,ValueCallback<JsCallResponse>> jsCallbacks = new HashMap<Integer,ValueCallback<JsCallResponse>>();
	
	private OnJsCallListener onJsCallListener = new OnJsCallListener(){

		@Override
		public void onJsCall(JsCallResponse respose) {

		}
		
	};
	private int id = 0;
	public MyWebView(Context context) {
		super(context);
		init();
	}
	
	public MyWebView(Context context, AttributeSet attrs) {
		super(context, attrs);
		init();

	}
	
	public MyWebView(Context context, AttributeSet attrs, int defStyleAttr) {
		super(context, attrs, defStyleAttr);
		init();
	}
	
	private void init(){
		settings = getSettings();
		setInitialScale(0);
		setVerticalScrollBarEnabled(false);
		setting();
		
		webviewNative =  new WebViewNative(this);
		//负责处理JS回调
		addJavascriptInterface(new WebViewJSCallback(), "_WebViewJSCallback");
		//webView的代理，可以通过它来设置webView
		addJavascriptInterface(new WebViewDelegate(), "_WebViewDelegate");
		//jsplugins
		addJavascriptInterface(webviewNative, "_WebViewNative");
	}
	
	@SuppressWarnings("deprecation")
	private void setting(){
		settings.setJavaScriptEnabled(true);
		settings.setJavaScriptCanOpenWindowsAutomatically(true);
		// settings.setLayoutAlgorithm(LayoutAlgorithm.NORMAL);
		settings.setSaveFormData(false);
		settings.setSavePassword(false);


		String databasePath = this.getContext().getApplicationContext()
				.getDir("database", Context.MODE_PRIVATE).getPath();
		settings.setDatabaseEnabled(true);
		
		settings.setDatabasePath(databasePath);

		settings.setGeolocationDatabasePath(databasePath);

		// Enable DOM storage
		settings.setDomStorageEnabled(true);

		// Enable built-in geolocation
		settings.setGeolocationEnabled(true);

		// Enable AppCache
		settings.setAppCacheMaxSize(5 * 1048576);
		settings.setAppCachePath(databasePath);
		settings.setAppCacheEnabled(true);


		settings.setAllowContentAccess(true);
		settings.setAllowFileAccess(true);
		settings.setAllowFileAccessFromFileURLs(true);

		// viewport
		settings.setUseWideViewPort(true);
		settings.setLoadWithOverviewMode(true);
		settings.setBuiltInZoomControls(false);
		settings.setSupportZoom(false);
	}
	public String getUserAgent(){
		return 	settings.getUserAgentString();
	}
	public void setUserAgent(String userAgent){
		settings.setUserAgentString(userAgent);
	}
	
	private int idGenerator(){
		return ++id;
	}
	public void callJs(int id,String js){
		String jsMethod = "javascript:(function(){try{var status = 1;var message = ";
		jsMethod+= js+"||'';}catch(e){message = e.message;status = 0}}finally{_WebViewJSCallback.triggerOnJsCallListener("+id+",status,"+js+",message)}})()";
		loadUrl(jsMethod);
		
	}
	public void callJs(int id,String js, ValueCallback<JsCallResponse> cb){
		jsCallbacks.put(id, cb);
		
		String jsMethod = "javascript:(function(){try{var status = 1;var message = ";
		jsMethod+= js+"||'';}catch(e){message = e.message;status = 0;_WebViewJSCallback.triggerCallback("+id+",status,"+js+",message)}";
		jsMethod+= "finally{_WebViewJSCallback.triggerOnJsCallListener("+id+",status,"+js+",message)}})()";
		loadUrl(jsMethod);
	}

	public void setOnJsCallListerner(OnJsCallListener onJsCallListener){
		
	}
	class WebViewJSCallback{
		public void triggerCallback(int id,int status,String message,String script){
			JsCallResponse jsCallResponse  = new JsCallResponse(id, status, message, script);
			jsCallbacks.get(id).onReceiveValue(jsCallResponse);
			
		}
		public void triggerOnJsCallListener(int id,int status,String message,String script){
			JsCallResponse jsCallResponse  = new JsCallResponse(id, status, message, script);
			onJsCallListener.onJsCall(jsCallResponse);
		}
	}
	class WebViewDelegate{
		@JavascriptInterface
		public void invoke(String nativeMethod,String paramtypes,String args){
			try{
				Class<? extends MyWebView> cl = MyWebView.this.getClass();
				JSONArray paramtype = new JSONArray(paramtypes);
				JSONArray jargs = new JSONArray(args);
				Class[] parameterTypes = new Class[paramtype.length()];
				Object[] oargs = new Object[paramtype.length()];
				if(paramtype.length() == 0){
					parameterTypes = null;
					oargs = null;
				}else{
					for(int i =0;i<paramtype.length();i++){
						switch(paramtype.getInt(i)){
							case 0:
								parameterTypes[i] = int.class;
								break;
							case 1:
								parameterTypes[i] = String.class;
								break;
							case 2:
								parameterTypes[i] = boolean.class;
								break;
						}
					}
				}
				
				Method method = cl.getMethod(nativeMethod, parameterTypes);
				method.invoke(MyWebView.this, oargs);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	}
	

}
