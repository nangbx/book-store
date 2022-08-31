import { Navigate, useRoutes } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Cart from "../Pages/Cart/Cart";
import Homepage from "../Pages/Home/Homepage";
import Page404 from "../Pages/Page404/Page404";
import Profile from "../Pages/Profile/Profile";
import SearchPage from "../Pages/SearchPage/SearchPage";
import Author from "../sections/admin/author/Author";
import EditAuthor from "../sections/admin/author/EditAuthor";
import BooksCategory from "../sections/admin/books/BooksCategory";
import EditBook from "../sections/admin/books/EditBook";
import EditOrder from "../sections/admin/order/EditOrder";
import Order from "../sections/admin/order/Order";
import LoginForm from "../sections/auth/LoginForm";
import RegisterForm from "../sections/auth/RegisterForm";
import BooksDescription from "../sections/products/BooksDescription/BooksDescription";
import BrowseBook from "../sections/products/BrowseBook/BrowseBook";
import PrivateRoute from "./Private/PrivateRoute";
import PrivateUserRouter from "./Private/PrivateUserRoute";

export default function Router() {
	return useRoutes([
		{
			path: "/",
			element: <Homepage />,
			children: [
				{ path: "", element: <BrowseBook /> },
				{ path: "/product/:id", element: <BooksDescription /> },
				{
					path: "/user",
					element: (
						<PrivateUserRouter>
							<Profile />
						</PrivateUserRouter>
					),
				},
				{
					path: "/cart",
					element: (
						<PrivateUserRouter>
							<Cart />
						</PrivateUserRouter>
					),
				},
				{ path: "/search", element: <SearchPage /> },
				{ path: "*", element: <Navigate to='/404' /> },
			],
		},
		{
			path: "/admin",
			element: (
				<PrivateRoute>
					<Homepage />
				</PrivateRoute>
			),
			children: [
				{ path: "books", element: <BooksCategory /> },
				{ path: "books/:id", element: <EditBook /> },
				{ path: "books/new", element: <EditBook /> },
				{ path: "authors", element: <Author /> },
				{ path: "authors/:id", element: <EditAuthor /> },
				{ path: "authors/new", element: <EditAuthor /> },
				{ path: "orders", element: <Order /> },
				{ path: "orders/:id", element: <EditOrder /> },
			],
		},
		{
			path: "/auth",
			element: <Auth />,
			children: [
				{ path: "login", element: <LoginForm /> },
				{ path: "register", element: <RegisterForm /> },
				{ path: "*", element: <Navigate to='/404' /> },
			],
		},
		{
			path: "/404",
			element: <Page404 />,
		},

		{ path: "*", element: <Navigate to='/404' replace /> },
	]);
}
