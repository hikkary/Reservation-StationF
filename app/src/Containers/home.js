import React from 'react';
import { Component } from 'react';
import { Header } from '../Components/Header';
import { Banner } from '../Components/Banner';
import { Searchbar } from '../Components/Searchbar';
import { FiltersMenu } from '../Components/FiltersMenu';
import { RoomsList } from '../Components/RoomsList';

import './styles.css';

class Home extends Component {
	componentDidMount(){
		console.log('yeah');
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
