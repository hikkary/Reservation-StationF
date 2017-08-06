import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
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
	.use(roomsRouter)
	.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));
app.listen(8080, () => {
	console.log('Application Availabe at http://localhost:8080/');
})
