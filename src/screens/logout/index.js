import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Spinner,
  Left,
  Right,
  Body
} from "native-base";
import {AsyncStorage} from 'react-native';
import styles from "./styles";
class NHSpinner extends Component {
  componentDidMount(){
    this.resetKey()
  }
  async resetKey() {
    try {
      await AsyncStorage.removeItem('@MySuperStore:key');
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.props.navigation.navigate('SignIn')
      //this.setState({myKey: value});
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }
  // eslint-disable-line

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Ожидайте</Title>
          </Body>
          <Right />

        </Header>

        <Content>
  {/*      <Spinner />
        <Spinner color="red" />
        <Spinner color="green" />*/}
          <Spinner color="blue" />
        </Content>
      </Container>
    );
  }
}

export default NHSpinner;
