import Joi from 'joi';

const RoomBooking = Joi.object().keys({
	primaryHour: Joi.number().min(8).max(19).required(),
	secondHour: Joi.number().min(9).max(20).required(),
	date: Joi.string().regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).required(),
	roomName: Joi.string().required(),
})

export default RoomBooking;
