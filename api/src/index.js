import express from 'express';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import { getRooms } from './rooms';

const app = express();
const roomsRouter = express.Router('/api/rooms');

const newBook = (req, res) => {
	console.log('newBook bitch');
	console.log(req.body);
	fs.writeFile("./data/test.json", req.body.username, (err) => {
    if(err) {
      console.log(err);
    }
    console.log("The file was saved!");
});
	res.send('Wesh morray')
}

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
