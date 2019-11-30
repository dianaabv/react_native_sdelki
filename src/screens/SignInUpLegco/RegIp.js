import React, { Component } from 'react';

import { Container, Content, Text, View, Body, Form, Item, Label,
Input,
Button, Picker
 } from 'native-base';

import TextInputMask from 'react-native-text-input-mask';
import DatePicker from 'react-native-datepicker'
import styles from './styles';
import InputScrollView from 'react-native-input-scroll-view';

export default class TabOne extends Component {
	// eslint-disable-line
  constructor(props) {

  super(props);
  this.state = {message: '',
  pass_err: '',
  email_err: '',
  udv_err: '',
  iin_err: '',
  username_err:'',
  midname: '',

    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    udv: "",
    issuedby: "",
    iin: "",
    address: "",
    dob_month: '',
    dob_day: '',
    dob_year: '',
    issueddate_day: '',
    issueddate_month: '',
    issueddate_year: '',
  isChecked: false,
  valid_err: []
};
this.changePerson = this.changePerson.bind(this)
}
changePerson(event){
  const {name, type, value} = event.nativeEvent;
    let processedData = value;
    console.log(processedData)
    if(type==='text') {
    processedData = value.toUpperCase();
} else if (type==='number') {
    processedData = value * 2;
}
    this.setState({[name]: processedData})
}

	render() {
		// eslint-disable-line
    console.log(this.state.firstname, 'fd')

		return (
      <InputScrollView>
      <Label style={styles.myLabel}>Сотовый</Label>
      <TextInputMask  name='username' value={this.state.username}
          onChangeText={(username) => this.setState({username})}
       style={styles.inputMask} mask={"+7 ([000]) [000] [00] [00]"}
/>
      <Item stackedLabel>
      <Label>Имя</Label>
<Input  name='firstname' type="text" value={this.state.firstname}  onChange={this.changePerson} />
      </Item>
      <Item stackedLabel>
      <Label    >Фамилия</Label>
        <Input name='lastname' type="text"  value={this.state.lastname}  onChange={this.changePerson} />
      </Item>

        <Item stackedLabel >
          <Label>Очество(не обяз.)</Label>
          <Input name='midname' type="text" value={this.state.midname} onChange={this.changePerson} />
        </Item>
        <Item stackedLabel >
          <Label>Email</Label>
          <Input />
        </Item>
        <Item stackedLabel >
          <Label>Пароль</Label>
          <Input secureTextEntry={true} />
        </Item>
        <Item stackedLabel >
          <Label>Повторный пароль</Label>
          <Input secureTextEntry={true} />
        </Item>
          <Label style={styles.myLabel}>Дата Рождения</Label>
          <Item  >
            <DatePicker
            style={{flex: 1, paddingTop: 15, paddingBottom: 15
            }}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"

              confirmBtnText="Выберите дату"
              cancelBtnText="Отменить"
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </Item>
          <Item stackedLabel >
            <Label>№ Удостоверения личности</Label>
            <Input/>
          </Item>
          <Item stackedLabel >
            <Label>Орган выдавший уд-ние личности</Label>
            <Picker>
              <Picker.Item label="МВД РК" value="java" />
              <Picker.Item label="Министерство юстиции Республики Казахстан" value="js" />
            </Picker>
          </Item>
          <Label style={styles.myLabel}>Дата выдачи уд-ния личности</Label>
          <Item  >
            <DatePicker
            style={{flex: 1, paddingTop: 15, paddingBottom: 15
            }}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"

              confirmBtnText="Выберите дату"
              cancelBtnText="Отменить"
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </Item>
          <Item stackedLabel >
            <Label>ИИН</Label>
            <Input />
          </Item>
          <Item stackedLabel >
            <Label>Адрес регистрации</Label>
            <Input />
          </Item>
          <Item stackedLabel >
            <Label>Наименование ИП</Label>
            <Input />
          </Item>
          <Item stackedLabel >
            <Label>№ сивдетельства о гос регстрации ИП</Label>
            <Input />
          </Item>
          <Label style={styles.myLabel}>Дата гос регистрации ИП</Label>
          <Item  >
            <DatePicker
            style={{flex: 1, paddingTop: 15, paddingBottom: 15
            }}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"

              confirmBtnText="Выберите дату"
              cancelBtnText="Отменить"
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </Item>
          <Item stackedLabel >
            <Label>Адрес регистрации в качестве ИП</Label>
            <Input />
          </Item>
          <Button block style={{ margin: 15, marginTop: 50 }}>
            <Text>Зарегистрироваться</Text>
          </Button>
      </InputScrollView>

		);
	}
}
