import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {};
const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		successMessage: (state, action) => {
			toast.success(`${action.payload}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		},
		errorMessage: (state, action) => {
			toast.error(`${action.payload}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		},
		clearMessage: () => {
			return { message: "" };
		},
	},
});
const { reducer, actions } = messageSlice;
export const { successMessage, errorMessage } = actions;
export default reducer;
