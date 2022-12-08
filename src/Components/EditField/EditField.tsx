import React, { useContext, useState } from 'react';
import {
	Editable,
	EditableInput,
	EditablePreview,
	Input,
} from '@chakra-ui/react';
import EditableControls from '../EditableControls/EditableControls';
import { IEditFieldProps, IUserContext } from '../../types/maintypes';
import { UserContext } from '../../context/UserContext';

export default function EditField(props: IEditFieldProps) {
	const [input, setInput] = useState('');
	const { userObject } = useContext(UserContext) as IUserContext;

	return (
		<Editable
			textAlign="center"
			defaultValue={userObject.username}
			fontSize="2xl"
			isPreviewFocusable={false}
			onSubmit={() => props.onSubmit(input)}
			justifyContent="start"
		>
			<EditablePreview />
			<Input
				as={EditableInput}
				value={input}
				onChange={(event) => setInput(event.target.value)}
			/>
			<EditableControls />
		</Editable>
	);
}
