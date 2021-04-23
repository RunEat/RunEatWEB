import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
	return (
		<div className="Home">
			<h1>RunEat</h1>
			<p>Join the revolution. Change Your life.</p>
			<Link to="/signup">Signup</Link>
			<br/>
			<Link to="/login">Login</Link>
		</div>
	);
};

export default Home;