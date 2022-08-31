import axios from "axios";
import { API } from "../const";
import authHeader from "./auth-header";

const login = (email, password) => {
	return axios
		.post(API + "auth/login", {
			email,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
				localStorage.setItem("admin", false);
			}
			return response.data;
		});
};
const getProfile = () => {
	return axios
		.get(API + "profile", {
			headers: authHeader(),
		})
		.then((response) => {
			if (response && response.data && response.data.result) {
				return response.data.result;
			}
		});
};

const register = (
	username,
	email,
	phone,
	password,
	confirmPassword,
	dob,
	gender
) => {
	return axios.post(API + "auth/register", {
		username,
		email,
		password,
		confirmPassword,
		phone,
		dob,
		gender,
	});
};

const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("admin");
};

const authService = {
	login,
	register,
	getProfile,
	logout,
};
export default authService;
