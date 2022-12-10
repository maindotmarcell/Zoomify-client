import * as yup from 'yup';

export const passwordUpdateSchema = yup.object().shape({
	password: yup
		.string()
		.min(6)
		.max(50)
		.required('Current password is required'),
	newPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(50, 'Password is too long')
		.required('New password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('newPassword'), null], 'Passwords must match')
		.required('Confirmation password is required'),
});
