package com.alpus6.counter.views;

import android.content.Context;
import android.util.AttributeSet;

import cn.com.fan6.engine.MyWebChromeClient;
import cn.com.fan6.engine.MyWebView;
import cn.com.fan6.engine.MyWebViewClient;

public class APlus6WebView extends MyWebView {
	
	public APlus6WebView(Context context) {
		super(context);
		init();
	}
	
	public APlus6WebView(Context context, AttributeSet attrs) {
		super(context, attrs);
		init();
	}
	
	public APlus6WebView(Context context, AttributeSet attrs, int defStyleAttr) {
		super(context, attrs, defStyleAttr);
		init();
	}

	private void init(){
		setWebViewClient(new MyWebViewClient());
		setWebChromeClient(new MyWebChromeClient());
	}
}
