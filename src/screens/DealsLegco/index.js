import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
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
  Icon,
   Card, CardItem, Thumbnail, IconNB
} from "native-base";
import {AsyncStorage, Alert} from 'react-native';

import axios from 'react-native-axios';
import styles from "./styles";




const deviceWidth = Dimensions.get("window").width;

const logo = require("../../../assets/hands.png");

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myKey:'',
      deals: [],
      deals1: [],
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      selectedTab: 'tab1'
    };
    this.getKey=this.getKey.bind(this)
    this.dateFormat=this.dateFormat.bind(this);
    this.dealRedirects=this.dealRedirects.bind(this);
    this.dealSatisfied = this.dealSatisfied.bind(this);
  }
  componentDidMount(){
		this.getKey();
	}
  dealSatisfied(deal_id){

    const formData = `deal_id=${deal_id}`;
            axios.post('https://sdelkibackend.herokuapp.com/api/needfinalsubmission', formData, {
              responseType: 'json',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${this.state.myKey}`
            }
            }).then(res => {
              // console.log(res.data)
              // this.setState({ satisfied:!this.state.satisfied})
              if(res.data.message.length!=0){
                Alert.alert(
                  'Cделки LegCo',
                  res.data.message,
                  [
                  {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
                  ],
                  { cancelable: false }
                )
              } else{
                this.props.navigation.navigate('DealFinal', {dealid: deal_id})
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
  dateFormat(date){
  var fDate = new Date(date);
  var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
  var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
  return d + "/" + m + "/" + fDate.getFullYear()
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
  dealRedirects(dealid, lawid){
    //console.log(this.props, 'dddddddd')
    switch (lawid) {
      case '688':
      return (this.props.navigation.navigate('InfoDeal688', {dealid: dealid}));
      break;
      case '768':
      return (this.props.navigation.navigate('InfoDeal768', {dealid: dealid}));
      break;
      case '865':
      return (this.props.navigation.navigate('InfoDeal865', {dealid: dealid}));
      break;
      case '616':
      return (this.props.navigation.navigate('InfoDeal616', {dealid: dealid}));
      break;
      case '506':
      return (this.props.navigation.navigate('InfoDeal506', {dealid: dealid}));
      break;
      case '715':
      return (this.props.navigation.navigate('InfoDeal715', {dealid: dealid}));
      break;
      case '683':
      return (this.props.navigation.navigate('InfoDeal683', {dealid: dealid}));
      break;
      case '604':
      return (this.props.navigation.navigate('InfoDeal604', {dealid: dealid}));
      break;
      case '540':
      return (this.props.navigation.navigate('InfoDeal540', {dealid: dealid}));
      break;
      case '846':
      return (this.props.navigation.navigate('InfoDeal846', {dealid: dealid}));
      break;
      case '501':
      return (this.props.navigation.navigate('InfoDeal501', {dealid: dealid}));
      break;
      case '406':
      return (this.props.navigation.navigate('InfoDeal406', {dealid: dealid}));
      break;
  default:
}
  }

  createPdf(dealid, lawid ){
  const formData = `lawid=${lawid}&dealid=${dealid}`;
  axios.post('https://sdelkibackend.herokuapp.com/pdf/createpdf',formData, {
        responseType: 'json',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `bearer ${this.state.myKey}`
        }
    })
    .then(res => {
        this.setState({
            message: res.data.message
        });
        Alert.alert(
          'Cправка LegCo.',
          res.data.message,
          [
          {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
          ],
          { cancelable: false }
        )
        //swal({text: this.state.message})
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
  renderSelectedTab () {

    switch (this.state.selectedTab) {
      case 'tab1':
        return (
          <Content  >
{(this.state.deals.length!=0)?(
  <Content  >
   {this.state.deals.map((deal, s) =>
     <Card key={s} style={styles.mb}>
               <CardItem bordered>
                 <Left>
                  <Thumbnail source={logo} />
                   <Body>
                     <Text>{deal.lawname}</Text>
                     <Text note>Срок действия договора: </Text><Text note>{this.dateFormat(deal.duedate)}</Text>
                   </Body>
                 </Left>
                 <Right>
                   <Button  onPress={(value) => this.props.navigation.navigate('DealTimeline', {dealid: deal._id, lawid: deal.lawid})}  transparent>
                     <Icon name="paper" />
                     <Text>История сделки</Text>
                   </Button>
                 </Right>

               </CardItem>

               <CardItem>
                 <Body>
                   <Text style={styles.myFont2}>Стороны договора:</Text>
                   <Text>{deal.side1.firstname} {deal.side1.lastname}</Text>
                   <Text>{deal.side2.firstname} {deal.side2.lastname}</Text>
                   <Text style={styles.myFont2}>Текущее состояние сделки:</Text>
                   {(deal.status=='denied')?(<Text>Сделка не заключена</Text>):(<Text></Text>)}
                   {(deal.status=='denied2')?(<Text>Сделка расторгнута</Text>):(<Text></Text>)}
                   {(deal.status=='finished')?(<Button onPress={(value) => this.dealSatisfied(deal._id, deal.lawid)} transparent>
                   <Text>Срок действия договора истек. Удовлетворены ли Вы исполнением сделки (обязательно)</Text>
                      </Button>):(<Text></Text>)}
                   {(deal.status=='accepted')?(<Text>Сделка вступила в силу </Text>):(<Text></Text>)}
                   {(deal.status=='completed')?(<Text>Сделка завершена</Text>):(<Text></Text>)}
                   {(deal.status=='requested')?(<Text>Сделка запрошена</Text>):(<Text></Text>)}
                   {(deal.status=='request_deny')?(<Text>Запрошено расторжение сделки</Text>):(<Text></Text>)}
                   {(deal.status=='dealdenied')?(<Text>Запроc на расторжение не принят. Cмотреть пункт 1 Обязательных условий любой сделки в Справке.</Text>):(<Text></Text>)}


                 </Body>
               </CardItem>
               <CardItem style={{ paddingVertical: 0 }}>
                 <Left>
                   <Button onPress={(value) => this.createPdf(deal._id, deal.lawid)} transparent>
                     <Icon name="md-document" />
                     <Text>Запросить cправку</Text>
                   </Button>
                 </Left>
                 <Left>
                   <Button  onPress={(value) => this.dealRedirects(deal._id, deal.lawid)}  transparent>
                     <Icon name="md-options" />
                     <Text>Просмотреть условия</Text>
                   </Button>
                 </Left>
               </CardItem>
             </Card>

   )}
   </Content>

):(
  <Text>У вас пока нет сделок</Text>
)}
          </Content>);
        break;
      case 'tab2':
        return (<Text>tab2</Text>);
        break;
      case 'tab3':
        return (

        				<Content >
                {(Object.keys(this.state.deals1).length != 0)?(
                  <Content  >
                   {this.state.deals1.map((deal, s) =>
                     <Card key={s} style={styles.mb}>
        				               <CardItem bordered>
        				                 <Left>
        				                  <Thumbnail source={logo} />
        				                   <Body>
        				                     <Text>{deal.lawname}</Text>
        				                     <Text note>Срок действия договора: </Text><Text note>{this.dateFormat(deal.duedate)}</Text>
        				                   </Body>
        				                 </Left>
        				                 <Right>
        				                   <Button  onPress={(value) => this.props.navigation.navigate('DealTimeline', {dealid: deal._id, lawid: deal.lawid})}  transparent>
        				                     <Icon name="paper" />
        				                     <Text>История сделки</Text>
        				                   </Button>
        				                 </Right>

        				               </CardItem>

        				               <CardItem>
        				                 <Body>
        				                   <Text style={styles.myFont2}>Стороны договора:</Text>
        				                   <Text>{deal.side1.firstname} {deal.side1.lastname}</Text>
        				                   <Text>{deal.side2.firstname} {deal.side2.lastname}</Text>
        				                   <Text style={styles.myFont2}>Текущие состояние сделки:</Text>
        				                   {(deal.status=='denied')?(<Text>Сделка расторгнута</Text>):(<Text></Text>)}
        				                   {(deal.status=='finished')?(<Button onPress={(value) => this.dealSatisfied(deal._id, deal.lawid)} transparent>
        				                   <Text>Срок действия договора истек. Удовлетворены ли Вы исполнением сделки (обязательно)? Cм. п. 2 Обязательных условий любой сделки в Справке.</Text>
        				                      </Button>):(<Text></Text>)}
        				                   {(deal.status=='accepted')?(<Text>Сделка вступила в силу </Text>):(<Text></Text>)}
        				                   {(deal.status=='completed')?(<Text>Сделка завершена</Text>):(<Text></Text>)}
        				                   {(deal.status=='requested')?(<Text>Сделка запрошена</Text>):(<Text></Text>)}
        				                   {(deal.status=='request_deny')?(<Text>Запрошено расторжение сделки</Text>):(<Text></Text>)}


        				                 </Body>
        				               </CardItem>
        				               <CardItem style={{ paddingVertical: 0 }}>
        				                 <Left>
        				                   <Button onPress={(value) => this.createPdf(deal._id, deal.lawid)} transparent>
        				                     <Icon name="md-document" />
        				                     <Text>Запросить cправку</Text>
        				                   </Button>
        				                 </Left>
        				                 <Left>
        				                   <Button  onPress={(value) => this.dealRedirects(deal._id, deal.lawid)}  transparent>
        				                     <Icon name="md-options" />
        				                     <Text>Просмотреть условия</Text>
        				                   </Button>
        				                 </Left>
        				               </CardItem>
        				             </Card>

                   )}
                   </Content>
                ):(
                      <Text>У вас пока нет завершенных сделок</Text>
                    )
            			}

                </Content>
          			);
        break;
      case 'tab4':
          return (<Text>tab4</Text>);
          break;
      default:
    }
  }
  async getKey() {
     try {
       const value = await AsyncStorage.getItem('@MySuperStore:key');
       console.log(value,'value1')
       this.setState({myKey: value});
       this.getMyDeals()
       this.getFinishedDeals()
     } catch (error) {
       console.log("Error retrieving data" + error);
     }
   }
   getFinishedDeals(){
     axios.get('https://sdelkibackend.herokuapp.com/api/getfinisheddeals',{
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${this.state.myKey}`
        }
        }).then(res => {
          this.setState({
           deals1: res.data.deals
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
   getMyDeals(){
     console.log(this.state.myKey, 'myKey')
     axios.get('https://sdelkibackend.herokuapp.com/api/getmydeals',{
responseType: 'json',
headers: {
  'Content-type': 'application/x-www-form-urlencoded',
  'Authorization': `bearer ${this.state.myKey}`
}
}).then(res => {
  this.setState({
   deals: res.data.deals
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
            <Title>Мои сделки</Title>
          </Body>
          <Right />
        </Header>

        <Content padder >
        {this.renderSelectedTab()}
        </Content>

        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
              <Icon active={this.state.tab1} name="ios-timer-outline" />
              <Text>Текущие</Text>
            </Button>
            <Button active={this.state.tab2} onPress={() => this.props.navigation.navigate("CreateDeal")}>
              <Icon active={this.state.tab2} name="add-circle" />
              <Text>Создать</Text>
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>

              <Icon active={this.state.tab3} name="done-all" />
              <Text>Заверш-ые</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Basic;
