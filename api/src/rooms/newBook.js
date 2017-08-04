import Joi from 'joi';
import fs from 'fs';
const checkDate = () =>{

}

const newBook = (req, res) => {
	// Creer Schema Joi
	//Verifier que la date est ok, regle : date inferieur a date actuelle est horaire inferieur a horaire actuelle
	console.log(req.body.bookRequest);
	const path = process.cwd();
	fs.writeFile(`${path}/src/data/rooms.json`, JSON.stringify(req.body.allRooms), (err) => {
    if(err) {
			return res.send({status: 400, statusText: err})
    }
		return res.send({status: 200, statusText: 'File Succesfully Saved'})
});
}

export default newBook;
