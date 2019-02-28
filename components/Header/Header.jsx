import React from 'react';
//import PropTypes from 'prop-types';

import './Header.scss';

// const propTypes = {

// };

// const defaultProps = {

// };

const logoUrl = 'logo.png';

function Header(props){
	return (
		<div className="header-wrapper">
			<div className="header">
				<img className="header-logo" src={logoUrl} alt='EVEN' />		
			</div>
		</div>
	);
}

// Header.propTypes = propTypes;
// Header.defaultProps = defaultProps;

export default Header;
