import Joi from 'joi';
import fs from 'fs';
import _ from 'lodash';
import moment from 'moment';
import { RoomBooking } from '../joi'

import data from '../data/rooms.json';

// check if the room is already booked
const isRoomBooked = (formerBook, newBook) => {
			if(formerBook){
				let checkIfBookedTab = formerBook.filter((oneBook) => {
						if(oneBook.primaryHour > newBook.primaryHour && oneBook.primaryHour < newBook.secondHour){
							return true;
						}
						if(oneBook.secondHour > newBook.primaryHour && oneBook.secondHour < newBook.secondHour){
							return true;
						}
						if(oneBook.primaryHour === newBook.primaryHour && oneBook.secondHour === newBook.secondHour){
							return true;
						}
						if(oneBook.primaryHour <= newBook.primaryHour && oneBook.secondHour >= newBook.secondHour){
							return true;
						}
					return false
				})
				if(checkIfBookedTab.length !== 0){
					return false;
				} else {
					return true;
				}
			}
}

const checkBookRequest = (request) => {
	const isBooked = data.rooms.map((room) => { // We go through all the rooms
		if(room.name === request.roomName){ // we look for the room we want to book
			if(!room.book) { // if the room does not have a booking key we return true
				return true;
			} else if (room.book){ // if there are books for the room
					const isBookAtDate = room.book.map((oneBook) =>{ // we go through all the booking
						if(oneBook.date === request.date){ // we check if there is already a book for the requested date
							return oneBook // if book we return it to inspect it later
						} else {
							return null; // else we return null
						}
					})

					_.pull(isBookAtDate, null); // thanks to lodash we remove all the null case on the array

					if(isBookAtDate.length === 0){ // if there is not any book remaining, it means no book have been made for the requested date
						return true
					} else { // else it means we have a book for the day and we have to check if our request is possible
						if (isRoomBooked(isBookAtDate, request) === false){ //we check the array of book we have gathered;
							return false;
						} else {
							return true;
						}
					}
			}
		} else {
			return null;
		}
	})
	_.pull(isBooked, null)

	if(isBooked[0]) {
		return true;
	} else {
		return false;
	}
}

// insert New book into json
const insertNewBook = (bookRequest) => {
	const newData = data.rooms.map((room) => {
		if (room.name === bookRequest.roomName) {
				if(!room.book){
					room = {...room, book: []}
				}
				room.book.push(bookRequest);
		}
		return room;
	})
	return { rooms: newData };
}

// We check if the date and hour given are ok
const checkDateRequest = (request) => {
	const whatDayIsIt = moment().format('YYYY-MM-DD');
	const whatDayIsItUnix = moment(whatDayIsIt).unix();
	const whatHourIsIt = Number(moment().format('HH'));
	const requestDateUnix = moment(request.date).unix();
	if (requestDateUnix < whatDayIsItUnix) return false; // if the request date is in the past
	if (requestDateUnix - whatDayIsItUnix >= 5184000) return false; // if the requested date is 2 month in the future
	if(request.secondHour <= request.primaryHour) return false; // if the secondHour is less than the first hour
	if(requestDateUnix === whatDayIsItUnix){ // special check if we are booking for the present day
		if(request.secondHour < whatHourIsIt)  return false; // if one of the hours in range is in the past, we return false
		if(request.primaryHour < whatHourIsIt) return false;
	}
	return true
}


// Check if the name of the requested room exists
const checkIfRoomExists = (bookRequest) =>{
	const isRoomExists = data.rooms.map((room) => {
		if(room.name === bookRequest.roomName){
			return true
		}
		return null;
	})
	_.pull(isRoomExists, null)
	if(!isRoomExists[0]) return false;
	return true
}

// Check the data several times before modifiying the json file
const newBook = (req, res) => {
	const { bookRequest } = req.body;
	if(!bookRequest) return res.status(400).send({statusText: 'Bad Request'});
	const { error } = Joi.validate(bookRequest, RoomBooking, { abortEarly: false });
  if (error) {
     return res.status(400).send({error: 'Bad Request', data: data });
  }
	if (checkIfRoomExists(bookRequest) === false) return res.status(422).send({error: 'Bad Request, Room Does not exists', data: data});
	if (checkDateRequest(bookRequest) === false) return res.status(422).send({error: 'The date is not Correct', data: data });
	if (checkBookRequest(bookRequest) === false) return res.status(409).send({error: 'Conflict, reservation Impossible', data: data });
	else {
		const newData = insertNewBook(bookRequest);
		const path = process.cwd();
		fs.writeFile(`${path}/src/data/rooms.json`, JSON.stringify(newData), (err) => {
	    if(err) {
				return res.send({status: 400, statusText: err})
	    }
			return res.send({status: 200, statusText: 'File Succesfully Saved', data: newData})
	});
	}
}

export default newBook;
