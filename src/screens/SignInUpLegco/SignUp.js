// import React, { Component } from 'react';
//
// import { Container, Header, Title, Button, Icon, Tabs, Tab, Right, Left, Body , KeyboardSpacer} from 'native-base';

import RegFiz from './SignUp1.js';
import RegIp from './SignUp10.js';

import React, { Component } from 'react';
import { Alert,  Linking} from 'react-native';
import { Container, Header, Title, Button, Icon, Tabs, Tab, Right, Left, Body, View,
Label, Item, Input, Picker,TextInput ,
AppRegistry, StyleSheet, Text} from 'native-base';
var {TouchableHighlight } = React;
//import TextInputMask from 'react-native-text-input-mask';
import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-datepicker'
import styles from './styles';
import InputScrollView from 'react-native-input-scroll-view'
var t = require('tcomb-form-native');
const Form = t.form.Form;
import axios from 'react-native-axios';
import moment from 'moment';


const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    phone_err:'',
    normal: {
      position: null,
      left:null,
      right:null,
      paddingTop: 2,
      paddingBottom: 2,
      fontSize:15,
      paddingLeft: null,
      color: "#575757"
    },
    error: {
      color: '#a94442',
      fontSize: 15,
    }
  }
}
var init_pass=''
var Gender = t.enums({
  mvd: 'МВД РК',
  murk: 'Министерство юстиции Республики Казахстан'
});
var Email = t.refinement(t.String, function (s) {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(s);
});

var Password= t.refinement(t.String, function (s) {
  init_pass=s
  return s.length >= 2;
});
var Password1= t.refinement(t.String, function (s) {
  return init_pass== s;
});
var Udv = t.refinement(t.Number, function (s) {
  return s.toString().length == 8;
});
var Iin = t.refinement(t.Number, function (s) {
  return s.toString().length == 12;
});
var Terms = t.refinement(t.Boolean, function (s) {
  return s == 1;
});


const User =  t.struct({
  firstname: t.String,
	lastname: t.String,
	midname: t.maybe(t.String),
	email: Email,
  password: Password,
	confirmPassword: Password1 ,
	birthDate: t.Date,
	udv: Udv,
	issuedby: Gender,
	issueddate_day: t.Date,
	iin:Iin,
	address: t.String,
	terms: Terms,
});
const IP =  t.struct({
  firstname: t.String,
	lastname: t.String,
	midname: t.maybe(t.String),
	email: Email,
  password: Password,
	confirmPassword: Password1 ,
	birthDate: t.Date,
	udv: Udv,
	issuedby: Gender,
	issueddate_day: t.Date,
	iin:Iin,
	address: t.String,
  nameip:t.String,
  noregip: t.String,
  addressregip: t.String,
  dateregip: t.Date,
	terms: Terms,
});
function samePasswords(x) {
  return x.newPassword === x.confirmPassword;
}
let myFormatFunction = (format,date) =>{
         return moment(date).format(format);
     }
     var DOB = {
         label: 'Дата Рождения',
         mode:'date',
         config:{
             format:(date) => myFormatFunction("DD MMM YYYY",date)
         }
     };
     var ISS_date = {
       label: 'Дата выдачи уд-ния личности',
       mode:'date',
       config:{
           format:(date) => myFormatFunction("DD MMM YYYY",date)
       }
     }
     var DateRegIp = {
       label: 'Дата гос регистрации ИП',
       mode:'date',
       config:{
           format:(date) => myFormatFunction("DD MMM YYYY",date)
       }
     }
