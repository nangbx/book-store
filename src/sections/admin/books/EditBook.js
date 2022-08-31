import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AdminService, ProductService } from "../../../Services";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./EditBook.style.scss";
import { successMessage } from "../../../Slices/message";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
	const { id } = useParams();
	const [book, setBook] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [data, setData] = useState({
		genre: [],
		publisher: [],
		author: [],
	});
	useEffect(() => {
		async function fetchGetBook() {
			const res = await ProductService.getBookById(id);
			setBook(res);
		}

		async function fetchData() {
			const genre = await AdminService.getAllGenre();
			const publisher = await AdminService.getAllPublisher();
			const author = await AdminService.getAllAuthor();
			if (genre && publisher && author) {
				setData({
					genre,
					publisher,
					author,
				});
			}
		}
		fetchData();
		if (id) {
			fetchGetBook();
		}
	}, [id]);
	const BookSchema = Yup.object().shape({
		title: Yup.string().required(),
		edition: Yup.number().required().min(1),
		stock: Yup.number().required().min(1),
		price: Yup.number().required().min(0),
		number_of_page: Yup.number().required().min(1),
		publisher_id: Yup.string().required(),
		description: Yup.string().required(),
		authors: Yup.number().required(),
		genres: Yup.number().required(),
	});

	const formik = useFormik({
		initialValues: book
			? {
					title: book.title,
					description: book.description,
					price: book.price,
					edition: book.edition,
					stock: book.stock,
					publisher_id: book.publisher.id,
					authors: book.authors[0].id,
					number_of_page: book.number_of_page,
					genres: book.genres[0].id,
			  }
			: {},
		enableReinitialize: true,
		validationSchema: BookSchema,
		onSubmit: async () => {
			const value = formik.values;
			if (!id) {
				const result = await AdminService.createBook(value);
				if (result) {
					dispatch(successMessage("Tạo mới sách thành công!"));
				}
			} else {
				const result = await AdminService.updateBook({ ...value, id });
				if (result) {
					dispatch(successMessage("Cập nhập sách thành công!"));
				}
			}
		},
	});

	const { values, errors, handleChange, handleSubmit } = formik;
	const handleBack = () => {
		navigate("/admin/books");
	};
	console.log(errors);
	return (
		<div className='content-page' id='edit-book'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='content-item'>
						<div className='card'>
							<div className='card-header'>
								<div className='card-header-title'>
									<h4 className='card-title'>
										{id ? "Edit book" : "Add new book"}
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
												name='title'
												value={values.title}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group flex-half'>
											<label htmlFor='true'>Book Edition:</label>
											<input
												type='text'
												className='form-control'
												name='edition'
												value={values.edition}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group flex-half'>
											<label htmlFor='true'>Book Stock:</label>
											<input
												type='text'
												className='form-control'
												name='stock'
												value={values.stock}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group flex-half'>
											<label htmlFor='true'>Book Price:</label>
											<input
												type='text'
												className='form-control'
												name='price'
												value={values.price}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group flex-half'>
											<label htmlFor='true'>Book Page:</label>
											<input
												type='text'
												className='form-control'
												name='number_of_page'
												value={values.number_of_page}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group flex-full'>
											<label htmlFor='true'>Book Publisher:</label>
											<select
												name='publisher_id'
												className='form-control'
												value={values.publisher_id}
												onChange={handleChange}
											>
												<option value={-1} disabled>
													Book Publisher
												</option>
												{data.publisher.map((item) => (
													<option key={item.id} value={item.id}>
														{item.name}
													</option>
												))}
											</select>
										</div>
										<div className='form-group flex-full'>
											<label htmlFor='true'>Book Author:</label>
											<select
												name='authors'
												className='form-control'
												value={values.authors}
												onChange={handleChange}
											>
												<option value={-1} disabled>
													Book Author
												</option>
												{data.author.map((item) => (
													<option key={item.id} value={item.id}>
														{item.name}
													</option>
												))}
											</select>
										</div>
										<div className='form-group flex-full'>
											<label htmlFor='true'>Book Category:</label>
											<select
												name='genres'
												className='form-control'
												value={values.genres}
												onChange={handleChange}
											>
												<option value={-1} disabled>
													Book Category
												</option>
												{data.genre.map((item) => (
													<option key={item.id} value={item.id}>
														{item.name}
													</option>
												))}
											</select>
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
												value={values.description}
												onChange={handleChange}
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
