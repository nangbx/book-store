import React, { useEffect, useState } from "react";
import { AdminService } from "../../../Services";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../books/EditBook.style.scss";
import { successMessage } from "../../../Slices/message";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function EditAuthor() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [author, setAuthor] = useState({
		name: "",
	});
	useEffect(() => {
		async function fetchData() {
			const res = await AdminService.getAuthorById(id);
			setAuthor(res);
		}

		if (id) {
			fetchData();
		}
	}, [id]);
	const navigate = useNavigate();
	const handleBack = () => {
		navigate("/admin/authors");
	};

	const AuthorSchema = Yup.object().shape({
		name: Yup.string().required(),
	});
	const formik = useFormik({
		initialValues: {
			name: author.name,
		},
		enableReinitialize: true,
		validationSchema: AuthorSchema,
		onSubmit: async () => {
			const name = formik.values.name;
			if (id) {
				await AdminService.updateAuthor(id, name);
				dispatch(successMessage("Cập nhập thành công!"));
			} else {
				await AdminService.createAuthor(name);
				dispatch(successMessage("Thêm tác giả thành công!"));
			}
			navigate("/admin/authors");
		},
	});
	const { values, handleChange, handleSubmit, handleReset } = formik;
	return (
		<div className='content-page' id='edit-book'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='content-item'>
						<div className='card'>
							<div className='card-header'>
								<div className='card-header-title'>
									<h4 className='card-title'>
										{id ? "Edit author" : "Add new author"}
									</h4>
								</div>
							</div>
							<div className='card-body'>
								<form>
									<div className='edit'>
										<div className='form-group flex-full'>
											<label htmlFor='true'>Book Name:</label>
											<input
												type='text'
												className='form-control'
												name='name'
												value={values.name}
												onChange={handleChange}
											/>
										</div>

										<div className='form-group flex-full'>
											<label htmlFor='true'>Book Image:</label>
											<div className='custom-file'>
												<input
													type='file'
													className='custom-file-input'
													accept='image/*'
												/>
												<div className='custom-file-label'>Choose file</div>
											</div>
										</div>

										<div className='form-group flex-full'>
											<label htmlFor='true'>Book Description</label>
											<textarea
												name='description'
												rows={4}
												className='form-control'
											/>
										</div>
									</div>
									<button type='submit' onClick={handleSubmit}>
										Submit
									</button>
									<button type='reset' onClick={handleBack}>
										Back
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
