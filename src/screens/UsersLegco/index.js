import React, { Component } from "react";
import MyKontragents from "./MyKontragents"
import {
  Badge,
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon
} from "native-base";

import styles from "./styles";

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: true,
      tab4: false,
      selectedTab: 'tab1'
    };
  }

  toggleTab1() {
    this.setState({
      selectedTab: 'tab1',
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
  }

  toggleTab2() {
    this.setState({
      selectedTab: 'tab2',
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
  }

  toggleTab3() {
    this.setState({
      selectedTab: 'tab3',
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
  }

  toggleTab4() {
    this.setState({
      selectedTab: 'tab4',
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
  }
  renderSelectedTab () {
    switch (this.state.selectedTab) {
      case 'tab1':
        return (<MyKontragents/>);
        break;
      case 'tab2':
        return (<Text>tab2</Text>);
        break;
      case 'tab3':
        return (<Text>tab3</Text>);
        break;
      case 'tab4':
          return (<Text>tab4</Text>);
          break;
      default:
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Мои Контрагенты</Title>
          </Body>
          <Right />
        </Header>

        <Content padder >
        {this.renderSelectedTab()}
        </Content>

        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.setState({selectedTab: 'tab1'})}>
              <Icon active={this.state.tab1} name="ios-people-outline" />
              <Text>Контакты</Text>
            </Button>
            <Button active={this.state.tab2} onPress={() => this.props.navigation.navigate("AddKontragents")}>
              <Icon active={this.state.tab2} name="add-circle" />
              <Text>Добавить</Text>
            </Button>
            <Button active={this.state.tab3} onPress={() => this.props.navigation.navigate("MyRequests")}>

              <Icon active={this.state.tab3} name="ios-swap" />
              <Text>Заявки</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Basic;
