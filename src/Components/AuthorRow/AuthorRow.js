import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { AdminService } from "../../Services";
import { successMessage } from "../../Slices/message";

export default function AuthorRow({ author }) {
	const dispatch = useDispatch();
	const handleClickDelete = (id) => {
		confirmAlert({
			title: "Warning",
			message: "Bạn có muốn xóa tác giả?",
			buttons: [
				{
					label: "Yes",
					onClick: async () => {
						await AdminService.deleteAuthor(id);
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
			<td>{author.id}</td>
			<td>
				<img
					src={author.image || window.location.origin + "/images/user/1.jpg"}
					alt=''
				/>
			</td>
			<td>{author.name || "Jhone Steben"}</td>
			<td>
				<p>
					{author.description ||
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. Etiam feugiat luctus est, vel commodo odiorhoncus sit amet"}
				</p>
			</td>
			<td className='boder-none'>
				<div className='action'>
					<Link to={`/admin/authors/${author.id}`}>
						<i className='fa-solid fa-pen' />
					</Link>
					<Link to={""} onClick={() => handleClickDelete(author.id)}>
						<i className='fa-solid fa-trash-can' />
					</Link>
				</div>
			</td>
		</tr>
	);
}
