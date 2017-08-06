import express from 'express';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import { getRooms, newBook } from './rooms';

const app = express();
const roomsRouter = express.Router('/api/rooms');

// The Router to get rooms and book
roomsRouter
	.get('/api/rooms', getRooms)
	.put('/api/rooms', newBook)


app
	.use(cors())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(roomsRouter);

app.listen(8080, () => {
	console.log('App Listening on Port 8080');
})
