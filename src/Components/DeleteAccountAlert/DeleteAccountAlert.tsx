import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React, { RefObject, useContext, useRef } from 'react';
import axios from '../../constants/axios';
import { UserContext } from '../../context/UserContext';
import { IUserContext } from '../../types/maintypes';

export default function DeleteAccountAlert() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef: RefObject<any> = useRef();

	const { userObject } = useContext(UserContext) as IUserContext;

	const deleteAccount = async () => {
		const response: AxiosResponse = await axios.delete(
			'/account/delete-account',
			{
				data: { id: userObject._id },
				withCredentials: true,
			}
		);

		console.log(response);
		if (response.status === 200) window.location.href = '/login';
	};

	return (
		<>
			<Button colorScheme="red" onClick={onOpen}>
				Delete Account
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Customer
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={onClose}>Cancel</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									deleteAccount();
									onClose();
								}}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
