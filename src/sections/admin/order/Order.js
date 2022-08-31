import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderRow from "../../../Components/Order/OrderRow";
import { AdminService } from "../../../Services";
import "../author/Author.style.scss";

export default function Order() {
	const [page, setPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);
	const [orders, setOrders] = useState();
	useEffect(() => {
		async function fetchData() {
			const res = await AdminService.getAllOrder(page);
			setOrders(res.data);
			setMaxPage(res.totalPage);
		}

		fetchData();
	}, [page]);

	const handleOnClickPrevious = () => {
		setPage((prev) => {
			if (prev === 1) {
				return prev;
			} else {
				return prev - 1;
			}
		});
	};
	const handleOnClickNext = () => {
		setPage((prev) => {
			if (prev >= maxPage) {
				return prev;
			} else {
				return prev + 1;
			}
		});
	};
	return (
		<div className='content-page' id='author'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='content-item'>
						<div className='card'>
							<div className='card-header'>
								<div className='card-header-title'>
									<h4 className='card-title'>Order lists</h4>
								</div>
							</div>
							<div className='card-body'>
								<div className='card-table'>
									<div className='card-table-header'>
										<div className='card-table-header-search'>
											<div className='card-filter'>
												<label
													htmlFor='
											'
												>
													Search:
													<input type='text' />
												</label>
											</div>
										</div>
									</div>
									<div className='card-table-content'>
										<div className='card-table-wrapper'>
											<table>
												<thead>
													<tr>
														<th>Id</th>
														<th>Total</th>
														<th>Status</th>
														<th>Time</th>
														<th className='boder-none'>Action</th>
													</tr>
												</thead>
												<tbody>
													{orders
														? orders.map((item) => <OrderRow order={item} />)
														: "Null"}
												</tbody>
											</table>
										</div>
									</div>
									<div className='card-table-footer'>
										<div className='page-size'>
											<div className='max-page'>Total page: {maxPage}</div>
										</div>
										<div className='page-number'>
											<ul className='pagination'>
												<li className='previous'>
													<Link to={""} onClick={handleOnClickPrevious}>
														Previous
													</Link>
												</li>
												<li className='number'>
													<Link to={""}>{page}</Link>
												</li>
												<li className='next'>
													<Link to={""} onClick={handleOnClickNext}>
														Next
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
