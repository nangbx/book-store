import React, { useEffect, useState } from "react";
import BookItem from "../../Components/BookItem/BookItem";
import { Link, useLocation } from "react-router-dom";
import "./SearchPage.style.scss";
import { AdminService, ProductService } from "../../Services";

export default function SearchPage() {
	const [text, setText] = useState("");
	const [genres, setGeners] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [author, setAuthor] = useState("");
	const [genre, setGenre] = useState("");
	const [listBook, setListBook] = useState([]);
	const search = useLocation().search;
	useEffect(() => {
		const searchText = new URLSearchParams(search).get("searchText");
		setText(searchText || "");
	}, [search]);

	useEffect(() => {
		async function fetchData() {
			const _authors = await AdminService.getAllAuthor();
			const _geners = await AdminService.getAllGenre();
			const data = await ProductService.filterBook(text, "", "");
			setListBook(data);
			setGeners(_geners);
			setAuthors(_authors);
		}

		fetchData();
	}, [text]);
	const handleSearch = async () => {
		console.log(author);
		const data = await ProductService.filterBook(
			text === "" ? null : text,
			author,
			genre
		);
		setListBook(data);
	};
	return (
		<div className='content-page'>
			<div className='container-fluid'>
				<div className='wrapper'>
					<div className='search-page'>
						<div className='card-transparent'>
							<div className='text-center'>
								<h2>Search by Book Name</h2>
								<div className='search-filter'>
									<ul className='search-menu-options'>
										<li className='search-menu-opt'>
											<div className='form-group'>
												<select
													className='form-control'
													name='true'
													id='true'
													defaultValue={-1}
												>
													<option value={-1} selected>
														All
													</option>
													<option value='books'>A Books</option>
													<option value='people'>People book</option>
												</select>
											</div>
										</li>
										<li className='search-menu-opt'>
											<div className='form-group'>
												<select
													className='form-control'
													name='genres'
													id='genres'
													value={genre}
													onChange={(e) => setGenre(e.target.value)}
												>
													<option value={""}>Genres</option>
													{genres.map((item) => (
														<option key={item.id} value={item.id}>
															{item.name}
														</option>
													))}
												</select>
											</div>
										</li>
										<li className='search-menu-opt'>
											<div className='form-group'>
												<select
													className='form-control'
													name='year'
													id='year'
													defaultValue={-1}
												>
													<option value={-1} selected>
														Year
													</option>
													<option>2015</option>
													<option>2016</option>
													<option>2017</option>
													<option>2018</option>
													<option>2019</option>
													<option>2020</option>
												</select>
											</div>
										</li>
										<li className='search-menu-opt'>
											<div className='form-group'>
												<select
													className='form-control'
													name='authors'
													id='authors'
													value={author}
													onChange={(e) => setAuthor(e.target.value)}
												>
													<option value={""} selected>
														Author
													</option>
													{authors.map((item) => (
														<option key={item.id} value={item.id}>
															{item.name}
														</option>
													))}
												</select>
											</div>
										</li>
										<li className='search-menu-opt'>
											<div className='search-bar'>
												<form className='searchbox'>
													<input
														type='text'
														placeholder='search here...'
														value={text}
														onChange={(e) => setText(e.target.value)}
													/>
													<Link to={""} className='search-link'>
														<i className='ri-search-line' />
													</Link>
												</form>
												<button className='search-data' onClick={handleSearch}>
													Search
												</button>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className='card'>
							<div className='card-body'>
								{listBook.map((item) => (
									<BookItem
										key={item.id}
										id={item.id}
										description={item.description}
										thumbnail={item.thumbnail}
										price={item.price}
										title={item.title}
										author={item.authors}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
