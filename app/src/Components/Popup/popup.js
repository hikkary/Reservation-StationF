import React from 'react';
import PropTypes from 'prop-types';

const Popup = ({cancelPopup, newBook, sentence}) => (
	<div className="popupContainer">
 		<div className="popup">
		 	{sentence}
		 	<div className="yesButton" onClick={newBook}>Oui</div>
		 	<div className="noButton" onClick={cancelPopup}>Annuler</div>
 		</div>
	</div>
)

Popup.propTypes = {
	newBook: PropTypes.func,
	cancelPopup: PropTypes.func,
	sentence: PropTypes.object,
}

export default Popup;
