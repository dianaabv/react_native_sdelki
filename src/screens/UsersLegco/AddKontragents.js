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
        users: [],
        allusers: [],
        myKey:''
    }
    this.handleSearch=this.handleSearch.bind(this);
    this.addtofriend = this.addtofriend.bind(this)

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
  axios.get('https://sdelkibackend.herokuapp.com/api/searchmykontragents',{
    responseType: 'json',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${this.state.myKey}`
  }
  }).then(res => {
      this.setState({
       allusers: res.data.allusers
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
//  console.log(a, 'a')
}

    handleSearch(event){
      var users= this.state.allusers
      var searchQuery = event.toLowerCase();
      if(searchQuery){
        var usr_arr= []
        var users1 = this.state.allusers.filter(function(el){
          var udv =' '+ el.udv
          var username =' '+ el.username
          if(el.firstname.toLowerCase().startsWith(searchQuery)){
            return el.firstname.toLowerCase().startsWith(searchQuery);
          }
          else if(el.lastname.toLowerCase().startsWith(searchQuery)){
            return el.lastname.toLowerCase().startsWith(searchQuery);
          }

          else if(udv.startsWith(' '+searchQuery) ){
            return udv.startsWith(' '+searchQuery)
          }
          else if(username.startsWith(' '+searchQuery) ){
            return username.startsWith(' '+searchQuery)
          }
        });
        this.setState({
          users: users1
        });
      } else {
        this.setState({
          users: []
        });
      }
    }

  render() {
    //console.log(this.state.allusers, 'allusers')
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item  >
            <Icon active name="search" />
            <Input placeholder="Search"  onChangeText={(value) => this.handleSearch(value)}/>
            <Icon active name="people" />
          </Item>
      {/*    <Button transparent>
            <Text>Search</Text>
          </Button>*/}
        </Header>

        <Content padder>
        <Text>Поиск может быть совершен по № Удостоверения личности, Фамилии, Имени, либо по номеру сотового телефона без плюса.</Text>
        <List
          dataArray={this.state.users}
          renderRow={data =>
            <ListItem>
              <Text>{data.firstname} {data.lastname}</Text>
              <Right>
              <Button value={data._id} onPress={(value) => this.addtofriend(data._id)} >
                <Icon  name="add" />
                </Button>
              </Right>
            </ListItem>}
        />
        </Content>
        <Footer>
          <FooterTab>
            <Button active full onPress={() => this.props.navigation.goBack()}>
              <Text>Назад</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default NHSearchbar;
