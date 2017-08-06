import React from 'react';
import PropTypes from 'prop-types';

const CapacityRange = ({currentCapacity, onRangeChange, minCapacity, maxCapacity, title }) => (
	<div className="capacity">
		<div>{title}</div>
		<input type="range" id="range" onChange={onRangeChange} min={minCapacity} max={maxCapacity} defaultValue={maxCapacity}/>
		{currentCapacity && currentCapacity }
		{!currentCapacity && maxCapacity}
	</div>
)

CapacityRange.propTypes = {
		title: PropTypes.string,
		currentCapacity: PropTypes.number,
		onRangeChange: PropTypes.func,
		minCapacity: PropTypes.number,
		maxCapacity: PropTypes.number,
}

export default CapacityRange;
