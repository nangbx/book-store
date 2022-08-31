import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Slidebar.style.scss";
const handleSidebarOnclick = (e) => {
	let app = document.getElementsByTagName("body")[0];
	if (app) {
		app.classList.toggle("sidebar-main");
	}
};

export default function Slidebar() {
	const { isAdmin } = useSelector((state) => state.auth);

	const handleClick = (e, index) => {
		e.preventDefault();
		document
			.querySelectorAll(
				"#sidebar-scrollbar .iq-sidebar-menu .iq-menu .menu .iq-submenu"
			)
			[index].classList.toggle("show");
	};
	return (
		<div className='sidebar' id='sidebar'>
			<div className='sidebar-logo'>
				<Link to={"/"} className='header-logo'>
					<img src={window.location.origin + "/images/logo.png"} alt='' />
					<div className='logo-title'>
						<span>Bookstore</span>
					</div>
				</Link>
				<div
					className='btn-sidebar'
					id='btn-sidebar'
					onClick={handleSidebarOnclick}
				>
					<i className='fa-solid fa-bars' />
				</div>
			</div>
			<div id='sidebar-scrollbar'>
				<nav className='iq-sidebar-menu'>
					<ul className='iq-menu'>
						<li className='menu'>
							<Link
								to={""}
								className='iq-waves-effect'
								onClick={(e) => handleClick(e, 0)}
							>
								<i className='las la-home iq-arrow-left' />
								<span>Shop</span>
								<i className='ri-arrow-right-s-line iq-arrow-right' />
							</Link>
							<ul className='iq-submenu'>
								<li>
									<Link to={"/"}>
										<i className='las la-house-damage' />
										Home Page
									</Link>
								</li>
								<li>
									<Link to={"/search"}>
										<i className='ri-function-line' />
										Category Page
									</Link>
								</li>
								<li>
									<Link to={"/cart"}>
										<i className='ri-shopping-cart-2-line'></i>
										Cart Page
									</Link>
								</li>
								<li>
									<Link to={"/user"}>
										<i className='ri-profile-line'></i>
										Profile Page
									</Link>
								</li>
							</ul>
						</li>
						{isAdmin ? (
							<li className='menu'>
								<Link
									to={""}
									className='iq-waves-effect'
									onClick={(e) => handleClick(e, 1)}
								>
									<i className='ri-admin-line iq-arrow-left' />
									<span>Admin</span>
									<i className='ri-arrow-right-s-line iq-arrow-right' />
								</Link>
								<ul className='iq-submenu'>
									<li>
										<Link to={"/admin/books"}>
											<i className='ri-dashboard-line' />
											Book List
										</Link>
									</li>
									<li>
										<Link to={"/admin/authors"}>
											<i className='ri-list-check-2' />
											Author List
										</Link>
									</li>
									<li>
										<Link to={"/admin/orders"}>
											<i className='ri-shopping-cart-2-line'></i>
											Order List
										</Link>
									</li>
								</ul>
							</li>
						) : (
							""
						)}
					</ul>
				</nav>
			</div>
		</div>
	);
}
