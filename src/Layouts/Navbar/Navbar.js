import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.style.scss";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { errorMessage } from "../../Slices/message";

const handleOnClickToggleMenu = () => {
	const app = document.getElementsByTagName("body")[0];
	if (app) {
		app.classList.toggle("sidebar-main");
	}
};
const handleOnClickNavbarToggle = (e) => {
	const collapse = document.getElementById("navbar-collapse");
	if (collapse) {
		collapse.classList.toggle("show");
	}
};
const routes = [
	{ path: "/", element: [{ name: "Home", link: "/" }] },
	{
		path: "/product",
		element: [
			{ name: "Home", link: "/" },
			{ name: "Product", link: "/product" },
		],
	},
	{
		path: "/admin",
		element: [
			{ name: "Home", link: "/" },
			{ name: "Admin", link: "/admin" },
		],
	},
	{
		path: "/admin/books",
		element: [
			{ name: "Home", link: "/" },
			{ name: "Admin", link: "/admin" },
			{ name: "Book", link: "/admin/books" },
		],
	},
];

export default function Navbar() {
	const { isLoggedIn, profile, isAdmin } = useSelector((state) => state.auth);

	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const [show, isShow] = useState(false);
	const [link, setLink] = useState([]);
	const dispatch = useDispatch();
	const handleOnClickShowDropdown = (e) => {
		if (isLoggedIn) {
			isShow(!show);
		} else {
			navigate("/auth/login");
		}
	};
	useEffect(() => {
		const href = window.location.href;
		let find = {
			element: [],
		};
		routes.map((item) => {
			if (href.lastIndexOf(item.path) !== -1) {
				if (item.element.length > find.element.length) {
					find = item;
				}
			}
		});
		setLink(find.element);
	});
	const handleLinkToCart = () => {
		if (isLoggedIn) {
			navigate("/cart");
		} else {
			dispatch(errorMessage("Bạn chưa đăng nhập"));
		}
	};
	const handleSearch = (e) => {
		e.preventDefault();
		navigate(`/search?searchText=${search}`);
	};
	return (
		<div className='top-navbar'>
			<nav className='navbar'>
				<div className='menu-btn'>
					<div
						className='wrapper-menu'
						id='wrapper-menu'
						onClick={handleOnClickToggleMenu}
					>
						<i className='fa-solid fa-bars' />
					</div>
					<div className='navbar-logo'>
						<Link to={"/"} className='header-logo'>
							<img src='./images/logo.png' alt='' />
							<div className='logo-title'>
								<span>Bookstore</span>
							</div>
						</Link>
					</div>
				</div>
				<div className='navbar-breadcrumb'>
					<h5>Shop</h5>
					<nav aria-label='breadcrumb'>
						<ul className='breadcrumb'>
							{link &&
								link.map((item, index) =>
									index === 0 ? (
										<li key={index} className='breadcrumb-item'>
											<Link to={item.link}>{item.name}</Link>
										</li>
									) : (
										<li
											key={index}
											className='breadcrumb-item active'
											aria-current='page'
										>
											<i className='fa-solid fa-angle-right' />
											{item.name}
										</li>
									)
								)}
						</ul>
					</nav>
				</div>
				{isAdmin || (
					<div className='search-bar'>
						<form className='searchbox'>
							<input
								type='text'
								className='search-input'
								placeholder='Search Here ...'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Link to={""} onClick={handleSearch} className='search-link'>
								<i className='fa-solid fa-magnifying-glass' />
							</Link>
						</form>
					</div>
				)}
				<button
					className='navbar-toggle'
					id='navbar-toggle'
					onClick={handleOnClickNavbarToggle}
				>
					<i className='fa-solid fa-bars-staggered' />
				</button>
				<div className='navbar-collapse' id='navbar-collapse'>
					<ul className='navbar-list'>
						<li className='nav-item nav-icon'>
							<Link to={"/search"} className='search-toggle' id='search-icon'>
								<span className='ripple rippleEffect' />
								<i className='fa-solid fa-magnifying-glass' />
								<span className='dots' />
							</Link>
							<div className='dropdown' />
						</li>
						<li className='nav-item nav-icon'>
							<Link to={""} className='search-toggle'>
								<span className='ripple rippleEffect' />
								<i className='fa-solid fa-bell' />
								<span className='dots' />
							</Link>
							<div className='dropdown' />
						</li>
						<li className='nav-item nav-icon'>
							<a href='#javascript' className='search-toggle'>
								<span className='ripple rippleEffect' />
								<i className='fa-solid fa-envelope' />
								<span className='dots' />
							</a>
							<div className='dropdown' />
						</li>
						{isAdmin || (
							<li className='nav-item nav-icon' onClick={handleLinkToCart}>
								<Link to={""} className='search-toggle'>
									<span className='ripple rippleEffect' />
									<i className='fa-solid fa-cart-shopping' />
									<span className='dots' />
								</Link>
								<div className='dropdown' />
							</li>
						)}
						<li
							className={`nav-user ${show ? "is-show" : ""}`}
							id='btn-user'
							onClick={handleOnClickShowDropdown}
						>
							<Link
								to={""}
								id='waves-effect'
								onClick={(e) => e.preventDefault()}
							>
								<span className='rippleEffect'></span>
								<img
									src={
										profile
											? profile.avatar ||
											  window.location.origin +
													"/images/user/avatar-default.png"
											: window.location.origin +
											  "/images/user/avatar-default.png"
									}
									alt=''
								/>
								<div className='caption'>
									<h6>{profile ? profile.name || "" : ""}</h6>
								</div>
							</Link>
							<Dropdown />
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}
