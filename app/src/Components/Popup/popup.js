import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Popup = ({cancelPopup, validate, sentence, yesButton = true, noButton = true, animation = false}) => (
	<div className="popupContainer">
 		<div className="popup">
		 	{sentence}
			{animation && <div className="animation"> <p>Reservation effectué avec succès</p></div>}
			<div className="bottomLine">
			 	{ noButton && <div className="noButton" onClick={cancelPopup}>Annuler</div>}
				{ yesButton && <div className="yesButton" onClick={validate}>Valider</div>}
			</div>
		</div>
	</div>
)

Popup.propTypes = {
	validate: PropTypes.func,
	cancelPopup: PropTypes.func,
	sentence: PropTypes.object,
	yesButton: PropTypes.boolean,
	noButton: PropTypes.boolean,
}

export default Popup;
