import React, { Component } from "react";

import {
  Container,
  Header,
  Button,
  Icon,
  Item,
  Input,
  Content,
  Text,
  Footer,
  FooterTab,
  List,
  ListItem,
  Right

} from "native-base";
import axios from 'react-native-axios';

import styles from "./styles";
import {AsyncStorage, Alert} from 'react-native';

class NHSearchbar extends Component {
  // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
        message: '',
        kontragents: [],
        users: [],
        myKey:''
    }
    this.handleSearch=this.handleSearch.bind(this);
}
addtofriend(event){
  axios.get('https://sdelkibackend.herokuapp.com/api/addtofriend?friend_id='+event,{
    responseType: 'json',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${this.state.myKey}`
  }
  }).then(res => {
    if(res.data.message.length != 0){
      this.setState({ message: res.data.message});
      console.log(res.data)
      Alert.alert(
        'Запрос отправлен.',
        res.data.message,
        [
        {text: 'Ок!', onPress: () => this.props.navigation.navigate('MyRequests')}
        ],
        { cancelable: false }
      )
      // swal({text: this.state.message}).then(function(){
      //   browserHistory.push('/kontragentrequest');
      //   window.location.reload()})
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
}
getMyKontr(){
  axios.get('https://sdelkibackend.herokuapp.com/api/getmykontragents',{
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${this.state.myKey}`
    }
    }).then(res => {
        this.setState({
          users: res.data.kontragents,
         kontragents: res.data.kontragents
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
async getKey() {
   try {
     //return await AsyncStorage.getItem('@MySuperStore:key');
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    //return await value
     // console.log(value, 'vv')
      this.setState({myKey: value});
      this.getMyKontr()
     // return value;
   } catch (error) {
     console.log("Error retrieving data" + error);
   }
 }
componentDidMount() {
  this.getKey()
}

    handleSearch(event){
      var searchQuery = event.toLowerCase();
 if(searchQuery){
   var users = this.state.kontragents.filter(function(el){
     var searchValue = el.myfriend.firstname.toLowerCase()  + ' '+ el.myfriend.lastname.toLowerCase()  + ' '+ el.myfriend.udv
     //console.log(searchValue)
     return searchValue.indexOf(searchQuery)!== -1;
   });
   this.setState({
     users: users
   });
 }
  else {
   this.setState({
     users: this.state.kontragents
   });
 }
    }

  render() {
    return (
      <Container style={styles.container}>
        {/*     <Header searchBar rounded>
     <Item  >
                <Icon active name="search" />
            <Input placeholder="Search"  onChangeText={(value) => this.handleSearch(value)}/>
            <Icon active name="people" />
          </Item>
      {/*    <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>*/}

        <Content >
        <List
          dataArray={this.state.users}
          renderRow={data =>
            <ListItem>
              <Text>{data.myfriend.firstname} {data.myfriend.lastname}</Text>
            </ListItem>}
        />
        </Content>

      </Container>
    );
  }
}

export default NHSearchbar;
