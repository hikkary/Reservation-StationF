import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { Component } from 'react';
import { Popup } from '../Components/Popup' ;
import { Header } from '../Components/Header';
import { Banner } from '../Components/Banner';
import { Searchbar } from '../Components/Searchbar';
import { FiltersMenu } from '../Components/FiltersMenu';
import { RoomsList } from '../Components/RoomsList';
import _ from 'lodash';
// import data from '../Data/rooms.json';
import './styles.css';

class Home extends Component {
	state = {
		data: null,
		primaryHour: null,
		secondHour: null,
		date: null,
		roomName: null,
		popupExists: false,
		filter:{
			name:'',
			equipments:[],
		}
	}

	componentDidMount(){
		this.getDateOnLoad();
		axios.get('http://localhost:8080/api/rooms').then(({data}) => {
			console.log(data);
			this.setState({data})
		})

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
			// console.log('what ', whatHourIsIt);
			if(Number(whatHourIsIt) >= 18){ // after 18h we cannot book for the present day
				// console.log('day after');
				return moment().add('1', 'days').format('YYYY-MM-DD');
			} else { // else we can book the present day
				// console.log('this day');

				return moment().format('YYYY-MM-DD');
			}
		}

		getDateOnLoad = () => {
			this.setState({date: this.todayOrTommorow()}, ()=>{
				console.log('date', this.state);
			})
		}

		getDate = (time) =>{
			console.log(time.target.value);
			this.setState({date: time.target.value}, () =>{
				console.log(this.state);
			})
		}

		createBookObject = (book) => {
			const { primaryHour, secondHour, date, roomName} = book;
			if (!primaryHour || !secondHour || !date || !roomName) return false;
			const bookObject = {
				primaryHour,
				secondHour,
				date,
				roomName,
				user: 'Roger',
			};
			console.log('Book object',bookObject);
			return bookObject;
		}


		newBook = () =>{

				axios({
					method: 'PUT',
					url: 'http://localhost:8080/api/rooms',
					data: {
					 bookRequest: {
						primaryHour: this.state.primaryHour,
						secondHour: this.state.secondHour,
						date: this.state.date,
						roomName: this.state.roomName,
					}}
				}).then((result)=> {
					console.log(result);
					//Gerer les message d'erreurs
					this.setState({data: {rooms: result.data.data.rooms}, popupExists: false}, () => {
						console.log(this.state.data);
					});
				})
		}

		cancelPopup = () => {
			this.setState({popupExists : false})
		}

		popupBook = (room) =>{
			// console.log(room.target.id);
			const sentence = <div>Voulez vous Reserver {this.state.roomName} de {this.state.primaryHour}H a {this.state.secondHour}H  le {this.state.date} ?</div>
			this.setState({roomName: room.target.id, sentence ,popupExists: true}, () =>{
				// console.log(this.state);
				// console.log(JSON.stringify({ rooms: this.state.data.rooms}));

			})


		}

	render(){
		const { primaryHour, secondHour, date} = this.state;
		return(
			<div className="home">
				{ this.state.popupExists &&
					<Popup newBook={this.newBook} cancelPopup={this.cancelPopup} sentence={this.state.sentence}/>
			}
			<Header />
			<Banner />
			<Searchbar onKeyUp={this.handleSearchInput.bind(this)}/>
				{this.state.data && this.state.data.rooms &&
					<div className="rooms">
					<FiltersMenu filters={this.state.data.rooms} selectedDate={this.state.date} getHours={this.getHours} getDate={this.getDate}  onClick={this.handleClickCheckBox}/>
					<RoomsList onClick={this.popupBook} rooms={this.state.data.rooms} currentTime={{primaryHour, secondHour, date}} filter={this.state.filter}/>
				</div>}
				{this.state.data && !this.state.data.rooms &&
					 <p className="noRooms">No rooms Found</p>
				}
		  </div>
		)
	}
}

export default Home;
