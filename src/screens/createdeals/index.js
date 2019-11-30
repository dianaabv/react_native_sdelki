import React, { Component } from 'react';

import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem } from 'native-base';

import styles from './styles';

const datas = [
	{
		route: 'Deal406',
		text: 'Договор купли-продажи',
	},
	{
		route: 'Deal501',
		text: 'Договор мены',
	},
	{
		route: 'Deal715',
		text: 'Договор займа',
	},
	{
		route: 'Deal540',
		text: 'Договор имущественного найма (аренды)',
	},
	{
		route: 'Deal688',
		text: 'Договор перевозки',
	},
	{
		route: 'Deal768',
		text: 'Договор хранения',
	},
	{
		route: 'Deal616',
		text: 'Договор подряда',
	},
	{
		route: 'Deal865',
		text: 'Договор комиссии',
	},
	{
		route: 'Deal506',
		text: 'Договор дарения',
	},
	{
		route: 'Deal683',
		text: 'Договор возмездного оказания услуг',
	},
	{
		route: 'Deal604',
		text: 'Договор безвозмездного пользования имуществом',
	},
	{
		route: 'Deal846',
		text: 'Договор поручения',
	},


	// {
	// 	route: 'NHListAvatar',
	// 	text: 'List Avatar',
	// },
	// {
	// 	route: 'NHListThumbnail',
	// 	text: 'List Thumbnail',
	// },
	// ,
	// {
	// 	route: 'NHListSeparator',
	// 	text: 'List Separator',
	// },
];

class NHList extends Component {
	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
					<Button transparent onPress={() => this.props.navigation.navigate('DealsLegco')}>
						<Icon name="arrow-back" />
					</Button>

					</Left>

					<Body >
						<Text style={styles.metext}>Выберите тип договора</Text>
					</Body>
					<Right/>

				</Header>

				<Content>
					<List dataArray={datas} renderRow={data =>
							<ListItem button onPress={() => this.props.navigation.navigate(data.route)}>
								<Text>
									{data.text}
								</Text>
								<Right>
									<Icon name="arrow-forward" />
								</Right>
							</ListItem>}/>
				</Content>
			</Container>
		);
	}
}

export default NHList;
