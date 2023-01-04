import React, { useContext, useState } from 'react';
import axios from '../../constants/axios';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import {
	Button,
	Flex,
	Heading,
	Input,
	Spinner,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { githubLogin, googleLogin } from '../../helper/oauthStrategies';
import { IUserContext } from '../../types/maintypes';
import { Formik, Field, Form } from 'formik';
import { registerSchema } from '../../validation/RegisterValidation';

function Register() {
	// email taken validation
	const [emailTaken, setEmailTaken] = useState(false);
	const [prevEmail, setPrevEmail] = useState('');

	// user context
	const { refreshUser, loadingUser } = useContext(UserContext) as IUserContext;

	// router navigater
	const navigate = useNavigate();

	const formBackground = useColorModeValue('gray.300', 'gray.700');
	const textColour = useColorModeValue('gray.400', 'white');

	const register = async (
		username: string,
		email: string,
		password: string
	) => {
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
			navigate('/');
		} catch (err: any) {
			console.log(err);
			console.log(err.response.status);
			if (err.response.status === 409) {
				setPrevEmail(email);
				setEmailTaken(true);
			}
		}
	};

	return (
		<Flex height="100vh" alignItems="center" justifyContent="center">
			{loadingUser ? (
				<Spinner size="xl" />
			) : (
				<Flex direction="column" background={formBackground} p={12} rounded={6}>
					<Heading style={{ userSelect: 'none' }} mb={6}>
						Register
					</Heading>
					<Formik
						initialValues={{
							username: '',
							email: '',
							password: '',
							confirmPassword: '',
						}}
						onSubmit={async (data, { setSubmitting }) => {
							setSubmitting(true);
							await register(data.username, data.email, data.password);
							setSubmitting(false);
						}}
						validationSchema={registerSchema}
					>
						{({ values, errors, isSubmitting }) => (
							<Form>
								<Stack mb={6}>
									<Field
										name="username"
										type="text"
										placeholder="Username"
										as={Input}
										variant="filled"
									></Field>
									<Text color="#fb8181">{errors.username}</Text>
									<Field
										name="email"
										type="text"
										placeholder="Email"
										as={Input}
										variant="filled"
										mt={3}
									></Field>
									<Text color="#fb8181">{errors.email}</Text>
									{emailTaken && (
										<Text color="#fb8181">
											Email: {prevEmail} is already taken
										</Text>
									)}
									<Field
										name="password"
										type="password"
										placeholder="Password"
										as={Input}
										variant="filled"
										mt={3}
									></Field>
									<Text color="#fb8181">{errors.password}</Text>
									<Field
										name="confirmPassword"
										type="password"
										placeholder="Confirm Password"
										as={Input}
										variant="filled"
										mt={3}
									></Field>
									<Text color="#fb8181">{errors.confirmPassword}</Text>
									{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
									<Button
										isLoading={isSubmitting}
										colorScheme="teal"
										type="submit"
										mt={6}
									>
										Register
									</Button>
								</Stack>
							</Form>
						)}
					</Formik>
					<Stack mb={6}>
						<h3 style={{ userSelect: 'none' }}>Or register with:</h3>
						<Button
							background="#4385f4"
							mb={3}
							color={textColour}
							leftIcon={<FcGoogle size="2rem" />}
							onClick={googleLogin}
						>
							<Text>Register with Google</Text>
						</Button>
						<Button
							background="rgb(56,56,56)"
							color={textColour}
							width="100%"
							leftIcon={<FaGithub size="2rem" />}
							onClick={githubLogin}
						>
							<Text>Register with GitHub</Text>
						</Button>
					</Stack>
					<Text style={{ userSelect: 'none' }}>
						Already have an account? <Link to="/login">Login here</Link>.
					</Text>
				</Flex>
			)}
		</Flex>
	);
}

export default Register;
