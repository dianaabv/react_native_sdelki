import React, { Component } from 'react';

import { Container, Content, Text, View, Body, Form, Item, Label,
Input,
Button, Picker, ScrollView
 } from 'native-base';

import TextInputMask from 'react-native-text-input-mask';
import DatePicker from 'react-native-datepicker'
import styles from './styles';
import InputScrollView from 'react-native-input-scroll-view';
export default class TabOne extends Component {
	// eslint-disable-line

	render() {
		// eslint-disable-line
		return (
      <InputScrollView>
      <Label style={styles.myLabel}>Сотовый</Label>
      <TextInputMask  style={styles.inputMask} mask={"+7 ([000]) [000] [00] [00]"} />
      <Item stackedLabel>
      <Label>Имя</Label>
        <Input />
      </Item>
      <Item stackedLabel>
      <Label>Фамилия</Label>
        <Input />
      </Item>

        <Item stackedLabel >
          <Label>Очество(не обяз.)</Label>
          <Input />
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
          <Button block style={{ margin: 15, marginTop: 50 }}>
            <Text>Зарегистрироваться</Text>
          </Button>
      </InputScrollView>
		);
	}
}
