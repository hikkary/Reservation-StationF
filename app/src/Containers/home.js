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
		data: data
	}
	componentDidMount(){
		console.log('yeah');
		console.log(this.state.data);
		this.state.data.rooms.forEach((ace) =>{
			console.log(ace);
		})
	}

	handleSearchInput(text){
		console.log('input text',text.target.value);
	}

	render(){
		return(
			<div className="home">
			<Header />
			<Banner />
			<Searchbar onKeyDown={this.handleSearchInput}/>
				<div className="rooms">
					<FiltersMenu/>
					<RoomsList/>
				</div>
		  </div>
		)
	}
}

export default Home;
