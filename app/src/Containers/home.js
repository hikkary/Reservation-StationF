import React from 'react';
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
		filter:{
			name:'',
			equipments:[],
		}
	}

	componentDidMount(){
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

	render(){
		return(
			<div className="home">
			<Header />
			<Banner />
			<Searchbar onKeyUp={this.handleSearchInput.bind(this)}/>
				{this.state.data.rooms &&
					<div className="rooms">
					<FiltersMenu filters={this.state.data.rooms} onClick={this.handleClickCheckBox}/>
					<RoomsList rooms={this.state.data.rooms} filter={this.state.filter}/>
				</div>}
		  </div>
		)
	}
}

export default Home;
