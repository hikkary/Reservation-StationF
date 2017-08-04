import data from '../data/rooms.json';
// import data from '../data/test.json';

const getRooms = (req, res) => {
	const { rooms } = data;
	if (!rooms){
		return res.send({status: 404, statusText: 'No rooms found'})
	} else {
		return res.send({status: 200, statusText: 'Success', rooms})
	}
}

export default getRooms;
