import React, { useContext } from 'react';
import './GlobalStyles.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import { myContext } from './Context';
import Register from './components/Register/Register';

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
