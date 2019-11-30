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
     var usedeadline = {
         label: 'Срок пользования имуществом',
         mode:'date',
         config:{
             format:(date) => myFormatFunction("DD MMM YYYY",date)
         },
         minimumDate:moment(new Date().setDate(new Date().getDate() + 1)).toDate()
     };
const options = {
    auto: 'none',
    fields: {
    itemdata:{
      label: "Данные, позволяющие установить имущество, подлежащее передаче"
    },
    giveawaydeadline:{
      label: "Сроки и порядок передачи имущества"
    },
    keepcondition:{
      label: "Условия о содержании имущества"
    },
    usecondition:{
      label: "Условия об использовании имущества"
    },
    usedeadline:usedeadline,
    duedate: DUEDATE,
		additional:{
			label: "Дополнительные условия (не обяз.)"
		},
    lender:{
      label: 'Ссудодатель'
    },
    borrower:{
      label: 'Ссудополучатель'
    },
		ipOrFiz: {
      label: 'Ваша роль в этой сделке'
    },
  },
  stylesheet: formStyles
}
const Role = t.enums({
  'lender': 'Ссудодателем',
  'borrower': 'Ссудополучателем'
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
			lawid: '604',
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
    if (value.Role === 'lender' && this.state.status1=='Физическое Лицо') {
      return t.struct({
        Role: Role,
        borrower: t.enums(this.state.kontr_ids),
        itemdata: t.String,
        usedeadline: t.Date,
        keepcondition: t.String,
        usecondition: t.String,
        additional: t.String,
        giveawaydeadline: t.String,

        duedate: t.Date,
        additional: t.maybe(t.String)
      });
    } else if (value.Role === 'borrower' && this.state.status1=='Физическое Лицо' ) {
      return t.struct({
        Role: Role,
        lender: t.enums(this.state.kontr_ids),
        itemdata: t.String,
        usedeadline: t.Date,
        keepcondition: t.String,
        usecondition: t.String,
        additional: t.String,
        giveawaydeadline: t.String,

        duedate: t.Date,
        additional: t.maybe(t.String)
      });
    } else if (value.Role === 'lender' && this.state.status1=='Индивидуальный предприниматель' ) {
      return t.struct({
        Role: Role,
        borrower: t.enums(this.state.kontr_ids),
        itemdata: t.String,
        usedeadline: t.Date,
        keepcondition: t.String,
        usecondition: t.String,
        additional: t.String,
        giveawaydeadline: t.String,

        duedate: t.Date,
        additional: t.maybe(t.String),
				ipOrFiz: Gender
      });
    } else if (value.Role === 'borrower' && this.state.status1=='Индивидуальный предприниматель' ) {
      return t.struct({
        Role: Role,
        lender: t.enums(this.state.kontr_ids),
        itemdata: t.String,
        usedeadline: t.Date,
        keepcondition: t.String,
        usecondition: t.String,
        additional: t.String,
        giveawaydeadline: t.String,

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
  axios.post('https://sdelkibackend.herokuapp.com/create/createdeal604',formData,{
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
					'Договор безвозмездного пользования имуществом',
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
	if(value.lender){
		var borrower = jwtDecode(this.state.myKey)
		const formData = `deal604=${JSON.stringify(value)}&lender=${value.lender}&borrower=${borrower.sub}&duedate=${value.duedate}&usedeadline=${value.usedeadline}&lawid=${this.state.lawid}&status=${this.state.status}`;
		this.updateDeal(formData)
	} else{
		var lender = jwtDecode(this.state.myKey)
		const formData = `deal604=${JSON.stringify(value)}&lender=${lender.sub}&borrower=${value.borrower}&duedate=${value.duedate}&usedeadline=${value.usedeadline}&lawid=${this.state.lawid}&status=${this.state.status}`;
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
						<Text style={styles.metext1}>Договор безвозмездного пользования имуществом</Text>
					</Body>

				</Header>
        <Content  style={styles.mb10}>
        <Text>Предмет договора:</Text>
        <Text>Ссудодатель передает имущество в безвозмездное временное пользование Cсудополучателю на условиях, указанных в настоящем договоре</Text>
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
