import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../Navbar/Navbar'
import { useUser } from '../../hooks/userUserContext';

const Home = () => {

	const {user} = useUser()
	
	return (
		<div className="Home">
			{
			user ?
				(
				<>	
				<h1>RunEat</h1>
				<Navbar />
				</>
			)
			: (
				<>
				<h1>RunEat</h1>
				<button className="btn btn-primary mx-1"><Link className="text-white" to="/signup">Sign up</Link></button>
				<button className="btn btn-primary mx-1"><Link className="text-white" to="/login">Log in</Link></button>
				</>
			)
			}
		</div>	
	);
};

export default Home;