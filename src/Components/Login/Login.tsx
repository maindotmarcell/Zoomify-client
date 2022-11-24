import axios from '../../constants/axios';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
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
	Stack,
	FormControl,
	FormErrorMessage,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { githubLogin, googleLogin } from '../../helper/oauthStrategies';
import isValidEmail from '../../helper/isValidEmail';

function Login() {
	// input field values
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// form validation values
	const [inputValid, setInputValid] = useState(false);
	const [invalidCredentials, setInvalidCredentials] = useState(false);

	useEffect(() => {
		if (isValidEmail(email) && password) setInputValid(true);
		else setInputValid(false);
	}, [email, password]);

	const { refreshUser } = useContext(myContext) as any;
	const navigate = useNavigate();

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
			navigate('/');
		} catch (err: any) {
			console.log(err);
			if (err.response.status === 401) {
				setInvalidCredentials(true);
			}
		}
	};

	return (
		<Flex height="100vh" alignItems="center" justifyContent="center">
			<Flex direction="column" background={formBackground} p={12} rounded={6}>
				<form onSubmit={login}>
					<Stack mb={6}>
						<Heading mb={6}>Login</Heading>
						<FormControl isInvalid={invalidCredentials}>
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
								mb={3}
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Input>
							{invalidCredentials && (
								<FormErrorMessage>Invalid Login Credentials</FormErrorMessage>
							)}
						</FormControl>
						{inputValid ? (
							<Button colorScheme="teal" type="submit">
								Login
							</Button>
						) : (
							<Button colorScheme="gray" style={{ cursor: 'auto' }}>
								Login
							</Button>
						)}
					</Stack>
				</form>
				<Stack mb={6}>
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
				</Stack>
				<Text>
					Don't have an account yet? <Link to="/register">Register here</Link>.
				</Text>
			</Flex>
		</Flex>
	);
}

export default Login;
