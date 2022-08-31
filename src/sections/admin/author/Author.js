import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorRow from "../../../Components/AuthorRow/AuthorRow";
import { AdminService } from "../../../Services";
import "./Author.style.scss";

export default function Author() {
	const [page, setPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);
	const [authors, setAuthors] = useState();
	useEffect(() => {
		async function fetchData() {
			const res = await AdminService.getAuthorByPage(page);
			setAuthors(res.data);
			setMaxPage(res.totalPage);
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
		<div className='content-page' id='author'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='content-item'>
						<div className='card'>
							<div className='card-header'>
								<div className='card-header-title'>
									<h4 className='card-title'>Author lists</h4>
								</div>
								<div className='card-header-toolbar'>
									<Link to={"/admin/authors/new"} className='view-more'>
										Add new author
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
														<th>Profile</th>
														<th>Author Name</th>
														<th>Author description</th>
														<th className='boder-none'>Action</th>
													</tr>
												</thead>
												<tbody>
													{authors
														? authors.map((item) => (
																<AuthorRow key={item.id} author={item} />
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
