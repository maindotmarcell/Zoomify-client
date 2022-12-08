import React from 'react';
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

const Account = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const submitNewUsername = (newUsername: string) => {
		console.log('Updating new username to:', newUsername);
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
							<Button onClick={onOpen}>Change Password</Button>
							<Button colorScheme="red">Delete Account</Button>
						</Stack>
					</CardBody>
				</Card>
			</Stack>
			<PasswordUpdateModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
		</div>
	);
};
export default Account;
