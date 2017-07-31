import React from 'react';
import PropTypes from 'prop-types';
import { Room } from '../Room';

import './style.css';

const filterRooms = (room, filter) =>{
		if(room.name.indexOf(filter.name) === -1) return false;
		return true
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
