import React from 'react';
import './GlobalStyles.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Register from './components/Register/Register';
import { ChakraProvider } from '@chakra-ui/react';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Context from './context/UserContext';
import AuthRoute from './PrivateRoute/AuthRoute';

function App() {
	return (
		<ChakraProvider>
			<div className="App">
				<Context>
					<NavBar />
					<Routes>
						<Route element={<PrivateRoute />}>
							<Route path="/" element={<Home />} />
						</Route>
						<Route element={<AuthRoute />}>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Route>
					</Routes>
				</Context>
			</div>
		</ChakraProvider>
	);
}

export default App;
