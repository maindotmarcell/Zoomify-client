import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import axios from '../../constants/axios';
import { AxiosResponse } from 'axios';
import { Button, useColorMode } from '@chakra-ui/react';

export default function NavBar() {
	const { toggleColorMode } = useColorMode();

	const logout = () => {
		axios
			.get('/auth/logout', {
				withCredentials: true,
			})
			.then((res: AxiosResponse) => {
				console.log(res);
				if (res.data === 'success') {
					window.location.href = '/';
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className={styles.navBarWrapper}>
			<ul className={styles.navBar}>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li onClick={logout}>Logout</li>
				<Button onClick={toggleColorMode}>Toggle Theme</Button>
			</ul>
		</div>
	);
}
