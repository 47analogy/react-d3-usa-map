import React from 'react'; // REMOVE: not needed

const VoteResults = props => {
	const { blue, red, undecided } = props;

	return (
		<div>
			<div>Blue: {blue} total electoral votes</div>
			<div>Red: {red} total electoral votes</div>
			<div>Battle Ground: {undecided} electoral votes up for grabs</div>
		</div>
	);
};

export default VoteResults;
