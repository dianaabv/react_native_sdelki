import React, { Component } from "react";
import axios from 'react-native-axios';
import { Image, StatusBar, View, Platform, AppState} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
} from "native-base";
import {AsyncStorage,
  TextInput,
   Alert,
   PushNotificationIOS
} from 'react-native';
import styles from "./styles";
import FCM, {FCMEvent, NotificationActionType, NotificationType, WillPresentNotificationResult} from "react-native-fcm";
//import TextInputMask from 'react-native-text-input-mask';
//import TextInputMask from 'react-native-text-input-mask';
//var PushNotification = require('react-native-push-notification');
import PushNotification from 'react-native-push-notification';
const launchscreenLogo = require("../../../assets/mylogo.png");
const hands = require("../../../assets/hands.png");


import { TextInputMask } from 'react-native-masked-text'
//
// PushNotification.configure({
//
//     // (optional) Called when Token is generated (iOS and Android)
//     onRegister: function(token) {
//       console.log(token, 'signintoken')
//       deviceToken1 = token.token
//     }
//
//
//
// });

const token=''
class FloatingLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      errors: {},
      deviceToken:'',
      token : '',
      myKey:''
    };
    this.saveKey=this.saveKey.bind(this)
    this.sendNotification=this.sendNotification.bind(this)
  }
  async componentDidMount(){
      this.getKey();
      FCM.getFCMToken().then(token => {
        console.log("TOKEN (getFCMToken)", token);
        this.setState({token: token || ""})
      });
  
  FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)
   this.sendNotification()

      if(notif.opened_from_tray =='1'){
       // this.props.navigation.navigate("DealsHello")
      }
    });



  }


     sendNotification() {
      console.log('this.sendNotificationthis.sendNotificationthis.sendNotification')
    PushNotification.localNotification({
      message: 'You pushed the notification button!'
    });
  };







  onChangePassword(text) {
    this.setState({
      password:text
    })
  }
  onChangeText(text) {
    this.setState({
      username:text
    })
  }
  onSuccess1(){
    this.props.navigation.navigate('DealsHello');
  }
  onSuccess(userid){
    this.props.navigation.navigate('DealsHello');

    if(this.state.token.length!=0){
      // console.log(Platform.OS,, 'Platform.OS')
      var platform =Platform.OS.toString()
      const formData = `userid=${userid}&deviceToken=${this.state.token}&devicePlatform=${platform}`;
      axios.post('https://sdelkibackend.herokuapp.com/api/savemydevice',formData,{
          responseType: 'json',
          headers: {
            'Cosntent-type': 'application/x-www-form-urlencoded'
          }
        })
    }
      // .then(res => {
      //   console.log(res.data)
      // })
      //   .catch(error => {
      //     console.log(error)
      //
      // });
  }

  handleSubmit () {
    var name=this.state.username.replace(/[{()}]/g, '')
    name=name.replace(/[{ }]/g, '');
    name=name.replace(/-/g, '');
    const username = encodeURIComponent(name);
    const password = encodeURIComponent(this.state.password);
    const formData = `username=${username}&password=${password}`;
    console.log(formData, 'ya tut')
    axios.post('https://sdelkibackend.herokuapp.com/auth/login',formData,{
        responseType: 'json',
        headers: {
          'Cosntent-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
          this.setState({
            errors: {}
          });
          console.log(res)
         // console.log(res.data.token,'res.data.token')
          // if(res.data.token){
          //   this.onSuccess(res.data.token);
          //   this.saveKey(res.data.token)
          // }
          // if(res.data.user.user.isRegistered){
            if(res.data.user.user.isRegistered==1){
              this.onSuccess(res.data.token);
              this.saveKey(res.data.token)
             } else {
               console.log('99')
             this.props.navigation.navigate('SmsSubmit', {my_id: res.data.user.user._id})
             }
      })
        .catch(error => {
          if (error.response) {
        const errors = error.response ? error.response : {};
        errors.summary = error.response.data.message;
        this.setState({
          errors
        });
        Alert.alert(
          'Попробуйте еще',
          this.state.errors.summary,
          [
          {text: 'Ок!', onPress: () => console.log('ok')}
          ],
          { cancelable: false }
        )
    //swal({text: this.state.errors.summary})
      }
      });
  }
  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  async getKey() {
     try {
       const value = await AsyncStorage.getItem('@MySuperStore:key');
       if(value){
            this.onSuccess1()
            //this.props.navigation.navigate('DealHello')
            //console.log(value,'getKey')
       }
     } catch (error) {
       console.log("Error retrieving data" + error);
     }
   }
  render() {
    //console.log(this.state.myKey)
    return (
      <Container style={styles.container1}>
        <Content>
        <View style={styles.logoContainer}>
      <Image source={hands} style={styles.logo} />
        </View>
          <Form>







            <Label  style={styles.myLabel1}>Сотовый</Label>
            <TextInputMask
            underlineColorAndroid="transparent"

            style={styles.inputMask3}
            type={'custom'}
            options={{
              mask: '+7 (999) 999-99-99',
            }}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            value={this.state.phoneValue}
            onChangeText={(text) => {
              this.phone = text;
              this.setState({phoneValue: text, username: text});
              this.setState({phone: false});
            }}

  />

  {  /*         <TextInputMask  style={styles.inputMask1}

              onChangeText={this.onChangeText.bind(this)}
              mask={"+7 ([000]) [000] [00] [00]"}
            />*/}
            <Item stackedLabel >
              <Label>Пароль</Label>
              <Input  secureTextEntry={true}   onChangeText={(text) => this.setState({password: text})} />
            </Item>
          </Form>
      <Button block style={{ margin: 15, marginTop: 50 }}  onPress={this.handleSubmit.bind(this)}>
            <Text>Войти</Text>
          </Button>
          <Button block style={{ margin: 15 }}  onPress={() => this.props.navigation.navigate("SignUp")}>
            <Text>Зарегистрироваться</Text>
          </Button>
          <Button block style={{ margin: 15 }}  onPress={() => this.props.navigation.navigate("ForgotPassword")}>
          <Button title='Press here for a notification'
          onPress={this.sendNotification} />
            <Text>Забыли пароль</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default FloatingLabel;
