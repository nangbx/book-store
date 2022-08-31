import React from "react";
import "./GenderSelect.style.scss";

export default function GenderSelect({ onChange }) {
	return (
		<div id='gender'>
			<label htmlFor=''>Gender:</label>
			<div className='cntr'>
				<label htmlFor='rdo-1' className='btn-radio'>
					<input
						type='radio'
						id='rdo-1'
						name='radio-grp'
						value='MALE'
						onChange={onChange}
					/>
					<svg width='20px' height='20px' viewBox='0 0 20 20'>
						<circle cx={10} cy={10} r={9} />
						<path
							d='M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z'
							className='inner'
						/>
						<path
							d='M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z'
							className='outer'
						/>
					</svg>
					<span>Male</span>
				</label>
				<label htmlFor='rdo-2' className='btn-radio'>
					<input
						type='radio'
						id='rdo-2'
						name='radio-grp'
						onChange={onChange}
						value='FEMALE'
					/>
					<svg width='20px' height='20px' viewBox='0 0 20 20'>
						<circle cx={10} cy={10} r={9} />
						<path
							d='M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z'
							className='inner'
						/>
						<path
							d='M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z'
							className='outer'
						/>
					</svg>
					<span>Female</span>
				</label>
				<label htmlFor='rdo-3' className='btn-radio'>
					<input
						type='radio'
						id='rdo-3'
						name='radio-grp'
						onChange={onChange}
						value='OTHER'
					/>
					<svg width='20px' height='20px' viewBox='0 0 20 20'>
						<circle cx={10} cy={10} r={9} />
						<path
							d='M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z'
							className='inner'
						/>
						<path
							d='M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z'
							className='outer'
						/>
					</svg>
					<span>Other</span>
				</label>
			</div>
		</div>
	);
}
