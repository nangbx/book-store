import { API } from "../const";
import authHeader from "./auth-header";
import axios from "axios";

const getProfile = () => {
	return axios
		.get(API + "profile", {
			headers: authHeader(),
		})
		.then((res) => {
			return res.data.result;
		});
};

const updateProfile = (name, phone, gender, dob) => {
	return axios
		.put(
			API + "profile/update",
			{
				name,
				gender,
				phone,
				dob,
			},
			{
				headers: authHeader(),
			}
		)
		.then((res) => {
			return "Thay đổi thành công";
		})
		.catch((err) => {
			console.log(err);
			return "Thay đổi thất bại";
		});
};

const updateAvatar = (avatar) => {
	const formData = new FormData();

	formData.append("File", avatar);

	return axios
		.put(API + "profile/avatar", formData, {
			headers: authHeader(),
		})
		.then((res) => {
			console.log(res);
		});
};

const changePassword = (currentPassword, newPassword, confirmNewPassword) => {
	return axios
		.put(
			API + "profile/changepassword",
			{
				currentPassword,
				newPassword,
				confirmNewPassword,
			},
			{
				headers: authHeader(),
			}
		)
		.then((res) => {
			return {
				status: res.statusText,
				msg: "Thay đổi mật khẩu thành công!",
			};
		})
		.catch((err) => {
			console.log(err);
			return {
				status: err.response.statusText,
				msg: err.response.data.msg,
			};
		});
};

const userService = {
	getProfile,
	updateProfile,
	updateAvatar,
	changePassword,
};
export default userService;