const options = {
  fields: {
		firstname:{
			label: "Имя"
		},
		lastname:{
			label: "Фамилия"
		},
		midname:{
			label: 'Отчество (не обяз.)'
		},
		email: {
			label: 'Email',
			error: 'Неверный формат почты'
		},
		password: {
			label: "Пароль",
			secureTextEntry: true,
      error: 'Слишком короткий пароль'
		},
		confirmPassword: {
		 label: "Повторный пароль",
     secureTextEntry: true,
		 type: 'password',
     error: 'Пароли должны совпадать'
	  },
		birthDate:DOB,
		udv:{
			label: '№ Удостоверения личности',
      error:  '№ Удостоверения личности должен состоять из 9 цифр'
		},
		issuedby: {
			label: 'Орган, выдавший уд-ние личности'
		},
		issueddate_day: ISS_date,
		iin:{
			label: 'ИИН',
      error: 'ИИН должен состоять из 12 цифр'
		},
		address:{
			label: 'Адрес регистрации'
		},
		terms: {
			label: 'Настоящим подтверждаю ознакомление и принятие мной условий нижеперечисленных документов',
      error: 'Вы не приняли пользовательское соглашение'
		},
    nameip: {
			label: 'Наименование ИП'
		},
    noregip: {
      label: '№ свидетельства о гос регстрации ИП'
    },
    addressregip: {
      label: 'Адрес регистрации'
    },
    dateregip: DateRegIp,
  },
  stylesheet: formStyles
};
const options1 = {
  fields: {
		firstname:{
			label: "Имя"
		},
		lastname:{
			label: "Фамилия"
		},
		midname:{
			label: 'Отчество (не обяз.)'
		},
		email: {
			label: 'Email',
			error: 'Неверный формат почты'
		},
		password: {
			label: "Пароль",
			secureTextEntry: true,
      error: 'Слишком короткий пароль'
		},
		confirmPassword: {
		 label: "Повторный пароль",
     secureTextEntry: true,
		 type: 'password',
     error: 'Пароли должны совпадать'
	  },
		birthDate:DOB,
		udv:{
			label: '№ Удостоверения личности',
      error:  '№ Удостоверения личности должен состоять из 9 цифр'
		},
		issuedby: {
			label: 'Орган, выдавший уд-ние личности'
		},
		issueddate_day: ISS_date,
		iin:{
			label: 'ИИН',
      error: 'ИИН должен состоять из 12 цифр'
		},
		address:{
			label: 'Адрес регистрации'
		},
		terms: {
			label: 'Настоящим подтверждаю ознакомление и принятие мной условий нижеперечисленных документов.',
      error: 'Вы не приняли пользовательское соглашение'
		},
    nameip: {
			label: 'Наименование ИП'
		},
    noregip: {
      label: '№ свидетельства о гос регстрации ИП'
    },
    addressregip: {
      label: 'Адрес регистрации'
    },
    dateregip: DateRegIp,
  },
  stylesheet: formStyles
};
class BasicTab extends Component {
	// eslint-disable-line
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};
	//  this.myAlert=  this.myAlert.bind(this)
	}
	myAlert ()  {
		 //this.props.navigation.navigate('SignIn')
    Alert.alert(
'Поздравляем!',
'Вы успешно прошли регистрацию.',
[
{text: 'Ок!', onPress: () => this.props.navigation.navigate('SignIn')}
],
{ cancelable: false }
)

	}
  handleSubmitIp () {
    const value = this._form.getValue(); // use that ref to get the form value
    if (value  && this.state.username.length!=18) {
      console.log(value)
      const formData = `person=${JSON.stringify(value)}&username=${this.state.username}`;
      axios.post('https://sdelkibackend.herokuapp.com/api/signupip',formData,{
          responseType: 'json',
          headers: {
            'Cosntent-type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          if (res.data.message==='Поздравляем! Вы успешно прошли регистрацию в роли Физ. лица.'
          || res.data.message==='Поздравляем! Вы успешно прошли регистрацию в роли Индивидуального предпринимателя'){
            //  this.myAlert()
              this.props.navigation.navigate('SmsSubmit', {my_id: res.data.my_id})
      } else {
        Alert.alert('Что-то пошло не так','Возможно кто-то использовал ваш сотовый, либо email',
          [
          {text: 'Ок!', onPress: () => console.log('Ask me late r pressed')}
          ],{ cancelable: false })
      }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      if(this.state.username.length!=18){
        this.setState({
          phone_err:'1'
        })
      } else{
        this.setState({
          phone_err:''
        })
      }
            Alert.alert(
               'Проверьте поля'
            )
    }
  }
	handleSubmit  () {
	const value = this._form.getValue(); // use that ref to get the form value
	if (value && this.state.username.length!=18) {
	  const formData = `person=${JSON.stringify(value)}&username=${this.state.username}`;
	  axios.post('https://sdelkibackend.herokuapp.com/api/signup',formData,{
	      responseType: 'json',
	      headers: {
	        'Cosntent-type': 'application/x-www-form-urlencoded'
	      }
	    })
	    .then(res => {
	      if (res.data.message==='Поздравляем! Вы успешно прошли регистрацию в роли Физ. лица.'
	      || res.data.message==='Поздравляем! Вы успешно прошли регистрацию в роли ИП.'){
	          // this.myAlert()

            this.props.navigation.navigate('SmsSubmit', {my_id: res.data.my_id})
	  } else {
	    Alert.alert('Сделки LegCo','Что-то пошло не так',
	      [
	      {text: 'Ок!', onPress: () => console.log('Ask me late r pressed')}
	      ],{ cancelable: false })
	  }
	    })
	    .catch(error => {
	      console.log(error);
	    });
    } else{

if(this.state.username.length!=18){
  this.setState({
    phone_err:'1'
  })
} else{
  this.setState({
    phone_err:''
  })
}
      Alert.alert(
         'Проверьте поля'
      )

    }
	}
	onChangeText(text) {
		this.setState({
			username:text
		})
	}

	render() {
		return (
			<Container>
				<Header hasTabs>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Регистрация</Title>
					</Body>
					<Right />
				</Header>

				<Tabs>
					<Tab heading="Физ. лицо">
					{/*	<RegFiz />*/}
					<InputScrollView  style={styles.container}>
						<Label style={styles.myLabel}>Сотовый</Label>
            <TextInputMask
            underlineColorAndroid="transparent"
 style={( this.state.phone_err=='1' ) ? styles.inputMask2 : styles.inputMask1}

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
				{		/*	 <TextInputMask  style={styles.inputMask}
							 onChangeText={this.onChangeText.bind(this)}
							 mask={"+7 ([000]) [000] [00] [00]"} />*/}
						<Form type={User}
							 ref={c => this._form = c}
							 options={options1}/>

                              <Button style={styles.myLinks} onPress={ ()=> Linking.openURL('http://legco.kz/files/agreement.pdf') } transparent>
                              <Text>Пользовательское соглашение</Text>
                              </Button>
                              <Button style={styles.myLinks} onPress={ ()=> Linking.openURL('http://legco.kz/files/policy.pdf') } transparent >
                              <Text>Политика конфиденциальности</Text>
                              </Button>
                              <Button style={styles.myLinks} onPress={ ()=> Linking.openURL('http://legco.kz/files/paid.pdf') } transparent >
                              <Text>Соглашение об оказании платных услуг через веб-сервис сделки LegCo</Text>
                              </Button>
						<Button block onPress={this.handleSubmit.bind(this)} >
							 <Text>Зарегистрироваться</Text>
						</Button>
					 </InputScrollView>
					</Tab>
					<Tab heading="Индиви. предпр.">
          <InputScrollView  style={styles.container}>
            <Label style={styles.myLabel}>Сотовый</Label>
            {/*   <TextInputMask  style={styles.inputMask}
               onChangeText={this.onChangeText.bind(this)}
               mask={"+7 ([000]) [000] [00] [00]"} />*/}
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
            <Form type={IP}
               ref={ip => this._form = ip}
               options={options}/>

               <Button style={styles.myLinks} onPress={ ()=> Linking.openURL('http://legco.kz/files/agreement.pdf') } transparent>
               <Text>Пользовательское соглашение</Text>
               </Button>
               <Button style={styles.myLinks} onPress={ ()=> Linking.openURL('http://legco.kz/files/policy.pdf') } transparent >
               <Text>Политика конфиденциальности</Text>
               </Button>
               <Button style={styles.myLinks} onPress={ ()=> Linking.openURL('http://legco.kz/files/paid.pdf') } transparent >
               <Text>Соглашение об оказании платных услуг через веб-сервис сделки LegCo</Text>
               </Button>
            <Button block onPress={this.handleSubmitIp.bind(this)} >
               <Text>Зарегистрироваться</Text>
            </Button>
           </InputScrollView>
					</Tab>
				</Tabs>

			</Container>
		);
	}
}

export default BasicTab;
