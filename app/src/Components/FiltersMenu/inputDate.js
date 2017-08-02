import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const todayOrTommorow = () => {
	const whatHourIsIt = moment().format('HH');
	if(Number(whatHourIsIt) >= 18){ // after 18h we cannot book for the present day
		return moment().add('1', 'days').format('YYYY-MM-DD');
	} else { // else we can book the present day
		return moment().format('YYYY-MM-DD');
	}
}

const InputDate = ({getDate}) => (
	<input className="inputDate" onChange={getDate} type='date' min={todayOrTommorow()} max={moment().add('2','month').format('YYYY-MM-DD')} defaultValue={todayOrTommorow()} />
)

InputDate.propTypes = {
		getDate: PropTypes.func,
}

export default InputDate;
