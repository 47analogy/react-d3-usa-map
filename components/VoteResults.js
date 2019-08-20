import React from 'react'; // REMOVE: not needed

const VoteResults = props => {
	const { blue, red, undecided } = props;

	return (
		<div className="candidate-board">
			<div className="candidate-box">
				<div className="candidates">Blue: {blue} total electoral votes</div>
				<div className="candidates">Red: {red} total electoral votes</div>
				<div className="candidates">
					Battle Ground: {undecided} electoral votes up for grabs
				</div>
			</div>

			<style jsx>{`
				.candidate-board {
					margin-top: 50px;
				}
				.candidate-box {
					display: flex;
					flex-direction: column;
				}
				.candidates {
					width: 200px;
					height: 100px;
					background: #fafafa;
					border: 1px solid black;
					text-align: center;
				}
				.candidates:hover {
					box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
				}
			`}</style>
		</div>
	);
};

export default VoteResults;
