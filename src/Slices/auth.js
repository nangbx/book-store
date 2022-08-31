import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminService } from "../Services";

import AuthService from "../Services/auth.service";
import { errorMessage, successMessage } from "./message";
const user = JSON.parse(localStorage.getItem("user"));
const isAdminL = JSON.parse(localStorage.getItem("admin"));

export const login = createAsyncThunk(
	"user/login",
	async ({ email, password, isAdmin }, thunkAPI) => {
		try {
			let data;
			if (!isAdmin) {
				data = await AuthService.login(email, password);
				thunkAPI.dispatch(getProfile());
			} else {
				data = await AdminService.login(email, password);
			}
			return { user: data, isAdmin };
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.msg) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(errorMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);
export const register = createAsyncThunk(
	"user/register",
	async (
		{ username, email, password, confirmPassword, dob, gender, phone },
		thunkAPI
	) => {
		try {
			await AuthService.register(
				username,
				email,
				phone,
				password,
				confirmPassword,
				dob,
				gender
			);
			return {};
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.msg) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(errorMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);
export const getProfile = createAsyncThunk(
	"user/getProfile",
	async (thunkAPI) => {
		try {
			const response = await AuthService.getProfile();
			return { profile: response };
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.msg) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(errorMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
	try {
		await AuthService.logout();
		//thunkAPI.dispatch(successMessage("Đăng xuất thành công!"));
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.msg) ||
			error.message ||
			error.toString();
		thunkAPI.dispatch(errorMessage(message));
		return thunkAPI.rejectWithValue();
	}
});
const initialState = user
	? {
			isLoggedIn: true,
			user,
			profile: null,
			isAdmin: isAdminL ? isAdminL : false,
	  }
	: {
			isLoggedIn: false,
			user: null,
			profile: null,
			isAdmin: false,
	  };

const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
			state.isAdmin = action.payload.isAdmin;
		},
		[login.rejected]: (state, action) => {
			state.isLoggedIn = false;
			state.user = null;
			state.isAdmin = false;
		},
		[getProfile.fulfilled]: (state, action) => {
			state.profile = action.payload.profile;
		},
		[getProfile.rejected]: (state, action) => {
			state.profile = null;
		},
		[logout.fulfilled]: (state, action) => {
			state.isLoggedIn = false;
			state.user = null;
			state.profile = null;
			state.isAdmin = null;
		},
	},
});

const { reducer } = authSlice;
export default reducer;
