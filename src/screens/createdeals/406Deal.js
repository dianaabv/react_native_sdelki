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
  H1,
  H2,
  H3,
} from 'native-base';
var t = require('tcomb-form-native');
const Form = t.form.Form;
import axios from 'react-native-axios';
import moment from 'moment';
import {AsyncStorage, Alert} from 'react-native';
import styles from './styles';
import jwtDecode from 'jwt-decode';
const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      position: null,
      left:null,
      right:null,
      paddingTop: 7,
      paddingBottom: 7,
      fontSize:15,
      paddingLeft: null,
      color: "#575757"
    },
    error: {
      color: '#a94442',
      fontSize: 15,
    }
  }
}

let myFormatFunction = (format,date) =>{
         return moment(date).format(format);
     }
     var DUEDATE = {
         label: 'Срок действия договора',
         mode:'date',
         config:{
             format:(date) => myFormatFunction("DD MMM YYYY",date)
         },
         minimumDate:moment(new Date().setDate(new Date().getDate() + 1)).toDate()
     };
     var work_deadline = {
         label: 'Срок выполнения работ',
         mode:'date',
         config:{
             format:(date) => myFormatFunction("DD MMM YYYY",date)
         },
         minimumDate:moment(new Date().setDate(new Date().getDate() + 1)).toDate()
     };
