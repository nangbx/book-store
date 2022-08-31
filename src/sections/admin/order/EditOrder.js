import React, { useEffect, useState } from "react";
import { AdminService } from "../../../Services";
import "../books/EditBook.style.scss";
import { errorMessage, successMessage } from "../../../Slices/message";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function EditOrder() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [order, setOrder] = useState({
		id: "",
		time: "",
		total: "",
		address: "",
	});
	const formatDateTime = (date) => {
		return date && new Date(date).toISOString().slice(0, 10);
	};
	const navigate = useNavigate();
	const [status, setStatus] = useState(-1);
	async function fetchData() {
		const data = await AdminService.getOrderById(id);
		setOrder(data);
		setStatus(data.status);
	}
	useEffect(() => {
		fetchData();
	}, [id]);
	const handleChange = (e) => {
		setStatus(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { statusRes } = await AdminService.updateStatusOrder(id, status);
			if (statusRes === "Bad Request") {
				dispatch(errorMessage("Không thể thay đổi trạng thái đơn hàng"));
				fetchData();
			} else {
				dispatch(successMessage("Thay đổi thành công"));
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleBack = () => {
		navigate("/admin/orders");
	};
	return (
		<div className='content-page' id='edit-book'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='content-item'>
						<div className='card'>
							<div className='card-header'>
								<div className='card-header-title'>
									<h4 className='card-title'>Edit order</h4>
								</div>
							</div>
							<div className='card-body'>
								<form>
									<div className='edit'>
										<div className='form-group flex-full'>
											<label htmlFor='true'>Id:</label>
											<input
												type='text'
												className='form-control'
												name='title'
												value={order && order.id}
												disabled
											/>
										</div>
										<div className='form-group flex-half'>
											<label htmlFor='true'>Time:</label>
											<input
												type='text'
												className='form-control'
												name='edition'
												defaultValue={order && formatDateTime(order.time)}
												disabled
											/>
										</div>
										<div className='form-group flex-half'>
											<label htmlFor='true'>Total:</label>
											<input
												type='text'
												className='form-control'
												name='stock'
												value={order && order.total}
												disabled
											/>
										</div>

										<div className='form-group flex-full'>
											<label htmlFor='true'>Status:</label>
											<select
												name='publisher_id'
												className='form-control'
												value={status}
												onChange={handleChange}
											>
												<option value={-1} disabled>
													Order status
												</option>

												<option value='CANCELLED'>CANCELLED</option>
												<option value='APPROVED'>APPROVED</option>
												<option value='PENDING'>PENDING</option>
											</select>
										</div>

										<div className='form-group flex-full'>
											<label htmlFor='true'>Address:</label>
											<textarea
												name='description'
												rows={4}
												className='form-control'
												value={order && order.address}
												disabled
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
