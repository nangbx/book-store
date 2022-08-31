import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartService } from "../../Services";
import { errorMessage, successMessage } from "../../Slices/message";

export default function BookItem({
	id,
	title,
	description,
	price,
	thumbnail,
	author,
}) {
	const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const handleAddToCart = async () => {
		if (isLoggedIn) {
			const { status } = await CartService.addProductToCart(id);
			if (status === "Bad Request") {
				dispatch(errorMessage("Sản phẩm đã có trong giỏ hàng"));
			} else {
				dispatch(successMessage("Thêm sản phẩm thành công"));
			}
		} else {
			dispatch(errorMessage("Bạn chưa đăng nhập!"));
		}
	};
	return (
		<div key={id} className='card-item'>
			<div className='card-image'>
				<Link to=''>
					<img src={thumbnail || "./images/books/01.jpg"} alt='' />
				</Link>
				<div className='view-book'>
					<Link to={`/product/${id}`}>View Book</Link>
				</div>
			</div>
			<div className='card-content'>
				<div className='card-content-header'>
					<h6>{title}</h6>
					<p>{author}</p>
					<div className='rating'>
						<span>
							<i className='fa-solid fa-star' />
							<i className='fa-solid fa-star' />
							<i className='fa-solid fa-star' />
							<i className='fa-solid fa-star' />
							<i className='fa-solid fa-star' />
						</span>
					</div>
				</div>
				<div className='card-content-price'>
					<span className='old-price'>10.000</span>
					<h6>{price}</h6>
				</div>
				{isAdmin || (
					<div className='card-content-actions'>
						<Link to='' onClick={handleAddToCart}>
							<i className='fa-solid fa-cart-shopping' />
						</Link>
						<Link to=''>
							<i className='fa-solid fa-heart' />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
