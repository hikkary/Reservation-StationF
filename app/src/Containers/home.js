import React from 'react';
import { Component } from 'react';
import { Header } from '../Components/Header';
import { Banner } from '../Components/Banner';
import { Searchbar } from '../Components/Searchbar';
import { FiltersMenu } from '../Components/FiltersMenu';
import { RoomsList } from '../Components/RoomsList';
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


	handleSearchInput = (text) => {
		this.setState({filter: {...this.state.filter, name: text.target.value}})
		console.log(this.state.filter);
		console.log(this.state.filter.name);
	}

	handleSubmit = (form) =>{
		form.preventDefault();
		console.log(form.target.name);
	}

	handleClickCheckBox = (checkBox) =>{
		console.log(checkBox);
	}

	render(){
		return(
			<div className="home">
			<Header />
			<Banner />
			<Searchbar onKeyDown={this.handleSearchInput.bind(this)}/>
				{this.state.data.rooms &&
					<div className="rooms">
					<FiltersMenu filters={this.state.data.rooms} onClick={this.handleClickCheckBox} onSubmit={this.handleSubmit}/>
					<RoomsList rooms={this.state.data.rooms} filter={this.state.filter}/>
				</div>}
		  </div>
		)
	}
}

export default Home;
