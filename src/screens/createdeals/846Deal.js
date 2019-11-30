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

{/*
	const User =  t.struct({
  transportableproperty: t.String,
  shippingaddress: t.String,
  payday: t.String,
  deliveryaddress: t.String,
  recipientofproperty: t.String,
  shippingday: t.Date,
  shippingprice: t.String,

  duedate: t.Date,
	additional: t.maybe(t.String),

});
*/}
let myFormatFunction = (format,date) =>{
         return moment(date).format(format);
     }
     var DOB = {
    //    const today=new Date();
    // today.setDate(today.getDate() + 1)
label: 'Срок хранения',
         mode:'date',
         config:{
             format:(date) => myFormatFunction("DD MMM YYYY",date)
         },
         minimumDate:moment(new Date().setDate(new Date().getDate() + 1)).toDate()
     };
     var DUEDATE = {
         label: 'Срок действия договора',
         mode:'date',
         config:{
             format:(date) => myFormatFunction("DD MMM YYYY",date)
         },
         minimumDate:moment(new Date().setDate(new Date().getDate() + 1)).toDate()
     };
     var TDATE = {
         label: 'Срок поручения',
         mode:'date',
         config:{
             format:(date) => myFormatFunction("DD MMM YYYY",date)
         },
         minimumDate:moment(new Date().setDate(new Date().getDate() + 1)).toDate()
     };
const options = {
    auto: 'none',
  fields: {
    description:{
      label: "Описание поручаемых действий"
    },
    termofassignment:TDATE,
    priceaward:{
      label: "Размер вознаграждения поверенного (тенге)"
    },
    payday:{
      label: "Сроки и порядок оплаты вознаграждения"
    },
    rules:{
      label: "Указания доверителя"
    },
    duedate: DUEDATE,
		additional:{
			label: "Дополнительные условия (не обяз.)"
		},
    principal:{
      label: 'Доверитель'
    },
    attorney:{
      label: 'Поверенный'
    },
		ipOrFiz: {
      label: 'Ваша роль в этой сделке'
    },
  },
  stylesheet: formStyles
}
const Role = t.enums({
  'principal': 'Доверителем',
  'attorney': 'Поверенным'
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
			lawid: '846',
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
    if (value.Role === 'principal' && this.state.status1=='Физическое Лицо') {
      return t.struct({
        Role: Role,
        attorney: t.enums(this.state.kontr_ids),
        description: t.String,
        termofassignment: t.Date,
        priceaward: t.String,
        payday: t.String,
        rules: t.String,


        duedate: t.Date,
        additional: t.maybe(t.String)
      });
    } else if (value.Role === 'attorney' && this.state.status1=='Физическое Лицо' ) {
      return t.struct({
        Role: Role,
        principal: t.enums(this.state.kontr_ids),
        description: t.String,
        termofassignment: t.Date,
        priceaward: t.String,
        payday: t.String,
        rules: t.String,

        duedate: t.Date,
        additional: t.maybe(t.String)
      });
    } else if (value.Role === 'principal' && this.state.status1=='Индивидуальный предприниматель' ) {
      return t.struct({
        Role: Role,
        attorney: t.enums(this.state.kontr_ids),
        description: t.String,
        termofassignment: t.Date,
        priceaward: t.String,
        payday: t.String,
        rules: t.String,

        duedate: t.Date,
        additional: t.maybe(t.String),
				ipOrFiz: Gender
      });
    } else if (value.Role === 'attorney' && this.state.status1=='Индивидуальный предприниматель' ) {
      return t.struct({
        Role: Role,
        principal: t.enums(this.state.kontr_ids),
        description: t.String,
        termofassignment: t.Date,
        priceaward: t.String,
        payday: t.String,
        rules: t.String,

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

  // getInitialState() {
  //   const value = {};
  //   return { value, type: this.getType(value) };
  // },

  onChange(value) {
    const type = value.Role !== this.state.value.Role ?
      this.getType(value) :
      this.state.type;
    this.setState({ value, type });
  }
	updateDeal(formData){
		axios.post('https://sdelkibackend.herokuapp.com/create/createdeal846',formData,{
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
					'Договор поручения',
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
	if(value.principal){
		var attorney = jwtDecode(this.state.myKey)
		const formData = `deal846=${JSON.stringify(value)}&principal=${value.principal}&attorney=${attorney.sub}&duedate=${value.duedate}&termofassignment=${value.termofassignment}&lawid=${this.state.lawid}&status=${this.state.status}`;
    //console.log(formData,'ff111')
		this.updateDeal(formData)
	} else{
		var principal = jwtDecode(this.state.myKey)
		const formData = `deal846=${JSON.stringify(value)}&principal=${principal.sub}&attorney=${value.attorney}&duedate=${value.duedate}&termofassignment=${value.termofassignment}&lawid=${this.state.lawid}&status=${this.state.status}`;
    //console.log(formData,'ff222')
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
    // console.log(this.state.status1)
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Text style={styles.metext}>Договор поручения</Text>
					</Body>
					<Right />
				</Header>
        <Content  style={styles.mb10}>
        <Text>Договор поручения:</Text>
        <Text >Поверенный обязуется совершить от имени и за счет другой стороны Доверителя, определенные юридические действия на условиях, указанных в настоящем договоре. По сделке, совершенной поверенным, права и обязанности возникают непосредственно у Доверителя.</Text>
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
