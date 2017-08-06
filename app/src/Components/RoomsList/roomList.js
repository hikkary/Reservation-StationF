import React from 'react';
import PropTypes from 'prop-types';
import { Room } from '../Room';
import _ from 'lodash';

import './style.css';

const equipmentsCheck = (room, filter) => {
	if(filter.equipments.length === 0) return true
	let checkArray = filter.equipments.map((filterEquipment) =>{
		// console.log('filter',filterEquipment);
			return room.equipements.map((roomEquipment) => {
				// console.log('room',roomEquipment);
				if (filterEquipment.name === roomEquipment.name) return roomEquipment
				return null;
			})
	} )
	checkArray = _.flattenDepth(checkArray)
	_.pull(checkArray, null)
	//
	// console.log(filter.equipments);
	// console.log(room.equipements);
	// console.log(' CHECK',checkArray);
	//
	// console.log(checkArray.length);
	// console.log(filter.equipments.length);
	if (checkArray.length < filter.equipments.length) return false

	return true;
		// room.
	// console.log(filter.equipments);
	// console.log(room.equipements);
	// console.log(filter.equipments.length);
	// console.log(room.equipements.length);
}
const isBooked = (room, currentTime) => {
	// console.log(room);
	// console.log(currentTime);
		if(currentTime.primaryHour && currentTime.secondHour && currentTime.date){
			if (!room.book) return true;
			else if(room.book){
				let checkIfBookedTab = room.book.filter((oneBook) => {
					// console.log('ONE BOOOOOOK',oneBook);
					if(oneBook.date === currentTime.date){
						// console.log('sameDate');
						if(oneBook.primaryHour > currentTime.primaryHour && oneBook.primaryHour < currentTime.secondHour){
							// console.log(' SAME hour');
							return true;
						}
						if(oneBook.secondHour > currentTime.primaryHour && oneBook.secondHour < currentTime.secondHour){
							// console.log(' SAME hour 2');
							return true;
						}
						if(oneBook.primaryHour === currentTime.primaryHour && oneBook.secondHour === currentTime.secondHour){
							// console.log(' SAME hour 3');
							return true;
						}
						if(oneBook.primaryHour <= currentTime.primaryHour && oneBook.secondHour >= currentTime.secondHour){
							// console.log(' SAME hour 3');
							return true;
						}
					}
					return false
				})
				// console.log('CHECK TAB',checkIfBookedTab);
				if(checkIfBookedTab.length !== 0) return false;
				else { return true }
			}
		} else {
			return false
		}
}

const capacityFilter = (room, capacity) => {
	if(capacity === null){ return }
	if(room.capacity > capacity){
		return false;
	}
}

const filterRooms = (room, filter, currentTime) =>{
	// console.log(room);
	// console.log(currentTime);
	// console.log(filter.capacity);
	// console.log(room);
	if(room.name.toLowerCase().indexOf(filter.name) === -1) return false;
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
