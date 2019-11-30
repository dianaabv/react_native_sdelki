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
      myKey: '',
      reason: ''
    }
this.getKey = this.getKey.bind(this)
this.dateFormat = this.dateFormat.bind(this)
this.denyDealReason=this.denyDealReason.bind(this)
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

       axios.post('https://sdelkibackend.herokuapp.com/api/gethistorydeal',formData,{
         responseType: 'json',
         headers: {
           'Content-type': 'application/x-www-form-urlencoded',
           'Authorization': `bearer ${this.state.myKey}`
       }
       }).then(res => {
           this.setState({
            time: res.data.time
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
   denyDealReason(){
     const params  = this.props.navigation.state;
    // console.log(params.params.dealid)
    //  console.log(this.state.reason)
     const formData = `deal_id=${params.params.dealid}&reason=${this.state.reason}`
  axios.post('https://sdelkibackend.herokuapp.com/api/denydeal',formData,{
    responseType: 'json',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${this.state.myKey}`
  }
  }).then(res => {
      this.setState({
       message: res.data.message
      });
  Alert.alert(
    'Сделки LegCo',
    res.data.message,
    [
    {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
    ],
    { cancelable: false }
  )
     // swal({text: this.state.message}).then(function(){window.location.reload()})
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
        <Text>Укажите причину по которой вы хотите аннулировать сделку.</Text>
        <Item >
          <Input
          onChangeText={(text) => this.setState({reason: text})}

            />
        </Item>
        <Button block onPress={() => this.denyDealReason()}><Text>Подтвердить</Text></Button>



				</Content>
			</Container>
		);
	}
}

export default NHListSeparator;
