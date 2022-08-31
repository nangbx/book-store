import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { successMessage, errorMessage } from "../../../Slices/message";
import { CartService } from "../../../Services";
import { Link, useParams } from "react-router-dom";
import { ProductService } from "../../../Services";
import "./BooksDescription.style.scss";

export default function BooksDescription() {
	let params = useParams();
	const [book, setBook] = useState({});
	useEffect(() => {
		async function fetchData() {
			const res = await ProductService.getBookById(params.id);
			setBook(res);
		}

		fetchData();
	}, [params.id]);
	const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const handleAddToCart = async () => {
		if (isLoggedIn) {
			const { status } = await CartService.addProductToCart(params.id);
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
		<div className='content-page'>
			<div className='container-fluid'>
				<div className='wrapper'>
					<div className='book-des'>
						<div className='card'>
							<div className='card-header'>
								<h4>Books Description</h4>
							</div>
							<div className='card-body'>
								<div className='description-contents'>
									<div className='description-wrapper'>
										<div className='description-image'>
											<div className='sub-image'>
												<ul className='sub-list-image'>
													<li className='sub-list-item'>
														<Link to={""}>
															<img
																src={
																	window.location.origin +
																	"/images/books/01.jpg"
																}
																alt=''
															/>
														</Link>
													</li>
													<li className='sub-list-item'>
														<Link to={""}>
															<img
																src={
																	window.location.origin +
																	"/images/books/02.jpg"
																}
																alt=''
															/>
														</Link>
													</li>
													<li className='sub-list-item'>
														<Link to={""}>
															<img
																src={
																	window.location.origin +
																	"/images/books/03.jpg"
																}
																alt=''
															/>
														</Link>
													</li>
												</ul>
											</div>
											<div className='main-image'>
												<Link to={""}>
													<img
														src={
															window.location.origin + "/images/books/04.jpg"
														}
														alt=''
													/>
												</Link>
											</div>
										</div>
									</div>
									<div className='description-wrapper'>
										<h3>{book.title}</h3>
										<div className='description-price'>
											<span className='description-old-price'>
												{book.olPrice || book.price / 2}
											</span>
											<span className='description-new-price'>
												{book.price}
											</span>
										</div>
										<div className='description-rating'>
											<span>
												<i className='fa-solid fa-star' />
												<i className='fa-solid fa-star' />
												<i className='fa-solid fa-star' />
												<i className='fa-solid fa-star' />
												<i className='fa-solid fa-star' />
											</span>
										</div>
										<span className='description-content'>
											{book.description ||
												"Monterhing in the best book testem ipsum is simply dtestin find in a of the printing and typeseting industry into to end.in find in a of the printing and typeseting industry in find to make it all done into end."}
										</span>
										<div className='description-author'>
											Author:{" "}
											{book.authors ? (
												book.authors.map((item, index) => (
													<span key={index}>{item.name}</span>
												))
											) : (
												<span>Jhone Steben</span>
											)}
										</div>
										{isAdmin || (
											<div className='description-actions'>
												<Link to={""} onClick={handleAddToCart}>
													Add to cart
												</Link>
												<Link to={""}>Read Sample</Link>
											</div>
										)}
										<div className='description-wishlist'>
											<Link to={""}>
												<span className='wishlist-icon'>
													<i className='fa-solid fa-heart' />
												</span>
												<span>Add to wishlist</span>
											</Link>
										</div>
										<div className='description-social'>
											<h5>Share:</h5>
											<ul>
												<li>
													<Link to={""} className='social-icon fb'>
														<i className='fa-brands fa-facebook-f' />
													</Link>
												</li>
												<li>
													<Link to={""} className='social-icon twitter'>
														<i className='fa-brands fa-twitter' />
													</Link>
												</li>
												<li>
													<Link to={""} className='social-icon yt'>
														<i className='fa-brands fa-youtube' />
													</Link>
												</li>
												<li>
													<Link to={""} className='social-icon pinterest'>
														<i className='fa-brands fa-pinterest-p' />
													</Link>
												</li>
											</ul>
										</div>
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
