import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import BookItem from "../../../Components/BookItem/BookItem";
import { ProductService } from "../../../Services";
import "./BrowseBook.style.scss";

export default function BrowseBook() {
	const [list, setList] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const result = await ProductService.getBooks(1);
			setList(result.data);
		}

		fetchData();
	}, []);
	return (
		<div className='content-page' id='browse-book'>
			<div className='container-fluid'>
				<div className='wrapper-content'>
					<div className='content-item'>
						<div className='card'>
							<div className='card-header'>
								<div className='card-header-title'>
									<h4 className='card-title'>Browse Books</h4>
								</div>
								<div className='card-header-toolbar'>
									<Link to={"/search"} className='view-more'>
										View more
									</Link>
								</div>
							</div>
							<div className='card-body'>
								{list
									? list.map((item) => (
											<BookItem
												key={item.id}
												id={item.id}
												description={item.description}
												thumbnail={item.thumbnail}
												price={item.price}
												title={item.title}
											/>
									  ))
									: ""}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
