import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserService } from "../../Services";
import * as Yup from "yup";
import { useFormik } from "formik";
import { successMessage } from "../../Slices/message";
import { getProfile } from "../../Slices/auth";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default function UserInfo() {
	const dispatch = useDispatch();
	const [profile, setProfile] = useState({
		name: "",
		email: "",
		phone: "",
		gender: "",
		dob: "",
		avatar: "",
	});
	async function fetchData() {
		const data = await UserService.getProfile();
		setProfile(data);
	}
	useEffect(() => {
		fetchData();
	}, []);

	const ProfileSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		phone: Yup.string()
			.required("Phone is required")
			.matches(phoneRegExp, "Phone number is not valid"),
		gender: Yup.string().required("Gender is required"),
		dob: Yup.date().required("Date of birth is required"),
	});

	const formik = useFormik({
		initialValues: profile,
		validationSchema: ProfileSchema,
		enableReinitialize: true,
		onSubmit: async () => {
			const { name, phone, gender, dob } = values;
			const msg = await UserService.updateProfile(name, phone, gender, dob);
			dispatch(successMessage(msg));
			dispatch(getProfile());
		},
	});
	const { values, handleSubmit, handleChange } = formik;
	const formatDateTime = (date) => {
		return date && new Date(date).toISOString().slice(0, 10);
	};
	const handleChangeAvatar = async (e) => {
		await UserService.updateAvatar(e.target.files[0]);
		dispatch(successMessage("Thay đổi avatar thành công!"));
		dispatch(getProfile());
		fetchData();
	};
	return (
		<div className='content__info'>
			<div className='content__info__data'>
				<div className='tab-content'>
					<div className='tab-panel'>
						<div className='tab-panel-card'>
							<div className='tab-panel-card-header'>
								<div className='header-title'>
									<h4 className='card-title'>Personal Information</h4>
								</div>
							</div>
							<div className='tab-panel-card-body'>
								<form>
									<div className='user-avatar'>
										<div className='user-avatar-wrapper'>
											<div className='profile-img-edit'>
												<img
													src={
														profile.avatar ||
														window.location.origin + "/images/user/11.png"
													}
													alt=''
												/>
												<div className='edit'>
													<label htmlFor='avatar'>
														<i className='fa-solid fa-pencil' />
													</label>
													<input
														type='file'
														name='avatar'
														id='avatar'
														accept='image/*'
														onChange={handleChangeAvatar}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className='user-info'>
										<div className='form-group flex-half'>
											<label>Name:</label>
											<input
												className='form-control '
												type='text'
												name='name'
												value={values.name}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group flex-half'>
											<label>Email:</label>
											<input
												className='form-control'
												type='text'
												value={values.email}
												disabled
											/>
										</div>
										<div className='form-group flex-half'>
											<label>Phone:</label>
											<input
												className='form-control'
												type='text'
												name='phone'
												value={values.phone}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group flex-half'>
											<label htmlFor='true'>Gender:</label>
											<select
												name='gender'
												className='form-control'
												value={values.gender}
												onChange={handleChange}
											>
												<option value={-1} disabled>
													Gender
												</option>
												<option value='MALE'>Male</option>
												<option value='FEMALE'>Female</option>
												<option value='OHTER'>Other</option>
											</select>
										</div>
										<div className='form-group flex-full'>
											<label>Date of birth:</label>
											<input
												className='form-control'
												type='date'
												name='dob'
												value={formatDateTime(values.dob)}
												onChange={handleChange}
											/>
										</div>
									</div>
									<button type='submit' onClick={handleSubmit}>
										Submit
									</button>
									<button type='reset'>Back</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
