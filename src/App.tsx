import React from 'react';
import './GlobalStyles.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import NavBar from './Components/NavBar/NavBar';

function App() {
	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
