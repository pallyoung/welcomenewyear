/*index.js*/

function start () {
	var counter = new Counter();

	var d = document.getElementById('days');
	var h = document.getElementById('hours');
	var m = document.getElementById('mins');
	var s = document.getElementById('secs');



	function refresh(){
		counter.calc();
		d.innerHTML = counter.rd;
		h.innerHTML = counter.rh;
		m.innerHTML = counter.rm;
		s.innerHTML = counter.rs;
		requestAnimationFrame(refresh);
	}

	refresh();
}
function Counter(){
	this.e;
	this.rd;
	this.rs;
	this.rh;
	this.rm;
	this.init();
}
Counter.prototype = {
	init(){
		this.e = new Date(new Date().getFullYear()+1,0,1);
	},
	calc:function(){
		n = Date.now();
		if(this.e<=n){
			this.init();
		}
		var r = Math.ceil((this.e-n)/1000);
		this.rd = Math.floor(r/3600/24);
		r =r - this.rd*3600*24;
		this.rh = Math.floor(r/3600);
		r = r-this.rh*3600;
		this.rm = Math.floor(r/60);
		r = r-this.rm*60;
		this.rs = r;


	}
};

window.onload = start;