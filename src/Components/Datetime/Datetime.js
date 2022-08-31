import React from "react";
import "./Datetime.style.scss";

export default function Datetime() {
	return (
		<div className='date-picker'>
			<div className='input'>
				<div className='result'>
					Select Date: <span />
				</div>
				<button>
					<i className='fa fa-calendar' />
				</button>
			</div>
			<div className='calendar' />
		</div>
	);
}
