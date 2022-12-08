import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import React, { useState } from 'react';
import { IChangePWModal } from '../../types/maintypes';
import { passwordUpdateSchema } from '../../validation/PasswordUpdateValidation';

export default function PasswordUpdateModal(props: IChangePWModal) {
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const updatePassword = async () => {
		let formData = {
			password,
			newPassword,
			confirmPassword,
		};
		try {
			const isValid = await passwordUpdateSchema.isValid(formData);
			console.log(
				'🚀 ~ file: PasswordUpdateModal.tsx:30 ~ changePassword ~ isValid',
				isValid
			);
		} catch (error: any) {
			console.log(error.errors);
		}
	};

	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Change Password</ModalHeader>
				<Formik
					initialValues={{
						password: '',
						newPassword: '',
						confirmPassword: '',
					}}
					onSubmit={(data) => {
						console.log(
							'🚀 ~ file: PasswordUpdateModal.tsx:75 ~ PasswordUpdateModal ~ data',
							data
						);
					}}
				>
					{({ values }) => (
						<Form>
							<ModalBody>
								<FormLabel>Enter current password:</FormLabel>
								<Field
									name="password"
									type="password"
									placeholder="****"
									as={Input}
								></Field>
								<FormLabel>Enter new password:</FormLabel>
								<Field
									name="newPassword"
									type="password"
									placeholder="****"
									as={Input}
								></Field>
								<FormLabel>Confirm new password:</FormLabel>
								<Field
									name="confirmPassword"
									type="password"
									placeholder="****"
									as={Input}
								></Field>
								<pre>{JSON.stringify(values, null, 2)}</pre>
							</ModalBody>
							<ModalFooter>
								<Button
									variant="outline"
									colorScheme="red"
									mr={3}
									onClick={props.onClose}
								>
									Close
								</Button>
								<Button colorScheme="green" type="submit">
									Submit
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	);
}
