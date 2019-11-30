import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Segment,
  List,
  ListItem,
} from "native-base";
import {AsyncStorage, Alert} from 'react-native';
import axios from 'react-native-axios';
import styles from "./styles";

class SegmentNB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: 1,
      message: '',
      in_requests: [],
      out_requests: [],
      myKey: ''
    };
    this.acceptfriendship = this.acceptfriendship.bind(this)
    this.refusefriendship = this.refusefriendship.bind(this)
  }
  acceptfriendship(event){
  axios.get('https://sdelkibackend.herokuapp.com/api/acceptfriendship?friend_id='+event,{
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
        'Успешно.',
        res.data.message,
        [
        {text: 'Ок!', onPress: () => this.props.navigation.navigate('UsersLegco')}
        ],
        { cancelable: false }
      )
      //
      //swal({text: this.state.message}).then(function(){window.location.reload()})
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
refusefriendship(event){
  axios.get('https://sdelkibackend.herokuapp.com/api/refusefriendship?friend_id='+event,{
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
        'Успешно.',
        res.data.message,
        [
        {text: 'Ок!', onPress: () => this.props.navigation.navigate('MyKontragents')}
        ],
        { cancelable: false }
      )
      //swal({text: this.state.message}).then(function(){window.location.reload()})
  })
  .catch(err => {
    if (err.response) {
      const errors = err.response ? err.response : {};
      errors.summary = err.response.data.message;
      this.setState({
        errors
      });
    }
  })
}
componentDidMount() {
  this.getKey()
}
async getKey() {
   try {
     //return await AsyncStorage.getItem('@MySuperStore:key');
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    //return await value
     // console.log(value, 'vv')
      this.setState({myKey: value});
      this.getmyrequests()
     // return value;
   } catch (error) {
     console.log("Error retrieving data" + error);
   }
 }
 getmyrequests(){
   console.log(this.state.myKey, 'this.state.myKey')
   axios.get('https://sdelkibackend.herokuapp.com/api/getmyrequests',{
responseType: 'json',
headers: {
  'Content-type': 'application/x-www-form-urlencoded',
  'Authorization': `bearer ${this.state.myKey}`
}
}).then(res => {
  this.setState({
   in_requests: res.data.in_requests,
   out_requests: res.data.out_requests
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
            <Title>Мои заявки</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Segment>
          <Button
            first
            active={this.state.seg === 1 ? true : false}
            onPress={() => this.setState({ seg: 1 })}
          >
            <Text>Входящие</Text>
          </Button>
          <Button
            last
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}
          >
            <Text>Исходящие</Text>
          </Button>
        </Segment>

        <Content padder>
{/*        {this.state.seg === 1 ?
          <Text>
            yes
          </Text>
          :
          <Text>
      no
          </Text>}
*/}
          {this.state.seg === 1 &&
            <Content>
      {/*      <Text>
              Входящие Selected
            </Text>*/}
          {this.state.in_requests.length !=0 ?
            <List
              dataArray={this.state.in_requests}
              renderRow={data =>
                <ListItem>
                <Button
                style={{
                        backgroundColor: "#5EB862"
                      }}
                 value={data.myfriend._id} onPress={(value) => this.acceptfriendship(data.myfriend._id)} >
                <Icon name="add" />
                </Button>

                  <Text>{data.myfriend.firstname} {data.myfriend.lastname}</Text>
                  <Right>
                  <Button danger
                  style={{
                    backgroundColor: "#d9534f",
                    marginRight: 10
                  }}
                  onPress={(value) => this.refusefriendship(data.myfriend._id)}
                  >
                    <Icon name="trash" />
                  </Button>
                  </Right>
                </ListItem>}
            />
              :
              <Text>
            У вас нет входящих заявок
              </Text>}
            </Content>
          }


          {this.state.seg === 2 &&
            <Content>
          {/*     <Text>
                  Исходящие Selected
                      </Text>*/}
                      {this.state.out_requests.length !=0 ?
                        <List
                          dataArray={this.state.out_requests}
                          renderRow={data =>
                            <ListItem>

                              <Text>{data.myfriend.firstname} {data.myfriend.lastname}</Text>

                            </ListItem>}
                        />
                          :
                          <Text>
                        У вас нет исходящих заявок
                          </Text>}
                  </Content>
                }
        </Content>
      </Container>
    );
  }
}

export default SegmentNB;
