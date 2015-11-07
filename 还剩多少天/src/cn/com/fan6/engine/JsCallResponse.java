package cn.com.fan6.engine;

public class JsCallResponse{
	private int status;
	private int id;
	private String script;
	//如果JS正确，那么就是返回值，否则就是errorMessage
	private String message;
	public final static int SUCCESS = 1;
	public final static int FAIL = 1;
	public int getStatus() {
		return status;
	}
	public int getId(){
		return id;
	}
	public String getMessage() {
		return message;
	}
	public String getScript(){
		return script;
	}
	public JsCallResponse(int id,int status,String message,String script){
		this.status = status;
		this.id = id;
		this.message = message;
		this.script = script;
	}
	
}
