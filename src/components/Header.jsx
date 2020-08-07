/******************************************
*	Name : Header  
*	Parent : App.jsx
*	Children: N/A
*	Description : Header/Navbar for the application
*******************************************/
import React from 'react';

const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="navbar-brand mr-auto">DT</div>
			<div>
				<p className="vertically-center">Just a random nav bar.</p>
			</div>
		</nav>
	)
}

export default Header;