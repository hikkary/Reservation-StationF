import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({data, onClick}) => (
	<div className="choice">
		<p className="checkBoxTitle">{data}</p>
		<input className="checkBox" type="checkbox" name={data} value={data} onClick={onClick}/>
	</div>
);

CheckBox.propTypes = {
	data: PropTypes.string,
	onClick: PropTypes.func,
}

export default CheckBox;
