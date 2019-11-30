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
  View
} from 'native-base';
import styles from './styles';
import jwtDecode from 'jwt-decode';
import {AsyncStorage, Alert} from 'react-native';
import axios from 'react-native-axios';
const datas = [
 {
   route: 'PersonalInfo',
   text: 'Редактировать личную информацию',
 },
 {
   route: 'Сменить пароль',
   text: 'Сменить пароль',
 },
 {
   route: 'Редактировать информацию по ИП ',
   text: 'Редактировать информацию по ИП ',
 }
];
const dataip = [
 {
   route: 'PersonalInfo',
   text: 'Редактировать личную информацию',
 },
 {
   route: 'Сменить пароль',
   text: 'Сменить пароль',
 },
 {
   route: 'Редактировать информацию по ИП ',
   text: 'Редактировать информацию по ИП ',
 }
];
class NHListSeparator extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      myKey: '',
      status1: ''
    }
this.getKey = this.getKey.bind(this)
this.dateFormat = this.dateFormat.bind(this)
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
     const params  = this.props.navigation.state;
     const formData = `lawid=${params.params.lawid}&dealid=${params.params.dealid}`;
       //
       // axios.post('https://sdelkibackend.herokuapp.com/api/gethistorydeal',formData,{
       //   responseType: 'json',
       //   headers: {
       //     'Content-type': 'application/x-www-form-urlencoded',
       //     'Authorization': `bearer ${this.state.myKey}`
       // }
       // }).then(res => {
       //     this.setState({
       //      time: res.data.time
       //     });
       // })
       // .catch(err => {
       //   if (err.response) {
       //     const errors = err.response ? err.response : {};
       //     errors.summary = err.response.data.message;
       //     this.setState({
       //       errors
       //     });
       //   }
       // });

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
        {(this.state.status1=='Физическое лицо')?(
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem button onPress={() => this.props.navigation.navigate(data.route)}>
                <Text>
                  {data.text}
                </Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        ):(
          <List
            dataArray={dataip}
            renderRow={data =>
              <ListItem button onPress={() => this.props.navigation.navigate(data.route)}>
                <Text>
                  {data.text}
                </Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        )}



				</Content>
			</Container>
		);
	}
}

export default NHListSeparator;
