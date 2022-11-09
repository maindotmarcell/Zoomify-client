import React, { useContext } from 'react';
import './GlobalStyles.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import NavBar from './Components/NavBar/NavBar';
import { myContext } from './Context';
import Register from './Components/Register/Register';

function App() {
	const userObject = useContext(myContext);
	console.log(userObject);
	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
