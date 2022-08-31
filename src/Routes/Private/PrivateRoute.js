import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
	const { isAdmin } = useSelector((state) => state.auth);
	return isAdmin ? children : <Navigate to='/404' />;
}
