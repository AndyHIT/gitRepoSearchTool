import React from 'react';
import PropTypes from 'prop-types';

import './ResultForm.scss';

const propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	stars: PropTypes.number,
	license: PropTypes.string,
	forks: PropTypes.number,
};

const defaultProps = {
	name: '',
	owner: '',
	description: '',
	stars: 0,
	license: '',
	fork: false,

};

function ResultForm(props){
	return (
		<div className="result-item-wrapper">
			<div className="info-wrapper item-wrapper">
				<div className="result-name">{props.name}</div>
				<div className={props.forks>0 ? 'result-forked' : 'hide'}>{props.forks>0 ? 'forked' : ''}</div>
				<div className="result-description">{props.description}</div>
			</div>
			<div className="star-wrapper item-wrapper secondary-wrapper">
				<div className="result-star-title">Stars:</div>
				<div className="result-star">{props.stars}</div>
			</div>			
			<div className="license-wrapper item-wrapper secondary-wrapper">
				<div className="result-license-title">License:</div>
				<div className="result-license">{props.license}</div>
			</div>
		</div>
	);
}

ResultForm.propTypes = propTypes;
ResultForm.defaultProps = defaultProps;

export default ResultForm;