import React from "react";
import { Link } from "react-router-dom";
import "./AuthorTag.style.scss";

export default function AuthorTag(props) {
	return (
		<Link id='author-tag' to={`/search/${props.name}`}>
			{props.name}
		</Link>
	);
}
