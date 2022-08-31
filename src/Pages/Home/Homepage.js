import React from "react";
import { Outlet } from "react-router-dom";

// ----------------------------- Layouts ------------------------
import Navbar from "../../Layouts/Navbar/Navbar";
import Slidebar from "../../Layouts/Slidebar/Slidebar";

export default function Homepage() {
	return (
		<div>
			<Navbar />
			<Slidebar />
			<Outlet />
		</div>
	);
}
