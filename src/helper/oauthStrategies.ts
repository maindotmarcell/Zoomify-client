import axios from "../constants/axios";

export const googleLogin = () => {
	window.open(`${axios.defaults.baseURL}/auth/google`, '_self');
};

export const githubLogin = () => {
	window.open(`${axios.defaults.baseURL}/auth/github`, '_self');
};
