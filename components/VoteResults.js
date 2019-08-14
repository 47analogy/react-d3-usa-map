import React from 'react';

const VoteResults = props => {
	const { blue, red } = props;
	return (
		<div>
			<div>Blue: {blue} total electoral votes</div>
			<div>Red: {red} total electoral votes</div>
		</div>
	);
};

export default VoteResults;
