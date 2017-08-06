import React from 'react';
import PropTypes from 'prop-types';
import { Room } from '../Room';
import _ from 'lodash';

import './style.css';


// Check if the equipments on the room matches equipments on the user's filter
const equipmentsCheck = (room, filter) => {
	if(filter.equipments.length === 0) return true;
	let checkArray = filter.equipments.map((filterEquipment) =>{ //create an Array of matching equipments
			return room.equipements.map((roomEquipment) => {
				if (filterEquipment.name === roomEquipment.name) return roomEquipment
				return null;
		})
	})
	checkArray = _.flattenDepth(checkArray)
	_.pull(checkArray, null)
	if (checkArray.length < filter.equipments.length) return false
	// if The numbers of equipments matching in the room is less than the numbers of equipments on
	// the filter then the room is not displayed
	return true;
}


const isBooked = (room, currentTime) => {
		if(currentTime.primaryHour && currentTime.secondHour && currentTime.date){
			if (!room.book) return true; // if the key book does not exist then there is no reservation yet
			else if(room.book){
				// a set of rules checking if another booking is on the range of time that the users have choosen
				// the room is not displayed if the room is already book in the range of time
				let checkIfBookedTab = room.book.filter((oneBook) => {
					if(oneBook.date === currentTime.date){
						if(oneBook.primaryHour > currentTime.primaryHour && oneBook.primaryHour < currentTime.secondHour){
							return true;
						}
						if(oneBook.secondHour > currentTime.primaryHour && oneBook.secondHour < currentTime.secondHour){
							return true;
						}
						if(oneBook.primaryHour === currentTime.primaryHour && oneBook.secondHour === currentTime.secondHour){
							return true;
						}
						if(oneBook.primaryHour <= currentTime.primaryHour && oneBook.secondHour >= currentTime.secondHour){
							return true;
						}
					}
					return false
				})
				if(checkIfBookedTab.length !== 0) return false;
				else { return true }
			}
		} else {
			return false
		}
}

// Filter the room with the capacity choosen by the user
const capacityFilter = (room, capacity) => {
	if(capacity === null){ return }
	if(room.capacity > capacity){
		return false;
	}
}

const filterRooms = (room, filter, currentTime) =>{
	if(room.name.toLowerCase().indexOf(filter.name) === -1) return false; // Filter the rooms by name
	if(equipmentsCheck(room, filter) === false) return false;
	if(capacityFilter(room, filter.capacity) === false) return false;
	if(isBooked(room, currentTime) === false) return false;
	else{
		return true
	}
}

const RoomsList = ({rooms, filter, onClick, currentTime}) => (
	<div className="roomsList">
		{rooms.map( (room, key)=>{
			if(filterRooms(room, filter, currentTime))
				return(<Room onClick={onClick} room={room} key={key} css="room"/>)
			return null;
		}
		)}

	</div>
)

RoomsList.propTypes = {
	rooms: PropTypes.array,
	filter: PropTypes.object,
	onClick: PropTypes.func,
	currentTime: PropTypes.object,
}

export default RoomsList;
