import axios from '../../constants/axios';
import React, { FormEvent, useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { myContext } from '../../context/UserContext';
import {
	Button,
	Flex,
	Heading,
	Input,
	useColorModeValue,
	Text,
	VStack,
	Stack,
} from '@chakra-ui/react';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { refreshUser } = useContext(myContext) as any;

	const formBackground = useColorModeValue('gray.50', 'gray.700');

	const login = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'auth/local/login',
				{
					email,
					password,
				},
				{ withCredentials: true }
			);
			console.log(response);
			refreshUser();
		} catch (err) {
			console.log(err);
		}
	};

	const googleLogin = () => {
		window.open(`${axios.defaults.baseURL}/auth/google`, '_self');
	};

	const githubLogin = () => {
		window.open(`${axios.defaults.baseURL}/auth/github`, '_self');
	};

	return (
		<Flex height="100vh" alignItems="center" justifyContent="center">
			<Flex direction="column" background={formBackground} p={12} rounded={6}>
				<form onSubmit={login}>
					<Stack>
						<Heading mb={6}>Login</Heading>
						<Input
							variant="filled"
							mb={3}
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Input>
						<Input
							variant="filled"
							mb={6}
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Input>
						<Button mb={6} colorScheme="teal" type="submit">
							Login
						</Button>
					</Stack>
				</form>
				<VStack>
					<h3>Or register with:</h3>
					<Button
						background="#4385f4"
						mb={3}
						color="white"
						leftIcon={<FcGoogle size="2rem" />}
						onClick={googleLogin}
					>
						<Text>Login with Google</Text>
					</Button>
					<Button
						background="rgb(56,56,56)"
						color="white"
						width="100%"
						leftIcon={<FaGithub size="2rem" />}
						onClick={githubLogin}
					>
						<Text>Login with GitHub</Text>
					</Button>
				</VStack>
			</Flex>
		</Flex>
	);
}

export default Login;
