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
import './styles.css';

class Home extends Component {
	state = {
		data: null,
		primaryHour: null,
		secondHour: null,
		date: null,
		roomName: null,
		popupExists: false,
		popupValidate: false,
		popupErrorExists: false,
		filter:{
			name:'',
			equipments:[],
			capacity: null,
		}
	}

	componentDidMount(){
		this.getDateOnLoad();
		// Get Rooms from node
		axios({
			method: 'GET',
			url: 'http://localhost:8080/api/rooms',
			validateStatus : (status) =>{
			return status >= 200 && status < 500;
			}
		}).then(({data, status}) => {
				if (status === 404){
					this.setState({data: {}});
					return;
				} else {
				this.setState({data, capacity: this.maxCapacity()});
			}
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
		//update equipments filtering
		this.setState({filter: {...this.state.filter, equipments: newFilter}})
	}

		handleSearchInput = (text) => {
			// Update Room name filtering
			this.setState({filter: {...this.state.filter, name: text.target.value.toLowerCase()}});
		}

		getHours = (primaryHour = this.state.primaryHour, secondHour = this.state.secondHour) => {
			// Update Time Filtering
			this.setState({primaryHour, secondHour});
		}

		todayOrTommorow = () => {
			const whatHourIsIt = moment().format('HH');
			if(Number(whatHourIsIt) >= 18){ // after 18h the default Date is tomorrow
				return moment().add('1', 'days').format('YYYY-MM-DD');
			} else { // else we can book the present day
				return moment().format('YYYY-MM-DD');
			}
		}

		getDateOnLoad = () => {
			// get The correct Date
			this.setState({date: this.todayOrTommorow()})
		}

		getDate = (time) =>{
			// Get date on Selector Change
			this.setState({date: time.target.value})
		}

		newBook = () =>{

			axios({
				method: 'PUT',
				url: 'http://localhost:8080/api/rooms',
				validateStatus : (status) =>{
				return status >= 200 && status < 500;
				},
				data: {
				 bookRequest: {
					primaryHour: this.state.primaryHour,
					secondHour: this.state.secondHour,
					date: this.state.date,
					roomName: this.state.roomName,
				}}
			}).then((result)=> {
					// Error handling
					if(result.status === 422 || result.status === 409 || result.status === 400) {
						const sentence = <div className="textPopup"> {result.data.error}</div>
						this.setState({
							sentence,
							popupErrorExists: true, // Activate the error popup
						})
					}
					// updating Room Data, DEactivate Book Popup, Activate Validate Popup
					this.setState({data: {rooms: result.data.data.rooms}, popupExists: false, popupValidate: true});
				})
		}

		cancelPopup = () => {
			// Cancel all popups
			this.setState({popupExists : false, popupErrorExists: false, popupValidate: false})
		}

		popupBook = (room) =>{
			// Popup Book Creation, create the booking sentence as well
			this.setState({roomName: room.target.id}, () =>{
				const sentence = <div className="textPopup">Voulez vous Reserver&nbsp;<div className="roomName"> {this.state.roomName}&nbsp;</div> de&nbsp;<div className="textHour">{this.state.primaryHour}H&nbsp;</div> a&nbsp;<div className="textHour">{this.state.secondHour}H&nbsp;</div>  le&nbsp;<div className="textHour">{this.state.date}</div> ?</div>
				this.setState({popupExists: true, sentence})
			})
		}

		minCapacity = () =>{
			// return the lowest room capacity from the rooms data
			if(this.state.data){
				const max = this.state.data.rooms.map((room) => room.capacity)
				_.sortBy(max)
				return Number(_.head(max))
			}
			return 0
		}

		// Update the capacity filter
		onRangeChange = (range) =>{
			console.log('Range');
			this.setState({filter: {...this.state.filter, capacity: Number(range.target.value)}})
		}

		maxCapacity = () =>{
			// return the highest room capacity from the rooms data
			if(this.state.data){
				const max = this.state.data.rooms.map((room) => room.capacity)
				_.sortBy(max)
				return Number(_.last(max))
			}
		}


	render(){
		const { primaryHour, secondHour, date} = this.state;
		return(
			<div className="home">
				{ this.state.popupValidate &&
					<Popup validate={this.cancelPopup} cancelPopup={this.cancelPopup} noButton={false}  animation={true}/>
				}
				{ this.state.popupErrorExists &&
					<Popup validate={this.cancelPopup} cancelPopup={this.cancelPopup} sentence={this.state.sentence}/>
				}
				{ this.state.popupExists &&
					<Popup validate={this.newBook} cancelPopup={this.cancelPopup} sentence={this.state.sentence}/>
				}
			<Header />
			<Banner />
			<Searchbar onKeyUp={this.handleSearchInput.bind(this)}/>
				{this.state.data && this.state.data.rooms &&
					<div className="rooms">
						<FiltersMenu filters={this.state.data.rooms} selectedDate={this.state.date} getHours={this.getHours} getDate={this.getDate}  onClick={this.handleClickCheckBox} maxCapacity={this.maxCapacity()} minCapacity={this.minCapacity()} onRangeChange={this.onRangeChange} currentCapacity={this.state.filter.capacity} />
						<RoomsList onClick={this.popupBook} rooms={this.state.data.rooms} currentTime={{primaryHour, secondHour, date}} filter={this.state.filter}/>
					</div>
				}
		  </div>
		)
	}
}

export default Home;
