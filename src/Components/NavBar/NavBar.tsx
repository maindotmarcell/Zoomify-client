import React, { useContext } from 'react';
import axios from '../../constants/axios';
import { AxiosResponse } from 'axios';
import {
	Button,
	useColorMode,
	useColorModeValue,
	Text,
	Flex,
	MenuButton,
	Menu,
	MenuList,
	Portal,
	MenuItem,
	MenuDivider,
} from '@chakra-ui/react';
import { UserContext } from '../../context/UserContext';
import { IUserContext } from '../../types/maintypes';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function NavBar() {
	const { userObject, signedIn } = useContext(UserContext) as IUserContext;
	console.log('Signed in: ', signedIn);
	const { toggleColorMode, colorMode } = useColorMode();
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
			alignItems="center"
		>
			<Button
				style={{ userSelect: 'none' }}
				color={textColour}
				onClick={toggleColorMode}
				margin={2}
			>
				{colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
			</Button>
			{signedIn && (
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<ChevronDownIcon />}
						color={textColour}
					>
						Menu
					</MenuButton>
					<Portal>
						<MenuList>
							<MenuItem as={Link} to="/">
								Home
							</MenuItem>
							<MenuItem as={Link} to="/account">
								My Account
							</MenuItem>
							<MenuDivider />
							<MenuItem onClick={logout}>Logout</MenuItem>
						</MenuList>
					</Portal>
				</Menu>
			)}
			{signedIn && <Text margin={2}>Welcome back {userObject.username}</Text>}
		</Flex>
	);
}
