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
import Timeline from 'react-native-timeline-listview';
import jwtDecode from 'jwt-decode';
import {AsyncStorage, Alert} from 'react-native';
import axios from 'react-native-axios';

class NHListSeparator extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: [],
      myKey: ''
    }
this.getKey = this.getKey.bind(this)
this.dateFormat = this.dateFormat.bind(this)
this.renderDetail=this.renderDetail.bind(this)
  }
  componentDidMount(){
      this.getKey()
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
     const formData = `lawid=${params.params.lawid}&dealid=${params.params.dealid}`;

       axios.post('https://sdelkibackend.herokuapp.com/api/gethistorydeal',formData,{
         responseType: 'json',
         headers: {
           'Content-type': 'application/x-www-form-urlencoded',
           'Authorization': `bearer ${this.state.myKey}`
       }
       }).then(res => {
           this.setState({
            time: res.data.time
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
  renderDetail(rowData, sectionID, rowID) {

    let date = <Text >{rowData.date}</Text>
    let title = <Text style={styles.myFont1}>{rowData.title}</Text>
    var desc = null
    var status = null
		var action_initiator = null
		var finals = null

    if(rowData.action_initiator){
     action_initiator =(
			 <Content >
			 <Text style={styles.myFont}> Инициатор действия: </Text>
		 <Text>{rowData.action_initiator.firstname+" "+ rowData.action_initiator.lastname}</Text>
	 </Content>)
    }
      if(rowData.fields){
        desc = (
          <Content >
            <Text style={styles.myFont}>В следующие поля были внесены изменения:</Text>
						<Text>
						{rowData.fields}</Text>
          </Content>
        )
      }
{   /*   if(rowData.role_status){
        status = (
          <Content >
					<Text style={styles.myFont}>Статус:
					</Text>
					<Text>
					{rowData.role_status}</Text></Content>
       )
      }
		*/}
			if(rowData.finals){
				status = (
					<Content >
					<Text style={styles.myFont}>Претензия:
					</Text>
					<Text>
					{rowData.finals}</Text></Content>
			 )
			}


    return (
      <Content enableEmptySections={true} style={{flex:1}}>

        {title}
  {date}
         {desc}

    {action_initiator}
{finals}
        {status}

      </Content>
    )
  }
	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate("DealsLegco")}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>История сделки</Title>
					</Body>
					<Right />
				</Header>

				<Content padder>
				<Text>Время указано в соответствии с часовым поясом г. Астана</Text>
        <Timeline
        separator={true}
        enableEmptySections={true}
          data={this.state.time}
          innerCircle={'dot'}
          showTime={false}
          renderDetail={this.renderDetail}
        />


				</Content>
			</Container>
		);
	}
}

export default NHListSeparator;
