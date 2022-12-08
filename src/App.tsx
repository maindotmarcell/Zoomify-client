import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Register from './pages/Register/Register';
import { ChakraProvider } from '@chakra-ui/react';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AuthRoute from './PrivateRoute/AuthRoute';
import theme from './constants/theme';
import Account from './pages/Account/Account';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<NavBar />
				<Routes>
					<Route element={<PrivateRoute />}>
						<Route path="/" element={<Home />} />
						<Route path='/account' element={<Account />}/>
					</Route>
					<Route element={<AuthRoute />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>
				</Routes>
			</div>
		</ChakraProvider>
	);
}

export default App;
