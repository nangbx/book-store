import axios from "axios";
import { API } from "../const";
import authHeader from "./auth-header";

const login = (email, password) => {
	return axios
		.post(API + "admin/auth/login", {
			email,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
				localStorage.setItem("admin", true);
			}
			return response.data;
		});
};

const getAllPublisher = () => {
	return axios
		.get(API + `admin/publisher?page=1&limit=1000`)
		.then((response) => {
			if (response.data && response.data.results) {
				return response.data.results;
			}
		});
};

const getAllGenre = () => {
	return axios.get(API + `admin/genre?page=1&limit=1000`).then((response) => {
		if (response.data && response.data.results) {
			return response.data.results;
		}
	});
};

const getAllAuthor = () => {
	return axios.get(API + `admin/author?page=1&limit=1000`).then((response) => {
		if (response.data && response.data.results) {
			return response.data.results;
		}
	});
};

const createBook = ({
	title,
	edition,
	stock,
	price,
	number_of_page,
	publisher_id,
	description,
	authors,
	genres,
}) => {
	return axios
		.post(
			API + "admin/book",
			{
				title,
				isbn: 12356987456235,
				edition,
				stock,
				price,
				number_of_page,
				publisher_id,
				description,
				authors: [authors],
				genres: [genres],
			},
			{
				headers: authHeader(),
			}
		)
		.then((response) => {
			return true;
		})
		.catch((err) => {
			return false;
		});
};

const updateBook = ({
	id,
	title,
	edition,
	stock,
	price,
	number_of_page,
	publisher_id,
	description,
	authors,
	genres,
}) => {
	return axios
		.put(
			API + `admin/book/${id}`,
			{
				title,
				edition,
				stock,
				price,
				number_of_page,
				publisher_id,
				description,
				authors: [authors],
				genres: [genres],
			},
			{
				headers: authHeader(),
			}
		)
		.then((response) => {
			return true;
		})
		.catch((err) => {
			return false;
		});
};

const deleteBook = (id) => {
	return axios.delete(API + `admin/book/${id}`, {
		headers: authHeader(),
	});
};

/**----------------------------------------------------------------------- */

const getAuthorByPage = (page, limit = 10) => {
	return axios
		.get(API + `admin/author?page=${page}&limit=${limit}`)
		.then((response) => {
			if (response && response.data && response.data.results) {
				return {
					data: response.data.results,
					totalPage: response.data.totalPage,
				};
			}
		});
};

const getAuthorById = (id) => {
	return axios.get(API + `admin/author/${id}`).then((response) => {
		return response.data.result;
	});
};

const createAuthor = (name) => {
	return axios
		.post(
			API + "admin/author",
			{
				name,
			},
			{
				headers: authHeader(),
			}
		)
		.then((response) => {
			return response.statusText;
		});
};

const updateAuthor = (authorId, name) => {
	return axios
		.put(
			API + "admin/author",
			{
				authorId,
				name,
			},
			{
				headers: authHeader(),
			}
		)
		.then((response) => {
			return response.statusText;
		});
};
const deleteAuthor = (id) => {
	console.log(id);
	return axios
		.delete(API + `admin/author/${id}`, {
			headers: authHeader(),
		})
		.then((response) => {
			console.log(response);
		});
};

/**---------------------------------------------------------- */

const getAllOrder = (page, limit = 10) => {
	return axios
		.get(API + `admin/orders?page=${page}&limit=${limit}`, {
			headers: authHeader(),
		})
		.then((response) => {
			return {
				data: response.data.results,
				totalPage: response.data.totalPage,
			};
		});
};

const getOrderById = (id) => {
	return axios
		.get(API + `admin/orders/${id}`, {
			headers: authHeader(),
		})
		.then((response) => {
			return response.data.result;
		});
};

const updateStatusOrder = (id, status) => {
	return axios
		.put(
			API + "admin/orders/status",
			{
				orderId: id,
				status,
			},
			{
				headers: authHeader(),
			}
		)
		.then((response) => {
			return {
				statusRes: response.statusText,
				msg: response.data.msg,
			};
		})
		.catch((err) => {
			console.log(err);
			return {
				msg: err.response.data.msg,
				statusRes: err.response.statusText,
			};
		});
};

const adminService = {
	login,
	getAllPublisher,
	getAllGenre,
	getAllAuthor,
	createBook,
	deleteBook,
	updateBook,
	getAuthorByPage,
	deleteAuthor,
	getAuthorById,
	createAuthor,
	updateAuthor,
	getAllOrder,
	getOrderById,
	updateStatusOrder,
};
export default adminService;
