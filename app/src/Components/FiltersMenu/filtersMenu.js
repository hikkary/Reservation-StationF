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
			this.setState({secondBookingHourStart: this.timePicker() + 1, secondBookingHour: this.timePicker() + 1} ,() =>{
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


	 timePicker = () => {
			const whatHourIsIt = moment().format('HH')
			if(Number(whatHourIsIt) >= 18 || Number(whatHourIsIt) < 8 ){
				return 8;
			} else {
				return Number(moment().add('1', 'hours').format('HH')+'H');
			}
	}

	 firstSelectCreator = () =>{
		const whatTimeIsIt = this.timePicker();
		const timeArray = [];
		 for (let i = whatTimeIsIt; i <= 19; i++){
			timeArray.push(<option key={i} value={i} >{i}H</option>)
		}
		return timeArray;
	}

	secondSelectCreator = (time) => {
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
		const {filters, onClick, getDate} = this.props
		const firstSelect = this.firstSelectCreator();
		const secondSelect = this.secondSelectCreator(this.state.secondBookingHourStart);
	return(
		<div className="filtersMenu">
			<div className="filtersMenuTitle">
				<p>BOOK A ROOM</p>
				<form type="submit">
					<InputDate getDate={getDate}/>
					<div>
						<select id="primaryHour" onChange={this.handleChangeSecondTimeSelector} >
							{firstSelect.map((time) => time)}
						</select>
						a
						{this.state.secondExist && <select id="secondHour" onChange={this.handleSecondTimeSelector}>
						 {secondSelect.map((time) => time)}
						</select>}
					</div>
					{this.filterCreator(filters, onClick)}
					<input type="submit"/>
				</form>
			</div>
	</div>)}};

FiltersMenu.propTypes = {
	filters: PropTypes.array,
	onClick: PropTypes.func,
	getHours: PropTypes.func,
	getDate: PropTypes.func,
}

export default FiltersMenu;
