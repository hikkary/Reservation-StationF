import React from 'react';
import PropTypes from 'prop-types';
import Logo from './logo';
import './style.css';

const Header = ({ onClick }) => (
	<div className="header" >
		<Logo onClick={onClick}/>
	</div>
)

Header.propTypes = {
	onClick: PropTypes.func,
};

export default Header;
