import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateUserRouter({ children }) {
	const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
	return isAdmin && !isLoggedIn ? <Navigate to='/404' /> : children;
}
