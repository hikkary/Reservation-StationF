import Joi from 'joi';
import fs from 'fs';
import _ from 'lodash';
import moment from 'moment';
import { RoomBooking } from '../joi'

import data from '../data/rooms.json';

const checkDate = () =>{

}

const isRoomBooked = (formerBook, newBook) => {
	// console.log(room);
	// console.log(currentTime);
			if(formerBook){
				let checkIfBookedTab = formerBook.filter((oneBook) => {
					// console.log('ONE BOOOOOOK',oneBook);
						// console.log('sameDate');
						if(oneBook.primaryHour > newBook.primaryHour && oneBook.primaryHour < newBook.secondHour){
							// console.log(' SAME hour');
							return true;
						}
						if(oneBook.secondHour > newBook.primaryHour && oneBook.secondHour < newBook.secondHour){
							// console.log(' SAME hour 2');
							return true;
						}
						if(oneBook.primaryHour === newBook.primaryHour && oneBook.secondHour === newBook.secondHour){
							// console.log(' SAME hour 3');
							return true;
						}
						if(oneBook.primaryHour <= newBook.primaryHour && oneBook.secondHour >= newBook.secondHour){
							// console.log(' SAME hour 3');
							return true;
						}
					return false
				})
				console.log('CHECK TAB',checkIfBookedTab);
				if(checkIfBookedTab.length !== 0){
					console.log("Reservation ce chevauche")
					return false;
				} else {
					console.log('pas de Reservation');
					return true;
				}

				// if(checkIfBookedTab.length !== 0) return false;
				// else { return true }
			}

}



const checkBookRequest = (request) => {
	// console.log('rooms',data.rooms);
	// console.log('request',request);
	const isBooked = data.rooms.map((room) => { // We go through all the rooms
		if(room.name === request.roomName){ // we look for the room we want to book
			console.log('TRUE');
			if(!room.book) { // if the room does not have a booking key we create it
				// room = {...room, book: [request]}
				return true;
			} else if (room.book){ // if there are books for the room
					const isBookAtDate = room.book.map((oneBook) =>{ // we go through all the booking
						if(oneBook.date === request.date){ // we check if there is already a book for the requested date
							console.log('Meme date');
							return oneBook // if book we return it to inspect it later
						} else {
							console.log('pas meme dates');
							return null; // else we return null
						}
					})
					// console.log('Avant DATE ?', isBookAtDate);

					_.pull(isBookAtDate, null); // thanks to lodash we remove all the null case on the array

					if(isBookAtDate.length === 0){ // if there is not any book remaining, it means no book have been made for the requested date
						console.log('PAs de Reservation a cette date');
						return true
					} else { // else it means we have a book for the day and we have to check if our request is possible
						if (isRoomBooked(isBookAtDate, request) === false){
							return false;
						} else {
							return true;
						}
					}
					// console.log('DATE ?', isBookAtDate);
					// console.log('DATE ?', isBookAtDate.length);

			}
		} else {
			return null;
		}

	})
	_.pull(isBooked, null)
	//
	// console.log('Reservation ?',isBooked);
	// console.log('Reservation ?',isBooked.length);
	if(isBooked[0]) {
		return true;
	} else {
		return false;
	}
	// inscrire la Reservation dans un fichier
	// console.log('IS BOOKED', isBooked);
}

const insertNewBook = (bookRequest) => {
	const newData = data.rooms.map((room) => {
		if (room.name === bookRequest.roomName) {
				if(!room.book){
					room = {...room, book: []}
				}
				room.book.push(bookRequest);
				// r = {...r, book: bookObject}
		}
		return room;
	})

	return { rooms: newData };
	// console.log('newData ALLON Y',newData.map((room)=>{
	// 	console.log(room.book);
	// }));
}

const checkDateRequest = (request) => {
	const whatDayIsIt = moment().format('YYYY-MM-DD');
	const whatDayIsItUnix = moment(whatDayIsIt).unix();
	const whatHourIsIt = Number(moment().format('HH'));
	const requestDateUnix = moment(request.date).unix();
	// console.log('JOUR, HEURE',whatDayIsIt, whatHourIsIt);
	// console.log('NUMBER JOUR, HEURE', moment(hier).unix(), Number(whatHourIsIt));
	if (requestDateUnix < whatDayIsItUnix) return false;
	if (requestDateUnix - whatDayIsItUnix >= 5184000) return false;
	if(request.secondHour <= request.primaryHour) return false;
	if(requestDateUnix === whatDayIsItUnix){
		if(request.secondHour < whatHourIsIt)  return false;
		if(request.primaryHour < whatHourIsIt) return false;
	}
	return true
}

const newBook = (req, res) => {
	const { bookRequest } = req.body;
	const { error } = Joi.validate(bookRequest, RoomBooking, { abortEarly: false });
  if (error) {
		console.log('error ON REQUEST', error);
     return res.send({ status: 400, statusText: 'Bad Request', data: data });
  }

	// Creer Schema Joi
	//Verifier que la date est ok, regle : date inferieur a date actuelle est horaire inferieur a horaire actuelle
	// console.log(req.body.bookRequest);
	if (checkDateRequest(bookRequest) === false) return res.send({ status: 400, statusText: 'Bad Date', data: data });
	if (checkBookRequest(bookRequest) === false) return res.send({ status: 490, statusText: 'Conflict, reservation Impossible', data: data });
	else {
		const newData = insertNewBook(bookRequest);
		const path = process.cwd();
		fs.writeFile(`${path}/src/data/rooms.json`, JSON.stringify(newData), (err) => {
	    if(err) {
				return res.send({status: 400, statusText: err})
	    }
			return res.send({status: 200, statusText: 'File Succesfully Saved', data: newData})
	});
	// return res.send('test time')
	}
}

export default newBook;
