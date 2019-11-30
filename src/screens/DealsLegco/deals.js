import React, { Component } from "react";
import { AsyncStorage, Platform, PushNotificationIOS, ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../assets/background.jpg");
const launchscreenLogo = require("../../../assets/mylogo.png");
//import DealsLegco from '../home/';
фывфвфывф

class Home extends Component {
  render() {
    return (

        <Container>

    <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
          { /*<Image source={launchscreenLogo} style={styles.logo} />*/}
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent",
            }}
          >
            <View style={{ marginTop: 8 }} />
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
{/*
<Button
            style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
            onPress={() => this.myPush()}
          >
            <Text>push</Text>
          </Button>*/}
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={() => this.props.navigation.navigate("DealsLegco")}
            >
              <Text>Начаadasdть!</Text>
            </Button>
          {  /* <Push />*/}
          </View>
      </ImageBackground>
      </Container>

    );
  }
}

export default Home;
