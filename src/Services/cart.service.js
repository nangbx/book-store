import axios from "axios";
import { API } from "../const";
import authHeader from "./auth-header";

const addProductToCart = (id) => {
	return axios
		.post(
			API + `cart/add/product/${id}?quantity=1`,
			{},
			{
				headers: authHeader(),
			}
		)
		.then((response) => {
			return {
				msg: response.data.msg,
				status: response.statusText,
			};
		})
		.catch((err) => {
			return {
				msg: err.response.data.msg,
				status: err.response.statusText,
			};
		});
};

const getProductsInCart = () => {
	return axios
		.get(API + "cart/products", {
			headers: authHeader(),
		})
		.then((response) => {
			return response.data.results;
		})
		.catch((err) => {
			return [];
		});
};

const changeQuantity = (id, quantity) => {
	return axios
		.put(
			API + `cart/quantity/product/${id}?quantity=${quantity}`,
			{},
			{
				headers: authHeader(),
			}
		)
		.then((response) => {});
};

const deleteProductInCart = (id) => {
	return axios
		.delete(API + `cart/products/remove/${id}`, {
			headers: authHeader(),
		})
		.then((response) => {
			console.log(response);
		});
};
const cartService = {
	addProductToCart,
	getProductsInCart,
	deleteProductInCart,
	changeQuantity,
};
export default cartService;
