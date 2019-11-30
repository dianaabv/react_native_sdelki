import React, { Component } from 'react';

import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Icon,
	List,
	ListItem,
	Text,
	Left,
	Right,
	Body,
	Separator,
  View,
  Spinner,
  Item,
  Input
} from 'native-base';
import styles from './styles';
import jwtDecode from 'jwt-decode';
import {AsyncStorage, Alert} from 'react-native';
import axios from 'react-native-axios';

class NHListSeparator extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: [],
      user: {},
      myKey: '',
      person: {
    firstname: "",
    lastname: "",
    midname: "",
    // email: "",
    udv: "",
    issuedby: "",
    iin: "",
    address: ""
},
toChange: false,
isRegular: true,
email_err:'',
udv:'',
iin:''
    }
this.getKey = this.getKey.bind(this)
this.dateFormat = this.dateFormat.bind(this)
  this.changeRender = this.changeRender.bind(this)
    this.changePerson = this.changePerson.bind(this)
  }
  changePerson(text, myfield){
     const field = myfield;
     const person = this.state.person;
     person[field] = text;
     console.log(this.state.person, 'pp')
     if(field =='udv'){
         if(String(this.state.person.udv).length!=9){
             this.setState({
                 udv_err: '№ Удостоверения личности должен состоять из 9 цифр'
             })
         } else{
             this.setState({
                 udv_err: ''
             })
         }

     }
     if(field =='iin'){
         if(String(this.state.person.iin).length!=12){
             this.setState({
                 iin_err: 'ИИН должен состоять из 12 цифр'
             })
         } else{
             this.setState({
                 iin_err: ''
             })
         }

     }
     if(field== 'email'){
         var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         var test = re.test(this.state.person.email);
         if(!test) {
             this.setState({
                 email_err: 'Неправильный формат почты. '
             })
         } else{
             this.setState({
                 email_err: ''
             })
         }
     }
 }
  changeRender(){
    this.setState({
      toChange: !this.state.toChange,
      isRegular: !this.state.isRegular
    })
  }
  componentDidMount(){
      this.getKey()
  }
  async getKey() {
     try {
       //return await AsyncStorage.getItem('@MySuperStore:key');
      const value = await AsyncStorage.getItem('@MySuperStore:key');
        var decoded = jwtDecode(value);
        this.setState({myKey: value, status1: decoded.userstatus});
        this.getInfoDeal()
     } catch (error) {
       console.log("Error retrieving data" + error);
     }
   }
 getInfoDeal(){

     axios.get('https://sdelkibackend.herokuapp.com/api/getmydashboard',{
     responseType: 'json',
     headers: {
       'Content-type': 'application/x-www-form-urlencoded',
       'Authorization': `bearer ${this.state.myKey}`
       }
       }).then(res => {
         console.log(res.data.user)
           this.setState({
            user: res.data.user
           });
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
dateFormat(date){
   var time = date.substring(11, 19)
   var fDate = new Date(date);

   var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
   var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
   return d + "/" + m + "/" + fDate.getFullYear() +'-'+ time
 }

	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>История сделки</Title>
					</Body>
					<Right />
				</Header>

				<Content padder>
        {(Object.keys(this.state.user).length != 0)?(
                <Content>
                <Text style={styles.myFont1}>Имя</Text>
                <Item disabled regular={!this.state.isRegular}>
                  <Input disabled={!this.state.toChange}
                  onChangeText={(text) => this.changePerson(text, 'firstname')}
                  defaultValue={this.state.user.firstname}
                  placeholder={this.state.user.firstname}  />
                </Item>
                <Text style={styles.myFont1}>Фамилия</Text>
                <Item disabled regular={!this.state.isRegular}>
                  <Input disabled={!this.state.toChange}
                  onChangeText={(text) => this.changePerson(text, 'lastname')}
                  defaultValue={this.state.user.lastname}
                  placeholder={this.state.user.lastname}  />
                </Item>
                <Text style={styles.myFont1}>Фамилия</Text>
                <Item disabled regular={!this.state.isRegular}>
                  <Input disabled={!this.state.toChange}
                  onChangeText={(text) => this.changePerson(text, 'lastname')}
                  defaultValue={this.state.user.lastname}
                  placeholder={this.state.user.lastname}  />
                </Item>
                <Text style={styles.myFont1}>Отчество</Text>
                <Item disabled regular={!this.state.isRegular}>
                  <Input disabled={!this.state.toChange}
                  onChangeText={(text) => this.changePerson(text, 'midname')}
                  defaultValue={this.state.user.midname}
                  placeholder={this.state.user.midname}  />
                </Item>
                <Text style={styles.myFont1}>Email</Text>
                <Item disabled regular={!this.state.isRegular}>
                  <Input disabled={!this.state.toChange}
                  onChangeText={(text) => this.changePerson(text, 'email')}
                  defaultValue={this.state.user.email}
                  placeholder={this.state.user.email}  />
                </Item>
                <Text style={styles.myFont1}>№ Удостоверения личности</Text>
                <Item disabled regular={!this.state.isRegular}>
                  <Input disabled={!this.state.toChange}
                  onChangeText={(text) => this.changePerson(text, 'udv')}
                  defaultValue={this.state.user.udv}
                  placeholder={this.state.user.udv}  />
                </Item>
                <Text style={styles.myFont1}>№ Удостоверения личности</Text>
                <Item disabled regular={!this.state.isRegular}>
                  <Input disabled={!this.state.toChange}
                  onChangeText={(text) => this.changePerson(text, 'udv')}
                  defaultValue={this.state.user.udv}
                  placeholder={this.state.user.udv}  />
                </Item>


                {(this.state.toChange)?(
                  <Button block onPress={() => this.changeRender()}><Text>Отменить изменения</Text></Button>):(
                <Button block onPress={() => this.changeRender()}><Text>Внести изменения</Text></Button>
                )}
				</Content>
      ):(
          <Spinner color="blue" />
      )}
      </Content>
			</Container>
		);
	}
}

export default NHListSeparator;
