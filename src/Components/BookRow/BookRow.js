import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { AdminService } from "../../Services";
import { successMessage } from "../../Slices/message";

export default function BookRow({ info }) {
	const dispatch = useDispatch();
	const handleClickDelete = (id) => {
		confirmAlert({
			title: "Warning",
			message: "Bạn có muốn xóa sách?",
			buttons: [
				{
					label: "Yes",
					onClick: async () => {
						await AdminService.deleteBook(id);
						dispatch(successMessage("Xóa thành công!"));
					},
				},
				{
					label: "No",
					onClick: () => {},
				},
			],
			closeOnEscape: true,
			closeOnClickOutside: true,
			keyCodeForClose: [8, 32],
			willUnmount: () => {},
			afterClose: () => {},
			onClickOutside: () => {},
			onKeypress: () => {},
			onKeypressEscape: () => {},
			overlayClassName: "overlay-custom-class-name",
		});
	};

	return (
		<tr>
			<td>{info.id}</td>
			<td>
				<img
					src={
						info.thumbnail || window.location.origin + "/images/books/01.jpg"
					}
					alt=''
				/>
			</td>
			<td>{info.title || "Reading on the worlds"}</td>
			<td>{info.category || "General Books"}</td>
			<td>{info.author || "Jhone Steben"}</td>
			<td>
				<p>
					{info.description ||
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. Etiam feugiat luctus est, vel commodo odio rhoncus sit amet"}
				</p>
			</td>
			<td>{info.price || "10.000"}</td>
			<td className='boder-none'>
				<div className='action'>
					<Link to={`/admin/books/${info.id}`}>
						<i className='fa-solid fa-pen' />
					</Link>
					<Link to={""} onClick={() => handleClickDelete(info.id)}>
						<i className='fa-solid fa-trash-can' />
					</Link>
				</div>
			</td>
		</tr>
	);
}
