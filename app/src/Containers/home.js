import React from 'react';
import moment from 'moment';
import { Component } from 'react';
import { Header } from '../Components/Header';
import { Banner } from '../Components/Banner';
import { Searchbar } from '../Components/Searchbar';
import { FiltersMenu } from '../Components/FiltersMenu';
import { RoomsList } from '../Components/RoomsList';
import _ from 'lodash';
import data from '../Data/rooms.json';
import './styles.css';

class Home extends Component {
	state = {
		data: data,
		primaryHour: null,
		secondHour: null,
		date: null,
		filter:{
			name:'',
			equipments:[],
		}
	}

	componentDidMount(){
		this.getDateOnLoad();
	}

	// Activate when a CheckBox is clicked
	handleClickCheckBox =  (checkBox) =>{
		let newFilter = [];
		const { checked, value } = checkBox.target;
		newFilter.push(this.state.filter.equipments); // Add the previous filters
		if (checked){ // Add filter
			newFilter.push({name: checkBox.target.value});
			newFilter = _.flatten(newFilter);
		}	else { // Remove Filter
			newFilter = _.flatten(newFilter);
			newFilter = newFilter.filter((filter) => {
					if(filter.name === value) return false;
					return true
			})
		}
		this.setState({filter: {...this.state.filter, equipments: newFilter}}, () => {
			console.log(this.state.filter);
		})
	}

		handleSearchInput = (text) => {
			this.setState({filter: {...this.state.filter, name: text.target.value}}, ()=>{
				console.log(this.state.filter.name);
			})
		}

		handleTime = (time) =>{
			// console.log('ON CHAANGE',time.target.value);
			// console.log('ON CHAANGE',time.target.id);
			// this.setState({[time.target.id]: time.target.value},() => {
			// 	console.log(this.state);
			// })
		}

		getHours = (primaryHour = this.state.primaryHour, secondHour = this.state.secondHour) => {
			// console.log('secondHour',secondHour);
			// console.log('primaryHour',primaryHour);
			this.setState({primaryHour, secondHour}, () => {
				console.log(this.state);
			})
		}

		todayOrTommorow = () => {
			const whatHourIsIt = moment().format('HH');
			if(Number(whatHourIsIt) >= 18){ // after 18h we cannot book for the present day
				return moment().add('1', 'days').format('YYYY-MM-DD');
			} else { // else we can book the present day
				return moment().format('YYYY-MM-DD');
			}
		}

		getDateOnLoad = () => {
			this.setState({date: this.todayOrTommorow()}, ()=>{
				console.log(this.state);
			})
		}

		getDate = (time) =>{
			console.log(time.target.value);
			this.setState({date: time.target.value}, () =>{
				console.log(this.state);
			})
		}

	render(){
		return(
			<div className="home">
			<Header />
			<Banner />
			<Searchbar onKeyUp={this.handleSearchInput.bind(this)}/>
				{this.state.data.rooms &&
					<div className="rooms">
					<FiltersMenu filters={this.state.data.rooms} getHours={this.getHours} getDate={this.getDate}  onClick={this.handleClickCheckBox}/>
					<RoomsList rooms={this.state.data.rooms} filter={this.state.filter}/>
				</div>}
		  </div>
		)
	}
}

export default Home;
