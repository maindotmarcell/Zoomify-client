import * as yup from 'yup';

export const registerSchema = yup.object().shape({
	username: yup.string().min(3).max(30).required('Username is required'),
	email: yup
		.string()
		.email('Email must be valid')
		.required('Email is required'),
	password: yup.string().min(6).max(50).required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirmation password is required'),
});
