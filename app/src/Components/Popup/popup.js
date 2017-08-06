import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Popup = ({cancelPopup, newBook, sentence}) => (
	<div className="popupContainer">
 		<div className="popup">
		 	{sentence}
			<div className="bottomLine">
			 	<div className="noButton" onClick={cancelPopup}>Annuler</div>
				<div className="yesButton" onClick={newBook}>Oui</div>
			</div>
		</div>
	</div>
)

Popup.propTypes = {
	newBook: PropTypes.func,
	cancelPopup: PropTypes.func,
	sentence: PropTypes.object,
}

export default Popup;
