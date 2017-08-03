import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const CAPACITY = "places";
const BOOK = "Reserver";
const EQUIPMENT = 'Pas d\'equipements';

const listEquipment = (equipements) => {
	let stringEquipments = '';
	 equipements.forEach((equipment) =>{
		stringEquipments += equipment.name
		stringEquipments += ', '
	})
	stringEquipments = stringEquipments.substr(0, stringEquipments.length - 2)
	return(stringEquipments || EQUIPMENT);
}

const Room = ({room, onClick}) =>(
	<div className="room">
		<div className="pictureRoom"></div>
		<div className="infoRoom">
			<p className="roomTitle">{room.name}</p>
			<p className="roomDescription">{room.description}</p>
			<p className="roomCapacity">{room.capacity} {CAPACITY}</p>
			<div className="lastLine">
			<p className="roomEquipment">{listEquipment(room.equipements)}</p>
			<div className="book" id={room.name} onClick={onClick}>{BOOK}</div>
			</div>
		</div>
	</div>
)

Room.propTypes = {
	room: PropTypes.object,
	onClick: PropTypes.func,
}

export default Room;
