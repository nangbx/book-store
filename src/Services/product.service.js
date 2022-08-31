import axios from "axios";
import { API } from "../const";

const getBooks = async (page, limit = 10) => {
	return axios
		.get(API + `books?page=${page}&limit=${limit}`)
		.then((response) => {
			if (response && response.data && response.data.results) {
				return {
					data: response.data.results,
					totalPage: response.data.totalPage,
				};
			}
			return [];
		});
};
const getBookById = async (id) => {
	return axios.get(API + `book/${id}`).then((response) => {
		if (response && response.data && response.data.result) {
			return response.data.result;
		}
		return {};
	});
};
const getAllBook = () => {
	return axios.get(API + "books?page=1&limit=20").then((response) => {
		if (response && response.data && response.data.results) {
			return {
				data: response.data.results,
				totalPage: response.data.totalPage,
			};
		}
		return [];
	});
};

const filterBook = (searchText, authors, genres) => {
	return axios
		.get(API + `books/filter`, {
			params: {
				searchText: searchText,
				authors: authors,
				genres: genres,
				page: 1,
				limit: 100,
			},
		})
		.then((res) => {
			return res.data.results;
		})
		.catch((err) => {
			return [];
		});
};
const productService = {
	getBooks,
	getBookById,
	getAllBook,
	filterBook,
};
export default productService;
