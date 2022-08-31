import React from "react";
import { Link } from "react-router-dom";

export default function OrderRow({ order }) {
	const formatDateTime = (date) => {
		return date && new Date(date).toISOString().slice(0, 10);
	};
	return (
		<tr key={order && order.id}>
			<td>{order && order.id}</td>
			<td>{order && order.total}</td>
			<td>{order && order.status}</td>
			<td>
				<p>{order && formatDateTime(order.time)}</p>
			</td>
			<td className='boder-none'>
				<div className='action'>
					<Link to={`/admin/orders/${order && order.id}`}>
						<i className='fa-solid fa-pen' />
					</Link>
				</div>
			</td>
		</tr>
	);
}
