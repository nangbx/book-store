import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Dropdown.style.scss";
import { logout } from "../../Slices/auth";

export default function Dropdown() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAdmin, profile } = useSelector((state) => state.auth);
	const handleSignOut = (e) => {
		e.preventDefault();
		dispatch(logout());
		navigate("/auth/login");
	};
	return (
		<div className='sub-dropdown' id='sub-dropdown-user'>
			<div className='card'>
				<div className='card-body'>
					<div className='card-header'>
						{profile ? <h5>Hello, {profile.name}</h5> : <h5>Hello, Admin</h5>}
						<span>Available </span>
					</div>
					{isAdmin || (
						<Link to={"user"} className='sub-card'>
							<div className='media'>
								<div className='media-icon'>
									<i className='fa-solid fa-id-badge' />
								</div>
								<div className='media-body'>
									<h6>My Profile</h6>
									<p>View personal profile details.</p>
								</div>
							</div>
						</Link>
					)}
					<div className='card-action-signout'>
						<Link to={""} id='btn-sign-out' onClick={handleSignOut}>
							Sign out
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
