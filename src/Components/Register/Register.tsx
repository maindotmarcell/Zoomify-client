import axios from '../../constants/axios';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { myContext } from '../../context/UserContext';
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';

function Register() {
	// input field values
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	// form validation variables
	const [passwordIsShort, setPasswordIsShort] = useState(false);
	const [emailInvalid, setEmailInvalid] = useState(false);
	const [usernameInvalid, setUsernameInvalid] = useState(false);
	const [inputIsEmpty, setInputIsEmpty] = useState(true);
	const [inputValid, setInputValid] = useState(false);
	const [passwordMatching, setPasswordMatching] = useState(true);

	// user context
	const { refreshUser } = useContext(myContext) as any;

	useEffect(() => {
		!password && !email && !username
			? setInputIsEmpty(true)
			: setInputIsEmpty(false);

		if (!inputIsEmpty) {
			password.length < 6
				? setPasswordIsShort(true)
				: setPasswordIsShort(false);

			!isValidEmail(email) ? setEmailInvalid(true) : setEmailInvalid(false);

			username.length < 3
				? setUsernameInvalid(true)
				: setUsernameInvalid(false);

			password === password2
				? setPasswordMatching(true)
				: setPasswordMatching(false);
		}

		!passwordIsShort &&
		!emailInvalid &&
		!usernameInvalid &&
		!inputIsEmpty &&
		passwordMatching
			? setInputValid(true)
			: setInputValid(false);
		console.log(inputValid);
	}, [
		email,
		username,
		password,
		password2,
		inputValid,
		inputIsEmpty,
		passwordIsShort,
		emailInvalid,
		usernameInvalid,
		passwordMatching,
	]);

	const formBackground = useColorModeValue('gray.50', 'gray.700');

	const isValidEmail = (email: string) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const register = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'/auth/local/register',
				{
					email,
					username,
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
				<Heading mb={6}>Register</Heading>
				<form onSubmit={register}>
					<Stack mb={6}>
						<FormControl isInvalid={usernameInvalid}>
							<Input
								variant="filled"
								type="text"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							></Input>
							{usernameInvalid && (
								<FormErrorMessage>
									Username must be at least 3 characters
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={emailInvalid}>
							<Input
								variant="filled"
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Input>
							{emailInvalid && (
								<FormErrorMessage>
									Email must have a valid format
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={passwordIsShort}>
							<Input
								variant="filled"
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Input>
							{passwordIsShort && (
								<FormErrorMessage>
									Password must be at least 6 characters
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={!passwordMatching}>
							<Input
								variant="filled"
								type="password"
								placeholder="Confirm Password"
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
							></Input>
							{!passwordMatching && (
								<FormErrorMessage>Passwords aren't matching</FormErrorMessage>
							)}
						</FormControl>
						{inputValid ? (
							<Button colorScheme="teal" type="submit">
								Register
							</Button>
						) : (
							<Button colorScheme="gray" style={{ cursor: 'auto' }}>
								Register
							</Button>
						)}
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
						<Text>Register with Google</Text>
					</Button>
					<Button
						background="rgb(56,56,56)"
						color="white"
						width="100%"
						leftIcon={<FaGithub size="2rem" />}
						onClick={githubLogin}
					>
						<Text>Register with GitHub</Text>
					</Button>
				</VStack>
			</Flex>
		</Flex>
	);
}

export default Register;
