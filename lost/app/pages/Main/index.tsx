'use strict'
import React, { Component } from "react";
import { View, Text, Image } from 'react-native-ui'
import { createStyle } from "themes";
import { vh, vw } from "utils/resize";
import MusicButton from './MusicButton'

class Counter {
  e: number = 0;
  rd: number = 0;
  rs: number = 0;
  rh: number = 0;
  rm: number = 0;
  constructor() {
    this._resetDate();
  }
  _resetDate() {
    this.e = new Date(new Date().getFullYear() + 1, 0, 1).getTime();
  }
  calc(): void {
    const n = Date.now();
    if (this.e <= n) {
      this._resetDate();
    }
    var r = Math.ceil((this.e - n) / 1000);
    this.rd = Math.floor(r / 3600 / 24);
    r = r - this.rd * 3600 * 24;
    this.rh = Math.floor(r / 3600);
    r = r - this.rh * 3600;
    this.rm = Math.floor(r / 60);
    r = r - this.rm * 60;
    this.rs = r;
  }
}

interface Props {

}
interface State {
  days: number,
  hours: number,
  mins: number,
  secs: number
}
class Main extends Component<Props, State> {
  private counter = new Counter();
  state: State = {
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0
  }
  aninationFrame: any
  componentDidMount() {
    this.start();
  }
  componentWillUnmount() {
    this.stop();
  }
  start = () => {
    const counter = this.counter;
    counter.calc();
    this.setState({
      days: counter.rd,
      hours: counter.rh,
      mins: counter.rm,
      secs: counter.rs
    });
    this.aninationFrame = requestAnimationFrame(this.start);
  }
  stop() {
    cancelAnimationFrame(this.aninationFrame)
  }
  render() {
    const {
      days,
      hours,
      mins,
      secs
    } = this.state;
    return (
      <View
        style={styles.body}>
        <Image
          style={styles.bg}
          source={require('./bg.png')}
          resizeMode="stretch" />
        <View
          style={styles.wrapper}>
          <View style={styles.day_row}>
            <View style={styles.cell_day}></View>
            <Text style={[
              styles.fc,
              styles.fsDayN
            ]}>{days}</Text>
            <View style={styles.cell_day}>
              <Text
                style={[
                  styles.fc,
                  styles.fsDayW
                ]}>DAYS</Text>
            </View>

          </View>
          <View style={styles.row_2}>
            <View style={styles.cell_col}>
              <Text
                style={[
                  styles.fc,
                  styles.fsOtherN,
                  styles.mb,
                  styles.text_la
                ]}>{hours}</Text>
              <Text
                style={[
                  styles.fc,
                  styles.fsOtherW,
                  styles.text_la
                ]}>HOURS</Text>
            </View>
            <View style={styles.cell_col}>
              <Text
                style={[
                  styles.fc,
                  styles.fsOtherN,
                  styles.mb,
                  styles.text_la
                ]}>{mins}</Text>
              <Text
                style={[
                  styles.fc,
                  styles.fsOtherW,
                  styles.text_la
                ]}>MINS</Text>
            </View>
            <View style={styles.cell_col}>
              <Text
                style={[
                  styles.fc,
                  styles.fsOtherN,
                  styles.mb,
                  styles.text_la
                ]}>{secs}</Text>
              <Text
                style={[
                  styles.fc,
                  styles.fsOtherW,
                  styles.text_la
                ]}>SECS</Text>
            </View>
          </View>
          <MusicButton
          />
        </View>
      </View>)
  }
}

var styles = createStyle(theme => (
  {
    body: {
      flex: 1,
      flexDirection: "column"
    },
    bg: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    wrapper: {
      flex: 1,
      backgroundColor: "#0000"
    },
    day_row: {
      position: "absolute",
      top: vh(20),
      width: theme.clientWidth,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end"
    },
    row_2: {
      position: "absolute",
      bottom: vh(20),
      width: theme.clientWidth,
      flexDirection: "row",
      justifyContent: "center"
    },
    cell_day: {
      width: 50,
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingBottom: 10,
      paddingHorizontal: 40
    },
    cell_col: {
      flexDirection: "column",
      justifyContent: "center",
      width: (vw(100) - 80) / 3,
      alignItems: "center"
    },
    fc: {
      color: "#888"
    },
    fsDayN: {
      fontSize: 50
    },
    fsOtherN: {
      fontSize: 30
    },
    fsDayW: {
      fontSize: 10
    },
    fsOtherW: {
      fontSize: 10
    },
    mb: {
      marginBottom: 20
    },
    text_la: {
      textAlign: "center",
      width: 60
    }
  }
))

export default Main;
