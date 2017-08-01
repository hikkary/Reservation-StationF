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

const filterRooms = (room, filter) =>{
	// console.log(room);
	if(room.name.toLowerCase().indexOf(filter.name) === -1) return false;
	if(equipmentsCheck(room, filter) === false) return false;
	else{
		return true
	}
}

const RoomsList = ({rooms, filter}) => (
	<div className="roomsList">
		{rooms.map( (room, key)=>{
			if(filterRooms(room, filter))
				return(<Room room={room} key={key}/>)
			return null
		}
		)}
	</div>
)

RoomsList.propTypes = {
	rooms: PropTypes.array,
	filter: PropTypes.object,
}

export default RoomsList;
