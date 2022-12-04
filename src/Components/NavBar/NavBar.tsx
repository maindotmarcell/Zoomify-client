import React, { useContext } from 'react';
import styles from './NavBar.module.css';
import axios from '../../constants/axios';
import { AxiosResponse } from 'axios';
import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { UserContext } from '../../context/UserContext';
import { IUserContext } from '../../types/maintypes';

export default function NavBar() {
	const { signedIn } = useContext(UserContext) as IUserContext;
	console.log('Signed in: ', signedIn);
	const { toggleColorMode } = useColorMode();
	const textColour = useColorModeValue('black', 'white');

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
				<Button onClick={toggleColorMode} color={textColour}>
					Toggle Theme
				</Button>
				{signedIn && (
					<Button colorScheme="red" onClick={logout}>
						Logout
					</Button>
				)}
			</ul>
		</div>
	);
}
