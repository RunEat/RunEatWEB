import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../Navbar/Navbar'
import { useUser } from '../../hooks/useUserContext';
import { logout } from '../../store/AccessTokenStore';

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
					<button className="btn btn-danger mx-1" onClick={logout}><Link className="text-white" to="/signup">Log out</Link></button>
				</>
			)
			: (
				<div className="Signup">
				<video playsinline autoPlay muted loop id="bgvid" className="SignupVideo">
					<source src="./RunEat_clip.webm" type="video/webm"/>
					<source src="./RunEat_clip.mp4" type="video/mp4"/>
				</video>
				<h1 className="text-white font-weitght-bold">RunEat</h1>
				<button className="btn btn-primary mx-1 rounded-2"><Link className="text-white" to="/signup">Sign up</Link></button>
				<button className="btn btn-primary mx-1"><Link className="text-white" to="/login">Log in</Link></button>
				</div>
			)
			}
		</div>	
	);
};

export default Home;