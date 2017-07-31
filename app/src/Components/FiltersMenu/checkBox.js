import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({data}) => (
	<div className="choice">
		<p className="checkBoxTitle">{data}</p>
		<input className="checkBox" type="checkbox" name={data} value={data}/>
	</div>
);

CheckBox.propTypes = {
	data: PropTypes.string,
}

export default CheckBox;
