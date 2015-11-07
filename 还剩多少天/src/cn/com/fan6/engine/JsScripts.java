package cn.com.fan6.engine;

import java.util.HashMap;

public class JsScripts {
	private HashMap<String,String> jsScripts = new HashMap<String,String>();
	public void put(String name,String script){
		jsScripts.put(name,script);
	}
	public String get(String name){
		return jsScripts.get(name);
	}
}
