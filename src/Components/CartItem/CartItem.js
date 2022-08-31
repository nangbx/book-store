import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { CartService } from "../../Services";

export default function CartItem({ item, onChange }) {
	const [quantity, setQuantity] = useState(1);
	useEffect(() => {
		setQuantity(item ? item.quantity || 1 : 1);
	}, [item]);
	async function fetchApi(q) {
		return await CartService.changeQuantity(item.book_id, q);
	}
	const debounceChange = useCallback(
		debounce((nextValue) => fetchApi(nextValue), 1000),
		[]
	);
	const handleIncrease = () => {
		debounceChange(quantity + 1);
		setQuantity((prev) => prev + 1);
	};
	const handleDecrease = () => {
		debounceChange(quantity - 1);
		setQuantity((prev) => {
			if (prev <= 1) {
				return prev;
			}
			return prev - 1;
		});
	};

	const handleDeleteProduct = async () => {
		await CartService.deleteProductInCart(item.book_id, quantity);
		onChange((prev) => !prev);
	};
	return (
		<li className='checkout-product'>
			<div className='checkout-product-item'>
				<div className='item-img'>
					<span>
						<a href>
							<img
								src={
									item
										? item.thumbnail ||
										  window.location.origin + "/images/checkout/01.jpg"
										: window.location.origin + "/images/checkout/01.jpg"
								}
								alt=''
							/>
						</a>
					</span>
				</div>
				<div className='item-info'>
					<div className='checkout-product-details'>
						<h5>{item ? item.title || "The Raze night book" : ""}</h5>
						<p>In stock</p>
						<div className='price'>
							<h5>{item ? item.price || "0" : "0"}</h5>
						</div>
					</div>
				</div>
				<div className='item-actions'>
					<div className='item-actions-wrapper'>
						<div className='price-container'>
							<div className='price-container-flex'>
								<div className='quantity'>
									<button className='qty-btn' onClick={handleDecrease}>
										<i className='fa-solid fa-minus' />
									</button>
									<input
										type='text'
										name='quantity'
										value={quantity}
										readOnly
									/>
									<button className='qty-btn' onClick={handleIncrease}>
										<i className='fa-solid fa-plus' />
									</button>
								</div>
								<div className='price'>
									<span className='product-price'>
										{item ? item.price * quantity || 0 : 0}
									</span>
								</div>
							</div>
						</div>
						<div className='remove' onClick={handleDeleteProduct}>
							<a href>
								<i className='fa-solid fa-trash' />
							</a>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}
