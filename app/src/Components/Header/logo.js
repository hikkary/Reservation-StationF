import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({onClick}) => (
	<div className="logo">
		<p>STATION F</p>
	</div>
)

Logo.propTypes = {
	onClick: PropTypes.func, 
}

export default Logo;
