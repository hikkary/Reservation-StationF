import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getRooms } from './rooms';

const app = express();
const roomsRouter = express.Router('/api/rooms');

roomsRouter
	.get('/api/rooms', getRooms)


app
	.use(cors())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(roomsRouter);

app.listen(8080, () => {
	console.log('App Listening on Port 8080');
})
