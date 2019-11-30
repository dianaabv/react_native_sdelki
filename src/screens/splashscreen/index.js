import React, { Component } from "react";
import { Image } from "react-native";

const backgroundscreen = require("../../../assets/backgroundscreen.png");

export default class backgroundPage extends Component {
  render() {
    // eslint-disable-line class-methods-use-this
    return (
      <Image
        source={backgroundscreen}
        style={{ flex: 1, height: null, width: null }}
      />
    );
  }
}
