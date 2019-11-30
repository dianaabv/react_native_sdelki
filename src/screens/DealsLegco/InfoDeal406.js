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
import {AsyncStorage, Alert, Picker, TextInput} from 'react-native';
import axios from 'react-native-axios';
import styles from "./styles";
var myKey=''

class SegmentNB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: 1,
      workdeadline: '',
      duedate: '',
      message: '',
      myKey: '',
      dealid: '',
      lawid: '406',
      deal: {},
      olddeal: {},
      status: '',
      status1:'',
      dealstatus: '',
      acceptor_status: '',
      create_as_ip: '',
      toChange: false,
      isRegular: true,
      deal406: {
        seller: '',
        buyer: '',
        itemname: '',
        quantity: '',
        price: '',
        payday: '',
        getbackday:'',
        quality: '',
        description: '',
        state: '',
        expire: '',
        complexity: '',
        additional:''
      },
    };
    this.getInfoDeal = this.getInfoDeal.bind(this)
    this.getKey = this.getKey.bind(this)
    this.changeRender = this.changeRender.bind(this)
    this.deal406 = this.deal406.bind(this)
    this.updateDeal = this.updateDeal.bind(this)
  }
  deal406(text, myfield){
   const field = myfield;
   const deal406 = this.state.deal406;
   deal406[field] = text;
  }
  updateDeal(){


  const formData = `deal406=${JSON.stringify(this.state.deal406)}&deal_id=${this.state.deal.deal_id}&duedate=${this.state.duedate}&lawid=${this.state.lawid}`
    axios.post('https://sdelkibackend.herokuapp.com/update/updateDeal406',formData, {
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
        this.state.deal.deal_name,
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
    axios.get('https://sdelkibackend.herokuapp.com/api/getmystatus?deal_id='+params.params.dealid,{
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${this.state.myKey}`
        }
        }).then(res => {
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
          this.state.deal.deal_name,
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
 denyDeal() {
 var deal_id=this.state.deal.deal_id
 const formData = `deal_id=${deal_id}&reason=${this.state.reason}`
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
         this.state.deal.deal_name,
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
          'Причина отмены',
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
       'Authorization': `bearer ${this.state.myKey}`
   }
   }).then(res => {
       this.setState({
        message: res.data.message
       });
       Alert.alert(
         this.state.deal.deal_name,
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
       'Authorization': `bearer ${this.state.myKey}`
   }
   }).then(res => {
       Alert.alert(
         this.state.deal.deal_name,
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
       this.state.deal.deal_name,
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
       this.state.deal.deal_name,
       res.data.message,
       [
       {text: 'Ок!', onPress: () => this.props.navigation.navigate('DealsLegco')}
       ],
       { cancelable: false }
     )
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
          <Title>{this.state.deal.deal_name}</Title>
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

{(Object.keys(this.state.deal).length != 0 && this.state.status.length != 0)?(
<Content>
<H2 style={styles.myFontH}>{this.state.deal.deal_name}</H2>

<Text style={styles.myFont1}>Покупатель</Text>
<Item disabled>
  <Input disabled
  multiline={true}
  placeholder={this.state.deal.buyer.firstname+ ' '+ this.state.deal.buyer.lastname}  />
  <IconNB name="ios-information-circle" />
</Item>
<Text style={styles.myFont1}>Продавец</Text>
<Item disabled>
  <Input disabled
  multiline={true}
  placeholder={this.state.deal.seller.firstname+ ' '+ this.state.deal.seller.lastname}  />
    <IconNB name="ios-information-circle" />
</Item>

<Text style={styles.myFont1}>Наименование (ассортимент) товара</Text>

<TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3}
editable={!this.state.isRegular}
multiline={true}
 onChangeText={(text) => this.deal406(text, 'itemname')}
defaultValue={this.state.deal.itemname}
placeholder={this.state.deal.itemname}  />

{/*<Item disabled regular={!this.state.isRegular}>
  <Input disabled={!this.state.toChange}
  multiline={true}
   onChangeText={(text) => this.deal406(text, 'itemname')}
  defaultValue={this.state.deal.itemname}
  placeholder={this.state.deal.itemname}  />
</Item>*/}
<Text style={styles.myFont1}>Количество товара</Text>

  <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
  multiline={true}
  onChangeText={(text) => this.deal406(text, 'quantity')}
  defaultValue={this.state.deal.quantity}
  placeholder={this.state.deal.quantity}  />

<Text style={styles.myFont1}>Цена товара, тенге</Text>

    <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
    multiline={true}
    onChangeText={(text) => this.deal406(text, 'price')}
    defaultValue={this.state.deal.price}
    placeholder={this.state.deal.price}  />

<Text style={styles.myFont1}>Сроки и порядок оплаты товара</Text>

    <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
    multiline={true}
    onChangeText={(text) => this.deal406(text, 'payday')}
    defaultValue={this.state.deal.payday}
    placeholder={this.state.deal.payday}  />

<Text style={styles.myFont1}>Сроки и порядок передачи товара</Text>

    <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
    multiline={true}
    onChangeText={(text) => this.deal406(text, 'getbackday')}
    defaultValue={this.state.deal.getbackday}
    placeholder={this.state.deal.getbackday}  />

<Text style={styles.myFont1}>Качество товара</Text>

    <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
    multiline={true}
    onChangeText={(text) => this.deal406(text, 'quality')}
    defaultValue={this.state.deal.quality}
    placeholder={this.state.deal.quality}  />

<Text style={styles.myFont1}>Характеристика товара</Text>

  <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
  multiline={true}
   onChangeText={(text) => this.deal406(text, 'description')}
  defaultValue={this.state.deal.description}
  placeholder={this.state.deal.description}  />

<Text style={styles.myFont1}>Cостояние товара (б/у или новое)</Text>

  <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
  multiline={true}
   onChangeText={(text) => this.deal406(text, 'state')}
  defaultValue={this.state.deal.state}
  placeholder={this.state.deal.state}  />

<Text style={styles.myFont1}>Cрок годности товара/гарантии (если применимо)</Text>

  <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
  multiline={true}
   onChangeText={(text) => this.deal406(text, 'expire')}
  defaultValue={this.state.deal.expire}
  placeholder={this.state.deal.expire}  />

<Text style={styles.myFont1}>Комплектность товара (если применимо)</Text>

  <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
  multiline={true}
   onChangeText={(text) => this.deal406(text, 'complexity')}
  defaultValue={this.state.deal.complexity}
  placeholder={this.state.deal.complexity}  />


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

onDateChange={(date) => {this.setState({duedate: date})}}
/>

):(<Text></Text>)}
</Item>
<Text style={styles.myFont1}>Дополнительные условия (не обязательное ус-ие)</Text>

  <TextInput style={[ !this.state.isRegular? styles.myInputBorder : styles.myInput]} numberOfLines = {3} editable={!this.state.isRegular}
  multiline={true}
  onChangeText={(text) => this.deal406(text, 'additional')}
  defaultValue={this.state.deal.additional}
  placeholder={this.state.deal.additional}  />

<Content>
{(this.state.create_as_ip.length==0)?(
<Content>
{(this.state.status=='acceptor' && this.state.acceptor_status=='requested')?(
  <Button block onPress={() => this.acceptDeal()}><Text>Принять текущие условия сделки как  Физ. лицо</Text></Button>):(<Text></Text>)}
  {(this.state.status=='acceptor' && this.state.acceptor_status=='requested' && this.state.status1=='Индивидуальный предприниматель')?(
  <Button block onPress={() => this.acceptDealIp()}><Text>Принять текущие условия сделки как ИП</Text></Button>):(<Text></Text>)}
  </Content>
):(
<Content>
{(this.state.create_as_ip=='accept_as_ip')?(
  <Content>
  {(this.state.status=='acceptor' && this.state.acceptor_status=='requested' && this.state.status1=='Индивидуальный предприниматель' && this.state.create_as_ip=='accept_as_ip')?(
      <Button  block onPress={() => this.acceptDealIp()}>
      <Text>Принять текущие условия сделки как  ИП</Text></Button>):(<Text></Text>)}
  </Content>
):(
  <Content>
  {(this.state.status=='acceptor' && this.state.acceptor_status=='requested')?(<Button block onPress={() => this.acceptDeal()}>
    <Text>Принять текущие условия сделки как Физ. лицо</Text></Button>):(<Text></Text>)}
</Content>
)}
</Content>
)}
  </Content>
{(this.state.toChange)?(<Button block onPress={() => this.updateDeal()}><Text>Подтвердить изменения</Text></Button>):(
  (this.state.dealstatus=='requested' || this.state.dealstatus=='accepted')?(<Button block onPress={() => this.changeRender()}><Text>Внести изменения</Text></Button>):(<Text></Text>)
)}
{(this.state.dealstatus=='accepted')?(<Button block  onPress={(value) => this.props.navigation.navigate('denyDealReason', {dealid: this.state.deal.deal_id})}  ><Text>Досрочное расторжение договора</Text></Button>):(<Text></Text>)}
{(this.state.dealstatus=='requested')?(<Button block onPress={() => this.denyDeal()} ><Text>Отклонить сделку</Text></Button>):(<Text></Text>)}

{(this.state.status=='acceptor' && this.state.acceptor_status=='requested_deny')?(<Button style={styles.myPadding} block onPress={() => this.getDenyReason()} ><Text>Просмотреть причину отмены сделки</Text></Button>):(<Text></Text>)}
{(this.state.status=='acceptor' && this.state.acceptor_status=='requested_deny')?(<Button style={styles.myPadding} block onPress={() => this.acceptDeny()} ><Text>Принять запрос на расторжение cделки</Text></Button>):(<Text></Text>)}
{(this.state.status=='acceptor' && this.state.acceptor_status=='requested_deny')?(<Button style={styles.myPadding}  block onPress={() => this.denyDeny()} ><Text>Отклонить запрос на расторжение сделки</Text></Button>):(<Text></Text>)}
</Content>

):(
  <Spinner color="blue" />
)}


          </Content>
        }


        {this.state.seg === 2 &&
        <Content>
        {(Object.keys(this.state.olddeal).length != 0)?(
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
          <Text style={styles.myFont1}>Покупатель</Text>
          <Item disabled>
            <Input disabled
            multiline={true}
            placeholder={this.state.olddeal.buyer.firstname+ ' '+ this.state.olddeal.buyer.lastname}  />
            <IconNB name="ios-information-circle" />
          </Item>
          <Text style={styles.myFont1}>Продавец</Text>
          <Item disabled>
            <Input disabled
            multiline={true}
            placeholder={this.state.olddeal.seller.firstname+ ' '+ this.state.olddeal.seller.lastname}  />
              <IconNB name="ios-information-circle" />
          </Item>

          <Text style={styles.myFont1}>Наименование (ассортимент) товара</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.itemname}
            placeholder={this.state.olddeal.itemname}  />
            {objKeys.includes("itemname")? <IconNB name="md-create" />:<Text></Text>}
          </Item>
          <Text style={styles.myFont1}>Количество товара</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.quantity}
            placeholder={this.state.olddeal.quantity}  />
            {objKeys.includes("quantity")? <IconNB name="md-create" />:<Text></Text>}
          </Item>
          <Text style={styles.myFont1}>Цена товара, тенге</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.price}
            placeholder={this.state.olddeal.price}  />
            {objKeys.includes("price")? <IconNB name="md-create" />:<Text></Text>}
          </Item>
          <Text style={styles.myFont1}>Сроки и порядок оплаты товара</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.payday}
            placeholder={this.state.olddeal.payday}  />
            {objKeys.includes("payday")? <IconNB name="md-create" />:<Text></Text>}
          </Item>
          <Text style={styles.myFont1}>Сроки и порядок передачи товара</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.getbackday}
            placeholder={this.state.olddeal.getbackday}  />
            {objKeys.includes("getbackday")? <IconNB name="md-create" />:<Text></Text>}
          </Item>
          <Text style={styles.myFont1}>Качество товара</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.quality}
            placeholder={this.state.olddeal.quality}  />
            {objKeys.includes("quality")? <IconNB name="md-create" />:<Text></Text>}
          </Item>




          <Text style={styles.myFont1}>Характеристика товара</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.description}
            placeholder={this.state.olddeal.description}  />
            {objKeys.includes("description")? <IconNB name="md-create" />:<Text></Text>}
          </Item>
          <Text style={styles.myFont1}>Cостояние товара (б/у или новое)</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.state}
            placeholder={this.state.olddeal.state}  />
            {objKeys.includes("state")? <IconNB name="md-create" />:<Text></Text>}
          </Item>
          <Text style={styles.myFont1}>Срок годности товара/гарантии (если применимо)</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.expire}
            placeholder={this.state.olddeal.expire}  />
            {objKeys.includes("expire")? <IconNB name="md-create" />:<Text></Text>}
          </Item>
          <Text style={styles.myFont1}>Комплектность товара (если применимо)</Text>
          <Item disabled >
            <Input disabled={!this.state.toChange}
            multiline={true}
            defaultValue={this.state.olddeal.complexity}
            placeholder={this.state.olddeal.complexity}  />
            {objKeys.includes("complexity")? <IconNB name="md-create" />:<Text></Text>}
          </Item>

            <Text style={styles.myFont1}>Срок действия договора</Text>
            <Item disabled regular={!this.state.isRegular}>
              <Input disabled
              placeholder={this.dateFormat(this.state.olddeal.duedate)}  />
              {objKeys.includes("duedate")? <IconNB name="md-create" />:<Text></Text>}
            </Item>
            <Text style={styles.myFont1}>Дополнительные условия (не обязательное ус-ие)</Text>
            <Item disabled regular={!this.state.isRegular}>
              <Input disabled
              multiline={true}
              defaultValue={this.state.olddeal.additional}
              placeholder={this.state.olddeal.additional}  />
            {objKeys.includes("additional")? <IconNB name="md-create" />:<Text></Text>}
            </Item>


          </Content>

        ):(
            <Text>Пока нет изменений</Text>
        )}

        </Content>
              }
      </Content>
    </Container>
  );
//} //end of else

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
