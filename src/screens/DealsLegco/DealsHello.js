import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";
import styles from "./styles";
//import Push from "./Push";
import DealsLegco from '../DealsLegco/';
const launchscreenBg = require("../../../assets/backgroundscreen.png");
const launchscreenLogo = require("../../../assets/mylogo.png");
import {AsyncStorage, Platform, PushNotificationIOS} from 'react-native';
//var PushNotification = require('react-native-push-notification');
//import FCM, {NotificationActionType} from "react-native-fcm";
class Home extends Component {
	constructor(props) {
		super(props);
		this.state ={
			myKey:'',
			status1:'',
		}
		this.getKey=this.getKey.bind(this)
	}
	// eslint-disable-line
	async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({myKey: value});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }
	componentDidMount(){
		this.getKey();
	}
	myPush(){
		// FCM.scheduleLocalNotification({
		// 			 fire_date: new Date().getTime(),
		// 			 id: 'testnotif',
		// 			 title: "Title of the notification",
		// 			 body: "This is a random body",
		// 			 show_in_foreground: true,
		// 	})
// 		FCM.scheduleLocalNotification({
// 	id: 'testnotif',
// 	fire_date: new Date().getTime()+1000,
// 	vibrate: 500,
// 	title: 'Hello',
// 	body: 'Test Scheduled Notification',
// 	sub_text: 'sub text',
// 	priority: "high",
// 	large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
// 	show_in_foreground: true,
// 	picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
// 	wake_screen: true,
// 	extra1: {a: 1},
// 	extra2: 1,
// 	data: {
// screen: "DealsHello"
// }
// });
	}

	render() {
		const helloMessage = <Text> Hello, JSX! </Text>;
	  const goodbyeMessage = <Text> Goodbye, JSX! </Text>;
		return (
			<Container>

		<StatusBar barStyle="light-content" />
				<ImageBackground source={launchscreenBg} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
					{	/*<Image source={launchscreenLogo} style={styles.logo} />*/}
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
							<Text>Начать!</Text>
						</Button>
					{	 /* <Push />*/}
					</View>
			</ImageBackground>
			</Container>
		);
	}
}

export default Home;
