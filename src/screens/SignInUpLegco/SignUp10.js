import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Header, Title, Button, Icon, Tabs, Tab, Right, Left, Body, View,
Label, Item, Input, Picker,TextInput ,
AppRegistry, StyleSheet, Text} from 'native-base';
var {TouchableHighlight } = React;
//import TextInputMask from 'react-native-text-input-mask';
import DatePicker from 'react-native-datepicker'
import styles from './styles';
import InputScrollView from 'react-native-input-scroll-view';
var t = require('tcomb-form-native');
import moment from 'moment';
import axios from 'react-native-axios';
const Form = t.form.Form;

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
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
  return s.toString().length == 9;
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
  nameip: t.String,
  noregip: t.Number,
  dateregIP: t.Date,
  addressregip: t.String,
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
       label: 'Дата гос. регистрации ИП',
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
    nameip: {
			label: 'Наименование ИП'
		},
    noregip: {
			label: 'Номер свидетельства о гос. регистрации ИП'
		},
    dateregip: DateRegIp,
    addressregip: {
			label: 'Адрес регистрации'
		},
		terms: {
			label: 'Пользовательское соглашение',
      error: 'Вы не приняли пользовательское соглашение.'
		}
  },
  stylesheet: formStyles
};
class BasicTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.myAlert=  this.myAlert.bind(this)
  }
  myAlert ()  {
    Alert.alert(
'Поздравляем!',
'Вы успешно прошли регистрацию.',
[
{text: 'Ок!', onPress: () => this.props.navigation.navigate('SignIn')}
],
{ cancelable: false }
)

  }
	handleSubmit = () => {
		const value = this._form.getValue(); // use that ref to get the form value
		if (value) {
      const formData = `person=${JSON.stringify(value)}&username=${this.state.username}`;
      axios.post('https://sdelkibackend.herokuapp.com/api/signupip',formData,{
          responseType: 'json',
          headers: {
            'Cosntent-type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          if (res.data.message==='Поздравляем! Вы успешно прошли регистрацию в роли Физ. лица.'
          || res.data.message==='Поздравляем! Вы успешно прошли регистрацию в роли ИП.'){
              console.log('ua tut')
              this.myAlert()
      } else {
        Alert.alert('Что-то пошло не так','ываыва',
          [
          {text: 'Ок!', onPress: () => console.log('Ask me late r pressed')}
          ],{ cancelable: false })
      }
        })
        // .then(function (response) {
        //     console.log(response.data.message, 'reees');
        //   if (res.data.message==='Поздравляем! Вы успешно прошли регистрацию в роли Физ. лица.'
        //         || res.data.message==='Поздравляем! Вы успешно прошли регистрацию в роли ИП.'){
        //       console.log('ua tut')
        //           Alert.alert(
        //   'Поздравляем!',
        //   'Вы успешно прошли регистрацию!',
        //   [
        //     {text: 'Ок!', onPress: () => console.log('Ask me later pressed')}
        //   ],
        //   { cancelable: false }
        // )
        //
        //         }
        // })
        .catch(error => {
          console.log(error);
        });
    }
  }
  onChangeText(text) {
    this.setState({
      username:text
    })
  }

	render() {
		return (
			<InputScrollView  style={styles.container}>
      <Label style={styles.myLabel}>Сотовый</Label>
       <TextInputMask  style={styles.inputMask}
        onChangeText={this.onChangeText.bind(this)}
        mask={"+7 ([000]) [000] [00] [00]"} />
       <Form type={User}
       ref={c => this._form = c}
       options={options}/>
				<Button block onPress={this.handleSubmit} >
					<Text>Зарегистрироваться</Text>
				</Button>
	 </InputScrollView>
		);
	}
}


export default BasicTab;
