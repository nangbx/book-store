import React from "react";
import "./Auth.style.scss";
import { Outlet, useNavigate } from "react-router-dom";

export default function Auth() {
	let navigate = useNavigate();

	const handleBackHomePage = () => {
		navigate("/");
	};

	return (
		<div className='login'>
			<div className='login__content'>
				<div className='login__img' onClick={handleBackHomePage}>
					<img src={window.location.origin + "/images/img-login.svg"} alt='' />
				</div>
				<div className='login__forms'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
