import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookRow from "../../../Components/BookRow/BookRow";
import { ProductService } from "../../../Services";
import "./BooksCategory.style.scss";

export default function BooksCategory() {
	const [page, setPage] = useState(1);
	const [listBooks, setListBooks] = useState([]);
	const [maxPage, setMaxPage] = useState(1);
	useEffect(() => {
		async function fetchData() {
			const result = await ProductService.getBooks(page);
			setListBooks(result.data);
			setMaxPage(result.totalPage);
		}

		fetchData();
	}, [page]);

	const handleOnClickPrevious = () => {
		setPage((prev) => {
			if (prev === 1) {
				return prev;
			} else {
				return prev - 1;
			}
		});
	};
	const handleOnClickNext = () => {
		setPage((prev) => {
			if (prev >= maxPage) {
				return prev;
			} else {
				return prev + 1;
			}
		});
	};
	return (
		<div className='content-page' id='books-category'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='content-item'>
						<div className='card'>
							<div className='card-header'>
								<div className='card-header-title'>
									<h4 className='card-title'>Book lists</h4>
								</div>
								<div className='card-header-toolbar'>
									<Link to={"/admin/books/new"} className='view-more'>
										Add new book
									</Link>
								</div>
							</div>
							<div className='card-body'>
								<div className='card-table'>
									<div className='card-table-header'>
										<div className='card-table-header-search'>
											<div className='card-filter'>
												<label
													htmlFor='
                                        '
												>
													Search:
													<input type='text' />
												</label>
											</div>
										</div>
									</div>
									<div className='card-table-content'>
										<div className='card-table-wrapper'>
											<table>
												<thead>
													<tr>
														<th>No</th>
														<th>Book Image</th>
														<th>Book Name</th>
														<th>Book Category</th>
														<th>Book Author</th>
														<th>Book Description</th>
														<th>Book Price</th>
														<th className='boder-none'>Action</th>
													</tr>
												</thead>
												<tbody>
													{listBooks
														? listBooks.map((item) => (
																<BookRow key={item.id} info={item} />
														  ))
														: ""}
												</tbody>
											</table>
										</div>
									</div>
									<div className='card-table-footer'>
										<div className='page-size'>
											<div className='max-page'>Total page: {maxPage}</div>
										</div>
										<div className='page-number'>
											<ul className='pagination'>
												<li className='previous'>
													<Link to={""} onClick={handleOnClickPrevious}>
														Previous
													</Link>
												</li>
												<li className='number'>
													<Link to={""}>{page}</Link>
												</li>
												<li className='next'>
													<Link to={""} onClick={handleOnClickNext}>
														Next
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
