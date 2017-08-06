import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import CheckBox from './checkBox';
import InputDate from './inputDate';
import './style.css';

// fait un array unique des equipements

class FiltersMenu extends Component {

	state = {
		primaryBookingHour: 0,
		secondBookingHour: 0,
		secondBookingHourStart: 0,
		secondExist: true,
	}

		componentDidMount(){
			const { selectedDate } = this.props;
			this.setState({secondBookingHourStart: this.timePicker(selectedDate) + 1, secondBookingHour: this.timePicker(selectedDate) + 1} ,() =>{
				this.props.getHours(this.timePicker(), this.state.secondBookingHour)
			})
		}

	 filterParser = (filters) => {
		let filterTab = filters.map((filter) => {
			return filter.equipements
		})
		filterTab = _.flatten(filterTab);
		filterTab = filterTab.map((filter) => {
			return filter.name
		})
		filterTab = _.uniq(filterTab);
		return(filterTab)
	}

	 filterCreator = (filters, onClick) =>{
		const allFilters = this.filterParser(filters)
		const finalFilters = allFilters.map((filter, key)=>{
			return <CheckBox data={filter} key={key} onClick={onClick}/>
		})
		return finalFilters;
	}


	 timePicker = (selectedDate) => {
			const whatHourIsIt = moment().format('HH')
			const whatDayIsIt = moment().format('YYYY-MM-DD')
			// console.log(whatHourIsIt);
			// console.log(selectedDate);
			// console.log(whatDayIsIt);
			// console.log(moment(whatDayIsIt, "YYYY-MM-DD").fromNow());
			if(Number(whatHourIsIt) >= 18 || Number(whatHourIsIt) < 8 || selectedDate !== whatDayIsIt ){
						return 8;
			} else {
				return Number(moment().add('1', 'hours').format('HH'));
			}
	}

	 firstSelectCreator = (selectedDate) =>{
		//  console.log(selectedDate);
		const whatTimeIsIt = this.timePicker(selectedDate);
		// console.log('selectCreator',whatTimeIsIt);
		const timeArray = [];
		 for (let i = whatTimeIsIt; i <= 19; i++){
			timeArray.push(<option key={i} value={i} >{i}H</option>)
		}
		return timeArray;
	}

	secondSelectCreator = (time) => {
		// console.log("SECN TIME CREATOR",time);
		const timeArray = [];
		for (let i = time; i <= 20; i++){
		 	timeArray.push(<option key={i} value={i} >{i}H</option>)
	 }
	 return timeArray;
	}

	handleChangeSecondTimeSelector = (time) => {
		const primaryHour = Number(time.target.value);
		this.setState({primaryHour ,secondBookingHour: primaryHour + 1, secondBookingHourStart: primaryHour + 1, secondExist: false},() =>{
			console.log(this.state.secondBookingHour);
			this.setState({secondExist: true});
			this.props.getHours(primaryHour,this.state.secondBookingHour)
		})
	}

	handleSecondTimeSelector = (time) => {
		let secondHour = Number(time.target.value);
		this.setState({secondBookingHour: secondHour},() =>{
			this.props.getHours(this.state.primaryHour, secondHour)
		})
	}





	render(){
		const {filters, onClick, getDate, selectedDate, onRangeChange, maxCapacity, minCapacity, currentCapacity} = this.props
		const firstSelect = this.firstSelectCreator(selectedDate);
		const secondSelect = this.secondSelectCreator(this.state.secondBookingHourStart);
	return(
		<div className="filtersMenu">
			<div className="filtersMenuTitle">
				<p>Filtres</p>
				<form type="submit">
					<InputDate getDate={getDate}/>
					<div className="hourPicker">

						<select id="primaryHour" onChange={this.handleChangeSecondTimeSelector}>
							{firstSelect.map((time) => time)}
						</select>
						<p>A</p>

						{this.state.secondExist &&
							<select id="secondHour" onChange={this.handleSecondTimeSelector}>
						 		{secondSelect.map((time) => time)}
							</select>}
					</div>
					{this.filterCreator(filters, onClick)}

					<div className="capacity">
						<div>Capacité Salle</div>
						<input type="range" id="range" onChange={onRangeChange} min={minCapacity} max={maxCapacity} defaultValue={maxCapacity}/>
						{currentCapacity}
					</div>
					{/* <input type="number" min={this.minCapacity()} max={this.maxCapacity()}></input> */}
				</form>
			</div>
	</div>)}};

FiltersMenu.propTypes = {
	filters: PropTypes.array,
	onClick: PropTypes.func,
	getHours: PropTypes.func,
	getDate: PropTypes.func,
	selectedDate: PropTypes.string,
	onRangeChange: PropTypes.func,
	minCapacity: PropTypes.number,
	maxCapacity: PropTypes.number,
	currentCapacity: PropTypes.number,
}

export default FiltersMenu;
