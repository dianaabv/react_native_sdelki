import React, { Component } from "react";
import DatePicker from 'react-native-datepicker'
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H2,
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
  ListItem,Item, Input,Spinner, IconNB,
  Card, CardItem
} from "native-base";
import jwtDecode from 'jwt-decode';
import {AsyncStorage, Alert} from 'react-native';
import axios from 'react-native-axios';
import styles from "./styles";
var myKey=''
class SegmentNB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: 1,
      shippingday: '',
      duedate: '',
      message: '',
      myKey: '',
      dealid: '',
      lawid: '688',
      deal: {},
      olddeal: {},
      status: '',
      status1:'',
      dealstatus: '',
      acceptor_status: '',
      create_as_ip: '',
      toChange: false,
      isRegular: true,
      deal688: {
              сarrier: '',
              sender: '',
              transportableproperty: '',
              payday: '',
              shippingaddress: '',
              deliveryaddress: '',
              recipientofproperty: '',
              shippingprice: '',
              additional: ''
      }
    };
    this.getInfoDeal = this.getInfoDeal.bind(this)
    this.getKey = this.getKey.bind(this)
    this.changeRender = this.changeRender.bind(this)
    this.deal688 = this.deal688.bind(this)
    this.updateDeal688 = this.updateDeal688.bind(this)
  }
  deal688(text, myfield){
   const field = myfield;
   const deal688 = this.state.deal688;
   deal688[field] = text;
  }
  updateDeal688(){
  const formData = `deal688=${JSON.stringify(this.state.deal688)}&deal_id=${this.state.deal.deal_id}&duedate=${this.state.duedate}&shippingday=${this.state.shippingday}`
    axios.post('https://sdelkibackend.herokuapp.com/update/updateDeal688',formData, {
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
        'Договор Перевозки',
        res.data.message,
        [
        {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
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
  });
}

componentDidMount() {
  this.getKey()
  const params  = this.props.navigation.state;
  const formData = `lawid=${this.state.lawid}&dealid=${params.params.dealid}`;
  axios.post('https://sdelkibackend.herokuapp.com/api/getinfodeal',formData, {
      responseType: 'json',
      headers: {
          'Content-type': 'application/x-www-form-urlencoded'
      }
  })
  .then(res => {
    this.setState({deal: res.data.deal});
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

//this.getInfoDeal()
}
changeRender(){
  this.setState({
    toChange: !this.state.toChange,
    isRegular: !this.state.isRegular
  })
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
   const formData = `lawid=${this.state.lawid}&dealid=${params.params.dealid}`;
//console.log(formData, 'formData')
//     axios.post('https://sdelkibackend.herokuapp.com/api/getinfodeal',formData, {
//         responseType: 'json',
//         headers: {
//             'Content-type': 'application/x-www-form-urlencoded'
//         }
//     })
//     .then(res => {
//       this.setState({deal: res.data.deal}, function () {
//     console.log(this.state.deal);
// });
//     })
//     .catch(err => {
//     if (err.response) {
//       const errors = err.response ? err.response : {};
//       errors.summary = err.response.data.message;
//       this.setState({
//         errors
//       });
//     }
//     });
    axios.get('https://sdelkibackend.herokuapp.com/api/getmystatus?deal_id='+params.params.dealid,{
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${this.state.myKey}`
        }
        }).then(res => {
          console.log(res.data,'1234')
          this.setState({
           status: res.data.status,
           dealstatus: res.data.dealstatus,
           acceptor_status: res.data.acceptor_status,
           create_as_ip: res.data.create_as_ip
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
    // так нельзя делать убери перенеси в info 715
    axios.post('https://sdelkibackend.herokuapp.com/api/getolddeal', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${this.state.myKey}`
      }
      }).then(res => {
        this.setState({
         olddeal: res.data.olddeal
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
     var fDate = new Date(date);
     var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
     var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
     return d + "/" + m + "/" + fDate.getFullYear()
   }
   denyDeny(){
  var deal_id=this.state.deal.deal_id
    axios.get('https://sdelkibackend.herokuapp.com/api/denydeny?deal_id='+deal_id,{
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${this.state.myKey}`
    }
    }).then(res => {
        Alert.alert(
          'Договор Перевозки',
          res.data.message,
          [
          {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
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
    });
 }
 getDenyReason(){
  var deal_id=this.state.deal.deal_id
    axios.get('https://sdelkibackend.herokuapp.com/api/getdenyreason?deal_id='+deal_id,{
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${this.state.myKey}`
    }
    }).then(res => {
        Alert.alert(
          'Договор Перевозки',
          res.data.message,
          [
          {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
          ],
          { cancelable: false }
        )
        //swal({title: "Причина отмены сделки контрагента: ", text: this.state.message})
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
 acceptDeny(){
 var deal_id=this.state.deal.deal_id
   axios.get('https://sdelkibackend.herokuapp.com/api/acceptdeny?deal_id='+deal_id,{
     responseType: 'json',
     headers: {
       'Content-type': 'application/x-www-form-urlencoded',
       'Authorization': `bearer ${Auth.getToken()}`
   }
   }).then(res => {
       this.setState({
        message: res.data.message
       });
       Alert.alert(
         'Договор Перевозки',
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
denyDeny(){
 var deal_id=this.state.deal.deal_id
   axios.get('https://sdelkibackend.herokuapp.com/api/denydeny?deal_id='+deal_id,{
     responseType: 'json',
     headers: {
       'Content-type': 'application/x-www-form-urlencoded',
       'Authorization': `bearer ${Auth.getToken()}`
   }
   }).then(res => {
       Alert.alert(
         'Договор Перевозки',
         res.data.message,
         [
         {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
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
   });
}
acceptDeal(){
   // console.log(this.state.status)
   var deal_id=this.state.deal.deal_id
   const formData = `deal_id=${deal_id}&status=${'Физическое Лицо'}`
   axios.post('https://sdelkibackend.herokuapp.com/api/acceptdeal',formData,{
     responseType: 'json',
     headers: {
       'Content-type': 'application/x-www-form-urlencoded',
       'Authorization': `bearer ${this.state.myKey}`
   }
   }).then(res => {
     Alert.alert(
       'Договор Перевозки',
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
acceptDealIp(){
 this.setState({
   status: 'Индивидуальный предприниматель'
 })
 var deal_id=this.state.deal.deal_id
 const formData = `deal_id=${deal_id}&status=${this.state.status}`
   axios.post('https://sdelkibackend.herokuapp.com/api/acceptdeal',formData,{
     responseType: 'json',
     headers: {
       'Content-type': 'application/x-www-form-urlencoded',
       'Authorization': `bearer ${this.state.myKey}`
   }
   }).then(res => {
     Alert.alert(
       'Договор Перевозки',
       res.data.message,
       [
       {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
       ],
       { cancelable: false }
     )
       // this.setState({
       //  message: res.data.message
       // });
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
  render() {

    if(!this.state.deal.sender ){
return(<Spinner color="blue" />)
} else{
  // status: res.data.status,
  // dealstatus: res.data.dealstatus,
  // acceptor_status: res.data.acceptor_status,
  // create_as_ip
  function compareDeals(new_deal, old_deal) {
  return Object.keys(new_deal).reduce(function(map1, k){
  if(new_deal[k]!=old_deal[k]) {
    map1[k]=old_deal[k];
  }
  return map1;
  }, {})
}
var z = compareDeals(this.state.olddeal, this.state.deal)
var objKeys=Object.keys(z)
  return (
    <Container>
      <Header hasTabs>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate("DealsLegco")}>
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
          <Text>Текущие</Text>
        </Button>
        <Button
          last
          active={this.state.seg === 2 ? true : false}
          onPress={() => this.setState({ seg: 2 })}
        >
          <Text>Устаревшие</Text>
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
          <H2 style={styles.myFont}>Договор перевозки</H2>

         <Text style={styles.myFont1}>Отправитель</Text>
          <Item disabled>
            <Input disabled
            placeholder={this.state.deal.sender.firstname+ ' '+ this.state.deal.sender.lastname}  />
            <IconNB name="ios-information-circle" />
          </Item>
          <Text style={styles.myFont1}>Перевозчик</Text>
          <Item disabled>
            <Input disabled
            placeholder={this.state.deal.сarrier.firstname+ ' '+ this.state.deal.сarrier.lastname}  />
              <IconNB name="ios-information-circle" />
          </Item>

          <Text style={styles.myFont1}>Перевозимое имущество</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled={!this.state.toChange}
             onChangeText={(text) => this.deal688(text, 'transportableproperty')}
            defaultValue={this.state.deal.transportableproperty}
            placeholder={this.state.deal.transportableproperty}  />
          </Item>
          <Text style={styles.myFont1}>Адрес отправки</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled={!this.state.toChange}
            onChangeText={(text) => this.deal688(text, 'shippingaddress')}
            defaultValue={this.state.deal.shippingaddress}
            placeholder={this.state.deal.shippingaddress}  />
          </Item>
          <Text style={styles.myFont1}>Адрес доставки</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled={!this.state.toChange}
            onChangeText={(text) => this.deal688(text, 'deliveryaddress')}
            defaultValue={this.state.deal.deliveryaddress}
            placeholder={this.state.deal.deliveryaddress}  />
          </Item>
          <Text style={styles.myFont1}>Получатель имущества</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled={!this.state.toChange}
            onChangeText={(text) => this.deal688(text, 'recipientofproperty')}
            defaultValue={this.state.deal.recipientofproperty}
            placeholder={this.state.deal.recipientofproperty}  />
          </Item>
          <Text style={styles.myFont1}>Срок доставки</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled

            placeholder={this.dateFormat(this.state.deal.shippingday)}  />
            {(this.state.toChange)?(
              <DatePicker

       mode="date"

       format="YYYY-MM-DD"

       confirmBtnText="Confirm"
       cancelBtnText="Cancel"


         // ... You can check the source to find the other keys.

       onDateChange={(date) => {this.setState({shippingday: date})}}
     />

   ):(<Text></Text>)}
          </Item>
          <Text style={styles.myFont1}>Цена доставки  (тенге)</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled={!this.state.toChange}
            onChangeText={(text) => this.deal688(text, 'shippingprice')}
            defaultValue={this.state.deal.shippingprice}
            placeholder={this.state.deal.shippingprice}  />
          </Item>
          <Text style={styles.myFont1}>Порядок оплаты</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled={!this.state.toChange}
            onChangeText={(text) => this.deal688(text, 'payday')}
            defaultValue={this.state.deal.payday}
            placeholder={this.state.deal.payday}  />
          </Item>
          <Text style={styles.myFont1}>Срок действия договора</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled
            placeholder={this.dateFormat(this.state.deal.duedate)}  />
            {(this.state.toChange)?(
              <DatePicker

       mode="date"

       format="YYYY-MM-DD"

       confirmBtnText="Confirm"
       cancelBtnText="Cancel"


         // ... You can check the source to find the other keys.

       onDateChange={(date) => {this.setState({duedate: date})}}
     />

   ):(<Text></Text>)}
          </Item>
          <Text style={styles.myFont1}>Дополнительные условия (не обязательное ус-ие)</Text>
          <Item disabled regular={!this.state.isRegular}>
            <Input disabled={!this.state.toChange}
            onChangeText={(text) => this.deal688(text, 'additional')}
            defaultValue={this.state.deal.additional}
            placeholder={this.state.deal.additional}  />
          </Item>
<Content style={styles.myMarg}>
{(this.state.create_as_ip.length==0)?(
  (this.state.status=='acceptor' && this.state.acceptor_status=='requested')?(
    <Button block onPress={() => this.acceptDeal()}><Text>Принять текущие условия сделки как  Физ. лицо</Text></Button>):(<Text></Text>)
    (this.state.status=='acceptor' && this.state.acceptor_status=='requested' && this.state.status1=='Индивидуальный предприниматель')?(
    <Button block onPress={() => this.acceptDealIp()}><Text>Принять текущие условия сделки как ИП</Text></Button>):(<Text></Text>)
):(
  (this.state.create_as_ip=='accept_as_ip')?(

  (this.state.status=='acceptor' && this.state.acceptor_status=='requested' && this.state.status1=='Индивидуальный предприниматель' && this.state.create_as_ip=='accept_as_ip')?(
      <Button  block onPress={() => this.acceptDealIp()}>
      <Text>Принять текущие условия сделки как  ИП</Text></Button>):(<Text></Text>)
  ):(
    (this.state.status=='acceptor' && this.state.acceptor_status=='requested')?(<Button block onPress={() => this.acceptDeal()}>
      <Text>Принять текущие условия сделки как Физ. лицо</Text></Button>):(<Text></Text>)
  )
)}
</Content>

          {(this.state.toChange)?(<Button block onPress={() => this.updateDeal688()}><Text>Подтвердить изменения</Text></Button>):(
            (this.state.dealstatus=='requested')?(<Button block onPress={() => this.changeRender()}><Text>Внести изменения</Text></Button>):(<Text></Text>)
          )}
          {/*      допиши досрочное расторжение */}
          {(this.state.dealstatus=='accepted')?(<Button block  onClick={this.onOpenModal} ><Text>Досрочное расторжение договора</Text></Button>):(<Text></Text>)}

          {(this.state.dealstatus=='requested')?(<Button block onPress={() => this.changeRender()} onPress={() => this.denyDeal()} ><Text>Отклонить сделку</Text></Button>):(<Text></Text>)}
          {(this.state.status=='acceptor' && this.props.acceptor_status=='requested_deny')?(<Button block onPress={() => this.getDenyReason()} ><Text>Просмотреть причину отмены сделки</Text></Button>):(<Text></Text>)}
          {(this.state.status=='acceptor' && this.props.acceptor_status=='requested_deny')?(<Button block onPress={() => this.acceptDeny()} ><Text>Принять запрос на расторжение cделки</Text></Button>):(<Text></Text>)}
          {(this.state.status=='acceptor' && this.props.acceptor_status=='requested_deny')?(<Button block onPress={() => this.denyDeny()} ><Text>Отклонить запрос на расторжение сделки</Text></Button>):(<Text></Text>)}


          </Content>
        }


        {this.state.seg === 2 &&
        <Content>
        <Card style={styles.mb}>
          <CardItem>
            <Body>
              <Text>
                В поля со значком <IconNB name="md-create" /> внесены изменения 
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Text style={styles.myFont1}>Отправитель</Text>
         <Item disabled>
           <Input disabled
           placeholder={this.state.deal.sender.firstname+ ' '+ this.state.deal.sender.lastname}  />

         </Item>
         <Text style={styles.myFont1}>Перевозчик</Text>
         <Item disabled>
           <Input disabled
           placeholder={this.state.deal.сarrier.firstname+ ' '+ this.state.deal.сarrier.lastname}  />

         </Item>

         <Text style={styles.myFont1}>Перевозимое имущество</Text>
         <Item disabled >
           <Input disabled
           defaultValue={this.state.deal.transportableproperty}
           placeholder={this.state.deal.transportableproperty}  />
           {objKeys.includes("transportableproperty")? <IconNB name="md-create" />:<Text></Text>}

         </Item>
         <Text style={styles.myFont1}>Адрес отправки</Text>
         <Item disabled regular={!this.state.isRegular}>
           <Input disabled
           defaultValue={this.state.deal.shippingaddress}
           placeholder={this.state.deal.shippingaddress}  />
            {objKeys.includes("shippingaddress")? <IconNB name="md-create" />:<Text></Text>}
         </Item>
         <Text style={styles.myFont1}>Адрес доставки</Text>
         <Item disabled regular={!this.state.isRegular}>
           <Input disabled
           defaultValue={this.state.deal.deliveryaddress}
           placeholder={this.state.deal.deliveryaddress}  />
           {objKeys.includes("deliveryaddress")? <IconNB name="md-create" />:<Text></Text>}
         </Item>
         <Text style={styles.myFont1}>Получатель имущества</Text>
         <Item disabled regular={!this.state.isRegular}>
           <Input disabled
           defaultValue={this.state.deal.recipientofproperty}
           placeholder={this.state.deal.recipientofproperty}  />
           {objKeys.includes("recipientofproperty")? <IconNB name="md-create" />:<Text></Text>}
         </Item>
         <Text style={styles.myFont1}>Срок доставки</Text>
         <Item disabled >
           <Input disabled

           placeholder={this.dateFormat(this.state.deal.shippingday)}  />
           {objKeys.includes("shippingday")? <IconNB name="md-create" />:<Text></Text>}
         </Item>
         <Text style={styles.myFont1}>Цена доставки  (тенге)</Text>
         <Item disabled >
           <Input disabled

           defaultValue={this.state.deal.shippingprice}
           placeholder={this.state.deal.shippingprice}  />
           {objKeys.includes("shippingprice")? <IconNB name="md-create" />:<Text></Text>}
         </Item>
         <Text style={styles.myFont1}>Порядок оплаты</Text>
         <Item disabled >
           <Input disabled

           defaultValue={this.state.deal.payday}
           placeholder={this.state.deal.payday}  />
           {objKeys.includes("payday")? <IconNB name="md-create" />:<Text></Text>}
         </Item>
         <Text style={styles.myFont1}>Срок действия договора</Text>
         <Item disabled regular={!this.state.isRegular}>
           <Input disabled
           placeholder={this.dateFormat(this.state.deal.duedate)}  />
           {objKeys.includes("duedate")? <IconNB name="md-create" />:<Text></Text>}
         </Item>
         <Text style={styles.myFont1}>Дополнительные условия (не обязательное ус-ие)</Text>
         <Item style={styles.mygreen} disabled regular={!this.state.isRegular}>
           <Input disabled
           defaultValue={this.state.deal.additional}
           placeholder={this.state.deal.additional}  />
         {objKeys.includes("additional")? <IconNB name="md-create" />:<Text></Text>}
         </Item>

        </Content>
              }
      </Content>
    </Container>
  );
}

  //  console.log(this.state.deal.sender, 'sss')
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Мои сделка</Title>
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
            <Text>Текущие</Text>
          </Button>
          <Button
            last
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}
          >
            <Text>Устаревшие</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.seg === 1 &&
            <Content>
            <H2 style={styles.myFont}>Договор перевозки</H2>
            <Text style={styles.myFont1}>Отправитель</Text>
            </Content>
          }


          {this.state.seg === 2 &&
          <Content>
                  </Content>
                }
        </Content>
      </Container>
    );
  }
}

export default SegmentNB;
