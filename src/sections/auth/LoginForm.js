import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Slices/auth";
import { FormikProvider, useFormik } from "formik";
import { successMessage } from "../../Slices/message";

export default function LoginForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email("Email must be a valid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			isAdmin: false,
		},
		validationSchema: LoginSchema,
		onSubmit: () => {
			const { email, password, isAdmin } = formik.values;
			dispatch(login({ email, password, isAdmin }))
				.unwrap()
				.then(() => {
					dispatch(successMessage("Đăng nhập thành công!"));
					navigate("/");
				})
				.catch(() => {});
		},
	});
	const { values, handleSubmit, handleChange } = formik;

	const handleSignUpOnClick = () => {
		navigate("/auth/register");
	};
	return (
		<FormikProvider value={formik}>
			<form onSubmit={handleSubmit} className='login__register' id='login-in'>
				<h1 className='login__title'>Sign In</h1>
				<div className='login__box'>
					<i className='fa-solid fa-user login__icon' />
					<input
						type='text'
						placeholder='Email'
						name='email'
						className='login__input'
						value={values.email}
						onChange={handleChange}
					/>
				</div>
				<div className='login__box'>
					<i className='fa-solid fa-lock login__icon' />
					<input
						type='password'
						name='password'
						placeholder='Password'
						className='login__input'
						value={values.password}
						onChange={handleChange}
					/>
				</div>
				<div className='login__forgot'>
					<label htmlFor=''>
						<input
							type='checkbox'
							name='isAdmin'
							id=''
							value={values.isAdmin}
							onChange={handleChange}
						/>
						Login as admin
					</label>
				</div>
				<a
					href='#javascript'
					onClick={handleSubmit}
					type='submit'
					className='login__button'
				>
					Sign In
				</a>
				<div>
					<span className='login__account'>Don't have an Account?</span>
					<span
						className='login__signin'
						id='sign-up'
						onClick={handleSignUpOnClick}
					>
						Sign Up
					</span>
				</div>
			</form>
		</FormikProvider>
	);
}
