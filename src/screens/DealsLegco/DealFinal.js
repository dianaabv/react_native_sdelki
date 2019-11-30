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


const options = {
    auto: 'none',
  fields: {
    reason:{
      label: "Опишите суть претензии"
    },
  },
  stylesheet: formStyles
}
const ans = t.enums({
  'Да': 'Да',
  'Нет': 'Нет'
});
var Gender = t.enums({
  yes: 'Yes',
  no: 'No'
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
        this.setState({myKey: value});
       // return value;
     } catch (error) {
       console.log("Error retrieving data" + error);
     }
   }

  // returns the suitable type based on the form value
  getType(value) {
    if (value.ans === 'Да') {
      return t.struct({
        ans: ans
      });
    } else if (value.ans === 'Нет'  ) {
      return t.struct({
        ans: ans,
        reason: t.String,
      });
    }
		else {
      return t.struct({
        ans: ans
      });
    }
  }


  onChange(value) {
    const type = value.ans !== this.state.value.ans ?
      this.getType(value) :
      this.state.type;
    this.setState({ value, type });
  }


onPress() {
  var value = this.refs.form.getValue();
 console.log(value, this.state.myKey)
  if (value) {
    const params  = this.props.navigation.state;
    const formData = `sat=${JSON.stringify(value)}&deal_id=${params.params.dealid}`;
    axios.post('https://sdelkibackend.herokuapp.com/api/updatefinisheddeal',formData,{
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
          'Cделки LegCo',
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
						<Title>Договор Перевозки</Title>
					</Body>
					<Right />
				</Header>
        <Content  style={styles.mb10}>
				<Text></Text>
        <Text>Выполнены ли все условия сделки?</Text>
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
  {   /*     <Form type={User}
             ref={c => this._form = c}
             options={options}/>*/}
				</Content>
			</Container>
		);
	}
}

export default NHListSeparator;
