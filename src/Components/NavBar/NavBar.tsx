import React, { useContext } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import axios from '../../constants/axios';
import { AxiosResponse } from 'axios';
import { Button, useColorMode } from '@chakra-ui/react';
import { myContext } from '../../context/UserContext';

export default function NavBar() {
	const { signedIn } = useContext(myContext) as any;
	console.log(signedIn);
	const { toggleColorMode } = useColorMode();

	const logout = () => {
		axios
			.get('/auth/logout', {
				withCredentials: true,
			})
			.then((res: AxiosResponse) => {
				console.log(res);
				if (res.data === 'success') {
					window.location.href = '/login';
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className={styles.navBarWrapper}>
			<ul className={styles.navBar}>
				<Button onClick={toggleColorMode}>Toggle Theme</Button>
				{signedIn && (
					<Button colorScheme="red" onClick={logout}>
						Logout
					</Button>
				)}
			</ul>
		</div>
	);
}
