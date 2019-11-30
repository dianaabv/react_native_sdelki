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

class NHListSeparator extends Component {
  constructor(props){
    super(props);
    this.state = {
      deals: [],
      myKey: ''
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
        this.setState({myKey: value});
        this.getInfoDeal()
     } catch (error) {
       console.log("Error retrieving data" + error);
     }
   }
   getInfoDeal(){
     axios.get('https://sdelkibackend.herokuapp.com/api/getfinisheddeals',{
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
dateFormat(date){
   var time = date.substring(11, 19)
   var fDate = new Date(date);

   var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
   var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
   return d + "/" + m + "/" + fDate.getFullYear() +'-'+ time
 }

	render() {
    console.log(this.state.deals)
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Завершенные сделки</Title>
					</Body>
					<Right />
				</Header>

				<Content padder>
        {(Object.keys(this.state.deals).length != 0)?(
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
				                   <Text style={styles.myFont2}>Текущие состояние сделки:</Text>
				                   {(deal.status=='denied')?(<Text>Сделка расторгнута</Text>):(<Text></Text>)}
				                   {(deal.status=='finished')?(<Button onPress={(value) => this.dealSatisfied(deal._id, deal.lawid)} transparent>
				                   <Text>Срок действия договора истек. Удовлетворены ли Вы исполнением сделки (обязательно)</Text>
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
			</Container>
		);
	}
}

export default NHListSeparator;
