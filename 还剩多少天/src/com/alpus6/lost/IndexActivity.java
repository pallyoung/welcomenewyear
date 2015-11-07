package com.alpus6.lost;

import com.alpus6.lost.R;
import com.alpus6.counter.views.APlus6WebView;

import android.app.Activity;
import android.os.Bundle;

public class IndexActivity extends Activity {
	
	private APlus6WebView webview;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_index);
		webview = (APlus6WebView) findViewById(R.id.webview);
		webview.loadUrl("file:///android_asset/index.html");
	}
}
