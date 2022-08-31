import Router from "./Routes/router";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "./Slices/auth";

function App() {
	const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		if (isLoggedIn && !isAdmin) {
			dispatch(getProfile());
		}
	}, []);
	return (
		<div className='App'>
			<Router />
		</div>
	);
}

export default App;
