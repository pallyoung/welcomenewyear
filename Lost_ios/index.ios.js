/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
//" CREATE TABLE IF NOT EXISTS CONTACTS(ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, ADDRESS TEXT,PHONE TEXT)";
var React = require('react-native');
var CountDown = require('./CountDown');


var {
  Component,
  AppRegistry
} = React;

class App extends Component{
  constructor(props){
    super(props);

  }
  render(){
    return (
      <CountDown
      />
    )
  }
}



AppRegistry.registerComponent("Lost", () => App);

module.exports = App;
