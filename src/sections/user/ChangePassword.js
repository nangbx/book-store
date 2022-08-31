import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { UserService } from "../../Services";
import { errorMessage, successMessage } from "../../Slices/message";
export default function ChangePassword() {
	const dispatch = useDispatch();

	const PasswordSchema = Yup.object().shape({
		currentPassword: Yup.string()
			.min(6)
			.required("Current password is required"),
		newPassword: Yup.string().min(6).required("New password is required"),
		confirmNewPassword: Yup.string().oneOf(
			[Yup.ref("newPassword"), null],
			"Confirm password must match"
		),
	});

	const formik = useFormik({
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
		validationSchema: PasswordSchema,
		onSubmit: async () => {
			const { currentPassword, newPassword, confirmNewPassword } = values;

			const { status, msg } = await UserService.changePassword(
				currentPassword,
				newPassword,
				confirmNewPassword
			);
			if (status === "Bad Request") {
				dispatch(errorMessage(msg));
			} else {
				dispatch(successMessage(msg));
			}
		},
	});

	const { values, errors, handleChange, handleSubmit } = formik;
	return (
		<div className='content__info'>
			<div className='content__info__data'>
				<div className='tab-content'>
					<div className='tab-panel'>
						<div className='tab-panel-card'>
							<div className='tab-panel-card-header'>
								<div className='header-title'>
									<h4 className='card-title'>Change password</h4>
								</div>
							</div>
							<div className='tab-panel-card-body'>
								<form>
									<div className='user-info'>
										<div className='form-group flex-full'>
											<label>Current Password:</label>
											<input
												className={
													errors.currentPassword
														? `form-control invalid`
														: `form-control valid`
												}
												type='password'
												name='currentPassword'
												value={values.currentPassword}
												onChange={handleChange}
											/>
											<div className='invalid-feedback'>
												{errors.currentPassword}
											</div>
										</div>
										<div className='form-group flex-full'>
											<label>New Password:</label>
											<input
												className={
													errors.newPassword
														? `form-control invalid`
														: `form-control valid`
												}
												type='password'
												name='newPassword'
												value={values.newPassword}
												onChange={handleChange}
											/>
											<div className='invalid-feedback'>
												{errors.newPassword}
											</div>
										</div>
										<div className='form-group flex-full'>
											<label>Confirm Password:</label>
											<input
												className={
													errors.confirmNewPassword
														? `form-control invalid`
														: `form-control valid`
												}
												type='password'
												name='confirmNewPassword'
												value={values.confirmNewPassword}
												onChange={handleChange}
											/>
											<div className='invalid-feedback'>
												{errors.confirmNewPassword}
											</div>
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
