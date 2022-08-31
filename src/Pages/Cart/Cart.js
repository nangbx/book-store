import React, { useEffect, useState } from "react";
import "./Cart.style.scss";
import CartItem from "../../Components/CartItem/CartItem";
import { CartService } from "../../Services";

export default function Cart() {
	const [cart, setCart] = useState([]);
	const [change, setChange] = useState(true);
	useEffect(() => {
		async function fetchData() {
			const res = await CartService.getProductsInCart();
			setCart(res);
		}

		fetchData();
	}, [change]);
	return (
		<div className='content-page' id='cart'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='checkout'>
						<div className='checkout-wrapper'>
							<div className='checkout__cart'>
								<div className='checkout__cart__card'>
									<div className='checkout__cart__card--header'>
										<div className='card--header--title'>
											<h4>Shopping Cart</h4>
										</div>
									</div>
									<div className='checkout__cart__card--body'>
										<ul className='checkout--list'>
											{cart &&
												cart.map((item, index) => (
													<CartItem
														key={index}
														item={item}
														onChange={setChange}
													/>
												))}
										</ul>
									</div>
								</div>
							</div>
							<div className='checkout__order'>
								<div className='checkout__order__card'>
									<div className='card-body'>
										<p>Options</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