const options = {
    auto: 'none',
    fields: {
    itemname:{
      label: "Наименование (ассортимент) товара"
    },
    quantity:{
      label: "Количество товара"
    },
    price:{
      label: "Цена товара (тенге)"
    },
    payday:{
      label: "Сроки и порядок оплаты товара"
    },
    getbackday:{
      label: "Сроки и порядок передачи товара"
    },
    quality:{
      label: "Качество товара"
    },

    description:{
      label: "Характеристика товара"
    },
    state:{
      label: "Cостояние товара (б/у или новое)"
    },
    expire:{
      label: "Срок годности товара/гарантии (если применимо)"
    },
    complexity:{
      label: "Комплектность товара (если применимо)"
    },


    deadline:{
      label: "Сроки и порядок обмена имуществом"
    },
    duedate: DUEDATE,
		additional:{
			label: "Дополнительные условия (не обяз.)"
		},
    seller:{
      label: 'Продавец'
    },
    buyer:{
      label: 'Покупатель'
    },
		ipOrFiz: {
      label: 'Ваша роль в этой сделке'
    },
  },
  stylesheet: formStyles
}
const Role = t.enums({
  'seller': 'Продавцом',
  'buyer': 'Покупателем'
});
const State = t.enums({
  'Б/У': 'Б/У',
'Новое': 'Новое'
});
var Gender = t.enums({
  fiz: 'Физическое лицо',
  ip: 'Индивидуальный предприниматель'
});
class NHListSeparator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      type: this.getType({}),
      kontragents: [],
      myKey: '',
      kontr_ids: {},
			lawid: '406',
			status1: '',
      status: 'Физическое лицо',
    };
  this.onChange =  this.onChange.bind(this)
  this.getType =  this.getType.bind(this)
};

  componentDidMount() {
    this.getKey()
  //  console.log(a, 'a')
  }
  async getKey() {
     try {
       //return await AsyncStorage.getItem('@MySuperStore:key');
      const value = await AsyncStorage.getItem('@MySuperStore:key');
			  var decoded = jwtDecode(value);
        this.setState({myKey: value,  status1: decoded.userstatus});
        this.getMyKontr()
       // return value;
     } catch (error) {
       console.log("Error retrieving data" + error);
     }
   }
  getMyKontr(){
    axios.get('https://sdelkibackend.herokuapp.com/api/getmykontragents',{
    responseType: 'json',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${this.state.myKey}`
    }
    }).then(res => {
      var arr= res.data.kontragents
      var result={}
      for (var i=0, len=arr.length; i < len; i++) {
      result[arr[i].myfriend._id] = arr[i].myfriend.firstname + ' '+ arr[i].myfriend.lastname ;
      }
      //console.log(result); // {11: "1000", 22: "2200"}
        this.setState({
         kontr_ids:result,
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
  // returns the suitable type based on the form value
  getType(value) {
    if (value.Role === 'seller' && this.state.status1=='Физическое Лицо') {
      return t.struct({
        Role: Role,
        buyer: t.enums(this.state.kontr_ids),
        itemname: t.String,
        quantity: t.String,
        price: t.String,
        payday: t.String,
        getbackday:t.String,
        quality: t.String,
        description: t.String,
        state: State,
        expire: t.maybe(t.String),
        complexity: t.maybe(t.String),

        duedate: t.Date,
        additional: t.maybe(t.String)
      });
    } else if (value.Role === 'buyer' && this.state.status1=='Физическое Лицо' ) {
      return t.struct({
        Role: Role,
        seller: t.enums(this.state.kontr_ids),
        itemname: t.String,
        quantity: t.String,
        price: t.String,
        payday: t.String,
        getbackday:t.String,
        quality: t.String,
        description: t.String,
        state: State,
        expire: t.maybe(t.String),
        complexity: t.maybe(t.String),


        duedate: t.Date,
        additional: t.maybe(t.String)
      });
    } else if (value.Role === 'seller' && this.state.status1=='Индивидуальный предприниматель' ) {
      return t.struct({
        Role: Role,
        buyer: t.enums(this.state.kontr_ids),
        itemname: t.String,
        quantity: t.String,
        price: t.String,
        payday: t.String,
        getbackday:t.String,
        quality: t.String,
        description: t.String,
        state: State,
        expire: t.maybe(t.String),
        complexity: t.maybe(t.String),

        duedate: t.Date,
        additional: t.maybe(t.String),
				ipOrFiz: Gender
      });
    } else if (value.Role === 'buyer' && this.state.status1=='Индивидуальный предприниматель' ) {
      return t.struct({
        Role: Role,
        seller: t.enums(this.state.kontr_ids),
        itemname: t.String,
        quantity: t.String,
        price: t.String,
        payday: t.String,
        getbackday:t.String,
        quality: t.String,
        description: t.String,
        state: State,
        expire: t.maybe(t.String),
        complexity: t.maybe(t.String),


        duedate: t.Date,
        additional: t.maybe(t.String),
				ipOrFiz: Gender
      });
    }
		else {
      return t.struct({
        Role: Role
      });
    }
  }

  onChange(value) {
    const type = value.Role !== this.state.value.Role ?
      this.getType(value) :
      this.state.type;
    this.setState({ value, type });
  }
	updateDeal(formData){
  axios.post('https://sdelkibackend.herokuapp.com/create/createdeal406',formData,{
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
					'Договор купли-продажи',
					this.state.message,
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
myNext(value){
	if(value.seller){

		var buyer = jwtDecode(this.state.myKey)
		const formData = `deal406=${JSON.stringify(value)}&seller=${value.seller}&buyer=${buyer.sub}&duedate=${value.duedate}&lawid=${this.state.lawid}&status=${this.state.status}`;
		this.updateDeal(formData)
	} else{
		var seller = jwtDecode(this.state.myKey)
		const formData = `deal406=${JSON.stringify(value)}&seller=${seller.sub}&buyer=${value.buyer}&duedate=${value.duedate}&lawid=${this.state.lawid}&status=${this.state.status}`;
		this.updateDeal(formData)
	}
}
  onPress() {
    var value = this.refs.form.getValue();

    if (value) {
			if(value.ipOrFiz){
				if(value.ipOrFiz == 'ip'){
					this.setState({
						status: 'Индивидуальный предприниматель'
					}, () => {
            this.myNext(value);
        });
				} else {
					this.setState({
						status: 'Физическое лицо'
					}, () => {
            this.myNext(value);
        	});
				}
			} else{
				this.myNext(value);
			}
    }
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
						<Text style={styles.metext}>Договор купли-продажи</Text>
					</Body>
					<Right />
				</Header>
        <Content  style={styles.mb10}>
        <Text>Предмет договора:</Text>
        <Text>Продавец передает, а Покупатель обязуется принять товар (имущество), указанный в настоящем договоре, на условиях, предусмотренных настоящим договором.</Text>
				<Text style={styles.myred}>Внимание:</Text>
				<Text style={styles.myred}>При выборе недвижимого имущества (дом, квартира, офис, помещение и т.д.) сделка должна быть выполнена в письменном виде и зарегистрирована в установленном законодательством порядке</Text>
				{(this.state.kontragents.length ==0)?(
					  <Content>
						<Text></Text>
						<Text></Text>
						<Text>У вас нет контрагентов.</Text>
					<Button onPress={(value) => this.props.navigation.navigate('AddKontragents')} transparent>
				<Text>Добавить контрагентов</Text>
					 </Button>
				   </Content>):(<Text></Text>)}
				<Text>Я являюсь</Text>
        <t.form.Form
  ref="form"
  type={this.state.type}
  value={this.state.value}
  onChange={this.onChange}
  options={options}
/>
<Button block onPress={this.onPress.bind(this)} >
   <Text>Продолжить</Text>
</Button>
				</Content>
			</Container>
		);
	}
}

export default NHListSeparator;
