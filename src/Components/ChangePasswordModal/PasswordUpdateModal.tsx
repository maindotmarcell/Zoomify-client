import React, { useContext } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	FormLabel,
	Input,
	Text,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { IChangePWModal, IUserContext } from '../../types/maintypes';
import { passwordUpdateSchema } from '../../validation/PasswordUpdateValidation';
import axios from '../../constants/axios';
import { AxiosResponse } from 'axios';
import { UserContext } from '../../context/UserContext';

export default function PasswordUpdateModal(props: IChangePWModal) {
	const { userObject } = useContext(UserContext) as IUserContext;

	const updatePassword = async (password: string, newPassword: string) => {
		const response: AxiosResponse = await axios.put(
			'/account/updatePassword',
			{
				id: userObject._id,
				password,
				newPassword,
			},
			{
				withCredentials: true,
			}
		);

		if (response.data === 'Incorrect password.') alert('Incorrect password.');
		if (response.data === 'Password updated.') alert('Password updated.');
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
					onSubmit={async (data, { setSubmitting }) => {
						setSubmitting(true);
						await updatePassword(data.password, data.newPassword);
						setSubmitting(false);
					}}
					validationSchema={passwordUpdateSchema}
				>
					{({ values, errors, isSubmitting }) => (
						<Form>
							<ModalBody>
								<FormLabel>Enter current password:</FormLabel>
								<Field
									name="password"
									type="password"
									placeholder="****"
									as={Input}
								></Field>
								<Text color="#fb8181">{errors.password}</Text>
								<FormLabel mt={1}>New password:</FormLabel>
								<Field
									name="newPassword"
									type="password"
									placeholder="****"
									as={Input}
								></Field>
								<Text color="#fb8181">{errors.newPassword}</Text>
								<FormLabel mt={1}>Confirm new password:</FormLabel>
								<Field
									name="confirmPassword"
									type="password"
									placeholder="****"
									as={Input}
								></Field>
								<Text color="#fb8181">{errors.confirmPassword}</Text>
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
								<Button
									isLoading={isSubmitting}
									colorScheme="green"
									type="submit"
								>
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
