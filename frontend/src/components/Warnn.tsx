import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/warn.css';


const WarningComponent = () => {
	return (
		<div className="warning">
			<h3 >Warning: Login Required</h3>
			<p >You need to log in to view this content.</p>
			<p >Please login to access the page.</p>
		</div>
	);
};

export default WarningComponent;
