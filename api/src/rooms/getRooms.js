import data from '../data/rooms.json';

const getRooms = (req, res) => {
	const { rooms } = data;
	if (!rooms){
		return res.status(404).send({statusText: 'No rooms found'})
	} else {
		return res.status(200).send({statusText: 'Success', rooms})
	}
}

export default getRooms;
