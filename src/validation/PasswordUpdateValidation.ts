import * as yup from 'yup';

export const passwordUpdateSchema = yup.object().shape({
	password: yup
		.string()
		.min(6)
		.max(50)
		.required('Current Password is required'),
	newPassword: yup
		.string()
		.min(6, 'Password too short')
		.max(50, 'Password too long')
		.required('New Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});
