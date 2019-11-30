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
  repeatSmsCode(){
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
    swal({text: this.state.message})
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
    //если все ок
      this.props.navigation.navigate('ForgotPasswordSms', {my_id: res.data.my_id})
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
    const params  = this.props.navigation.state;
    //console.log(params.params.my_id, 'my_id')
    this.setState({my_id:params.params.my_id})

    console.log(params.params.my_id,this.state.smscode )
    if(this.state.smscode.length!=0){
      //console.log(this.state.my_id)

      const formData = `user_id=${this.state.my_id}&smscode=${this.state.smscode}`
        axios.post('https://sdelkibackend.herokuapp.com/api/verifysms',formData, {
        responseType: 'json',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',

        }
    })
    .then(res => {
      this.setState({
        message: res.data.message
      });
      if(res.data.message == 'Поздравляем! Вы успешно прошли регистрацию.'){
        Alert.alert(
    'Cделки LegCo',
    this.state.message,
    [
    {text: 'Ок!', onPress: () => this.props.navigation.navigate('SignIn')}
    ],
    { cancelable: false }
    )
      } else{
        Alert.alert(
    'Cделки LegCo',
    this.state.message,
    [
    {text: 'Ок!', onPress: () => console.log(this.state.my_id)}
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
  'Вы не ввели код',
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
            <Title>Смс подтверждение</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Form>



            <Item floatingLabel>
              <Label>Смс код</Label>
              <Input onChangeText={(text) => this.setState({smscode: text})}/>
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.handleSubmit.bind(this)}>
            <Text>Подтвердить Регистрацию</Text>
          </Button>
          <Button  onPress={(value) => this.repeatSmsCode()}  transparent>
            <Text>Запросить код еще раз</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default FloatingLabel;
