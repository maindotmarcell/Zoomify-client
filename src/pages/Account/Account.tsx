import React, { useContext } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Heading,
	HStack,
	Stack,
	useDisclosure,
} from '@chakra-ui/react';
import EditField from '../../components/EditField/EditField';
import PasswordUpdateModal from '../../components/ChangePasswordModal/PasswordUpdateModal';
import axios from '../../constants/axios';
import { AxiosResponse } from 'axios';
import { UserContext } from '../../context/UserContext';
import { IUserContext } from '../../types/maintypes';

const Account = () => {
	const { userObject } = useContext(UserContext) as IUserContext;

	const { isOpen, onOpen, onClose } = useDisclosure();

	const submitNewUsername = async (newUsername: string) => {
		console.log('Updating new username to:', newUsername);
		const response: AxiosResponse = await axios.put(
			'/account/updateUsername',
			{
				id: userObject._id,
				newUsername,
			},
			{ withCredentials: true }
		);
		console.log(response);
	};

	const deleteAccount = () => {
		console.log('Delete Account');
	};

	return (
		<div>
			<Stack>
				<Card>
					<CardHeader>
						<Heading>My Account</Heading>
					</CardHeader>
					<CardBody>
						<Stack>
							<HStack>
								<Heading size="md">Username:</Heading>
								<EditField onSubmit={submitNewUsername} />
							</HStack>
							{userObject.password && (
								<Button onClick={onOpen}>Change Password</Button>
							)}
							<Button onClick={deleteAccount} colorScheme="red">
								Delete Account
							</Button>
						</Stack>
					</CardBody>
				</Card>
			</Stack>
			<PasswordUpdateModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
		</div>
	);
};
export default Account;
