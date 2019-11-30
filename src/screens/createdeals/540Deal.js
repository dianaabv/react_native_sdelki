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
const options = {
    auto: 'none',
    fields: {
    itemdata:{
      label: "Данные, позволяющие установить имущество, подлежащее передаче в аренду"
    },
    deadline:{
      label: "Cроки и порядок передачи/возврата имущества"
    },
    payday:{
      label: "Сроки и порядок оплаты (тенге)"
    },
    keepcondition:{
      label: "Условия о содержании/улучшении имущества"
    },
    usecondition:{
      label: "Условия об использовании имущества (в т.ч. пределах распоряжения)"
    },
    duedate: DUEDATE,
		additional:{
			label: "Дополнительные условия (не обяз.)"
		},
    employee:{
      label: 'Наниматель'
    },
    employer:{
      label: 'Наймодатель'
    },
		ipOrFiz: {
      label: 'Ваша роль в этой сделке'
    },
  },
  stylesheet: formStyles
}
const Role = t.enums({
  'employee': 'Нанимателем',
  'employer': 'Наймодателем'
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
			lawid: '540',
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
    if (value.Role === 'employer' && this.state.status1=='Физическое Лицо') {
      return t.struct({
        Role: Role,
        employee: t.enums(this.state.kontr_ids),
        itemdata: t.String,
        keepcondition: t.String,
        usecondition: t.String,
        payday: t.String,
        deadline: t.String,
        additional: t.String,

        duedate: t.Date,
        additional: t.maybe(t.String)
      });
    } else if (value.Role === 'employee' && this.state.status1=='Физическое Лицо' ) {
      return t.struct({
        Role: Role,
        employer: t.enums(this.state.kontr_ids),
        itemdata: t.String,
        keepcondition: t.String,
        usecondition: t.String,
        payday: t.String,
        deadline: t.String,
        additional: t.String,

        duedate: t.Date,
        additional: t.maybe(t.String)
      });
    } else if (value.Role === 'employer' && this.state.status1=='Индивидуальный предприниматель' ) {
      return t.struct({
        Role: Role,
        employee: t.enums(this.state.kontr_ids),
        itemdata: t.String,
        keepcondition: t.String,
        usecondition: t.String,
        payday: t.String,
        deadline: t.String,
        additional: t.String,

        duedate: t.Date,
        additional: t.maybe(t.String),
				ipOrFiz: Gender
      });
    } else if (value.Role === 'employee' && this.state.status1=='Индивидуальный предприниматель' ) {
      return t.struct({
        Role: Role,
        employer: t.enums(this.state.kontr_ids),
        itemdata: t.String,
        keepcondition: t.String,
        usecondition: t.String,
        payday: t.String,
        deadline: t.String,
        additional: t.String,

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
  axios.post('https://sdelkibackend.herokuapp.com/create/createdeal540',formData,{
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
					'Договор имущественного найма (аренды)',
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
	if(value.employee){
		var employer = jwtDecode(this.state.myKey)
		const formData = `deal540=${JSON.stringify(value)}&employee=${value.employee}&employer=${employer.sub}&duedate=${value.duedate}&lawid=${this.state.lawid}&status=${this.state.status}`;
		this.updateDeal(formData)
	} else{
		var employee = jwtDecode(this.state.myKey)
		const formData = `deal540=${JSON.stringify(value)}&employee=${employee.sub}&employer=${value.employer}&duedate=${value.duedate}&lawid=${this.state.lawid}&status=${this.state.status}`;
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
						<Text style={styles.metext}>Договор имущественного найма (аренды)</Text>
					</Body>

				</Header>
        <Content  style={styles.mb10}>
				<Text>Предмет договора:</Text>
        <Text>Наймодатель предоставляет нанимателю имущество за плату во временное владение и пользование на условиях, указанных в настоящем договоре. </Text>
				<Text style={styles.myred}>Внимание:</Text>
				<Text style={styles.myred}>при выборе недвижимого имущества (дом, квартира, офис, помещение и т.д.) срок договора должен составлять менее года, иначе сделка должна быть выполнена в письменном виде и зарегистрирована в установленном законодательством порядке</Text>
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
