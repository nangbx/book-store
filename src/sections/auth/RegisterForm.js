import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";
import { register } from "../../Slices/auth";
import { successMessage } from "../../Slices/message";
import GenderSelect from "../../Components/Select/GenderSelect";

export default function RegisterForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const RegisterSchema = Yup.object().shape({
		userName: Yup.string().required("Username is required"),
		email: Yup.string()
			.email("Email must be a valid email address")
			.required("Email is required"),
		phoneNumber: Yup.string()
			.matches(phoneRegExp, "Phone number is not valid")
			.required("Phone number is required"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password too short"),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Password must match"
		),
		dateOfBirth: Yup.string().required("Date of birth is required"),
		gender: Yup.string().required("Gender is required"),
	});
	const formik = useFormik({
		initialValues: {
			userName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
			dateOfBirth: "",
			gender: "",
		},
		validationSchema: RegisterSchema,
		onSubmit: () => {
			const {
				userName,
				email,
				phoneNumber,
				password,
				confirmPassword,
				dateOfBirth,
				gender,
			} = formik.values;
			console.log("Submit");
			dispatch(
				register({
					username: userName,
					email,
					phone: phoneNumber,
					password,
					confirmPassword,
					dob: dateOfBirth,
					gender,
				})
			)
				.unwrap()
				.then(() => {
					dispatch(successMessage("Đăng ký thành công"));
					navigate("/auth/login");
				});
		},
	});
	const { values, handleSubmit, handleChange } = formik;
	const handleSignInOnClick = () => {
		navigate("/auth/login");
	};
	const onChange = () => {
		var myRadio = document.getElementsByName("radio-grp");
		for (var i = 0; i < myRadio.length; i++) {
			if (myRadio[i].checked) {
				values.gender = myRadio[i].value;
			}
		}
	};
	return (
		<FormikProvider value={formik}>
			<form action className='login__create' id='login-up'>
				<h1 className='login__title'>Create Account</h1>
				<div className='login__box'>
					<i class='fa-solid fa-user login__icon'></i>
					<input
						type='text'
						name='userName'
						placeholder='Username'
						className='login__input'
						value={values.userName}
						onChange={handleChange}
					/>
				</div>
				<div className='login__box'>
					<i className='fa-solid fa-envelope login__icon' />
					<input
						type='text'
						name='email'
						placeholder='Email'
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
				<div className='login__box'>
					<i className='fa-solid fa-lock login__icon' />
					<input
						type='password'
						name='confirmPassword'
						placeholder='Confirm Password'
						className='login__input'
						value={values.confirmPassword}
						onChange={handleChange}
					/>
				</div>
				<div className='login__box'>
					<i class='fa-solid fa-phone login__icon'></i>
					<input
						type='text'
						name='phoneNumber'
						placeholder='Phone number'
						className='login__input'
						value={values.phoneNumber}
						onChange={handleChange}
					/>
				</div>
				<GenderSelect onChange={onChange} />
				<div className='login__box'>
					<i class='fa-solid fa-calendar login__icon'></i>
					<input
						type='date'
						name='dateOfBirth'
						placeholder='Phone number'
						className='login__input'
						value={values.dateOfBirth}
						onChange={handleChange}
					/>
				</div>
				<a href='#javascript' className='login__button' onClick={handleSubmit}>
					Sign Up
				</a>
				<div>
					<span className='login__account'>Already have an Account?</span>
					<span
						className='login__signup'
						id='sign-in'
						onClick={handleSignInOnClick}
					>
						Sign In
					</span>
				</div>
			</form>
		</FormikProvider>
	);
}
