import React, { useContext } from 'react';
import axios from '../../constants/axios';
import { AxiosResponse } from 'axios';
import {
	Button,
	useColorMode,
	useColorModeValue,
	Text,
	Flex,
} from '@chakra-ui/react';
import { UserContext } from '../../context/UserContext';
import { IUserContext } from '../../types/maintypes';

export default function NavBar() {
	const { userObject, signedIn } = useContext(UserContext) as IUserContext;
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
		<Flex
			bg="black"
			height={50}
			justifyContent="flex-start"
			color="white"
			style={{ width: '100%' }}
		>
			<Flex alignItems="center" justifyContent="space-between">
				<Button
					margin={1}
					style={{ userSelect: 'none' }}
					color={textColour}
					onClick={toggleColorMode}
				>
					Toggle Theme
				</Button>
				{signedIn && (
					<Button
						margin={1}
						style={{ userSelect: 'none' }}
						colorScheme="red"
						onClick={logout}
					>
						Logout
					</Button>
				)}
				{signedIn && <Text margin={1}>Welcome back {userObject.username}</Text>}
			</Flex>
		</Flex>
	);
}
