'use strict'
var React = require("react-native");
var Dimensions = require('Dimensions');

var { width, height } = Dimensions.get('window');

var {
  View,
  Component,
  AppRegistry,
  Text,
  Image
} = React;

function Counter(){
	this.e;
	this.rd;
	this.rs;
	this.rh;
	this.rm;
	this.init();
}
Counter.prototype = {
	init:function(){
		this.e = new Date(new Date().getFullYear()+1,0,1);
	},
	calc:function(){
		var n = Date.now();
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

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.counter = new Counter();
    this.state = {
      days:100,
      hours:12,
      mins:12,
      secs:12
    }

  }
  componentDidMount(){
    this.start();
  }
  start(){
    this.counter.calc();
    var counter = this.counter;
    this.setState({
      days:counter.rd,
      hours:counter.rh,
      mins:counter.rm,
      secs:counter.rs
    });
		requestAnimationFrame(this.start.bind(this));
  }
  render(){
    return (
      <View
        style = {styles.body}>
        <Image
          style = {styles.bg}
          source = {require("image!bg")}
          resizeMode = "stretch"/>
        <View
          style = {styles.wrapper}>
          <View style = {styles.day_row}>
            <View style = {styles.cell_day}></View>
            <Text style = {[
              styles.fc,
              styles.fsDayN
            ]}>{this.state.days}</Text>
            <View style = {styles.cell_day}>
              <Text
                style = {[
                  styles.fc,
                  styles.fsDayW
                ]}>DAYS</Text>
            </View>

          </View>
          <View style = {styles.row_2}>
            <View style = {styles.cell_col}>
              <Text
                style = {[
                  styles.fc,
                  styles.fsOtherN,
                  styles.mb,
                  styles.text_la
                ]}>{this.state.hours}</Text>
              <Text
                style = {[
                  styles.fc,
                  styles.fsOtherW,
                  styles.text_la
                ]}>HOURS</Text>
            </View>
            <View style = {styles.cell_col}>
              <Text
                style = {[
                  styles.fc,
                  styles.fsOtherN,
                  styles.mb,
                  styles.text_la
                ]}>{this.state.mins}</Text>
              <Text
                style = {[
                  styles.fc,
                  styles.fsOtherW,
                  styles.text_la
                ]}>MINS</Text>
            </View>
            <View style = {styles.cell_col}>
              <Text
                style = {[
                  styles.fc,
                  styles.fsOtherN,
                  styles.mb,
                  styles.text_la
                ]}>{this.state.secs}</Text>
              <Text
                style = {[
                  styles.fc,
                  styles.fsOtherW,
                  styles.text_la
                ]}>SECS</Text>
            </View>
          </View>
        </View>
      </View>)
  }
}

var styles = {
  body:{
    height:height,
    width:width,
    flexDirection:"column"
  },
  bg:{
    height:height,
    width:width,
    position:"absolute",
    top:0,
    left:0
  },
  wrapper:{
    height:height,
    width:width,
    backgroundColor:"#0"
  },
  day_row:{
    position:"absolute",
    top:height*0.2,
    width:width,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"flex-end"
  },
  row_2:{
    position:"absolute",
    bottom:height*0.2,
    width:width,
    flexDirection:"row",
    justifyContent:"center"
  },
  cell_day:{
    width:50,
    flexDirection:"row",
    justifyContent:"flex-end",
    paddingBottom:10,
    paddingHorizontal:40
  },
  cell_col:{
    flexDirection:"column",
    justifyContent:"center",
    width:(width-80)/3,
    alignItems:"center"
  },
  fc:{
    color: "#888"
  },
  fsDayN:{
    fontSize:50
  },
  fsOtherN:{
    fontSize:30
  },
  fsDayW:{
    fontSize:10
  },
  fsOtherW:{
    fontSize:10
  },
  mb:{
    marginBottom:20
  },
  text_la:{
    textAlign:"center",
    width:60
  }
}

module.exports = CountDown;
