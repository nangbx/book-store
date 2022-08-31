import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "../../sections/user/ChangePassword";
import UserInfo from "../../sections/user/UserInfo";
import "./Profile.style.scss";

export default function Profile() {
	const [select, setSelect] = useState(1);
	const { isAdmin } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const handleChangePage = (page) => {
		setSelect(page);
	};

	useEffect(() => {
		if (isAdmin) {
			navigate("/");
		}
	}, [isAdmin, navigate]);
	return (
		<div className='content-page' id='profile'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='content__nav'>
						<div className='content__nav--wrapper'>
							<ul className='content__nav--list'>
								<li className='content__nav--item'>
									<Link
										className={select === 1 ? "active" : ""}
										to={""}
										onClick={() => handleChangePage(1)}
									>
										{" "}
										Personal Information{" "}
									</Link>
								</li>
								<li className='content__nav--item'>
									<Link
										to={""}
										className={select === 2 ? "active" : ""}
										onClick={() => {
											handleChangePage(2);
										}}
									>
										Change password
									</Link>
								</li>
							</ul>
						</div>
					</div>
					{select === 1 ? <UserInfo /> : <ChangePassword />}
				</div>
			</div>
		</div>
	);
}
