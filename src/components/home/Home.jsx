import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../Navbar/Navbar'
import { useUser } from '../../hooks/useUserContext';

const Home = () => {

	const { user } = useUser()
	
	
	return (
		<div className="Home text-center d-flex justify-content-center align-items-center">
			{
			user ?
				(
				<>	
				<h1>RunEat</h1>
					<Navbar />
				</>
			)
			: (
				<div className="Signup text-white d-flex flex-column justify-content-between h-100">
					<div>
						<h4 className="mb-0 pb-0 mt-2">Welcome to</h4>
						<h1 className="font-weitght-bold mt-0 p-0">RunEat</h1>
					</div>
					<video playsinline autoPlay muted loop id="bgvid" className="SignupVideo">
						<source src="./RunEat_clip.webm" type="video/webm"/>
						<source src="./RunEat_clip.mp4" type="video/mp4"/>
					</video>
					<div className="mb-3">
						<button className="btn btn-success mx-1 w-100"><Link className="link text-white" to="/signup">SIGN UP</Link></button>
						<p className="mt-3 mb-1">Got a RunEat account?</p>
						<button className="btn btn-light mx-1 w-100"><Link className="link text-dark" to="/login-first">LOG IN</Link></button>
					</div>
				</div>
			)
			}
		</div>	
	);
};

export default Home;