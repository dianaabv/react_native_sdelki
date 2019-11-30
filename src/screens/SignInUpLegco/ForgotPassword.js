import React, { Component } from "react";
//import TextInputMask from 'react-native-text-input-mask';
import axios from 'react-native-axios';
import { Image, StatusBar, View} from "react-native";
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
  Text
} from "native-base";
import {AsyncStorage,
  TextInput,
   Alert,
   PushNotificationIOS
} from 'react-native';
import styles from "./styles";

//var PushNotification = require('react-native-push-notification');
const launchscreenLogo = require("../../../assets/mylogo.png");
const hands = require("../../../assets/hands.png");
import { TextInputMask } from 'react-native-masked-text'




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
      smscode: '',
      my_id: ''
    };
    this.saveKey=this.saveKey.bind(this);
    this.repeatSmsCode = this.repeatSmsCode.bind(this);
  }

 componentDidMount(){
  //   onChangePassword(text) {
  //       this.setState({
  //         password:text
  //       })
  //     }
  // onChangeText(text) {
  //   this.setState({
  //     username:text
  //   })
  // }
}
  onSuccess(userid){
    this.props.navigation.navigate('DealsHello');

    if(this.state.token.length!=0){
      // this.setState({deviceToken: deviceToken1})
      const formData = `userid=${userid}&deviceToken=${this.state.token}`;
      console.log(formData, 'ssss')
      axios.post('https://sdelkibackend.herokuapp.com/api/savemydevice',formData,{
          responseType: 'json',
          headers: {
            'Cosntent-type': 'application/x-www-form-urlencoded'
          }
        })
    }
  }
  repeatSmsCode(){
    const params  = this.props.navigation.state;
    //console.log(params.params.my_id, 'my_id')
    this.setState({my_id:params.params.my_id})
  const formData = `user_id=${this.state.my_id}`
  axios.post('https://sdelkibackend.herokuapp.com/api/repeatsms',formData, {
      responseType: 'json',
      headers: {
          'Content-type': 'application/x-www-form-urlencoded',

      }
  })
  .then(res => {
    this.setState({
      message: res.data.message
    });
//     Alert.alert(
// 'Cделки LegCo',
// this.state.message,
// [
// {text: 'Ок!', onPress: () => console.log('ok')}
// ],
// { cancelable: false }
// )
  })
  .catch(err => {
  if (err.response) {
    const errors = err.response ? err.response : {};
    errors.summary = err.response.data.message;
    this.setState({
      errors
    });
  }
});
}

  handleSubmit () {
    // const params  = this.props.navigation.state;
    //console.log(params.params.my_id, 'my_id')
    //this.setState({my_id:params.params.my_id})



    if(this.state.username.length!=0){
      //console.log(this.state.my_id)

    var   username=this.state.username.replace(/[{()}]/g, '')
    username=username.replace(/[{ }]/g, '');
    username=username.replace(/-/g, '');
    console.log(username)
      const formData = `user_id=${username}`
        axios.post('https://sdelkibackend.herokuapp.com/api/repeatsms1',formData, {
        responseType: 'json',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',

        }
    })
    .then(res => {
      this.setState({
        message: res.data.message
      });

if(res.data.message =='Мы выслали вам повторный код.'){
  console.log('adasd')
    this.props.navigation.navigate('ForgotPasswordSms', {user_id: username})
} else{
      Alert.alert(
  'Cделки LegCo',
  'Такого сотового не зарегестрировано',
  [
  {text: 'Ок!'}
  ],
  { cancelable: false }
  )
}




    })
    .catch(err => {
    if (err.response) {
      const errors = err.response ? err.response : {};
      errors.summary = err.response.data.message;
      this.setState({
        errors
      });
    }
    });

    } else {
      Alert.alert(
  'Cделки LegCo',
  'Вы не ввели сотовый номер',
  [
  {text: 'Ок!', onPress: () => console.log(this.state.my_id)}
  ],
  { cancelable: false }
  )
    }
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
     } catch (error) {
       console.log("Error retrieving data" + error);
     }
   }
  render() {

    return (
      <Container >
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.metext}>Восстановление пароля</Text>
          </Body>
          <Right />
        </Header>

        <Content>
          <Form>




              <Label style={styles.myLabel1}>Введите ваш сотовый</Label>

              <TextInputMask
              underlineColorAndroid="transparent"

              style={styles.inputMask1}
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

          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.handleSubmit.bind(this)}>
            <Text>Запросить смс код для подтверждения</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default FloatingLabel;
